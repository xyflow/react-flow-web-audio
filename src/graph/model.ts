export interface PatchNode {
    id: string;
    type: string;
    data?: Record<string, any>;
    position?: { x: number; y: number };
  }
  
  export interface PatchEdge {
    id: string;
    source: string;
    target: string;
  }
  
  export interface PatchMeta {
    version: number;
    created: string;
    [key: string]: any;
  }
  
  export interface PatchDocument {
    meta: PatchMeta;
    nodes: PatchNode[];
    edges: PatchEdge[];
  }