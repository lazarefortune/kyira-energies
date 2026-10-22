"use client";

import { useEffect } from "react";

import { syncAnalyticsConsentFromStorage } from "@/lib/analytics";

type PostHogProviderProps = {
  children: React.ReactNode;
};

/**
 * Initialise PostHog uniquement si le consentement est déjà accepté.
 * Session Replay : désactivé jusqu’à `startSessionRecording()` après consentement.
 * Masquage : tous les inputs + blocage Turnstile via `ph-no-capture` / blockSelector.
 */
export function PostHogProvider({ children }: PostHogProviderProps) {
  useEffect(() => {
    syncAnalyticsConsentFromStorage();
  }, []);

  return children;
}
