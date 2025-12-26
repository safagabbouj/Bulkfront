import React from "react";
import { ChevronDown, Plus, Search, Calendar, Trash2 } from "lucide-react";
import MainLayout from "../../layout/MainLayout";
import "../GestionDesCampagnes/ListeDesCampagnes/GestionDesCampagnes.css";
import { useState } from "react";
import AddContactModal from "./AddContactModal";
const ContactList = () => {
  const campaigns = Array(7).fill({
    name: "Test01",
    status: "Enregistré",
    language: "Français",
    dateCreation: "04/06/2023 10:06",
    dateEnvoi: "04/06/2023 10:06",
    dateFin: "04/06/2023 10:06",
  });
  const [showAddContact, setShowAddContact] = useState(false);


  return (
    <MainLayout
      pageTitle="Gestion des contacts"
      pageSubtitle="Liste des contacts"
    >
      <div className="container-fluid p-0">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold m-0">LISTE DES CONTACTS</h2>
          <button onClick={() => setShowAddContact(true)} className="btn-new-campagne">

            <span className="icon-box">
              <Plus size={18} />
            </span>
            New contact
          </button>
        </div>

        {/* Filtres */}
        <div className="row g-3 mb-4">
          <div className="col-md-2">
            <select className="form-select">
              <option>Statut</option>
            </select>
          </div>
          <div className="col-md-3 position-relative">
            <input
              type="text"
              placeholder="Date Creation"
              className="form-control"
            />
            <Calendar className="filter-icon" size={18} />
          </div>
          <div className="col-md-3 position-relative">
            <input
              type="text"
              placeholder="Date D'envoi"
              className="form-control"
            />
            <Calendar className="filter-icon" size={18} />
          </div>
          <div className="col-md-4 position-relative">
            <input
              type="text"
              placeholder="Rechercher"
              className="form-control"
            />
            <Search className="filter-icon" size={18} />
          </div>
        </div>

        <div className="card shadow-sm border-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="text-muted small">Liste Des Contacts</th>
                  <th className="text-muted small">utilisateur proprietaire</th>
                  <th className="text-muted small">Nombre de contact</th>
                  <th className="text-muted small">Date Création</th>
                  <th className="text-muted small">Date De dernier Utilisation</th>
                  <th className="text-muted small">Action</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign, idx) => (
                  <tr key={idx}>
                    <td className="align-middle">{campaign.name}</td>
                    <td className="align-middle">{campaign.status}</td>
                    <td className="align-middle">{campaign.language}</td>
                    <td className="align-middle">{campaign.dateCreation}</td>
                    <td className="align-middle">{campaign.dateEnvoi}</td>
                    <td className="align-middle">{campaign.dateFin}</td>
                    <td>
                      <div className="d-flex gap-2 align-items-center">
                        <button className="btn-details">Détails »</button>
                        <button className="btn-delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showAddContact && (
  <AddContactModal onClose={() => setShowAddContact(false)} />
)}

    </MainLayout>
  );
};

export default ContactList;
