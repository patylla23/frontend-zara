const express = require('express');
const path = require('path');
const cors = require('cors');

require('dotenv').config({ path: path.join(__dirname, '.env') });

const API_TOKEN = process.env.API_TOKEN;
const BASE_URL = process.env.BASE_URL; // https://prueba-tecnica-api-tienda-moviles.onrender.com

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
    const productsUrl = new URL('/products', BASE_URL).toString();
    const { upstreamRes, body } = await fetchUpstream(productsUrl);


    if (!upstreamRes.ok) {
      return res
        .status(upstreamRes.status)
        .send(typeof body === 'string' ? body : JSON.stringify(body));
    }

    if (typeof body === 'string') return res.type('text/plain').send(body);
    return res.json(body);
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return res.status(500).send(message);
  }
});


const PORT = Number(process.env.PORT) || 5001;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend escuchando en http://localhost:${PORT}`);
});