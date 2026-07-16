"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/Button";
import { easeOut, motionDuration } from "@/lib/motion";

type CookieConsentBannerProps = {
  isVisible: boolean;
  onAccept: () => void;
  onReject: () => void;
  onManagePreferences: () => void;
};

export function CookieConsentBanner({
  isVisible,
  onAccept,
  onReject,
  onManagePreferences,
}: CookieConsentBannerProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          key="cookie-consent-banner"
          role="dialog"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-description"
          className="fixed inset-x-0 bottom-0 z-60 p-4 sm:p-6"
          initial={{
            opacity: 0,
            y: 28,
          }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              duration: motionDuration(prefersReducedMotion, 0.45),
              ease: easeOut,
            },
          }}
          exit={{
            opacity: 0,
            y: 16,
            transition: {
              duration: motionDuration(prefersReducedMotion, 0.25),
              ease: easeOut,
            },
          }}
        >
          <div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-xl border border-border bg-white p-4 shadow-[0_8px_30px_rgba(21,46,75,0.12)] sm:flex-row sm:items-center sm:gap-6 sm:p-5">
            <div className="min-w-0 flex-1 space-y-2">
              <p
                id="cookie-consent-title"
                className="text-base font-semibold text-foreground"
              >
                Cookies de mesure d&apos;audience
              </p>
              <p
                id="cookie-consent-description"
                className="text-sm leading-relaxed text-muted"
              >
                Nous utilisons des cookies pour mesurer l&apos;audience et
                améliorer le site.{" "}
                <Link
                  href="/politique-confidentialite"
                  className="font-medium text-primary-700 underline-offset-2 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  En savoir plus
                </Link>
              </p>
            </div>

            <div className="flex w-full shrink-0 flex-wrap items-center gap-2 sm:w-auto sm:justify-end sm:gap-3">
              <Button
                type="button"
                variant="link"
                size="md"
                onClick={onManagePreferences}
                aria-label="Gérer mes préférences cookies"
                className="order-3 w-full sm:order-1 sm:w-auto"
              >
                Gérer mes préférences
              </Button>
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={onReject}
                aria-label="Refuser les cookies de mesure d'audience"
                className="order-2 w-full sm:order-2 sm:w-auto"
              >
                Refuser
              </Button>
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={onAccept}
                aria-label="Accepter les cookies de mesure d'audience"
                className="order-1 w-full sm:order-3 sm:w-auto"
              >
                Accepter
              </Button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
