import { PatchDocument } from "./model";

export function validatePatch(patch: any): PatchDocument {
  if (
    !patch.graph ||
    !Array.isArray(patch.graph.nodes) ||
    !Array.isArray(patch.graph.edges)
  ) {
    throw new Error("Patch file must contain a graph with nodes and edges.");
  }

  return {
    meta: {
      version: 1,
      created: patch.meta?.created ?? new Date().toISOString(),
      ...patch.meta,
    },
    ui: patch.ui ?? {},
    graph: {
      nodes: patch.graph.nodes,
      edges: patch.graph.edges,
    },
  };
}
