import osc from "../nodes/osc";
import amp from "../nodes/amp";
import out from "../nodes/out";

export const NodeRegistry = new Map([
  [osc.id, osc],
  [amp.id, amp],
  [out.id, out],
]);
