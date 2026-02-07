const API_BASE_URL = process.env.REACT_APP_BASE_URL || "/api";
const API_TOKEN = process.env.REACT_APP_API_TOKEN;

async function parseResponseBody(response) {
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return response.json();
  }
  return response.text();
}

const PRODUCTS_LIMIT = 20;

export async function fetchProducts(search = "") {
  const url = new URL(`${API_BASE_URL}/products`);
  url.searchParams.set("limit", String(PRODUCTS_LIMIT));
  if (search.trim()) {
    url.searchParams.set("search", search.trim());
  }
  const response = await fetch(url.toString(), {
    headers: {
      ...(API_TOKEN ? { "x-api-key": API_TOKEN } : {}),
    },
  });

  const body = await parseResponseBody(response);

  if (!response.ok) {
    const details = typeof body === "string" ? body : JSON.stringify(body);
    throw new Error(
      `Error ${response.status}: ${details || response.statusText}`
    );
  }

  return body;
}

export async function fetchProduct(id) {
  const url = `${API_BASE_URL}/products/${encodeURIComponent(id)}`;
  const response = await fetch(url, {
    headers: {
      ...(API_TOKEN ? { "x-api-key": API_TOKEN } : {}),
    },
  });

  const body = await parseResponseBody(response);

  if (!response.ok) {
    const details = typeof body === "string" ? body : JSON.stringify(body);
    throw new Error(
      `Error ${response.status}: ${details || response.statusText}`
    );
  }

  return body;
}
