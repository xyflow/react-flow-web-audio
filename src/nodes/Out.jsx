import React from "react";
import { Handle, Position } from "@xyflow/react";
import { useStore } from "../store";
import { tw } from "twind";

export default function Out() {
  const isRunning = useStore((store) => store.isRunning);
  const toggleAudio = useStore((store) => store.toggleAudio);

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
