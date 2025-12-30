import React from "react";
import "./GestionRoles.css";

export default function RolePagesSelect({ options, selected, onChange }) {
  const addValue = (v) => {
    if (!v) return;
    if (selected.includes(v)) return;
    onChange([...selected, v]);
  };

  const removeValue = (v) => {
    onChange(selected.filter((x) => x !== v));
  };

  return (
    <div>
      <select className="form-select" value="" onChange={(e) => addValue(e.target.value)}>
        <option value="">pages</option>
        {options.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>

      <div className="chips mt-2">
        {selected.map((p) => (
          <span key={p} className="chip">
            {p}
            <button type="button" onClick={() => removeValue(p)}>
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
