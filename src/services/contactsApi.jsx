import { ApiCall } from './ApiCall';

export const contactsApi = {
  // Récupérer tous les contacts
  getContacts: async () => {
    try {
      const response = await ApiCall.get('/contacts');
      console.log('Contacts récupérés:', response.data);

      return response.data;
    } catch (error) {
      throw new Error('Impossible de récupérer les contacts');
    }
  },



  // Ajouter un contact avec fichier CSV (NEW)
  addContactWithCsv: async (contactData, file) => {
    try {
      // Créer FormData pour multipart/form-data
      const formData = new FormData();
      
      // Préparer l'objet de données conforme à ContactCreateRequest
      const data = {
        name: contactData.nom,
        description: contactData.description,
        authorizedUsers: contactData.selectedUsers || []
      };
      
      // Ajouter les données sous forme de JSON string
      formData.append('data', JSON.stringify(data));
      
      // Ajouter le fichier CSV
      formData.append('file', file);
      
      // Envoyer la requête avec le bon Content-Type
      const response = await ApiCall.post('/contacts/create-with-csv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l\'ajout du contact avec CSV:', error);
      throw new Error('Impossible d\'ajouter le contact avec le fichier CSV');
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