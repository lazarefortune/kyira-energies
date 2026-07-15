"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

import { CookieConsentBanner } from "@/components/analytics/CookieConsentBanner";
import { CookiePreferencesModal } from "@/components/analytics/CookiePreferencesModal";
import { applyAnalyticsConsent } from "@/lib/analytics";
import {
  getConsent,
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

  const handleAccept = () => {
    applyAnalyticsConsent("accepted");
    dismissBanner();
  };

  const handleReject = () => {
    applyAnalyticsConsent("rejected");
    dismissBanner();
  };

  useEffect(() => {
    const onOpenPreferences = () => {
      setIsPreferencesOpen(true);
    };

    window.addEventListener(OPEN_COOKIE_PREFERENCES_EVENT, onOpenPreferences);
    return () => {
      window.removeEventListener(
        OPEN_COOKIE_PREFERENCES_EVENT,
        onOpenPreferences,
      );
    };
  }, []);

  return (
    <>
      <CookieConsentBanner
        isVisible={isBannerVisible}
        onAccept={handleAccept}
        onReject={handleReject}
        onManagePreferences={() => setIsPreferencesOpen(true)}
      />
      <CookiePreferencesModal
        isOpen={isPreferencesOpen}
        onClose={() => setIsPreferencesOpen(false)}
        onConsentApplied={handleConsentApplied}
      />
    </>
  );
}
