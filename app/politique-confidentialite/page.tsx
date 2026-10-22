import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { PendingValue } from "@/components/ui/Skeleton";
import { backArrowIcon } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Informations relatives au traitement des données personnelles sur le site KYIRA ENERGIES.",
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

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="flex-1">
      <section
        aria-labelledby="politique-confidentialite-title"
        className="bg-primary pt-28 pb-14 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20"
      >
        <Container as="div">
          <div className="mx-auto max-w-3xl text-center">
            <h1
              id="politique-confidentialite-title"
              className="text-3xl font-semibold tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl"
            >
              Politique de confidentialité
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-primary-foreground/75 sm:text-base">
              Informations relatives au traitement des données personnelles sur
              le site KYIRA ENERGIES.
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
              <LegalSection title="Introduction">
                <p>
                  La présente politique de confidentialité explique comment KYIRA
                  ENERGIES collecte, utilise et protège les données personnelles
                  collectées via son formulaire de contact et, sous réserve de votre
                  consentement, ses outils de mesure d&apos;audience.
                </p>
                <p>
                  KYIRA ENERGIES s&apos;engage à traiter les données
                  personnelles de manière transparente, limitée et
                  proportionnée aux finalités poursuivies.
                </p>
              </LegalSection>

              <LegalSection title="1. Responsable du traitement">
                <p>Le responsable du traitement est :</p>
                <InfoRow label="Dénomination sociale" value="KYIRA ENERGIES" />
                <InfoRow
                  label="Forme juridique"
                  value="SASU, société par actions simplifiée unipersonnelle"
                />
                <InfoRow label="SIREN" value="943 087 775" />
                <InfoRow label="SIRET" value="943 087 775 00012" />
                <InfoRow
                  label="Siège social"
                  value="5 Mail Martin Luther King, 95870 Bezons, France"
                />
                <InfoRowPending
                  label="Adresse email de contact"
                  skeletonClassName="w-48"
                  pendingLabel="Adresse email de contact à confirmer"
                />
              </LegalSection>

              <LegalSection title="2. Données personnelles collectées">
                <p>
                  Dans le cadre du formulaire de contact, KYIRA ENERGIES peut
                  collecter les données suivantes :
                </p>
                <ul className="list-disc space-y-1.5 pl-5">
                  <li>nom et prénom ;</li>
                  <li>nom de l&apos;entreprise ;</li>
                  <li>adresse email ;</li>
                  <li>numéro de téléphone, si renseigné ;</li>
                  <li>contenu du message transmis.</li>
                </ul>
                <p>
                  Les champs marqués par un astérisque sont nécessaires pour
                  traiter la demande. Les autres champs sont facultatifs.
                </p>
                <p>
                  Avec votre consentement, PostHog collecte également des données
                  de navigation : pages consultées, interactions avec le site,
                  informations techniques sur le navigateur et l&apos;appareil,
                  identifiants pseudonymes et enregistrements de session. Les
                  champs du formulaire sont masqués dans les enregistrements.
                </p>
              </LegalSection>

              <LegalSection title="3. Finalités du traitement">
                <p>Les données du formulaire de contact sont utilisées pour :</p>
                <ul className="list-disc space-y-1.5 pl-5">
                  <li>
                    répondre aux demandes envoyées via le formulaire de contact ;
                  </li>
                  <li>échanger avec le visiteur au sujet de son besoin ;</li>
                  <li>
                    assurer le suivi commercial éventuel de la demande ;
                  </li>
                  <li>
                    améliorer la qualité des échanges avec les prospects et
                    clients.
                  </li>
                </ul>
                <p>Les données ne sont pas vendues à des tiers.</p>
                <p>
                  Sous réserve de votre consentement, les données sont également
                  utilisées pour mesurer l&apos;audience du site et analyser la
                  navigation des visiteurs, y compris par l&apos;enregistrement
                  de sessions, afin d&apos;améliorer son contenu et son ergonomie.
                </p>
              </LegalSection>

              <LegalSection title="4. Base légale du traitement">
                <p>
                  Le traitement des données du formulaire de contact repose sur
                  l&apos;intérêt légitime de
                  KYIRA ENERGIES à répondre aux demandes reçues via son site
                  internet et à assurer le suivi des échanges avec ses prospects
                  et clients.
                </p>
                <p>
                  Lorsque la demande vise à préparer une éventuelle relation
                  contractuelle, le traitement peut également être nécessaire à
                  l&apos;exécution de mesures précontractuelles.
                </p>
                <p>
                  Les données de mesure d&apos;audience collectées par PostHog,
                  y compris les enregistrements de session, sont traitées sur le
                  fondement de votre consentement. Vous pouvez le retirer à tout
                  moment via le lien « Gestion des cookies » en pied de page,
                  sans que cela affecte la licéité du traitement effectué avant
                  ce retrait.
                </p>
              </LegalSection>

              <LegalSection title="5. Durée de conservation">
                <p>
                  Les données transmises via le formulaire de contact sont
                  conservées pendant une durée maximale de trois ans à compter
                  du dernier échange avec le prospect, sauf obligation légale
                  contraire ou demande de suppression anticipée.
                </p>
                <p>
                  Si une relation commerciale est conclue, certaines données
                  pourront être conservées pendant la durée nécessaire à la
                  gestion de cette relation et au respect des obligations
                  légales applicables.
                </p>
                <ul className="list-disc space-y-1.5 pl-5">
                  <li>PostHog : événements de mesure d&apos;audience conservés un an ; enregistrements de session conservés 30 jours.</li>
                  <li>Resend : messages et journaux de livraison conservés 30 jours dans le service d&apos;envoi. Cette durée est distincte de celle des échanges conservés dans la messagerie de KYIRA ENERGIES.</li>
                  <li>Choix relatif aux cookies : 180 jours au maximum. Les informations d&apos;origine de visite utilisées pour mesurer les conversions sont conservées 30 jours dans votre navigateur, sous réserve de votre consentement.</li>
                </ul>
              </LegalSection>

              <LegalSection title="6. Destinataires des données">
                <p>
                  Les données sont destinées à KYIRA ENERGIES et aux personnes
                  habilitées à traiter les demandes reçues via le site.
                </p>
                <p>
                  Elles peuvent également être traitées par des prestataires
                  techniques intervenant pour l&apos;hébergement, la maintenance,
                  la sécurité ou le fonctionnement du site, uniquement dans la
                  limite nécessaire à leurs missions.
                </p>
                <p>
                  Le formulaire de contact peut utiliser Cloudflare Turnstile
                  afin de limiter les envois automatisés et protéger le site
                  contre le spam. Les messages sont acheminés vers KYIRA
                  ENERGIES via le service d&apos;envoi d&apos;emails Resend,
                  uniquement pour transmettre la demande de contact.
                </p>
                <p>
                  Les données de mesure d&apos;audience sont traitées par PostHog,
                  en qualité de sous-traitant.
                </p>
                <InfoRow
                  label="Hébergeur"
                  value="Netlify, Inc., 101 2nd Street, San Francisco, CA 94105, États-Unis"
                />
              </LegalSection>

              <LegalSection title="7. Hébergement et transferts internationaux">
                <p>
                  Les données de mesure d&apos;audience sont hébergées dans
                  l&apos;Union européenne, sur PostHog Cloud EU à Francfort.
                  Le paramétrage du projet prévoit de ne pas conserver
                  l&apos;adresse IP dans les événements enregistrés. Cela
                  n&apos;exclut pas son traitement technique lors de la connexion.
                </p>
                <p>
                  Resend conserve le contenu des messages et les journaux de
                  livraison aux États-Unis. La région choisie pour l&apos;envoi
                  des emails ne détermine pas le lieu de stockage.
                  Netlify et Cloudflare peuvent également traiter des données
                  hors de l&apos;Espace économique européen dans le cadre de
                  leurs services d&apos;hébergement et de sécurité.
                  L&apos;hébergement européen de PostHog n&apos;exclut pas des
                  accès depuis d&apos;autres pays par ses prestataires habilités.
                </p>
                <p>
                  Les documents contractuels des prestataires prévoient des
                  mécanismes d&apos;encadrement des transferts, notamment les
                  clauses contractuelles types de la Commission européenne et,
                  lorsque applicable, le cadre de protection des données
                  UE–États-Unis (Data Privacy Framework). Vous pouvez consulter
                  les garanties décrites par{" "}
                  <a className="text-primary underline" href="https://posthog.com/dpa">PostHog</a>,{" "}
                  <a className="text-primary underline" href="https://resend.com/security/gdpr">Resend</a>,{" "}
                  <a className="text-primary underline" href="https://www.netlify.com/gdpr-ccpa/">Netlify</a> et{" "}
                  <a className="text-primary underline" href="https://www.cloudflare.com/cloudflare-customer-dpa/">Cloudflare</a>,
                  ou demander des informations à KYIRA ENERGIES par courrier
                  à son siège social.
                </p>
              </LegalSection>

              <LegalSection title="8. Sécurité des données">
                <p>
                  KYIRA ENERGIES met en œuvre des mesures raisonnables pour
                  protéger les données personnelles contre l&apos;accès non
                  autorisé, la perte, l&apos;altération ou la divulgation.
                </p>
              </LegalSection>

              <LegalSection title="9. Droits des personnes">
                <p>
                  Conformément à la réglementation applicable, vous disposez
                  notamment des droits suivants :
                </p>
                <ul className="list-disc space-y-1.5 pl-5">
                  <li>droit d&apos;accès ;</li>
                  <li>droit de rectification ;</li>
                  <li>droit d&apos;effacement ;</li>
                  <li>droit d&apos;opposition ;</li>
                  <li>
                    droit de retirer votre consentement à tout moment, pour les
                    traitements qui reposent sur celui-ci.
                  </li>
                  <li>droit à la limitation du traitement ;</li>
                  <li>
                    droit à la portabilité, lorsque ce droit est applicable.
                  </li>
                </ul>
                <p className="flex flex-wrap items-center gap-x-1 gap-y-1.5">
                  <span>
                    Pour exercer vos droits, vous pouvez contacter KYIRA
                    ENERGIES à l&apos;adresse suivante :
                  </span>
                  <PendingValue
                    className="w-48"
                    label="Adresse email pour l'exercice des droits à confirmer"
                  />
                  <span>.</span>
                </p>
                <p>
                  Vous pouvez également introduire une réclamation auprès de la
                  CNIL si vous estimez que vos droits ne sont pas respectés.
                </p>
              </LegalSection>

              <LegalSection title="10. Cookies et mesure d'audience">
                <p>
                  Le site utilise PostHog (Product Analytics) comme outil de
                  mesure d&apos;audience afin de comprendre la navigation et
                  d&apos;améliorer le contenu du site. Des événements
                  personnalisés peuvent être enregistrés (par exemple
                  interactions avec le formulaire de contact ou la FAQ).
                </p>
                <p>
                  Lorsque vous acceptez les cookies de mesure d&apos;audience,
                  le Session Replay de PostHog peut également être activé. Il
                  permet de rejouer votre parcours de navigation, associé à un
                  identifiant pseudonyme, afin d&apos;identifier les points de
                  friction. Les champs du
                  formulaire de contact sont masqués dans les enregistrements,
                  et le widget Cloudflare Turnstile est exclu du replay.
                </p>
                <p>
                  PostHog n&apos;est activé qu&apos;après acceptation via la
                  bannière de consentement affichée lors de la première visite.
                  Les cookies de mesure d&apos;audience et le Session Replay ne
                  sont pas utilisés si vous refusez. Vous pouvez modifier votre
                  choix à tout moment via le lien «&nbsp;Gestion des
                  cookies&nbsp;» dans le pied de page du site. Ce choix est
                  mémorisé dans un cookie déposé par le site pendant une durée maximale
                  de 180 jours (environ 6 mois).
                </p>
                <p>
                  Les cookies nécessaires au stockage de votre choix de
                  consentement restent actifs afin d&apos;assurer le bon
                  fonctionnement du site. Les identifiants de mesure d&apos;audience
                  sont enregistrés uniquement après acceptation ; le retrait du
                  consentement arrête la collecte et les enregistrements futurs.
                </p>
                <p>
                  Les données collectées via cet outil sont hébergées sur
                  l&apos;infrastructure européenne de PostHog et sont utilisées
                  uniquement pour comprendre l&apos;utilisation du site et
                  améliorer son contenu. Aucune donnée personnelle saisie dans
                  le formulaire de contact n&apos;est envoyée à PostHog.
                </p>
              </LegalSection>

              <LegalSection title="11. Mise à jour de la politique">
                <p>
                  La présente politique de confidentialité peut être mise à jour
                  afin de tenir compte des évolutions du site, des outils
                  utilisés ou de la réglementation applicable.
                </p>

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
