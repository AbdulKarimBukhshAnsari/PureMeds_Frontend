import { motion } from "framer-motion";
import { QrCode } from "lucide-react";
import { Link } from "react-router-dom";
import { FadeInWhenVisible } from "../../../components/ui/Animation/ScrollAnimation";
import { SECTION_TITLES } from "../../../constants/home.constants";

function VerificationBanner() {
  return (
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
                {SECTION_TITLES.verification.title}
              </h3>
              <p className="text-base md:text-lg text-white/95 mb-6 drop-shadow-md max-w-md mx-auto">
                {SECTION_TITLES.verification.description}
              </p>
              <Link to={"/verify"}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <button className="bg-white text-[#156874] hover:bg-[#f7fffd] shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl px-8 py-3 flex items-center gap-2 font-semibold text-base">
                    <QrCode size={20} />
                    {SECTION_TITLES.verification.buttonText}
                  </button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}

export default VerificationBanner;
