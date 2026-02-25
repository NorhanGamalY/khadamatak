import React from "react";
import LandingHero from "../../components/landing/LandingHero";
import WhyChooseUsSection from "../../components/landing/WhyChooseUsSection";
import OurServicesSection from "../../components/landing/OurServicesSection";
import TestimonialsSection from "../../components/landing/TestimonialsSection";
import QualityGuaranteeSection from "../../components/landing/QualityGuaranteeSection";
import CtaSection from "../../components/landing/CtaSection";
export default function Home() {
  return (
    <div className="min-h-screen  ">
      <LandingHero />
      <WhyChooseUsSection />
      <OurServicesSection />
      <TestimonialsSection />
      <QualityGuaranteeSection />
      <CtaSection />
    </div>
  );
}
