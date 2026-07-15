"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { landingContent } from "@/content/landing";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import {
  easeOut,
  motionDelay,
  motionDuration,
  motionViewport,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

function FAQTitle({ title, accent }: { title: string; accent?: string }) {
  if (!accent || !title.includes(accent)) {
    return <>{title}</>;
  }

  const [before, after] = title.split(accent);

  return (
    <>
      {before}
      <span className="font-editorial-new text-primary-500 font-medium italic">
        {accent}
      </span>
      {after}
    </>
  );
}

export function FAQSection() {
  const { faq } = landingContent;
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 28,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: motionDuration(prefersReducedMotion, 0.55),
        ease: easeOut,
      },
    },
  };

  const fadeLeft = {
    hidden: {
      opacity: 0,
      x: -32,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: motionDuration(prefersReducedMotion, 0.6),
        ease: easeOut,
      },
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: motionDelay(prefersReducedMotion, 0.1),
        delayChildren: motionDelay(prefersReducedMotion, 0.08),
      },
    },
  };

  const faqStagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: motionDelay(prefersReducedMotion, 0.08),
        delayChildren: motionDelay(prefersReducedMotion, 0.12),
      },
    },
  };

  return (
    <section
      id={faq.id}
      aria-labelledby="faq-title"
      className="bg-surface py-16 sm:py-20"
    >
      <Container as="div">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16 xl:gap-20">
          <motion.div
            className="lg:sticky lg:top-28"
            initial="hidden"
            whileInView="visible"
            viewport={motionViewport}
            variants={staggerContainer}
          >
            <motion.p
              variants={fadeLeft}
              className="inline-flex rounded-md border border-border bg-primary-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary"
            >
              {faq.eyebrow}
            </motion.p>

            <motion.h2
              id="faq-title"
              variants={fadeLeft}
              className="mt-5 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl lg:leading-tight"
            >
              <FAQTitle title={faq.title} accent={faq.titleAccent} />
            </motion.h2>

            {faq.description ? (
              <motion.p
                variants={fadeLeft}
                className="mt-5 max-w-md text-base leading-relaxed text-muted"
              >
                {faq.description}
              </motion.p>
            ) : null}

            <motion.div variants={fadeLeft} className="mt-8 hidden lg:block">
              <Button href={faq.cta.href} size="lg">
                {faq.cta.label}
              </Button>
            </motion.div>
          </motion.div>

          <motion.ul
            className="divide-y divide-border"
            initial="hidden"
            whileInView="visible"
            viewport={motionViewport}
            variants={faqStagger}
          >
            {faq.items.map((item, index) => {
              const isOpen = openIndex === index;
              const panelId = `faq-panel-${index}`;
              const buttonId = `faq-button-${index}`;

              return (
                <motion.li key={item.question} variants={fadeUp}>
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className={cn(
                        "flex w-full cursor-pointer items-center justify-between gap-6 py-4 text-left text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:py-5 sm:text-lg",
                        isOpen
                          ? "text-primary"
                          : "text-foreground hover:text-primary",
                      )}
                    >
                      <span>{item.question}</span>
                      <span
                        aria-hidden
                        className={cn(
                          "flex size-6 shrink-0 items-center justify-center text-xl leading-none transition-colors duration-200",
                          isOpen ? "text-primary" : "text-foreground",
                        )}
                      >
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                  </h3>
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    aria-hidden={!isOpen}
                    initial={false}
                    animate={{
                      height: isOpen ? "auto" : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{
                      duration: motionDuration(prefersReducedMotion, 0.25),
                      ease: easeOut,
                    }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-2xl pb-4 text-sm leading-relaxed text-muted sm:pb-5 sm:text-base">
                      {item.answer}
                    </p>
                  </motion.div>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </Container>
    </section>
  );
}
