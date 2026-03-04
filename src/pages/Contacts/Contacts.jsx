import React, { useMemo, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { Plus, Search, Trash2, Pencil } from "lucide-react";
import { 
  useContacts, 
  useAddContact, 
  useAddContactWithCsv,
  useUpdateContact, 
  useDeleteContact 
} from "../../hooks/useContacts";
import "./Contacts.css";
import AddContactModal from "./AddContactModal";
import EditContactModal from "./EditContactModal";
import DetailsContactModal from "./DetailsContactModal";
import ConfirmModal from "./ConfirmModal";
import { useUsers } from "../../hooks/useUsers";


export default function Contacts() {
  // NOUVELLE LOGIQUE avec React Query :
  const { data: users = [], isLoading: usersLoading } = useUsers();
  const { data: lists = [], isLoading, error } = useContacts();
  // console.log('users from useUsers:', users);
  const addContactMutation = useAddContact();
  const addContactWithCsvMutation = useAddContactWithCsv();
  const updateContactMutation = useUpdateContact();
  const deleteContactMutation = useDeleteContact();
  //Logique de filtre 
  const [filterOwner, setFilterOwner] = useState("");
  const [filterDateCreation, setFilterDateCreation] = useState("");
  const [filterDateEnvoi, setFilterDateEnvoi] = useState("");
  const [q, setQ] = useState("");
const formattedUsers = useMemo(() => {
  return users.map(user => ({
    id: user.id,
    name: user.fullName || `${user.firstName} ${user.lastName}`.trim() || user.email
  }));
}, [users]);
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

 // NOUVELLES FONCTIONS avec React Query :
  const addList = async (payload) => {
    try {
      // Si un fichier est présent, utiliser l'endpoint create-with-csv
      if (payload.file) {
        await addContactWithCsvMutation.mutateAsync({
          contactData: payload,
          file: payload.file
        });
      } else {
        // Sinon, utiliser l'ancien endpoint
        await addContactMutation.mutateAsync(payload);
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du contact:', error);
    }
  };


   const updateList = async (payload) => {
    try {
      await updateContactMutation.mutateAsync(payload);
    } catch (error) {
    }
  };
   const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      // Créer un objet Date à partir du string (gère automatiquement les formats ISO 8601)
      const date = new Date(dateString);
      
      // Vérifier si la date est valide
      if (isNaN(date.getTime())) return "N/A";
      
      // Formater la date au format français: dd/MM/yyyy HH:mm
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    } catch {
      return "N/A";
    }
  };

const deleteList = async (id) => {
    try {
      await deleteContactMutation.mutateAsync(id);
    } catch (error) {
    }
  };
if (isLoading || usersLoading) {
  return (
    <MainLayout pageTitle="Gestion des contacts" pageSubtitle="Liste Des Contacts">
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
      <MainLayout pageTitle="Gestion des contacts" pageSubtitle="Liste Des Contacts">
        <div className="alert alert-danger text-center">
          Erreur lors du chargement des contacts: {error.message}
        </div>
      </MainLayout>
    );
  }

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
          {addContactMutation.isPending ? 'Ajout...' : 'New Contacts'}
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
        {formattedUsers.map((u) => (
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
                  <td>{it.name}</td>
                  <td>{it.owner}</td>
                  <td>{it.contactsNumber}</td>
                  <td>{formatDate(it.creationDate)}</td>
                  <td>{formatDate(it.lastUsedDate)}</td>
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
    users={formattedUsers}  // Au lieu de USERS
    onClose={() => setShowAdd(false)}
    onSubmit={addList}
    isLoading={addContactMutation.isPending || addContactWithCsvMutation.isPending}
  />
)}

      {editItem && (
        <EditContactModal
          users={formattedUsers}
          item={editItem}
          onClose={() => setEditItem(null)}
          onSubmit={(payload) => updateList(payload)}
          isLoading={updateContactMutation.isPending}

        />
      )}

      {detailsItem && (
        <DetailsContactModal
          users={formattedUsers}
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
