import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const CheckoutReturn = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState("⏳ Checking payment status...");

  useEffect(() => {
    if (!sessionId) return;

    fetch(
      `http://localhost:8000/api/v1/payments/session-status?session_id=${sessionId}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.paymentStatus === "paid") {
          setStatus("✅ Payment successful! Thank you for your order.");
        } else if (data.paymentStatus === "unpaid" || data.paymentStatus === "open") {
          setStatus("⚠️ Payment still pending or incomplete.");
        } else {
          setStatus("❌ Payment failed or canceled.");
        }
      })
      .catch(() => setStatus("⚠️ Error verifying payment."));
  }, [sessionId]);

  return (
    <div
      style={{
        padding: "40px",
        textAlign: "center",
        background: "#f9fafb",
        minHeight: "100vh",
      }}
    >
      <h2
        style={{
          color:
            status.includes("✅") ? "green" :
            status.includes("❌") ? "red" :
            "#555",
        }}
      >
        {status}
      </h2>
    </div>
  );
};

export default CheckoutReturn;
