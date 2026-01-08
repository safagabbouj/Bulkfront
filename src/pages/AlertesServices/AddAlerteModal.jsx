// src/pages/AlertesServices/AddAlerteModal.jsx
import React, { useState } from "react";
import SwitchToggle from "./SwitchToggle";
import ConfirmModal from "./ConfirmModal"; // ✅ NEW confirm
import "./AlertesServices.css";

export default function AddAlerteModal({ onClose, onSubmit }) {
  // ✅ form فارغ (مش test)
  const [nbSms, setNbSms] = useState(0);
  const [notifySms, setNotifySms] = useState(true);
  const [phone, setPhone] = useState("");
  const [notifyEmail, setNotifyEmail] = useState(false);
  const [email, setEmail] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);

  const dec = () => setNbSms((v) => Math.max(0, v - 1));
  const inc = () => setNbSms((v) => v + 1);

  const payload = {
    nbSms,
    notifySms,
    phone: notifySms ? phone : "",
    notifyEmail,
    email: notifyEmail ? email : "",
  };

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-content" style={{ maxWidth: 640 }}>
        <div className="p-4">
          <h5 className="modal-title-center">Nouveau Seuil D'alerte</h5>

          <div className="asModalGrid">
            <div className="asRow">
              <div className="asLabel">Seuil D'alerte :</div>
              <div className="asCounter">
                <button className="btn btn-light" type="button" onClick={dec}>
                  -
                </button>
                <input
                  className="form-control asCounterInput"
                  value={nbSms}
                  onChange={(e) => setNbSms(Number(e.target.value || 0))}
                />
                <button className="btn btn-light" type="button" onClick={inc}>
                  +
                </button>
              </div>
            </div>

            <div className="asRow">
              <div className="asLabel">Notifier Par SMS :</div>
              <SwitchToggle checked={notifySms} onChange={() => setNotifySms((v) => !v)} />
            </div>

            <div className="asRow">
              <div className="asLabel"></div>
              <input
                className="form-control"
                placeholder="Numéro"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={!notifySms}
              />
            </div>

            <div className="asRow">
              <div className="asLabel">Notifier Par Email :</div>
              <SwitchToggle checked={notifyEmail} onChange={() => setNotifyEmail((v) => !v)} />
            </div>

            <div className="asRow">
              <div className="asLabel"></div>
              <input
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!notifyEmail}
              />
            </div>
          </div>
        </div>

        <div className="modal-footer-center">
          <button onClick={onClose} className="btn btn-outline-orange px-4">
            ANNULER
          </button>

          {/* ✅ بدل ما نعمل submit مباشرة => confirmation */}
          <button onClick={() => setShowConfirm(true)} className="btn btn-orange px-4">
            AJOUTER
          </button>
        </div>
      </div>

      {showConfirm && (
        <ConfirmModal
          title="Confirmer l'ajout"
          subtitle="Êtes-vous sûr de vouloir ajouter ce seuil d'alerte ?"
          onCancel={() => setShowConfirm(false)}
          onConfirm={() => {
            onSubmit(payload);
            setShowConfirm(false);
            onClose();
          }}
        />
      )}
    </div>
  );
}
