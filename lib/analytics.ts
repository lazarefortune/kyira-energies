import posthog from "posthog-js";

import {
  captureFirstTouchAttribution,
  clearFirstTouchAttribution,
  getFirstTouchAttribution,
} from "@/lib/analytics-utm";
import {
  hasAcceptedConsent,
  setConsent,
  type CookieConsentValue,
} from "@/lib/consent";

/** Registre central des événements analytics (anglais, snake_case, orientés action). */
export const ANALYTICS_EVENTS = {
  LOGO_CLICKED: "logo_clicked",
  NAVIGATION_LINK_CLICKED: "navigation_link_clicked",
  MOBILE_MENU_OPENED: "mobile_menu_opened",
  HERO_PRIMARY_CTA_CLICKED: "hero_primary_cta_clicked",
  HERO_SECONDARY_CTA_CLICKED: "hero_secondary_cta_clicked",
  SECTION_VIEWED: "section_viewed",
  FAQ_ITEM_OPENED: "faq_item_opened",
  CONTACT_FORM_STARTED: "contact_form_started",
  CONTACT_FORM_SUBMIT_ATTEMPTED: "contact_form_submit_attempted",
  CONTACT_FORM_VALIDATION_FAILED: "contact_form_validation_failed",
  CONTACT_FORM_SUBMITTED: "contact_form_submitted",
  CONTACT_FORM_FAILED: "contact_form_failed",
  COOKIE_CONSENT_ACCEPTED: "cookie_consent_accepted",
  COOKIE_PREFERENCES_OPENED: "cookie_preferences_opened",
  COOKIE_PREFERENCES_SAVED: "cookie_preferences_saved",
} as const;

export type AnalyticsEventName =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

export const CONTACT_FAILURE_REASONS = [
  "validation_error",
  "turnstile_missing",
  "turnstile_failed",
  "network_error",
  "server_error",
  "email_send_failed",
  "unknown",
] as const;

export type ContactFailureReason = (typeof CONTACT_FAILURE_REASONS)[number];

export const TRACKED_SECTION_NAMES = [
  "hero",
  "about",
  "solution",
  "method",
  "sectors",
  "faq",
  "contact",
] as const;

export type TrackedSectionName = (typeof TRACKED_SECTION_NAMES)[number];

/** DOM id → nom analytique de section. */
export const SECTION_VIEW_TARGETS = [
  { sectionId: "accueil", sectionName: "hero" },
  { sectionId: "a-propos", sectionName: "about" },
  { sectionId: "solution", sectionName: "solution" },
  { sectionId: "methode", sectionName: "method" },
  { sectionId: "secteurs", sectionName: "sectors" },
  { sectionId: "faq", sectionName: "faq" },
  { sectionId: "contact", sectionName: "contact" },
] as const satisfies ReadonlyArray<{
  sectionId: string;
  sectionName: TrackedSectionName;
}>;

export type ViewportCategory = "mobile" | "tablet" | "desktop";

type PrimitiveProperty = string | number | boolean;

export type AnalyticsEventProperties = Record<string, PrimitiveProperty>;

const CONVERSION_EVENTS = new Set<AnalyticsEventName>([
  ANALYTICS_EVENTS.HERO_PRIMARY_CTA_CLICKED,
  ANALYTICS_EVENTS.CONTACT_FORM_STARTED,
  ANALYTICS_EVENTS.CONTACT_FORM_SUBMITTED,
]);

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function sanitizePath(pathname: string): string {
  // Garde uniquement le chemin — jamais la query (paramètres sensibles possibles).
  if (!pathname.startsWith("/")) {
    return "/";
  }
  return pathname.slice(0, 200);
}

export function getViewportCategory(): ViewportCategory {
  if (!isBrowser()) return "desktop";

  const width = window.innerWidth;
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

function getReferrerDomain(): string | undefined {
  if (!isBrowser() || !document.referrer) return undefined;
  try {
    return new URL(document.referrer).hostname.slice(0, 200) || undefined;
  } catch {
    return undefined;
  }
}

/**
 * Propriétés de contexte non sensibles, communes à tous les événements.
 * Ne jamais y placer d’URL complète avec query string.
 */
export function getCommonEventProperties(): AnalyticsEventProperties {
  if (!isBrowser()) return {};

  const props: AnalyticsEventProperties = {
    page_path: sanitizePath(window.location.pathname),
    viewport_category: getViewportCategory(),
  };

  const title = document.title.trim();
  if (title) {
    props.page_title = title.slice(0, 200);
  }

  const referrerDomain = getReferrerDomain();
  if (referrerDomain) {
    props.referrer_domain = referrerDomain;
  }

  return props;
}

function buildEventProperties(
  name: AnalyticsEventName,
  properties?: AnalyticsEventProperties,
): AnalyticsEventProperties {
  const merged: AnalyticsEventProperties = {
    ...getCommonEventProperties(),
    ...properties,
  };

  if (CONVERSION_EVENTS.has(name)) {
    const attribution = getFirstTouchAttribution();
    for (const [key, value] of Object.entries(attribution)) {
      if (value && merged[key] === undefined) {
        merged[key] = value;
      }
    }
  }

  return merged;
}

function enableAnalyticsCapture(): void {
  captureFirstTouchAttribution();
  posthog.opt_in_capturing();
  posthog.startSessionRecording();
}

/**
 * Arrête le replay, opt-out, puis reset local.
 * `reset()` remet le consentement PostHog en PENDING : on réapplique
 * `opt_out_capturing()` immédiatement. Avec `opt_out_capturing_by_default`,
 * aucun événement ne part pendant ni après cette séquence.
 */
function disableAnalyticsCapture(): void {
  posthog.stopSessionRecording();
  posthog.opt_out_capturing();
  posthog.reset(true);
  posthog.opt_out_capturing();
  clearFirstTouchAttribution();
}

/**
 * Enregistre le choix de consentement et active ou désactive PostHog + Replay.
 * Ne capture aucun événement PostHog de refus.
 */
export function applyAnalyticsConsent(value: CookieConsentValue): void {
  setConsent(value);

  if (!isBrowser()) return;
  if (!posthog.__loaded) return;

  if (value === "accepted") {
    enableAnalyticsCapture();
  } else {
    disableAnalyticsCapture();
  }
}

/**
 * Réapplique l’état PostHog au chargement (après init).
 */
export function syncAnalyticsConsentFromStorage(): void {
  if (!isBrowser()) return;
  if (!posthog.__loaded) return;

  if (hasAcceptedConsent()) {
    enableAnalyticsCapture();
  } else {
    // Refus explicite ou aucun choix : rester opt-out, pas de replay.
    posthog.stopSessionRecording();
    posthog.opt_out_capturing();
  }
}

/**
 * Capture un événement PostHog uniquement si le consentement est accepté.
 * Ne pas transmettre de données personnelles.
 */
export function trackEvent(
  name: AnalyticsEventName,
  properties?: AnalyticsEventProperties,
): void {
  if (!isBrowser()) return;
  if (!hasAcceptedConsent()) return;
  if (!posthog.__loaded) return;
  if (posthog.has_opted_out_capturing()) return;

  posthog.capture(name, buildEventProperties(name, properties));
}

/**
 * Mappe les raisons d’échec API/client vers l’enum contrôlée.
 */
export function toContactFailureReason(
  reason: string | undefined,
): ContactFailureReason {
  switch (reason) {
    case "validation":
    case "validation_error":
      return "validation_error";
    case "turnstile_missing":
      return "turnstile_missing";
    case "turnstile":
    case "turnstile_failed":
      return "turnstile_failed";
    case "network_error":
      return "network_error";
    case "config":
    case "server_error":
      return "server_error";
    case "send":
    case "email_send_failed":
      return "email_send_failed";
    default:
      return "unknown";
  }
}
