import React, { useMemo, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { Plus, Search, Trash2, Pencil } from "lucide-react";

import "./Contacts.css";
import AddContactModal from "./AddContactModal";
import EditContactModal from "./EditContactModal";
import DetailsContactModal from "./DetailsContactModal";
import ConfirmModal from "./ConfirmModal";

const USERS = [
  { id: 1, name: "Rayan" },
  { id: 2, name: "Rayan Rayan" },
  { id: 3, name: "Rayan Ghith" },
  { id: 4, name: "Test User" },
];

const SEED = [
  {
    id: 1,
    nom: "Test01",
    owner: "Rayan",
    nbContacts: 1,
    dateCreation: "04/06/2023 10:06",
    lastUse: "04/06/2023 10:06",
    description: "List test",
    selectedUsers: [1, 2],
    fileName: "contacts.csv",
    stats: {
      nationalValid: 1,
      internationalValid: 0,
      invalid: 0,
      empty: 0,
    },
  },
  {
    id: 2,
    nom: "Test01",
    owner: "Rayan",
    nbContacts: 2,
    dateCreation: "04/06/2023 10:06",
    lastUse: "04/06/2023 10:06",
    description: "List test",
    selectedUsers: [2],
    fileName: "contacts.csv",
    stats: {
      nationalValid: 1,
      internationalValid: 0,
      invalid: 0,
      empty: 0,
    },
  },
  {
    id: 3,
    nom: "Test01",
    owner: "Rayan",
    nbContacts: 1,
    dateCreation: "04/06/2023 10:06",
    lastUse: "04/06/2023 10:06",
    description: "List test",
    selectedUsers: [],
    fileName: "contacts.csv",
    stats: {
      nationalValid: 1,
      internationalValid: 0,
      invalid: 0,
      empty: 0,
    },
  },
  {
    id: 4,
    nom: "Test01",
    owner: "Rayan",
    nbContacts: 2,
    dateCreation: "04/06/2023 10:06",
    lastUse: "04/06/2023 10:06",
    description: "List test",
    selectedUsers: [],
    fileName: "contacts.csv",
    stats: {
      nationalValid: 1,
      internationalValid: 0,
      invalid: 0,
      empty: 0,
    },
  },
];

export default function Contacts() {
  const [lists, setLists] = useState(SEED);

  const [filterOwner, setFilterOwner] = useState("");
  const [filterDateCreation, setFilterDateCreation] = useState("");
  const [filterDateEnvoi, setFilterDateEnvoi] = useState("");
  const [q, setQ] = useState("");

  const [showAdd, setShowAdd] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [detailsItem, setDetailsItem] = useState(null);
  const [confirm, setConfirm] = useState({ open: false, item: null });

  const filtered = useMemo(() => {
  const s = q.trim().toLowerCase();

  const matchByDate = (dateStr, filterDate) => {
  
    if (!filterDate) return true;
    const [dmy] = dateStr.split(" "); 
    const [dd, mm, yyyy] = dmy.split("/");
    const iso = `${yyyy}-${mm}-${dd}`;
    return iso === filterDate;
  };

  return lists.filter((it) => {
    const matchOwner = filterOwner ? it.owner === filterOwner : true;

    const matchSearch = s
      ? it.nom.toLowerCase().includes(s) ||
        it.owner.toLowerCase().includes(s) ||
        String(it.nbContacts).includes(s)
      : true;

    const matchCreation = matchByDate(it.dateCreation, filterDateCreation);

    const matchEnvoi = matchByDate(it.lastUse, filterDateEnvoi);

    return matchOwner && matchSearch && matchCreation && matchEnvoi;
  });
}, [lists, q, filterOwner, filterDateCreation, filterDateEnvoi]);


  const addList = (payload) => {
    setLists((prev) => [{ ...payload, id: Date.now() }, ...prev]);
  };

  const updateList = (payload) => {
    setLists((prev) => prev.map((x) => (x.id === payload.id ? payload : x)));
  };

  const deleteList = (id) => {
    setLists((prev) => prev.filter((x) => x.id !== id));
  };

  return (
    <MainLayout pageTitle="Gestion des contacts" pageSubtitle="Liste Des Contacts">
      {/* header row: title + button */}
      <div className="contactsTop">
        <div className="contactsTitleBlock">
          <h2 className="contactsTitle">GESTION DES CONTACTS</h2>
          <div className="contactsSubtitle">Liste Des Contacts</div>
        </div>

        <button className="btn-new" onClick={() => setShowAdd(true)}>
          <span className="icon-box">
            <Plus size={18} />
          </span>
          New Contacts
        </button>
      </div>

      {/* filters row */}
      <div className="contactsFilters">
        <div className="col">
          <select
            className="form-select"
            value={filterOwner}
            onChange={(e) => setFilterOwner(e.target.value)}
          >
            <option value="">Liste Des Utilisateurs</option>
            {USERS.map((u) => (
              <option key={u.id} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col dateWrap">
          <input
            type="date"
            className="form-control"
            value={filterDateCreation}
            onChange={(e) => setFilterDateCreation(e.target.value)}
            placeholder="Date Creation"
          />
        </div>

        <div className="col dateWrap">
          <input
            type="date"
            className="form-control"
            value={filterDateEnvoi}
            onChange={(e) => setFilterDateEnvoi(e.target.value)}
            placeholder="Date D'envoi"
          />
        </div>

        <div className="col searchWrap">
          <input
            className="form-control"
            placeholder="Recherche"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <Search className="filter-icon" size={18} />
        </div>
      </div>

      {/* table */}
      <div className="card shadow-sm border-0 contactsCard">
        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle">
            <thead className="bg-light">
              <tr>
                <th className="small">Nom</th>
                <th className="small">Utilisateur Propriétaire</th>
                <th className="small">Nombre De Contacts</th>
                <th className="small">Date Création</th>
                <th className="small">Date De Dernière Utilisation</th>
                <th className="small text-end">Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((it) => (
                <tr key={it.id}>
                  <td>{it.nom}</td>
                  <td>{it.owner}</td>
                  <td>{it.nbContacts}</td>
                  <td>{it.dateCreation}</td>
                  <td>{it.lastUse}</td>
                  <td className="text-end" style={{ whiteSpace: "nowrap" }}>
                    <button className="btn-details me-2" onClick={() => setDetailsItem(it)}>
                      Détails »
                    </button>

                    <button className="btn-action me-2" onClick={() => setEditItem(it)} title="Modifier">
                      <Pencil size={16} />
                    </button>

                    <button
                      className="btn-action"
                      title="Supprimer"
                      onClick={() => setConfirm({ open: true, item: it })}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-muted py-4">
                    Aucun résultat
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* modals */}
      {showAdd && (
        <AddContactModal
          users={USERS}
          onClose={() => setShowAdd(false)}
          onSubmit={(payload) => {
            // add defaults like screenshot
            addList({
              ...payload,
              owner: "Rayan",
              nbContacts: 1,
              dateCreation: "04/06/2023 10:06",
              lastUse: "04/06/2023 10:06",
              stats: { nationalValid: 1, internationalValid: 0, invalid: 0, empty: 0 },
            });
          }}
        />
      )}

      {editItem && (
        <EditContactModal
          users={USERS}
          item={editItem}
          onClose={() => setEditItem(null)}
          onSubmit={(payload) => updateList(payload)}
        />
      )}

      {detailsItem && (
        <DetailsContactModal
          users={USERS}
          item={detailsItem}
          onClose={() => setDetailsItem(null)}
        />
      )}

      {confirm.open && (
        <ConfirmModal
          title="Êtres Vous Sûr ?"
          subtitle="Cette Action Est Irréversible !"
          onCancel={() => setConfirm({ open: false, item: null })}
          onConfirm={() => {
            deleteList(confirm.item.id);
            setConfirm({ open: false, item: null });
          }}
        />
      )}
    </MainLayout>
  );
}
