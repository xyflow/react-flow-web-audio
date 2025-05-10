import { WebAudioEngine } from "./audio/WebAudioEngine";
import { NodeRegistry } from "./graph/registry";

export const engine = new WebAudioEngine();

export function isRunning() {
  return engine.isRunning();
}

export function toggleAudio() {
  return engine.toggle();
}

export function createAudioNode(id, type, data) {
  const def = NodeRegistry.get(type);
  if (!def) return;
  engine.createNode(id, def.factory, data);
}

export function updateAudioNode(id, data) {
  engine.updateNode(id, data);
}

export function removeAudioNode(id) {
  engine.removeNode(id);
}

export function connect(sourceId, targetId) {
  engine.connect(sourceId, targetId);
}

export function disconnect(sourceId, targetId) {
  engine.disconnect(sourceId, targetId);
}
