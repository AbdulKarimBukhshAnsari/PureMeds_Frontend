import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Create order
 * @param {Object} orderData - Order data
 * @param {Object} orderData.customerInfo - Customer information
 * @param {Array} orderData.products - Products array with productId, quantity, price
 * @param {number} orderData.subtotal - Subtotal amount
 * @param {number} orderData.shipping - Shipping cost
 * @param {number} orderData.totalAmount - Total amount
 * @param {string} orderData.paymentMethod - Payment method (card/cod)
 * @param {string} token - Authentication token
 * @returns {Promise} - Promise with order data
 */
export const createOrder = async (orderData, token) => {
  try {
    if (!token) {
      throw new Error("Authentication token is required");
    }
    const URL = `${API_URL}/customer/orders`;
    const response = await axios.post(URL, orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

/**
 * Get orders by user ID
 * @param {string} token - Authentication token
 * @returns {Promise} - Promise with orders data
 */
export const getOrdersByUserId = async (token) => {
  try {
    if (!token) {
      throw new Error("Authentication token is required");
    }
    const URL = `${API_URL}/customer/orders`;
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

/**
 * Get order by ID
 * @param {string} orderId - Order ID
 * @param {string} token - Authentication token
 * @returns {Promise} - Promise with order data
 */
export const getOrderById = async (orderId, token) => {
  try {
    if (!token) {
      throw new Error("Authentication token is required");
    }
    const URL = `${API_URL}/customer/orders/${orderId}`;
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
};

/**
 * Delete order
 * @param {string} orderId - Order ID
 * @param {string} token - Authentication token
 * @returns {Promise} - Promise with deletion result
 */
export const deleteOrder = async (orderId, token) => {
  try {
    if (!token) {
      throw new Error("Authentication token is required");
    }
    const URL = `${API_URL}/customer/orders/${orderId}`;
    const response = await axios.delete(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
};

