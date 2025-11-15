import { motion } from "framer-motion";
import { FadeInWhenVisible } from "../../../components/ui/Animation/ScrollAnimation";
import { BLOCKCHAIN_STEPS, SECTION_TITLES } from "../../../constants/home.constants";

function BlockchainSection() {
  return (
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
              {SECTION_TITLES.blockchain.title}
            </h2>
            <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
              {SECTION_TITLES.blockchain.subtitle}
            </p>
          </div>
        </FadeInWhenVisible>

        {/* Steps Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {BLOCKCHAIN_STEPS.map((step, index) => (
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
  );
}

export default BlockchainSection;
