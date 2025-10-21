import React, { useState } from 'react'
import StripeCheckout from './StripeCheckout';
import { useCart } from '../../../context/Cart/CartContext';
import Button from '../../../components/ui/Buttons/Button';
import { div } from 'framer-motion/client';

function PaymentSection() {
    const {cartItems} = useCart()
    const [showStripe, setShowStripe] = useState(false);
  return (
    <div>
      <div>
      {!showStripe ? (
        <Button 
        onClick={() => setShowStripe(true)}
        variant='secondary'>
            Pay with card
        </Button>
      ) : (
        <StripeCheckout cartItems={cartItems} />
      )}
    </div>
    </div>
  )
}

export default PaymentSection
