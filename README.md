# ZARA CHALLENGE

## Requirements

- Phone list view
- Phone details view
- Checkout/Cart view

## Tech stack

- React 19
- React Testing library for unit testing
- Sass
- Node.js + Express
- Deployed on Vercel

## How to install it locally

From root project:

```
npm install
```

## Environment variables

### For frontend

Create a `.env` file inside `frontend/` with:

```
REACT_APP_BASE_URL=<URL_API or /api>
REACT_APP_API_TOKEN=<API_TOKEN>
```

### For backend

Create a `.env` file inside `backend/` with:

```
BASE_URL=<UPSTREAM_API_URL>
API_TOKEN=<UPSTREAM_API_TOKEN>
```

## Run locally

From the project root:

```
npm run dev
```

This starts backend and frontend in parallel.

## Run tests

From `frontend/`:

```
npm test
```
