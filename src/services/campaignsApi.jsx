// Simulation d'une API avec des données fake
const SEED = [
  {
    id: 1,
    name: "Campagne 1",
    description: "Description de la campagne 1",
    createdAt: "21/01/2026 10:00",
    owner: "Admin",
  },
  {
    id: 2,
    name: "Campagne 2",
    description: "Description de la campagne 2",
    createdAt: "20/01/2026 15:00",
    owner: "User",
  },
];

// Simulation d'un délai réseau
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const campaignsApi = {
  // Récupérer toutes les campagnes
  getCampaigns: async () => {
    await delay(500); // Simulation latence réseau
    return [...SEED];
  },

  // Ajouter une campagne
  addCampaign: async (newCampaign) => {
    await delay(300);
    const campaign = {
      ...newCampaign,
      name: newCampaign.nom?.trim() === "" ? "Test 01" : newCampaign.nom, // Correction ici

      id: Date.now(),
      createdAt: new Date().toLocaleString("fr-FR"),
    };
    return campaign;
  },
};