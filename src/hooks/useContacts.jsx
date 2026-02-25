import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {contactsApi} from '../services/contactsApi';

export const useContacts = () => {
  return useQuery({
    queryKey: ['contacts'],
    queryFn: contactsApi.getContacts,
    staleTime: 5 * 60 * 1000,
  });
};

export const useAddContact = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: contactsApi.addContact,
    onSuccess: (newContact) => {
      queryClient.setQueryData(['contacts'], (old) => [newContact, ...old]);
    },
  });
};

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

export const useContactById = (contactId) => {
  return useQuery({
    queryKey: ['contact', contactId],
    queryFn: () => contactsApi.getContactById(contactId),
    enabled: !!contactId,
    staleTime: 5 * 60 * 1000,
  });
};
