import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { fetchProducts } from "./api/data";
import { useLocation, useParams } from "react-router-dom";

jest.mock("./api/data", () => ({
  fetchProducts: jest.fn(),
  fetchProduct: jest.fn(),
}));

test("render the products route", async () => {
  fetchProducts.mockResolvedValue([]);
  window.history.pushState({}, "Products", "/products");
  useLocation.mockReturnValue({ pathname: "/products" });
  useParams.mockReturnValue({});

  render(<App />);

  expect(
    screen.getByLabelText("Buscar móvil por nombre o marca")
  ).toBeInTheDocument();
  await waitFor(() => expect(fetchProducts).toHaveBeenCalled());
});
