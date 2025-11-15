import {
  QrCode,
  Shield,
  TrendingUp,
  Users,
  Award,
  Clock,
  CheckCircle2,
} from "lucide-react";

export const FEATURES = [
  {
    icon: Shield,
    title: "100% Authentic",
    description:
      "Every medicine is verified and authenticated through our blockchain system.",
  },
  {
    icon: QrCode,
    title: "Easy Verification",
    description:
      "Scan the QR code on any medicine to instantly verify its authenticity.",
  },
  {
    icon: TrendingUp,
    title: "Complete Transparency",
    description:
      "Track the entire supply chain from ingredients to delivery.",
  },
];

export const STATS = [
  {
    icon: Users,
    value: "10K+",
    label: "Happy Customers",
    color: "from-[#156874] to-[#0d4a52]",
  },
  {
    icon: Award,
    value: "500+",
    label: "Verified Medicines",
    color: "from-[#156874] to-[#0d4a52]",
  },
  {
    icon: Clock,
    value: "24/7",
    label: "Support Available",
    color: "from-[#156874] to-[#0d4a52]",
  },
  {
    icon: CheckCircle2,
    value: "100%",
    label: "Authentic Guarantee",
    color: "from-[#156874] to-[#0d4a52]",
  },
];

export const BLOCKCHAIN_STEPS = [
  {
    title: "Medicine Registration",
    description:
      "Each medicine is registered on the blockchain with unique identifiers and manufacturing details",
    icon: Shield,
  },
  {
    title: "Supply Chain Tracking",
    description:
      "Every movement from manufacturer to distributor is recorded immutably on the blockchain",
    icon: TrendingUp,
  },
  {
    title: "QR Code Generation",
    description:
      "A unique QR code is generated containing all blockchain verification data for each package",
    icon: QrCode,
  },
  {
    title: "Instant Verification",
    description:
      "Scan the QR code to instantly verify authenticity and view complete supply chain history",
    icon: CheckCircle2,
  },
];

export const HERO_CONTENT = {
  title: "Authentic Medicines,",
  subtitle: "Verified by Blockchain",
  description:
    "Experience complete transparency in pharmaceutical supply chain. Every medicine verified, tracked, and authenticated through blockchain technology to ensure you receive only genuine medications.",
  buttons: [
    { label: "Shop Now", path: "/categories", variant: "primary" },
    { label: "Verify Medicine", path: "/verify", variant: "primary" },
  ],
};

export const SECTION_TITLES = {
  features: "Why Choose PureMeds?",
  blockchain: {
    title: "How it works",
    subtitle: "PureMeds can help you verify and track your medicine authenticity",
  },
  featured: {
    badge: "Our Products",
    title: "Featured Medicines",
    subtitle: "Browse our verified medicine collection",
    viewAllText: "View All",
  },
  verification: {
    title: "Verify Your Medicine",
    description:
      "Scan the QR code to instantly verify authenticity and ensure you're getting genuine products.",
    buttonText: "Scan QR Code",
  },
  cta: {
    title: "Ready to Experience Authentic Healthcare?",
    description:
      "Join thousands of satisfied customers who trust PureMeds for their healthcare needs.",
    buttonText: "Start Shopping",
  },
};
