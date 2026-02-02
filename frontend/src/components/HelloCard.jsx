import React from "react";
import { apiFetch } from "../api/client.js";
import { useApiKey } from "../state/ApiKeyContext.jsx";

export function HelloCard() {
  const { apiKey } = useApiKey();
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);

  async function callHello() {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const res = await apiFetch("/api/hello", { apiKey });
      setData(res);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="card">
      <div className="row row--space">
        <div>
          <h2 className="card__title">Backend protegido</h2>
          <p className="muted">
            Llama a <code>GET /api/hello</code> enviando <code>x-api-key</code>
          </p>
        </div>
        <button className="btn" disabled={loading} onClick={callHello}>
          {loading ? "Consultando..." : "Probar /api/hello"}
        </button>
      </div>

      {error ? (
        <pre className="alert alert--error">
{JSON.stringify(
  {
    message: error.message,
    status: error.status,
    body: error.body
  },
  null,
  2
)}
        </pre>
      ) : null}

      {data ? (
        <pre className="alert alert--ok">{JSON.stringify(data, null, 2)}</pre>
      ) : null}
    </section>
  );
}

