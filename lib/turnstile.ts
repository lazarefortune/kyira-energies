const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

type TurnstileVerifyResponse = {
  success: boolean;
  "error-codes"?: string[];
};

/**
 * Valide un token Turnstile côté serveur.
 * À appeler avant tout envoi réel du formulaire de contact.
 */
export async function verifyTurnstileToken(
  token: string,
): Promise<{ success: boolean; errorCodes: string[] }> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    return { success: false, errorCodes: ["missing-secret"] };
  }

  if (!token) {
    return { success: false, errorCodes: ["missing-input-response"] };
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  });

  const response = await fetch(TURNSTILE_VERIFY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!response.ok) {
    return { success: false, errorCodes: ["verify-request-failed"] };
  }

  const data = (await response.json()) as TurnstileVerifyResponse;

  return {
    success: data.success === true,
    errorCodes: data["error-codes"] ?? [],
  };
}
