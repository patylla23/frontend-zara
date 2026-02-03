import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/products" element={<HomePage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
