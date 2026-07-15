"use client";

import { useEffect, useRef, useState } from "react";

import { landingContent } from "@/content/landing";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { manrope } from "@/lib/fonts";
import { cn, resolveSectionHref } from "@/lib/utils";
import { Icon } from "../ui/Icon";
import { Menu09Icon } from "@hugeicons/core-free-icons";

export function HeaderSplit() {
  const { navigation } = landingContent;
  const headerRef = useRef<HTMLElement>(null);
  const [translateY, setTranslateY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const hiddenOffsetRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const updateHeaderPosition = () => {
      const header = headerRef.current;
      if (!header) {
        tickingRef.current = false;
        return;
      }

      const headerHeight = header.offsetHeight;
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollYRef.current;

      setIsScrolled(currentScrollY > 24);

      if (currentScrollY <= 0) {
        hiddenOffsetRef.current = 0;
      } else {
        hiddenOffsetRef.current = Math.min(
          Math.max(hiddenOffsetRef.current + scrollDelta, 0),
          headerHeight,
        );
      }

      setTranslateY(-hiddenOffsetRef.current);
      lastScrollYRef.current = currentScrollY;
      tickingRef.current = false;
    };

    const onScroll = () => {
      if (tickingRef.current) {
        return;
      }

      tickingRef.current = true;
      requestAnimationFrame(updateHeaderPosition);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateHeaderPosition);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateHeaderPosition);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      style={{ transform: `translateY(${translateY}px)` }}
      className={cn(
        manrope.className,
        "fixed inset-x-0 top-0 z-50 will-change-transform transition-colors duration-300",
        isScrolled
          ? "border-b border-border/60 bg-white/90 shadow-sm backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <Container
        as="div"
        className="relative flex items-center justify-between gap-4 py-4 sm:py-5"
      >
        <a
          href={resolveSectionHref("#accueil")}
          className="inline-flex shrink-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <Logo variant="dark" priority />
        </a>

        <nav
          aria-label="Navigation principale"
          className="absolute left-1/2 hidden -translate-x-1/2 md:block"
        >
          <ul className="flex items-center gap-8">
            {navigation.map((link) => (
              <li key={link.href}>
                <a
                  href={resolveSectionHref(link.href)}
                  className={cn(
                    "text-sm font-semibold text-muted transition-colors",
                    "hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Button
            href={resolveSectionHref("#contact")}
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex"
          >
            Contact
          </Button>

          <details className="relative md:hidden">
            <summary
              className={cn(
                "cursor-pointer list-none rounded-full border border-border bg-white px-3 py-2 text-sm font-semibold text-foreground shadow-sm",
                "[&::-webkit-details-marker]:hidden",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              )}
            >
              <Icon icon={Menu09Icon} size={24} className="size-6" />
            </summary>
            <nav
              aria-label="Navigation mobile"
              className="absolute right-0 mt-2 w-48 rounded-xl border border-border bg-white py-2 shadow-lg"
            >
              <ul>
                {navigation.map((link) => (
                  <li key={link.href}>
                    <a
                      href={resolveSectionHref(link.href)}
                      className="block px-4 py-2 text-sm text-muted hover:bg-surface-muted hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={resolveSectionHref("#contact")}
                    className="block px-4 py-2 text-sm font-semibold text-primary hover:bg-surface-muted"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </details>
        </div>
      </Container>
    </header>
  );
}
