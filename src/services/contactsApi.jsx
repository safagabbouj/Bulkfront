import { ApiCall } from './ApiCall';

export const contactsApi = {
  // Récupérer tous les contacts
  getContacts: async () => {
    try {
      const response = await ApiCall.get('/contacts');
      return response.data;
    } catch (error) {
      throw new Error('Impossible de récupérer les contacts');
    }
  },

  // Ajouter un contact
  addContact: async (contactData) => {
    try {
      const payload = {
        nom: contactData.nom,
        description: contactData.description,
        selectedUsers: contactData.selectedUsers,
        fileName: contactData.fileName,
        owner: 'CurrentUser',
      };
      const response = await ApiCall.post('/contacts', payload);
      return response.data;
    } catch (error) {
      throw new Error('Impossible d\'ajouter le contact');
    }
  },

  // Mettre à jour un contact
  updateContact: async (contactData) => {
    try {
      const response = await ApiCall.put(`/contacts/${contactData.id}`, contactData);
      return response.data;
    } catch (error) {
      throw new Error('Impossible de modifier le contact');
    }
  },

  // Supprimer un contact
  deleteContact: async (contactId) => {
    try {
      await ApiCall.delete(`/contacts/${contactId}`);
      return contactId;
    } catch (error) {
      throw new Error('Impossible de supprimer le contact');
    }
  },

  // Récupérer un contact par ID
  getContactById: async (contactId) => {
    try {
      const response = await ApiCall.get(`/contacts/${contactId}`);
      return response.data;
    } catch (error) {
      throw new Error('Contact introuvable');
    }
  }
};