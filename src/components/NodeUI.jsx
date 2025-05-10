import React from "react";
import { Handle } from "reactflow";
import { useStore } from "../store";
import { tw } from "twind";
import { shallow } from "zustand/shallow";

/**
 * Generic UI renderer for audio nodes.
 * @param {object} props
 * @param {string} props.id - Node ID
 * @param {object} props.data - Current node data
 * @param {object} props.schema - Node definition (from NodeRegistry)
 */
export function NodeUI({ id, data, schema }) {
  const update = useStore(
    (store) => (field, value) => store.updateNode(id, { [field]: value }),
    shallow
  );

  return (
    <div className={tw("rounded-md bg-white shadow-xl")}>
      <p
        className={tw("rounded-t-md px-2 py-1 bg-pink-500 text-white text-sm")}
      >
        {schema.label}
      </p>

      {Object.entries(schema.inputs).map(([key, input]) => {
        const value = data[key];

        switch (input.type) {
          case "number":
            return (
              <label key={key} className={tw("flex flex-col px-2 pt-2 pb-1")}>
                <span className={tw("text-xs font-bold mb-1")}>{key}</span>
                <input
                  className="nodrag"
                  type="range"
                  min={input.min ?? 0}
                  max={input.max ?? 1}
                  step={input.step ?? 0.01}
                  value={value}
                  onChange={(e) => update(key, parseFloat(e.target.value))}
                />
                <span className={tw("text-right text-xs")}>
                  {value.toFixed?.(2) ?? value}
                </span>
              </label>
            );

          case "enum":
            return (
              <label key={key} className={tw("flex flex-col px-2 pt-2 pb-1")}>
                <span className={tw("text-xs font-bold mb-1")}>{key}</span>
                <select
                  className="nodrag"
                  value={value}
                  onChange={(e) => update(key, e.target.value)}
                >
                  {input.values.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </label>
            );

          default:
            return null;
        }
      })}

      <Handle className={tw("w-2 h-2")} type="source" position="bottom" />
    </div>
  );
}

export const makeGenericNode = (node) => ({
  ...node,
  ui: (props) => <NodeUI {...props} schema={node} />,
});
