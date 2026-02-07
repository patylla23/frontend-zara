import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CheckoutPage from "./CheckoutPage";
import { renderWithProviders } from "../test-utils";

describe("CheckoutPage", () => {
  test("shows products, total and allows to remove", async () => {
    const removeFromCart = jest.fn();
    const cart = [
      { id: "1", name: "A", basePrice: 100 },
      { id: "2", name: "B", basePrice: 200 },
    ];

    renderWithProviders(<CheckoutPage />, {
      route: "/checkout",
      contextValue: { cart, removeFromCart },
    });

    expect(screen.getByText("CART (2)")).toBeInTheDocument();
    expect(screen.getByText("300 EUR")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "CONTINUE SHOPPING" })
    ).toHaveAttribute("href", "/products");

    await userEvent.click(
      screen.getAllByRole("button", { name: "Eliminar producto" })[0]
    );
    expect(removeFromCart).toHaveBeenCalledWith(0);
  });

  test("shows empty state without total and payment button", () => {
    renderWithProviders(<CheckoutPage />, {
      route: "/checkout",
      contextValue: { cart: [] },
    });

    expect(screen.getByText("CART (0)")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Proceder al pago" })
    ).not.toBeInTheDocument();
    expect(screen.queryByText("TOTAL")).not.toBeInTheDocument();
  });
});
