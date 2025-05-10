import AmpUI from "./UI.jsx";

/**
 * @typedef {import('../types.js').NodeDefinition} NodeDefinition
 * @type {NodeDefinition}
 */
const AmpNode = {
  id: "amp",
  label: "Gain",
  inputs: {
    gain: {
      type: "number",
      label: "Gain",
      default: 0.5,
      min: 0,
      max: 1,
      step: 0.01,
    },
  },
  outputs: {
    audio: { type: "audio" },
  },
  ui: AmpUI,
  factory(ctx, { gain }) {
    const node = ctx.createGain();
    node.gain.value = gain;
    return node;
  },
};

export default AmpNode;
