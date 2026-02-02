import { ApiKeyForm } from "./components/ApiKeyForm.jsx";
import { HelloCard } from "./components/HelloCard.jsx";

export default function App() {
  return (
    <div className="app">
      <header className="app__header">
        <div>
          <h1>frontend-zara</h1>
          <p className="muted">
            React + SASS + Context API, backend Node 18 con auth por{" "}
            <code>x-api-key</code>
          </p>
        </div>
      </header>

      <main className="app__main">
        <ApiKeyForm />
        <HelloCard />
      </main>

      <footer className="app__footer muted">
        Proxy configurado: <code>/api</code> y <code>/health</code> → backend{" "}
        <code>localhost:3001</code>
      </footer>
    </div>
  );
}

