import PricingCard from "./PricingCard";
import { Package } from "../types";
import Layout from "./Layout";
import Navbar from "./Navbar";

const packages: Package[] = [
  {
    name: "Basic",
    description: "For beginners to learn the basics of swimming",
    price: "€29",
    features: [
      "Free beginner lessons once a week",
      "Basic swim techniques.",
      "Suitable for all ages, from kids to adults.",
      "Beginner-level group sessions",
    ],
  },
  {
    name: "Standard",
    description:
      "For swimmers who want to improve their techniques and build endurance.",
    price: "€49",
    features: [
      "4-Hour Group Lesson",
      "Comprehensive Skill Development",
      "Stroke Correction",
      "Certificate of Participation",
    ],
  },
  {
    name: "Pro",
    description:
      "For advanced swimmers seeking to take their abilities to the next level.",
    price: "€99",
    features: [
      "Full-Day Workshop (8 hours)",
      "Advanced Stroke Techniques",
      "Personalized Coaching",
      "Video Analysis and Evaluation",
    ],
  },
];

const Pricing = () => {
  return (
    <Layout>
      <Navbar />
      <PricingCard packages={packages} />
    </Layout>
  );
};

export default Pricing;
