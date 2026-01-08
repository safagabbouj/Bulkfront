import React from "react";
import { X } from "lucide-react";
import "./ListeDesUtilisateurs.css";

export default function DetailsUserModal({ user, onClose }) {
  if (!user) return null;

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
          <h2 className="details-title">Détails de l'utilisateur</h2>

          <button type="button" className="details-close" onClick={onClose} aria-label="Fermer">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="details-body">
          <Row label="Nom :" value={user.nom} />
          <Row label="Prénom :" value={user.prenom} />
          <Row label="Email :" value={user.email} />
          <Row label="Mobile :" value={user.mobile} />
          <Row label="Actif :" value={user.actif ? "Oui" : "Non"} />
          <Row label="Role :" value={user.role} />
          <Row label="Date Création :" value={user.dateCreation} />
          <Row label="Nombre de Campagnes :" value={user.campagnes} />
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
