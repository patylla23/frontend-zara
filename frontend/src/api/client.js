export async function apiFetch(path, { apiKey, ...options } = {}) {
  const headers = new Headers(options.headers || {});
  if (apiKey) headers.set("x-api-key", apiKey);
  if (!headers.has("accept")) headers.set("accept", "application/json");

  const res = await fetch(path, {
    ...options,
    headers
  });

  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const body = isJson ? await res.json().catch(() => null) : await res.text();

  if (!res.ok) {
    const message =
      (body && body.error) || (typeof body === "string" ? body : res.statusText);
    const err = new Error(message || "Request failed");
    err.status = res.status;
    err.body = body;
    throw err;
  }

  return body;
}

