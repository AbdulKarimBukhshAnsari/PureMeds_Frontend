import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import Button from "../../components/ui/Buttons/Button";
import { products } from "../../utils/mockData";
import { useCart } from "../../context/Cart/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(1); // for showing the quantity on the page
  const { cartItems, addToCart, updateQuantity } = useCart();

  const cartItem = cartItems.find((item) => item.id === product.id); // checking if the product already exsists in the cart

  const handleAddToCart = () => {
    if (cartItem) {
      updateQuantity(product.id, quantity);
    } else {
      addToCart(product, quantity);
    }
  };
  // for increasing quantity in the cart
  const increaseQty = () => {
    if (quantity < product.availableStock) {
      const newQty = quantity + 1;
    setQuantity(newQty);
    updateQuantity(product.id, newQty);
    }
  };
  const decreaseQty = () => {
    if (quantity > 1) {
      const newQty = quantity - 1;
    setQuantity(newQty);
    updateQuantity(product.id, newQty);
    }
  };

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Link to={"/categories"}>
          <Button variant="primary">Back to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button */}
      <Button
        variant="secondary"
        className="mb-6 flex items-center gap-2"
        onClick={() => window.history.back()}
      >
        <ArrowLeft size={18} />
        <span>Back</span>
      </Button>

      {/* Product Card */}
      <div className="bg-background rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Image */}
          <div>
            <img
              src={product.productImage}
              alt={product.productName}
              className="w-full h-auto rounded-lg"
            />
          </div>

          {/* Right: Details */}
          <div>
            {/* Product Title */}
            <h1 className="text-3xl font-bold mb-2">{product.productName}</h1>
            <p className="text-gray-600 mb-4">{product.purpose}</p>

            {/* Manufacturer / Info */}
            <div className="mb-4 space-y-1">
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Chemical Name:</span>{" "}
                {product.chemicalName}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Manufacturer:</span>{" "}
                {product.manufacturer}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Category:</span>{" "}
                {product.category}
              </p>
            </div>

            {/* Side Effects */}
            <div className="mb-6">
              <h2 className="text-gray-500 font-semibold text-md mb-2">
                Possible Side Effects
              </h2>
              <ul className="list-disc list-inside text-gray-600 text-sm">
                {product.sideEffects.map((effect, idx) => (
                  <li key={idx}>{effect}</li>
                ))}
              </ul>
            </div>

            {/* Price + Stock */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-bold text-primary">
                Rs. {product.price}
              </span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                In Stock: {product.availableStock}
              </span>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4">
              {/* Quantity Counter */}
              <div className="flex items-center border rounded-md overflow-hidden">
                <button
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-300 transition cursor-pointer rounded-l-md"
                  onClick={decreaseQty}
                  disabled={quantity === 1}
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  readOnly
                  className="flex justify-center items-center w-11 text-center focus:outline-none"
                />
                <button
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-300 transition cursor-pointer rounded-r-md"
                  onClick={increaseQty}
                  disabled={quantity === product.availableStock}
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <Button
                variant="primary"
                size="md"
                className="flex items-center justify-center gap-2 px-6"
                onClick={handleAddToCart}
              >
                <ShoppingCart size={20} />
                <span>Add to Cart</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
