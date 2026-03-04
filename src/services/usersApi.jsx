import { ApiCall } from './ApiCall';

export const usersApi = {
  getUsers: async () => {
    try {
      const response = await ApiCall.get('/users/all');
      console.log('Utilisateurs récupérés:', response.data.users);
      
      // On retourne directement la liste des users
      return response.data.users || [];
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      throw new Error('Impossible de récupérer les utilisateurs');
    }
  },

  // Ajouter un utilisateur
  addUser: async (newUser) => {
    try {
      const response = await ApiCall.post('/users/add', newUser);
      return response.data.user;
    } catch (error) {
      throw new Error('Impossible d\'ajouter l\'utilisateur');
    }
  },

  // Mettre à jour un utilisateur
  updateUser: async (updatedUser) => {
    try {
      const response = await ApiCall.put(`/users/update/${updatedUser.id}`, updatedUser);
      return response.data.user;
    } catch (error) {
      throw new Error('Impossible de mettre à jour l\'utilisateur');
    }
  },

  // Supprimer un utilisateur
  deleteUser: async (id) => {
    try {
      await ApiCall.delete(`/users/delete/${id}`);
      return id;
    } catch (error) {
      throw new Error('Impossible de supprimer l\'utilisateur');
    }
  },
};