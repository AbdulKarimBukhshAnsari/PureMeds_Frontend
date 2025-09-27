import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Grid, List as ListIcon } from "lucide-react";
import ProductCard from "../../components/ui/ProductCard/ProductCard";
import Button from "../../components/ui/Buttons/Button";
import { products } from "../../utils/mockData";

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  const categories = [
  { id: "all", name: "All Medicines" },
  { id: "pain-fever", name: "Pain & Fever" },
  { id: "infections", name: "Infections" },
  { id: "heart-bp", name: "Heart & BP" },
  { id: "lungs-allergy", name: "Lungs & Allergy" },
  { id: "stomach-digestion", name: "Stomach & Digestion" },
  { id: "hormones-diabetes", name: "Hormones & Diabetes" },
  { id: "brain-mental", name: "Brain & Mental Health" },
  { id: "vitamins-others", name: "Vitamins & Others" },
];

  // Filter products by category
  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Medicine Categories</h1>
      <p className="text-gray-600 mb-6">
        Browse our wide range of verified medicines
      </p>

      {/* Category Navigation */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex space-x-2 pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition ${
                activeCategory === category.id
                  ? "bg-primary text-white"
                  : "bg-background border hover:bg-gray-100"
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Search and View Controls */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search medicines..."
              className="pl-10 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center border rounded-md overflow-hidden">
              <button
                className={`p-2 ${
                  viewMode === "grid"
                    ? "bg-primary-hover text-white"
                    : "bg-background"
                }`}
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
              >
                <Grid size={18} />
              </button>
              <button
                className={`p-2 ${
                  viewMode === "list"
                    ? "bg-primary-hover text-white"
                    : "bg-background"
                }`}
                onClick={() => setViewMode("list")}
                aria-label="List view"
              >
                <ListIcon size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <h2 className="text-xl font-semibold mb-4">
        {categories.find((c) => c.id === activeCategory)?.name}
      </h2>

      {viewMode === "grid" ? (
        // Grid View
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        // List View
        <div className="space-y-4">
          {filteredProducts.map((product) => (
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
                       <Link to={`/product/${product.id}`}>
                      {product.productName}
                       </Link>
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      <span className="font-medium">Manufacturer:</span>{" "}
                      {product.manufacturer}
                    </p>

                    <p className="text-gray-500 text-sm mb-2">
                      {product.purpose}
                    </p>
                    <div className="mb-3">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs mr-2">
                        In Stock: {product.availableStock}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-lg">
                      Rs. {product.price}
                    </span>
                    <div className="flex gap-2">
                      <Link to={`/product/${product.id}`}>
                        <Button variant="outline" size="sm" className="cursor-pointer">
                          View Details
                        </Button>
                      </Link>
                      <Button
                        variant="accent"
                        size="sm"
                        className="flex items-center justify-center gap-1"
                      >
                        <span>Add to Cart</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
