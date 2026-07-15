"use client";

import { motion, useReducedMotion } from "motion/react";

import { landingContent } from "@/content/landing";
import { ContactForm } from "@/components/sections/ContactForm";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import {
  easeOut,
  motionDelay,
  motionDuration,
  motionViewport,
} from "@/lib/motion";

function ContactTitle({ title, accent }: { title: string; accent: string }) {
  if (!title.includes(accent)) {
    return <>{title}</>;
  }

  const [before, after] = title.split(accent);

  return (
    <>
      {before}
      <span className="font-editorial-new font-medium italic text-primary-400">
        {accent}
      </span>
      {after}
    </>
  );
}

export function ContactSection() {
  const { contact } = landingContent;
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

  const fadeRight = {
    hidden: {
      opacity: 0,
      x: 32,
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

  return (
    <section
      id={contact.id}
      aria-labelledby="contact-title"
      className="relative overflow-hidden bg-primary pt-24 pb-20 sm:pt-44 sm:pb-32"
    >
      <div
        className="pointer-events-none absolute inset-x-0 -top-px"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 64"
          preserveAspectRatio="none"
          className="h-12 w-full sm:h-14 lg:h-16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,0 H1440 V16 C1280,8 1180,6 1080,8 C980,12 860,28 720,26 C580,24 440,12 280,14 C140,16 0,20 0,22 Z"
            className="fill-white"
          />
        </svg>
      </div>

      <Container as="div" className="relative z-10">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-8">
          <motion.div
            className="min-w-0 max-w-2xl"
            initial="hidden"
            whileInView="visible"
            viewport={motionViewport}
            variants={staggerContainer}
          >
            <motion.p
              variants={fadeUp}
              className="mb-2.5 w-fit rounded-md bg-primary-foreground/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground"
            >
              {contact.eyebrow}
            </motion.p>
            <motion.h2
              id="contact-title"
              variants={fadeUp}
              className="text-2xl font-semibold tracking-tight text-primary-foreground sm:text-3xl"
            >
              <ContactTitle
                title={contact.title}
                accent={contact.titleAccent}
              />
            </motion.h2>
            <motion.p
              variants={fadeLeft}
              className="mt-3 text-sm leading-relaxed text-primary-foreground/75 sm:text-base"
            >
              {contact.description}
            </motion.p>
          </motion.div>

          <motion.div
            className="min-w-0 w-full"
            initial="hidden"
            whileInView="visible"
            viewport={motionViewport}
            variants={fadeRight}
          >
            <Card
              shadow={false}
              className="w-full max-w-full overflow-hidden border-primary-foreground/10 bg-white p-4 sm:p-5"
            >
              <ContactForm />
            </Card>
          </motion.div>
        </div>
      </Container>
      <div className="absolute right-5 bottom-0 h-5 w-5 bg-white"></div>
      <div className="absolute right-0 bottom-5 h-5 w-5 bg-white"></div>
    </section>
  );
}
