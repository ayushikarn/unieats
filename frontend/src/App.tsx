import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CampusFood from "./components/CampusFood";
import AIIntro from "./components/AIIntro";
import FeatureCards from "./components/FeatureCards";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CampusFood />
        <AIIntro />
        <FeatureCards />
      </main>
      <Footer />
    </>
  );
}
