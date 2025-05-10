import OscillatorUI from "./UI.jsx";

/**
 * @typedef {import('../types.js').NodeDefinition} NodeDefinition
 * @type {NodeDefinition}
 */
const OscillatorNode = {
  id: "osc",
  label: "Oscillator",
  inputs: {
    frequency: {
      type: "number",
      label: "Frequency",
      default: 440,
      min: 10,
      max: 1000,
      step: 1,
      unit: "Hz",
    },
    type: {
      type: "enum",
      label: "Waveform",
      default: "sine",
      values: ["sine", "square", "sawtooth", "triangle"],
    },
  },
  outputs: {
    audio: { type: "audio" },
  },
  ui: OscillatorUI,
  factory(ctx, { frequency, type }) {
    const node = ctx.createOscillator();
    node.frequency.value = frequency;
    node.type = type;
    node.start();
    return node;
  },
};

export default OscillatorNode;
