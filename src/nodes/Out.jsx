import React from "react";
import { Handle, Position } from "@xyflow/react";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "../store";
import { tw } from "twind";

const selector = (store) => ({
  isRunning: store.isRunning,
  toggleAudio: store.toggleAudio,
});

export default function Out({ id, data }) {
  const { isRunning, toggleAudio } = useStore(useShallow(selector));

  return (
    <div className={tw("rounded-md bg-white shadow-xl px-4 py-2")}>
      <Handle className={tw("w-2 h-2")} type="target" position={Position.Top} />

      <button onClick={toggleAudio}>
        {isRunning ? (
          <span role="img" aria-label="mute">
            🔈
          </span>
        ) : (
          <span role="img" aria-label="unmute">
            🔇
          </span>
        )}
      </button>
    </div>
  );
}
