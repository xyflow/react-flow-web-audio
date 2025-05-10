import osc from "../nodes/osc";
import Amp from "../nodes/Amp.jsx";
import Out from "../nodes/Out.jsx";

export const NodeRegistry = new Map([
  [osc.id, osc],
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
