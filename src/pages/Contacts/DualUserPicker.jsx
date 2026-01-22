import React, { useMemo, useState } from "react";
import { User, ChevronRight, ChevronLeft } from "lucide-react";
import "./Contacts.css";

export default function DualUserPicker({ users, selectedIds, onChange }) {
  const [leftQ, setLeftQ] = useState("");
  const [rightQ, setRightQ] = useState("");

  const [leftActive, setLeftActive] = useState(null);
  const [rightActive, setRightActive] = useState(null);

  const left = useMemo(() => {
    const setSel = new Set(selectedIds);
    return users.filter((u) => !setSel.has(u.id));
  }, [users, selectedIds]);

  const right = useMemo(() => {
    const setSel = new Set(selectedIds);
    return users.filter((u) => setSel.has(u.id));
  }, [users, selectedIds]);

  const leftFiltered = useMemo(() => {
    const s = leftQ.trim().toLowerCase();
    if (!s) return left;
    return left.filter((u) => u.name.toLowerCase().includes(s));
  }, [left, leftQ]);

  const rightFiltered = useMemo(() => {
    const s = rightQ.trim().toLowerCase();
    if (!s) return right;
    return right.filter((u) => u.name.toLowerCase().includes(s));
  }, [right, rightQ]);

  const moveRight = () => {
    if (!leftActive) return;
    onChange([...selectedIds, leftActive]);
    setLeftActive(null);
  };

  const moveLeft = () => {
    if (!rightActive) return;
    onChange(selectedIds.filter((id) => id !== rightActive));
    setRightActive(null);
  };

  return (
    <div className="pickerGrid">
      <div>
        <div className="pickerColTitle">Liste Des Utilisateurs :</div>
        <div className="pickerCard">
          <div className="pickerSearch">
            <input
              className="form-control"
              placeholder="Chercher ..."
              value={leftQ}
              onChange={(e) => setLeftQ(e.target.value)}
            />
          </div>
          <div className="pickerList">
            {leftFiltered.map((u) => (
              <div
                key={u.id}
                className={`pickerItem ${leftActive === u.id ? "active" : ""}`}
                onClick={() => setLeftActive(u.id)}
              >
                <User size={14} style={{ color: "#9ca3af" }} />
                {u.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pickerBtns">
        <button type="button" onClick={moveRight} title="Ajouter">
          <ChevronRight size={18} />
        </button>
        <button type="button" onClick={moveLeft} title="Retirer">
          <ChevronLeft size={18} />
        </button>
      </div>

      <div>
        <div className="pickerColTitle">Les Utilisateurs Délectionnés :</div>
        <div className="pickerCard">
          <div className="pickerSearch">
            <input
              className="form-control"
              placeholder="Chercher ..."
              value={rightQ}
              onChange={(e) => setRightQ(e.target.value)}
            />
          </div>
          <div className="pickerList">
            {rightFiltered.map((u) => (
              <div
                key={u.id}
                className={`pickerItem ${rightActive === u.id ? "active" : ""}`}
                onClick={() => setRightActive(u.id)}
              >
                <User size={14} style={{ color: "#9ca3af" }} />
                {u.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
