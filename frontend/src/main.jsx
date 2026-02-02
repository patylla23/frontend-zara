import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ApiKeyProvider } from "./state/ApiKeyContext.jsx";
import "./styles/main.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApiKeyProvider>
      <App />
    </ApiKeyProvider>
  </React.StrictMode>
);

