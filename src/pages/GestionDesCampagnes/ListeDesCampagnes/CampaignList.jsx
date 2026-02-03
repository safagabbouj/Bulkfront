import React, { useState } from "react";
import { Plus, Search } from "lucide-react";
import DetailsCampaignModal from "../DetailsCampaignModal";

const CampaignList = ({ campaigns, onAddCampaign }) => {
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const handleDetailsClick = (campaign) => {
    setSelectedCampaign(campaign);
  };

  const handleCloseModal = () => {
    setSelectedCampaign(null);
  };

  // Fonction pour formater la date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("fr-FR");
    } catch {
      return dateString;
    }
  };
// Fonction spécifique pour formater sentDate qui vient en format string
  const formatSentDate = (sentDateString) => {
    if (!sentDateString) return "N/A";
    try {
      // sentDate vient du backend au format "2026-02-03 10:33"
      // On peut soit l'afficher tel quel, soit le reformater
      const [datePart, timePart] = sentDateString.split(' ');
      const [year, month, day] = datePart.split('-');
      return `${day}/${month}/${year} ${timePart}`;
    } catch {
      return sentDateString; // Retourne la valeur originale en cas d'erreur
    }
  };
  return (
    <div className="container-fluid p-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold m-0">LISTE DES CAMPAGNES</h2>
        <button onClick={onAddCampaign} className="btn-new-campagne">
          <span className="icon-box">
            <Plus size={18} />
          </span>
          New Campagnes
        </button>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-2">
          <select className="form-select">
            <option>Statut</option>
          </select>
        </div>
        <div className="col-md-3 position-relative">
          <input type="date" className="form-control" />
        </div>
        <div className="col-md-3 position-relative">
          <input type="date" className="form-control" />
        </div>
        <div className="col-md-4 position-relative">
          <input type="text" placeholder="Rechercher" className="form-control" />
          <Search className="filter-icon" size={18} />
        </div>
      </div>

      <div className="card shadow-sm border-0">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="bg-light">
              <tr>
                <th className="text-muted small">Liste Des Campagnes</th>
                <th className="text-muted small">Statut</th>
                <th className="text-muted small">Langue</th>
                <th className="text-muted small">Date Création</th>
                <th className="text-muted small">Date D'envoi</th>
                <th className="text-muted small">Date Fin</th>
                <th className="text-muted small">Action</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (
                <tr key={campaign.id}>
                  <td className="align-middle">{campaign.name || "N/A"}</td>
                  <td className="align-middle">
                    <span className={`badge ${
                      campaign.status === 'ENVOYÉ' ? 'bg-success' : 
                      campaign.status === 'PENDING' ? 'bg-warning' : 
                      'bg-secondary'
                    }`}>
                      {campaign.status || "N/A"}
                    </span>
                  </td>
                  <td className="align-middle">{campaign.language || "N/A"}</td>
                  <td className="align-middle">{formatDate(campaign.createdAt)}</td>
                  <td className="align-middle">{formatSentDate(campaign.sentDate)}</td>
                  <td className="align-middle">{formatDate(campaign.updatedAt)}</td>
                  <td>
                    <button
                      className="btn-details"
                      onClick={() => handleDetailsClick(campaign)}
                    >
                      Détails »
                    </button>
                  </td>
                </tr>
              ))}
              {campaigns.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center text-muted py-4">
                    Aucune campagne trouvée.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedCampaign && (
        <DetailsCampaignModal
          campaign={selectedCampaign}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default CampaignList;