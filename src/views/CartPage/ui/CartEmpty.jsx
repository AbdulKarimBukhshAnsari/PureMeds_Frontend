import {  ShoppingBag } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

function CartEmpty() {
  return (
    <div>
       <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="flex justify-center mb-4">
            <ShoppingBag size={64} className="text-gray-300" />
          </div>
          <h2 className="text-2xl font-semibold text-support mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any medicines to your cart yet.
          </p>
          <Link
            to="/categories"
            className="inline-block bg-primary text-white px-8 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
    </div>
  )
}

export default CartEmpty
