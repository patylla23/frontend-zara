import React from "react";
import { screen } from "@testing-library/react";
import ProductItemCard from "./ProductItemCard";
import { renderWithProviders } from "../test-utils";
import { mockProducts } from "../test-data/mock_products";

describe("ProductItemCard", () => {
  test("show product information and correct link", () => {
    const product = mockProducts[0];

    renderWithProviders(<ProductItemCard product={product} />);

    expect(screen.getByText("SAMSUNG")).toBeInTheDocument();
    expect(screen.getByText("GALAXY S24 ULTRA")).toBeInTheDocument();
    expect(screen.getByText("100 EUR")).toBeInTheDocument();
    expect(screen.getByAltText("Samsung-Galaxy S24 Ultra")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Ver detalle de producto" })
    ).toHaveAttribute("href", "/products/SMG-S24U");
  });
});
