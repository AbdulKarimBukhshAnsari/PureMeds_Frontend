import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import Button from "../Buttons/Button";
import { useCart } from "../../../context/Cart/CartContext";

const ProductCard = ({ product, view }) => {
  const [quantity, setQuantity] = useState(1); // by default add one medicine, and they can add or subtract in the product details page
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return view == "grid" ? (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      {/* Product Image */}
      <Link to={`/product/${product.id}`}>
        <img
          src={product.productImage}
          alt={product.productName}
          className="w-full h-48 object-cover"
        />
      </Link>

      <div className="p-4">
        {/* Product Name */}
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-lg mb-1 text-[#2E2E2E] hover:text-primary-hover">
            {product.productName}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mb-2">
          <span className="font-medium">Manufacturer:</span>{" "}
          {product.manufacturer}
        </p>

        {/* Purpose */}
        <p className="text-gray-500 text-sm mb-3 line-clamp-1">
          {product.purpose}
        </p>

        {/* Price, Stock, Category */}
        <div className="flex items-center justify-between mb-3">
          <span className="font-bold text-lg">Rs. {product.price}</span>
          <span className="text-sm text-green-500">
            Stock: {product.availableStock}
          </span>
        </div>
        <p className="text-xs text-gray-500 mb-3">
          Category: <span className="capitalize">{product.category}</span>
        </p>

        {/* Actions */}
        <div className="flex justify-between items-center gap-2 py-1">
          <Link to={`/product/${product.id}`}>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 cursor-pointer"
            >
              View Details
            </Button>
          </Link>
          <Button
            variant="accent"
            size="sm"
            className="flex items-center justify-center gap-1"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={16} />
            <span>Add</span>
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <div
        key={product.id}
        className="bg-background rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
      >
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-1/4">
            <Link to={`/product/${product.id}`}>
              <img
                src={product.productImage}
                alt={product.productName}
                className="w-full h-48 sm:h-full object-cover"
              />
            </Link>
          </div>
          <div className="p-4 sm:w-3/4 flex flex-col">
            <div className="flex-grow">
              <h3 className="font-semibold text-lg mb-1 text-[#2E2E2E] hover:text-primary-hover">
                <Link to={`/product/${product.id}`}>{product.productName}</Link>
              </h3>
              <p className="text-gray-600 text-sm mb-2">
                <span className="font-medium">Manufacturer:</span>{" "}
                {product.manufacturer}
              </p>

              <p className="text-gray-500 text-sm mb-2 line-clamp-1">{product.purpose}</p>
              <div className="mb-3">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs mr-2">
                  In Stock: {product.availableStock}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="font-bold text-lg">Rs. {product.price}</span>
              <div className="flex gap-2 pb-2">
                <Link to={`/product/${product.id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer"
                  >
                    View Details
                  </Button>
                </Link>
                <Button
                  variant="accent"
                  size="sm"
                  className="flex items-center justify-center gap-1"
                   onClick={handleAddToCart}
                >
                  <span>Add to Cart</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
