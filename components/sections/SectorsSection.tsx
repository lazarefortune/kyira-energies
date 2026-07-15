"use client";

import { motion, useReducedMotion } from "motion/react";

import { landingContent } from "@/content/landing";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { sectorIcons } from "@/lib/icons";
import {
  easeOut,
  motionDelay,
  motionDuration,
  motionViewport,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

function SectorsTitle({ title, accent }: { title: string; accent: string }) {
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

export function SectorsSection() {
  const { sectors } = landingContent;
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
        delayChildren: motionDelay(prefersReducedMotion, 0.05),
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
      id={sectors.id}
      aria-labelledby="sectors-title"
      className="bg-background py-16 sm:py-20"
    >
      <Container as="div">
        <motion.header
          className="grid gap-4 sm:gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          variants={staggerContainer}
        >
          <motion.p
            variants={fadeUp}
            className="inline-flex w-fit rounded-md border border-border bg-primary-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary lg:pt-1"
          >
            {sectors.eyebrow}
          </motion.p>
          <motion.div variants={fadeUp}>
            <h2
              id="sectors-title"
              className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl lg:leading-tight"
            >
              <SectorsTitle
                title={sectors.title}
                accent={sectors.titleAccent}
              />
            </h2>
            {sectors.description ? (
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
                {sectors.description}
              </p>
            ) : null}
          </motion.div>
        </motion.header>

        <motion.ul
          className="mt-10 grid auto-rows-fr gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-14 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          variants={cardStagger}
        >
          {sectors.items.map((item, index) => {
            const iconOnTop = index % 2 === 0;

            const icon = (
              <span className="inline-flex size-11 items-center justify-center rounded-md bg-primary-800 text-white">
                <Icon
                  icon={sectorIcons[index]}
                  size={26}
                  strokeWidth={1.6}
                />
              </span>
            );

            const content = (
              <div>
                <h3 className="text-base font-semibold text-foreground sm:text-lg">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            );

            return (
              <motion.li key={item.title} variants={fadeUp} className="h-full">
                <Card
                  shadow={true}
                  className={cn(
                    "flex h-full flex-col gap-4 p-4 sm:justify-between sm:gap-8 sm:p-5",
                    "sm:min-h-[220px] lg:min-h-[260px]",
                  )}
                >
                  <div className={cn("order-1", !iconOnTop && "sm:order-2")}>
                    {icon}
                  </div>
                  <div className={cn("order-2", !iconOnTop && "sm:order-1")}>
                    {content}
                  </div>
                </Card>
              </motion.li>
            );
          })}
        </motion.ul>
      </Container>
    </section>
  );
}
