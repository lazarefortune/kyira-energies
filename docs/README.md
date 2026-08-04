# Documentation KYIRA ENERGIES

Point d’entrée de la documentation **technique, fonctionnelle et opérationnelle** du site [kyira-energies.com](https://kyira-energies.com).

## Audience

Cette documentation s’adresse aux développeurs, mainteneurs et interlocuteurs techniques qui reprennent ou exploitent le projet **sans connaître son historique**.

Pour installer et démarrer le projet en local, utiliser le [README racine](../README.md). Ce dossier `docs/` ne duplique pas ces instructions : il couvre l’architecture, l’hébergement, le déploiement, les services tiers, la maintenance et la transmission.

## Présentation courte

**KYIRA ENERGIES** est un site vitrine B2B one-page. Il présente la récupération de chaleur pour bâtiments tertiaires et convertit les visiteurs vers un formulaire de contact.

**Statut** : site en production sur Netlify, domaine `kyira-energies.com` (registrar Squarespace, DNS Netlify).

## Architecture en une phrase

Navigateur → Netlify (Next.js) → formulaire `/api/contact` (Turnstile + Resend) ; mesure d’audience PostHog EU uniquement après consentement cookies.

## Documents

| Document | Contenu |
|---|---|
| [01 — Vue d’ensemble](./01-project-overview.md) | Objectif business, sections, parcours, CTA |
| [02 — Architecture technique](./02-technical-architecture.md) | Stack, dossiers, routes, diagrammes |
| [03 — Hébergement et infrastructure](./03-hosting-and-infrastructure.md) | Netlify, DNS, Resend, PostHog, Workspace… |
| [04 — Déploiement](./04-deployment.md) | Build, variables, preview, rollback, checklist |
| [05 — Domaine, DNS et HTTPS](./05-domain-dns-and-https.md) | Squarespace, Netlify DNS, email, SSL |
| [06 — Variables d’environnement](./06-environment-variables.md) | Inventaire, portées, risques |
| [07 — Formulaire de contact](./07-contact-form.md) | Flux, validation, sécurité, tests |
| [08 — Email et Resend](./08-email-and-resend.md) | Envoi transactionnel vs messagerie humaine |
| [09 — Cloudflare Turnstile](./09-turnstile.md) | Captcha, clés, replay |
| [10 — Analytics et consentement](./10-analytics-and-consent.md) | PostHog, événements, Session Replay, proxy |
| [11 — Sécurité et confidentialité](./11-security-and-privacy.md) | Secrets, RGPD technique, pages légales |
| [12 — Maintenance et incidents](./12-maintenance-and-troubleshooting.md) | Guide de dépannage |
| [13 — Checklist de transmission](./13-handover-checklist.md) | Accès et tests de reprise |
| [14 — Points ouverts](./14-open-points.md) | À confirmer / options futures |

### Documents historiques (contexte produit)

| Document | Contenu |
|---|---|
| [project-brief.md](./project-brief.md) | Brief initial (ton, règles de contenu) |

## Points encore à confirmer (aperçu)

- Propriétaires exacts de chaque compte cloud (hors Squarespace / Yannis pour le domaine)
- Adresses email définitives (`CONTACT_EMAIL`, `RESEND_FROM_EMAIL`)
- Durée de conservation PostHog et politique de rotation des clés
- Activation éventuelle du reverse proxy PostHog
- Logos clients / témoignages (placeholders présents)
- Périmètre métier exact (étude / fourniture / installation / maintenance)

Détail : [14-open-points.md](./14-open-points.md).

## Légende des sources

Dans ces documents :

| Mention | Signification |
|---|---|
| **Confirmé par le code** | Vérifié dans le dépôt |
| **Confirmé par le contexte** | Fourni par le brief de reprise / exploitation |
| **À confirmer** | Information manquante ou non vérifiable ici |
| **Option future** | Envisagé, non actif |
