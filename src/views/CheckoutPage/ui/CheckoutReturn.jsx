import { CheckCircle, XCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Button from "../../../components/ui/Buttons/Button";
import Loading from "../../../components/ui/Loader/Loading";

const CheckoutReturn = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState("loading");
  const orderId = '23D5G1'

  useEffect(() => {
    if (!sessionId) return;

    fetch(
      `http://localhost:8000/api/v1/payments/session-status?session_id=${sessionId}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.paymentStatus === "paid") {
          setStatus("paid");
        } else if (data.paymentStatus === "unpaid" || data.paymentStatus === "open") {
          setStatus("unpaid");
        } else {
          setStatus("failed");
        }
      })
      .catch(() => setStatus("error"));
  }, [sessionId]);

  if (status === "loading") {
    return (
      <div className="bg-background min-h-screen flex flex-col justify-center items-center text-center">
        <Loading/>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8 text-center">
          {/* Icon Section */}
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${
              status == "paid" ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {status == "paid" ? (
              <CheckCircle className="h-8 w-8 text-green-500" />
            ) : (
              <XCircle className="h-8 w-8 text-red-500" />
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {status == "paid" ? "Order Placed Successfully!" : "Order Could Not Be Placed"}
          </h1>

          {/* Description */}
          <p className="text-gray-600 mb-6">
            {status == "paid"
              ? "Thank you for your order. We've received your request and will process it shortly."
              : "We encountered an issue while processing your order. Please check your payment details or try again in a few moments."}
          </p>

          {/* Order Info */}
          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <p className="text-sm text-gray-600 mb-1">
              {status == "paid" ? "Order ID:" : "Reference ID (if available):"}
            </p>
            <p
              className={`text-lg font-semibold ${
                status == "paid" ? "text-primary" : "text-[#b91c1c]"
              }`}
            >
              {orderId || "Unavailable"}
            </p>
          </div>

          {/* Additional Message */}
          <p className="text-gray-600 mb-8">
            {status == "paid"
              ? "A confirmation email has been sent to your email address."
              : "If the payment has been deducted, don’t worry — our team will verify and update your order status shortly."}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {status == "paid" ? (
              <>
                <Link to="/dashboard/orders">
                  <Button variant="primary">View Order Status</Button>
                </Link>
                <Link to="/">
                  <Button variant="outline">Continue Shopping</Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/support">
                  <Button variant="primary">Contact Support</Button>
                </Link>
                <Link to="/checkout">
                  <Button variant="outline">Try Again</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutReturn;
