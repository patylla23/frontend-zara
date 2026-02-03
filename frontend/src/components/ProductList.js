import React from "react";
import ProductItemCard from "./ProductItemCard";
import "./ProductList.scss";

function ProductList({ products }) {
  return (
    <ul className="products-list">
      {products.map((product, index) => (
        <li
          key={`${product.id}-${index}`}
          className="products-list__item"
        >
          <ProductItemCard product={product} />
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
