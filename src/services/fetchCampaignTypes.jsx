import { ApiCall } from "./ApiCall";

export const fetchCampaignTypes = async () => {
    const { data } = await ApiCall.get('/campaigns/types');
    return data;
};