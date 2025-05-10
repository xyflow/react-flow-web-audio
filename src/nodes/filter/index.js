import { makeGenericNode } from "../../components/NodeUI";

/**
 * @typedef {import('../types.js').NodeDefinition} NodeDefinition
 * @type {NodeDefinition}
 */
const FilterNode = makeGenericNode({
  id: "filter",
  label: "Filter",
  inputs: {
    frequency: {
      type: "number",
      label: "Cutoff",
      default: 1000,
      min: 20,
      max: 20000,
      step: 1,
    },
    Q: {
      type: "number",
      label: "Q",
      default: 1,
      min: 0.1,
      max: 20,
      step: 0.1,
    },
    type: {
      type: "enum",
      label: "Type",
      default: "lowpass",
      values: [
        "lowpass",
        "highpass",
        "bandpass",
        "notch",
        "peaking",
        "lowshelf",
        "highshelf",
      ],
    },
  },
  outputs: {
    audio: { type: "audio" },
  },
  factory(ctx, { frequency, Q, type }) {
    const node = ctx.createBiquadFilter();
    node.frequency.value = frequency;
    node.Q.value = Q;
    node.type = type;
    return node;
  },
});

export default FilterNode;
