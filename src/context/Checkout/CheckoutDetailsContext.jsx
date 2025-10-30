// src/context/CheckoutContext.jsx
import React, { createContext, useContext, useState } from "react";

const CheckoutContext = createContext();

export function CheckoutProvider({ children }) {
  const [checkoutDetails, setCheckoutDetails] = useState(null);

  return (
    <CheckoutContext.Provider value={{ checkoutDetails, setCheckoutDetails }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export const useCheckout = () => useContext(CheckoutContext);
