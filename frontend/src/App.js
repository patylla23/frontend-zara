import { useEffect, useState } from 'react';
import './App.scss';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const apiToken = process.env.REACT_APP_API_TOKEN;
        const baseUrl = process.env.REACT_APP_BASE_URL

        const response = await fetch(`${baseUrl}/products`, {
          method: 'GET',
          headers: {
            'x-api-key': apiToken,  
          },
        });

        if (!response.ok) {
          throw new Error(`Error en la petición: ${response.status}`);
        }

        const data = await response.json();
        console.log('Data:', data);
        setProducts(data);
      } catch (error) {
        console.error('Error capturado en el Frontend:', error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Productos</h1>
        
        {loading ? (
          <p>Cargando productos...</p>
        ) : (
          <div className="products-list">
            {products.length > 0 ? (
              <ul>
                {products.map((product, index) => (
                  <li key={`${product.id}-${index}`}>{product.name || product.model}</li>
                ))}
              </ul>
            ) : (
              <p>No se encontraron productos.</p>
            )}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;