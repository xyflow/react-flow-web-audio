import type { PatchIR } from "./model";

export function toIR(nodes, edges): PatchIR {
  return {
    nodes: nodes.map(({ id, type, data }) => ({ id, type, data })),
    edges: edges.map(({ id, source, target }) => ({ id, source, target })),
  };
}
