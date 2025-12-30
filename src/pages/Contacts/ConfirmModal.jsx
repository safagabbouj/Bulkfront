import React from "react";
import "./Contacts.css";

export default function ConfirmModal({ title, subtitle, onCancel, onConfirm }) {
  return (
    <div className="custom-modal-overlay" style={{ zIndex: 10000 }}>
      <div className="custom-modal-content confirmation-card text-center p-5">
        <h2 className="confirm-modal-title mb-4">{title || "Êtes Vous Sûr ?"}</h2>
        <p className="confirm-modal-subtitle mb-5">{subtitle || "Cette Action Est Irréversible !"}</p>
        
        <div className="d-flex justify-content-center gap-3 mt-2">
          <button 
            type="button"
            onClick={onCancel} 
            className="btn-confirm-cancel"
          >
            ANNULER
          </button>
          <button 
            type="button"
            onClick={onConfirm} 
            className="btn-confirm-submit"
          >
            CONFIRMER
          </button>
        </div>
      </div>
    </div>
  );
}