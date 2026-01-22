import React, { useState, useMemo } from "react";
import MainLayout from "../../../layout/MainLayout";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";

import "./ListeDesUtilisateurs.css";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import ConfirmModal from "./ConfirmModal";
import DetailsUserModal from "../DetailsUserModal";
import { useUsers, useAddUser, useUpdateUser, useDeleteUser } from "../../../hooks/useUsers";

export default function ListeDesUtilisateurs() {
  // Utilisation des hooks React Query
  const { data: users = [], isLoading, error } = useUsers();
  const addUserMutation = useAddUser();
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();

  // Recherche
  const [q, setQ] = useState("");

  // Modals
  const [showAdd, setShowAdd] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [confirm, setConfirm] = useState({ open: false, user: null });
  const [viewUser, setViewUser] = useState(null);

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

  // Gestion des états de chargement et d'erreur
  if (isLoading) {
    return (
      <MainLayout pageTitle="Gestion des utilisateurs" pageSubtitle="Liste des utilisateurs">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout pageTitle="Gestion des utilisateurs" pageSubtitle="Liste des utilisateurs">
        <div className="alert alert-danger text-center">
          Erreur lors du chargement des utilisateurs : {error.message}
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout pageTitle="Gestion des utilisateurs" pageSubtitle="Liste des utilisateurs">
      {/* Toolbar */}
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

      {/* Table */}
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
                    <button className="btn-details me-2" onClick={() => setViewUser(u)}>
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
          onSubmit={(payload) => addUserMutation.mutate(payload)}
        />
      )}

      {editUser && (
        <EditUserModal
          user={editUser}
          onClose={() => setEditUser(null)}
          onSubmit={(payload) => updateUserMutation.mutate(payload)}
        />
      )}

      {confirm.open && (
        <ConfirmModal
          title="Êtes Vous Sûr ?"
          subtitle="Cette Action Est Irréversible !"
          confirmText="CONFIRMER"
          onCancel={() => setConfirm({ open: false, user: null })}
          onConfirm={() => {
            deleteUserMutation.mutate(confirm.user.id);
            setConfirm({ open: false, user: null });
          }}
        />
      )}

      {viewUser && (
        <DetailsUserModal
          user={viewUser}
          onClose={() => setViewUser(null)}
        />
      )}
    </MainLayout>
  );
}