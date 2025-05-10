import React, { useEffect } from "react";
import ReactFlow, {
  Background,
  Panel,
} from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "./store";
import { NodeRegistry } from "./graph/registry";
import { engine } from "./audio";
import { tw } from "twind";

import "reactflow/dist/style.css";

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
});

export default function App() {
  const store = useStore(selector, shallow);

  useEffect(() => {
    for (const node of store.nodes) {
      const def = NodeRegistry.get(node.type);
      if (!def) continue;
      engine.createNode(node.id, def.factory, node.data);
    }

    for (const edge of store.edges) {
      engine.connect(edge.source, edge.target);
    }

    engine.context.suspend();
  }, []); // <- Only run once on mount

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
      </Panel>
      <Background />
    </ReactFlow>
  );
}