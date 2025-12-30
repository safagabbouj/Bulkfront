import React from "react";
import "./AlertesServices.css";

export default function ConfirmModal({ title, subtitle, onCancel, onConfirm }) {
  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-content" style={{ maxWidth: 520 }}>
        <div className="p-4 text-center">
          <h5 className="fw-bold mb-2">{title}</h5>
          <div className="text-muted">{subtitle}</div>
        </div>

        <div className="modal-footer-center">
          <button onClick={onCancel} className="btn btn-outline-orange px-4">
            ANNULER
          </button>
          <button onClick={onConfirm} className="btn btn-orange px-4">
            CONFIRMER
          </button>
        </div>
      </div>
    </div>
  );
}
