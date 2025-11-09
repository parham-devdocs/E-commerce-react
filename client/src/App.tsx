// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/mainLayout";
import "./App.css";
import Home from "./pages/home";
import ProductDetail from "./pages/products/productDetail";
import Products from "./pages/products/index";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Nested routes under MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<ProductDetail />} />
          <Route path="/products/:category" element={<Products />} />
                  </Route>
      </Routes>
    </BrowserRouter>
  );
}
