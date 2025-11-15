import { useState, useEffect, useCallback } from "react";
import {
  fetchFeaturedProducts,
  fetchProducts,
} from "../apis/medicines.api";

/**
 * Custom hook for fetching products with various filters
 * @param {Object} options - Hook options
 * @param {boolean} options.featured - Fetch featured products (3 items)
 * @param {string} options.category - Filter by category
 * @param {string} options.search - Search query
 * @param {number} options.page - Page number (default: 1)
 * @param {number} options.limit - Items per page (default: 15 for regular, 3 for featured)
 * @param {string} options.token - Authentication token
 * @param {boolean} options.autoFetch - Auto fetch on mount (default: true)
 * @returns {Object} - { products, loading, error, totalPages, totalProducts, refetch }
 */
export const useFetchProduct = ({
  featured = false,
  category = "",
  search = "",
  page = 1,
  limit = 15,
  token = null,
  autoFetch = true,
} = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let response;

      // Featured products (limit to 3)
      if (featured) {
        response = await fetchFeaturedProducts(token);
      }
      // Use the main products endpoint which supports both category and search filters together
      else {
        // The fetchProducts API supports both category and search filters simultaneously
        response = await fetchProducts({ page, limit, category, search }, token);
      }

      // Handle response data structure
      if (response?.data) {
        if (featured) {
          // Featured products response
          setProducts(response.data || []);
          setTotalProducts(response.data?.length || 0);
          setTotalPages(1);
        } else {
          // Regular products response with pagination
          setProducts(response.data.products || []);
          setTotalProducts(response.data.totalProducts || 0);
          setTotalPages(
            Math.ceil((response.data.totalProducts || 0) / limit)
          );
        }
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err?.response?.data?.message || "Failed to fetch products");
      setProducts([]);
      setTotalProducts(0);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  }, [featured, category, search, page, limit, token]);

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [autoFetch, fetchData]);

  return {
    products,
    loading,
    error,
    totalPages,
    totalProducts,
    refetch: fetchData,
  };
};
