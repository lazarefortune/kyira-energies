"use client";

import { type FormEvent, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { landingContent } from "@/content/landing";
import { submitContactForm } from "@/lib/contact-form";
import {
  contactFormLoadingIcon,
  contactFormSendingIcon,
} from "@/lib/icons";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { useToast } from "@/components/ui/Toast";
import { TurnstileWidget } from "@/components/ui/TurnstileWidget";

type FormStatus =
  | { kind: "idle" }
  | { kind: "submitting" }
  | {
      kind: "error";
      reason: "validation" | "turnstile" | "config" | "send";
    };

type FieldName = "name" | "company" | "email" | "phone" | "message";
type FieldErrors = Partial<Record<FieldName | "turnstile", string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const { contact } = landingContent;
  const toast = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<FormStatus>({ kind: "idle" });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);

  const isSubmitting = status.kind === "submitting";
  const hasTurnstileSiteKey = Boolean(
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
  );

  function resetTurnstile() {
    setTurnstileToken(null);
    setTurnstileResetKey((key) => key + 1);
  }

  function clearFieldError(field: FieldName | "turnstile") {
    setFieldErrors((current) => {
      if (!current[field]) {
        return current;
      }
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function validateFields(values: {
    name: string;
    company: string;
    email: string;
    phone: string;
    message: string;
    turnstileToken: string | null;
  }): FieldErrors {
    const errors: FieldErrors = {};

    if (!values.name) {
      errors.name = contact.fieldErrors.required;
    }

    if (!values.company) {
      errors.company = contact.fieldErrors.required;
    }

    if (!values.email) {
      errors.email = contact.fieldErrors.required;
    } else if (!EMAIL_PATTERN.test(values.email)) {
      errors.email = contact.fieldErrors.email;
    }

    if (!values.message) {
      errors.message = contact.fieldErrors.required;
    }

    if (hasTurnstileSiteKey && !values.turnstileToken) {
      errors.turnstile = contact.fieldErrors.turnstile;
    }

    return errors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const form = formRef.current ?? event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const errors = validateFields({
      name,
      company,
      email,
      phone,
      message,
      turnstileToken,
    });

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setStatus({ kind: "error", reason: "validation" });
      const firstInvalid = form.querySelector<HTMLElement>(
        "[aria-invalid='true'], [data-field-error='true']",
      );
      firstInvalid?.focus();
      return;
    }

    setFieldErrors({});
    setStatus({ kind: "submitting" });

    try {
      const result = await submitContactForm({
        name,
        company,
        email,
        phone: phone || undefined,
        message,
        turnstileToken: turnstileToken!,
      });

      if (result?.ok === true) {
        form.reset();
        resetTurnstile();
        setFieldErrors({});
        setStatus({ kind: "idle" });
        toast.success(contact.successMessage);
        return;
      }

      resetTurnstile();

      if (result && "reason" in result && result.reason === "validation") {
        setFieldErrors({
          email: contact.fieldErrors.email,
        });
        setStatus({ kind: "error", reason: "validation" });
        return;
      }

      if (result && "reason" in result && result.reason === "turnstile") {
        setFieldErrors({
          turnstile: contact.fieldErrors.turnstile,
        });
        setStatus({ kind: "error", reason: "turnstile" });
        return;
      }

      setStatus({
        kind: "error",
        reason: result && "reason" in result ? result.reason : "send",
      });
    } catch {
      resetTurnstile();
      setStatus({ kind: "error", reason: "send" });
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="relative min-w-0 w-full max-w-full space-y-3"
      aria-busy={isSubmitting}
    >
      <fieldset
        disabled={isSubmitting}
        className="min-w-0 space-y-3 border-0 p-0 disabled:opacity-55"
      >
        <legend className="sr-only">{contact.eyebrow}</legend>

        <div className="grid min-w-0 gap-3 sm:grid-cols-2">
          {contact.fields.map((field) => (
            <Input
              key={field.name}
              id={field.name}
              name={field.name}
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              autoComplete={field.autoComplete}
              required={field.required}
              className="min-w-0 py-2"
              error={fieldErrors[field.name as FieldName]}
              onChange={() => {
                clearFieldError(field.name as FieldName);
                if (status.kind === "error" && status.reason === "validation") {
                  setStatus({ kind: "idle" });
                }
              }}
            />
          ))}
        </div>

        <Textarea
          id="message"
          name="message"
          label={contact.messageLabel}
          placeholder={contact.messagePlaceholder}
          className="min-h-32 w-full max-w-full resize-y py-2"
          required
          error={fieldErrors.message}
          onChange={() => {
            clearFieldError("message");
            if (status.kind === "error" && status.reason === "validation") {
              setStatus({ kind: "idle" });
            }
          }}
        />

        <input
          type="hidden"
          name="cf-turnstile-response"
          value={turnstileToken ?? ""}
        />

        <div
          className={
            isSubmitting
              ? "pointer-events-none min-w-0 max-w-full select-none opacity-50"
              : "min-w-0 max-w-full"
          }
          aria-hidden={isSubmitting}
        >
          <TurnstileWidget
            key={turnstileResetKey}
            onTokenChange={(token) => {
              setTurnstileToken(token);
              if (token) {
                clearFieldError("turnstile");
              }
            }}
            className="pt-1"
          />
          {fieldErrors.turnstile ? (
            <p
              className="mt-1.5 text-sm text-red-600"
              role="alert"
              data-field-error="true"
              tabIndex={-1}
            >
              {fieldErrors.turnstile}
            </p>
          ) : null}
        </div>
      </fieldset>

      <AnimatePresence>
        {isSubmitting ? (
          <motion.div
            key="contact-sending-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-10 flex items-center justify-center rounded-md bg-white/75 backdrop-blur-[2px]"
            aria-live="polite"
          >
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex flex-col items-center gap-3 px-4 text-center"
            >
              <div className="relative flex h-14 w-14 items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-primary/10" />
                <motion.span
                  className="absolute text-primary/35"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1.1,
                    ease: "linear",
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  <Icon icon={contactFormLoadingIcon} size={40} strokeWidth={1.75} />
                </motion.span>
                <motion.span
                  className="relative text-primary"
                  animate={{ y: [2, -3, 2], opacity: [0.85, 1, 0.85] }}
                  transition={{
                    duration: 1.4,
                    ease: "easeInOut",
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  <Icon icon={contactFormSendingIcon} size={22} strokeWidth={1.75} />
                </motion.span>
              </div>
              <p className="text-sm font-medium text-foreground">
                {contact.submittingLabel}
              </p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="mt-7 flex flex-col gap-2.5 pt-0.5 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
          className="disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? contact.submittingLabel : contact.submitLabel}
        </Button>

        <AnimatePresence mode="wait">
          {status.kind === "error" && status.reason !== "validation" ? (
            <motion.p
              key={status.reason}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -2 }}
              transition={{ duration: 0.2 }}
              className="text-xs text-muted"
              role="status"
            >
              {contact.errorMessages[status.reason]}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    </form>
  );
}
