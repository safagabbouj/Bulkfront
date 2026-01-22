import React from "react";
import { X } from "lucide-react";
import "./Reporting.css";

export default function DetailsReportingModal({ campaign, onClose }) {
  if (!campaign) return null;

  const Row = ({ label, value }) => (
    <div className="details-row">
      <div className="details-label">{label}</div>
      <div className="details-value">{value ?? ""}</div>
    </div>
  );

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-content details-modal">
        {/* Header */}
        <div className="details-header">
          <h2 className="details-title">Détails de la campagne</h2>

          <button type="button" className="details-close" onClick={onClose} aria-label="Fermer">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="details-body">
          <Row label="Nom de la campagne :" value={campaign.name} />
          <Row label="Type de la campagne :" value={campaign.type} />
          <Row label="Type du message :" value={campaign.msgType} />
          <Row label="Statut :" value={campaign.status || "Non défini"} />
          <Row label="Langue :" value={campaign.language || "Non défini"} />
          <Row label="Date de création :" value={campaign.dateCreation || "Non défini"} />
          <Row label="Date d'envoi :" value={campaign.dateEnvoi || "Non défini"} />
          <Row label="Date de fin :" value={campaign.dateFin || "Non défini"} />
          <Row label="Description :" value={campaign.description || "Non définie"} />
          <Row label="Message :" value={campaign.message || "Non défini"} />
          <Row label="En-tête :" value={campaign.entete || "Non défini"} />
        </div>

        {/* Footer */}
        <div className="details-footer">
          <button onClick={onClose} className="btn btn-outline-orange px-5">
            FERMER
          </button>
        </div>
      </div>
    </div>
  );
}