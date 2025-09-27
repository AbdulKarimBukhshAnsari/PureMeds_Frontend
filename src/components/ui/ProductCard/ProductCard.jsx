import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import Button from "../Buttons/Button";


const ProductCard = ({ product }) => {
  return (
    <div className="bg-background rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
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
          <span className="font-medium">Manufacturer:</span> {product.manufacturer}
        </p>

        {/* Purpose */}
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">
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
        <div className="flex justify-between items-center gap-2">
          <Link to={`/product/${product.id}`}>
          <Button variant="outline" size="sm" className="flex-1 cursor-pointer">
            View Details
          </Button>
          </Link>
          <Button
            variant="accent"
            size="sm"
            className="flex items-center justify-center gap-1"
          >
            <ShoppingCart size={16} />
            <span>Add</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
