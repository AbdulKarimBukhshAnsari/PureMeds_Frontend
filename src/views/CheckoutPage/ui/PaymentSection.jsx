import React, { useState } from "react";
import axios from "axios";
import StripeCheckout from "./StripeCheckout";

const PaymentSection = ({ cartItems }) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [clientSecret, setClientSecret] = useState(null);

  const handleCOD = () => {
    alert("✅ Order placed with Cash on Delivery!");
  };

  const handleCardPayment = async () => {
    try {
      // temporary hardcoded data to test
      const cartItems = [
        { name: "Crochet Bag", price: 1500, quantity: 2 },
        { name: "Handmade Necklace", price: 1200, quantity: 1 },
      ];

      const response = await axios.post(
        "http://localhost:8000/api/v1/payments/create-checkout-session",
        { cartItems },
        { headers: { "Content-Type": "application/json" } }
      );

      // ✅ Update both states
      setClientSecret(response.data.clientSecret);
      setPaymentMethod("card");
    } catch (error) {
      console.error("❌ Error creating checkout session:", error);
      alert("Failed to start payment. Check console for details.");
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Choose Payment Method</h2>

      {/* Buttons only visible when no payment method is chosen */}
      {!paymentMethod && (
        <div style={{ marginTop: "20px" }}>
          <button
            onClick={handleCOD}
            style={{
              background: "#4caf50",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              marginRight: "10px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Cash on Delivery
          </button>

          <button
            onClick={handleCardPayment}
            style={{
              background: "#6772E5",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Pay with Card
          </button>
        </div>
      )}

      {/* ✅ Show embedded checkout only after user selects Card */}
      {paymentMethod === "card" && clientSecret && (
        <div style={{ marginTop: "30px" }}>
          <StripeCheckout clientSecret={clientSecret} />
        </div>
      )}
    </div>
  );
};

export default PaymentSection;
