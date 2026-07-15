import { heroHeaderVariant } from "@/lib/site-variant";

import { HeroSectionClassic } from "./HeroSection.classic";
import { HeroSectionSplit } from "./HeroSection.split";

export function HeroSection() {
  return heroHeaderVariant === "split" ? (
    <HeroSectionSplit />
  ) : (
    <HeroSectionClassic />
  );
}
