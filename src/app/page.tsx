import HeroSection from "../components/HeroSection";
import Services from "../components/Services";
import About from "../components/About";
import Product from "../components/product";
import CatalogueSection from "../components/catalogue";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <About />
      <Product />
      <CatalogueSection />
      <Services />

    </>
  );
}
