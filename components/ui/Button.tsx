import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "light" | "link";
type ButtonSize = "sm" | "md" | "lg";

type ButtonBaseProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

type ButtonAsButton = ButtonBaseProps &
  ComponentPropsWithoutRef<"button"> & { href?: never };

type ButtonAsLink = ButtonBaseProps &
  ComponentPropsWithoutRef<"a"> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary-hover focus-visible:ring-primary",
  secondary:
    "bg-surface-muted text-foreground hover:bg-border focus-visible:ring-muted",
  outline:
        "border-2 border-border bg-transparent text-foreground hover:bg-surface-muted focus-visible:ring-muted",
  light:
        "bg-white text-primary border border-white hover:bg-white/90 focus-visible:ring-primary",
  link: "text-primary hover:text-primary-hover focus-visible:ring-primary",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-10 py-3 text-base",
};

const baseStyles =
  "inline-flex items-center justify-center rounded-full font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 hover:cursor-pointer";

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  const styles = cn(baseStyles, sizeStyles[size], variantStyles[variant], className);

  if ("href" in props && props.href) {
    const { href, ...linkProps } = props;
    return (
      <a href={href} className={styles} {...linkProps}>
        {children}
      </a>
    );
  }

  const buttonProps = props as ComponentPropsWithoutRef<"button">;
  return (
    <button type={buttonProps.type ?? "button"} className={styles} {...buttonProps}>
      {children}
    </button>
  );
}
