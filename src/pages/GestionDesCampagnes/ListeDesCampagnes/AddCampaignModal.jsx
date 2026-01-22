import React, { useState } from "react";
import "../../Contacts/Contacts.css";
import ConfirmModal from "../../Contacts/ConfirmModal"

const AddCampaignModal = ({ onClose, onSubmit, isLoading }) => {
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [typeDeMessage, setTypeDeMessage] = useState("");
  const [entete, setEntete] = useState("");
  const [listeDeContact, setListeDeContact] = useState("");
  const [message, setMessage] = useState("");
  const [dateEnvoi, setDateEnvoi] = useState("");
  const [numeroDeTest, setNumeroDeTest] = useState("");
  const [showConfirm, setShowConfirm] = useState(false); // État pour l'alerte

  const handleSubmit = async () => {
    // Transmettre les données via onSubmit
    await onSubmit({
      nom: nom.trim() === "" ? "Test 01" : nom,
      description,
      type,
      typeDeMessage,
      entete,
      listeDeContact,
      message,
      dateEnvoi,
      numeroDeTest,
    });
    setShowConfirm(false);
    onClose();
  };

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-content">
        <div className="p-4">
          <h5 className="modal-title-center">Ajouter Une Campagne</h5>

          <div className="mt-4 form-grid">
            <label>Nom :</label>
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

            <label>Type :</label>
            <input
              className="form-control"
              value={type}
              onChange={(e) => setType(e.target.value)}
              disabled={isLoading}
            />

            <label>Type De Message :</label>
            <input
              className="form-control"
              value={typeDeMessage}
              onChange={(e) => setTypeDeMessage(e.target.value)}
              disabled={isLoading}
            />

            <label>Entête :</label>
            <input
              className="form-control"
              value={entete}
              onChange={(e) => setEntete(e.target.value)}
              disabled={isLoading}
            />

            <label>Liste De Contact :</label>
            <input
              className="form-control"
              value={listeDeContact}
              onChange={(e) => setListeDeContact(e.target.value)}
              disabled={isLoading}
            />

            <label>Message :</label>
            <textarea
              className="form-control"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isLoading}
            />

            <label>Date D'Envoi :</label>
            <input
              className="form-control"
              type="date"
              value={dateEnvoi}
              onChange={(e) => setDateEnvoi(e.target.value)}
              disabled={isLoading}
            />

            <label>Numéro De Test :</label>
            <input
              className="form-control"
              value={numeroDeTest}
              onChange={(e) => setNumeroDeTest(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="modal-footer-center">
          <button onClick={onClose} className="btn btn-outline-orange px-4" disabled={isLoading}>
            ANNULER
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            className="btn btn-orange px-4"
            disabled={isLoading}
          >
            {isLoading ? 'AJOUT...' : 'AJOUTER'}
          </button>
        </div>
      </div>

      {showConfirm && (
        <ConfirmModal
          title="Confirmer l'ajout"
          subtitle="Êtes-vous sûr de vouloir ajouter cette campagne ?"
          onCancel={() => setShowConfirm(false)}
          onConfirm={handleSubmit}
        />
      )}
    </div>
  );
};

export default AddCampaignModal;