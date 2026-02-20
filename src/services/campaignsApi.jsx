import { ApiCall } from "./ApiCall";

export const campaignsApi = {
  // Récupérer toutes les campagnes
  getCampaigns: async () => {
    try {
      console.log('📡 Appel GET /campaigns...');
      const response = await ApiCall.get('/campaigns/');
      console.log('✅ Campagnes récupérées:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des campagnes:', error);
      throw error;
    }
  },

  // Ajouter une campagne
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
      
      console.log('📤 Création campagne:', payload);
      const response = await ApiCall.post('/campaigns/', payload);
      console.log('✅ Campagne créée:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors de l\'ajout de la campagne:', error);
      throw error;
    }
  },

 // 🔥 Récupérer les détails d'un contact pour la création de campagne
  getContactDetailsForCampaign: async (contactId) => {
    try {
      const response = await ApiCall.get(`/campaigns/contact/${contactId}/details`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des détails du contact:', error);
      throw new Error('Impossible de récupérer les détails du contact');
    }
  },
};