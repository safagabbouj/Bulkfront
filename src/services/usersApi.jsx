// services/usersApi.js
import { ApiCall } from './ApiCall';

export const usersApi = {
  getUsers: async () => {
    const response = await ApiCall.get('/users/all');
    console.log("all users",response.data.users)
    return response.data.users || [];
  },

  getUserById: async (id) => {
    const response = await ApiCall.get(`/users/${id}`);
    return response.data.user;
  },

  addUser: async (newUser) => {
    console.log("data sended for ajout",newUser)
    const response = await ApiCall.post('/users/add', newUser);
    return response.data.user;
  },

  updateUser: async (updatedUser) => {
    const response = await ApiCall.put(`/users/update/${updatedUser.id}`, updatedUser);
    return response.data.user;
  },

  deleteUser: async (id) => {
    await ApiCall.delete(`/users/delete/${id}`);
    return id;
  },
};