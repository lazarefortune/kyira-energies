"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { applyAnalyticsConsent } from "@/lib/analytics";
import { getConsent, type CookieConsentValue } from "@/lib/consent";
import { easeOut, motionDuration } from "@/lib/motion";
import { cn } from "@/lib/utils";

type CookiePreferencesModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConsentApplied: () => void;
};

export function CookiePreferencesModal({
  isOpen,
  onClose,
  onConsentApplied,
}: CookiePreferencesModalProps) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <CookiePreferencesModalContent
          key="cookie-preferences-modal"
          onClose={onClose}
          onConsentApplied={onConsentApplied}
        />
      ) : null}
    </AnimatePresence>
  );
}

type CookiePreferencesModalContentProps = {
  onClose: () => void;
  onConsentApplied: () => void;
};

function CookiePreferencesModalContent({
  onClose,
  onConsentApplied,
}: CookiePreferencesModalContentProps) {
  const titleId = useId();
  const descriptionId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [analyticsEnabled, setAnalyticsEnabled] = useState(
    () => getConsent() === "accepted",
  );

  useEffect(() => {
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const applyAndClose = (value: CookieConsentValue) => {
    applyAnalyticsConsent(value);
    onConsentApplied();
    onClose();
  };

  const handleSave = () => {
    applyAndClose(analyticsEnabled ? "accepted" : "rejected");
  };

  return (
    <motion.div
      className="fixed inset-0 z-70 flex items-end justify-center p-4 sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          duration: motionDuration(prefersReducedMotion, 0.2),
        },
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: motionDuration(prefersReducedMotion, 0.15),
        },
      }}
    >
      <button
        type="button"
        aria-label="Fermer la gestion des cookies"
        className="absolute inset-0 bg-primary/40"
        onClick={onClose}
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-xl border border-border bg-white shadow-[0_16px_48px_rgba(21,46,75,0.18)]"
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            duration: motionDuration(prefersReducedMotion, 0.35),
            ease: easeOut,
          },
        }}
        exit={{
          opacity: 0,
          y: 12,
          transition: {
            duration: motionDuration(prefersReducedMotion, 0.2),
            ease: easeOut,
          },
        }}
      >
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
          <div className="min-w-0 space-y-1">
            <h2
              id={titleId}
              className="text-lg font-semibold tracking-tight text-foreground"
            >
              Gestion des cookies
            </h2>
            <p
              id={descriptionId}
              className="text-sm leading-relaxed text-muted"
            >
              Vous pouvez modifier votre choix concernant les cookies de mesure
              d&apos;audience à tout moment.
            </p>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4 px-5 py-5 sm:px-6">
          <div className="rounded-lg border border-border bg-surface-muted/50 p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 space-y-1">
                <p className="text-sm font-semibold text-foreground">
                  Cookies nécessaires
                </p>
                <p className="text-sm leading-relaxed text-muted">
                  Ils permettent de mémoriser votre choix de consentement et
                  d&apos;assurer le bon fonctionnement du site.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={true}
                aria-disabled={true}
                disabled
                aria-label="Cookies nécessaires toujours actifs"
                className="relative mt-0.5 inline-flex h-6 w-11 shrink-0 cursor-not-allowed items-center rounded-full bg-primary opacity-60"
              >
                <span
                  aria-hidden="true"
                  className="inline-block size-5 translate-x-5 rounded-full bg-white shadow"
                />
              </button>
            </div>
          </div>

          <div className="rounded-lg border border-border p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 space-y-1">
                <p className="text-sm font-semibold text-foreground">
                  Mesure d&apos;audience
                </p>
                <p className="text-sm leading-relaxed text-muted">
                  Ces cookies nous aident à comprendre l&apos;utilisation du
                  site afin d&apos;améliorer son contenu.
                </p>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={analyticsEnabled}
                aria-label="Activer ou désactiver la mesure d'audience"
                onClick={() => setAnalyticsEnabled((prev) => !prev)}
                className={cn(
                  "relative mt-0.5 inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                  analyticsEnabled ? "bg-primary" : "bg-border",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "inline-block size-5 rounded-full bg-white shadow transition-transform",
                    analyticsEnabled ? "translate-x-5" : "translate-x-0.5",
                  )}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 border-t border-border px-5 py-4 sm:justify-end sm:gap-3 sm:px-6">
          <div className="flex w-full items-center gap-2 sm:w-auto">
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={() => applyAndClose("rejected")}
              className="order-2 w-full sm:order-2 sm:w-auto"
            >
              Tout refuser
            </Button>
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={() => applyAndClose("accepted")}
              className="order-1 w-full sm:order-3 sm:w-auto"
            >
              Tout accepter
            </Button>
          </div>
          <Button
            type="button"
            variant="link"
            size="md"
            onClick={handleSave}
            className="w-full"
          >
            Enregistrer mes choix
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
