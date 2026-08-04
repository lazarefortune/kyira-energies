# 06 — Variables d’environnement

## Inventaire

| Variable | Portée | Secrète | Utilisée par | Description | Exemple factice |
|---|---|---|---|---|---|
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Client (build) | Non (publique) | `TurnstileWidget` | Clé site Turnstile | `0x4AAAAAAAExamplePublicKey` |
| `TURNSTILE_SECRET_KEY` | Serveur | **Oui** | `lib/turnstile.ts` | Secret de vérification Turnstile | `0x4AAAAAAAExampleSecretKey` |
| `RESEND_API_KEY` | Serveur | **Oui** | `lib/mail.ts` | Clé API Resend (envoi) | `re_xxxxxxxx_example` |
| `RESEND_FROM_EMAIL` | Serveur | Sensible (config) | `lib/mail.ts` | Expéditeur technique vérifié | `noreply@example.com` |
| `CONTACT_EMAIL` | Serveur | Sensible (config) | `lib/contact-destination.ts`, `lib/mail.ts` | Destinataire des demandes | `contact@example.com` |
| `NEXT_PUBLIC_POSTHOG_KEY` | Client (build) | Semi-publique | `PostHogProvider` | Clé projet PostHog | `phc_exampleKeyNotReal` |
| `NEXT_PUBLIC_POSTHOG_HOST` | Client (build) | Non | `PostHogProvider` | Host API PostHog | `https://eu.i.posthog.com` |

Sources code : `.env.example`, `components/ui/TurnstileWidget.tsx`, `lib/turnstile.ts`, `lib/mail.ts`, `lib/contact-destination.ts`, `components/analytics/PostHogProvider.tsx`.

> Ne jamais documenter ni committer de valeurs réelles. Les exemples ci-dessus sont **factices**.

## Variables publiques vs serveur

### Publiques (`NEXT_PUBLIC_*`)

- Embarquées dans le bundle navigateur au **build**
- Visibles par tout utilisateur
- Changer la valeur → **rebuild / redéployer** obligatoire

### Serveur

- Lues uniquement dans les Route Handlers / code serveur
- Ne doivent jamais être préfixées par `NEXT_PUBLIC_`
- `TURNSTILE_SECRET_KEY` et `RESEND_API_KEY` sont des **secrets**

## Comportement si absentes

| Variable absente | Effet observé / attendu |
|---|---|
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Widget non rendu ; côté client la validation Turnstile peut être contournée localement, mais le serveur exige quand même un token valide → échec probable |
| `TURNSTILE_SECRET_KEY` | `verifyTurnstileToken` échoue (`missing-secret`) → API `403` `turnstile` |
| `RESEND_API_KEY` / `RESEND_FROM_EMAIL` / `CONTACT_EMAIL` | `isMailConfigured()` faux → API `503` `config` |
| `NEXT_PUBLIC_POSTHOG_KEY` ou `HOST` | PostHog non initialisé (early return) — site OK, pas d’analytics |

## Emplacements

| Environnement | Fichier / lieu |
|---|---|
| Local | `.env.local` (gitignoré) — modèle `.env.example` |
| Production | Netlify → Environment variables (scope Production) |
| Preview | Netlify → scope Deploy Preview / Branch (si utilisé) |

## Risques si exposées

| Fuite | Risque | Action |
|---|---|---|
| `TURNSTILE_SECRET_KEY` | Contournement antibot | Rotation immédiate Cloudflare |
| `RESEND_API_KEY` | Envoi d’emails abusif / coût | Révocation + rotation Resend |
| `CONTACT_EMAIL` | Fuite d’adresse destinataire | Moins critique mais à traiter |
| Clés `NEXT_PUBLIC_*` | Abus de quota / spam analytics | Rotation PostHog / Turnstile site key + domaines autorisés |

## Note sur `NEXT_PUBLIC_POSTHOG_HOST`

- Valeur actuelle attendue : endpoint PostHog EU **direct** (ex. host EU officiel PostHog)
- Le commentaire de `.env.example` évoque un reverse proxy éventuel (ex. Netlify) : **ce proxy n’est pas actif**
- Procédure future : section « Reverse proxy PostHog, non activé » dans [10-analytics-and-consent.md](./10-analytics-and-consent.md)
