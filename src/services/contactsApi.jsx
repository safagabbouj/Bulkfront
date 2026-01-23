import axios from 'axios';

// Configuration de base d'axios
const API_BASE_URL = 'http://localhost:8080/api/v1'; // ✅ Ajouter /api/v1
const API_CONTACTS_URL = `${API_BASE_URL}/contacts`;

// Instance axios avec configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token JWT automatiquement
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
    if (error.response?.status === 401) {
      // Token expiré, rediriger vers la page de connexion
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const contactsApi = {
  // Récupérer tous les contacts
  getContacts: async () => {
    try {
      const response = await apiClient.get('/contacts');
      return response.data; // Retourne la liste des contacts
    } catch (error) {
      console.error('Erreur lors de la récupération des contacts:', error);
      throw new Error('Impossible de récupérer les contacts');
    }
  },

  // Ajouter un contact
   // POST /contacts - Ajouter un contact
  addContact: async (contactData) => {
    try {
      // Transformer les données du frontend vers le format attendu par le backend
      const payload = {
        nom: contactData.nom,
        description: contactData.description,
        selectedUsers: contactData.selectedUsers,
        fileName: contactData.fileName,
        owner: 'CurrentUser', // À récupérer depuis le contexte utilisateur
        // Les autres champs seront générés par le backend
      };
       const response = await apiClient.post('/contacts', payload);
      return response.data; // ContactDTO créé
    } catch (error) {
      console.error('Erreur lors de l\'ajout du contact:', error);
      throw new Error('Impossible d\'ajouter le contact');
    }
  },

  // Mettre à jour un contact
  updateContact: async (contactData) => {
    try {
      const response = await apiClient.put(`/contacts/${contactData.id}`, contactData);
      return response.data; // Retourne le contact mis à jour
    } catch (error) {
      console.error('Erreur lors de la modification du contact:', error);
      throw new Error('Impossible de modifier le contact');
    }
  },

  // Supprimer un contact
  deleteContact: async (contactId) => {
    try {
      await apiClient.delete(`/contacts/${contactId}`);
      return contactId; // Retourne l'ID du contact supprimé
    } catch (error) {
      console.error('Erreur lors de la suppression du contact:', error);
      throw new Error('Impossible de supprimer le contact');
    }
  },

  // Récupérer un contact par ID
  getContactById: async (contactId) => {
    try {
      const response = await apiClient.get(`/contacts/${contactId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération du contact:', error);
      throw new Error('Contact introuvable');
    }
  }
};