import React from "react";
import Button from "../../components/ui/Buttons/Button";
import {
  QrCode,
  Shield,
  TrendingUp,
  Users,
  Award,
  Clock,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import bgImage from "../../assets/bg11.jpg";
import { Link } from "react-router-dom";
import { products } from "../../utils/mockData";
import ProductCard from "../../components/ui/ProductCard/ProductCard";
import { motion } from "framer-motion";
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

  const stats = [
    {
      icon: Users,
      value: "10K+",
      label: "Happy Customers",
      color: "from-[#156874] to-[#0d4a52]",
    },
    {
      icon: Award,
      value: "500+",
      label: "Verified Medicines",
      color: "from-[#156874] to-[#0d4a52]",
    },
    {
      icon: Clock,
      value: "24/7",
      label: "Support Available",
      color: "from-[#156874] to-[#0d4a52]",
    },
    {
      icon: CheckCircle2,
      value: "100%",
      label: "Authentic Guarantee",
      color: "from-[#156874] to-[#0d4a52]",
    },
  ];

  const blockchainSteps = [
    {
      title: "Medicine Registration",
      description:
        "Each medicine is registered on the blockchain with unique identifiers and manufacturing details",
      icon: Shield,
    },
    {
      title: "Supply Chain Tracking",
      description:
        "Every movement from manufacturer to distributor is recorded immutably on the blockchain",
      icon: TrendingUp,
    },
    {
      title: "QR Code Generation",
      description:
        "A unique QR code is generated containing all blockchain verification data for each package",
      icon: QrCode,
    },
    {
      title: "Instant Verification",
      description:
        "Scan the QR code to instantly verify authenticity and view complete supply chain history",
      icon: CheckCircle2,
    },
  ];
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden pt-24">
        {/* Background Image */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${bgImage})`,
            zIndex: 0,
          }}
        >
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto -mt-8 md:-mt-12">
            {/* Main Heading */}
            <FadeInWhenVisible delay={0.2}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-primary leading-tight">
                Authentic Medicines,
                <br />
                <span className="bg-primary bg-clip-text text-transparent">
                  Verified by Blockchain
                </span>
              </h1>
            </FadeInWhenVisible>

            {/* Description */}
            <FadeInWhenVisible delay={0.4}>
              <p className="text-base md:text-lg lg:text-xl text-primary/95 mb-10 leading-relaxed max-w-3xl mx-auto font-light">
                Experience complete transparency in pharmaceutical supply chain.
                Every medicine verified, tracked, and authenticated through
                blockchain technology to ensure you receive only genuine
                medications.
              </p>

              {/* Buttons */}

              <div className="flex flex-wrap gap-4 justify-center items-center">
                <Link to={"/categories"}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="primary"
                      size="lg"
                      className="bg-gradient-to-r from-[#156874] to-[#0d4a52] hover:from-[#0d4a52] hover:to-[#156874] text-white shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl px-8 py-4 text-base font-semibold"
                    >
                      Shop Now
                    </Button>
                  </motion.div>
                </Link>
                <Link to={"/verify"}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="primary"
                      size="lg"
                      className="bg-gradient-to-r from-[#156874] to-[#0d4a52] hover:from-[#0d4a52] hover:to-[#156874] text-white shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl px-8 py-4 text-base font-semibold"
                    >
                      Verify Medicine
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <motion.p
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-sm text-primary/80 font-medium"
          >
            scroll down
          </motion.p>
          <motion.div
            animate={{
              y: [0, 8, 0],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-primary/20 flex items-center justify-center"
          >
            <ChevronDown size={20} className="text-primary" />
          </motion.div>
        </div>
      </section>

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

      {/* How Blockchain Verification Works Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#156874] via-[#0f5966] to-[#0d4a52] relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <FadeInWhenVisible>
            <div className="text-center mb-10 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-white">
                How it works
              </h2>
              <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
                PureMeds can help you verify and track your medicine
                authenticity
              </p>
            </div>
          </FadeInWhenVisible>

          {/* Steps Grid */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
              {blockchainSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="bg-white rounded-lg p-5 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center cursor-pointer"
                >
                  {/* Icon */}
                  <div className="mb-4">
                    <step.icon size={32} className="text-[#156874]" />
                  </div>

                  {/* Content */}
                  <h3 className="text-base md:text-lg font-semibold mb-2 text-gray-800 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-8 md:py-10 bg-[#f7fffd]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="flex flex-col items-center justify-center py-2 relative"
              >
                {index < stats.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 h-12 w-[1px] bg-gray-300"></div>
                )}
                <div className="mb-2">
                  <stat.icon size={32} className="text-[#156874]" />
                </div>
                <h3 className="text-3xl md:text-4xl font-extrabold text-[#156874] mb-1">
                  {stat.value}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 font-medium text-center">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInWhenVisible>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
              <div>
                <span className="inline-block bg-[#156874]/10 text-[#156874] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  Our Products
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-[#156874] to-[#0d4a52] bg-clip-text text-transparent">
                    Featured Medicines
                  </span>
                </h2>
                <p className="text-gray-600">
                  Browse our verified medicine collection
                </p>
              </div>
              <Link to={"/categories"}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    className="border-2 border-primary text-primary hover:bg-primary-hover hover:text-white transition-all duration-300 rounded-xl px-6 py-3 flex items-center gap-2"
                  >
                    View All
                    <ArrowRight size={18} />
                  </Button>
                </motion.div>
              </Link>
            </div>
          </FadeInWhenVisible>
          <StaggerContainer staggerDelay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
      <section className="py-12 md:py-16 bg-gradient-to-b from-primary-hover via-primary/85 to-background relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeInWhenVisible>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto bg-white/20 backdrop-blur-lg rounded-2xl p-8 md:p-10 border border-white/40 shadow-2xl hover:bg-white/25 hover:border-white/50 transition-all duration-300 relative overflow-hidden"
            >
              {/* Subtle inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl pointer-events-none"></div>

              <div className="flex flex-col items-center text-center relative z-10">
                <div className="mb-6">
                  <div className="bg-white/30 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-white/20 inline-block">
                    <QrCode size={40} className="text-white drop-shadow-md" />
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white drop-shadow-lg">
                  Verify Your Medicine
                </h3>
                <p className="text-base md:text-lg text-white/95 mb-6 drop-shadow-md max-w-md mx-auto">
                  Scan the QR code to instantly verify authenticity and ensure
                  you're getting genuine products.
                </p>
                <Link to={"/verify"}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block"
                  >
                    <button className="bg-white text-[#156874] hover:bg-[#f7fffd] shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl px-8 py-3 flex items-center gap-2 font-semibold text-base">
                      <QrCode size={20} />
                      Scan QR Code
                    </button>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInWhenVisible>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
                Ready to Experience Authentic Healthcare?
              </h2>
              <p className="text-gray-600 mb-6">
                Join thousands of satisfied customers who trust PureMeds for
                their healthcare needs.
              </p>
              <Link to={"/categories"}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <Button
                    variant="primary"
                    size="lg"
                    className="bg-gradient-to-r from-[#156874] to-[#0d4a52] hover:from-[#0d4a52] hover:to-[#156874] text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg px-6 py-3 font-semibold"
                  >
                    Start Shopping
                    <ArrowRight size={18} className="ml-2 inline" />
                  </Button>
                </motion.div>
              </Link>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </div>
  );
}

export default Home;
