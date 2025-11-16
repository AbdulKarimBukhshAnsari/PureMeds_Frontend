import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

const CART_STORAGE_KEY = "puremeds_cart_items";

export const CartProvider = ({ children }) => {
  // Load from localStorage on mount
  const [cartItems, setCartItemsState] = useState(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      console.log("Loaded cart from storage:", stored);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error loading cart from storage:", error);
      return [];
    }
  });

  // Save to localStorage whenever cartItems changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error saving cart to storage:", error);
    }
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItemsState((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (id) => {
    setCartItemsState((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      return updated;
    });
  };

  const updateQuantity = (id, quantity) => {
    setCartItemsState((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

   const getCartItems = (cartItems) => { // a method for seperating only the name, quantity and price from the cart - used in payment gateway
    return cartItems.map((item) => ({
      name: item.productName,
      price: item.price,
      quantity: item.quantity,
    }));
  };

  const clearCart = () => {
    setCartItemsState([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Easy hook for use
export const useCart = () => useContext(CartContext);
