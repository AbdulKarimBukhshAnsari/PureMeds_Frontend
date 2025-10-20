import React from 'react'

function OrderSummary({ subtotal, shipping, total, children }) {
  return (
    <div>
      <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Order Summary
      </h2>
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-700">Rs. {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="text-gray-700">Rs. {shipping.toFixed(2)}</span>
        </div>
        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex justify-between">
            <span className="text-gray-700 font-semibold">Total</span>
            <span className="text-primary font-bold">
              Rs. {total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      {children}
    </div>
    </div>
  )
}

export default OrderSummary
