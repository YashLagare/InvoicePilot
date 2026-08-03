import Comparison from "@/components/landing/Comparison";
import CTA from "@/components/landing/CTA";
import FeatureGrid from "@/components/landing/FeatureGrid";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import Navbar from "@/components/landing/Navbar";
import ProductPreview from "@/components/landing/ProductPreview";
import Workflow from "@/components/landing/Workflow";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground transition-colors duration-200">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ProductPreview />
        <FeatureGrid />
        <Workflow />
        <Comparison />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
