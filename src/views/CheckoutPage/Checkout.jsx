import React, { useState } from 'react'
import { useCart } from '../../context/Cart/CartContext';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CheckoutForm from './ui/CheckoutForm';
import OrderSummary from '../../components/ui/OrderSummary/OrderSummary';

// things to do
// use previously built components of input field and select field
// make form seperately in ui for the fields
// make seperate checkout page 
// mke seperate strip component
// id: magic pattern and .24 - see history 
function Checkout() {
  const { cartItems } = useCart();
  const [submitted, setSubmitted] = useState(false);
const subtotal = cartItems.reduce(
    (t, i) => t + i.price * (i.quantity || 1),
    0
  );
  const shipping = 200;
  const total = subtotal + shipping;
 
  return (
    <div className='bg-background'>
       <div className=" container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Link
          to="/cart"
          className="text-primary hover:text-primary/80 flex items-center"
        >
          <ArrowLeft size={20} className="mr-2" /> Back to Cart
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT SIDE - Form + Payment */}
        <div className="lg:w-2/3 space-y-8">
          <CheckoutForm cartItems={cartItems} onSubmitSuccess={() => setSubmitted(true)} />
          
        </div>

        {/* RIGHT SIDE - Order Summary */}
        <div className="lg:w-1/3">
          <OrderSummary items={cartItems} showItems total={total} subtotal={subtotal} shipping={shipping} />
        </div>
      </div>
    </div>
    </div>
  )
}

export default Checkout
