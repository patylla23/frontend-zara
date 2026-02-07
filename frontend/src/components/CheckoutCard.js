import React from "react";
import "./CheckoutCard.scss";

function CheckoutCard({ product, onRemove }) {
  return (
    <article className="checkout-card">
      {product.imageUrl && (
        <div className="checkout-card__image-wrap">
          <img
            src={product.imageUrl}
            alt={`${product.brand}-${product.name}`}
            className="checkout-card__image"
          />
        </div>
      )}
      <div className="checkout-card__info">
        <div>
          {product.name && (
            <h3 className="checkout-card__specs">
              {product.name.toUpperCase()}
            </h3>
          )}
          {product.selectedStorage && (
            <span className="checkout-card__specs">
              {product.selectedStorage} <span> | </span>
            </span>
          )}
          {product.selectedColor && (
            <span className="checkout-card__specs">
               {product.selectedColor}
            </span>
          )}
        </div>
          {product.basePrice && (
            <span className="checkout-card__price">
              {product.basePrice} EUR
            </span>
          )}
        <div className="checkout-card__remove-container">
          <button
            type="button"
            className="checkout-card__remove"
            onClick={onRemove}
            aria-label="Eliminar producto"
          >
            Eliminar
          </button>
        </div>
      </div>
    </article>
  );
}

export default CheckoutCard;
