const express = require("express");
const path = require("path");
const cors = require("cors");

require("dotenv").config({ path: path.join(__dirname, ".env") });

const API_TOKEN = process.env.API_TOKEN;
const BASE_URL = process.env.BASE_URL;

const app = express();
app.use(cors());

app.use((req, res, next) => {
  const apiKey = req.header("x-api-key");

  if (apiKey === API_TOKEN) return next();
  res.status(401).send("Acceso no autorizado");
});

async function fetchUpstream(url) {
  const upstreamRes = await fetch(url, { headers: { "x-api-key": API_TOKEN } });
  const contentType = upstreamRes.headers.get("content-type") || "";
  const body = contentType.includes("application/json")
    ? await upstreamRes.json()
    : await upstreamRes.text();
  return { upstreamRes, body };
}

// PRODUCTS
const DEFAULT_LIMIT = 20;

app.get("/products", async (req, res) => {
  try {
    const limit = req.query.limit != null ? req.query.limit : DEFAULT_LIMIT;
    const productsUrl = `${BASE_URL}/products?limit=${limit}`;
    const { body } = await fetchUpstream(productsUrl);

    const list = Array.isArray(body) ? body : [];
    const search = (req.query.search || "").trim().toLowerCase();

    const products = search
      ? list.filter((p) => {
          const brand = (p.brand || "").toLowerCase();
          const name = (p.name || "").toLowerCase();
          const model = (p.model || "").toLowerCase();
          return (
            brand.includes(search) ||
            name.includes(search) ||
            model.includes(search)
          );
        })
      : list;

    res.json(products);
  } catch (e) {
    res.status(500).send("Error en el servidor");
  }
});

// PRODUCT BY ID
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productUrl = `${BASE_URL}/products/${id}`;
    const { upstreamRes, body } = await fetchUpstream(productUrl);

    if (upstreamRes.status === 404) {
      return res.status(404).send("Producto no encontrado");
    }
    if (!upstreamRes.ok) {
      return res.status(upstreamRes.status).send("Error en el servidor");
    }

    res.json(body);
  } catch (e) {
    res.status(500).send("Error en el servidor");
  }
});

const PORT = Number(process.env.PORT) || 5001;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend escuchando en http://localhost:${PORT}`);
});
