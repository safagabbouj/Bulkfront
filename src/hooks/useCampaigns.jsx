import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { campaignsApi } from "../services/campaignsApi";

// Hook pour récupérer les campagnes
export const useCampaigns = () => {
  return useQuery({
    queryKey: ["campaigns"], // Clé unique pour identifier cette requête
    queryFn: campaignsApi.getCampaigns, // Fonction pour récupérer les données
    staleTime: 5 * 60 * 1000, // Durée de validité du cache (5 minutes)
  });
};

// Hook pour ajouter une campagne
export const useAddCampaign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: campaignsApi.addCampaign, // Fonction pour ajouter une campagne
    onSuccess: (newCampaign) => {
        console.log("Nouvelle campagne ajoutée :", newCampaign);

      // Mise à jour optimiste du cache
      queryClient.setQueryData(["campaigns"], (old) => [newCampaign, ...old]);
    },
  });
};