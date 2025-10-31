import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../../views/HomePage/Home";
import Categories from "../../views/CategoryPage/Categories";
import Layout from "../../Layout";
import ProductDetail from "../../views/ProductPage/ProductDetails";
import VerifyMedicine from "../../views/VerifyMedicinePage/VerifyMedicine";
import Complaints from "../../views/ComplaintPage/Complaints";
import Cart from "../../views/CartPage/Cart";
import Checkout from "../../views/CheckoutPage/Checkout";
import CheckoutReturn from "../../views/CheckoutPage/ui/CheckoutReturn";
import CustomerDashboard from "../../views/CustomerDashboard/CustomerDashboard";
import Orders from "../../views/CustomerDashboard/ui/Orders";
import UserComplaints from "../../views/CustomerDashboard/ui/UserComplaints";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="categories" element={<Categories />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="verify" element={<VerifyMedicine />} />
        <Route path="complaint" element={<Complaints />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="checkout/return" element={<CheckoutReturn />} />
        <Route path="/dashboard" element={<CustomerDashboard />}>
          <Route index element={<Navigate to="orders" replace />} />
          <Route path="orders" element={<Orders />} />
          <Route path="user-complaints" element={<UserComplaints />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRouter;
