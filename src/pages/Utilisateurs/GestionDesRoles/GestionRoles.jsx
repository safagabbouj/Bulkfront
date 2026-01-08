import React, { useMemo, useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";

import "./GestionRoles.css";
import AddRoleModal from "./AddRoleModal";
import EditRoleModal from "./EditRoleModal";
import RoleDetailsModal from "./RoleDetailsModal"; // ✅ NEW (details modal)
import ConfirmModal from "../ConfirmModal"; // ✅ shared

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
  { id: 1, nom: "Super Administrateur", pages: ["a1"] },
  { id: 2, nom: "Collaborateur", pages: ["b1"] },
  { id: 3, nom: "Profil Informatique", pages: ["c1"] },
  { id: 4, nom: "Super Administrateur1", pages: ["d1"] },
];

export default function GestionRoles() {
  const [roles, setRoles] = useState(SEED_ROLES);
  const [q, setQ] = useState("");

  const [showAdd, setShowAdd] = useState(false);
  const [editRole, setEditRole] = useState(null);

  // ✅ NEW: details modal state
  const [detailsRole, setDetailsRole] = useState(null);

  // ✅ confirmations state (one)
  const [confirm, setConfirm] = useState({
    open: false,
    type: null, // "add" | "edit" | "delete"
    payload: null,
  });

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return roles;
    return roles.filter((r) => r.nom.toLowerCase().includes(s));
  }, [roles, q]);

  const addRole = (payload) => setRoles((prev) => [{ ...payload, id: Date.now() }, ...prev]);
  const updateRole = (payload) => setRoles((prev) => prev.map((r) => (r.id === payload.id ? payload : r)));
  const deleteRole = (id) => setRoles((prev) => prev.filter((r) => r.id !== id));

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
                    {/* ✅ FIX: details opens details modal (not edit) */}
                    <button className="btn-details me-2" onClick={() => setDetailsRole(r)}>
                      Détails »
                    </button>

                    {/* edit */}
                    <button className="btn-action me-2" onClick={() => setEditRole(r)} title="Modifier">
                      <Pencil size={16} />
                    </button>

                    {/* delete */}
                    <button
                      className="btn-action"
                      onClick={() => setConfirm({ open: true, type: "delete", payload: r })}
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

      {/* ✅ ADD */}
      {showAdd && (
        <AddRoleModal
          pagesOptions={ALL_PAGES}
          onClose={() => setShowAdd(false)}
          onSubmit={(payload) => setConfirm({ open: true, type: "add", payload })}
        />
      )}

      {/* ✅ EDIT */}
      {editRole && (
        <EditRoleModal
          role={editRole}
          pagesOptions={ALL_PAGES}
          onClose={() => setEditRole(null)}
          onSubmit={(payload) => setConfirm({ open: true, type: "edit", payload })}
        />
      )}

      {/* ✅ DETAILS */}
      {detailsRole && (
        <RoleDetailsModal
          role={detailsRole}
          onClose={() => setDetailsRole(null)}
        />
      )}

      {/* ✅ CONFIRM (add/edit/delete) */}
      {confirm.open && (
        <ConfirmModal
          title={
            confirm.type === "delete"
              ? "Êtes Vous Sûr ?"
              : confirm.type === "add"
              ? "Confirmer l'ajout"
              : "Confirmer la modification"
          }
          subtitle={
            confirm.type === "delete"
              ? "Cette Action Est Irréversible !"
              : confirm.type === "add"
              ? "Êtes-vous sûr de vouloir ajouter ce rôle ?"
              : "Êtes-vous sûr de vouloir modifier ce rôle ?"
          }
          confirmText="CONFIRMER"
          onCancel={() => setConfirm({ open: false, type: null, payload: null })}
          onConfirm={() => {
            if (confirm.type === "delete") deleteRole(confirm.payload.id);
            if (confirm.type === "add") addRole(confirm.payload);
            if (confirm.type === "edit") updateRole(confirm.payload);

            setConfirm({ open: false, type: null, payload: null });

            // ✅ close modals depending on action
            if (confirm.type === "add") setShowAdd(false);
            if (confirm.type === "edit") setEditRole(null);
          }}
        />
      )}
    </MainLayout>
  );
}
