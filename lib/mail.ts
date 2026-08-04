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

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatReceivedAt(): string {
  return new Date().toLocaleString("fr-FR", {
    timeZone: "Europe/Paris",
    dateStyle: "long",
    timeStyle: "short",
  });
}

function buildContactSubject(name: string): string {
  return name
    ? `Demande de contact de ${name}`
    : "Nouvelle demande de contact";
}

function buildContactText(payload: {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  receivedAt: string;
}): string {
  const lines = [
    payload.message,
    "",
    `Nom: ${payload.name}`,
    `Entreprise: ${payload.company}`,
    `Email: ${payload.email}`,
  ];

  if (payload.phone) {
    lines.push(`Téléphone: ${payload.phone}`);
  }

  lines.push(
    "",
    "---",
    "Message transmis depuis le formulaire de contact de kyira-energies.com.",
    `Reçu le ${payload.receivedAt}.`,
  );

  return lines.join("\n");
}

function buildContactHtml(payload: {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  receivedAt: string;
}): string {
  const messageHtml = escapeHtml(payload.message).replace(/\r\n|\r|\n/g, "<br>");
  const signatureParts = [
    `Nom: ${escapeHtml(payload.name)}`,
    `Entreprise: ${escapeHtml(payload.company)}`,
    `Email: ${escapeHtml(payload.email)}`,
  ];

  if (payload.phone) {
    signatureParts.push(`Téléphone: ${escapeHtml(payload.phone)}`);
  }

  return [
    "<!DOCTYPE html>",
    '<html lang="fr">',
    "<head><meta charset=\"utf-8\"></head>",
    '<body style="margin:0;padding:16px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.5;color:#111111;">',
    `<p style="margin:0 0 24px 0;white-space:pre-wrap;">${messageHtml}</p>`,
    `<p style="margin:0 0 24px 0;">${signatureParts.join("<br>")}</p>`,
    '<hr style="border:none;border-top:1px solid #cccccc;margin:0 0 16px 0;">',
    '<p style="margin:0;font-size:12px;line-height:1.4;color:#666666;">',
    "Message transmis depuis le formulaire de contact de kyira-energies.com.<br>",
    `Reçu le ${escapeHtml(payload.receivedAt)}.`,
    "</p>",
    "</body>",
    "</html>",
  ].join("");
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
  const receivedAt = formatReceivedAt();

  const content = { name, company, email, phone, message, receivedAt };
  const text = buildContactText(content);
  const html = buildContactHtml(content);

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: buildContactSubject(name),
    text,
    html,
  });

  if (error) {
    throw new Error("Resend send failed");
  }
}
