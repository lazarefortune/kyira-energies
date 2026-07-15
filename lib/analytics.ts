import posthog from "posthog-js";

import {
  hasAcceptedConsent,
  setConsent,
  type CookieConsentValue,
} from "@/lib/consent";

/**
 * Enregistre le choix de consentement et active ou désactive PostHog.
 * Ne capture rien si PostHog n’est pas initialisé.
 */
export function applyAnalyticsConsent(value: CookieConsentValue): void {
  setConsent(value);

  if (typeof window === "undefined") return;
  if (!posthog.__loaded) return;

  if (value === "accepted") {
    posthog.opt_in_capturing();
  } else {
    posthog.opt_out_capturing();
  }
}

/**
 * Capture un événement PostHog uniquement si le consentement est accepté.
 * Ne pas transmettre de données personnelles (email, nom, téléphone, etc.).
 */
export function trackEvent(
  name: string,
  properties?: Record<string, string | number | boolean>,
): void {
  if (typeof window === "undefined") return;
  if (!hasAcceptedConsent()) return;
  if (!posthog.__loaded) return;

  posthog.capture(name, properties);
}

/** Événements prévus pour une V1 ultérieure (non branchés pour l’instant). */
export const PlannedAnalyticsEvents = {
  ctaClickContact: "cta_click_contact",
  ctaClickSolution: "cta_click_solution",
  faqOpened: "faq_opened",
  contactFormStarted: "contact_form_started",
  contactFormSubmitted: "contact_form_submitted",
} as const;
