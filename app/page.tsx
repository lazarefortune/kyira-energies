import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinancingSection } from "@/components/sections/FinancingSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { MethodSection } from "@/components/sections/MethodSection";
import { SectorsSection } from "@/components/sections/SectorsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
// TODO: réactiver la section "Ils m'ont fait confiance"
// import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { SectionViewTracker } from "@/components/analytics/SectionViewTracker";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <FinancingSection />
      <MethodSection />
      <SectorsSection />
      {/* <TestimonialsSection /> */}
      <FAQSection />
      <ContactSection />
      <SectionViewTracker />
    </main>
  );
}
