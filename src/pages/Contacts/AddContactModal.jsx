import React, { useState } from "react";
import "./Contacts.css";
import FileDropZone from "./FileDropZone";
import DualUserPicker from "./DualUserPicker";

export default function AddContactModal({ users, onClose, onSubmit, isLoading }) {
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleSubmit = async () => {
    await onSubmit({
      nom: nom || "Test01",
      description,
      selectedUsers,
      fileName: file?.name || "",
    });
    onClose();
  };

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-content">
        <div className="p-4">
          <h5 className="modal-title-center">Ajouter Un Contact</h5>

          <div className="mt-4 form-grid">
            <label>Nom De La Liste :</label>
            <input 
              className="form-control" 
              value={nom} 
              onChange={(e) => setNom(e.target.value)}
              disabled={isLoading}
            />

            <label>Description :</label>
            <textarea 
              className="form-control" 
              rows={3} 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              disabled={isLoading}
            />

            <label>Importer Un Fichier :</label>
            <FileDropZone fileName={file?.name} onPick={setFile} />

            <label style={{ paddingTop: 14 }}> </label>
            <DualUserPicker users={users} selectedIds={selectedUsers} onChange={setSelectedUsers} />
          </div>
        </div>

        <div className="modal-footer-center">
          <button onClick={onClose} className="btn btn-outline-orange px-4" disabled={isLoading}>
            ANNULER
          </button>
          <button
            onClick={handleSubmit}
            className="btn btn-orange px-4"
            disabled={isLoading}
          >
            {isLoading ? 'AJOUT...' : 'AJOUTER'}
          </button>
        </div>
      </div>
    </div>
  );
}