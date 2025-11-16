import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import Button from "../Buttons/Button";
import { useCart } from "../../../context/Cart/CartContext";
import { getCategoryName } from "../../../utils/categoryMapping";
import { useToast } from "../../../hooks/Toast/useToast";
import ToastNotification from "../../../components/ui/Alert/ToastNotification";

const ProductCard = ({ product, view }) => {
  const [quantity, setQuantity] = useState(1); // by default add one medicine, and they can add or subtract in the product details page
  const { addToCart } = useCart();
  const [toast, showSuccess, showError, hideToast] = useToast();

  const handleAddToCart = () => {
    try {
      if (product.availableStock === 0) {
        showError(`Sorry, ${product.productName} is out of stock!`);
        return;
      }

      addToCart(product, quantity);
      showSuccess(
        `${quantity} ${
          quantity > 1 ? "items" : "item"
        } added to your cart successfully!`
      );
    } catch (error) {
      console.error("Add to cart error:", error);
      showError(
        `Failed to add ${product.productName} to cart. Please try again.`
      );
    }
  };

  return view == "grid" ? (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-[#156874]/10">
      {/* Product Image */}
      <Link to={`/product/${product.id}`}>
        <img
          src={product.productImage}
          alt={product.productName}
          className="w-full h-48 object-cover"
        />
      </Link>

      <div className="p-5">
        {/* Product Name */}
        <Link to={`/product/${product.id}`}>
          <h3 className="font-bold text-lg mb-2 text-gray-800 hover:text-[#156874] transition-colors line-clamp-1 ">
            {product.productName}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mb-2">
          <span className="font-medium">Manufacturer:</span>{" "}
          {product.manufacturer}
        </p>

        {/* Purpose */}
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
          {product.purpose}
        </p>

        {/* Category Badge */}
        <div className="mb-4">
          <span className="inline-block bg-[#156874]/10 text-[#156874] px-3 py-1 rounded-full text-xs font-medium capitalize">
            {getCategoryName(product.category)}
          </span>
        </div>

        {/* Price, Stock */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#156874]/10">
          <span className="text-2xl font-bold text-[#156874]">
            Rs. {product.price}
          </span>
          <span
            className={`text-sm font-medium ${
              product.availableStock > 10
                ? "text-green-600"
                : product.availableStock > 0
                ? "text-orange-600"
                : "text-red-600"
            }`}
          >
            {product.availableStock > 0
              ? `${product.availableStock} in stock`
              : "Out of stock"}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Link to={`/product/${product.id}`} className="flex-1">
            <Button
              variant="outline"
              size="sm"
              className="w-full cursour-pointer rounded-lg"
            >
              View Details
            </Button>
          </Link>
          <Button
            variant="accent"
            size="sm"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#156874] to-[#0d4a52] hover:from-[#0d4a52] hover:to-[#156874] text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-lg"
            onClick={handleAddToCart}
            // disabled={product.availableStock === 0}
          >
            <ShoppingCart size={16} />
            <span>Add</span>
          </Button>
        </div>
      </div>
      <ToastNotification
        isVisible={toast.isVisible}
        type={toast.type}
        message={toast.message}
        duration={toast.duration}
        onClose={hideToast}
      />
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

              <p className="text-gray-500 text-sm mb-2 line-clamp-1">
                {product.purpose}
              </p>
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
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#156874] to-[#0d4a52] hover:from-[#0d4a52] hover:to-[#156874] text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-lg"
                  onClick={handleAddToCart}
                  disabled={product.availableStock === 0}
                >
                  <ShoppingCart size={16} />
                  <span>Add to Cart</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastNotification
        isVisible={toast.isVisible}
        type={toast.type}
        message={toast.message}
        duration={toast.duration}
        onClose={hideToast}
      />
    </div>
  );
};

export default ProductCard;
