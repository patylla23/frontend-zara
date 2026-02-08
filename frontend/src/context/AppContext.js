import React, { createContext, useState, useEffect, useCallback } from "react";
import { fetchProducts } from "../api/data";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isCartInitialized = React.useRef(false);

  useEffect(() => {
    if (isCartInitialized.current) return;
    isCartInitialized.current = true;
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) {
          setCart(parsed);
        }
      }
    } catch (e) {
      console.error("Error loading cart from localStorage:", e);
    }
  }, []);

  useEffect(() => {
    if (!isCartInitialized.current) return;
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (e) {
      console.error("Error saving cart to localStorage:", e);
    }
  }, [cart]);

  const addToCart = useCallback((item) => {
    setCart((prev) => [...prev, item]);
  }, []);

  const removeFromCart = useCallback((index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  }, []);

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
    cart,
    addToCart,
    removeFromCart,
    loading,
    error,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
