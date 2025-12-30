import React, { useState } from "react";
import "./ListeDesUtilisateurs.css"; 

export default function AddUserModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    nom: "Rayan",
    prenom: "Rayan",
    email: "rayan.orangecontact@gmail.com",
    mobile: "55 443 322",
    actif: true,
    role: "USER_ROLE",
    dateCreation: "04/06/2023 10:06",
    campagnes: "23M",
  });

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-content">
        <div className="p-4">
          <h5 className="modal-title-center">Ajouter Un Utilisateur</h5>

          <div className="mt-4 form-grid">
            <label>Nom :</label>
            <input className="form-control" value={form.nom} onChange={(e) => update("nom", e.target.value)} />

            <label>Prénom :</label>
            <input className="form-control" value={form.prenom} onChange={(e) => update("prenom", e.target.value)} />

            <label>Email :</label>
            <input className="form-control" value={form.email} onChange={(e) => update("email", e.target.value)} />

            <label>Mobile :</label>
            <input className="form-control" value={form.mobile} onChange={(e) => update("mobile", e.target.value)} />

            <label>Actif :</label>
            <div className="form-check form-switch m-0">
              <input
                className="form-check-input"
                type="checkbox"
                checked={form.actif}
                onChange={(e) => update("actif", e.target.checked)}
              />
            </div>

            <label>Role :</label>
            <select className="form-select" value={form.role} onChange={(e) => update("role", e.target.value)}>
              <option value="USER_ROLE">USER_ROLE</option>
              <option value="ADMIN_ROLE">ADMIN_ROLE</option>
              <option value="SUPER_ADMIN">SUPER_ADMIN</option>
            </select>
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
            AJOUTER
          </button>
        </div>
      </div>
    </div>
  );
}
