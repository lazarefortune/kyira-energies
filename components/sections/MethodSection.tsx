"use client";

import Image from "next/image";
import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

import { landingContent } from "@/content/landing";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { methodIcons } from "@/lib/icons";
import {
  easeOut,
  motionDelay,
  motionDuration,
  motionViewport,
} from "@/lib/motion";
import type { MethodStep } from "@/types/landing";

const stepperVariants = {
  unlit: {
    borderColor: "#e2e8f0",
    backgroundColor: "#ffffff",
    color: "#94a3b8",
    scale: 0.9,
    boxShadow: "0 0 0 0px rgba(21, 46, 75, 0)",
  },
  lit: {
    borderColor: "#152e4b",
    backgroundColor: "#152e4b",
    color: "#ffffff",
    scale: 1,
    boxShadow: "0 0 0 4px rgba(21, 46, 75, 0.14)",
  },
} as const;

function useTimelineActiveStep(
  stepCount: number,
  stepRefs: RefObject<(HTMLLIElement | null)[]>,
) {
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const updateActiveStep = () => {
      const trigger = window.innerHeight * 0.58;
      let nextActive = -1;

      for (let index = 0; index < stepCount; index += 1) {
        const element = stepRefs.current[index];
        if (!element) continue;

        const indicator = element.querySelector<HTMLElement>(
          "[data-step-indicator]",
        );
        const markerTop = indicator
          ? indicator.getBoundingClientRect().top +
            indicator.getBoundingClientRect().height / 2
          : element.getBoundingClientRect().top;

        if (markerTop <= trigger) {
          nextActive = index;
        }
      }

      const timeline = stepRefs.current[0]?.parentElement;
      if (timeline && nextActive === -1) {
        const { top, bottom } = timeline.getBoundingClientRect();
        if (top < window.innerHeight * 0.9 && bottom > 0) {
          nextActive = 0;
        }
      }

      setActiveIndex(nextActive);
    };

    updateActiveStep();
    window.addEventListener("scroll", updateActiveStep, { passive: true });
    window.addEventListener("resize", updateActiveStep, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateActiveStep);
      window.removeEventListener("resize", updateActiveStep);
    };
  }, [stepCount, stepRefs]);

  return activeIndex;
}

function MethodStepCard({
  step,
  iconIndex,
  variants,
}: {
  step: MethodStep;
  iconIndex: number;
  variants?: Variants;
}) {
  return (
    <motion.article
      variants={variants}
      className="relative flex h-full flex-col rounded-2xl border border-border bg-surface px-6 py-8"
    >
      <div className="flex items-start justify-between gap-4">
        <p className="text-3xl font-semibold text-primary-600">{step.step}</p>
        <Icon
          icon={methodIcons[iconIndex]}
          size={68}
          strokeWidth={1.5}
          className="absolute top-5 right-5 text-primary-200"
        />
      </div>
      <h3 className="mt-10 text-lg font-semibold text-foreground">{step.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        {step.description}
      </p>
    </motion.article>
  );
}

const MethodTimelineStep = forwardRef<
  HTMLLIElement,
  {
    step: MethodStep;
    iconIndex: number;
    variants?: Variants;
    isLit: boolean;
    isSegmentLit: boolean;
    isLast: boolean;
    prefersReducedMotion: boolean | null;
  }
>(function MethodTimelineStep(
  {
    step,
    iconIndex,
    variants,
    isLit,
    isSegmentLit,
    isLast,
    prefersReducedMotion,
  },
  ref,
) {
  return (
    <motion.li
      ref={ref}
      variants={variants}
      className="relative flex gap-4 not-last:pb-6"
    >
      <div className="flex w-10 shrink-0 flex-col items-center">
        <motion.div
          data-step-indicator
          initial="unlit"
          animate={isLit ? "lit" : "unlit"}
          variants={stepperVariants}
          transition={{
            duration: motionDuration(prefersReducedMotion, 0.45),
            ease: easeOut,
          }}
          className="relative z-10 flex size-10 items-center justify-center rounded-full border-2 text-xs font-semibold"
          aria-hidden
        >
          {step.step}
        </motion.div>
        {!isLast ? (
          <div className="relative mt-2 w-px flex-1 min-h-6">
            <div className="absolute inset-0 bg-border" aria-hidden />
            <motion.div
              className="absolute inset-0 origin-top bg-primary"
              initial={false}
              animate={{ scaleY: isSegmentLit ? 1 : 0 }}
              transition={{
                duration: motionDuration(prefersReducedMotion, 0.5),
                ease: easeOut,
              }}
              aria-hidden
            />
          </div>
        ) : null}
      </div>
      <article className="min-w-0 flex-1 rounded-2xl border border-border bg-surface px-5 py-5 shadow-sm">
        <div className="flex items-start gap-3">
          <Icon
            icon={methodIcons[iconIndex]}
            size={22}
            strokeWidth={1.75}
            className="mt-0.5 shrink-0 text-primary"
          />
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-foreground">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {step.description}
            </p>
          </div>
        </div>
      </article>
    </motion.li>
  );
});

function MethodMobileTimeline({
  steps,
  fadeUp,
  columnStagger,
  prefersReducedMotion,
}: {
  steps: MethodStep[];
  fadeUp: Variants;
  columnStagger: Variants;
  prefersReducedMotion: boolean | null;
}) {
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const activeIndex = useTimelineActiveStep(steps.length, stepRefs);

  return (
    <motion.ol
      className="relative mt-12 lg:hidden"
      initial="hidden"
      whileInView="visible"
      viewport={motionViewport}
      variants={columnStagger}
      aria-label="Étapes de la méthode"
    >
      {steps.map((step, index) => (
        <MethodTimelineStep
          key={step.step}
          ref={(element) => {
            stepRefs.current[index] = element;
          }}
          step={step}
          iconIndex={index}
          variants={fadeUp}
          isLit={activeIndex >= index}
          isSegmentLit={activeIndex > index}
          isLast={index === steps.length - 1}
          prefersReducedMotion={prefersReducedMotion}
        />
      ))}
    </motion.ol>
  );
}

export function MethodSection() {
  const { method } = landingContent;
  const leftSteps = method.steps.slice(0, 2);
  const rightSteps = method.steps.slice(2, 4);
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
  } satisfies Variants;

  const fadeLeft = {
    hidden: {
      opacity: 0,
      x: -32,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: motionDuration(prefersReducedMotion, 0.55),
        ease: easeOut,
      },
    },
  } satisfies Variants;

  const fadeRight = {
    hidden: {
      opacity: 0,
      x: 32,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: motionDuration(prefersReducedMotion, 0.55),
        ease: easeOut,
      },
    },
  } satisfies Variants;

  const fadeScale = {
    hidden: {
      opacity: 0,
      scale: 0.96,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: motionDuration(prefersReducedMotion, 0.65),
        ease: easeOut,
      },
    },
  } satisfies Variants;

  const headerStagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: motionDelay(prefersReducedMotion, 0.1),
        delayChildren: motionDelay(prefersReducedMotion, 0.05),
      },
    },
  } satisfies Variants;

  const columnStagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: motionDelay(prefersReducedMotion, 0.12),
        delayChildren: motionDelay(prefersReducedMotion, 0.1),
      },
    },
  } satisfies Variants;

  const gridStagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: motionDelay(prefersReducedMotion, 0.15),
        delayChildren: motionDelay(prefersReducedMotion, 0.15),
      },
    },
  } satisfies Variants;

  return (
    <section
      id={method.id}
      aria-labelledby="method-title"
      className="border-y border-border bg-primary-100 py-16 sm:py-20"
    >
      <Container as="div">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          variants={headerStagger}
        >
          <motion.p
            variants={fadeUp}
            className="inline-flex rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-foreground"
          >
            {method.eyebrow}
          </motion.p>
          <motion.h2
            id="method-title"
            variants={fadeUp}
            className="mt-5 text-2xl font-medium tracking-tight text-foreground sm:text-3xl lg:text-4xl"
          >
            {method.title}{" "}
            <span className="text-primary-500 font-editorial-new italic font-medium">
              {method.titleAccent}
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted"
          >
            {method.description}
          </motion.p>
        </motion.div>

        <MethodMobileTimeline
          steps={method.steps}
          fadeUp={fadeUp}
          columnStagger={columnStagger}
          prefersReducedMotion={prefersReducedMotion}
        />

        <motion.div
          className="mt-12 hidden gap-6 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(240px,300px)_minmax(0,1fr)] lg:items-stretch lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          variants={gridStagger}
        >
          <motion.div className="flex flex-col gap-6" variants={columnStagger}>
            {leftSteps.map((step, index) => (
              <MethodStepCard
                key={step.step}
                step={step}
                iconIndex={index}
                variants={fadeLeft}
              />
            ))}
          </motion.div>

          <motion.div
            variants={fadeScale}
            className="relative overflow-hidden rounded-2xl lg:h-full lg:min-h-0"
          >
            <Image
              src={method.image}
              alt={method.imageAlt}
              fill
              quality={90}
              sizes="(max-width: 1024px) 100vw, 1200px"
              className="object-cover object-center"
            />
          </motion.div>

          <motion.div className="flex flex-col gap-6" variants={columnStagger}>
            {rightSteps.map((step, index) => (
              <MethodStepCard
                key={step.step}
                step={step}
                iconIndex={index + 2}
                variants={fadeRight}
              />
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
