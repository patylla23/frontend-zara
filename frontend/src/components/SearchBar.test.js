import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "./SearchBar";
import { renderWithProviders } from "../test-utils";

describe("SearchBar", () => {
  test("renders input and results count", () => {
    renderWithProviders(<SearchBar />, {
      contextValue: { resultsCount: 3 },
    });

    expect(
      screen.getByLabelText("Buscar móvil por nombre o marca")
    ).toBeInTheDocument();
    expect(screen.getByText("3 RESULTS")).toBeInTheDocument();
  });

  test("allows to clear the search", async () => {
    const setSearchQuery = jest.fn();

    renderWithProviders(<SearchBar />, {
      contextValue: { searchQuery: "iphone", setSearchQuery },
    });

    const clearButton = screen.getByRole("button", {
      name: "Borrar búsqueda",
    });
    await userEvent.click(clearButton);
    expect(setSearchQuery).toHaveBeenCalledWith("");
  });

  test("updates the query when typing", async () => {
    const setSearchQuery = jest.fn();

    renderWithProviders(<SearchBar />, {
      contextValue: { searchQuery: "", setSearchQuery },
    });

    const input = screen.getByLabelText("Buscar móvil por nombre o marca");
    await userEvent.type(input, "samsung");
    expect(setSearchQuery).toHaveBeenCalledWith("s");
  });
});
