import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type CardProps = {
  children: ReactNode;
  className?: string;
  shadow?: boolean;
};

export function Card({ children, className, shadow = true }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-surface p-6",
        shadow && "shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}
