// Simulation d'une API avec des données fake
const SEED = [
  {
    id: 1,
    nom: "Test01",
    owner: "Rayan",
    nbContacts: 1,
    dateCreation: "04/06/2023 10:06",
    lastUse: "04/06/2023 10:06",
    description: "List test",
    selectedUsers: [1, 2],
    fileName: "contacts.csv",
    stats: {
      nationalValid: 1,
      internationalValid: 0,
      invalid: 0,
      empty: 0,
    },
  },
  {
    id: 2,
    nom: "Test01",
    owner: "Rayan",
    nbContacts: 2,
    dateCreation: "04/06/2023 10:06",
    lastUse: "04/06/2023 10:06",
    description: "List test",
    selectedUsers: [2],
    fileName: "contacts.csv",
    stats: {
      nationalValid: 1,
      internationalValid: 0,
      invalid: 0,
      empty: 0,
    },
  },
  {
    id: 3,
    nom: "Test01",
    owner: "Rayan",
    nbContacts: 1,
    dateCreation: "04/06/2023 10:06",
    lastUse: "04/06/2023 10:06",
    description: "List test",
    selectedUsers: [],
    fileName: "contacts.csv",
    stats: {
      nationalValid: 1,
      internationalValid: 0,
      invalid: 0,
      empty: 0,
    },
  },
  {
    id: 4,
    nom: "Test01",
    owner: "Rayan",
    nbContacts: 2,
    dateCreation: "04/06/2023 10:06",
    lastUse: "04/06/2023 10:06",
    description: "List test",
    selectedUsers: [],
    fileName: "contacts.csv",
    stats: {
      nationalValid: 1,
      internationalValid: 0,
      invalid: 0,
      empty: 0,
    },
  },
];

// Simulation d'un délai réseau
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const contactsApi = {
  // Récupérer tous les contacts
  getContacts: async () => {
    await delay(500); // Simulation latence réseau
    return [...SEED];
  },

  // Ajouter un contact
  addContact: async (newContact) => {
    await delay(300);
    const contact = {
      ...newContact,
      id: Date.now(),
      owner: "Rayan",
      nbContacts: 1,
      dateCreation: new Date().toLocaleString('fr-FR'),
      lastUse: new Date().toLocaleString('fr-FR'),
      stats: { nationalValid: 1, internationalValid: 0, invalid: 0, empty: 0 },
    };
    return contact;
  },

  // Mettre à jour un contact
  updateContact: async (updatedContact) => {
    await delay(300);
    return updatedContact;
  },

  // Supprimer un contact
  deleteContact: async (id) => {
    await delay(300);
    return id;
  }
};