// to do
// add cart ui (magic patterns last msg)
// add checkout ui (magic pattern second last msg)
// make order summary comp for boh cart and checkout
// strip payment thing (.24 id)
// both new chats
import React, { useState } from "react";
import CartItemCard from "./ui/CartItemCard";
import Button from "../../components/ui/Buttons/Button";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag } from "lucide-react";
import OrderSummary from "./ui/OrderSummary";
import CartEmpty from "./ui/CartEmpty";
import { useCart } from "../../context/Cart/CartContext";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const handleQuantityChange = (id, change) => {
    const item = cartItems.find((i) => i.id === id);
    if (item) {
      const newQty = Math.max(1, item.quantity + change);
      updateQuantity(id, newQty); // 👈 call context method
    }
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id); // 👈 directly call context function
  };

  const subtotal = cartItems.reduce((t, i) => t + i.price * i.quantity, 0);
  const shipping = cartItems.length > 0 ? 200 : 0;
  const total = subtotal + shipping;
  return (
    <div>
      <div className="bg-background min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>
          {cartItems.length > 0 ? (
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-2/3 bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="hidden md:grid grid-cols-12 gap-4 p-6 border-b border-gray-200 bg-gray-50">
                  <div className="col-span-6 font-semibold text-gray-800">
                    Product
                  </div>
                  <div className="col-span-2 text-center font-semibold text-gray-800">
                    Quantity
                  </div>
                  <div className="col-span-2 text-center font-semibold text-gray-800">
                    Price
                  </div>
                  <div className="col-span-2 text-center font-semibold text-gray-800">
                    Total
                  </div>
                </div>
                {cartItems.map((item) => (
                  <CartItemCard
                    key={item.id}
                    item={item}
                    onRemove={handleRemoveItem}
                    onQuantityChange={handleQuantityChange}
                  />
                ))}
                <div className="p-6">
                  <Link to="/categories">
                    <Button variant="secondary" className="flex items-center cursor-pointer">
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="lg:w-1/3">
                <OrderSummary
                  subtotal={subtotal}
                  shipping={shipping}
                  total={total}
                >
                  <Link to="/checkout">
                    <Button
                      fullWidth
                      variant="primary"
                      className="flex items-center justify-center cursor-pointer"
                    >
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </OrderSummary>
              </div>
            </div>
          ) : (
            <CartEmpty />
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
