import React, { useState } from 'react';
import MainLayout from "../../layout/MainLayout";
import CampaignList from "./CampaignList"; // On importe les nouveaux composants
import AddCampaignModal from "./AddCampaignModal";
import "./GestionDesCampagnes.css";

const GestionDesCampagnes = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleSubmit = () => {
    console.log("Campagne ajoutée !");
    // Logique d'ajout ici
  };

  return (
    <MainLayout pageTitle="Gestion des campagnes" pageSubtitle="Liste des campagnes">
      <div className="gestion-campagnes-container">
        {/* On affiche la liste convertie */}
        <CampaignList onAddCampaign={handleOpenModal} />
        
        {/* On affiche la modale si nécessaire */}
        {showModal && (
          <AddCampaignModal 
            onClose={handleCloseModal} 
            onSubmit={handleSubmit} 
          />
        )}
      </div>
    </MainLayout>
  );
};

export default GestionDesCampagnes;