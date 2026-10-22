import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { PendingValue } from "@/components/ui/Skeleton";
import { backArrowIcon } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Informations légales relatives au site KYIRA ENERGIES.",
};

type LegalSectionProps = {
  title: string;
  children: React.ReactNode;
};

function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        {title}
      </h2>
      <div className="space-y-3 text-base leading-relaxed text-muted">
        {children}
      </div>
    </section>
  );
}

type InfoRowProps = {
  label: string;
  value: React.ReactNode;
};

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <p>
      <span className="font-medium text-foreground">{label} :</span> {value}
    </p>
  );
}

function InfoRowPending({
  label,
  skeletonClassName,
  pendingLabel,
}: {
  label: string;
  skeletonClassName?: string;
  pendingLabel?: string;
}) {
  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
      <span className="font-medium text-foreground">{label} :</span>
      <PendingValue className={skeletonClassName} label={pendingLabel} />
    </p>
  );
}

function BackLink() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      <Icon icon={backArrowIcon} size={16} strokeWidth={2} />
      Retour à l&apos;accueil
    </Link>
  );
}

export default function MentionsLegalesPage() {
  return (
    <main className="flex-1">
      <section
        aria-labelledby="mentions-legales-title"
        className="bg-primary pt-28 pb-14 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20"
      >
        <Container as="div">
          <div className="mx-auto max-w-3xl text-center">
            <h1
              id="mentions-legales-title"
              className="text-3xl font-semibold tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl"
            >
              Mentions légales
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-primary-foreground/75 sm:text-base">
              Conformément aux obligations légales applicables aux sites
              internet professionnels, cette page présente les informations
              relatives à l&apos;éditeur du site KYIRA ENERGIES.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-background py-12 lg:py-16">
        <Container as="div">
          <article className="mx-auto max-w-3xl">
            <BackLink />
            <p className="mt-4 text-sm text-muted">
              Dernière mise à jour : <time dateTime="2026-10-22">22 octobre 2026</time>.
            </p>

            <div className="mt-10 space-y-10">
              <LegalSection title="Éditeur du site">
                <InfoRow label="Dénomination sociale" value="KYIRA ENERGIES" />
                <InfoRow
                  label="Forme juridique"
                  value="SASU, société par actions simplifiée unipersonnelle"
                />
                <InfoRow label="Capital social" value="10 000 €" />
                <InfoRow label="RCS" value="Pontoise 943 087 775" />
                <InfoRow label="SIREN" value="943 087 775" />
                <InfoRow label="SIRET" value="943 087 775 00012" />
                <InfoRow
                  label="Siège social"
                  value="5 Mail Martin Luther King, 95870 Bezons, France"
                />
                <InfoRow label="Code APE" value="74.90B" />
                <InfoRow
                  label="Activité principale"
                  value="Activités spécialisées, scientifiques et techniques diverses"
                />
                <InfoRow
                  label="Numéro de TVA intracommunautaire"
                  value="FR26943087775"
                />
              </LegalSection>

              <LegalSection title="Directeur de la publication">
                <InfoRow
                  label="Directeur de la publication"
                  value="Yannis ASSEKO-ONDO-MIAME, Président de KYIRA ENERGIES"
                />
              </LegalSection>

              <LegalSection title="Contact">
                <p>
                  Pour toute demande concernant le site, vous pouvez utiliser le
                  formulaire de contact disponible sur la{" "}
                  <Link
                    href="/#contact"
                    className="font-medium text-primary underline-offset-2 transition-colors hover:text-primary-hover hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    page d&apos;accueil
                  </Link>
                  .
                </p>
                <InfoRowPending
                  label="Adresse email"
                  skeletonClassName="w-48"
                  pendingLabel="Adresse email à compléter"
                />
                <InfoRowPending
                  label="Téléphone"
                  skeletonClassName="w-36"
                  pendingLabel="Numéro de téléphone à compléter"
                />
              </LegalSection>

              <LegalSection title="Hébergement">
                <InfoRow label="Nom de l'hébergeur" value="Netlify, Inc." />
                <InfoRow
                  label="Adresse"
                  value="101 2nd Street, San Francisco, CA 94105, États-Unis"
                />
                <InfoRow
                  label="Site web"
                  value={
                    <a
                      href="https://www.netlify.com/"
                      className="font-medium text-primary underline-offset-2 transition-colors hover:text-primary-hover hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      www.netlify.com
                    </a>
                  }
                />
                <InfoRowPending
                  label="Téléphone de l'hébergeur"
                  skeletonClassName="w-36"
                  pendingLabel="Numéro de téléphone de Netlify à confirmer"
                />
              </LegalSection>

              <LegalSection title="Prestataires techniques">
                <p>
                  Les prestataires suivants interviennent dans le traitement et
                  le stockage des données liées au fonctionnement du site :
                </p>
                <InfoRow
                  label="PostHog (mesure d’audience et enregistrement des sessions)"
                  value="PostHog, Inc., 2261 Market Street #4008, San Francisco, CA 94114, États-Unis"
                />
                <InfoRow
                  label="Resend (acheminement des messages du formulaire)"
                  value="Plus Five Five, Inc. (Resend), 2261 Market Street #5039, San Francisco, CA 94114, États-Unis"
                />
                <InfoRow
                  label="Cloudflare Turnstile (protection contre les envois automatisés)"
                  value="Cloudflare, Inc., 101 Townsend Street, San Francisco, CA 94107, États-Unis"
                />
              </LegalSection>

              <LegalSection title="Conception et développement du site">
                <p>
                  Conception et développement :{" "}
                  <a
                    href="https://lazarefortune.com"
                    className="font-medium text-primary underline-offset-2 transition-colors hover:text-primary-hover hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    Lazare Fortune
                  </a>
                  .
                </p>
              </LegalSection>

              <LegalSection title="Propriété intellectuelle">
                <p>
                  L&apos;ensemble des contenus présents sur ce site, incluant
                  notamment les textes, visuels, éléments graphiques, logo,
                  structure et mise en page, est protégé par le droit de la
                  propriété intellectuelle. Toute reproduction, représentation,
                  modification ou exploitation, totale ou partielle, sans
                  autorisation préalable, est interdite.
                </p>
                <p>
                  Les visuels issus de banques d&apos;images ou de ressources
                  tierces restent soumis à leurs licences respectives.
                </p>
              </LegalSection>

              <LegalSection title="Crédits photographiques">
                <p>
                  Photographie des trois aérations en tête de la page
                  d&apos;accueil :{' '}
                  <a
                    href="https://unsplash.com/fr/@elimendeinagella"
                    className="font-medium text-primary underline-offset-2 transition-colors hover:text-primary-hover hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    Elimende Inagella
                  </a>{' '}
                  sur{' '}
                  <a
                    href="https://unsplash.com/fr/photos/photo-en-niveaux-de-gris-dun-cadre-metallique-rond-zx7VUt9txos"
                    className="font-medium text-primary underline-offset-2 transition-colors hover:text-primary-hover hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    Unsplash
                  </a>
                  , utilisée sous{' '}
                  <a
                    href="https://unsplash.com/fr/licence"
                    className="font-medium text-primary underline-offset-2 transition-colors hover:text-primary-hover hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    licence Unsplash
                  </a>
                  .
                </p>
                <p>
                  Photographie de ventilation en toiture : {" "}
                  <a href="https://www.pexels.com/photo/ventilation-system-on-roof-of-building-7396978/" className="font-medium text-primary underline-offset-2 transition-colors hover:text-primary-hover hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                    Alexander Grigorian sur Pexels
                  </a>
                  , utilisée sous{" "}
                  <a href="https://www.pexels.com/license/" className="font-medium text-primary underline-offset-2 transition-colors hover:text-primary-hover hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                    licence Pexels
                  </a>
                  .
                </p>
                <p>
                  Photographie d’inspection d’une unité de climatisation : {" "}
                  <a href="https://www.pexels.com/photo/technician-inspecting-outdoor-hvac-unit-32497161/" className="font-medium text-primary underline-offset-2 transition-colors hover:text-primary-hover hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                    Kathleen Austin Kuhn sur Pexels
                  </a>
                  , utilisée sous{" "}
                  <a href="https://www.pexels.com/license/" className="font-medium text-primary underline-offset-2 transition-colors hover:text-primary-hover hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                    licence Pexels
                  </a>
                  .
                </p>
              </LegalSection>

              <LegalSection title="Données personnelles">
                <p>
                  Les informations relatives aux données collectées, aux finalités
                  des traitements, aux prestataires techniques et à vos droits
                  sont détaillées dans notre{" "}
                  <Link
                    href="/politique-confidentialite"
                    className="font-medium text-primary underline-offset-2 transition-colors hover:text-primary-hover hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    politique de confidentialité
                  </Link>
                  .
                </p>
              </LegalSection>

              <LegalSection title="Cookies et mesure d'audience">
                <p>
                  Les informations relatives aux cookies et au traitement des
                  données personnelles figurent dans la{" "}
                  <Link
                    href="/politique-confidentialite"
                    className="font-medium text-primary underline-offset-2 transition-colors hover:text-primary-hover hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    politique de confidentialité
                  </Link>
                  .
                </p>
              </LegalSection>

              <LegalSection title="Responsabilité">
                <p>
                  KYIRA ENERGIES s&apos;efforce de fournir des informations
                  exactes et à jour sur ce site. Toutefois, ces informations sont
                  données à titre informatif et peuvent évoluer. KYIRA ENERGIES
                  ne saurait être tenue responsable d&apos;erreurs, d&apos;omissions
                  ou d&apos;une utilisation inappropriée des informations
                  présentes sur le site.
                </p>
              </LegalSection>

              <LegalSection title="Droit applicable">
                <p>Le présent site est soumis au droit français.</p>
              </LegalSection>
            </div>

            <footer className="mt-12 border-t border-border pt-8">
              <BackLink />
            </footer>
          </article>
        </Container>
      </section>
    </main>
  );
}
