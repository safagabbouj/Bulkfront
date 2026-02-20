import React, { useState } from "react";
import { Plus, Search } from "lucide-react";
import DetailsCampaignModal from "../DetailsCampaignModal";
import { useMemo } from "react";
const CampaignList = ({ campaigns, onAddCampaign }) => {
const [selectedCampaign, setSelectedCampaign] = useState(null);
const [statusFilter, setStatusFilter] = useState("");
const [dateDebut, setDateDebut] = useState(""); // ← Date de début
const [dateFin, setDateFin] = useState("");     // ← Date de fin
 const [dateEnvoiFilter, setDateEnvoiFilter] = useState(""); // ← Filtre date d'envoi
  const [dateCreationFilter, setDateCreationFilter] = useState(""); // ← Filtre date création
  // const filteredCampaigns = useMemo(() => {

  //   if (!statusFilter) {
  //     return campaigns; // Retourner toutes les campagnes si aucun filtre
  //   }
  //   return campaigns.filter(campaign => campaign.status === statusFilter);
  // }, [campaigns, statusFilter]);
 // ...existing code...

// Fonction helper pour comparer uniquement les dates (ignorer l'heure)
const isSameDate = (date1, date2) => {
  if (!date1 || !date2) return false;
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

// Filtrer les campagnes
const filteredCampaigns = useMemo(() => {
  let result = campaigns;

  // 1️⃣ Filtrage par statut
  if (statusFilter) {
    result = result.filter(campaign => campaign.status === statusFilter);
  }

  // 2️⃣ Filtrage par date d'envoi (sentDate)
  if (dateEnvoiFilter) {
    result = result.filter(campaign => 
      isSameDate(campaign.sentDate, dateEnvoiFilter)
    );
  }

  // 3️⃣ Filtrage par date de création (createdAt)
  if (dateCreationFilter) {
    result = result.filter(campaign => 
      isSameDate(campaign.createdAt, dateCreationFilter)
    );
  }

  return result;
}, [campaigns, statusFilter, dateEnvoiFilter, dateCreationFilter]);

// ...existing code...
  const handleDetailsClick = (campaign) => {
    setSelectedCampaign(campaign);
  };

  const handleCloseModal = () => {
    setSelectedCampaign(null);
  };

  // Fonction universelle pour formater toutes les dates au format "dd/MM/yyyy HH:mm"
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      // Créer un objet Date à partir du string (gère automatiquement les formats ISO 8601)
      const date = new Date(dateString);
      
      // Vérifier si la date est valide
      if (isNaN(date.getTime())) return "N/A";
      
      // Formater la date au format français: dd/MM/yyyy HH:mm
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    } catch {
      return "N/A";
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

      {/* <div className="row g-3 mb-4">
        <div className="col-md-2">
          <select 
        className="form-select"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="">Tous les statuts</option>
        <option value="ENVOYÉ">Envoyé</option>
        <option value="PENDING">Pending</option>
        <option value="ÉCHOUÉ">Échoué</option>
      </select>
        </div>
        <div className="col-md-3 position-relative">
          <input type="date" className="form-control" />
        </div>
        <div className="col-md-3 position-relative">
      <input 
        type="date" 
        className="form-control" 
        value={dateDebut}
        onChange={(e) => setDateDebut(e.target.value)}
        placeholder="Date début"
      />
    </div>
        <div className="col-md-3 position-relative">
          <input type="date"
           className="form-control"
            value={dateFin}
            onChange={(e) => setDateFin(e.target.value)}
            placeholder="Date fin"

           />
        </div>
        <div className="col-md-4 position-relative">
          <input type="text" placeholder="Rechercher" className="form-control" />
          <Search className="filter-icon" size={18} />
        </div>
      </div> */}
    
      <div className="row g-3 mb-4">
        <div className="col-md-2">
          <select 
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Tous les statuts</option>
            <option value="ENVOYÉ">Envoyé</option>
            <option value="PENDING">Pending</option>
            <option value="ÉCHOUÉ">Échoué</option>
          </select>
        </div>
        
        {/* Input pour filtrer par DATE D'ENVOI */}
        <div className="col-md-3 position-relative">
          <input 
            type="date" 
            className="form-control" 
            value={dateEnvoiFilter}
            onChange={(e) => setDateEnvoiFilter(e.target.value)}
            placeholder="Date d'envoi"
          />
          <small className="text-muted">Date d'envoi</small>
        </div>
        
        {/* Input pour filtrer par DATE DE CRÉATION */}
        <div className="col-md-3 position-relative">
          <input 
            type="date" 
            className="form-control" 
            value={dateCreationFilter}
            onChange={(e) => setDateCreationFilter(e.target.value)}
            placeholder="Date de création"
          />
          <small className="text-muted">Date de création</small>
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
              
              {filteredCampaigns.map((campaign) => (
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
                  <td className="align-middle">{formatDate(campaign.sentDate)}</td>
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
              {filteredCampaigns.length === 0 && (
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