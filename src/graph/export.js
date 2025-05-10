import { validatePatch } from "./model.js";

function createPatchJSON(nodes, edges, meta = {}) {
  const cleanNodes = nodes.map(({ id, type, data, position }) => ({
    id,
    type,
    data,
    position,
  }));

  const cleanEdges = edges.map(({ id, source, target }) => ({
    id,
    source,
    target,
  }));

  return validatePatch({
    meta: {
      version: 1,
      created: new Date().toISOString(),
      ...meta,
    },
    nodes: cleanNodes,
    edges: cleanEdges,
  });
}

function triggerDownload(patch, filename = "patch.json") {
  const json = JSON.stringify(patch, null, 2);
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
  const patch = createPatchJSON(nodes, edges, meta);
  const finalName = filename || makeTimestampedFilename("patch", "json");
  triggerDownload(patch, finalName);
}
