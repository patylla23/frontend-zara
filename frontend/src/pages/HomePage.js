import { useContext } from "react";
import "./HomePage.scss";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import { AppContext } from "../context/AppContext";

function HomePage() {
  const { products, loading, error } = useContext(AppContext);

  return (
    <>
      <NavBar />
      <main className="home-content">
        <SearchBar />
        <header className="App-header">
          {loading && <p className="loading">Cargando productos...</p>}

          {error && (
            <p className="error" style={{ color: "red" }}>
              Error: {error}
            </p>
          )}

          {!loading && !error && (
            <div className="products-list">
              {products.length > 0 ? (
                <ul>
                  {products.map((product, index) => (
                    <li key={`${product.id}-${index}`}>
                      <strong>{product.brand}</strong> -{" "}
                      {product.model || product.name}
                      {product.price && ` (${product.price}€)`}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-results">
                  No hay resultados relacionados con la búsqueda.
                </p>
              )}
            </div>
          )}
        </header>
      </main>
    </>
  );
}

export default HomePage;
