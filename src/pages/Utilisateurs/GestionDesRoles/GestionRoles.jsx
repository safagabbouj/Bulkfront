import React, { useMemo, useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";

import "./GestionRoles.css";
import AddRoleModal from "./AddRoleModal";
import EditRoleModal from "./EditRoleModal";
import ConfirmModal from "./ConfirmModal";

const ALL_PAGES = [
  "Bulk_page_home",
  "Bulk_page_campagnes",
  "Bulk_page_contacts",
  "Bulk_page_utilisateurs",
  "Bulk_page_roles",
  "Bulk_page_reporting",
  "Bulk_page_faq",
];

const SEED_ROLES = [
  { id: 1, nom: "Super Administrateur", pages: ["Bulk_page_home", "Bulk_page_campagnes"] },
  { id: 2, nom: "Collaborateur", pages: ["Bulk_page_contacts", "Bulk_page_reporting"] },
  { id: 3, nom: "Profil Informatique", pages: ["Bulk_page_utilisateurs", "Bulk_page_roles"] },
  { id: 4, nom: "Super Administrateur1", pages: ["Bulk_page_home"] },
];

export default function GestionRoles() {
  const [roles, setRoles] = useState(SEED_ROLES);
  const [q, setQ] = useState("");

  const [showAdd, setShowAdd] = useState(false);
  const [editRole, setEditRole] = useState(null);
  const [confirm, setConfirm] = useState({ open: false, role: null });

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return roles;
    return roles.filter((r) => r.nom.toLowerCase().includes(s));
  }, [roles, q]);

  const addRole = (payload) => {
    setRoles((prev) => [{ ...payload, id: Date.now() }, ...prev]);
  };

  const updateRole = (payload) => {
    setRoles((prev) => prev.map((r) => (r.id === payload.id ? payload : r)));
  };

  const deleteRole = (id) => {
    setRoles((prev) => prev.filter((r) => r.id !== id));
  };

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
                    <button className="btn-details me-2" onClick={() => setEditRole(r)}>
                      Détails »
                    </button>

                    <button className="btn-action me-2" onClick={() => setEditRole(r)} title="Modifier">
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
    </MainLayout>
  );
}
