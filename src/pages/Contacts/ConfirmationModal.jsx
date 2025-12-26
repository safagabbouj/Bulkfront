import React from "react";
import "./AddContactModal.css"; // Nous allons réutiliser les styles de base

const ConfirmationModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="custom-modal-overlay" style={{ zIndex: 10000 }}>
      <div className="custom-modal-content confirmation-card text-center p-5">
        <h2 className="fw-bold mb-4">Êtes Vous Sûr ?</h2>
        <p className="text-muted mb-5">Cette Action Est Irréversible !</p>
        
        <div className="d-flex justify-content-center gap-3">
          <button className="btn-annuler px-5" onClick={onCancel}>
            ANNULER
          </button>
          <button className="btn-confirm-orange px-5" onClick={onConfirm}>
            CONFIRMER
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;