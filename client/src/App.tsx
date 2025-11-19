// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/mainLayout";
import "./App.css";
import Home from "./pages/users/home";
import ProductDetail from "./pages/users/products/productDetail";
import Products from "./pages/users/products/index";
import Cart from "./pages/users/cart";
import Login from "./pages/users/login";
import Register from "./pages/users/register";
import UserList from "./pages/admin/users";
import ProductList from "./pages/admin/products";
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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/users" element={<UserList />} />
          <Route path="/admin/products" element={<ProductList />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
