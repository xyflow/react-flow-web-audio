// The IR: minimal graph data used by the engine
export interface PatchIRNode {
  id: string;
  type: string;
  data?: Record<string, any>;
}

export interface PatchIREdge {
  id: string;
  source: string;
  target: string;
}

export interface PatchIR {
  nodes: PatchIRNode[];
  edges: PatchIREdge[];
}

// Metadata and extra UI details
export interface PatchMeta {
  version: number;
  created: string;
  [key: string]: any;
}

export interface PatchUI {
  positions?: Record<string, { x: number; y: number }>;
}

// Full file format
export interface PatchDocument {
  meta: PatchMeta;
  ui?: PatchUI;
  graph: PatchIR;
}
