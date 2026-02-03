import React, { createContext, useState, useEffect, useCallback } from "react";
import { fetchProducts } from "../api/data";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProducts = useCallback(async (search) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProducts(search);
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts(searchQuery);
  }, [searchQuery, loadProducts]);

  const value = {
    user,
    setUser,
    searchQuery,
    setSearchQuery,
    products,
    resultsCount: products.length,
    loading,
    error,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
