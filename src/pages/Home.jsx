import React from "react";
import Hero from "../components/Hero";
import TileSection from "../components/TileSection";
// Можливо, ще якісь CSS файли, якщо вони специфічні для головної

const Home = () => {
  return (
    <>
      <Hero />
      <TileSection />
    </>
  );
};

export default Home;
