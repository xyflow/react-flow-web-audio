import { NodeRegistry } from "./registry";
import { engine } from "../audio";
import { useStore } from "../store";
import { validatePatch } from "./validate.ts";

function readPatchFile(file) {
  return new Promise((resolve, reject) => {
    if (!file.name.endsWith(".json")) {
      return reject(new Error("Only .json patch files are supported."));
    }

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const raw = JSON.parse(reader.result);
        const validated = validatePatch(raw);
        resolve(validated);
      } catch (err) {
        reject(new Error("Invalid JSON in patch file."));
      }
    };
    reader.onerror = () => reject(new Error("Failed to read patch file."));
    reader.readAsText(file);
  });
}

export async function importPatchFromFile(file) {
  const patchFile = await readPatchFile(file);
  const { graph, ui } = patchFile;
  const { nodes, edges } = graph;

  engine.reset();

  for (const node of nodes) {
    const def = NodeRegistry.get(node.type);
    if (def) {
      engine.createNode(node.id, def.factory, node.data);
    }
  }

  for (const edge of edges) {
    engine.connect(edge.source, edge.target);
  }

  const withPositions = nodes.map((node) => ({
    ...node,
    position: ui?.positions?.[node.id] ?? { x: 0, y: 0 },
  }));

  useStore.setState({ nodes: withPositions, edges });
}
