import { X, ChevronsRight, ChevronsLeft, User, Search } from "lucide-react";
import UploadBox from "../GestionDesCampagnes/StopSMS/components/UploadBox";
import "./AddContactModal.css";

const AddContactModal = ({ onClose }) => {
  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-content card">
        {/* HEADER */}
        <div className="card-header bg-white border-0 d-flex justify-content-center align-items-center pt-4 position-relative">
          <h2 className="h5 fw-bold mb-0">Ajouter Un Contact</h2>
          <X className="cursor-pointer position-absolute end-0 me-4" onClick={onClose} />
        </div>

        {/* BODY */}
        <div className="card-body px-5">
          <div className="row g-3">
            {/* Nom */}
            <div className="col-12">
              <label className="form-label label-custom">Nom De La Liste :</label>
              <input type="text" className="form-control custom-input" />
            </div>

            {/* Description */}
            <div className="col-12">
              <label className="form-label label-custom">Description :</label>
              <textarea className="form-control custom-input" rows="3"></textarea>
            </div>

            {/* Upload CSV */}
            <div className="col-12">
              <label className="form-label label-custom">Importer Un Fichier :</label>
              <UploadBox hideHeader={true} />
            </div>

            {/* SECTION SÉLECTION UTILISATEURS */}
            <div className="col-12 mt-4">
              <div className="dual-list-container">
                
                {/* Colonne Gauche */}
                <div className="users-column">
                  <label className="label-custom">Liste Des Utilisateurs :</label>
                  <div className="users-box">
                    <div className="search-container">
                      <input type="text" placeholder="Chercher..." className="search-input" />
                    </div>
                    <div className="list-items">
                      {Array(7).fill("Rayan Rayan").map((name, i) => (
                        <div key={i} className={`user-row ${i === 3 ? 'active' : ''}`}>
                          <User size={16} className="text-secondary me-2" />
                          <span>{name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Boutons Centraux */}
                <div className="users-actions">
                  <button className="btn-transfer active">
                    <ChevronsRight size={20} />
                  </button>
                  <button className="btn-transfer disable">
                    <ChevronsLeft size={20} />
                  </button>
                </div>

                {/* Colonne Droite */}
                <div className="users-column">
                  <label className="label-custom">Les Utilisateurs Sélectionnés :</label>
                  <div className="users-box">
                    <div className="search-container">
                      <input type="text" placeholder="Chercher..." className="search-input" />
                    </div>
                    <div className="list-items empty">
                      {/* Vide comme sur la capture */}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="card-footer bg-white border-0 d-flex justify-content-center gap-3 pb-5 mt-3">
          <button className="btn-annuler" onClick={onClose}>ANNULER</button>
          <button className="btn-ajouter">AJOUTER</button>
        </div>
      </div>
    </div>
  );
};

export default AddContactModal;