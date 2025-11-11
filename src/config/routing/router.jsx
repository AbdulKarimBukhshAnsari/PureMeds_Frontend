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
import Login from "../../views/AuthPage/Login";
import CreateAccount from "../../views/AuthPage/CreateAccount";
import Profile from "../../views/AuthPage/Profile";
import Loading from "../../components/ui/Loader/Loading";
import  PrivateRouter  from "../../config/routing/privateRouter";
import { useAuth } from "@clerk/clerk-react";

function AppRouter() {
  const { isLoaded } = useAuth();
  if (!isLoaded) return <Loading />;

  return (
    <Routes>
      {/* Auth pages (no layout) */}
      <Route path="/sign-in" element={<Login />} />
      <Route path="/sign-up" element={<CreateAccount />} />

      {/* Main layout */}
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route index element={<Home />} />
        <Route path="categories" element={<Categories />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="verify" element={<VerifyMedicine />} />

        {/*  Protected routes */}
        <Route
          path="complaint"
          element={
            <PrivateRouter>
              <Complaints />
            </PrivateRouter>
          }
        />
        <Route
          path="cart"
          element={
            <PrivateRouter>
              <Cart />
            </PrivateRouter>
          }
        />
        <Route
          path="checkout"
          element={
            <PrivateRouter>
              <Checkout />
            </PrivateRouter>
          }
        />
        <Route
          path="checkout/return"
          element={
            <PrivateRouter>
              <CheckoutReturn />
            </PrivateRouter>
          }
        />

        {/* Protected dashboard */}
        <Route
          path="dashboard"
          element={
            <PrivateRouter>
              <CustomerDashboard />
            </PrivateRouter>
          }
        >
          <Route index element={<Navigate to="orders" replace />} />
          <Route path="orders" element={<Orders />} />
          <Route path="user-complaints" element={<UserComplaints />} />
          <Route path="user-profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRouter;
