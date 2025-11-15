import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Buttons/Button";
import { FadeInWhenVisible } from "../../../components/ui/Animation/ScrollAnimation";
import { HERO_CONTENT } from "../../../constants/home.constants";
import bgImage from "../../../assets/bg11.jpg";

function HeroSection() {
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden pt-24">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bgImage})`,
          zIndex: 0,
        }}
      ></div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto -mt-8 md:-mt-12">
          {/* Main Heading */}
          <FadeInWhenVisible delay={0.2}>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-primary leading-tight">
              {HERO_CONTENT.title}
              <br />
              <span className="bg-primary bg-clip-text text-transparent">
                {HERO_CONTENT.subtitle}
              </span>
            </h1>
          </FadeInWhenVisible>

          {/* Description */}
          <FadeInWhenVisible delay={0.4}>
            <p className="text-base md:text-lg lg:text-xl text-primary/95 mb-10 leading-relaxed max-w-3xl mx-auto font-light">
              {HERO_CONTENT.description}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 justify-center items-center">
              {HERO_CONTENT.buttons.map((button, index) => (
                <Link to={button.path} key={index}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant={button.variant}
                      size="lg"
                      className="bg-gradient-to-r from-[#156874] to-[#0d4a52] hover:from-[#0d4a52] hover:to-[#156874] text-white shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl px-8 py-4 text-base font-semibold"
                    >
                      {button.label}
                    </Button>
                  </motion.div>
                </Link>
              ))}
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
  );
}

export default HeroSection;
