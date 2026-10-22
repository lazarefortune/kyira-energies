"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { landingContent } from "@/content/landing";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { trustedByIcon } from "@/lib/icons";
import {
  easeOut,
  motionDelay,
  motionDuration,
  motionViewport,
} from "@/lib/motion";
import type { TrustedByLogoItem } from "@/types/landing";

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

function TrustedByTitle({ title, accent }: { title: string; accent?: string }) {
  if (!accent || !title.includes(accent)) {
    return <>{title}</>;
  }

  const [before, after] = title.split(accent);

  return (
    <>
      {before}
      <span className="font-instrument-serif font-normal italic text-primary-300">
        {accent}
      </span>
      {after}
    </>
  );
}

function LogoCard({ item }: { item: TrustedByLogoItem }) {
  return (
    <article className="relative flex h-full min-h-28 items-center justify-center rounded-2xl bg-primary-foreground/10 px-6 py-8 sm:min-h-32 sm:px-7 sm:py-10">
      {item.logo ? (
        <Image
          src={item.logo}
          alt={item.alt}
          width={160}
          height={64}
          className="h-10 w-auto max-w-36 object-contain opacity-90 sm:h-12 sm:max-w-44"
        />
      ) : (
        <span className="text-center text-sm font-semibold tracking-wide text-primary-foreground/55 sm:text-base">
          {item.name}
        </span>
      )}
    </article>
  );
}

export function TestimonialsSection() {
  const { trustedBy } = landingContent;
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
        staggerChildren: motionDelay(prefersReducedMotion, 0.1),
        delayChildren: motionDelay(prefersReducedMotion, 0.15),
      },
    },
  };

  return (
    <section
      id={trustedBy.id}
      aria-labelledby="trusted-by-title"
      className="relative overflow-hidden bg-primary pt-28 pb-32 sm:pt-36 sm:pb-40"
    >
      <WaveTop />
      <WaveBottom />
      <DecorativeShapes />

      <p
        className="pointer-events-none absolute inset-x-0 top-[18%] z-0 text-center font-heading text-[12vw] font-bold leading-none tracking-tight text-primary-foreground/6 select-none sm:top-[16%] sm:text-[10rem]"
        aria-hidden="true"
      >
        {trustedBy.watermark}
      </p>

      <Container as="div" className="relative z-10">
        <motion.header
          className="mx-auto flex max-w-2xl flex-col items-center text-center"
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          variants={staggerContainer}
        >
          <motion.span
            variants={fadeUp}
            className="mb-2 inline-flex text-primary-300"
          >
            <Icon icon={trustedByIcon} size={28} strokeWidth={1.75} />
          </motion.span>
          <motion.h2
            id="trusted-by-title"
            variants={fadeUp}
            className="font-heading text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl"
          >
            <TrustedByTitle
              title={trustedBy.title}
              accent={trustedBy.titleAccent}
            />
          </motion.h2>
          <motion.span
            variants={fadeUp}
            className="mt-3 h-0.5 w-8 rounded-full bg-primary-300"
            aria-hidden="true"
          />
          {trustedBy.description ? (
            <motion.p
              variants={fadeUp}
              className="mt-3 max-w-md text-base text-primary-foreground/90 sm:text-lg"
            >
              {trustedBy.description}
            </motion.p>
          ) : null}
        </motion.header>

        <motion.ul
          className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 sm:mt-16 sm:grid-cols-3 sm:gap-6 lg:mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          variants={cardStagger}
        >
          {trustedBy.items.map((item) => (
            <motion.li key={item.name} variants={fadeUp} className="h-full">
              <LogoCard item={item} />
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
