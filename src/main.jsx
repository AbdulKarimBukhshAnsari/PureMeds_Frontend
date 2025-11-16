import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// font imports
import "@fontsource/poppins/100.css";
import "@fontsource/poppins/200.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/Cart/CartContext.jsx";
import { CheckoutProvider } from "./context/Checkout/CheckoutDetailsContext.jsx";
import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <CheckoutProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </CheckoutProvider>
      </ClerkProvider>
    </BrowserRouter>
  </StrictMode>
);
