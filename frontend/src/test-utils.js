import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter, useLocation, useParams } from "react-router-dom";
import { AppContext } from "./context/AppContext";

const defaultContextValue = {
  user: null,
  setUser: jest.fn(),
  searchQuery: "",
  setSearchQuery: jest.fn(),
  products: [],
  resultsCount: 0,
  cart: [],
  addToCart: jest.fn(),
  removeFromCart: jest.fn(),
  loading: false,
  error: null,
};

export function renderWithProviders(
  ui,
  { route = "/", params = {}, contextValue = {} } = {}
) {
  const value = { ...defaultContextValue, ...contextValue };
  if (useLocation?.mockReturnValue) {
    useLocation.mockReturnValue({ pathname: route });
  }
  if (useParams?.mockReturnValue) {
    useParams.mockReturnValue(params);
  }
  return render(
    <AppContext.Provider value={value}>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </AppContext.Provider>
  );
}
