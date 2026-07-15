"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { landingContent } from "@/content/landing";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { ctaArrowIcon } from "@/lib/icons";
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
        className="absolute inset-0 bg-linear-to-t from-zinc-900/90 via-zinc-900/78 to-zinc-900/55"
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: motionDuration(prefersReducedMotion, 0.8),
          delay: motionDelay(prefersReducedMotion, 0.1),
          ease: easeOut,
        }}
      />

      <Container
        as="div"
        className="relative flex min-h-screen items-center justify-start pt-28 pb-16 sm:pt-32 sm:pb-24 md:items-end lg:pt-36 lg:pb-28"
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
            className="mt-5 max-w-2xl text-sm leading-relaxed text-white/50"
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
        </motion.div>
      </Container>
    </section>
  );
}
