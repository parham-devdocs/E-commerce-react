// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import useAuthStore from "./store/auth";
export default function App() {
  const userRole=useAuthStore(state=>state.userInfo?.role)
  return (
    <BrowserRouter>
      <Routes>
        {/* Nested routes under MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          const allowedRoles = new Set(["user", "admin"]);

<Route
  path="/cart"
  element={userRole && userRole=== "user" ? <Cart /> : <Navigate to="/" replace />}
/>          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/products/:category" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/users"  element={userRole && userRole=== "admin" ? <UserList /> : <Navigate to="/login" replace />}/>
          <Route path="/admin/products"  element={userRole && userRole=== "admin" ? <ProductList/> : <Navigate to="/login" replace />}/>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
