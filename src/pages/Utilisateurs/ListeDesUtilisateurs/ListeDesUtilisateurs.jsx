import React, { useMemo, useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";

import "./ListeDesUtilisateurs.css";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import ConfirmModal from "./ConfirmModal";

// ✅ Fake data (كيف screenshot)
const SEED = [
  {
    id: 1,
    nom: "Rayan",
    prenom: "Rayan",
    dateCreation: "04/06/2023 10:06",
    campagnes: "23M",
    email: "rayan.orangecontact@gmail.com",
    mobile: "55 443 322",
    actif: true,
    role: "USER_ROLE",
  },
  {
    id: 2,
    nom: "Rayan",
    prenom: "Rayan",
    dateCreation: "04/06/2023 10:06",
    campagnes: "23M",
    email: "rayan.orangecontact@gmail.com",
    mobile: "55 443 322",
    actif: true,
    role: "USER_ROLE",
  },
  {
    id: 3,
    nom: "Rayan",
    prenom: "Rayan",
    dateCreation: "04/06/2023 10:06",
    campagnes: "23M",
    email: "rayan.orangecontact@gmail.com",
    mobile: "55 443 322",
    actif: true,
    role: "USER_ROLE",
  },
];

export default function ListeDesUtilisateurs() {
  // list users
  const [users, setUsers] = useState(SEED);

  // search
  const [q, setQ] = useState("");

  // modals
  const [showAdd, setShowAdd] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [confirm, setConfirm] = useState({ open: false, user: null });

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return users;

    return users.filter((u) => {
      return (
        u.nom.toLowerCase().includes(s) ||
        u.prenom.toLowerCase().includes(s) ||
        u.email.toLowerCase().includes(s) ||
        u.mobile.toLowerCase().includes(s)
      );
    });
  }, [users, q]);

  // add
  const addUser = (payload) => {
    setUsers((prev) => [{ ...payload, id: Date.now() }, ...prev]);
  };

  // update
  const updateUser = (payload) => {
    setUsers((prev) => prev.map((u) => (u.id === payload.id ? payload : u)));
  };

  // delete
  const deleteUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <MainLayout pageTitle="Gestion des utilisateurs" pageSubtitle="Liste des utilisateurs">
      {/* toolbar */}
      <div className="usersToolbar">
        <div className="usersSearch">
          <input
            className="form-control"
            placeholder="Rechercher"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <Search className="filter-icon" size={18} />
        </div>

        <button className="btn-new" onClick={() => setShowAdd(true)}>
          <span className="icon-box">
            <Plus size={18} />
          </span>
          New utilisateur
        </button>
      </div>

      {/* table */}
      <div className="card shadow-sm border-0 usersCard">
        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle">
            <thead className="bg-light">
              <tr>
                <th className="text-muted small">Nom</th>
                <th className="text-muted small">Prénom</th>
                <th className="text-muted small">Date Création</th>
                <th className="text-muted small">Nombre de Campagnes Lancées</th>
                <th className="text-muted small text-end">Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((u) => (
                <tr key={u.id}>
                  <td>{u.nom}</td>
                  <td>{u.prenom}</td>
                  <td>{u.dateCreation}</td>
                  <td>{u.campagnes}</td>
                  <td className="text-end" style={{ whiteSpace: "nowrap" }}>
                    <button className="btn-details me-2" onClick={() => setEditUser(u)}>
                      Détails »
                    </button>

                    <button className="btn-action me-2" onClick={() => setEditUser(u)} title="Modifier">
                      <Pencil size={16} />
                    </button>

                    <button
                      className="btn-action"
                      onClick={() => setConfirm({ open: true, user: u })}
                      title="Supprimer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-muted py-4">
                    Aucun résultat
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {showAdd && (
        <AddUserModal
          onClose={() => setShowAdd(false)}
          onSubmit={addUser}
        />
      )}

      {editUser && (
        <EditUserModal
          user={editUser}
          onClose={() => setEditUser(null)}
          onSubmit={updateUser}
        />
      )}

      {confirm.open && (
        <ConfirmModal
          title="Êtes Vous Sûr ?"
          subtitle="Cette Action Est Irréversible !"
          confirmText="CONFIRMER"
          onCancel={() => setConfirm({ open: false, user: null })}
          onConfirm={() => {
            deleteUser(confirm.user.id);
            setConfirm({ open: false, user: null });
          }}
        />
      )}
    </MainLayout>
  );
}
