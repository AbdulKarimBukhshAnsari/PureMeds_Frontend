import React from "react";
import Button from "../../components/ui/Buttons/Button";
import { QrCode, Shield, TrendingUp } from "lucide-react";
import bgImage from "../../assets/bg8.png";
import { Link } from "react-router-dom";
import { products } from "../../utils/mockData";
import ProductCard from "../../components/ui/ProductCard/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedBackground } from "../../components/ui/Animation/AnimatedBg.idea";
import {
  FadeInWhenVisible,
  ScaleInWhenVisible,
  StaggerContainer,
  StaggerItem,
} from "../../components/ui/Animation/ScrollAnimation";

function Home() {
  const features = [
    {
      icon: Shield,
      title: "100% Authentic",
      description:
        "Every medicine is verified and authenticated through our blockchain system.",
    },
    {
      icon: QrCode,
      title: "Easy Verification",
      description:
        "Scan the QR code on any medicine to instantly verify its authenticity.",
    },
    {
      icon: TrendingUp,
      title: "Complete Transparency",
      description:
        "Track the entire supply chain from ingredients to delivery.",
    },
  ];
  return (
    <div>
      <div>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-teal-100 to-[#53E6CC] py-16 min-h-[600px] flex items-center overflow-hidden">
          {/* Content */}
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Text Content */}
              <div className="flex flex-col items-start text-left">
                <motion.h1
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-primary"
                >
                  Buy 100% <span className="text-primary">Authentic&nbsp;Medicines</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className="text-lg md:text-xl mb-8 text-gray-700 max-w-lg"
                >
                  Verified by PureMeds blockchain technology for your safety and
                  peace of mind.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                  className="flex flex-wrap gap-4"
                >
                  <Link to={"/categories"}>
                    <Button variant="primary" size="md" className="rounded-3xl">
                      Shop Now
                    </Button>
                  </Link>
                  <Button variant="outline" size="md" className="rounded-3xl">
                    Verify Medicine
                  </Button>
                </motion.div>
              </div>

              {/* Right: Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="flex justify-center lg:justify-end"
              >
                <img
                  src={bgImage}
                  alt="Authentic medicines"
                  className="w-full max-w-md lg:max-w-lg h-auto object-contain drop-shadow-2xl"
                />
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <FadeInWhenVisible>
            <h2 className="text-3xl font-semibold text-center mb-12">
              Why Choose PureMeds?
            </h2>
          </FadeInWhenVisible>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <ScaleInWhenVisible key={index} delay={index * 0.15}>
                <div className="text-center p-6 rounded-lg">
                  <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <feature.icon size={32} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </ScaleInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <FadeInWhenVisible>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-semibold">Featured Medicines</h2>
              <Link to={"/categories"}>
                <Button variant="outline">View All</Button>
              </Link>
            </div>
          </FadeInWhenVisible>
          <StaggerContainer staggerDelay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <StaggerItem key={product._id}>
                  <ProductCard product={product} view={"grid"} />
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Verification Banner */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <FadeInWhenVisible>
            <div className="bg-primary rounded-lg p-8 text-white flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-6">
                <h3 className="text-2xl font-semibold mb-3">
                  Verify Your Medicine Now
                </h3>
                <p className="text-lg opacity-90">
                  Scan the QR code on your medicine package to verify its
                  authenticity.
                </p>
              </div>
              <Button variant="accent" size="lg">
                Scan QR Code
              </Button>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </div>
  );
}

export default Home;
