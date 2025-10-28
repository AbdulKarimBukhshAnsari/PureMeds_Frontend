import React from "react";
import { Trash2, Plus, Minus } from "lucide-react";

function CartItemCard ({ item, onRemove, onQuantityChange }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-6 border-b border-gray-200">
      <div className="col-span-1 md:col-span-6 flex items-center">
        <div className="w-16 h-16 flex-shrink-0 mr-4">
          <img
            src={item.productImage}
            alt={item.productName}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <div>
          <h3 className="text-gray-800 font-medium">{item.productName}</h3>
          <button
            onClick={() => onRemove(item.id)}
            className="text-sm text-red-500 hover:text-red-600 flex items-center mt-1 cursor-pointer"
          >
            <Trash2 className="h-3.5 w-3.5 mr-1" />
            Remove
          </button>
        </div>
      </div>

      <div className="col-span-1 md:col-span-2 flex items-center justify-between md:justify-center">
        <div className="flex items-center border border-gray-300 rounded-md">
          <button
            onClick={() => onQuantityChange(item.id, -1)}
            className="px-2 py-1 text-gray-600 hover:text-gray-800 cursor-pointer"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="px-2 py-1 text-gray-800">{item.quantity}</span>
          <button
            onClick={() => onQuantityChange(item.id, 1)}
            className="px-2 py-1 text-gray-600 hover:text-gray-800 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="col-span-1 md:col-span-2 flex items-center justify-between md:justify-center">
        <span className="text-gray-700">Rs. {item.price.toFixed(2)}</span>
      </div>

      <div className="col-span-1 md:col-span-2 flex items-center justify-between md:justify-center">
        <span className="text-gray-700 font-medium">
          Rs. {(item.price * item.quantity).toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default CartItemCard;
