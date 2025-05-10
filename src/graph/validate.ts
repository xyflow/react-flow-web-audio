import { PatchDocument } from "./model";

export function validatePatch(patch: any): PatchDocument {
  if (!Array.isArray(patch.nodes) || !Array.isArray(patch.edges)) {
    throw new Error("Patch file must contain nodes and edges arrays.");
  }

  return {
    meta: {
      version: 1,
      created: patch.meta?.created ?? new Date().toISOString(),
      ...patch.meta,
    },
    nodes: patch.nodes,
    edges: patch.edges,
  };
}