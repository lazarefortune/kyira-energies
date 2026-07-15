"use server";

import { getContactDestinationEmail } from "@/lib/contact-destination";
import { isMailConfigured, sendContactEmail } from "@/lib/mail";
import { verifyTurnstileToken } from "@/lib/turnstile";

export type ContactFormPayload = {
  name: string;
  company: string;
  email: string;
  phone?: string;
  message: string;
  turnstileToken: string;
};

export type ContactFormResult =
  | { ok: true }
  | {
      ok: false;
      reason: "turnstile" | "validation" | "config" | "send";
    };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Valide Turnstile puis envoie l'email de contact.
 * Destinataire via getContactDestinationEmail() (env aujourd'hui, BDD plus tard).
 */
export async function submitContactForm(
  payload: ContactFormPayload,
): Promise<ContactFormResult> {
  const name = payload.name?.trim() ?? "";
  const company = payload.company?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const phone = payload.phone?.trim() || undefined;
  const message = payload.message?.trim() ?? "";

  if (
    !name ||
    !company ||
    !email ||
    !EMAIL_PATTERN.test(email) ||
    !message ||
    !payload.turnstileToken
  ) {
    return { ok: false, reason: "validation" };
  }

  const turnstile = await verifyTurnstileToken(payload.turnstileToken);

  if (!turnstile.success) {
    return { ok: false, reason: "turnstile" };
  }

  if (!isMailConfigured()) {
    return { ok: false, reason: "config" };
  }

  const to = await getContactDestinationEmail();

  if (!to) {
    return { ok: false, reason: "config" };
  }

  try {
    await sendContactEmail(to, {
      name,
      company,
      email,
      phone,
      message,
    });
  } catch {
    return { ok: false, reason: "send" };
  }

  return { ok: true };
}
