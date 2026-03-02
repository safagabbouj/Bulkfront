import React from "react";
import { X } from "lucide-react";
import "./AlertesServices.css";

export default function DetailsAlerteModal({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-content details-modal">
        <div className="details-header">
          <h2 className="details-title">Détails du Seuil</h2>

          <button type="button" className="details-close" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="details-body">
          <div className="details-row">
            <div className="details-label">Nombre Des Sms :</div>
            <div className="details-value">{item.nbSms}</div>
          </div>

          <div className="details-row">
            <div className="details-label">Notifier Par Sms :</div>
            <div className="details-value">{item.notifySms ? "Oui" : "Non"}</div>
          </div>

          <div className="details-row">
            <div className="details-label">Numéro De Téléphone :</div>
            <div className="details-value">{item.phone || "-"}</div>
          </div>

          <div className="details-row">
            <div className="details-label">Notifier Par Email :</div>
            <div className="details-value">{item.notifyEmail ? "Oui" : "Non"}</div>
          </div>

          <div className="details-row">
            <div className="details-label">Email :</div>
            <div className="details-value">{item.email ? item.email : "Non"}</div>
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
