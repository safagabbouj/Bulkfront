import React, {useState} from 'react';
import { Calendar } from 'lucide-react';
import ConfirmModal from "../../Utilisateurs/ConfirmModal";


const AddCampaignModal = ({ onClose, onSubmit }) => {
    const [nom, setNom] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false); // État pour l'alerte

    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-content card" style={{ maxWidth: '700px', width: '90%' }}>
                <div className="card-header bg-white border-0 text-center py-3 px-4">
                    <h2 className="h5 fw-bold mb-0">Ajouter Une Campagne</h2>
                </div>

                <div className="card-body px-5 py-3">
                    <div className="row g-2">
                        <div className="col-12">
                            <div className="row align-items-center mb-2">
                                <div className="col-4 text-end">
                                    <label className="form-label mb-0 small">Nom De La Campagne :</label>
                                </div>
                                <div className="col-8">
                                    <input type="text" className="form-control form-control-sm" />
                                </div>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="row align-items-center mb-2">
                                <div className="col-4 text-end">
                                    <label className="form-label mb-0 small">Type :</label>
                                </div>
                                <div className="col-8">
                                    <select className="form-select form-select-sm">
                                        <option>Sélectionner</option>
                                    </select>
                                    <small className="text-warning d-block" style={{ fontSize: '0.7rem' }}>
                                        ⚠ Vous Pouvez Sélectionner Plusieurs Types
                                    </small>
                                </div>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="row align-items-start mb-2">
                                <div className="col-4 text-end">
                                    <label className="form-label mb-0 small pt-1">Description :</label>
                                </div>
                                <div className="col-8">
                                    <textarea className="form-control form-control-sm" rows="2"></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="row align-items-center mb-2">
                                <div className="col-4 text-end">
                                    <label className="form-label mb-0 small">Type De Message :</label>
                                </div>
                                <div className="col-8">
                                    <div className="d-flex align-items-center">
                                        <select className="form-select form-select-sm">
                                            <option>Sélectionner</option>
                                        </select>
                                        <span className="text-danger ms-2">*</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="row align-items-center mb-2">
                                <div className="col-4 text-end">
                                    <label className="form-label mb-0 small">Entête :</label>
                                </div>
                                <div className="col-8">
                                    <select className="form-select form-select-sm">
                                        <option>Sélectionner</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="row align-items-center mb-2">
                                <div className="col-4 text-end">
                                    <label className="form-label mb-0 small">Liste De Contact :</label>
                                </div>
                                <div className="col-8">
                                    <select className="form-select form-select-sm">
                                        <option>Sélectionner</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="row align-items-start mb-2">
                                <div className="col-4 text-end">
                                    <label className="form-label mb-0 small pt-1">Message :</label>
                                </div>
                                <div className="col-8">
                                    <textarea className="form-control form-control-sm" rows="2"></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="row align-items-center mb-2">
                                <div className="col-4 text-end">
                                    <label className="form-label mb-0 small">Date D'envoi :</label>
                                </div>
                                <div className="col-8">
                                    <div className="position-relative">
                                        <input type="text" className="form-control form-control-sm" />
                                        <Calendar
                                            className="position-absolute"
                                            size={16}
                                            style={{ right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="row align-items-center mb-2">
                                <div className="col-4 text-end">
                                    <label className="form-label mb-0 small">Numéro De Test :</label>
                                </div>
                                <div className="col-8">
                                    <input type="text" className="form-control form-control-sm" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-footer bg-white border-0 d-flex justify-content-center gap-3 py-3 px-4">
                    <button
                        onClick={onClose}
                        className="btn btn-outline-warning px-5 text-uppercase"
                        style={{ borderColor: '#ff9800', color: '#ff9800', fontSize: '0.9rem' }}
                    >
                        Annuler
                    </button>
                    <button
                        onClick={() => setShowConfirm(true)}
                        className="btn px-5 text-uppercase text-white"
                        style={{ backgroundColor: '#ff9800', borderColor: '#ff9800', fontSize: '0.9rem' }}
                    >
                        Ajouter
                    </button>
                </div>
            </div>

            {showConfirm && (
                <ConfirmModal
                    title="Confirmer l'ajout"
                    subtitle="Êtes-vous sûr de vouloir ajouter cette compaigne ?"
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
};

export default AddCampaignModal;