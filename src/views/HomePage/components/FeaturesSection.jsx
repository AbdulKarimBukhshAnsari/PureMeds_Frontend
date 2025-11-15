import { FadeInWhenVisible, ScaleInWhenVisible } from "../../../components/ui/Animation/ScrollAnimation";
import { FEATURES, SECTION_TITLES } from "../../../constants/home.constants";

function FeaturesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <FadeInWhenVisible>
          <h2 className="text-3xl font-semibold text-center mb-12">
            {SECTION_TITLES.features}
          </h2>
        </FadeInWhenVisible>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
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
  );
}

export default FeaturesSection;
