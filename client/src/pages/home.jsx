import { useState } from "react";
import { Loader } from "@/components/ui/loader";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { Navbar } from "@/components/layout/navbar";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { ServicesSection } from "@/components/sections/services-section";
import { MarqueeSection } from "@/components/sections/marquee-section";
import { FAQSection } from "@/components/sections/faq-section";

import { Footer } from "@/components/layout/footer";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useSmoothScroll();

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="overflow-x-hidden">
      {/* <Loader /> */}
      <CustomCursor />
      <Navbar toggleMenu={toggleMenu} />
      <MobileMenu isOpen={mobileMenuOpen} onClose={closeMenu} />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <MarqueeSection />
      <FAQSection />
      <Footer />
    </div>
  );
}
