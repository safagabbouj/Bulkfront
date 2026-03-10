import React from "react";
import { X } from "lucide-react";
import "../Contacts/Contacts.css";

export default function DetailsUserModal({ user, onClose }) {
  if (!user) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-content">
        <div className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="modal-title-center">Détails de l'utilisateur</h5>
            <button
              type="button"
              className="btn-close-custom"
              onClick={onClose}
              aria-label="Fermer"
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                color: "#333",
              }}
            >
              <X size={20} />
            </button>
          </div>

          <div className="details-container">
            <div className="detail-row mb-3">
              <div className="row">
                <div className="col-sm-4">
                  <strong>Nom :</strong>
                </div>
                <div className="col-sm-8">{user.firstName}</div>
              </div>
            </div>

            <div className="detail-row mb-3">
              <div className="row">
                <div className="col-sm-4">
                  <strong>Prénom :</strong>
                </div>
                <div className="col-sm-8">{user.lastName}</div>
              </div>
            </div>

            <div className="detail-row mb-3">
              <div className="row">
                <div className="col-sm-4">
                  <strong>Email :</strong>
                </div>
                <div className="col-sm-8">{user.email}</div>
              </div>
            </div>

            {/* <div className="detail-row mb-3">
              <div className="row">
                <div className="col-sm-4">
                  <strong>Mobile :</strong>
                </div>
                <div className="col-sm-8">{user.mobile}</div>
              </div>
            </div> */}

            <div className="detail-row mb-3">
              <div className="row">
                <div className="col-sm-4">
                  <strong>Rôle :</strong>
                </div>
                <div className="col-sm-8">{user.role}</div>
              </div>
            </div>

            {/* <div className="detail-row mb-3">
              <div className="row">
                <div className="col-sm-4">
                  <strong>Date de création :</strong>
                </div>
                <div className="col-sm-8">{user.dateCreation}</div>
              </div>
            </div> */}
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