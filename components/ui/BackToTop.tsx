"use client";

import { ArrowUp02Icon } from "@hugeicons/core-free-icons";
import { useEffect, useState } from "react";

import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 400;

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Retour en haut de page"
      className={cn(
        "fixed bottom-6 right-6 z-50 flex size-12 items-center justify-center rounded-full border border-border bg-white text-primary shadow-[0_4px_24px_rgba(21,46,75,0.18)] ring-1 ring-black/5 transition-all duration-300 hover:bg-surface-muted hover:shadow-[0_6px_28px_rgba(21,46,75,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 hover:cursor-pointer",
        isVisible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0",
      )}
    >
      <Icon icon={ArrowUp02Icon} size={22} label="Retour en haut" />
    </button>
  );
}
