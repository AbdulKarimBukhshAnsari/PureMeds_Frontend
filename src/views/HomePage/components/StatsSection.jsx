import { motion } from "framer-motion";
import { STATS } from "../../../constants/home.constants";

function StatsSection() {
  return (
    <section className="py-8 md:py-10 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {STATS.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="flex flex-col items-center justify-center py-2 relative"
            >
              {index < STATS.length - 1 && (
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
  );
}

export default StatsSection;
