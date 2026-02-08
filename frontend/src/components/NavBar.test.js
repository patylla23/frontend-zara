import React from "react";
import { screen } from "@testing-library/react";
import NavBar from "./NavBar";
import { renderWithProviders } from "../test-utils";
import bagActive from "../assets/bag_active.svg";
import bagInactive from "../assets/bag_inactive.svg";

describe("NavBar", () => {
  test("show logo and empty cart counter", () => {
    renderWithProviders(<NavBar />, { route: "/products" });

    expect(
      screen.getByRole("link", { name: "Ir a inicio" })
    ).toBeInTheDocument();

    const bagImage = screen.getByAltText("Carrito");
    expect(bagImage).toHaveAttribute("src", bagInactive);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  test("show active bag icon when there are products", () => {
    renderWithProviders(<NavBar />, {
      route: "/products",
      contextValue: { cart: [{ id: "1" }] },
    });

    const bagImage = screen.getByAltText("Carrito");
    expect(bagImage).toHaveAttribute("src", bagActive);
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  test("hide bag icon and link in checkout page", () => {
    renderWithProviders(<NavBar />, { route: "/checkout" });

    expect(screen.queryByAltText("Carrito")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Ir al carrito" })
    ).not.toBeInTheDocument();
  });
});
