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
              {campaigns.map((campaign, idx) => (
                <tr key={idx}>
                  <td className="align-middle">{campaign.name || "Test 01"}</td>
                  <td className="align-middle">{campaign.status || "N/A"}</td>
                  <td className="align-middle">{campaign.language || "N/A"}</td>
                  <td className="align-middle">{campaign.createdAt}</td>
                  <td className="align-middle">{campaign.dateEnvoi || "N/A"}</td>
                  <td className="align-middle">{campaign.dateFin || "N/A"}</td>
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