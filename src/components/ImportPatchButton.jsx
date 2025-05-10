import React, { useRef } from "react";
import { importPatchFromFile } from "../graph/import";
import { tw } from "twind";

export default function ImportPatchButton() {
  const fileInputRef = useRef();

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    importPatchFromFile(file).catch((err) => {
      alert(`Import failed: ${err.message}`);
      console.error(err);
    });

    // reset input so same file can be reselected if needed
    e.target.value = "";
  };

  return (
    <>
      <button
        className={tw("px-2 py-1 rounded bg-white shadow")}
        onClick={handleClick}
      >
        Import Patch
      </button>

      <input
        type="file"
        accept=".json"
        ref={fileInputRef}
        onChange={handleChange}
        style={{ display: "none" }}
      />
    </>
  );
}
