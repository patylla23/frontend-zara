import React from "react";
import { Link } from "react-router-dom";
import "./ProductItemCard.scss";

function ProductItemCard({ product }) {
  return (
    <Link to={`/products/${product.id}`} className="product-card-link">
    <article className="product-card">
      {product.imageUrl && (
        <div className="product-card__image-wrap">
          <img
            src={product.imageUrl}
            alt={`${product.brand}-${product.name}`}
            className="product-card__image"
          />
        </div>
      )}
      <div className="product-card__info">
        {product.brand && (
          <p className="product-card__brand">{product.brand.toUpperCase()}</p>
        )}
        <div className="product-card__row">
          {product.name && (
            <h3 className="product-card__name">{product.name.toUpperCase()}</h3>
          )}
          {product.basePrice && (
            <span className="product-card__price">{product.basePrice} EUR</span>
          )}
        </div>
      </div>
    </article>
    </Link>
  );
}

export default ProductItemCard;
