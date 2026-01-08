import React from "react";
import "./ConfirmModal.css";

export default function ConfirmModal({
  title = "Êtes Vous Sûr ?",
  subtitle = "Cette Action Est Irréversible !",
  confirmText = "CONFIRMER",
  cancelText = "ANNULER",
  onCancel,
  onConfirm,
}) {
  return (
    <div className="custom-modal-overlay" style={{ zIndex: 10000 }}>
      <div className="custom-modal-content confirmation-card text-center p-5">
        <h2 className="confirm-modal-title mb-3">{title}</h2>
        <p className="confirm-modal-subtitle mb-4">{subtitle}</p>

        <div className="d-flex justify-content-center gap-3 mt-2">
          <button type="button" onClick={onCancel} className="btn-confirm-cancel">
            {cancelText}
          </button>
          <button type="button" onClick={onConfirm} className="btn-confirm-submit">
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
