import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { PlayerSection } from "./components/new/PlayerSection";
import { CarouselSection } from "./components/new/CarouselSection";
import { ParallexSection } from "./components/new/ParallexSection";

function App() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden bg-valorantbackground">
      <NavBar />
      <Hero />
      <About />
      <Features />
      <PlayerSection />
      <CarouselSection />
      <Story />
      <ParallexSection />
      <Contact />
      <Footer />
    </main>
  );
}

export default App;
