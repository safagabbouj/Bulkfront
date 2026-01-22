import React, { useRef } from "react";
import { Upload } from "lucide-react";
import "./Contacts.css";

export default function FileDropZone({ fileName, onPick }) {
  const inputRef = useRef(null);

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".csv"
        style={{ display: "none" }}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onPick(f);
        }}
      />

      <div
        className="uploadBox"
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
      >
        <Upload size={18} style={{ color: "#ff7900" }} />
        <div className="uploadBoxTitle mt-2">
          {fileName ? fileName : "Select A CSV File To Upload"}
        </div>
        <div className="uploadBoxSub">Or Drag And Drop It Here</div>
      </div>
    </>
  );
}
