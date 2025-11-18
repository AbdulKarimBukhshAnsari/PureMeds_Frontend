import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import Button from "../../components/ui/Buttons/Button";
import { fetchProductById } from "../../apis/medicines.api";
import { useCart } from "../../context/Cart/CartContext";
import { getCategoryName } from "../../utils/categoryMapping";
import {
  FadeInLeft,
  FadeInRight,
} from "../../components/ui/Animation/ScrollAnimation";
import { useToast } from "../../hooks/Toast/useToast";
import ToastNotification from "../../components/ui/Alert/ToastNotification";

const ProductDetail = () => {
  const { id } = useParams();
  const { getToken } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); // for showing the quantity on the page
  const { cartItems, addToCart, updateQuantity } = useCart();
  const [toast, showSuccess, showError, hideToast] = useToast();

  // Fetch product by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Try to get token, but don't require it
        let token = null;
        try {
          token = await getToken({ template: "puremeds" });
        } catch (authError) {
          // User not authenticated, continue without token
          console.log("User not authenticated, fetching product without token");
        }
        const response = await fetchProductById(id, token);

        if (response?.data) {
          // Transform product to match expected format (convert _id to id)
          const transformedProduct = {
            ...response.data,
            id: response.data._id || response.data.id,
          };
          setProduct(transformedProduct);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err?.response?.data?.message || "Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, getToken]);

  const cartItem = product
    ? cartItems.find((item) => item.id === product.id)
    : null; // checking if the product already exsists in the cart

  const handleAddToCart = () => {
    if (!product) return;
    if (product.availableStock === 0) {
      showError(`Sorry, ${product.productName} is out of stock!`);
      return;
    }
    if (cartItem) {
      updateQuantity(product.id, quantity);
      showSuccess(`Quantity updated to ${quantity} in your cart.`);
    } else {
      addToCart(product, quantity);
      showSuccess(
        `${quantity} ${
          quantity > 1 ? "items" : "item"
        } added to your cart successfully!`
      );
    }
  };
  // for increasing quantity in the cart
  const increaseQty = () => {
    if (product.availableStock === 0) {
      showError(`Sorry, ${product.productName} is out of stock!`);
      return;
    }
    if (product && quantity < product.availableStock) {
      const newQty = quantity + 1;
      setQuantity(newQty);
      if (cartItem) {
        updateQuantity(product.id, newQty);
      }
    }
  };
  const decreaseQty = () => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      if (cartItem) {
        updateQuantity(product.id, newQty);
      }
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Loading product...</h2>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">
          {error || "Product not found"}
        </h2>
        <Link to={"/categories"}>
          <Button variant="primary">Back to Categories</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 pt-24">
        <div className="flex items-center justify-between py-5 w-full">
          <FadeInLeft>
            <h1 className="text-4xl font-bold text-orange-400">
              Medicine Details
            </h1>
          </FadeInLeft>
          <FadeInRight>
            <Button
              variant=""
              className="flex border border-primary text-primary hover:bg-gradient-to-r hover:from-primary hover:to-orange-400 hover:text-white hover:border-background items-center gap-2"
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
            <div className="w-full aspect-video flex items-center justify-center bg-white">
              <img
                src={product.productImage}
                alt={product.productName}
                className="max-w-full max-h-full object-contain object-center rounded-lg"
              />
            </div>

            {/* Right: Details */}
            <div>
              <div className="flex items-start justify-between gap-2 mb-1 ">
                <h1 className="text-3xl text-orange-400 font-bold mb-2">
                  {product.productName}
                </h1>
              </div>

              <p className="text-primary text-lg mb-4">{product.purpose}</p>

              {/* Manufacturer + Info */}
              <div className="mb-4 mt-6 space-y-3 text-lg">
                <div className="text-gray-600">
                  <p className="font-semibold text-primary">Chemical Name</p>
                  <p>{product.chemicalName}</p>
                </div>

                <div className="text-gray-600">
                  <p className="font-semibold text-primary">Manufacturer</p>
                  <p>{product.manufacturer}</p>
                </div>

                <div className="text-gray-600">
                  <p className="font-semibold text-primary">Category</p>
                  <p>{getCategoryName(product.category)}</p>
                </div>

                <div className="text-gray-600">
                  <p className="font-semibold text-primary">Side Effects</p>
                  <p>
                    {Array.isArray(product.sideEffects)
                      ? JSON.parse(product.sideEffects[0]).join(", ")
                      : "None"}
                  </p>
                </div>
              </div>

              {/* Price + Cart + Quantity */}
              <div className="flex flex-row items-center mt-10">
                <div className="flex items-center gap-4">
                  {/* Quantity Counter */}
                  <div className="text-primary flex items-center border border-primary rounded-md overflow-hidden">
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
                    variant=""
                    size="md"
                    className="flex items-center bg-primary text-white  hover:bg-gradient-to-r hover:from-primary hover:to-orange-400 justify-center gap-2 px-4 cursor-pointer"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart size={20} />
                    <span>Add to Cart</span>
                  </Button>
                </div>

                {/* Price */}
                <div className="flex ml-auto">
                  <span className="text-4xl font-bold text-primary">
                    Rs. {product.price}
                  </span>
                </div>
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

export default ProductDetail;
