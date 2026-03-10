import React, { useState } from "react";
import "./ListeDesUtilisateurs.css";

export default function EditUserModal({ user, onClose, onSubmit }) {

const [form, setForm] = useState({ ...user });

const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

return (

<div className="custom-modal-overlay">

<div className="custom-modal-content">

<div className="p-4">

<h5 className="modal-title-center">Modifier Un Utilisateur</h5>

<div className="mt-4 form-grid">

<label>Nom :</label>
<input
className="form-control"
value={form.firstName}
onChange={(e) => update("firstName", e.target.value)}
/>

<label>Prénom :</label>
<input
className="form-control"
value={form.lastName}
onChange={(e) => update("lastName", e.target.value)}
/>

<label>Email :</label>
<input
className="form-control"
value={form.email}
onChange={(e) => update("email", e.target.value)}
/>

<label>Mobile :</label>
<input
className="form-control"
value={form.mobile}
onChange={(e) => update("mobile", e.target.value)}
/>

</div>
</div>

<div className="modal-footer-center">

<button
onClick={onClose}
className="btn btn-outline-orange px-4"
>
ANNULER
</button>

<button
onClick={() => {
onSubmit(form);
onClose();
}}
className="btn btn-orange px-4"
>
MODIFIER
</button>

</div>

</div>

</div>
);
}