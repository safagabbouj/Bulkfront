import React from 'react';
import { Calendar, X } from 'lucide-react';

const AddCampaignModal = ({ onClose, onSubmit }) => {
    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-content card">
                <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center pt-4 px-4">
                    <h2 className="h5 fw-bold mb-0">Ajouter Une Campagne</h2>
                    <X className="cursor-pointer" onClick={onClose} />
                </div>

                <div className="card-body px-4 overflow-auto" style={{ maxHeight: '75vh' }}>
                    <div className="row g-3">
                        <div className="col-12">
                            <label className="form-label small fw-bold">Nom De La Campagne :</label>
                            <input type="text" className="form-control" />
                        </div>

                        <div className="col-12">
                            <label className="form-label small fw-bold">Type :</label>
                            <select className="form-select">
                                <option>Sélectionner</option>
                            </select>
                            <small className="text-orange d-block mt-1">⚠ Vous Pouvez Sélectionner Plusieurs Types</small>
                        </div>

                        <div className="col-12">
                            <label className="form-label small fw-bold">Description :</label>
                            <textarea className="form-control" rows="3"></textarea>
                        </div>

                        {/* Tu peux ajouter les autres champs ici avec la même structure col-12 */}
                        <div className="col-md-6">
                            <label className="form-label small fw-bold">Type De Message :</label>
                            <select className="form-select"><option>Sélectionner</option></select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label small fw-bold">Entête :</label>
                            <select className="form-select"><option>Sélectionner</option></select>
                        </div>

                        <div className="col-12">
                            <label className="form-label small fw-bold">Message :</label>
                            <textarea className="form-control" rows="3"></textarea>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label small fw-bold">Date D'envoi :</label>
                            <div className="position-relative">
                                <input type="text" className="form-control" />
                                <Calendar className="filter-icon" size={18} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-footer bg-white border-0 d-flex justify-content-end gap-2 pb-4 px-4">
                    <button onClick={onClose} className="btn btn-outline-orange px-4">ANNULER</button>
                    <button onClick={() => { onSubmit(); onClose(); }} className="btn btn-orange px-4">AJOUTER</button>
                </div>
            </div>
        </div>
    );
};

export default AddCampaignModal;