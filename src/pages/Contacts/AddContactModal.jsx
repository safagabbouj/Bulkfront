import React, { useState } from "react";
import "./Contacts.css";
import FileDropZone from "./FileDropZone";
import DualUserPicker from "./DualUserPicker";
import ConfirmModal from "../Utilisateurs/ConfirmModal";
export default function AddContactModal({ users, onClose, onSubmit }) {
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
 const [showConfirm, setShowConfirm] = useState(false); // État pour l'alerte
 
  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-content">
        <div className="p-4">        git push origin group --force
          <h5 className="modal-title-center">Ajouter Un Contact</h5>

          <div className="mt-4 form-grid">
            <label>Nom De La Liste :</label>
            <input className="form-control" value={nom} onChange={(e) => setNom(e.target.value)} />

            <label>Description :</label>
            <textarea className="form-control" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />

            <label>Importer Un Fichier :</label>
            <FileDropZone fileName={file?.name} onPick={setFile} />

            <label style={{ paddingTop: 14 }}> </label>
            <DualUserPicker users={users} selectedIds={selectedUsers} onChange={setSelectedUsers} />
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
            AJOUTER
          </button>
        </div>
      </div>

      {/* ConfirmModal pour confirmer l'ajout */}
      {showConfirm && (
        <ConfirmModal
          title="Confirmer l'ajout"
          subtitle="Êtes-vous sûr de vouloir ajouter ce contact ?"
          onCancel={() => setShowConfirm(false)}
          onConfirm={() => {
            onSubmit({
              nom: nom || "Test01",
              description,
              selectedUsers,
              fileName: file?.name || "",
            });
            setShowConfirm(false);
            onClose();
          }}
        />
      )}
    </div>
  );
}
