import { validatePatch } from "./validate.ts";

function toPatchIR(nodes, edges) {
  const cleanNodes = nodes.map(({ id, type, data }) => ({ id, type, data }));
  const cleanEdges = edges.map(({ id, source, target }) => ({
    id,
    source,
    target,
  }));
  return { nodes: cleanNodes, edges: cleanEdges };
}

function toPatchFile(nodes, edges, meta = {}) {
  const graph = toPatchIR(nodes, edges);
  const positions = Object.fromEntries(nodes.map((n) => [n.id, n.position]));

  return validatePatch({
    meta: {
      version: 1,
      created: new Date().toISOString(),
      ...meta,
    },
    ui: { positions },
    graph,
  });
}

function triggerDownload(patchFile, filename = "patch.json") {
  const json = JSON.stringify(patchFile, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function makeTimestampedFilename(base = "patch", ext = "json") {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  return `${base}-${timestamp}.${ext}`;
}

export function exportPatchToFile(nodes, edges, { filename, meta = {} } = {}) {
  const patchFile = toPatchFile(nodes, edges, meta);
  const finalName = filename || makeTimestampedFilename("patch", "json");
  triggerDownload(patchFile, finalName);
}
