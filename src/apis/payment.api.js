import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Create checkout session for Stripe payment
 * @param {Array} cartItems - Cart items
 * @param {string} token - Authentication token
 * @returns {Promise} - Promise with checkout session data
 */
export const createCheckoutSession = async (cartItems, token = null) => {
  try {
    const URL = `${API_URL}/payments/create-checkout-session`;
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const response = await axios.post(
      URL,
      { cartItems },
      {
        headers: { "Content-Type": "application/json", ...headers },
        timeout: 10000,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  }
};

/**
 * Get session status from Stripe
 * @param {string} sessionId - Stripe session ID
 * @param {string} token - Authentication token
 * @returns {Promise} - Promise with session status
 */
export const getSessionStatus = async (sessionId, token = null) => {
  try {
    const URL = `${API_URL}/payments/session-status`;
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const response = await axios.get(URL, {
      params: { session_id: sessionId },
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error getting session status:", error);
    throw error;
  }
};

/**
 * Create payment record
 * @param {Object} paymentData - Payment data
 * @param {string} paymentData.orderId - Order ID
 * @param {string} paymentData.paymentMethod - Payment method (card/cod)
 * @param {number} paymentData.amount - Payment amount
 * @param {string} paymentData.stripeSessionId - Stripe session ID (optional)
 * @param {string} paymentData.stripePaymentIntentId - Stripe payment intent ID (optional)
 * @param {string} paymentData.transactionId - Transaction ID (optional)
 * @param {string} token - Authentication token
 * @returns {Promise} - Promise with payment data
 */
export const createPayment = async (paymentData, token) => {
  try {
    if (!token) {
      throw new Error("Authentication token is required");
    }
    const URL = `${API_URL}/payments`;
    const response = await axios.post(URL, paymentData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating payment:", error);
    throw error;
  }
};

/**
 * Get payment by order ID
 * @param {string} orderId - Order ID
 * @param {string} token - Authentication token
 * @returns {Promise} - Promise with payment data
 */
export const getPaymentByOrderId = async (orderId, token) => {
  try {
    if (!token) {
      throw new Error("Authentication token is required");
    }
    const URL = `${API_URL}/payments/order/${orderId}`;
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching payment:", error);
    throw error;
  }
};

/**
 * Get all payments by user ID
 * @param {string} token - Authentication token
 * @returns {Promise} - Promise with payments data
 */
export const getPaymentsByUserId = async (token) => {
  try {
    if (!token) {
      throw new Error("Authentication token is required");
    }
    const URL = `${API_URL}/payments`;
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching payments:", error);
    throw error;
  }
};

