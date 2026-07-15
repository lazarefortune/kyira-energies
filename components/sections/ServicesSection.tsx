"use client";

import { motion, useReducedMotion } from "motion/react";

import { landingContent } from "@/content/landing";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { ctaArrowIcon, serviceIcons } from "@/lib/icons";
import { cn } from "@/lib/utils";

const easeOut = [0.22, 1, 0.36, 1] as const;

const viewport = { once: false, amount: 0.2 } as const;

export function ServicesSection() {
  const { services } = landingContent;
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 28,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.55,
        ease: easeOut,
      },
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
        delayChildren: prefersReducedMotion ? 0 : 0.05,
      },
    },
  };

  const cardStagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.12,
        delayChildren: prefersReducedMotion ? 0 : 0.15,
      },
    },
  };

  return (
    <section
      id={services.id}
      aria-labelledby="services-title"
      className="relative overflow-hidden bg-primary py-16 sm:py-20"
    >
      <Container as="div">
        <motion.div
          className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={staggerContainer}
        >
          <motion.div
            className="mb-10 flex flex-col gap-3"
            variants={fadeUp}
          >
            <p className="mb-3 w-fit rounded-md bg-primary-foreground/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary-foreground">
              {services.eyebrow}
            </p>
            <h2
              id="services-title"
              className="text-2xl font-semibold tracking-tight text-white sm:text-3xl"
            >
              {services.title}
            </h2>
          </motion.div>
          <motion.p
            className="max-w-xl text-center text-sm leading-relaxed text-white/50 lg:mt-10"
            variants={fadeUp}
          >
            {services.description}
          </motion.p>
        </motion.div>

        <motion.ul
          className="mt-12 mb-24 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={cardStagger}
        >
          {services.items.map((item, index) => (
            <motion.li key={item.title} variants={fadeUp} className="relative">
              <div
                className={cn(
                  "relative lg:pt-0",
                  index === 0 && "lg:-translate-y-6",
                  index === 1 && "lg:translate-y-6",
                  index === 2 && "lg:-translate-y-2",
                  index === 3 && "lg:translate-y-10",
                )}
              >
                <Card
                  shadow={false}
                  className="relative z-10 flex h-full flex-col items-center rounded-md border-none py-10 text-center"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-7 top-0 z-20 h-7 w-7 bg-primary"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-0 top-7 z-20 h-7 w-7 bg-primary"
                  />
                  <span className="inline-flex items-center justify-center text-primary">
                    <Icon
                      icon={serviceIcons[index]}
                      size={30}
                      strokeWidth={1.6}
                    />
                  </span>
                  <h3 className="mb-3 mt-5 text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </Card>
              </div>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.5,
            ease: easeOut,
            delay: prefersReducedMotion ? 0 : 0.2,
          }}
        >
          <Button href={services.cta.href} variant="secondary" size="lg">
            {services.cta.label}
            <span className="ml-2 inline-flex">
              <Icon icon={ctaArrowIcon} size={18} />
            </span>
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
