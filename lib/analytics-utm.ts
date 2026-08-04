/**
 * Attribution first-touch (UTM + referrer_domain).
 * Aucune URL complète ni donnée personnelle n’est stockée.
 */

const STORAGE_KEY = "kyira_analytics_attribution";
const TTL_MS = 30 * 24 * 60 * 60 * 1000;

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export type AttributionPropertyKey = (typeof UTM_KEYS)[number] | "referrer_domain";

export type FirstTouchAttribution = Partial<
  Record<AttributionPropertyKey, string>
>;

type StoredAttribution = {
  capturedAt: number;
  values: FirstTouchAttribution;
};

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function parseReferrerDomain(referrer: string): string | undefined {
  if (!referrer) return undefined;
  try {
    return new URL(referrer).hostname || undefined;
  } catch {
    return undefined;
  }
}

function readStored(): StoredAttribution | null {
  if (!isBrowser()) return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed: unknown = JSON.parse(raw);
    if (
      !parsed ||
      typeof parsed !== "object" ||
      !("capturedAt" in parsed) ||
      !("values" in parsed) ||
      typeof (parsed as StoredAttribution).capturedAt !== "number" ||
      typeof (parsed as StoredAttribution).values !== "object" ||
      (parsed as StoredAttribution).values === null
    ) {
      return null;
    }

    return parsed as StoredAttribution;
  } catch {
    return null;
  }
}

function writeStored(data: StoredAttribution): void {
  if (!isBrowser()) return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Ignore storage errors (private mode, quota, etc.).
  }
}

function isExpired(capturedAt: number): boolean {
  return Date.now() - capturedAt > TTL_MS;
}

function readUtmsFromLocation(): FirstTouchAttribution {
  if (!isBrowser()) return {};

  const params = new URLSearchParams(window.location.search);
  const values: FirstTouchAttribution = {};

  for (const key of UTM_KEYS) {
    const value = params.get(key)?.trim();
    if (value) {
      values[key] = value.slice(0, 200);
    }
  }

  const referrerDomain = parseReferrerDomain(document.referrer);
  if (referrerDomain) {
    values.referrer_domain = referrerDomain.slice(0, 200);
  }

  return values;
}

function hasAnyValue(values: FirstTouchAttribution): boolean {
  return Object.keys(values).length > 0;
}

/**
 * Enregistre l’attribution first-touch si absente ou expirée.
 * N’écrase jamais une attribution encore valide.
 * À appeler uniquement après acceptation du consentement analytique.
 */
export function captureFirstTouchAttribution(): void {
  if (!isBrowser()) return;

  const existing = readStored();
  if (existing && !isExpired(existing.capturedAt) && hasAnyValue(existing.values)) {
    return;
  }

  const values = readUtmsFromLocation();
  if (!hasAnyValue(values)) {
    if (existing && isExpired(existing.capturedAt)) {
      clearFirstTouchAttribution();
    }
    return;
  }

  writeStored({
    capturedAt: Date.now(),
    values,
  });
}

/** Retourne l’attribution first-touch encore valide, sinon `{}`. */
export function getFirstTouchAttribution(): FirstTouchAttribution {
  const existing = readStored();
  if (!existing) return {};
  if (isExpired(existing.capturedAt)) {
    clearFirstTouchAttribution();
    return {};
  }
  return { ...existing.values };
}

export function clearFirstTouchAttribution(): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore.
  }
}
