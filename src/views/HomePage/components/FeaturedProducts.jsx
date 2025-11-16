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
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
            <div>
              <span className="inline-block bg-[#156874]/10 text-[#156874] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                {SECTION_TITLES.featured.badge}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-2">
                <span className="bg-gradient-to-r from-[#156874] to-[#0d4a52] bg-clip-text text-transparent">
                  {SECTION_TITLES.featured.title}
                </span>
              </h2>
              <p className="text-gray-600">
                {SECTION_TITLES.featured.subtitle}
              </p>
            </div>
            <Link to={"/categories"}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant=""
                  className="border-2 border-primary text-primary hover:bg-primary-hover hover:text-white transition-all duration-300 rounded-xl px-6 py-3 flex items-center gap-2"
                >
                  {SECTION_TITLES.featured.viewAllText}
                  <ArrowRight size={18} />
                </Button>
              </motion.div>
            </Link>
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
          </StaggerContainer>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No featured products available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedProducts;
