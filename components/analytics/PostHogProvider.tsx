"use client";

import posthog from "posthog-js";
import { useEffect } from "react";

import { syncAnalyticsConsentFromStorage } from "@/lib/analytics";

type PostHogProviderProps = {
  children: React.ReactNode;
};

/**
 * Initialise PostHog en opt-out par défaut.
 * Session Replay : désactivé jusqu’à `startSessionRecording()` après consentement.
 * Masquage : tous les inputs + blocage Turnstile via `ph-no-capture` / blockSelector.
 */
export function PostHogProvider({ children }: PostHogProviderProps) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

    if (!key || !host) return;
    if (posthog.__loaded) return;

    posthog.init(key, {
      api_host: host,
      opt_out_capturing_by_default: true,
      capture_pageview: true,
      autocapture: false,
      disable_session_recording: true,
      person_profiles: "never",
      session_recording: {
        maskAllInputs: true,
        // Classes supportées par posthog-js (defaults rrweb) : ph-no-capture, ph-mask
        blockSelector:
          '[data-ph-block="turnstile"], .cf-turnstile, iframe[src*="challenges.cloudflare.com"]',
        recordHeaders: false,
        recordBody: false,
      },
    });

    syncAnalyticsConsentFromStorage();
  }, []);

  return children;
}
