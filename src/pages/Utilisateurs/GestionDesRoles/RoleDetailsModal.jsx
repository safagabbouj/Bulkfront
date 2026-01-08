import React from "react";
import { X } from "lucide-react";
import "./GestionRoles.css";

export default function RoleDetailsModal({ role, onClose }) {
  if (!role) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-content details-modal">
        <div className="details-header">
          <h2 className="details-title">Détails du Rôle</h2>

          <button type="button" className="details-close" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="details-body">
          <div className="details-row">
            <div className="details-label">Nom :</div>
            <div className="details-value">{role.nom || "-"}</div>
          </div>

          <div className="details-row">
            <div className="details-label">Pages :</div>
            <div className="details-value">
              {role.pages?.length ? role.pages.join(", ") : "-"}
            </div>
          </div>
        </div>

        <div className="details-footer">
          <button type="button" className="btn btn-outline-orange px-4" onClick={onClose}>
            FERMER
          </button>
        </div>
      </div>
    </div>
  );
}
