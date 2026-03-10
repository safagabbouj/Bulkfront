import React, { useState } from "react";
import "../../Contacts/Contacts.css";

export default function AddUserModal({ onClose, onSubmit, roles = [], isLoading }) {

const [form, setForm] = useState({
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  actif: true,
  role: "",
});

const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

const handleSubmit = () => {
  onSubmit(form);
  onClose();
};

return (
<div className="custom-modal-overlay">
<div className="custom-modal-content">

<div className="p-4">

<h5 className="modal-title-center">Ajouter Un Utilisateur</h5>

<div className="mt-4 form-grid">

<label>Nom :</label>
<input
className="form-control"
value={form.firstName}
onChange={(e) => update("firstName", e.target.value)}
disabled={isLoading}
/>

<label>Prénom :</label>
<input
className="form-control"
value={form.lastName}
onChange={(e) => update("lastName", e.target.value)}
disabled={isLoading}
/>

<label>Email :</label>
<input
className="form-control"
value={form.email}
onChange={(e) => update("email", e.target.value)}
disabled={isLoading}
/>

<label>Mobile :</label>
<input
className="form-control"
value={form.mobile}
onChange={(e) => update("mobile", e.target.value)}
disabled={isLoading}
/>

<label>Actif :</label>
<div className="form-check form-switch m-0">
<input
className="form-check-input"
type="checkbox"
checked={form.actif}
onChange={(e) => update("actif", e.target.checked)}
disabled={isLoading}
/>
</div>

<label>Role :</label>

<select
className="form-select"
value={form.role}
onChange={(e) => update("role", e.target.value)}
disabled={isLoading}
>

<option value="">Choisir Role</option>

{roles?.map((r) => (
<option key={r.id || r._id} value={r.roleName}>
{r.roleName}
</option>
))}

</select>

</div>
</div>

<div className="modal-footer-center">

<button
onClick={onClose}
className="btn btn-outline-orange px-4"
disabled={isLoading}
>
ANNULER
</button>

<button
onClick={handleSubmit}
className="btn btn-orange px-4"
disabled={isLoading}
>
{isLoading ? "AJOUT..." : "AJOUTER"}
</button>

</div>

</div>
</div>
);
}