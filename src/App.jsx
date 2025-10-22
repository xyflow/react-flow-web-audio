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
  const nodes = useStore((store) => store.nodes);
  const edges = useStore((store) => store.edges);
  const onNodesChange = useStore((store) => store.onNodesChange);
  const onNodesDelete = useStore((store) => store.onNodesDelete);
  const onEdgesChange = useStore((store) => store.onEdgesChange);
  const onEdgesDelete = useStore((store) => store.onEdgesDelete);
  const addEdge = useStore((store) => store.addEdge);
  const createNode = useStore((store) => store.createNode);

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
