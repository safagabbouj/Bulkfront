import React from "react";
import { X } from "lucide-react";

export default function DetailsCampaignModal({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-content">
        <div className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="modal-title-center">Détails de la Campagne</h5>

            <button
              type="button"
              onClick={onClose}
              style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
              aria-label="Fermer"
            >
              <X size={20} />
            </button>
          </div>

          <div className="details-container">
            <div className="detail-row mb-3">
              <div className="row">
                <div className="col-sm-4"><strong>Nom :</strong></div>
                <div className="col-sm-8">{item.name}</div>
              </div>
            </div>

            <div className="detail-row mb-3">
              <div className="row">
                <div className="col-sm-4"><strong>Statut :</strong></div>
                <div className="col-sm-8">{item.status}</div>
              </div>
            </div>

            <div className="detail-row mb-3">
              <div className="row">
                <div className="col-sm-4"><strong>Langue :</strong></div>
                <div className="col-sm-8">{item.language}</div>
              </div>
            </div>

            <div className="detail-row mb-3">
              <div className="row">
                <div className="col-sm-4"><strong>Date Création :</strong></div>
                <div className="col-sm-8">{item.dateCreation}</div>
              </div>
            </div>

            <div className="detail-row mb-3">
              <div className="row">
                <div className="col-sm-4"><strong>Date D'envoi :</strong></div>
                <div className="col-sm-8">{item.dateEnvoi}</div>
              </div>
            </div>

            <div className="detail-row mb-3">
              <div className="row">
                <div className="col-sm-4"><strong>Date Fin :</strong></div>
                <div className="col-sm-8">{item.dateFin}</div>
              </div>
            </div>

            <div className="detail-row mb-3">
              <div className="row">
                <div className="col-sm-4"><strong>Type :</strong></div>
                <div className="col-sm-8">
                  {Array.isArray(item.type) && item.type.length ? item.type.join(", ") : "-"}
                </div>
              </div>
            </div>

            <div className="detail-row mb-3">
              <div className="row">
                <div className="col-sm-4"><strong>Entête :</strong></div>
                <div className="col-sm-8">{item.entete || "-"}</div>
              </div>
            </div>

            <div className="detail-row mb-3">
              <div className="row">
                <div className="col-sm-4"><strong>Description :</strong></div>
                <div className="col-sm-8">{item.description || "-"}</div>
              </div>
            </div>

            <div className="detail-row mb-2">
              <div className="row">
                <div className="col-sm-4"><strong>Message :</strong></div>
                <div className="col-sm-8">{item.message || "-"}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer-center">
          <button type="button" className="btn btn-outline-orange px-4" onClick={onClose}>
            FERMER
          </button>
        </div>
      </div>
    </div>
  );
}
