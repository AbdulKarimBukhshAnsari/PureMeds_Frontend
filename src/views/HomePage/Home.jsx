import React from "react";
import { useAuth } from "@clerk/clerk-react";
import HeroSection from "./components/HeroSection";
import BlockchainSection from "./components/BlockchainSection";
import StatsSection from "./components/StatsSection";
import FeaturedProducts from "./components/FeaturedProducts";
import VerificationBanner from "./components/VerificationBanner";
import CTASection from "./components/CTASection";
import { useFetchProduct } from "../../hooks/useFetchProduct";

function Home() {
  const { getToken } = useAuth();
  const [token, setToken] = React.useState(null);

  // Get authentication token (optional)
  React.useEffect(() => {
    const fetchToken = async () => {
      try {
        const authToken = await getToken({ template: "puremeds" });
        setToken(authToken);
      } catch (error) {
        // User not authenticated, continue without token
        console.log("User not authenticated, continuing without token");
        setToken(null);
      }
    };
    fetchToken();
  }, [getToken]);

  // Fetch featured products (3 items) - works without authentication
  const { products: featuredProducts, loading: featuredLoading } =
    useFetchProduct({
      featured: true,
      token,
      autoFetch: true,
    });

  console.log("Featured Products:", featuredProducts);

  return (
    <div>
      <HeroSection />
      <BlockchainSection />
      <StatsSection />
      <FeaturedProducts products={featuredProducts} loading={featuredLoading} />
      <VerificationBanner />
      <CTASection />
    </div>
  );
}

export default Home;
