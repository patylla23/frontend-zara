import React from "react";
import { screen } from "@testing-library/react";
import HomePage from "./HomePage";
import { renderWithProviders } from "../test-utils";
import { mockProducts } from "../test-data/mock_products";

describe("HomePage", () => {
  test("show loading message", () => {
    renderWithProviders(<HomePage />, {
      contextValue: { loading: true },
    });

    expect(screen.getByText("Cargando productos...")).toBeInTheDocument();
  });

  test("show error message", () => {
    renderWithProviders(<HomePage />, {
      contextValue: { loading: false, error: "fallo" },
    });

    expect(screen.getByText("Error: fallo")).toBeInTheDocument();
  });

  test("render the list of products", () => {
    const products = mockProducts;

    renderWithProviders(<HomePage />, {
      contextValue: { loading: false, error: null, products },
    });
    expect(
      screen.getByText(products[0].name.toUpperCase())
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(products[0].brand.toUpperCase()).length
    ).toBeGreaterThan(0);
    expect(
      screen.getByText(`${products[0].basePrice} EUR`)
    ).toBeInTheDocument();
    const img = screen.getByRole("img", { name: "Samsung-Galaxy S24 Ultra" });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", products[0].imageUrl);
  });
});
