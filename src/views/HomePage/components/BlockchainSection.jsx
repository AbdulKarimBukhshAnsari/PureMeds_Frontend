import { motion } from "framer-motion";
import { FadeInWhenVisible } from "../../../components/ui/Animation/ScrollAnimation";
import {
  BLOCKCHAIN_STEPS,
  SECTION_TITLES,
} from "../../../constants/home.constants";
import bgImage from "../../../assets/bg16.png";
import topRightImage from "../../../assets/bg19.png";

function BlockchainSection() {
  return (
    <section className="relative py-12 md:py-16 bg-background overflow-hidden">
      {/* Background blobs / dots */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-[300px] h-[300px] bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[200px] h-[200px] bg-orange-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <FadeInWhenVisible>
            <h2 className="text-3xl md:text-4xl font-bold text-primary leading-tight">
              {SECTION_TITLES.blockchain.title}
            </h2>

            <p className="text-gray-600 mt-3 text-base md:text-lg max-w-2xl mx-auto">
              {SECTION_TITLES.blockchain.subtitle}
            </p>

            <div className="mt-4 h-1 w-16 bg-orange-400 rounded-full mx-auto"></div>
          </FadeInWhenVisible>
        </div>

        {/* Steps Grid: 2x2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {BLOCKCHAIN_STEPS.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-xl text-center shadow-md hover:shadow-lg hover:bg-white/20 transition-all duration-300"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-orange-500/20 rounded-full mx-auto mb-3">
                <step.icon size={24} className="text-orange-400" />
              </div>

              <h3 className="text-primary font-semibold text-lg mb-1">
                {step.title}
              </h3>

              <p className="text-gray-600 text-md leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom-left Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="absolute bottom-0 left-0 w-[100px] md:w-[120px] lg:w-[160px] h-auto -translate-x-1/3 translate-y-1/4 z-0"
        >
          <img
            src={bgImage}
            alt="Blockchain Illustration"
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* Top-right Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="absolute top-0 right-0 w-[90px] md:w-[100px] lg:w-[140px] h-auto translate-x-1 -translate-y-1/4 z-0 scale-x-[-1]"
        >
          <img
            src={topRightImage}
            alt="Top Right Illustration"
            className="w-full h-full object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
}

export default BlockchainSection;
