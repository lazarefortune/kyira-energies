import nodemailer from "nodemailer";

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

function createTransport() {
  const host = requireEnv("SMTP_HOST");
  const port = Number(process.env.SMTP_PORT ?? "1025");
  const secure = process.env.SMTP_SECURE === "true";
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: user && pass ? { user, pass } : undefined,
  });
}

export function isMailConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST?.trim() &&
      process.env.CONTACT_TO_EMAIL?.trim() &&
      process.env.CONTACT_FROM_EMAIL?.trim(),
  );
}

/**
 * Envoie l'email de contact via SMTP.
 * Local : Mailpit (SMTP_HOST=127.0.0.1, SMTP_PORT=1025, sans auth).
 */
export async function sendContactEmail(
  to: string,
  payload: ContactEmailPayload,
): Promise<void> {
  const from = requireEnv("CONTACT_FROM_EMAIL");
  const transport = createTransport();

  const name = sanitizeHeaderValue(payload.name);
  const company = sanitizeHeaderValue(payload.company);
  const email = sanitizeHeaderValue(payload.email);
  const phone = payload.phone ? sanitizeHeaderValue(payload.phone) : "";

  const subject = sanitizeHeaderValue(
    `[KYIRA ENERGIES] Demande de contact — ${name} (${company})`,
  );

  const text = [
    "Nouvelle demande via le formulaire de contact.",
    "",
    `Nom : ${name}`,
    `Entreprise : ${company}`,
    `Email : ${email}`,
    `Téléphone : ${phone || "Non renseigné"}`,
    "",
    "Message :",
    payload.message.trim(),
  ].join("\n");

  await transport.sendMail({
    from,
    to,
    replyTo: email,
    subject,
    text,
  });
}
