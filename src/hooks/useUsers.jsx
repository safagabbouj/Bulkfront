// hooks/useUsers.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usersApi } from "../services/usersApi";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: usersApi.getUsers,
    staleTime: 5 * 60 * 1000,
  });
};

export const useUserById = (id) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => usersApi.getUserById(id),
    enabled: !!id,
  });
};

export const useAddUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: usersApi.addUser,
    onSuccess: (newUser) => {
      queryClient.setQueryData(["users"], (old = []) => [newUser, ...old]);
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: usersApi.updateUser,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["users"], (old = []) =>
        old.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
      queryClient.invalidateQueries(["users", updatedUser.id]);
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: usersApi.deleteUser,
    onSuccess: (deletedId) => {
      queryClient.setQueryData(["users"], (old = []) =>
        old.filter((user) => user.id !== deletedId)
      );
      queryClient.invalidateQueries(["users", deletedId]);
    },
  });
};