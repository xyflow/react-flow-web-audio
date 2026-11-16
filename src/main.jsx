import React from "react";
import ReactDOM from "react-dom/client";
import { ReactFlowProvider } from "@xyflow/react";
import App from "./App";

import "@xyflow/react/style.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReactFlowProvider>
      <div style={{ width: "100vw", height: "100vh" }}>
        <App />
      </div>
    </ReactFlowProvider>
  </React.StrictMode>,
);
