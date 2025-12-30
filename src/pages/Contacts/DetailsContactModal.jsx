import React from "react";
import { X } from "lucide-react";

export default function DetailsContactModal({ item, users, onClose }) {
  if (!item) return null;

  // Obtenir les noms des utilisateurs sélectionnés
  const getUserNames = (selectedUserIds) => {
    if (!selectedUserIds || selectedUserIds.length === 0) {
      return "Aucun utilisateur sélectionné";
    }
    
    const names = selectedUserIds.map(id => {
      const user = users.find(u => u.id === id);
      return user ? user.name : `User ${id}`;
    });
    
    return names.join(", ");
  };

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-content">
        <div className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="modal-title-center">Détails du Contact</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose}
              aria-label="Fermer"
            >
              <X size={20} />
            </button>
          </div>

          <div>
            <div className="details-container">
              <div className="detail-row mb-3">
                <div className="row">
                  <div className="col-sm-4">
                    <strong>Nom :</strong>
                  </div>
                  <div className="col-sm-8">
                    {item.nom}
                  </div>
                </div>
              </div>

              <div className="detail-row mb-3">
                <div className="row">
                  <div className="col-sm-4">
                    <strong>Utilisateur Propriétaire :</strong>
                  </div>
                  <div className="col-sm-8">
                    {item.owner}
                  </div>
                </div>
              </div>

              <div className="detail-row mb-3">
                <div className="row">
                  <div className="col-sm-4">
                    <strong>Nombre de Contacts :</strong>
                  </div>
                  <div className="col-sm-8">
                    {item.nbContacts}
                  </div>
                </div>
              </div>

              <div className="detail-row mb-3">
                <div className="row">
                  <div className="col-sm-4">
                    <strong>Date de Création :</strong>
                  </div>
                  <div className="col-sm-8">
                    {item.dateCreation}
                  </div>
                </div>
              </div>

              <div className="detail-row mb-3">
                <div className="row">
                  <div className="col-sm-4">
                    <strong>Dernière Utilisation :</strong>
                  </div>
                  <div className="col-sm-8">
                    {item.lastUse}
                  </div>
                </div>
              </div>

              <div className="detail-row mb-3">
                <div className="row">
                  <div className="col-sm-4">
                    <strong>Description :</strong>
                  </div>
                  <div className="col-sm-8">
                    {item.description || "Aucune description"}
                  </div>
                </div>
              </div>

              <div className="detail-row mb-3">
                <div className="row">
                  <div className="col-sm-4">
                    <strong>Fichier :</strong>
                  </div>
                  <div className="col-sm-8">
                    {item.fileName || "Aucun fichier"}
                  </div>
                </div>
              </div>

              <div className="detail-row mb-3">
                <div className="row">
                  <div className="col-sm-4">
                    <strong>Utilisateurs Sélectionnés :</strong>
                  </div>
                  <div className="col-sm-8">
                    {getUserNames(item.selectedUsers)}
                  </div>
                </div>
              </div>

              {/* Statistiques */}
              {item.stats && (
                <div className="detail-row mb-3">
                  <div className="row">
                    <div className="col-sm-4">
                      <strong>Statistiques :</strong>
                    </div>
                    <div className="col-sm-8">
                      <div className="stats-grid">
                        <div className="stat-item mb-2">
                          <span className="stat-label">National Valide:</span>
                          <span className="stat-number ms-2 fw-bold">{item.stats.nationalValid}</span>
                        </div>
                        <div className="stat-item mb-2">
                          <span className="stat-label">International Valide:</span>
                          <span className="stat-number ms-2 fw-bold">{item.stats.internationalValid}</span>
                        </div>
                        <div className="stat-item mb-2">
                          <span className="stat-label">Invalide:</span>
                          <span className="stat-number ms-2 fw-bold">{item.stats.invalid}</span>
                        </div>
                        <div className="stat-item mb-2">
                          <span className="stat-label">Vide:</span>
                          <span className="stat-number ms-2 fw-bold">{item.stats.empty}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="modal-footer-center">
          <button 
            type="button" 
            className="btn btn-outline-orange px-4" 
            onClick={onClose}
          >
            FERMER
          </button>
        </div>
      </div>
    </div>
  );
}