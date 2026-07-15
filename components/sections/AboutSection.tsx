"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { landingContent } from "@/content/landing";
import { Container } from "@/components/ui/Container";
import { Icon } from "../ui/Icon";
import { aboutHighlightIcon } from "@/lib/icons";
import {
  easeOut,
  motionDelay,
  motionDuration,
  motionViewport,
} from "@/lib/motion";

function AboutTitle({ title, accent }: { title: string; accent: string }) {
  if (!title.includes(accent)) {
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

export function AboutSection() {
  const { about } = landingContent;
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

  const fadeRight = {
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

  const highlightStagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: motionDelay(prefersReducedMotion, 0.08),
        delayChildren: motionDelay(prefersReducedMotion, 0.2),
      },
    },
  };

  return (
    <section
      id={about.id}
      aria-labelledby="about-title"
      className="border-y border-border bg-surface py-16 sm:py-20"
    >
      <Container as="div">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
          <motion.div
            className="relative mx-auto w-full lg:mx-0"
            initial="hidden"
            whileInView="visible"
            viewport={motionViewport}
            variants={fadeRight}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
              <Image
                src={about.image}
                alt={about.imageAlt}
                fill
                quality={95}
                sizes="(max-width: 1024px) 90vw, (max-width: 1280px) 45vw, 560px"
                className="object-cover object-center"
              />
              <div className="absolute top-0 left-7 h-7 w-7 bg-white"></div>
              <div className="absolute top-7 left-0 h-7 w-7 bg-white"></div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={motionViewport}
            variants={staggerContainer}
          >
            <motion.p
              variants={fadeUp}
              className="inline-flex rounded-md border border-border bg-primary-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary"
            >
              {about.eyebrow}
            </motion.p>

            <motion.h2
              id="about-title"
              variants={fadeUp}
              className="mt-5 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl lg:leading-tight"
            >
              <AboutTitle title={about.title} accent={about.titleAccent} />
            </motion.h2>

            <motion.div variants={fadeUp} className="mt-6 space-y-5">
              {about.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-base leading-relaxed text-muted"
                >
                  {paragraph}
                </p>
              ))}
            </motion.div>

            <motion.ul
              className="mt-9 grid gap-3.5 sm:grid-cols-1"
              variants={highlightStagger}
            >
              {about.highlights.map((highlight) => (
                <motion.li
                  key={highlight}
                  variants={fadeUp}
                  className="flex items-center gap-3.5"
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary-600 text-xs font-semibold text-primary-foreground">
                    <Icon icon={aboutHighlightIcon} size={16} strokeWidth={2.5} />
                  </span>
                  <span className="min-w-0 flex-1 text-base leading-snug text-foreground">
                    {highlight}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
