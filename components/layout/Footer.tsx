import { Linkedin02Icon } from "@hugeicons/core-free-icons";

import { CookiePreferencesLink } from "@/components/analytics/CookiePreferencesLink";
import { landingContent } from "@/content/landing";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { resolveSectionHref } from "@/lib/utils";
import { Icon } from "../ui/Icon";

export function Footer() {
  const { footer } = landingContent;

  return (
    <footer className="border-t border-border bg-white">
      <Container as="div" className="py-12">
        <div className="grid gap-8 sm:grid-cols-4 lg:grid-cols-8">
          <div className="col-span-4">
            <Logo />
            <p className="mt-2 max-w-md 2xl:max-w-xl text-sm text-muted">{footer.tagline}</p>
          </div>

          <div className="col-span-2">
            <p className="text-base font-bold text-primary">Liens utiles</p>
            <ul className="mt-3 space-y-2">
              {footer.usefulLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={resolveSectionHref(link.href)}
                    className="text-sm text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2">
            <p className="text-base font-bold text-foreground">
              Informations légales
            </p>
            <ul className="mt-3 space-y-2 text-primary">
              {footer.legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={resolveSectionHref(link.href)}
                    className="text-sm text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <CookiePreferencesLink />
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-between items-center mt-10 border-t border-border pt-6">
          <p className="text-sm text-muted">{footer.copyright}</p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/yannis-miame/"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-primary bg-primary text-white rounded-full p-2.5 flex items-center justify-center transition-colors hover:bg-primary/90 hover:text-white hover:border-primary/10"
            >
              <Icon icon={Linkedin02Icon} size={20} />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
