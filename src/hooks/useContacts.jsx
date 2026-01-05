import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { contactsApi } from '../services/contactsService';
import {contactsApi} from '../services/contactsApi';
// Hook pour récupérer les contacts
export const useContacts = () => {
  return useQuery({
    queryKey: ['contacts'],
    queryFn: contactsApi.getContacts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook pour ajouter un contact
export const useAddContact = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: contactsApi.addContact,
    onSuccess: (newContact) => {
      // Mise à jour optimiste du cache
      queryClient.setQueryData(['contacts'], (old) => [newContact, ...old]);
    },
  });
};

// Hook pour modifier un contact
export const useUpdateContact = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: contactsApi.updateContact,
    onSuccess: (updatedContact) => {
      queryClient.setQueryData(['contacts'], (old) =>
        old.map((contact) => 
          contact.id === updatedContact.id ? updatedContact : contact
        )
      );
    },
  });
};

// Hook pour supprimer un contact
export const useDeleteContact = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: contactsApi.deleteContact,
    onSuccess: (deletedId) => {
      queryClient.setQueryData(['contacts'], (old) =>
        old.filter((contact) => contact.id !== deletedId)
      );
    },
  });
};