import axios from 'axios';

// Configuration de base d'axios
const API_BASE_URL = 'http://localhost:8080/api/v1';
const API_CAMPAIGNS_URL = `${API_BASE_URL}/campaigns`;

// Instance axios avec configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token JWT automatiquement (si nécessaire)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur pour gérer les erreurs de réponse
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erreur API:', error);
    return Promise.reject(error);
  }
);

export const campaignsApi = {
  // Récupérer toutes les campagnes
  getCampaigns: async () => {
    try {
      const response = await apiClient.get('/campaigns/');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des campagnes:', error);
      throw new Error('Impossible de récupérer les campagnes');
    }
  },

  // Ajouter une campagne - Send date as-is, let backend handle timezone
  addCampaign: async (campaignData) => {
    try {
      const payload = {
        name: campaignData.nom?.trim() === "" ? "Test 01" : campaignData.nom,
        description: campaignData.description,
        type: campaignData.type,
        messageType: campaignData.typeDeMessage,
        messageHeader: campaignData.entete,
        messageContent: campaignData.message,
        language: "FR",
        contactId: campaignData.listeDeContact || "FAKE_CONTACT_ID",
        // Send the date as-is - backend will handle GMT+1 conversion
        sentDate: campaignData.dateEnvoi ? new Date(campaignData.dateEnvoi) : null
      };
      
      console.log('Payload sent to backend:', payload);
      
      const response = await apiClient.post('/campaigns/', payload);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la campagne:', error);
      throw new Error('Impossible d\'ajouter la campagne');
    }
  },
};