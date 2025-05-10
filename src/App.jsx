import React, { useEffect } from "react";
import ReactFlow, { Background, Panel } from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "./store";
import { NodeRegistry } from "./graph/registry";
import { exportPatchToFile } from "./graph/export";
import { engine } from "./audio";
import { tw } from "twind";

import "reactflow/dist/style.css";
import ImportPatchButton from "./components/ImportPatchButton";
import { executeGraph } from "./graph/executeGraph";
import { toIR } from "./graph/toIR";

const nodeTypes = Object.fromEntries(
  [...NodeRegistry.entries()].map(([key, def]) => [key, def.ui])
);

const selector = (store) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onNodesDelete: store.onNodesDelete,
  onEdgesChange: store.onEdgesChange,
  onEdgesDelete: store.onEdgesDelete,
  addEdge: store.addEdge,
  addOsc: () => store.createNode("osc"),
  addAmp: () => store.createNode("amp"),
  addFilter: () => store.createNode("filter"),
});

export default function App() {
  const store = useStore(selector, shallow);

  useEffect(() => {
    const { nodes, edges } = toIR(store.nodes, store.edges);
    executeGraph(engine, nodes, edges);
    engine.context.suspend();
  }, []);

  return (
    <ReactFlow
      nodeTypes={nodeTypes}
      nodes={store.nodes}
      edges={store.edges}
      onNodesChange={store.onNodesChange}
      onNodesDelete={store.onNodesDelete}
      onEdgesChange={store.onEdgesChange}
      onEdgesDelete={store.onEdgesDelete}
      onConnect={store.addEdge}
      fitView
    >
      <Panel className={tw("space-x-4")} position="top-right">
        <button
          className={tw("px-2 py-1 rounded bg-white shadow")}
          onClick={store.addOsc}
        >
          Add Osc
        </button>
        <button
          className={tw("px-2 py-1 rounded bg-white shadow")}
          onClick={store.addAmp}
        >
          Add Amp
        </button>
        <button
          className={tw("px-2 py-1 rounded bg-white shadow")}
          onClick={store.addFilter}
        >
          Add Filter
        </button>
        <button
          className={tw("px-2 py-1 rounded bg-white shadow")}
          onClick={() =>
            exportPatchToFile(store.nodes, store.edges, {
              meta: { name: "My Patch", author: "you" },
            })
          }
        >
          Export Patch
        </button>
        <ImportPatchButton></ImportPatchButton>
      </Panel>
      <Background />
    </ReactFlow>
  );
}
