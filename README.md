# KYIRA ENERGIES

Site vitrine B2B one-page pour **KYIRA ENERGIES** (récupération de chaleur / bâtiments tertiaires). Objectif principal : générer des demandes de contact.

Stack : **Next.js 16** (App Router) · **React 19** · **TypeScript** · **Tailwind CSS 4** · **Motion** · **Resend** · **Cloudflare Turnstile** · **PostHog**

## Prérequis

- [Node.js](https://nodejs.org/) 20+ (testé avec Node 22)
- [pnpm](https://pnpm.io/) — le lockfile du projet est `pnpm-lock.yaml`

```bash
npm install -g pnpm
```

## Installation

```bash
# 1. Cloner le dépôt
git clone <url-du-repo> kyira-energies
cd kyira-energies

# 2. Installer les dépendances
pnpm install

# 3. Configurer l'environnement
cp .env.example .env.local
# Puis renseigner les variables (voir ci-dessous)

# 4. Lancer le serveur de développement
pnpm dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Variables d'environnement

Copier `.env.example` vers `.env.local`. Ne jamais committer de secrets.

| Variable | Portée | Rôle |
|---|---|---|
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Client | Clé publique Cloudflare Turnstile (anti-spam formulaire) |
| `TURNSTILE_SECRET_KEY` | Serveur | Clé secrète Turnstile |
| `CONTACT_EMAIL` | Serveur | Destinataire des demandes de contact |
| `RESEND_FROM_EMAIL` | Serveur | Expéditeur Resend (domaine vérifié). Tests : `onboarding@resend.dev` |
| `RESEND_API_KEY` | Serveur | Clé API Resend |
| `NEXT_PUBLIC_POSTHOG_KEY` | Client | Clé projet PostHog |
| `NEXT_PUBLIC_POSTHOG_HOST` | Client | Host / reverse proxy PostHog |

Sans Resend / Turnstile correctement configurés, le formulaire de contact ne pourra pas envoyer d’e-mails en conditions réelles. PostHog ne s’active qu’après consentement cookies.

## Scripts

| Commande | Description |
|---|---|
| `pnpm dev` | Serveur de développement |
| `pnpm build` | Build de production |
| `pnpm start` | Serveur de production (après `build`) |
| `pnpm lint` | ESLint |

## Structure du projet

```
app/                    # Routes Next.js (App Router)
  page.tsx              # Landing page (assemblage des sections)
  layout.tsx            # Layout global (header, footer, analytics, toasts)
  api/contact/          # API POST du formulaire de contact
  mentions-legales/
  politique-confidentialite/

components/
  sections/             # Sections de la landing (Hero, Services, Contact…)
  layout/               # Header, Footer
  ui/                   # Composants UI réutilisables
  analytics/            # Consentement cookies + PostHog

content/
  landing.ts            # Contenu éditorial de la landing (textes, FAQ, etc.)

lib/                    # Logique métier (mail, Turnstile, consent, analytics…)
types/                  # Types TypeScript partagés
docs/                   # Brief projet et contenu de référence
public/                 # Assets statiques
```

## Où modifier quoi

| Besoin | Fichier |
|---|---|
| Textes de la landing | `content/landing.ts` |
| Ordre / présence des sections | `app/page.tsx` |
| Variante hero + header (`classic` \| `split`) | `lib/site-variant.ts` |
| Envoi d’e-mails | `lib/mail.ts` + `app/api/contact/route.ts` |
| Styles globaux / tokens CSS | `app/globals.css` |
| Brief métier & règles contenu | `docs/project-brief.md` |
| Brouillon contenu v1 | `docs/content-v1.md` |

**Règle contenu** : ne pas inventer de faits business (certifications, références clients, chiffres, partenaires…). Utiliser des placeholders du type « À confirmer » tant que le client n’a pas validé.

## Fonctionnalités clés

- **Landing one-page** : hero, à propos, services, financement, méthode, secteurs, témoignages, FAQ, contact
- **Formulaire de contact** : validation, honeypot, Turnstile, envoi via Resend (`POST /api/contact`)
- **Analytics** : PostHog derrière bandeau / préférences cookies (RGPD)
- **Pages légales** : mentions légales, politique de confidentialité

## Documentation

- **[docs/README.md](docs/README.md)** — documentation d’architecture, d’exploitation, de déploiement et de maintenance (reprise de projet)
- [`docs/project-brief.md`](docs/project-brief.md) — brief produit (ton, règles de contenu)
- [`.env.example`](.env.example) — modèle des variables d’environnement

## Déploiement

Production : **Netlify** (builds, HTTPS, variables d’environnement, DNS). Détails : [`docs/04-deployment.md`](docs/04-deployment.md).

Build local de vérification :

```bash
pnpm build
pnpm start
```
