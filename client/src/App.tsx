// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/mainLayout";
import "./App.css";
import Home from "./pages/home";
import ProductDetail from "./pages/products/productDetail";
import Products from "./pages/products/index";
import Cart from "./pages/cart";
import Login from "./pages/login";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Nested routes under MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/products/:category" element={<Products />} />
          <Route path="/login" element={<Login/>} />

                  </Route>
      </Routes>
    </BrowserRouter>
  );
}
