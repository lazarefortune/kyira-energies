import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type InputProps = ComponentPropsWithoutRef<"input"> & {
  label: string;
  id: string;
  error?: string;
};

export function Input({ label, id, error, className, ...props }: InputProps) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-foreground">
        {label}
        {props.required ? (
          <span className="text-primary" aria-hidden="true">
            {" "}
            *
          </span>
        ) : null}
      </label>
      <input
        id={id}
        className={cn(
          "w-full min-w-0 rounded-md border border-border bg-surface px-3 py-2.5 text-base text-foreground placeholder:text-muted/70",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
          "disabled:cursor-not-allowed disabled:border-border/70 disabled:bg-surface-muted disabled:text-muted",
          error && "border-red-600",
          className,
        )}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error ? (
        <p id={`${id}-error`} className="text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
