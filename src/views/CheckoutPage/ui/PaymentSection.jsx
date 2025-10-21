import React, { useState } from "react";
import StripeCheckout from "./StripeCheckout";
import { useCart } from "../../../context/Cart/CartContext";
import Button from "../../../components/ui/Buttons/Button";
import { div } from "framer-motion/client";

function PaymentSection() {
  const { cartItems } = useCart();
  return (
    <div>
      <StripeCheckout cartItems={cartItems} />
    </div>
  );
}

export default PaymentSection;
