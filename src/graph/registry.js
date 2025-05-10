export const NodeRegistry = new Map();

const modules = import.meta.glob("../nodes/**/index.js", { eager: true });

for (const path in modules) {
  const node = modules[path].default;
  if (node?.id && node?.ui && node?.factory) {
    NodeRegistry.set(node.id, node);
  } else {
    console.warn(`Skipped invalid node definition at ${path}`);
  }
}
