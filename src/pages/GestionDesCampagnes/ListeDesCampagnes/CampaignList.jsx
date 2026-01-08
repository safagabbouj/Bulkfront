import React from "react";
import { Plus, Search } from "lucide-react";

export default function CampaignList({
  items,
  statuts,

  filterStatus,
  setFilterStatus,
  filterDateCreation,
  setFilterDateCreation,
  filterDateEnvoi,
  setFilterDateEnvoi,
  q,
  setQ,

  onAddCampaign,
  onOpenDetails,
}) {
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

      {/* Filters row */}
      <div className="row g-3 mb-4">
        <div className="col-md-2">
          <select
            className="form-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">Statut</option>
            {statuts.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3 position-relative">
          <input
            type="date"
            className="form-control"
            value={filterDateCreation}
            onChange={(e) => setFilterDateCreation(e.target.value)}
          />
        </div>

        <div className="col-md-3 position-relative">
          <input
            type="date"
            className="form-control"
            value={filterDateEnvoi}
            onChange={(e) => setFilterDateEnvoi(e.target.value)}
          />
        </div>

        <div className="col-md-4 position-relative">
          <input
            type="text"
            placeholder="Rechercher"
            className="form-control"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <Search className="filter-icon" size={18} />
        </div>
      </div>

      {/* Table */}
      <div className="card shadow-sm border-0">
        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle">
            <thead className="bg-light">
              <tr>
                <th className="text-muted small">Liste Des Campagnes</th>
                <th className="text-muted small">Statut</th>
                <th className="text-muted small">Langue</th>
                <th className="text-muted small">Date Création</th>
                <th className="text-muted small">Date D'envoi</th>
                <th className="text-muted small">Date Fin</th>
                <th className="text-muted small text-end">Action</th>
              </tr>
            </thead>

            <tbody>
              {items.map((campaign) => (
                <tr key={campaign.id}>
                  <td className="align-middle">{campaign.name}</td>
                  <td className="align-middle">{campaign.status}</td>
                  <td className="align-middle">{campaign.language}</td>
                  <td className="align-middle">{campaign.dateCreation}</td>
                  <td className="align-middle">{campaign.dateEnvoi}</td>
                  <td className="align-middle">{campaign.dateFin}</td>
                  <td className="text-end">
                    <button className="btn-details" onClick={() => onOpenDetails(campaign)}>
                      Détails »
                    </button>
                  </td>
                </tr>
              ))}

              {items.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center text-muted py-4">
                    Aucun résultat
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
