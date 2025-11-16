import { CheckCircle, XCircle } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import Button from "../../../components/ui/Buttons/Button";
import Loading from "../../../components/ui/Loader/Loading";
import { getSessionStatus } from "../../../apis/payment.api";
import { useCart } from "../../../context/Cart/CartContext";
import { useCheckout } from "../../../context/Checkout/CheckoutDetailsContext";
import { createOrder } from "../../../apis/order.api";
import { createPayment } from "../../../apis/payment.api";
import ToastNotification from "../../../components/ui/Alert/ToastNotification";
import { useToast } from "../../../hooks/Toast/useToast";

const API_URL = import.meta.env.VITE_API_URL;

const CheckoutReturn = () => {
  const { getToken } = useAuth();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const orderIdParam = searchParams.get("order_id");
  const statusParam = searchParams.get("status");
  const [status, setStatus] = useState("loading");
  const [orderId, setOrderId] = useState(orderIdParam || null);
  const hasProcessedRef = useRef(false); // Use ref to prevent duplicate processing
  const { cartItems, clearCart } = useCart();
  const { checkoutDetails } = useCheckout();
     const [toast, showSuccess, showError, hideToast] = useToast();

  useEffect(() => {
    // Prevent duplicate processing
    if (hasProcessedRef.current) {
      console.log("Already processed, skipping...");
      return;
    }

    // If order already created (from COD or direct navigation)
    if (orderIdParam && statusParam === "success") {
      setStatus("paid");
      setOrderId(orderIdParam);
      hasProcessedRef.current = true;
      return;
    }

    // Handle Stripe payment return
    if (!sessionId) {
      console.error("No session_id in URL");
      setStatus("error");
      hasProcessedRef.current = true;
      return;
    }

    const handleStripeReturn = async () => {
      hasProcessedRef.current = true;
      try {
        console.log("=== CHECKOUT RETURN DEBUG ===");
        console.log("Session ID:", sessionId);
        console.log("Checkout Details from context:", checkoutDetails);
        console.log("Cart Items from context:", cartItems);
        console.log("Cart Items length:", cartItems?.length);

        // Always try to load from sessionStorage (it's more reliable after redirect)
        let storedCheckoutDetails = null;
        let storedCartItems = null;

        try {
          const storedCheckout = sessionStorage.getItem("puremeds_checkout_details");
          const storedCart = sessionStorage.getItem("puremeds_cart_items");
          
          if (storedCheckout) {
            storedCheckoutDetails = JSON.parse(storedCheckout);
            console.log("✅ Loaded checkout details from sessionStorage:", storedCheckoutDetails);
          } else {
            console.warn("⚠️ No checkout details found in sessionStorage");
          }
          
          if (storedCart) {
            storedCartItems = JSON.parse(storedCart);
          } 
        } catch (storageError) {
          console.error("❌ Error loading from sessionStorage:", storageError);
        }

        // Use sessionStorage data as primary source, fallback to context
        const finalCheckoutDetails = storedCheckoutDetails || checkoutDetails;
        const finalCartItems = (storedCartItems && storedCartItems.length > 0) ? storedCartItems : cartItems;

        const token = await getToken({ template: "puremeds" });
        if (!token) {
          throw new Error("Failed to get authentication token");
        }

      
        const sessionResponse = await getSessionStatus(sessionId, token);
        const sessionData = sessionResponse?.data || sessionResponse;

        if (sessionData.paymentStatus === "paid") {
          console.log("Payment status is PAID, creating order...");
          
          console.log("Final checkout details:", finalCheckoutDetails);
          console.log("Final cart items:", finalCartItems);
          console.log("Final cart items length:", finalCartItems?.length);

          // Validate data structure
          const hasValidCheckoutDetails = finalCheckoutDetails?.customerInfo && 
            typeof finalCheckoutDetails.customerInfo === 'object' &&
            finalCheckoutDetails.customerInfo.firstName &&
            finalCheckoutDetails.customerInfo.email;
          
          const hasValidCartItems = Array.isArray(finalCartItems) && finalCartItems.length > 0;

          console.log("Data validation:", {
            hasValidCheckoutDetails,
            hasValidCartItems,
            checkoutDetailsStructure: finalCheckoutDetails,
            cartItemsStructure: finalCartItems
          });

          // Check if order already exists for this session (prevent duplicates)
          const existingOrderKey = `order_created_${sessionId}`;
          const orderAlreadyCreated = sessionStorage.getItem(existingOrderKey);
          
          if (orderAlreadyCreated) {
            console.log("Order already created for this session, skipping...");
            const existingOrder = JSON.parse(orderAlreadyCreated);
            setOrderId(existingOrder.orderId);
            setStatus("paid");
            return;
          }

          // Create order and payment
          if (hasValidCheckoutDetails && hasValidCartItems) {
            try {
              const subtotal = finalCartItems.reduce((t, i) => t + i.price * (i.quantity || 1), 0);
              const shipping = 200;
              const total = subtotal + shipping;

              const orderProducts = finalCartItems.map((item) => ({
                productId: item.id || item._id,
                quantity: item.quantity || 1,
                price: item.price,
              }));

              const orderData = {
                customerInfo: finalCheckoutDetails.customerInfo,
                products: orderProducts,
                subtotal,
                shipping,
                totalAmount: total,
                paymentMethod: "card",
              };

              console.log("Creating order with data:", orderData);
              const orderResponse = await createOrder(orderData, token);
              console.log("Order response:", orderResponse);
              
              const order = orderResponse?.data || orderResponse;
              console.log("Parsed order:", order);

              if (order && order._id) {
                console.log("Order created successfully, creating payment...");
                // Create payment
                const paymentData = {
                  orderId: order._id,
                  paymentMethod: "card",
                  amount: total,
                  stripeSessionId: sessionId,
                  transactionId: sessionId,
                };

                console.log("Creating payment with data:", paymentData);
                await createPayment(paymentData, token);
                console.log("Payment created successfully!");
                
                // Mark order as created to prevent duplicates
                sessionStorage.setItem(existingOrderKey, JSON.stringify({ orderId: order.orderId, _id: order._id }));
                
                clearCart();
                sessionStorage.removeItem("puremeds_checkout_details");
                sessionStorage.removeItem("puremeds_cart_items");
                
                setOrderId(order.orderId);
                setStatus("paid");
                console.log("Order ID set:", order.orderId);
              } else {
                console.error("Order creation failed - invalid response:", orderResponse);
                throw new Error("Failed to create order - invalid response");
              }
            } catch (orderError) {
              console.error("Error creating order:", orderError);
              console.error("Order error response:", orderError.response);
              
              // Better error message extraction
              let errorMsg = "Failed to create order";
              if (orderError.response?.data) {
                const errorData = orderError.response.data;
                errorMsg = errorData.message || errorData.data?.message || errorData.error || errorMsg;
              } else if (orderError.message) {
                errorMsg = orderError.message;
              }
              
              console.error("Order error message:", errorMsg);
              setStatus("error");
              showError(`Payment successful but order creation failed.\n\nError: ${errorMsg}\n\nPlease contact support with session ID: ${sessionId}`);
            }
          } else {
            console.error("❌ Missing or invalid data for order creation:", {
              hasValidCheckoutDetails,
              hasValidCartItems,
              checkoutDetails: finalCheckoutDetails,
              cartItems: finalCartItems,
              checkoutDetailsKeys: finalCheckoutDetails ? Object.keys(finalCheckoutDetails) : null,
              customerInfoKeys: finalCheckoutDetails?.customerInfo ? Object.keys(finalCheckoutDetails.customerInfo) : null
            });
            setStatus("error");
            showError(`Payment successful but cannot create order. Missing or invalid data.\n\nCheckout Details: ${hasValidCheckoutDetails ? '✅ Valid' : '❌ Missing/Invalid'}\nCart Items: ${hasValidCartItems ? `✅ Valid (${finalCartItems?.length || 0} items)` : '❌ Missing/Invalid'}\n\nPlease contact support with session ID: ${sessionId}`);
          }
        } else if (sessionData.paymentStatus === "unpaid" || sessionData.paymentStatus === "open") {
          console.log("Payment status is UNPAID or OPEN");
          setStatus("unpaid");
        } else {
          console.log("Payment status is:", sessionData.paymentStatus);
          setStatus("failed");
        }
      } catch (error) {
        console.error("Error in handleStripeReturn:", error);
        console.error("Error details:", error.response);
        
        // Better error message extraction
        let errorMsg = "Unknown error occurred";
        if (error.response?.data) {
          const errorData = error.response.data;
          errorMsg = errorData.message || errorData.data?.message || errorData.error || errorMsg;
        } else if (error.message) {
          errorMsg = error.message;
        }
        
        setStatus("error");
        showError(`Error processing payment return.\n\nError: ${errorMsg}\n\nPlease try again or contact support.`);
      }
    };

    handleStripeReturn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId, orderIdParam, statusParam]); // Intentionally limited deps to prevent duplicate processing

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

export default CheckoutReturn;
