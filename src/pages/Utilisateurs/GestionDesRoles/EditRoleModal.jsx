import React, { useState } from "react";
import RolePagesSelect from "./RolePagesSelect";
import "./GestionRoles.css";

export default function EditRoleModal({ role, pagesOptions, onClose, onSubmit }) {
  const [form, setForm] = useState({ ...role });

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-content">
        <div className="p-4">
          <h5 className="modal-title-center">Mise A Jour Un Rôle</h5>

          <div className="mt-4 form-grid">
            <label>Nom :</label>
            <input
              className="form-control"
              value={form.nom}
              onChange={(e) => setForm((p) => ({ ...p, nom: e.target.value }))}
            />

            <label>Pages :</label>
            <RolePagesSelect
              options={pagesOptions}
              selected={form.pages || []}
              onChange={(pages) => setForm((p) => ({ ...p, pages }))}
            />
          </div>
        </div>

        <div className="modal-footer-center">
          <button onClick={onClose} className="btn btn-outline-orange px-4">
            ANNULER
          </button>
          <button
            onClick={() => {
              onSubmit(form);
              onClose();
            }}
            className="btn btn-orange px-4"
          >
            MODIFIER
          </button>
        </div>
      </div>
    </div>
  );
}
