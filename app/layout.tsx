import type { Metadata } from "next";

import { CookieConsentManager } from "@/components/analytics/CookieConsentManager";
import { PostHogProvider } from "@/components/analytics/PostHogProvider";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { BackToTop } from "@/components/ui/BackToTop";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { ToastProvider } from "@/components/ui/Toast";
import { landingContent } from "@/content/landing";
import { archivo, editorialNew, geistMono, manrope } from "@/lib/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${landingContent.siteName} | Récupération de chaleur pour bâtiments tertiaires`,
    template: `%s | ${landingContent.siteName}`,
  },
  description:
    "Valorisez la chaleur perdue de vos installations frigorifiques pour réduire vos coûts énergétiques et couvrir vos besoins en eau chaude ou en chauffage.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${editorialNew.variable} ${archivo.variable} ${geistMono.variable} ${manrope.variable} h-full scroll-smooth`}
    >
      <body
        className={`${manrope.className} flex min-h-full flex-col bg-background font-sans font-normal text-foreground antialiased`}
      >
        <PostHogProvider>
          <MotionProvider>
            <ToastProvider>
              <Header />
              {children}
              <Footer />
              <BackToTop />
              <CookieConsentManager />
            </ToastProvider>
          </MotionProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
