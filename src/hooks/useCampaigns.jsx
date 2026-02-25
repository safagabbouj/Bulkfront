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

export const useCampaigns = () => {
  return useQuery({
    queryKey: ["campaigns"],
    queryFn: campaignsApi.getCampaigns,
    staleTime: 30 * 1000,
    refetchInterval: 30 * 1000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useAddCampaign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: campaignsApi.addCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"], refetchType: 'active' });
    }
  });
};
export const useContactDetailsForCampaign = (contactId) => {
  return useQuery({
    queryKey: ['contact-campaign-details', contactId],
    queryFn: () => campaignsApi.getContactDetailsForCampaign(contactId),
    enabled: !!contactId,
    staleTime: 5 * 60 * 1000,
  });
};