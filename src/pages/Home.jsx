import React from "react";
import Particles from "../components/Particles";
import Navbar from "../components/Navbar";
import AboutSection from "../components/AboutSection";
import FeaturesSection from "../components/FeaturesSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

function Home() {
  return (
    <div>
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "fixed",
          zIndex: -1,
          backgroundColor: "black",
        }}
      >
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      <Navbar />
      <AboutSection />
      <FeaturesSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default Home;
