import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Create a complaint
 * @param {FormData} formData - Complaint form data including file
 * @param {string} token - Authentication token
 * @returns {Promise} - Promise with complaint data
 */
export const createComplaint = async (formData, token) => {
  try {
    if (!token) {
      throw new Error("Authentication token is required");
    }
    const URL = `${API_URL}/customer/complaints`;
    const response = await axios.post(URL, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating complaint:", error);
    throw error;
  }
};

/**
 * Get complaints by user ID
 * @param {string} token - Authentication token
 * @returns {Promise} - Promise with complaints data
 */
export const getComplaintsByUserId = async (token) => {
  try {
    if (!token) {
      throw new Error("Authentication token is required");
    }
    const URL = `${API_URL}/customer/complaints`;
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching complaints:", error);
    throw error;
  }
};

/**
 * Get complaint by ID
 * @param {string} id - Complaint ID
 * @param {string} token - Authentication token
 * @returns {Promise} - Promise with complaint data
 */
export const getComplaintById = async (id, token) => {
  try {
    if (!token) {
      throw new Error("Authentication token is required");
    }
    const URL = `${API_URL}/customer/complaints/${id}`;
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching complaint:", error);
    throw error;
  }
};

/**
 * Delete complaint
 * @param {string} id - Complaint ID
 * @param {string} token - Authentication token
 * @returns {Promise} - Promise with deletion result
 */
export const deleteComplaint = async (id, token) => {
  try {
    if (!token) {
      throw new Error("Authentication token is required");
    }
    const URL = `${API_URL}/customer/complaints/${id}`;
    const response = await axios.delete(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting complaint:", error);
    throw error;
  }
};

