
import { motion } from "framer-motion";
import { QrCode } from "lucide-react";
import { Link } from "react-router-dom";
import { FadeInWhenVisible } from "../../../components/ui/Animation/ScrollAnimation";
import { SECTION_TITLES } from "../../../constants/home.constants";
import img from "../../../assets/bg17.png"; // <— your small illustration

function VerificationBanner() {
  return (
    <section className="py-14 bg-orange-400/60 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeInWhenVisible>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-5xl mx-auto bg-white rounded-2xl p-10 md:p-12 shadow-lg border border-gray-200 relative"
          >
            {/* Main content */}
            <div className="flex flex-col md:flex-row items-center justify-between md:gap-10 text-center md:text-left">
              {/* Left: QR Badge */}
              <div className="flex-shrink-0 mb-6 md:mb-0">
                <div className="bg-orange-100 p-6 rounded-2xl shadow-md border border-orange-200 inline-block">
                  <QrCode size={44} className="text-orange-500" />
                </div>
              </div>

              {/* Middle: Text */}
              <div className="flex-1 max-w-xl">
                <h3 className="text-3xl font-bold text-primary mb-3">
                  {SECTION_TITLES.verification.title}
                </h3>
                <p className="text-gray-600 text-lg">
                  {SECTION_TITLES.verification.description}
                </p>
              </div>

              {/* Right: Button */}
              <div className="mt-6 md:mt-0 flex-shrink-0">
                <Link to={"/verify"}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <button className="bg-orange-500 text-white hover:bg-orange-600 transition-all duration-300 rounded-xl px-8 py-3 flex items-center gap-2 font-semibold shadow-md">
                      <QrCode size={20} />
                      {SECTION_TITLES.verification.buttonText}
                    </button>
                  </motion.div>
                </Link>
              </div>

            </div>
          </motion.div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}

export default VerificationBanner;
