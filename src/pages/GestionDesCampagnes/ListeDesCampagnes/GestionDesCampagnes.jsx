import React, { useState } from 'react';
import MainLayout from "../../../layout/MainLayout";
import CampaignList from '../ListeDesCampagnes/CampaignList';
import AddCampaignModal from '../ListeDesCampagnes/AddCampaignModal'

import "./GestionDesCampagnes.css";

const GestionDesCampagnes = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleSubmit = () => {
    console.log("Campagne ajoutée !");
  };

  return (
    <MainLayout pageTitle="Gestion des campagnes" pageSubtitle="Liste des campagnes">
      <div className="gestion-campagnes-container">
        <CampaignList onAddCampaign={handleOpenModal} />
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