import React from "react";
import AboutHero from "../../components/about/AboutHero";
import StatsHero from "../../components/about/StatsHero";
import VisionMissionBanners from "../../components/about/VisionMissionBanners";
import QualityAssuranceSection from "../../components/about/QualityAssuranceSection";
import TeamContactSection from "../../components/about/TeamContactSection";


export default function About() {
  return (
    <div className="min-h-screen ">
      <AboutHero />
      <StatsHero />
      <VisionMissionBanners />
      <QualityAssuranceSection />
      <TeamContactSection />
    </div>
  );
}
