import React, { useContext } from "react";
import "./SearchBar.scss";
import CloseIcon from "../assets/close_icon.png";
import { AppContext } from "../context/AppContext";

function SearchBar() {
  const { searchQuery, setSearchQuery, resultsCount } = useContext(AppContext);

  return (
    <section className="search-section">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a smartphone..."
          className="search-bar-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Buscar móvil por nombre o marca"
        />
        {searchQuery && (
          <button
            type="button"
            className="search-bar-icon-button"
            onClick={() => setSearchQuery("")}
            aria-label="Borrar búsqueda"
          >
            <img src={CloseIcon} alt="" className="search-bar-icon" />
          </button>
        )}
      </div>
      <div className="search-bar-results">{resultsCount} RESULTS</div>
    </section>
  );
}

export default SearchBar;
