import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Fetch featured products (limited to 3)
 * @param {string} token - Authentication token
 * @returns {Promise} - Promise with featured products data
 */
export const fetchFeaturedProducts = async (token = null) => {
  try {
    console.log("API URL", API_URL);
    const URL = `${API_URL}/customer/featured-products`;
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const response = await axios.get(URL, { headers });
    console.log("Featured Products Response:", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching featured products:", error);
    throw error;
  }
};

/**
 * Fetch all products with pagination, category filter, and search
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number (default: 1)
 * @param {number} params.limit - Number of items per page (default: 15)
 * @param {string} params.category - Category filter (optional)
 * @param {string} params.search - Search query (optional)
 * @param {string} token - Authentication token
 * @returns {Promise} - Promise with products data
 */
export const fetchProducts = async ({ page = 1, limit = 15, category = "", search = "" }, token = null) => {
  try {
    const URL = `${API_URL}/customer/products`;
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const response = await axios.get(URL, {
      params: {
        page,
        limit,
        category,
        search,
      },
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

/**
 * Fetch products by category with pagination
 * @param {string} category - Category name
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Number of items per page (default: 15)
 * @param {string} token - Authentication token
 * @returns {Promise} - Promise with products data
 */
export const fetchProductsByCategory = async (category, page = 1, limit = 15, token = null) => {
  try {
    const URL = `${API_URL}/customer/products/category/${category}`;
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const response = await axios.get(URL, {
      params: {
        page,
        limit,
      },
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }
};

/**
 * Search products by name with pagination
 * @param {string} searchQuery - Search query string
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Number of items per page (default: 15)
 * @param {string} token - Authentication token
 * @returns {Promise} - Promise with products data
 */
export const searchProducts = async (searchQuery, page = 1, limit = 15, token = null) => {
  try {
    const URL = `${API_URL}/customer/products/search`;
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const response = await axios.get(URL, {
      params: {
        q: searchQuery,
        page,
        limit,
      },
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error searching products:", error);
    throw error;
  }
};

/**
 * Fetch product by ID
 * @param {string} productId - Product ID
 * @param {string} token - Authentication token
 * @returns {Promise} - Promise with product data
 */
export const fetchProductById = async (productId, token = null) => {
  try {
    const URL = `${API_URL}/customer/products/${productId}`;
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const response = await axios.get(URL, { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
};