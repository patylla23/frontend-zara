# ZARA CHALLENGE 🛍️

Web application focused on browsing, searching, and managing a mobile phone
catalog, allowing users to view device details and manage a shopping cart.

## 🌐 Live demo 
https://frontend-zara-dyswt67zz-patriciajuradodebilbaos-projects.vercel.app/products
## 📝 Requirements

- Phone list view
- Phone details view
- Checkout/Cart view
- Navbar
- Search bar
- Responsive
- Accesibility

## 🛠️ Tech stack

- React 19
- React Testing library for unit testing
- Sass
- Node.js + Express
- Vercel for the deloy

## 🏗️ Architecture and technical decisions

- Monorepo with `frontend/` (React) and `backend/` (Express) plus a serverless
  entrypoint at `api/index.js` for Vercel.
- Frontend uses React Router for navigation and React Context (`AppContext`)
  to share cart state and search query across pages.
- API calls are centralized in `frontend/src/api/data.js` with `fetch`.
- Backend acts as a proxy to the upstream API, attaches the API key, and avoids
  CORS issues in production and local development.

## 🗂️ Project structure

```
├── api/                 # Vercel serverless entrypoint
├── backend/             # Express proxy server
├── frontend/
│   ├── src/
│   │   ├── api/          # API helpers (fetch wrappers)
│   │   ├── components/   # UI components
│   │   ├── context/      # AppContext (cart, search, products)
│   │   ├── pages/        # Main views
│   │   ├── styles/       # SASS variables/mixins
│   │   ├── test-data/    # Mock data for tests
│   │   └── __mocks__/    # Test mocks
│   └── public/
├── vercel.json
└── README.md
```

## 👩🏻‍💻 How to install it and run locally

From root project:

```
npm install
```

### Add Environment variables

#### For frontend

Create a `.env` file inside `frontend/` with:

```
REACT_APP_BASE_URL=<URL_API or /api>
REACT_APP_API_TOKEN=<API_TOKEN>
```

#### For backend

Create a `.env` file inside `backend/` with:

```
BASE_URL=<UPSTREAM_API_URL>
API_TOKEN=<UPSTREAM_API_TOKEN>
```

### Run locally
```
npm run dev
```
This starts backend and frontend in parallel.


### For frontend

- `npm test`: run unit test
- `npm run build`: creates a production build

## 🧪 Testing strategy

- Unit tests with React Testing Library focusing on UI rendering and user flows.
- Context and router are mocked where needed to keep tests isolated.
- The API layer is mocked to avoid network dependency.

## 🔜 Future improvements

- Add debounce to the search input to reduce API calls while typing.
- Add color filtering in the product list and persist the selection.
- Consider migrating to Next.js for SSR to improve SEO and initial load time.
