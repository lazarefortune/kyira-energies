"use client";

import { useEffect, useId, useRef, useState } from "react";

import { landingContent } from "@/content/landing";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { manrope } from "@/lib/fonts";
import { cn, resolveSectionHref } from "@/lib/utils";
import { Icon } from "../ui/Icon";
import { Cancel01Icon, Menu09Icon } from "@hugeicons/core-free-icons";

export function HeaderClassic() {
  const { navigation } = landingContent;
  const headerRef = useRef<HTMLElement>(null);
  const menuId = useId();
  const [translateY, setTranslateY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    const onResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [isMenuOpen]);

  return (
    <header
      ref={headerRef}
      style={{ transform: `translateY(${translateY}px)` }}
      className={cn(
        manrope.className,
        "fixed inset-x-0 top-0 z-50 px-4 pt-3 will-change-transform sm:px-6 lg:px-8",
      )}
    >
      <Container
        as="div"
        className="overflow-hidden rounded-3xl border border-border/60 bg-surface shadow-sm"
      >
        <div className="flex items-center justify-between gap-4 py-3 sm:py-4">
          <a
            href={resolveSectionHref("#accueil")}
            className="inline-flex shrink-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <Logo priority />
          </a>

          <nav aria-label="Navigation principale" className="hidden md:block">
            <ul className="flex items-center gap-6">
              {navigation.map((link) => (
                <li key={link.href}>
                  <a
                    href={resolveSectionHref(link.href)}
                    className={cn(
                      "text-base font-semibold transition-colors",
                      "hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className={cn(
              "inline-flex items-center justify-center rounded-md px-2 py-2 text-foreground md:hidden",
              "transition-colors hover:bg-surface-muted",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            )}
            aria-expanded={isMenuOpen}
            aria-controls={menuId}
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <Icon
              icon={isMenuOpen ? Cancel01Icon : Menu09Icon}
              size={24}
              className="size-6"
            />
          </button>
        </div>

        <div
          className={cn(
            "grid md:hidden",
            "transition-[grid-template-rows] motion-reduce:transition-none",
            isMenuOpen
              ? "grid-rows-[1fr] duration-250 ease-out"
              : "grid-rows-[0fr] duration-200 ease-in",
          )}
        >
          <div className="min-h-0 overflow-hidden">
            <nav
              id={menuId}
              aria-label="Navigation mobile"
              aria-hidden={!isMenuOpen}
              inert={!isMenuOpen ? true : undefined}
              className="border-t border-border/60 bg-surface py-2"
            >
              <ul className="px-2 pb-1">
                {navigation.map((link) => (
                  <li key={link.href}>
                    <a
                      href={resolveSectionHref(link.href)}
                      tabIndex={isMenuOpen ? undefined : -1}
                      onClick={() => setIsMenuOpen(false)}
                      className={cn(
                        "block rounded-2xl px-2 py-3 text-base font-semibold text-muted",
                        "transition-colors hover:bg-primary-50 hover:text-foreground",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                      )}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </Container>
    </header>
  );
}
