import osc from "../nodes/osc";
import amp from "../nodes/amp";
import Out from "../nodes/Out.jsx";

export const NodeRegistry = new Map([
  [osc.id, osc],
  [amp.id, amp],
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
