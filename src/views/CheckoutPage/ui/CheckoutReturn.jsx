import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function CheckoutReturn() {
  const location = useLocation();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const redirectStatus = query.get("redirect_status");
    const paymentIntent = query.get("payment_intent");

    if (redirectStatus === "succeeded") {
      setStatus("success");
      // ✅ You could save paymentIntent in your database here
    } else if (redirectStatus === "failed" || redirectStatus === "canceled") {
      setStatus("failed");
    } else {
      setStatus("unknown");
    }
  }, [location.search]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-gray-600 text-lg">Processing your payment...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      {status === "success" && (
        <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md w-full">
          <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Payment Successful 🎉
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase! Your order is being processed.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              to="/"
              className="bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary/90 transition"
            >
              Back to Home
            </Link>
            <Link
              to="/orders"
              className="border border-primary text-primary py-2 rounded-lg font-medium hover:bg-primary/10 transition"
            >
              View My Orders
            </Link>
          </div>
        </div>
      )}

      {status === "failed" && (
        <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md w-full">
          <XCircle className="text-red-500 w-16 h-16 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Payment Failed ❌
          </h1>
          <p className="text-gray-600 mb-6">
            Something went wrong during the payment. Please try again.
          </p>
          <Link
            to="/checkout"
            className="bg-primary text-white py-2 px-6 rounded-lg font-medium hover:bg-primary/90 transition flex items-center justify-center mx-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Go Back to Checkout
          </Link>
        </div>
      )}

      {status === "unknown" && (
        <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Payment Status Unknown 🤔
          </h1>
          <p className="text-gray-600 mb-6">
            We couldn’t verify your payment status. Please check your email or
            contact support.
          </p>
          <Link
            to="/"
            className="bg-primary text-white py-2 px-6 rounded-lg font-medium hover:bg-primary/90 transition"
          >
            Back to Home
          </Link>
        </div>
      )}
    </div>
  );
}

export default CheckoutReturn;
