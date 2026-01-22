import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usersApi } from "../services/usersApi";

// Hook pour récupérer les utilisateurs
export const useUsers = () => {
  return useQuery({
    queryKey: ["users"], // Clé unique pour identifier cette requête
    queryFn: usersApi.getUsers, // Fonction pour récupérer les données
    staleTime: 5 * 60 * 1000, // Durée de validité du cache (5 minutes)
  });
};

// Hook pour ajouter un utilisateur
export const useAddUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: usersApi.addUser, // Fonction pour ajouter un utilisateur
    onSuccess: (newUser) => {
      // Mise à jour optimiste du cache
      queryClient.setQueryData(["users"], (old) => [newUser, ...old]);
    },
  });
};

// Hook pour mettre à jour un utilisateur
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: usersApi.updateUser, // Fonction pour mettre à jour un utilisateur
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["users"], (old) =>
        old.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
    },
  });
};

// Hook pour supprimer un utilisateur
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: usersApi.deleteUser, // Fonction pour supprimer un utilisateur
    onSuccess: (deletedId) => {
      queryClient.setQueryData(["users"], (old) =>
        old.filter((user) => user.id !== deletedId)
      );
    },
  });
};