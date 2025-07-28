import HeroSection from "../components/HeroSection";
import Services from "../components/Services";
import About from "../components/About";
import Product from "../components/product";
import CatalogueSection from "../components/catalogue";
import AcrossTheWorld from "../components/AcrossTheWorld";
import Clients from "../components/Clients";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <About />
      <Product />
      <CatalogueSection />
      <AcrossTheWorld />
      <Clients />
      <Services />
    </>
  );
}
