import React from "react";
import "./AlertesServices.css";

export default function SwitchToggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`sw ${checked ? "on" : "off"}`}
      aria-pressed={checked}
    >
      <span className="swDot" />
    </button>
  );
}
