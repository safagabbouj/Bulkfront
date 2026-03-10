import { ApiCall } from "./ApiCall";

export const rolesApi = {

  // GET ALL ROLES
  getRoles: async () => {
    try {
      const response = await ApiCall.post("/roles/returnAll");
      return response.data.roles || [];
    } catch (error) {
      throw new Error("Impossible de récupérer les rôles");
    }
  },

  // ADD ROLE
  addRole: async (roleData) => {
    try {
      const payload = {
        roleName: roleData.nom,
        pageIds: roleData.pages
      };

      const response = await ApiCall.post("/roles/add", payload);

      return response.data.role;
    } catch (error) {
      console.error(error);
      throw new Error("Impossible d'ajouter le rôle");
    }
  },

  // UPDATE ROLE
  updateRole: async (roleData) => {
    try {
      const payload = {
        roleName: roleData.nom,
        pageIds: roleData.pages
      };

      const response = await ApiCall.put(
        `/roles/update/${roleData.id}`,
        payload
      );

      return response.data.role;
    } catch (error) {
      console.error(error);
      throw new Error("Impossible de modifier le rôle");
    }
  },

  // DELETE ROLE
  deleteRole: async (roleId) => {
    try {
      await ApiCall.delete(`/roles/delete/${roleId}`);
      return roleId;
    } catch (error) {
      console.error(error);
      throw new Error("Impossible de supprimer le rôle");
    }
  },

  // GET BY ID
  getRoleById: async (roleId) => {
    try {
      const response = await ApiCall.get(`/roles/${roleId}`);
      return response.data.role;
    } catch (error) {
      throw new Error("Role introuvable");
    }
  }
};