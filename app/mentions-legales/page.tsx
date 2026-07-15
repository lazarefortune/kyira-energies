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

            <div className="mt-10 space-y-10">
              <LegalSection title="Éditeur du site">
                <InfoRow label="Dénomination sociale" value="KYIRA ENERGIES" />
                <InfoRow
                  label="Forme juridique"
                  value="SAS, société par actions simplifiée"
                />
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
                <InfoRowPending
                  label="Numéro de TVA intracommunautaire"
                  skeletonClassName="w-44"
                  pendingLabel="Numéro de TVA intracommunautaire à compléter"
                />
              </LegalSection>

              <LegalSection title="Directeur de la publication">
                <p className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
                  <span>Directeur de la publication :</span>
                  <PendingValue
                    className="w-52"
                    label="Directeur de la publication à compléter"
                  />
                </p>
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
                <p>
                  Les informations relatives à l&apos;hébergement seront complétées
                  avant la mise en ligne.
                </p>
                <InfoRowPending
                  label="Nom de l'hébergeur"
                  skeletonClassName="w-40"
                  pendingLabel="Nom de l'hébergeur à compléter"
                />
                <InfoRowPending
                  label="Adresse"
                  skeletonClassName="w-64 max-w-full"
                  pendingLabel="Adresse de l'hébergeur à compléter"
                />
                <InfoRowPending
                  label="Site web"
                  skeletonClassName="w-52"
                  pendingLabel="Site web de l'hébergeur à compléter"
                />
              </LegalSection>

              <LegalSection title="Conception et développement du site">
                <p>Conception et développement : Lazare Fortune.</p>
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

              <LegalSection title="Données personnelles">
                <p>
                  Les informations transmises via le formulaire de contact sont
                  utilisées uniquement pour répondre aux demandes envoyées à
                  KYIRA ENERGIES.
                </p>
                <p>
                  Les données collectées peuvent inclure le nom,
                  l&apos;entreprise, l&apos;adresse email, le numéro de
                  téléphone et le contenu du message.
                </p>
                <p>Ces informations ne sont pas vendues à des tiers.</p>
                <p className="flex flex-wrap items-center gap-x-1 gap-y-1.5">
                  <span>
                    Pour toute demande relative à vos données personnelles, vous
                    pouvez contacter KYIRA ENERGIES à l&apos;adresse suivante :
                  </span>
                  <PendingValue
                    className="w-48"
                    label="Adresse email pour les données personnelles à compléter"
                  />
                  <span>.</span>
                </p>
              </LegalSection>

              <LegalSection title="Cookies et mesure d'audience">
                <p>
                  Le site peut utiliser des outils de mesure d&apos;audience afin
                  de comprendre l&apos;utilisation du site et d&apos;améliorer
                  son contenu. Les outils effectivement utilisés seront précisés
                  avant la mise en ligne.
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
