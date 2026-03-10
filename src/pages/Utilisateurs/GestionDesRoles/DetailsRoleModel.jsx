import React from "react";
import { X } from "lucide-react";
import "../../Contacts/Contacts.css";

export default function DetailsRoleModal({ role, onClose }) {
    if (!role) return null;

    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-content">
                <div className="p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="modal-title-center">Détails du rôle</h5>

                        <button
                            type="button"
                            className="btn-close-custom"
                            onClick={onClose}
                            aria-label="Fermer"
                            style={{
                                background: "none",
                                border: "none",
                                padding: 0,
                                cursor: "pointer",
                                color: "#333",
                            }}
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="details-container">

                        <div className="detail-row mb-3">
                            <div className="row">
                                <div className="col-sm-4">
                                    <strong>Nom :</strong>
                                </div>
                                <div className="col-sm-8">
                                    {role.nom}
                                </div>
                            </div>
                        </div>

                        <div className="detail-row mb-3">
                            <div className="row">
                                <div className="col-sm-4">
                                    <strong>Pages :</strong>
                                </div>
                                <div className="col-sm-8">
                                    {role.pages?.join(", ")}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="modal-footer-center">
                    <button
                        type="button"
                        className="btn btn-outline-orange px-4"
                        onClick={onClose}
                    >
                        FERMER
                    </button>
                </div>
            </div>
        </div>
    );
}