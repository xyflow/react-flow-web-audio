import React from "react";
import { Handle } from "reactflow";
import { tw } from "twind";
import { shallow } from "zustand/shallow";
import { useStore } from "../../store";

export default function OscillatorUI({ id, data }) {
  const { setFrequency, setType } = useStore(
    (store) => ({
      setFrequency: (e) => store.updateNode(id, { frequency: +e.target.value }),
      setType: (e) => store.updateNode(id, { type: e.target.value }),
    }),
    shallow
  );

  return (
    <div className={tw("rounded-md bg-white shadow-xl")}>
      <p
        className={tw("rounded-t-md px-2 py-1 bg-pink-500 text-white text-sm")}
      >
        Oscillator
      </p>

      <label className={tw("flex flex-col px-2 py-1")}>
        <span className={tw("text-xs font-bold mb-2")}>Frequency</span>
        <input
          className="nodrag"
          type="range"
          min="10"
          max="1000"
          step="1"
          value={data.frequency}
          onChange={setFrequency}
        />
        <span className={tw("text-right text-xs")}>{data.frequency} Hz</span>
      </label>

      <hr className={tw("border-gray-200 mx-2")} />

      <label className={tw("flex flex-col px-2 pt-1 pb-4")}>
        <span className={tw("text-xs font-bold mb-2")}>Waveform</span>
        <select className="nodrag" value={data.type} onChange={setType}>
          <option value="sine">sine</option>
          <option value="triangle">triangle</option>
          <option value="sawtooth">sawtooth</option>
          <option value="square">square</option>
        </select>
      </label>

      <Handle className={tw("w-2 h-2")} type="source" position="bottom" />
    </div>
  );
}
