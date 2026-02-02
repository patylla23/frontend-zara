import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);

        const response = await fetch('http://localhost:5001/products', {
          method: 'GET',
          headers: {
            'x-api-key': process.env.REACT_APP_API_TOKEN,
          },
        });

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status} - No autorizado o servidor caído`);
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error('Error en la comunicación con el Backend:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  return (
    <>
      <NavBar />
      <main className="home-content">
        <header className="App-header">
          <h1>Tienda de Móviles</h1>

          {loading && <p className="loading">Cargando productos...</p>}

          {error && (
            <p className="error" style={{ color: 'red' }}>
              Error: {error}
            </p>
          )}

          {!loading && !error && (
            <div className="products-list">
              {products.length > 0 ? (
                <ul>
                  {products.map((product, index) => (
                    <li key={`${product.id}-${index}`}>
                      <strong>{product.brand}</strong> - {product.model || product.name}
                      {product.price && ` (${product.price}€)`}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No hay productos disponibles en este momento.</p>
              )}
            </div>
          )}
        </header>
      </main>
    </>
  );
}

export default HomePage;
