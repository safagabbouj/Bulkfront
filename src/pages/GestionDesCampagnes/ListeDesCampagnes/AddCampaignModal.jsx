import React, { useMemo, useState } from "react";
import { X } from "lucide-react";
import ConfirmModal from "./ConfirmModal";

const pad2 = (n) => String(n).padStart(2, "0");

const formatFR = (yyyy_mm_dd) => {
  if (!yyyy_mm_dd) return "";
  const [yyyy, mm, dd] = yyyy_mm_dd.split("-");
  return `${dd}/${mm}/${yyyy}`;
};

export default function AddCampaignModal({ onClose, onSubmit, statuts }) {
  const [form, setForm] = useState({
    name: "",
    status: "Enregistré",
    language: "Français",
    type: [],
    entete: "",
    description: "",
    message: "",
    dateEnvoi: "", 
    dateFin: "", 
  });

  const [showConfirm, setShowConfirm] = useState(false);

  const nowLabel = useMemo(() => {
    const d = new Date();
    const dd = pad2(d.getDate());
    const mm = pad2(d.getMonth() + 1);
    const yyyy = d.getFullYear();
    const hh = pad2(d.getHours());
    const min = pad2(d.getMinutes());
    return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
  }, []);

  const dateEnvoiLabel = useMemo(() => {
    const d = formatFR(form.dateEnvoi);
    return d ? `${d} 10:06` : nowLabel;
  }, [form.dateEnvoi, nowLabel]);

  const dateFinLabel = useMemo(() => {
    const d = formatFR(form.dateFin);
    return d ? `${d} 10:06` : nowLabel;
  }, [form.dateFin, nowLabel]);

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-content card" style={{ maxWidth: 860 }}>
        <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center pt-4 px-4">
          <h2 className="h5 fw-bold mb-0">Ajouter Une Campagne</h2>
          <X className="cursor-pointer" onClick={onClose} />
        </div>

        <div className="card-body px-4 overflow-auto" style={{ maxHeight: "62vh" }}>
          <div className="row g-3">
            <div className="col-12">
              <label className="form-label small fw-bold">Nom De La Campagne :</label>
              <input
                type="text"
                className="form-control"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label small fw-bold">Statut :</label>
              <select
                className="form-select"
                value={form.status}
                onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}
              >
                {statuts.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label small fw-bold">Langue :</label>
              <select
                className="form-select"
                value={form.language}
                onChange={(e) => setForm((p) => ({ ...p, language: e.target.value }))}
              >
                <option>Français</option>
                <option>Arabe</option>
                <option>Anglais</option>
              </select>
            </div>

            <div className="col-12">
              <label className="form-label small fw-bold">Type :</label>
              <select
                className="form-select"
                value={form.type[0] || ""}
                onChange={(e) => setForm((p) => ({ ...p, type: e.target.value ? [e.target.value] : [] }))}
              >
                <option value="">Sélectionner</option>
                <option value="SMS">SMS</option>
                <option value="Mail">Mail</option>
              </select>
              <small className="text-orange d-block mt-1">
                ⚠ Vous Pouvez Sélectionner Plusieurs Types
              </small>
            </div>

            <div className="col-12">
              <label className="form-label small fw-bold">Entête :</label>
              <input
                className="form-control"
                value={form.entete}
                onChange={(e) => setForm((p) => ({ ...p, entete: e.target.value }))}
              />
            </div>

            <div className="col-12">
              <label className="form-label small fw-bold">Description :</label>
              <textarea
                className="form-control"
                rows={2}
                value={form.description}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              />
            </div>

            <div className="col-12">
              <label className="form-label small fw-bold">Message :</label>
              <textarea
                className="form-control"
                rows={3}
                value={form.message}
                onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label small fw-bold">Date D'envoi :</label>
              <input
                type="date"
                className="form-control"
                value={form.dateEnvoi}
                onChange={(e) => setForm((p) => ({ ...p, dateEnvoi: e.target.value }))}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label small fw-bold">Date Fin :</label>
              <input
                type="date"
                className="form-control"
                value={form.dateFin}
                onChange={(e) => setForm((p) => ({ ...p, dateFin: e.target.value }))}
              />
            </div>
          </div>
        </div>

        <div className="card-footer bg-white border-0 d-flex justify-content-end gap-2 pb-4 px-4">
          <button onClick={onClose} className="btn btn-outline-orange px-4">
            ANNULER
          </button>
          <button onClick={() => setShowConfirm(true)} className="btn btn-orange px-4">
            AJOUTER
          </button>
        </div>
      </div>

      {/* Confirm like Contacts */}
      {showConfirm && (
        <ConfirmModal
          title="Confirmer l'ajout"
          subtitle="Êtes-vous sûr de vouloir ajouter cette campagne ?"
          onCancel={() => setShowConfirm(false)}
          onConfirm={() => {
            onSubmit({
              ...form,
              dateCreationLabel: nowLabel,
              dateEnvoiLabel,
              dateFinLabel,
            });
            setShowConfirm(false);
            onClose();
          }}
        />
      )}
    </div>
  );
}
