import  {
  ReactFlow,
  Background,
  Panel
} from "@xyflow/react";
import React, { useCallback } from "react";
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

export default function App() {
  const {
    nodes,
    edges,
    onNodesChange,
    onNodesDelete,
    onEdgesChange,
    onEdgesDelete,
    addEdge,
    createNode,
  } = useStore(useShallow((store) => ({
    nodes: store.nodes,
    edges: store.edges,
    onNodesChange: store.onNodesChange,
    onNodesDelete: store.onNodesDelete,
    onEdgesChange: store.onEdgesChange,
    onEdgesDelete: store.onEdgesDelete,
    addEdge: store.addEdge,
    createNode: store.createNode,
  })));

  const addOsc = useCallback(() => createNode("osc", 0, 0), [createNode]);
  const addAmp = useCallback(() => createNode("amp", 0, 0), [createNode]);
  return (
    <ReactFlow
      nodeTypes={nodeTypes}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onNodesDelete={onNodesDelete}
      onEdgesChange={onEdgesChange}
      onEdgesDelete={onEdgesDelete}
      onConnect={addEdge}
      fitView
    >
      <Panel className={tw("space-x-4")} position="top-right">
        <button
          className={tw("px-2 py-1 rounded bg-white shadow")}
          onClick={addOsc}
        >
          Add Osc
        </button>
        <button
          className={tw("px-2 py-1 rounded bg-white shadow")}
          onClick={addAmp}
        >
          Add Amp
        </button>
      </Panel>
      <Background />
    </ReactFlow>
  );
}
