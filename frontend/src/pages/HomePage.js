import { useContext } from "react";
import "./HomePage.scss";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import ProductList from "../components/ProductList";
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
            <div className="home-products">
              <ProductList products={products} />
            </div>
          )}
        </header>
      </main>
    </>
  );
}

export default HomePage;
