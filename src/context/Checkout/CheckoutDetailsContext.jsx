// src/context/CheckoutContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const CheckoutContext = createContext();

const STORAGE_KEY = "puremeds_checkout_details";

export function CheckoutProvider({ children }) {
  // Load from sessionStorage on mount
  const [checkoutDetails, setCheckoutDetailsState] = useState(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error("Error loading checkout details from storage:", error);
      return null;
    }
  });

  // Save to sessionStorage whenever checkoutDetails changes
  useEffect(() => {
    if (checkoutDetails) {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(checkoutDetails));
      } catch (error) {
        console.error("Error saving checkout details to storage:", error);
      }
    } else {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }, [checkoutDetails]);

  const setCheckoutDetails = (details) => {
    setCheckoutDetailsState(details);
  };

  return (
    <CheckoutContext.Provider value={{ checkoutDetails, setCheckoutDetails }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export const useCheckout = () => useContext(CheckoutContext);
