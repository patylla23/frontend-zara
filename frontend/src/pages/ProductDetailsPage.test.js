import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Routes, Route } from "react-router-dom";
import ProductDetailsPage from "./ProductDetailsPage";
import { renderWithProviders } from "../test-utils";
import { fetchProduct } from "../api/data";
import { useNavigate } from "react-router-dom";

jest.mock("../api/data", () => ({
  fetchProduct: jest.fn(),
}));

jest.mock("../components/ProductDetails", () => {
  return function ProductDetailsMock() {
    return <div>Product Details Mock</div>;
  };
});

describe("ProductDetailsPage", () => {
  test("loads the product and renders details", async () => {
    fetchProduct.mockResolvedValue({ id: "123", name: "Phone" });

    renderWithProviders(
      <Routes>
        <Route path="/products/:id" element={<ProductDetailsPage />} />
      </Routes>,
      { route: "/products/123", params: { id: "123" } }
    );

    await waitFor(() =>
      expect(fetchProduct).toHaveBeenCalledWith("123")
    );
    expect(screen.getByText("Product Details Mock")).toBeInTheDocument();
  });

  test("goes back to products when using the back button", async () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    fetchProduct.mockResolvedValue({ id: "123", name: "Phone" });

    renderWithProviders(
      <Routes>
        <Route path="/products/:id" element={<ProductDetailsPage />} />
      </Routes>,
      { route: "/products/123", params: { id: "123" } }
    );

    await waitFor(() =>
      expect(fetchProduct).toHaveBeenCalledWith("123")
    );
    await userEvent.click(screen.getByRole("button", { name: /BACK/ }));
    expect(mockNavigate).toHaveBeenCalledWith("/products");
  });
});
