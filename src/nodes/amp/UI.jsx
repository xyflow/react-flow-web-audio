import React from "react";
import { Handle } from "reactflow";
import { tw } from "twind";
import { shallow } from "zustand/shallow";
import { useStore } from "../../store";

export default function AmpUI({ id, data }) {
  const { setGain } = useStore(
    (store) => ({
      setGain: (e) => store.updateNode(id, { gain: +e.target.value }),
    }),
    shallow
  );

  return (
    <div className={tw("rounded-md bg-white shadow-xl")}>
      <p
        className={tw("rounded-t-md px-2 py-1 bg-blue-500 text-white text-sm")}
      >
        Gain
      </p>

      <label className={tw("flex flex-col px-2 pt-1 pb-4")}>
        <span className={tw("text-xs font-bold mb-2")}>Gain</span>
        <input
          className="nodrag"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={data.gain}
          onChange={setGain}
        />
        <span className={tw("text-right text-xs")}>{data.gain.toFixed(2)}</span>
      </label>

      <Handle className={tw("w-2 h-2")} type="target" position="top" />
      <Handle className={tw("w-2 h-2")} type="source" position="bottom" />
    </div>
  );
}
