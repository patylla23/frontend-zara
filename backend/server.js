const express = require('express');
const path = require('path');
const cors = require('cors');

require('dotenv').config({ path: path.join(__dirname, '.env') });

const API_TOKEN = process.env.API_TOKEN;
const BASE_URL = process.env.BASE_URL;

const app = express();
app.use(cors());

app.use((req, res, next) => {
    const apiKey = req.header('x-api-key');
    
    if (apiKey === API_TOKEN) return next();
    res.status(401).send('Acceso no autorizado');
  });

async function fetchUpstream(url) {
  const upstreamRes = await fetch(url, { headers: { 'x-api-key': API_TOKEN } });
  const contentType = upstreamRes.headers.get('content-type') || '';
  const body = contentType.includes('application/json')
    ? await upstreamRes.json()
    : await upstreamRes.text();
  return { upstreamRes, body };
}

// PRODUCTS
app.get('/products', async (req, res) => {
  try {
    const productsUrl = `${BASE_URL}/products`;
    
    const { upstreamRes, body } = await fetchUpstream(productsUrl);

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