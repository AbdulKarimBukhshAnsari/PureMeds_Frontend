import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import Button from "../../components/ui/Buttons/Button";
import { products } from "../../utils/mockData";
import { useCart } from "../../context/Cart/CartContext";
import {
  FadeInLeft,
  FadeInRight,
} from "../../components/ui/Animation/ScrollAnimation";

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
    <div className="bg-background">
      <div className="container mx-auto px-4 pt-24">
        <div className="flex items-center justify-between py-5">
          <FadeInLeft>
            <h1 className="text-3xl font-bold text-gray-800">
              Product Details
            </h1>
          </FadeInLeft>
          <FadeInRight>
            <Button
              variant="secondary"
              className="flex items-center gap-2"
              onClick={() => window.history.back()}
            >
              <ArrowLeft size={18} />
              <span>Back</span>
            </Button>
          </FadeInRight>
        </div>
        {/* Product Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: Image */}
            <div>
              <img
                src={product.productImage}
                alt={product.productName}
                className="w-full h-full rounded-lg"
              />
            </div>

            {/* Right: Details */}
            <div>
              <div className="flex items-start justify-between gap-2 mb-1 ">
                {/* Product Title */}
                <h1 className="text-3xl text-primary font-bold mb-2">
                  {product.productName}
                </h1>
              </div>
              <p className="text-gray-600 text-lg mb-4">{product.purpose}</p>

              {/* Manufacturer + Info + Side Effects*/}
              <div className="mb-4 mt-6 space-y-3">
                <p className="text-gray-600">
                  <p className="font-semibold text-primary">Chemical Name</p>
                  <p>{product.chemicalName}</p>
                </p>
                <p className="text-gray-600">
                  <p className="font-semibold text-primary">Manufacturer</p>
                  <p>{product.manufacturer}</p>
                </p>
                <p className="text-gray-600">
                  <p className="font-semibold text-primary">Category</p>
                  <p>{product.category}</p>
                </p>
                <p className="text-gray-600">
                  <p className="font-semibold text-primary">Side Effects</p>
                  <p>{product.sideEffects.join(", ")}</p>
                </p>
              </div>

              {/* Price + Cart + Quantity */}
              <div className="flex flex-row align-justify items-center mt-10">
                {/* Quantity + Add to Cart */}
                <div className="flex items-center gap-4">
                  {/* Quantity Counter */}
                  <div className="flex items-center border rounded-md overflow-hidden">
                    <button
                      className="px-4 py-2 bg-white hover:bg-gray-300 transition cursor-pointer rounded-l-md"
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
                      className="px-4 py-2 bg-white hover:bg-gray-300 transition cursor-pointer rounded-r-md"
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
                    className="flex items-center justify-center gap-2 px-6 cursor-pointer"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart size={20} />
                    <span>Add to Cart</span>
                  </Button>
                </div>

                {/* Price */}
                <div className="flex ml-35">
                  <span className="text-4xl font-bold text-primary">
                    Rs. {product.price}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
