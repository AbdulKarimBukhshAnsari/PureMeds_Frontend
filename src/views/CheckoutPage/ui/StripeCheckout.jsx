import React, { useCallback } from 'react'
import {  loadStripe} from "@stripe/stripe-js";
import {EmbeddedCheckoutProvider, EmbeddedCheckout  } from "@stripe/react-stripe-js";

const apiKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
const stripePromise = loadStripe(apiKey);
function StripeCheckout({ cartItems }) {

    const fetchClientSecret = useCallback(async () => {
    const response = await fetch("http://localhost:4242/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cartItems }),
    });
    const data = await response.json();
    return data.clientSecret;
  }, [cartItems]);

  const options = { fetchClientSecret };
  return (
    <div>
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
    </div>
  )
}

export default StripeCheckout
