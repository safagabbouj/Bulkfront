import { useState } from "react";
import { InputText } from "primereact/inputtext";

const ChangePassword = () => {
    const [visible, setVisible] = useState(true); // assuming modal should be initially visible
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = () => {
        if (newPassword !== confirmPassword) {
            alert("Les mots de passe ne correspondent pas !");
            return;
        }
        // Call your API here, e.g., UserService.changePassword(...)
        console.log("New Password:", newPassword);
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-content card">
                <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center pt-4 px-4">
                    <div className="modal-title">
                        <h5>Changement mot de passe</h5>
                        <hr />
                    </div>
                </div>

                <div className="card-body px-4 overflow-auto" style={{ maxHeight: "75vh" }}>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "1%" }}>
                        <div className="mb-3">
                            <label className="form-label">Veuillez saisir le nouveau mot de passe:</label>
                            <InputText
                                type="password"
                                required
                                className="form-control"
                                placeholder="Mot de passe"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Veuillez confirmer le nouveau mot de passe:</label>
                            <InputText
                                type="password"
                                required
                                className="form-control"
                                placeholder="Confirmer mot de passe"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div
                    className="card-footer bg-white border-0"
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        gap: "3%",
                        padding: "1%",
                    }}
                >
                    <button type="button" className="btn btn-dark" onClick={() => setVisible(false)}>
                        Annuler
                    </button>
                    <button
                        type="button"
                        className="btn"
                        onClick={handleSubmit}
                        style={{ backgroundColor: "rgba(255, 121, 0, 1)", color: "white" }}
                    >
                        Valider
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
