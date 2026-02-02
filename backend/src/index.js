const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());

// Si usás el proxy de Vite, CORS no es estrictamente necesario,
// pero lo dejamos habilitado para facilitar pruebas directas.
app.use(
  cors({
    origin: true
  })
);

function apiKeyAuth(req, res, next) {
  const required = process.env.API_KEY;
  const provided = req.header("x-api-key");

  if (!required) {
    return res.status(500).json({
      error: "Server misconfigured: API_KEY is not set"
    });
  }

  if (!provided || provided !== required) {
    return res.status(401).json({
      error: "Unauthorized: missing or invalid x-api-key"
    });
  }

  return next();
}

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.get("/api/hello", apiKeyAuth, (req, res) => {
  res.json({
    message: "Hello from Node 18 backend",
    time: new Date().toISOString()
  });
});

const port = Number(process.env.PORT || 3001);
const host = process.env.HOST || "127.0.0.1";
app.listen(port, host, () => {
  // eslint-disable-next-line no-console
  console.log(`[backend] listening on http://${host}:${port}`);
});

