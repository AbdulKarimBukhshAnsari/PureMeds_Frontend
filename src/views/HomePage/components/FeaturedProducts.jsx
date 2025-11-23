import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Buttons/Button";
import ProductCard from "../../../components/ui/ProductCard/ProductCard";
import {
  FadeInWhenVisible,
  StaggerContainer,
  StaggerItem,
} from "../../../components/ui/Animation/ScrollAnimation";
import { SECTION_TITLES } from "../../../constants/home.constants";
import Loading from "../../../components/ui/Loader/Loading";

function FeaturedProducts({ products = [], loading = false }) {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible>
          <div className="text-center mb-11">
            <span className="inline-block bg-orange-400/10 text-orange-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              {SECTION_TITLES.featured.badge}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary leading-tight">
              <span className="bg-primary bg-clip-text text-transparent">
                {SECTION_TITLES.featured.title}
              </span>
            </h2>
            <p className="text-gray-600 mt-3 text-base md:text-lg max-w-2xl mx-auto">
              {SECTION_TITLES.featured.subtitle}
            </p>
            <div className="mt-4 h-1 w-16 bg-orange-400 rounded-full mx-auto"></div>
          </div>
        </FadeInWhenVisible>
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loading />
          </div>
        ) : products.length > 0 ? (
          <StaggerContainer staggerDelay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => {
                // Transform product to match ProductCard expected format (convert _id to id)
                const transformedProduct = {
                  ...product,
                  id: product._id || product.id,
                };
                return (
                  <StaggerItem key={transformedProduct.id}>
                    <ProductCard product={transformedProduct} view={"grid"} />
                  </StaggerItem>
                );
              })}
            </div>
            <FadeInWhenVisible>
              <div className="flex justify-end mt-10">
                <Link to={"/categories"}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant=""
                      className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-primary hover:to-orange-400 text-white transition-all duration-300 rounded-xl px-6 py-3 flex items-center gap-2"
                    >
                      {SECTION_TITLES.featured.viewAllText}
                      <ArrowRight size={18} />
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </FadeInWhenVisible>
          </StaggerContainer>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              No featured products available at the moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedProducts;
