import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Buttons/Button";
import { FadeInWhenVisible } from "../../../components/ui/Animation/ScrollAnimation";
import { SECTION_TITLES } from "../../../constants/home.constants";
import  img  from "../../../assets/bg19.png";

function CTASection() {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
              Ready to Experience <span className="font-bold bg-gradient-to-r from-primary via-orange-400 to-primary bg-clip-text text-transparent">Authentic Healthcare?</span>
            </h2>
            <p className="text-gray-600 mb-6">
              {SECTION_TITLES.cta.description}
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
                  className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg px-6 py-3 font-semibold"
                >
                  {SECTION_TITLES.cta.buttonText}
                  <ArrowRight size={18} className="ml-2 inline" />
                </Button>
              </motion.div>
            </Link>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}

export default CTASection;
