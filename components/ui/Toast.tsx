"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Icon } from "@/components/ui/Icon";
import {
  contactFormSuccessIcon,
  toastCloseIcon,
} from "@/lib/icons";
import { easeOut, motionDuration } from "@/lib/motion";
import { cn } from "@/lib/utils";

type ToastVariant = "success" | "error";

type ToastItem = {
  id: string;
  message: string;
  variant: ToastVariant;
};

type ToastContextValue = {
  success: (message: string) => void;
  error: (message: string) => void;
  dismiss: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const AUTO_DISMISS_MS = 5200;

let toastId = 0;

function nextToastId() {
  toastId += 1;
  return `toast-${toastId}`;
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}

function ToastCard({
  toast,
  onDismiss,
}: {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const isSuccess = toast.variant === "success";

  return (
    <motion.div
      layout
      role="status"
      aria-live="polite"
      initial={{
        opacity: 0,
        y: -16,
        scale: 0.96,
      }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{
        opacity: 0,
        y: -10,
        scale: 0.98,
      }}
      transition={{
        duration: motionDuration(prefersReducedMotion, 0.35),
        ease: easeOut,
      }}
      className={cn(
        "pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border bg-white px-4 py-3.5 shadow-[0_12px_40px_rgba(21,46,75,0.16)] ring-1 ring-black/5",
        isSuccess
          ? "border-primary/15"
          : "border-red-200",
      )}
    >
      <span
        className={cn(
          "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full",
          isSuccess ? "bg-primary/10 text-primary" : "bg-red-50 text-red-600",
        )}
      >
        <Icon
          icon={contactFormSuccessIcon}
          size={16}
          strokeWidth={2.25}
        />
      </span>

      <p className="min-w-0 flex-1 pt-1 text-sm leading-relaxed font-medium text-foreground">
        {toast.message}
      </p>

      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        aria-label="Fermer la notification"
        className="mt-0.5 rounded-md p-1 text-muted transition-colors hover:bg-surface-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <Icon icon={toastCloseIcon} size={16} strokeWidth={2} />
      </button>
    </motion.div>
  );
}

function ToastViewport({
  toasts,
  onDismiss,
}: {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}) {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-70 flex justify-center px-4 pt-[max(1rem,env(safe-area-inset-top))] sm:inset-x-auto sm:right-0 sm:justify-end sm:px-6 sm:pt-6"
      aria-label="Notifications"
    >
      <div className="flex w-full max-w-sm flex-col gap-2.5 sm:w-96">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <ToastCard key={toast.id} toast={toast} onDismiss={onDismiss} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const push = useCallback(
    (message: string, variant: ToastVariant) => {
      const id = nextToastId();
      setToasts((current) => [...current, { id, message, variant }]);

      window.setTimeout(() => {
        dismiss(id);
      }, AUTO_DISMISS_MS);
    },
    [dismiss],
  );

  const value = useMemo<ToastContextValue>(
    () => ({
      success: (message) => push(message, "success"),
      error: (message) => push(message, "error"),
      dismiss,
    }),
    [push, dismiss],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}
