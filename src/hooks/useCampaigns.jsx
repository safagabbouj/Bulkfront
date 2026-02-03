import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { campaignsApi } from "../services/campaignsApi";

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