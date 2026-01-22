// Simulation d'une API avec des données fake
const SEED = [
  {
    id: 1,
    nom: "Rayan",
    prenom: "Rayan",
    dateCreation: "04/06/2023 10:06",
    campagnes: "23M",
    email: "rayan.orangecontact@gmail.com",
    mobile: "55 443 322",
    actif: true,
    role: "USER_ROLE",
  },
  {
    id: 2,
    nom: "Rayan",
    prenom: "Rayan",
    dateCreation: "04/06/2023 10:06",
    campagnes: "23M",
    email: "rayan.orangecontact@gmail.com",
    mobile: "55 443 322",
    actif: true,
    role: "USER_ROLE",
  },
];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const usersApi = {
  // Récupérer tous les utilisateurs
  getUsers: async () => {
    await delay(500); // Simulation latence réseau
    return [...SEED];
  },

  // Ajouter un utilisateur
  addUser: async (newUser) => {
    await delay(300);
    const user = {
      ...newUser,
      id: Date.now(),
      dateCreation: new Date().toLocaleString("fr-FR"),
    };
    return user;
  },

  // Mettre à jour un utilisateur
  updateUser: async (updatedUser) => {
    await delay(300);
    return updatedUser;
  },

  // Supprimer un utilisateur
  deleteUser: async (id) => {
    await delay(300);
    return id;
  },
};