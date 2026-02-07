import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductDetails from "./ProductDetails";
import { renderWithProviders } from "../test-utils";
import { useNavigate } from "react-router-dom";
import { mockProductDetails } from "../test-data/mock_products";

describe("ProductDetails", () => {
  test("allows selecting options and adding to cart", async () => {
    const addToCart = jest.fn();
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    const product = mockProductDetails;

    renderWithProviders(<ProductDetails product={product} />, {
      contextValue: { addToCart },
    });

    expect(screen.getByText("REDMI NOTE 13 PRO 5G")).toBeInTheDocument();
    expect(screen.getByText("From 399 EUR")).toBeInTheDocument();
    await screen.findByText("Midnight Black");

    const addButton = screen.getByRole("button", { name: "Añadir al carrito" });
    expect(addButton).toBeDisabled();

    await userEvent.click(screen.getByRole("button", { name: "512 GB" }));
    expect(addButton).toBeEnabled();
    expect(screen.getByText("399 EUR")).toBeInTheDocument();

    await userEvent.click(addButton);
    expect(addToCart).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "XMI-RN13P5G",
        selectedStorage: "512 GB",
        selectedColor: "Midnight Black",
        basePrice: 399,
      })
    );
    expect(mockNavigate).toHaveBeenCalledWith("/checkout");

    expect(screen.getByText("13T PRO")).toBeInTheDocument();
  });
});
