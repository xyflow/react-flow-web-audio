// types.ts

export type NumberInput = {
  type: "number";
  label?: string;
  default: number;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
};

export type EnumInput = {
  type: "enum";
  label?: string;
  default: string;
  values: string[];
};

export type InputDefinition = NumberInput | EnumInput;

export type Port = {
  type: "audio" | "number" | "event";
};

export interface NodeDefinition {
  id: string;
  label: string;
  inputs: Record<string, InputDefinition>;
  outputs: Record<string, Port>;
  ui: React.ComponentType<{ id: string; data: Record<string, any> }>;
  factory: (ctx: AudioContext, data: Record<string, any>) => AudioNode;
}
