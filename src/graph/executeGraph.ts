import { PatchIRNode, PatchIREdge } from "./model";
import { WebAudioEngine } from "../audio/WebAudioEngine";
import { NodeRegistry } from "./registry";

export function executeGraph(
  engine: WebAudioEngine,
  nodes: PatchIRNode[],
  edges: PatchIREdge[]
) {
  engine.reset();

  // Create all nodes
  for (const { id, type, data } of nodes) {
    const def = NodeRegistry.get(type);
    if (!def) {
      console.warn(`Unknown node type: ${type}`);
      continue;
    }

    engine.createNode(id, def.factory, data ?? {});
  }

  // Connect all edges
  for (const { source, target } of edges) {
    engine.connect(source, target);
  }
}
