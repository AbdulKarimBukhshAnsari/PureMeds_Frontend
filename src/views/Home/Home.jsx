import React from "react";
import Button from "../../components/ui/Button";
import { QrCode, Shield, TrendingUp } from "lucide-react";
import bgImage from "../../assets/bg6.png"

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-background py-14">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-semibold mb-4">
                Buy 100% Authentic Medicines
              </h1>
              <p className="text-xl mb-6 font-medium">
                Verified by PureMeds blockchain technology for your safety and
                peace of mind.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="accent" size="lg">
                  Shop Now
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-white text-white hover:bg-white/10"
                >
                  Verify Medicine
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src={bgImage}
                alt="Authentic medicines"
                className="rounded-lg  h-auto max-w-sm"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Why Choose PureMeds?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">100% Authentic</h3>
              <p className="text-gray-600">
                Every medicine is verified and authenticated through our
                blockchain system.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <QrCode size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Verification</h3>
              <p className="text-gray-600">
                Scan the QR code on any medicine to instantly verify its
                authenticity.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Complete Transparency
              </h3>
              <p className="text-gray-600">
                Track the entire supply chain from ingredients to delivery.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Featured Products */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold">Featured Medicines</h2>
            <Button variant="outline">View All</Button>
          </div>
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div> */}
        </div>
      </section>
      {/* Verification Banner */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
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
        </div>
      </section>
    </div>
  );
}

export default Home;
