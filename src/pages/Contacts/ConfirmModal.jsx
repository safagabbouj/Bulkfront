import React from "react";
import "./Contacts.css";

export default function ConfirmModal({ title, subtitle, onCancel, onConfirm }) {
  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-content" style={{ maxWidth: 520 }}>
        <div className="p-4 text-center">
          <h5 className="fw-bold mb-2">{title}</h5>
          <div className="text-muted">{subtitle}</div>
        </div>

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
}
