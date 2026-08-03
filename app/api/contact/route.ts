import { NextResponse } from "next/server";

import {
  normalizeContactInput,
  validateContactFields,
  type ContactFormPayload,
  type ContactFormResult,
} from "@/lib/contact-form";
import { getContactDestinationEmail } from "@/lib/contact-destination";
import { isMailConfigured, sendContactEmail } from "@/lib/mail";
import { verifyTurnstileToken } from "@/lib/turnstile";

export const runtime = "nodejs";

function jsonResult(result: ContactFormResult, status: number) {
  return NextResponse.json(result, { status });
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return jsonResult({ ok: false, reason: "validation" }, 400);
  }

  if (!body || typeof body !== "object") {
    return jsonResult({ ok: false, reason: "validation" }, 400);
  }

  const input = normalizeContactInput(body as Partial<ContactFormPayload>);
  const fieldCheck = validateContactFields(input);

  if (fieldCheck === "honeypot") {
    return jsonResult({ ok: true }, 200);
  }

  if (fieldCheck === "validation") {
    return jsonResult({ ok: false, reason: "validation" }, 400);
  }

  const turnstile = await verifyTurnstileToken(input.turnstileToken);

  if (!turnstile.success) {
    return jsonResult({ ok: false, reason: "turnstile" }, 403);
  }

  if (!isMailConfigured()) {
    return jsonResult({ ok: false, reason: "config" }, 503);
  }

  const to = await getContactDestinationEmail();

  if (!to) {
    return jsonResult({ ok: false, reason: "config" }, 503);
  }

  try {
    await sendContactEmail(to, {
      name: input.name,
      company: input.company,
      email: input.email,
      phone: input.phone,
      message: input.message,
    });
  } catch {
    return jsonResult({ ok: false, reason: "send" }, 502);
  }

  return jsonResult({ ok: true }, 200);
}
