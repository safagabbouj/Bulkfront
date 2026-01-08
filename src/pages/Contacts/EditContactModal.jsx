import React, { useState } from "react";
import "./Contacts.css";
import FileDropZone from "./FileDropZone";
import DualUserPicker from "./DualUserPicker";
import ConfirmModal from "../Utilisateurs/ConfirmModal"; // ✅ نفس confirm متاع add

export default function EditContactModal({ users, item, onClose, onSubmit }) {
  const [form, setForm] = useState({ ...item });
  const [pickedFile, setPickedFile] = useState(null);

  const [showConfirm, setShowConfirm] = useState(false); // ✅ NEW

  const stats = form.stats || {
    nationalValid: 1,
    internationalValid: 0,
    invalid: 0,
    empty: 0,
  };

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-content">
        <div className="p-4">
          <h5 className="modal-title-center">Mise A Jour</h5>

          <div className="mt-4 form-grid">
            <label>Nom De La Liste :</label>
            <input
              className="form-control"
              value={form.nom}
              onChange={(e) => setForm((p) => ({ ...p, nom: e.target.value }))}
            />

            <label>Description :</label>
            <textarea
              className="form-control"
              rows={3}
              value={form.description || ""}
              onChange={(e) =>
                setForm((p) => ({ ...p, description: e.target.value }))
              }
            />

            <label>Statistique :</label>
            <div className="statsBox">
              <div className="statsRow">
                <div>Nombre De Lignes Nationales Valides</div>
                <div className="text-end">{stats.nationalValid}</div>
              </div>
              <div className="statsRow">
                <div>Nombre De Lignes Internationales Valides</div>
                <div className="text-end">{stats.internationalValid}</div>
              </div>
              <div className="statsRow">
                <div>Nombre De Lignes Invalides</div>
                <div className="text-end">{stats.invalid}</div>
              </div>
              <div className="statsRow">
                <div>Nombre De Lignes Vides</div>
                <div className="text-end">{stats.empty}</div>
              </div>
            </div>

            <label>Importer Un Fichier :</label>
            <FileDropZone
              fileName={pickedFile?.name || form.fileName}
              onPick={setPickedFile}
            />

            <label style={{ paddingTop: 14 }}> </label>
            <DualUserPicker
              users={users}
              selectedIds={form.selectedUsers || []}
              onChange={(selectedUsers) =>
                setForm((p) => ({ ...p, selectedUsers }))
              }
            />
          </div>
        </div>

        <div className="modal-footer-center">
          <button onClick={onClose} className="btn btn-outline-orange px-4">
            ANNULER
          </button>

          <button
            onClick={() => setShowConfirm(true)}
            className="btn btn-orange px-4"
          >
            MODIFIER
          </button>
        </div>
      </div>

      {showConfirm && (
        <ConfirmModal
          title="Confirmer la modification"
          subtitle="Êtes-vous sûr de vouloir modifier ce contact ?"
          onCancel={() => setShowConfirm(false)}
          onConfirm={() => {
            onSubmit({
              ...form,
              fileName: pickedFile?.name || form.fileName,
            });
            setShowConfirm(false);
            onClose();
          }}
        />
      )}
    </div>
  );
}
