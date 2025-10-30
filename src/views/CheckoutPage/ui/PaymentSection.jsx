import React, { useState } from "react";
import axios from "axios";
import StripeCheckout from "./StripeCheckout";
import { useCart } from "../../../context/Cart/CartContext";

/* Things to do 
1. donot allow empty cart to proceed to checkout 
2. restyle the payment gateway interface 
3. remove pay with link 
4. show checkout details in order confirmation page 
 */
const PaymentSection = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [clientSecret, setClientSecret] = useState(null);
  const { cartItems, getCartItems } = useCart();

  // to convert whole product into acceptable format by the payment gateway
  const simpleItems = getCartItems(cartItems);
  console.log(simpleItems);

  const handleCOD = () => {
    alert("✅ Order placed with Cash on Delivery!");
  };

  const handleCardPayment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/payments/create-checkout-session",
        { cartItems: simpleItems },
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
    <div className="flex justify-center py-20">
      {/* Buttons only visible when no payment method is chosen */}
      {!paymentMethod && (
        <>
          <div className="flex justify-center ">
            <div className="bg-white rounded-2xl shadow-md p-10 w-full sm:w-[600px] md:w-[750px] lg:w-[900px]">
              <h2 className="text-lg font-semibold text-gray-800 mb-6 uppercase tracking-wide text-center">
                Select a Payment Option
              </h2>

              <div className="space-y-3">
                {/* Pay with Card */}
                <button
                  onClick={handleCardPayment}
                  className={`flex justify-between items-center w-full p-5 rounded-xl border transition-all duration-200 ${
                paymentMethod === "card"
                  ? "bg-primary text-white shadow-lg border-primary ring-4 ring-primary/30"
                  : "bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-800"
              }`} 
                >
                  <span className="text-gray-800 font-medium">
                    Pay with Card
                  </span>
                  <span className="text-gray-400 text-xl">›</span>
                </button>

                {/* Cash on Delivery */}
                <button
                  onClick={handleCOD}
                  className={`flex justify-between items-center w-full p-5 rounded-xl border transition-all duration-200 ${
                paymentMethod === "card"
                  ? "bg-primary text-white shadow-lg border-primary ring-4 ring-primary/30"
                  : "bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-800"
              }`} 
                >
                  <span className="text-gray-800 font-medium">
                    Cash on Delivery
                  </span>
                  <span className="text-gray-400 text-xl">›</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ✅ Show embedded checkout only after user selects Card */}
      {paymentMethod === "card" && clientSecret && (
        <div className=" sm:w-[600px] md:w-[750px] lg:w-[900px]">
          <StripeCheckout clientSecret={clientSecret} />
        </div>
      )}
    </div>
  );
};

export default PaymentSection;
