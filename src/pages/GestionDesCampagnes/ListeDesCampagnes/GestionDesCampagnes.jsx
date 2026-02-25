import React, { useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import CampaignList from "./CampaignList";
import AddCampaignModal from "./AddCampaignModal";
import { useCampaigns, useAddCampaign } from "../../../hooks/useCampaigns";
import "./GestionDesCampagnes.css";

const GestionDesCampagnes = () => {
  const { data: campaigns = [], isLoading, error } = useCampaigns();
  const addCampaignMutation = useAddCampaign();
  const [showModal, setShowModal] = useState(false);

  const handleAddCampaign = async (newCampaign) => {
    try {
      await addCampaignMutation.mutateAsync(newCampaign);
      setShowModal(false);
    } catch (err) {
      throw err;
    }
  };

  if (isLoading) {
    return (
      <MainLayout pageTitle="Gestion des campagnes" pageSubtitle="Liste des campagnes">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout pageTitle="Gestion des campagnes" pageSubtitle="Liste des campagnes">
        <div className="alert alert-danger text-center">
          Erreur lors du chargement des campagnes : {error.message}
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout pageTitle="Gestion des campagnes" pageSubtitle="Liste des campagnes">
      <div className="gestion-campagnes-container">
        <CampaignList campaigns={campaigns} onAddCampaign={() => setShowModal(true)} />

        {showModal && (
          <AddCampaignModal
            onClose={() => setShowModal(false)}
            onSubmit={handleAddCampaign}
            isLoading={addCampaignMutation.isLoading}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default GestionDesCampagnes;