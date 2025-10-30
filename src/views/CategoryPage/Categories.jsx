import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Grid, List as ListIcon } from "lucide-react";
import {ChevronLeft, ChevronRight} from "lucide-react";
import ProductCard from "../../components/ui/ProductCard/ProductCard";
import Button from "../../components/ui/Buttons/Button";
import { products } from "../../utils/mockData";
import {
  FadeInLeft,
  ScaleInWhenVisible,
} from "../../components/ui/Animation/ScrollAnimation";

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useRef(null);

  const scrollAmount = 250; // adjust for how far each click scrolls

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      setScrollPosition(scrollRef.current.scrollLeft - scrollAmount);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setScrollPosition(scrollRef.current.scrollLeft + scrollAmount);
    }
  };

  // track scroll limits
  const [maxScroll, setMaxScroll] = useState(0);

  useEffect(() => {
    if (scrollRef.current) {
      const el = scrollRef.current;
      setMaxScroll(el.scrollWidth - el.clientWidth);

      const handleScroll = () => setScrollPosition(el.scrollLeft);
      el.addEventListener("scroll", handleScroll);
      return () => el.removeEventListener("scroll", handleScroll);
    }
  }, []);

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
    <div className="bg-[#deefec]">
      <div className="container mx-auto px-2 py-30">
        <FadeInLeft>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Medicine Categories</h1>
          <p className="text-gray-600 mb-6">
            Browse our wide range of verified medicines
          </p>
        </FadeInLeft>
        {/* Category Navigation */}
        <div className="mb-6 relative flex items-center">
          {/* Left Scroll Button */}
          {scrollPosition > 0 && (
            <button
              onClick={scrollLeft}
              className="absolute -left-4 z-10 bg-teal-50 text-primary hover:bg-teal-150 rounded-full shadow-md p-2"
              style={{ transform: "translateY(-50%)", top: "50%" }}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          {/* Scrollable Category Buttons */}
          <div
            ref={scrollRef}
            className="flex space-x-2 overflow-hidden scroll-smooth w-full"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 border-gray-400 rounded-full whitespace-nowrap transition ${
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

          {/* Right Scroll Button */}
          {scrollPosition < maxScroll && (
            <button
              onClick={scrollRight}
              className="absolute -right-4 z-10 bg-teal-50 text-primary hover:bg-teal-150 rounded-full shadow-md p-2"
              style={{ transform: "translateY(-50%)", top: "50%" }}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Search and View Controls */}
        <div className="bg-white border-gray-400 rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search medicines..."
                className="pl-10 w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-gray-400 rounded-md overflow-hidden">
                <button
                  className={`p-2 ${
                    viewMode === "grid"
                      ? "bg-primary-hover text-white"
                      : "bg-background text-primary"
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
                      : "bg-background text-primary"
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
        <FadeInLeft>
          <h2 className="text-xl font-semibold mb-4">
            {categories.find((c) => c.id === activeCategory)?.name}
          </h2>
        </FadeInLeft>
        {viewMode === "grid" ? (
          // Grid View
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} view={"grid"} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} view={"list"} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
