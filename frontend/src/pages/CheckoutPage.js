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
      <main className="checkout-main">
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
        {!isEmpty && (
          <div className="checkout-total">
            <p>TOTAL</p>
            <p>{total} EUR</p>
          </div>
        )}
        <div
          className={`checkout__cta ${isEmpty ? "checkout__cta--single" : "checkout__cta--double"}`}
        >
          <Link to="/products" className="checkout__cta-link">
            <button type="button" className="checkout__cta-button checkout__cta-button--outline">
              CONTINUE SHOPPING
            </button>
          </Link>
          {!isEmpty && (
            <button type="button" className="checkout__cta-button checkout__cta-button--solid">
              PAY
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}

export default CheckoutPage;
