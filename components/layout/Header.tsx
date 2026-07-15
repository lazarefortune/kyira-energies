"use client";

import { heroHeaderVariant } from "@/lib/site-variant";

import { HeaderClassic } from "./Header.classic";
import { HeaderSplit } from "./Header.split";

export function Header() {
  return heroHeaderVariant === "split" ? <HeaderSplit /> : <HeaderClassic />;
}
