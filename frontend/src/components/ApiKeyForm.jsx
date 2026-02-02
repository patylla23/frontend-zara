import React from "react";
import { useApiKey } from "../state/ApiKeyContext.jsx";

export function ApiKeyForm() {
  const { apiKey, setApiKey, clearApiKey } = useApiKey();
  const [draft, setDraft] = React.useState(apiKey);

  React.useEffect(() => {
    setDraft(apiKey);
  }, [apiKey]);

  return (
    <section className="card">
      <h2 className="card__title">API Key</h2>
      <p className="muted">
        Se enviará como header <code>x-api-key</code> a las rutas <code>/api/*</code>
      </p>

      <div className="row">
        <input
          className="input"
          placeholder="Pegá tu API key..."
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <button className="btn" onClick={() => setApiKey(draft)}>
          Guardar
        </button>
        <button className="btn btn--ghost" onClick={clearApiKey}>
          Limpiar
        </button>
      </div>

      <div className="muted small">
        Estado:{" "}
        {apiKey ? (
          <span>
            configurada (<code>{apiKey.slice(0, 4)}…</code>)
          </span>
        ) : (
          <span>no configurada</span>
        )}
      </div>
    </section>
  );
}

