import { ApiCall } from "./ApiCall";

export const campaignsApi = {
  getCampaigns: async () => {
    try {
      const response = await ApiCall.get('/campaigns/');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addCampaign: async (campaignData) => {
    try {
      const payload = {
        name: campaignData.nom?.trim() === "" ? "Test 01" : campaignData.nom,
        description: campaignData.description,
        type: campaignData.type,
        messageType: campaignData.typeDeMessage,
        messageHeader: "reponse api loading ...",
        sender: campaignData.entete,

        messageContent: campaignData.message,
        language: "FR",
        contactId: campaignData.listeDeContact || "FAKE_CONTACT_ID",
        sentDate: campaignData.dateEnvoi ? new Date(campaignData.dateEnvoi) : null
      };
      
      const response = await ApiCall.post('/campaigns/', payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },


  getContactDetailsForCampaign: async (contactId) => {
    try {
      const response = await ApiCall.get(`/campaigns/contact/${contactId}/details`);
      return response.data;
    } catch (error) {
      throw new Error('Impossible de récupérer les détails du contact');
    }
  },
};