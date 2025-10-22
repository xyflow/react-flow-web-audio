import ReactFlow, {
  Background,
  Panel
} from "@xyflow/react";
import React from "react";
import { tw } from "twind";
import { useShallow } from "zustand/react/shallow";
import Amp from "./nodes/Amp";
import Osc from "./nodes/Osc";
import Out from "./nodes/Out";
import { useStore } from "./store";

import "@xyflow/react/dist/style.css";

const nodeTypes = {
  osc: Osc,
  amp: Amp,
  out: Out,
};

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
  const store = useStore(useShallow(selector));
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
