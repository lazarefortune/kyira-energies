"use client";

import posthog from "posthog-js";
import { useEffect } from "react";

import { getConsent } from "@/lib/consent";

type PostHogProviderProps = {
  children: React.ReactNode;
};

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
    });

    const consent = getConsent();
    if (consent === "accepted") {
      posthog.opt_in_capturing();
    } else if (consent === "rejected") {
      posthog.opt_out_capturing();
    }
  }, []);

  return children;
}
