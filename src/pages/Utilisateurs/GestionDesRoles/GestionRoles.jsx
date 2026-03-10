import React, { useMemo, useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import DetailsRoleModal  from "./DetailsRoleModel";
import "./GestionRoles.css";
import AddRoleModal from "./AddRoleModal";
import EditRoleModal from "./EditRoleModal";
import ConfirmModal from "./ConfirmModal";

import {
  useRoles,
  useAddRole,
  useUpdateRole,
  useDeleteRole
} from "../../../hooks/useRoles";

const ALL_PAGES = [
  "page_home",
  "page_campagnes",
  "page_contacts",
  "page_utilisateurs",
  "page_roles",
  "page_reporting",
  "page_faq",
];

export default function GestionRoles() {

  const { data: roles = [], isLoading, error } = useRoles();

  const addRoleMutation = useAddRole();
  const updateRoleMutation = useUpdateRole();
  const deleteRoleMutation = useDeleteRole();
  const [detailsRole, setDetailsRole] = useState(null);
  const [q, setQ] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [editRole, setEditRole] = useState(null);
  const [confirm, setConfirm] = useState({ open: false, role: null });

  // 🔵 TRANSFORM BACKEND DATA
  const formattedRoles = useMemo(() => {
    return roles.map((r) => ({
      id: r.id || r._id,
      nom: r.roleName,
      pages: r.pages || []
    }));
  }, [roles]);

  // 🔵 SEARCH
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();

    if (!s) return formattedRoles;

    return formattedRoles.filter((r) =>
      r.nom.toLowerCase().includes(s)
    );
  }, [formattedRoles, q]);

  const addRole = async (payload) => {
    try {
      await addRoleMutation.mutateAsync(payload);
    } catch (error) {
      console.error(error);
    }
  };

  const updateRole = async (payload) => {
    try {
      await updateRoleMutation.mutateAsync(payload);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRole = async (id) => {
    try {
      await deleteRoleMutation.mutateAsync(id);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <MainLayout pageTitle="Gestion des utilisateurs" pageSubtitle="Liste des rôles">
        <div className="text-center py-5">
          Chargement...
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout pageTitle="Gestion des utilisateurs" pageSubtitle="Liste des rôles">
        <div className="alert alert-danger">
          Erreur lors du chargement
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout pageTitle="Gestion des utilisateurs" pageSubtitle="Liste des rôles">
      <div className="rolesToolbar">
        <div className="rolesSearch">
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
          New Role
        </button>
      </div>

      <div className="card shadow-sm border-0 rolesCard">
        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle">

            <thead className="bg-light">
              <tr>
                <th className="text-muted small">Nom</th>
                <th className="text-muted small">Pages</th>
                <th className="text-muted small text-end">Action</th>
              </tr>
            </thead>

            <tbody>

              {filtered.map((r) => (
                <tr key={r.id}>

                  <td>{r.nom}</td>

                  <td className="text-muted small">
                    {r.pages?.slice(0, 3).join(", ")}
                    {r.pages?.length > 3 ? " ..." : ""}
                  </td>

                  <td className="text-end" style={{ whiteSpace: "nowrap" }}>

                    <button className="btn-details me-2" onClick={() => setDetailsRole(r)}>
                      Détails »
                    </button>

                    <button
                      className="btn-action me-2"
                      onClick={() => setEditRole(r)}
                      title="Modifier"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      className="btn-action"
                      onClick={() => setConfirm({ open: true, role: r })}
                      title="Supprimer"
                    >
                      <Trash2 size={16} />
                    </button>

                  </td>

                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center text-muted py-4">
                    Aucun résultat
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>
      </div>

      {showAdd && (
        <AddRoleModal
          pagesOptions={ALL_PAGES}
          onClose={() => setShowAdd(false)}
          onSubmit={addRole}
        />
      )}

      {editRole && (
        <EditRoleModal
          role={editRole}
          pagesOptions={ALL_PAGES}
          onClose={() => setEditRole(null)}
          onSubmit={updateRole}
        />
      )}

      {confirm.open && (
        <ConfirmModal
          title="Êtes Vous Sûr ?"
          subtitle="Cette Action Est Irréversible !"
          confirmText="CONFIRMER"
          onCancel={() => setConfirm({ open: false, role: null })}
          onConfirm={() => {
            deleteRole(confirm.role.id);
            setConfirm({ open: false, role: null });
          }}
         
        />
      )}
       {detailsRole && (
          <DetailsRoleModal
              role={detailsRole}
              onClose={() => setDetailsRole(null)}
          />
      )}
    </MainLayout>
  );
}