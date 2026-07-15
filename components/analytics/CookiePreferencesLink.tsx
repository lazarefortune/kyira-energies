"use client";

import { openCookiePreferences } from "@/lib/consent";
import { cn } from "@/lib/utils";

type CookiePreferencesLinkProps = {
  className?: string;
};

export function CookiePreferencesLink({
  className,
}: CookiePreferencesLinkProps) {
  return (
    <button
      type="button"
      onClick={openCookiePreferences}
      className={cn(
        "text-sm text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        className,
      )}
    >
      Gestion des cookies
    </button>
  );
}
