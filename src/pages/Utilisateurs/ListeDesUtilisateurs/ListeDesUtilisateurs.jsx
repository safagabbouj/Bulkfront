import React, { useState, useMemo } from "react";
import MainLayout from "../../../layout/MainLayout";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";

import "./ListeDesUtilisateurs.css";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import ConfirmModal from "./ConfirmModal";
import DetailsUserModal from "../DetailsUserModal";

import { 
  useUsers, 
  useAddUser, 
  useUpdateUser, 
  useDeleteUser,
  useUserById
} from "../../../hooks/useUsers";

import { useRoles } from "../../../hooks/useRoles";

export default function ListeDesUtilisateurs() {

  const { data: users = [], isLoading, error } = useUsers();
  const { data: roles = [] } = useRoles();

  const addUserMutation = useAddUser();
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();

  const [q, setQ] = useState("");

  const [showAdd, setShowAdd] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [confirm, setConfirm] = useState({ open: false, user: null });
  const [viewUser, setViewUser] = useState(null);

  const { data: selectedUser } = useUserById(editUser?.id);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return users;

    return users.filter((u) => {
      if (!u) return false;

      return (
        (u.firstName || "").toLowerCase().includes(s) ||
        (u.lastName || "").toLowerCase().includes(s) ||
        (u.email || "").toLowerCase().includes(s) ||
        (u.mobile || "").toLowerCase().includes(s)
      );
    });
  }, [users, q]);

  if (isLoading) {
    return (
      <MainLayout pageTitle="Gestion des utilisateurs" pageSubtitle="Liste des utilisateurs">
        <div className="text-center py-5">
          <div className="spinner-border text-primary"/>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout pageTitle="Gestion des utilisateurs" pageSubtitle="Liste des utilisateurs">
        <div className="alert alert-danger text-center">
          Erreur lors du chargement : {error.message}
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout pageTitle="Gestion des utilisateurs" pageSubtitle="Liste des utilisateurs">

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
                <tr key={u?.id || u?._id}>

                  <td>{u?.firstName}</td>
                  <td>{u?.lastName}</td>
                  <td>{u?.creationDate}</td>
                  <td>{u?.campagnes}</td>

                  <td className="text-end">

                    <button
                      className="btn-details me-2"
                      onClick={() => setViewUser(u)}
                    >
                      Détails »
                    </button>

                    <button
                      className="btn-action me-2"
                      onClick={() => setEditUser(u)}
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      className="btn-action"
                      onClick={() => setConfirm({ open: true, user: u })}
                    >
                      <Trash2 size={16} />
                    </button>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>
      </div>

      {showAdd && (
        <AddUserModal
          roles={roles}
          onClose={() => setShowAdd(false)}
          onSubmit={(payload) => addUserMutation.mutate(payload)}
        />
      )}

      {editUser && selectedUser && (
        <EditUserModal
          user={selectedUser}
          roles={roles}
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