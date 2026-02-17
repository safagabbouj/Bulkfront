import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { campaignsApi } from "../services/campaignsApi";
import { fetchAccountSubjects } from "../services/accountService";

export const useAccountSubjects = () => {
  return useQuery({
    queryKey: ["account-subjects"],
    queryFn: fetchAccountSubjects,
    staleTime: 5 * 60 * 1000,
  });
};
// Hook pour récupérer les campagnes
export const useCampaigns = () => {
  return useQuery({
    queryKey: ["campaigns"],
    queryFn: campaignsApi.getCampaigns,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3, // Retry 3 fois en cas d'erreur
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// Hook pour ajouter une campagne
export const useAddCampaign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: campaignsApi.addCampaign,
    onSuccess: (newCampaign) => {
      console.log("Nouvelle campagne ajoutée :", newCampaign);
      
      // Invalider et refetch les campagnes pour avoir les données les plus récentes
      queryClient.invalidateQueries(["campaigns"]);
    },
    onError: (error) => {
      console.error("Erreur lors de l'ajout de la campagne :", error);
    }
  });
};
export const useContactDetailsForCampaign = (contactId) => {
  return useQuery({
    queryKey: ['contact-campaign-details', contactId],
    queryFn: () => campaignsApi.getContactDetailsForCampaign(contactId),
    enabled: !!contactId, // Ne s'exécute que si contactId est fourni
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};