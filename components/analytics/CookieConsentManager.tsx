"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

import { CookieConsentBanner } from "@/components/analytics/CookieConsentBanner";
import { CookiePreferencesModal } from "@/components/analytics/CookiePreferencesModal";
import { ANALYTICS_EVENTS, applyAnalyticsConsent, trackEvent } from "@/lib/analytics";
import {
  getConsent,
  hasAcceptedConsent,
  OPEN_COOKIE_PREFERENCES_EVENT,
} from "@/lib/consent";

function subscribe() {
  return () => {};
}

function getNeedsConsentSnapshot() {
  return getConsent() === null;
}

function getServerSnapshot() {
  return false;
}

export function CookieConsentManager() {
  const needsConsent = useSyncExternalStore(
    subscribe,
    getNeedsConsentSnapshot,
    getServerSnapshot,
  );
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  const isBannerVisible =
    needsConsent && !bannerDismissed && !isPreferencesOpen;

  const dismissBanner = useCallback(() => {
    setBannerDismissed(true);
  }, []);

  const handleConsentApplied = useCallback(() => {
    dismissBanner();
  }, [dismissBanner]);

  const openPreferences = useCallback(() => {
    // Uniquement si le consentement analytique est déjà actif.
    if (hasAcceptedConsent()) {
      trackEvent(ANALYTICS_EVENTS.COOKIE_PREFERENCES_OPENED);
    }
    setIsPreferencesOpen(true);
  }, []);

  const handleAccept = () => {
    applyAnalyticsConsent("accepted");
    // Après opt_in uniquement.
    trackEvent(ANALYTICS_EVENTS.COOKIE_CONSENT_ACCEPTED);
    dismissBanner();
  };

  const handleReject = () => {
    // Aucun événement PostHog de refus.
    applyAnalyticsConsent("rejected");
    dismissBanner();
  };

  useEffect(() => {
    const onOpenPreferences = () => {
      openPreferences();
    };

    window.addEventListener(OPEN_COOKIE_PREFERENCES_EVENT, onOpenPreferences);
    return () => {
      window.removeEventListener(
        OPEN_COOKIE_PREFERENCES_EVENT,
        onOpenPreferences,
      );
    };
  }, [openPreferences]);

  return (
    <>
      <CookieConsentBanner
        isVisible={isBannerVisible}
        onAccept={handleAccept}
        onReject={handleReject}
        onManagePreferences={openPreferences}
      />
      <CookiePreferencesModal
        isOpen={isPreferencesOpen}
        onClose={() => setIsPreferencesOpen(false)}
        onConsentApplied={handleConsentApplied}
      />
    </>
  );
}
