import Osc from "../nodes/Osc.jsx";
import Amp from "../nodes/Amp.jsx";
import Out from "../nodes/Out.jsx";

export const NodeRegistry = new Map([
  [
    "osc",
    {
      id: "osc",
      label: "Oscillator",
      inputs: {
        frequency: { type: "number", default: 440 },
        type: {
          type: "enum",
          values: ["sine", "square", "sawtooth", "triangle"],
        },
      },
      outputs: { audio: { type: "audio" } },
      ui: Osc,
      factory: (ctx, data) => {
        const node = ctx.createOscillator();
        node.frequency.value = data.frequency;
        node.type = data.type;
        node.start();
        return node;
      },
    },
  ],
  [
    "amp",
    {
      id: "amp",
      label: "Gain",
      inputs: {
        gain: { type: "number", default: 0.5 },
      },
      outputs: { audio: { type: "audio" } },
      ui: Amp,
      factory: (ctx, data) => {
        const node = ctx.createGain();
        node.gain.value = data.gain;
        return node;
      },
    },
  ],
  [
    "out",
    {
      id: "out",
      label: "Output",
      inputs: { audio: { type: "audio" } },
      outputs: {},
      ui: Out,
      factory: (ctx) => ctx.destination,
    },
  ],
]);
