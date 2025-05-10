export class WebAudioEngine {
  constructor() {
    this.context = new AudioContext();
    this.context.suspend();
    this.nodes = new Map();
  }

  isRunning() {
    return this.context.state === "running";
  }

  toggle() {
    return this.isRunning() ? this.context.suspend() : this.context.resume();
  }

  createNode(id, factory, data) {
    if (this.nodes.has(id)) return;

    const node = factory(this.context, data);
    this.nodes.set(id, node);
  }

  updateNode(id, data) {
    const node = this.nodes.get(id);
    if (!node) return;

    for (const [key, val] of Object.entries(data)) {
      if (node[key] instanceof AudioParam) {
        node[key].value = val;
      } else {
        node[key] = val;
      }
    }
  }

  removeNode(id) {
    const node = this.nodes.get(id);
    if (!node) return;

    node.disconnect();
    node.stop?.();
    this.nodes.delete(id);
  }

  connect(sourceId, targetId) {
    const source = this.nodes.get(sourceId);
    const target = this.nodes.get(targetId);

    if (source && target) {
      source.connect(target);
    }
  }

  disconnect(sourceId, targetId) {
    const source = this.nodes.get(sourceId);
    const target = this.nodes.get(targetId);

    if (source && target) {
      try {
        source.disconnect(target);
      } catch (err) {
        console.warn(`Failed to disconnect ${sourceId} → ${targetId}`, err);
        // Fallback to disconnecting all
        try {
          source.disconnect();
        } catch (e) {
          console.error(`Full disconnect failed for ${sourceId}`, e);
        }
      }
    }
  }

  reset() {
    for (const node of this.nodes.values()) {
      node.disconnect();
      node.stop?.();
    }
    this.nodes.clear();
  }
}
