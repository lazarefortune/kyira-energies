"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Désactive le reduced-motion automatique de Motion (qui casse l'hydratation SSR).
 * On gère prefers-reduced-motion manuellement via duration: 0 dans les sections.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="never">{children}</MotionConfig>;
}
