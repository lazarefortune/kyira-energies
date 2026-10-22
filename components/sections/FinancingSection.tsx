"use client";

import { motion, useReducedMotion } from "motion/react";

import { landingContent } from "@/content/landing";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { ctaArrowIcon } from "@/lib/icons";
import {
  easeOut,
  motionDuration,
  motionViewport,
} from "@/lib/motion";

function FinancingTitle({ title, accent }: { title: string; accent: string }) {
  if (!title.includes(accent)) {
    return <>{title}</>;
  }

  const [before, after] = title.split(accent);

  return (
    <>
      {before}
      <span className="font-instrument-serif font-normal italic text-primary-200">
        {accent}
      </span>
      {after}
    </>
  );
}

export function FinancingSection() {
  const { financing } = landingContent;
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id={financing.id}
      aria-labelledby="financing-title"
      className="bg-primary-800 py-10 sm:py-12"
    >
      <Container as="div">
        <motion.div
          className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={motionViewport}
          transition={{
            duration: motionDuration(prefersReducedMotion, 0.45),
            ease: easeOut,
          }}
        >
          <div className="min-w-0 flex-1">
            <h2
              id="financing-title"
              className="font-semibold text-center tracking-tight text-white text-2xl lg:text-3xl lg:leading-snug"
            >
              <FinancingTitle
                title={financing.title}
                accent={financing.titleAccent}
              />
            </h2>
            <p className="mt-1.5 text-center text-base leading-relaxed text-primary-foreground/70">
              {financing.supportText}
            </p>
          </div>

          {/* <Button
            href={financing.cta.href}
            variant="light"
            size="lg"
            className="shrink-0"
          >
            {financing.cta.label}
            <span className="ml-2 inline-flex">
              <Icon icon={ctaArrowIcon} size={18} />
            </span>
          </Button> */}
        </motion.div>
      </Container>
    </section>
  );
}
