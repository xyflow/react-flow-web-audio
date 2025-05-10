import { NodeRegistry } from "./registry";
import { engine } from "../audio";
import { useStore } from "../store";

function readPatchFile(file) {
    return new Promise((resolve, reject) => {
      if (!file.name.endsWith(".json")) {
        return reject(new Error("Only .json patch files are supported."));
      }
  
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const patch = JSON.parse(reader.result);
          resolve(patch);
        } catch (err) {
          reject(new Error("Invalid JSON in patch file."));
        }
      };
      reader.onerror = () => reject(new Error("Failed to read patch file."));
      reader.readAsText(file);
    });
  }

export async function importPatchFromFile(file) {
  const { nodes, edges } = await readPatchFile(file);

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

  useStore.setState({ nodes, edges });
}
