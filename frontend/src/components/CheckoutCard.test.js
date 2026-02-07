import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CheckoutCard from "./CheckoutCard";
import { renderWithProviders } from "../test-utils";
import { mockProductDetails } from "../test-data/mock_products";

describe("CheckoutCard", () => {
  test("render the product and allow to remove it", async () => {
    const onRemove = jest.fn();
    const product = {
      ...mockProductDetails,
      selectedStorage: mockProductDetails.storageOptions[0].capacity,
      selectedColor: mockProductDetails.colorOptions[0].name,
    };

    renderWithProviders(<CheckoutCard product={product} onRemove={onRemove} />);

    expect(screen.getByText(product.name.toUpperCase())).toBeInTheDocument();
    expect(screen.getByText(product.selectedStorage)).toBeInTheDocument();
    expect(screen.getByText(product.selectedColor)).toBeInTheDocument();
    expect(screen.getByText(`${product.basePrice} EUR`)).toBeInTheDocument();

    await userEvent.click(
      screen.getByRole("button", { name: "Eliminar producto" })
    );
    expect(onRemove).toHaveBeenCalledTimes(1);
  });
});
