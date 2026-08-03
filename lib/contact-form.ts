export type ContactFormPayload = {
  name: string;
  company: string;
  email: string;
  phone?: string;
  message: string;
  turnstileToken: string;
  /** Honeypot — doit rester vide. */
  website?: string;
};

export type ContactFormResult =
  | { ok: true }
  | {
      ok: false;
      reason: "turnstile" | "validation" | "config" | "send";
    };

export const CONTACT_FIELD_LIMITS = {
  name: 100,
  company: 150,
  email: 254,
  phone: 40,
  message: 5000,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type NormalizedContactInput = {
  name: string;
  company: string;
  email: string;
  phone: string | undefined;
  message: string;
  turnstileToken: string;
  website: string;
};

export function normalizeContactInput(
  payload: Partial<ContactFormPayload>,
): NormalizedContactInput {
  return {
    name: String(payload.name ?? "").trim(),
    company: String(payload.company ?? "").trim(),
    email: String(payload.email ?? "").trim(),
    phone: String(payload.phone ?? "").trim() || undefined,
    message: String(payload.message ?? "").trim(),
    turnstileToken: String(payload.turnstileToken ?? "").trim(),
    website: String(payload.website ?? "").trim(),
  };
}

/**
 * Valide les champs côté serveur. Ne vérifie pas Turnstile ni la config mail.
 * Retourne null si le honeypot est rempli (bot) — à traiter comme succès silencieux.
 */
export function validateContactFields(
  input: NormalizedContactInput,
): "honeypot" | "validation" | null {
  if (input.website) {
    return "honeypot";
  }

  if (
    !input.name ||
    !input.company ||
    !input.email ||
    !EMAIL_PATTERN.test(input.email) ||
    !input.message ||
    !input.turnstileToken
  ) {
    return "validation";
  }

  if (
    input.name.length > CONTACT_FIELD_LIMITS.name ||
    input.company.length > CONTACT_FIELD_LIMITS.company ||
    input.email.length > CONTACT_FIELD_LIMITS.email ||
    (input.phone !== undefined &&
      input.phone.length > CONTACT_FIELD_LIMITS.phone) ||
    input.message.length > CONTACT_FIELD_LIMITS.message
  ) {
    return "validation";
  }

  return null;
}
