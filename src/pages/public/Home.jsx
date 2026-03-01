import React from "react";
import HomeHero from "../../components/Home/HomeHero";
import ServicesSection from "../../components/Home/ServicesSection";
import MostRequestedSection from "../../components/Home/MostRequestedSection";
import StatsSection from "../../components/Home/StatsSection";
export default function Home() {
  return (
    <div className="min-h-screen  ">
      <HomeHero />
      <ServicesSection />
      <MostRequestedSection />
      <StatsSection />
    </div>
  );
}
