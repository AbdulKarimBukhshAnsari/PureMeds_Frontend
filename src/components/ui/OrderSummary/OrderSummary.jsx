import React from "react";

function OrderSummary({
  subtotal = 0,
  shipping = 0,
  total = 0,
  children,
  showItems = false,
  items
}) {
  return (
    <div>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-primary-hover mb-4">
          Order Summary
        </h2>
        {/* items shown for checkout */}
        {showItems && (
        <div className="max-h-64 overflow-y-auto mb-6 space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b border-gray-100 pb-2"
            >
              <div className="flex items-center space-x-2">
                <img
                  src={item.productImage}
                  alt={item.productName}
                  className="w-12 h-12 object-contain rounded"
                />
                <div>
                  <p className="text-xs font-medium text-gray-800">{item.productName}</p>
                  <p className="text-xs font-medium text-gray-500">
                    Qty: {item.quantity || 1}
                  </p>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-700">
                Rs. {(item.price * (item.quantity || 1)).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      )}
        {/* sumary details */}
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
  );
}

export default OrderSummary;
