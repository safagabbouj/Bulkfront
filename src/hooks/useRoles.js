import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { rolesApi } from "../services/rolesApi";

export const useRoles = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: rolesApi.getRoles,
    staleTime: 5 * 60 * 1000
  });
};

export const useAddRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rolesApi.addRole,

    onSuccess: (newRole) => {
      queryClient.setQueryData(["roles"], (old = []) => [
        newRole,
        ...old
      ]);

      queryClient.invalidateQueries({ queryKey: ["roles"] });
    }
  });
};

export const useUpdateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rolesApi.updateRole,

    onSuccess: (updatedRole) => {
      queryClient.setQueryData(["roles"], (old = []) =>
        old.map((r) => (r.id === updatedRole.id ? updatedRole : r))
      );

      queryClient.invalidateQueries({ queryKey: ["roles"] });
    }
  });
};

export const useDeleteRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rolesApi.deleteRole,

    onSuccess: (deletedId) => {
      queryClient.setQueryData(["roles"], (old = []) =>
        old.filter((r) => r.id !== deletedId)
      );

      queryClient.invalidateQueries({ queryKey: ["roles"] });
    }
  });
};