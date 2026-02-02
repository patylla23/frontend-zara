# frontend-zara

Monorepo con:

- **Frontend**: React (>=17) + CSS + SASS, gestión de estado con **React Context API**
- **Backend**: Node 18 (Express)
- **Autenticación**: header `x-api-key` en las peticiones hacia `/api/*`

## Requisitos

- Node **18.x**
- npm (incluido con Node)

## Instalación

En la raíz del proyecto:

```bash
npm install
```

## Variables de entorno

### Backend

Copiá el ejemplo y completá tu API key:

```bash
cp backend/.env.example backend/.env
```

### Frontend

El frontend guarda el api-key en `localStorage` desde la UI (no hace falta `.env`).

## Ejecutar en modo desarrollo (frontend + backend)

Desde la raíz:

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3001`

## Probar autenticación

El endpoint protegido:

- `GET /api/hello` (requiere `x-api-key`)

Endpoints públicos:

- `GET /health`

Ejemplo con curl:

```bash
curl -H "x-api-key: TU_API_KEY" http://localhost:3001/api/hello
```

