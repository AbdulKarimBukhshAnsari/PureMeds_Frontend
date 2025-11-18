import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import StripeCheckout from "./StripeCheckout";
import { useCart } from "../../../context/Cart/CartContext";
import { useCheckout } from "../../../context/Checkout/CheckoutDetailsContext";
import { createCheckoutSession } from "../../../apis/payment.api";
import { createOrder } from "../../../apis/order.api";
import { createPayment } from "../../../apis/payment.api";
import { useToast } from "../../../hooks/Toast/useToast";
import ToastNotification from "../../../components/ui/Alert/ToastNotification";
import { FadeInLeft } from "../../../components/ui/Animation/ScrollAnimation";
import { Banknote, Coins, CreditCard } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

/* Things to do 
1. donot allow empty cart to proceed to checkout 
2. restyle the payment gateway interface 
3. remove pay with link 
4. show checkout details in order confirmation page 
 */
const PaymentSection = () => {
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [clientSecret, setClientSecret] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const { cartItems, getCartItems, clearCart } = useCart();
  const { checkoutDetails } = useCheckout();
  const [toast, showSuccess, showError, hideToast] = useToast();

  // to convert whole product into acceptable format by the payment gateway
  const simpleItems = getCartItems(cartItems);
  console.log("Cart items for payment:", simpleItems);
  console.log("Checkout details:", checkoutDetails);

  // Calculate totals
  const subtotal = cartItems.reduce(
    (t, i) => t + i.price * (i.quantity || 1),
    0
  );
  const shipping = 200;
  const total = subtotal + shipping;

  // Create order and payment
  const handleOrderCreation = async (
    paymentMethodType,
    stripeSessionId = null,
    stripePaymentIntentId = null
  ) => {
    if (!checkoutDetails?.customerInfo) {
      showError("❌ Checkout details are missing. Please fill the form again.");
      return;
    }

    if (!cartItems || cartItems.length === 0) {
      showError("❌ Your cart is empty.");
      return;
    }

    setIsProcessingOrder(true);
    try {
      const token = await getToken({ template: "puremeds" });
      if (!token) {
        throw new Error("Authentication required");
      }

      // Prepare products for order
      const orderProducts = cartItems.map((item) => ({
        productId: item.id || item._id,
        quantity: item.quantity || 1,
        price: item.price,
      }));

      // Create order
      const orderData = {
        customerInfo: checkoutDetails.customerInfo,
        products: orderProducts,
        subtotal,
        shipping,
        totalAmount: total,
        paymentMethod: paymentMethodType,
      };

      console.log("Creating order with data:", orderData);
      const orderResponse = await createOrder(orderData, token);
      const order = orderResponse?.data || orderResponse;

      if (!order || !order._id) {
        throw new Error("Failed to create order");
      }

      console.log("Order created:", order);

      // Create payment record
      const paymentData = {
        orderId: order._id,
        paymentMethod: paymentMethodType,
        amount: total,
        stripeSessionId: paymentMethodType === "card" ? stripeSessionId : null,
        stripePaymentIntentId:
          paymentMethodType === "card" ? stripePaymentIntentId : null,
        transactionId:
          paymentMethodType === "card"
            ? stripeSessionId
            : `COD-${order.orderId}`,
      };

      console.log("Creating payment with data:", paymentData);
      await createPayment(paymentData, token);

      // Clear cart
      clearCart();

      // Navigate to success page
      navigate(`/checkout/return?order_id=${order.orderId}&status=success`);
    } catch (error) {
      console.error("Error creating order:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to create order";
      showError(`Order Error: ${errorMessage}`);
    } finally {
      setIsProcessingOrder(false);
    }
  };

  const handleCOD = async () => {
    await handleOrderCreation("cod");
  };

  const handleCardPayment = async () => {
    if (!API_URL) {
      showError(
        "❌ API URL is not configured. Please check your environment variables."
      );
      return;
    }

    if (!simpleItems || simpleItems.length === 0) {
      showError("❌ Your cart is empty. Please add items to your cart first.");
      return;
    }

    // Validate checkout details before proceeding
    if (!checkoutDetails?.customerInfo) {
      showError("❌ Checkout details are missing. Please fill the form first.");
      return;
    }

    // Explicitly save to sessionStorage BEFORE creating checkout session
    // This ensures data is available after Stripe redirect
    try {
      console.log("Saving checkout details and cart to sessionStorage...");
      sessionStorage.setItem(
        "puremeds_checkout_details",
        JSON.stringify(checkoutDetails)
      );
      sessionStorage.setItem("puremeds_cart_items", JSON.stringify(cartItems));
      console.log("Data saved to sessionStorage:", {
        checkoutDetails,
        cartItemsCount: cartItems.length,
      });
    } catch (storageError) {
      console.error("Error saving to sessionStorage:", storageError);
      showError("❌ Failed to save checkout data. Please try again.");
      return;
    }

    setIsLoading(true);
    try {
      console.log(
        "Creating checkout session with API URL:",
        `${API_URL}/payments/create-checkout-session`
      );
      console.log("Sending cart items:", simpleItems);

      const response = await createCheckoutSession(simpleItems);

      console.log("Checkout session response:", response);

      // Handle ApiResponse format: response.data.clientSecret
      // or direct format: response.clientSecret
      const clientSecret =
        response?.data?.clientSecret || response?.clientSecret;

      if (clientSecret) {
        setClientSecret(clientSecret);
        setPaymentMethod("card");
      } else {
        throw new Error("No client secret received from server");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);

      let errorMessage = "Failed to start payment.";

      if (error.code === "ERR_NETWORK") {
        errorMessage =
          "Network Error: Cannot connect to the server. Please ensure the backend is running.";
      } else if (error.response) {
        const responseData = error.response.data;
        errorMessage =
          responseData?.message ||
          responseData?.data?.message ||
          `Server error: ${error.response.status}`;
      } else if (error.request) {
        errorMessage =
          "No response from server. Please check if the backend server is running.";
      } else {
        errorMessage = error.message || "An unexpected error occurred.";
      }

      showError(`Payment Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Note: For Stripe card payments, order creation happens in CheckoutReturn
  // after Stripe redirects back with session_id

  return (
    <div className="container justify-center mx-auto px-4 py-10">
      {/* Buttons only visible when no payment method is chosen */}
      {!paymentMethod && (
        <div className="max-w-3xl mx-auto">
          <FadeInLeft>
            <h1 className="text-5xl font-bold text-orange-400 mb-10 p-4 text-center">
              Select a Payment Option
            </h1>
          </FadeInLeft>

          {/* Grid container for the two cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pay with Card */}
            <div
              className="bg-white p-8 rounded-lg shadow-sm border-2 border-transparent hover:border-primary transition-all cursor-pointer flex flex-col items-center text-center"
              onClick={handleCardPayment}
              disabled={isLoading}
            >
              <div className="bg-orange-500/20 bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Banknote className="text-orange-400" />
              </div>

              <span className="text-xl font-semibold text-primary">
                {isLoading ? "Processing..." : "Pay with Card"}
              </span>
              
            </div>

            {/* Cash on Delivery */}
            <div
              className="bg-white p-8 rounded-lg shadow-sm border-2 border-transparent hover:border-primary transition-all cursor-pointer flex flex-col items-center text-center"
              onClick={handleCOD}
              disabled={isProcessingOrder}
            >
              <div className="bg-orange-500/20 bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <CreditCard className="text-orange-400" />
              </div>

              <span className="text-xl font-semibold text-primary">
                {isProcessingOrder ? "Processing Order..." : "Cash on Delivery"}
              </span>
              
            </div>
          </div>
        </div>
      )}

      {/* ✅ Show embedded checkout only after user selects Card */}
      {paymentMethod === "card" && clientSecret && (
        <div className=" mx-auto w-full sm:w-[600px] md:w-[750px] lg:w-[900px] bg-none">
          <StripeCheckout clientSecret={clientSecret} />
        </div>
      )}

      <ToastNotification
        isVisible={toast.isVisible}
        type={toast.type}
        message={toast.message}
        duration={toast.duration}
        onClose={hideToast}
      />
    </div>
  );
};

export default PaymentSection;
