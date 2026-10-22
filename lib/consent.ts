export const COOKIE_CONSENT_KEY = "kyira_cookie_consent";
export const OPEN_COOKIE_PREFERENCES_EVENT = "kyira:open-cookie-preferences";

/** Durée de conservation du choix : 6 mois. */
export const COOKIE_CONSENT_MAX_AGE_SECONDS = 6 * 30 * 24 * 60 * 60;

export type CookieConsentValue = "accepted" | "rejected";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function isConsentValue(value: string | null | undefined): value is CookieConsentValue {
  return value === "accepted" || value === "rejected";
}

function readCookie(name: string): string | null {
  if (!isBrowser()) return null;

  const prefix = `${encodeURIComponent(name)}=`;
  const parts = document.cookie.split("; ");

  for (const part of parts) {
    if (part.startsWith(prefix)) {
      return decodeURIComponent(part.slice(prefix.length));
    }
  }

  return null;
}

function writeConsentCookie(value: CookieConsentValue): void {
  if (!isBrowser()) return;

  const secure =
    window.location.protocol === "https:" ? "; Secure" : "";

  document.cookie = [
    `${encodeURIComponent(COOKIE_CONSENT_KEY)}=${encodeURIComponent(`v2:${value}`)}`,
    "Path=/",
    `Max-Age=${COOKIE_CONSENT_MAX_AGE_SECONDS}`,
    "SameSite=Lax",
    secure,
  ]
    .filter(Boolean)
    .join("; ");
}

/** Les choix antérieurs à la politique de 6 mois doivent être renouvelés. */
export function getConsent(): CookieConsentValue | null {
  if (!isBrowser()) return null;

  const fromCookie = readCookie(COOKIE_CONSENT_KEY);
  const currentValue = fromCookie?.startsWith("v2:")
    ? fromCookie.slice(3)
    : null;
  if (isConsentValue(currentValue)) {
    return currentValue;
  }

  if (fromCookie !== null) {
    document.cookie = `${encodeURIComponent(COOKIE_CONSENT_KEY)}=; Path=/; Max-Age=0; SameSite=Lax`;
  }
  try {
    window.localStorage.removeItem(COOKIE_CONSENT_KEY);
  } catch {
    // Ignore localStorage errors (mode privé strict, etc.).
  }
  return null;
}

export function setConsent(value: CookieConsentValue): void {
  if (!isBrowser()) return;

  writeConsentCookie(value);

  try {
    window.localStorage.removeItem(COOKIE_CONSENT_KEY);
  } catch {
    // Ignore localStorage errors (mode privé strict, etc.).
  }
}

export function hasAcceptedConsent(): boolean {
  return getConsent() === "accepted";
}

export function hasRejectedConsent(): boolean {
  return getConsent() === "rejected";
}

export function hasStoredConsent(): boolean {
  return getConsent() !== null;
}

/** Ouvre la modale de préférences cookies depuis n’importe quel composant client. */
export function openCookiePreferences(): void {
  if (!isBrowser()) return;
  window.dispatchEvent(new CustomEvent(OPEN_COOKIE_PREFERENCES_EVENT));
}
