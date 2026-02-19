import React, { useState } from "react";
import "../../Contacts/Contacts.css";
import ConfirmModal from "../../Contacts/ConfirmModal";
import { useContacts } from "../../../hooks/useContacts";
import { useCampaignTypes } from "../../../hooks/useCampaignTypes";
import { useContactDetailsForCampaign } from "../../../hooks/useCampaigns";
import { useAccountSubjects } from "../../../hooks/useAccountSubjects";

const AddCampaignModal = ({ onClose, onSubmit, isLoading }) => {
  const { data: contacts = [], isLoading: contactsLoading } = useContacts();
  const { data: subjects = [], isLoading: isSubjectsLoading } = useAccountSubjects();
  const { data: campaignTypes = [], isLoading: isTypesLoading } = useCampaignTypes();

  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [typeDeMessage, setTypeDeMessage] = useState("");
  const [listeDeContact, setListeDeContact] = useState("");
  const [message, setMessage] = useState("");
  const [dateEnvoi, setDateEnvoi] = useState("");
  const [numeroDeTest, setNumeroDeTest] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [entete, setEntete] = useState("");

  // Charger les détails du contact dès qu'un contact est sélectionné
  const { data: contactDetails, isLoading: isContactDetailsLoading } = useContactDetailsForCampaign(
    listeDeContact // Charge pour tous les types de messages
  );

  // Debug (optionnel)
  console.log("Type de message:", typeDeMessage);
  console.log("Contact ID:", listeDeContact);
  console.log("Contact Details:", contactDetails);

  const handleSubmit = async () => {
    try {
      setError("");
      
      if (!listeDeContact) {
        setError("Veuillez sélectionner un contact avant de créer la campagne.");
        setShowConfirm(false);
        return;
      }
      if (!type) {
        setError("Veuillez sélectionner un type de campagne.");
        setShowConfirm(false);
        return;
      }
      if (!typeDeMessage) {
        setError("Veuillez sélectionner un type de message.");
        setShowConfirm(false);
        return;
      }

      await onSubmit({
        nom: nom.trim() === "" ? "Test 01" : nom,
        description,
        type: type,
        typeDeMessage: typeDeMessage,
        entete: entete,
        listeDeContact,
        message,
        dateEnvoi,
        numeroDeTest,
      });

      console.log("Campagne créée avec succès");
      setShowConfirm(false);
      onClose();
      
    } catch (err) {
      console.error("Erreur lors de la création:", err);
      setError(err.message || "Erreur lors de la création de la campagne");
      setShowConfirm(false);
    }
  };

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-content" style={{ maxWidth: '1000px', maxHeight: '90vh', overflowY: 'auto' }}>
        <div className="p-4">
          <h5 className="modal-title-center">Ajouter Une Campagne</h5>

          {error && (
            <div className="alert alert-danger mt-3" role="alert">
              <strong>⚠️ Erreur :</strong> {error}
            </div>
          )}

          <div className="mt-4">
            <div className="row g-3">
              <div className="col-md-6">
                <label>Nom :</label>
                <input
                  className="form-control"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="col-md-6">
                <label>Type :</label>
                <select
                  className="form-control"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  disabled={isLoading || isTypesLoading}
                >
                  <option value="">
                    {isTypesLoading ? "⏳ Chargement..." : "-- Sélectionnez un type --"}
                  </option>
                  {campaignTypes.map((campType, index) => (
                    <option key={index} value={campType}>
                      {campType}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row g-3 mt-2">
              <div className="col-12">
                <label>Description :</label>
                <textarea
                  className="form-control"
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="row g-3 mt-2">
              <div className="col-md-6">
                <label>Type De Message :</label>
                <select
                  className="form-control"
                  value={typeDeMessage}
                  onChange={(e) => setTypeDeMessage(e.target.value)}
                  disabled={isLoading}
                >
                  <option value="">-- Sélectionnez un type de message --</option>
                  <option value="SMS Simple">SMS Simple</option>
                  <option value="SMS Personnalisé">SMS Personnalisé</option>
                </select>
              </div>

              <div className="col-md-6">
                <label>Entête :</label>
                <select
                  className="form-control"
                  value={entete}
                  onChange={(e) => setEntete(e.target.value)}
                  disabled={isLoading || isSubjectsLoading}
                >
                  <option value="">
                    {isSubjectsLoading ? "⏳ Chargement..." : "-- Sélectionnez un entête --"}
                  </option>
                  {subjects.map((subject, index) => (
                    <option key={index} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row g-3 mt-2">
              <div className="col-12">
                <label>Liste De Contact :</label>
                <select
                  className="form-control"
                  value={listeDeContact}
                  onChange={(e) => setListeDeContact(e.target.value)}
                  disabled={isLoading || contactsLoading}
                >
                  <option value="">
                    {contactsLoading ? "⏳ Chargement..." : "-- Sélectionnez un contact --"}
                  </option>
                  {contacts.map((contact) => (
                    <option key={contact.id} value={contact.id}>
                      {contact.name} ({contact.contactsNumber} numéros)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 🔥 AFFICHAGE SIMPLIFIÉ POUR SMS SIMPLE */}
            {typeDeMessage === "SMS Simple" && listeDeContact && (
              <div className="row mt-3">
                <div className="col-12">
                  {isContactDetailsLoading ? (
                    <div className="text-center py-2 bg-light border rounded">
                      <div className="spinner-border spinner-border-sm" role="status">
                        <span className="visually-hidden">Chargement...</span>
                      </div>
                      <span className="ms-2 text-muted small">Chargement...</span>
                    </div>
                  ) : contactDetails ? (
                    <div className="alert alert-success" role="alert">
                      <strong>📊 Informations du contact :</strong>
                      <ul className="mb-0 mt-2">
                        <li><strong>Description :</strong> {contactDetails.description || "Aucune description"}</li>
                        <li><strong>Nombre de contacts valides :</strong> {contactDetails.contactListInfo?.validFields || 0}</li>
                      </ul>
                    </div>
                  ) : (
                    <div className="alert alert-warning" role="alert">
                      <strong>⚠️</strong> Impossible de charger les informations du contact.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 🔥 AFFICHAGE COMPLET POUR SMS PERSONNALISÉ */}
            {typeDeMessage === "SMS Personnalisé" && listeDeContact && (
              <div className="row mt-3">
                <div className="col-12">
                {isContactDetailsLoading ? (
                  <div className="text-center py-3 bg-light border rounded">
                    <div className="spinner-border spinner-border-sm" role="status">
                      <span className="visually-hidden">Chargement...</span>
                    </div>
                    <p className="mt-2 mb-0 text-muted small">Chargement des détails...</p>
                  </div>
                ) : contactDetails ? (
                  <div className="border rounded p-3 bg-light">
                    <h6 className="fw-bold mb-3">Détails du Contact</h6>

                    {/* Informations */}
                    <div className="mb-3">
                      <p className="mb-1"><strong>Nom :</strong> {contactDetails.name}</p>
                      <p className="mb-1"><strong>Description :</strong> {contactDetails.description || "Aucune description"}</p>
                      <p className="mb-1"><strong>Contacts valides :</strong> {contactDetails.contactListInfo?.validFields || 0}</p>
                      <p className="mb-1"><strong>Numéros nationaux :</strong> {contactDetails.contactListInfo?.nationalNumbers || 0}</p>
                      <p className="mb-1"><strong>Numéros internationaux :</strong> {contactDetails.contactListInfo?.internationalNumbers || 0}</p>
                    </div>

                    {/* Tableau */}
                    {contactDetails.validRows && contactDetails.validRows.length > 0 ? (
                      <>
                        <h6 className="fw-bold mb-2 mt-3">Aperçu des numéros valides</h6>
                        <div className="table-responsive" style={{ maxHeight: '250px', overflowY: 'auto' }}>
                          <table className="table table-sm table-striped table-bordered mb-0">
                            <thead>
                              <tr>
                                <th style={{ minWidth: '150px' }}>📞 Numéro</th>
                                <th style={{ minWidth: '120px' }}>📋 Colonne 1</th>
                                <th style={{ minWidth: '120px' }}>📋 Colonne 2</th>
                                <th style={{ minWidth: '120px' }}>📋 Colonne 3</th>
                                <th style={{ minWidth: '120px' }}>📋 Colonne 4</th>
                                <th style={{ minWidth: '120px' }}>📋 Colonne 5</th>
                              </tr>
                            </thead>
                            <tbody>
                              {contactDetails.validRows.slice(0, 10).map((row, index) => (
                                <tr key={index}>
<td className="fw-bold text-primary">{row.phoneNumber || '-'}</td>
                                  <td>{row.column1 || '-'}</td>
                                  <td>{row.column2 || '-'}</td>
                                  <td>{row.column3 || '-'}</td>
                                  <td>{row.column4 || '-'}</td>
                                  <td>{row.column5 || '-'}</td>                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        {contactDetails.validRows.length > 10 && (
                          <p className="text-muted small mt-2 mb-0">
                            Affichage de 10 sur {contactDetails.validRows.length} contacts
                          </p>
                        )}
                      </>
                    ) : (
                      <p className="text-warning mb-0">Aucun contact valide trouvé.</p>
                    )}
                  </div>
                ) : (
                  <div className="alert alert-danger" role="alert">
                    <strong>❌ Erreur :</strong> Impossible de charger les détails du contact. Veuillez réessayer.
                  </div>
                )}
                </div>
              </div>
            )}

            <div className="row g-3 mt-2">
              <div className="col-12">
                <label>Message :</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={isLoading}
                  placeholder="Entrez votre message ici..."
                />
              </div>
            </div>

            <div className="row g-3 mt-2">
              <div className="col-md-6">
                <label>Date D'Envoi :</label>
                <input
                  className="form-control"
                  type="datetime-local"
                  value={dateEnvoi}
                  onChange={(e) => setDateEnvoi(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="col-md-6">
                <label>Numéro De Test :</label>
                <input
                  className="form-control"
                  value={numeroDeTest}
                  onChange={(e) => setNumeroDeTest(e.target.value)}
                  disabled={isLoading}
                  placeholder="Ex: +21612345678"
                />
              </div>
            </div>
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
            {isLoading ? '⏳ AJOUT EN COURS...' : 'AJOUTER'}
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