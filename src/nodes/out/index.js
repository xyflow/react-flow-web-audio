import OutputUI from "./UI.jsx";

/**
 * @typedef {import('../types.js').NodeDefinition} NodeDefinition
 * @type {NodeDefinition}
 */
const OutputNode = {
  id: "out",
  label: "Output",
  inputs: {
    audio: { type: "audio" },
  },
  outputs: {},
  ui: OutputUI,
  factory(ctx) {
    return ctx.destination;
  },
};

export default OutputNode;
