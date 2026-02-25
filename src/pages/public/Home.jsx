import React from "react";
import HomeHero from "../../components/home/HomeHero";
import ServicesSection from "../../components/home/ServicesSection";
import MostRequestedSection from "../../components/home/MostRequestedSection"

export default function Home() {
  return (
    <div className="min-h-screen  ">
      <HomeHero />
      <ServicesSection />
      <MostRequestedSection/>
    </div>
  );
}
