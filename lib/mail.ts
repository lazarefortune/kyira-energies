import { Resend } from "resend";

export type ContactEmailPayload = {
  name: string;
  company: string;
  email: string;
  phone?: string;
  message: string;
};

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

function sanitizeHeaderValue(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export function isMailConfigured(): boolean {
  return Boolean(
    process.env.RESEND_API_KEY?.trim() &&
      process.env.CONTACT_EMAIL?.trim() &&
      process.env.RESEND_FROM_EMAIL?.trim(),
  );
}

/**
 * Envoie l'email de contact via l'API Resend.
 * RESEND_FROM_EMAIL doit être un domaine vérifié chez Resend
 * (ou onboarding@resend.dev pour les tests).
 */
export async function sendContactEmail(
  to: string,
  payload: ContactEmailPayload,
): Promise<void> {
  const apiKey = requireEnv("RESEND_API_KEY");
  const from = requireEnv("RESEND_FROM_EMAIL");
  const resend = new Resend(apiKey);

  const name = sanitizeHeaderValue(payload.name);
  const company = sanitizeHeaderValue(payload.company);
  const email = sanitizeHeaderValue(payload.email);
  const phone = payload.phone ? sanitizeHeaderValue(payload.phone) : "";
  const message = payload.message.trim();
  const receivedAt = new Date().toLocaleString("fr-FR", {
    timeZone: "Europe/Paris",
    dateStyle: "long",
    timeStyle: "short",
  });

  const text = [
    "Nouvelle demande via le formulaire de contact.",
    "",
    `Nom : ${name}`,
    `Entreprise : ${company}`,
    `Email : ${email}`,
    `Téléphone : ${phone || "Non renseigné"}`,
    "",
    "Message :",
    message,
    "",
    `Date de réception : ${receivedAt}`,
  ].join("\n");

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: "Nouvelle demande depuis le site KYIRA ENERGIES",
    text,
  });

  if (error) {
    throw new Error("Resend send failed");
  }
}
