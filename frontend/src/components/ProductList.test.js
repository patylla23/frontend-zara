import React from "react";
import { screen } from "@testing-library/react";
import ProductList from "./ProductList";
import { renderWithProviders } from "../test-utils";
import { mockProducts } from "../test-data/mock_products";

describe("ProductList", () => {
  test("renders a list of products", () => {
    const products = mockProducts;

    renderWithProviders(<ProductList products={products} />);

    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(screen.getByText("GALAXY S24 ULTRA")).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: "Ver detalle de producto" })[0]
    ).toHaveAttribute("href", "/products/SMG-S24U");
  });
});
