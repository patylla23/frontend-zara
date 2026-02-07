import { useContext } from "react";
import NavBar from "../components/NavBar";
import "./CheckoutPage.scss";
import CheckoutCard from "../components/CheckoutCard";
import "./ProductDetailsPage.scss";
import { AppContext } from "../context/AppContext";
import { Link } from 'react-router-dom';

function CheckoutPage() {
  const { cart, removeFromCart } = useContext(AppContext);
  const cartCount = cart?.length ?? 0;
  const isEmpty = cartCount === 0;
  const total =
    (cart ?? []).reduce((sum, item) => sum + (item.basePrice ?? 0), 0) || 0;

  return (
    <div className="checkout-page">
      <NavBar />
      <main className="checkout-main" aria-label="Carrito de compra">
        <h3 className="checkout-title">CART ({cartCount})</h3>
        {(cart ?? []).map((product, index) => (
          <div key={`${product?.id}-${index}`}>
            <CheckoutCard
              product={product}
              onRemove={() => removeFromCart(index)}
            />
          </div>
        ))}
      </main>
      <footer className="checkout-footer">
        <div
          className={`checkout-footer__inner ${isEmpty ? "checkout-footer__inner--empty" : "checkout-footer__inner--with-items"}`}
        >
          <Link to="/products" className="checkout__cta-link">
            <button type="button" className="checkout__cta-button checkout__cta-button--outline" aria-label="Continuar comprando">
              CONTINUE SHOPPING
            </button>
          </Link>
          {!isEmpty && (
            <div className="checkout-total">
              <p>TOTAL</p>
              <p>{total} EUR</p>
            </div>
          )}
          {!isEmpty && (
            <button type="button" className="checkout__cta-button checkout__cta-button--solid" aria-label="Proceder al pago">
              PAY
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}

export default CheckoutPage;
