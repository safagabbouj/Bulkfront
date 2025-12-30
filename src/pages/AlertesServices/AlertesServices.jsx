import React, { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { Plus, Trash2 } from "lucide-react";

import "./AlertesServices.css";
import AddAlerteModal from "./AddAlerteModal";
import EditAlerteModal from "./EditAlerteModal";
import ConfirmModal from "./ConfirmModal";
import SwitchToggle from "./SwitchToggle";

const SEED_ALERTES = [
  {
    id: 1,
    nbSms: 1000,
    notifySms: true,
    phone: "55 443 322",
    notifyEmail: false,
    email: "",
  },
  {
    id: 2,
    nbSms: 1000,
    notifySms: true,
    phone: "55 443 322",
    notifyEmail: false,
    email: "",
  },
];

const SEED_SERVICES = [
  { id: 1, name: "Short URL", active: true },
  { id: 2, name: "Notification Du Déclenchement De La Campagne Par Sms", active: true },
  { id: 3, name: "Notification Du Déclenchement De La Campagne Par Mail", active: true },
];

export default function AlertesServices() {
  const [alertes, setAlertes] = useState(SEED_ALERTES);
  const [services, setServices] = useState(SEED_SERVICES);

  // modals states
  const [showAdd, setShowAdd] = useState(false);
  const [editItem, setEditItem] = useState(null); // object => opens edit modal
  const [confirm, setConfirm] = useState({ open: false, id: null });

  // ADD
  const handleAdd = (payload) => {
    setAlertes((prev) => [{ ...payload, id: Date.now() }, ...prev]);
  };

  // EDIT
  const handleEdit = (updated) => {
    setAlertes((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
  };

  //  DELETE
  const handleDelete = (id) => {
    setAlertes((prev) => prev.filter((a) => a.id !== id));
  };

  // SERVICES SWITCH
  const toggleService = (id) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );
  };

  return (
    <MainLayout
      pageTitle="Gestion des alertes et services"
      pageSubtitle="Liste Des Seuils D'alertes"
    >
      {/* Header */}
      <div className="asTop">
        <div>
          <h2 className="asTitle">GESTION DES ALERTES ET SERVICES</h2>
          <div className="asSubtitle">Liste Des Seuils D'alertes</div>
        </div>

        <button className="btn-new" onClick={() => setShowAdd(true)}>
          <span className="icon-box">
            <Plus size={18} />
          </span>
          New alerte
        </button>
      </div>

      {/* Table Alertes */}
      <div className="card shadow-sm border-0 asCard">
        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle">
            <thead className="bg-light">
              <tr>
                <th className="small">Nombre Des Sms</th>
                <th className="small">Notifier Par Sms</th>
                <th className="small">Numéro De Téléphone</th>
                <th className="small">Notifier Par Email</th>
                <th className="small">Email</th>
                <th className="small text-end">Action</th>
              </tr>
            </thead>

            <tbody>
              {alertes.map((a) => (
                <tr key={a.id}>
                  <td>{a.nbSms}</td>
                  <td>{a.notifySms ? "Oui" : "Non"}</td>
                  <td>{a.phone || "-"}</td>
                  <td>{a.notifyEmail ? "Oui" : "Non"}</td>
                  <td>{a.email ? a.email : "Non"}</td>

                  <td className="text-end" style={{ whiteSpace: "nowrap" }}>
                    {/* Détails => EDIT */}
                    <button className="btn-details me-2" onClick={() => setEditItem(a)}>
                      Détails »
                    </button>

                    {/* delete => confirm */}
                    <button
                      className="btn-action"
                      title="Supprimer"
                      onClick={() => setConfirm({ open: true, id: a.id })}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}

              {alertes.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-muted py-4">
                    Aucun seuil
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Services */}
      <div className="asServicesTitle">Services</div>

      <div className="asServicesCard">
        <div className="asServicesHead">
          <div>Nom Du Services</div>
          <div className="text-center">Statut: Desactivé/Activé</div>
        </div>

        <div className="asServicesBody">
          {services.map((s) => (
            <div key={s.id} className="asServiceRow">
              <div className="asServiceName">{s.name}</div>
              <div className="asServiceToggle">
                <SwitchToggle checked={s.active} onChange={() => toggleService(s.id)} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ADD Modal */}
      {showAdd && (
        <AddAlerteModal
          onClose={() => setShowAdd(false)}
          onSubmit={(payload) => handleAdd(payload)}
        />
      )}

      {/* EDIT Modal */}
      {editItem && (
        <EditAlerteModal
          item={editItem}
          onClose={() => setEditItem(null)}
          onSubmit={(updated) => handleEdit(updated)}
        />
      )}

      {/* Confirm delete */}
      {confirm.open && (
        <ConfirmModal
          title="Êtres Vous Sûr ?"
          subtitle="Cette Action Est Irréversible !"
          onCancel={() => setConfirm({ open: false, id: null })}
          onConfirm={() => {
            handleDelete(confirm.id);
            setConfirm({ open: false, id: null });
          }}
        />
      )}
    </MainLayout>
  );
}
