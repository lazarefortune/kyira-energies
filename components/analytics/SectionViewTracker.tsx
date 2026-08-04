"use client";

import { useEffect, useRef } from "react";

import {
  ANALYTICS_EVENTS,
  SECTION_VIEW_TARGETS,
  type TrackedSectionName,
  trackEvent,
} from "@/lib/analytics";

const VISIBILITY_RATIO = 0.45;
const VISIBILITY_DWELL_MS = 750;

/**
 * Observe les sections listées et émet `section_viewed` une fois par section
 * et par chargement de page (IntersectionObserver, sans listener de scroll global).
 */
export function SectionViewTracker() {
  const seenRef = useRef(new Set<TrackedSectionName>());

  useEffect(() => {
    const timers = new Map<TrackedSectionName, number>();
    const observers: IntersectionObserver[] = [];

    for (const { sectionId, sectionName } of SECTION_VIEW_TARGETS) {
      const element = document.getElementById(sectionId);
      if (!element) continue;

      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry) return;

          if (seenRef.current.has(sectionName)) {
            observer.unobserve(element);
            return;
          }

          if (entry.isIntersecting && entry.intersectionRatio >= VISIBILITY_RATIO) {
            if (timers.has(sectionName)) return;

            const timerId = window.setTimeout(() => {
              timers.delete(sectionName);
              if (seenRef.current.has(sectionName)) return;

              seenRef.current.add(sectionName);
              trackEvent(ANALYTICS_EVENTS.SECTION_VIEWED, {
                section_name: sectionName,
              });
              observer.unobserve(element);
            }, VISIBILITY_DWELL_MS);

            timers.set(sectionName, timerId);
            return;
          }

          const pending = timers.get(sectionName);
          if (pending !== undefined) {
            window.clearTimeout(pending);
            timers.delete(sectionName);
          }
        },
        { threshold: [0, VISIBILITY_RATIO, 0.5, 0.75, 1] },
      );

      observer.observe(element);
      observers.push(observer);
    }

    return () => {
      for (const timerId of timers.values()) {
        window.clearTimeout(timerId);
      }
      timers.clear();
      for (const observer of observers) {
        observer.disconnect();
      }
    };
  }, []);

  return null;
}
