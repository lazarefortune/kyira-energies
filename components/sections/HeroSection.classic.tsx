"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { landingContent } from "@/content/landing";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { aboutHighlightIcon, ctaArrowIcon, scrollDownIcon } from "@/lib/icons";
import { easeOut, motionDelay, motionDuration } from "@/lib/motion";

const TITLE_ACCENT = "récupération de chaleur";

function HeroTitle({ title }: { title: string }) {
  if (!title.includes(TITLE_ACCENT)) {
    return <>{title}</>;
  }

  const [before, after] = title.split(TITLE_ACCENT);

  return (
    <>
      {before}
      <span className="font-editorial-new text-primary-400 font-medium italic">
        {TITLE_ACCENT}
      </span>
      {after}
    </>
  );
}

export function HeroSectionClassic() {
  const { hero } = landingContent;
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
        staggerChildren: motionDelay(prefersReducedMotion, 0.12),
        delayChildren: motionDelay(prefersReducedMotion, 0.15),
      },
    },
  };

  return (
    <section
      id="accueil"
      aria-labelledby="hero-title"
      className="relative overflow-hidden border-b border-border"
    >
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: motionDuration(prefersReducedMotion, 1.15),
          ease: easeOut,
        }}
      >
        <Image
          src={hero.backgroundImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          aria-hidden
        />
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-linear-to-t from-zinc-900/82 via-zinc-900/62 to-zinc-900/38"
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: motionDuration(prefersReducedMotion, 0.8),
          delay: motionDelay(prefersReducedMotion, 0.1),
          ease: easeOut,
        }}
      />
      {/* Gradient latéral pour ancrer le texte à gauche sans trop noircir l’image à droite */}
      <div
        className="absolute inset-0 bg-linear-to-r from-zinc-900/55 via-zinc-900/20 to-transparent"
        aria-hidden
      />

      <Container
        as="div"
        className="relative flex min-h-svh items-center pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24"
      >
        <motion.div
          className="max-w-3xl"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1
            id="hero-title"
            variants={fadeUp}
            className="text-3xl font-semibold tracking-tight text-white drop-shadow-md sm:text-4xl lg:text-5xl lg:leading-tight"
          >
            <HeroTitle title={hero.title} />
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-[0.95rem]"
          >
            {hero.description}
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button
              href={hero.primaryCta.href}
              variant="light"
              size="lg"
              className="font-semibold"
            >
              {hero.primaryCta.label}
              <Icon icon={ctaArrowIcon} size={18} className="ml-2" />
            </Button>
            <Button
              href={hero.secondaryCta.href}
              variant="outline"
              size="lg"
              className="border-white/35 text-white hover:bg-white/10"
            >
              {hero.secondaryCta.label}
            </Button>
          </motion.div>
          <motion.ul
            variants={fadeUp}
            className="mt-6 hidden flex-wrap items-center gap-x-5 gap-y-2 sm:flex"
            aria-label="Points clés"
          >
            {hero.reassurancePoints.map((point) => (
              <li
                key={point}
                className="flex items-center gap-2 text-xs text-white/70 sm:text-[0.8125rem]"
              >
                <Icon
                  icon={aboutHighlightIcon}
                  size={14}
                  strokeWidth={2.5}
                  className="shrink-0 text-primary-400"
                  aria-hidden
                />
                <span>{point}</span>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.a
          href="#a-propos"
          aria-label="Faire défiler vers la suite"
          className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 text-white/70 transition-colors hover:text-white focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none sm:bottom-7"
          initial={{ opacity: 0 }}
          animate={
            prefersReducedMotion
              ? { opacity: 1 }
              : { opacity: 1, y: [0, 6, 0] }
          }
          transition={
            prefersReducedMotion
              ? {
                  duration: motionDuration(prefersReducedMotion, 0.4),
                  delay: motionDelay(prefersReducedMotion, 0.6),
                }
              : {
                  opacity: {
                    duration: 0.4,
                    delay: 0.6,
                  },
                  y: {
                    duration: 1.6,
                    delay: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }
          }
        >
          <Icon icon={scrollDownIcon} size={28} aria-hidden />
        </motion.a>
      </Container>
    </section>
  );
}
