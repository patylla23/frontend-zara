import React from "react";

const STORAGE_KEY = "x-api-key";

const ApiKeyContext = React.createContext(null);

export function ApiKeyProvider({ children }) {
  const [apiKey, setApiKeyState] = React.useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || "";
    } catch {
      return "";
    }
  });

  const setApiKey = React.useCallback((value) => {
    const next = (value || "").trim();
    setApiKeyState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }, []);

  const clearApiKey = React.useCallback(() => {
    setApiKeyState("");
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const value = React.useMemo(
    () => ({ apiKey, setApiKey, clearApiKey }),
    [apiKey, setApiKey, clearApiKey]
  );

  return (
    <ApiKeyContext.Provider value={value}>{children}</ApiKeyContext.Provider>
  );
}

export function useApiKey() {
  const ctx = React.useContext(ApiKeyContext);
  if (!ctx) {
    throw new Error("useApiKey must be used within ApiKeyProvider");
  }
  return ctx;
}

