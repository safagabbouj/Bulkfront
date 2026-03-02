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

export const useAddContactWithCsv = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ contactData, file }) => contactsApi.addContactWithCsv(contactData, file),
    onSuccess: (response) => {
      // response contient {contact: {...}, csv: {...}}
      // On ajoute le contact retourné à la liste
      queryClient.setQueryData(['contacts'], (old) => {
        const contactForList = {
          id: response.contact.id,
          name: response.contact.name,
          owner: response.contact.owner,
          contactsNumber: response.csv.valid || 0,
          creationDate: new Date(),
        };
        return [contactForList, ...(old || [])];
      });
      
      // Optionnel : invalider et recharger pour être sûr
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
    onError: (error) => {
      console.error('Erreur lors de l\'ajout du contact:', error);
    }
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
