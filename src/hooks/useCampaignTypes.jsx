import { useQuery } from "@tanstack/react-query";
import { fetchCampaignTypes } from "../services/fetchCampaignTypes";

export const useCampaignTypes = () => {
    return useQuery({
        queryKey: ["campaign-types"],
        queryFn: fetchCampaignTypes,
        staleTime: 5 * 60 * 1000,
    });
};