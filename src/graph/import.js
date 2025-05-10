import { engine } from "../audio";
import { useStore } from "../store";
import { validatePatch } from "./validate.ts";
import { executeGraph } from "./executeGraph.ts";

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
  const patch = await readPatchFile(file);
  const { graph, ui } = patch;

  // Delegate to runtime executor
  executeGraph(engine, graph.nodes, graph.edges);

  // Convert back to ReactFlow format with positions
  const withPositions = graph.nodes.map((node) => ({
    ...node,
    position: ui?.positions?.[node.id] ?? { x: 0, y: 0 },
  }));

  useStore.setState({ nodes: withPositions, edges: graph.edges });
}
