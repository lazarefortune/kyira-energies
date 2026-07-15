"use client";

import { motion, useReducedMotion } from "motion/react";

import { landingContent } from "@/content/landing";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import {
  testimonialQuoteIcon,
  testimonialSmileIcon,
} from "@/lib/icons";
import {
  easeOut,
  motionDelay,
  motionDuration,
  motionViewport,
} from "@/lib/motion";
import type { TestimonialItem } from "@/types/landing";

function WaveTop() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 -top-px z-20"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="h-16 w-full sm:h-20 lg:h-24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,0 H1440 V28 C1260,88 1020,118 720,118 C420,118 180,88 0,28 Z"
          className="fill-background"
        />
      </svg>
    </div>
  );
}

function WaveBottom() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 -bottom-px z-20"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="h-16 w-full sm:h-20 lg:h-24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,120 H1440 V92 C1260,32 1020,2 720,2 C420,2 180,32 0,92 Z"
          className="fill-surface"
        />
      </svg>
    </div>
  );
}

function DecorativeShapes() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <span className="absolute top-[22%] left-[8%] size-3 rotate-45 border border-primary-foreground/15" />
      <span className="absolute top-[18%] right-[12%] size-2 rounded-full bg-primary-foreground/10" />
      <span className="absolute top-[48%] left-[4%] h-4 w-8 rounded-full border border-primary-foreground/10" />
      <span className="absolute right-[6%] bottom-[38%] size-3 rotate-12 border border-primary-foreground/12" />
      <span className="absolute bottom-[28%] left-[14%] size-1.5 rounded-full bg-primary-foreground/15" />
      <span className="absolute top-[60%] right-[22%] size-2 rotate-45 bg-primary-foreground/8" />
    </div>
  );
}

function TestimonialCard({ item }: { item: TestimonialItem }) {
  return (
    <article className="relative flex h-full flex-col rounded-2xl bg-primary-foreground/10 px-6 pb-14 pt-6 sm:px-7 sm:pb-16 sm:pt-7">
      <Icon
        icon={testimonialQuoteIcon}
        size={28}
        strokeWidth={2}
        className="text-primary-300"
      />
      <h3 className="mt-4 text-lg font-semibold text-primary-foreground sm:text-xl">
        {item.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-primary-foreground/80 sm:text-base">
        {item.quote}
      </p>
      <div className="mt-6 flex items-end justify-end gap-3 pr-10 sm:pr-12">
        <div className="text-right">
          <p className="text-sm font-semibold text-primary-foreground">
            {item.author}
          </p>
          <p className="mt-0.5 text-xs text-primary-foreground/65">{item.role}</p>
        </div>
      </div>
      <span
        className="absolute -bottom-5 right-5 flex size-12 items-center justify-center rounded-full border-2 border-primary bg-primary-700 text-sm font-semibold text-primary-foreground sm:right-6 sm:size-14 sm:text-base"
        aria-hidden="true"
      >
        {item.initials}
      </span>
    </article>
  );
}

export function TestimonialsSection() {
  const { testimonials } = landingContent;
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

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: motionDelay(prefersReducedMotion, 0.1),
        delayChildren: motionDelay(prefersReducedMotion, 0.08),
      },
    },
  };

  const cardStagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: motionDelay(prefersReducedMotion, 0.12),
        delayChildren: motionDelay(prefersReducedMotion, 0.15),
      },
    },
  };

  return (
    <section
      id={testimonials.id}
      aria-labelledby="testimonials-stat"
      className="relative overflow-hidden bg-primary pt-28 pb-32 sm:pt-36 sm:pb-40"
    >
      <WaveTop />
      <WaveBottom />
      <DecorativeShapes />

      <p
        className="pointer-events-none absolute inset-x-0 top-[18%] z-0 text-center font-heading text-[18vw] font-bold leading-none tracking-tight text-primary-foreground/[0.06] select-none sm:top-[16%] sm:text-[12rem]"
        aria-hidden="true"
      >
        {testimonials.watermark}
      </p>

      <Container as="div" className="relative z-10">
        <motion.header
          className="mx-auto flex max-w-md flex-col items-center text-center"
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          variants={staggerContainer}
        >
          <motion.span
            variants={fadeUp}
            className="mb-2 inline-flex text-primary-300"
          >
            <Icon icon={testimonialSmileIcon} size={28} strokeWidth={1.75} />
          </motion.span>
          <motion.p
            id="testimonials-stat"
            variants={fadeUp}
            className="font-heading text-5xl font-bold tracking-tight text-primary-foreground sm:text-6xl"
          >
            {testimonials.statValue}
            <span className="ml-1 text-4xl sm:text-5xl">
              {testimonials.statSuffix}
            </span>
          </motion.p>
          <motion.span
            variants={fadeUp}
            className="mt-3 h-0.5 w-8 rounded-full bg-primary-300"
            aria-hidden="true"
          />
          <motion.p
            variants={fadeUp}
            className="mt-3 text-base text-primary-foreground/90 sm:text-lg"
          >
            {testimonials.statLabel}
          </motion.p>
        </motion.header>

        <motion.ul
          className="mx-auto mt-12 grid max-w-4xl gap-10 sm:mt-16 sm:grid-cols-2 sm:gap-8 lg:mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          variants={cardStagger}
        >
          {testimonials.items.map((item) => (
            <motion.li key={item.author} variants={fadeUp} className="h-full">
              <TestimonialCard item={item} />
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
