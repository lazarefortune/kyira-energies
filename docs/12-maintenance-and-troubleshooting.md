# 12 — Maintenance et dépannage

Guide opérationnel. Pour chaque incident : symptôme → vérifications → cause probable → action.

## Site inaccessible

| Symptôme | Vérifications | Cause probable | Action |
|---|---|---|---|
| Timeout / 404 domaine | Status Netlify, DNS, HTTPS | Deploy down, DNS cassé, cert | Dashboard Netlify → Deploys / Domain ; `dig` ; rollback deploy |

## Build Netlify en erreur

| Symptôme | Vérifications | Cause probable | Action |
|---|---|---|---|
| Deploy failed | Logs build Netlify | Dépendance, TS/ESLint, Node | Reproduire `pnpm build` en local ; corriger ; redéployer |

## Domaine ne pointe plus

| Symptôme | Vérifications | Cause probable | Action |
|---|---|---|---|
| DNS incorrect | Nameservers Squarespace, records Netlify | NS changés, record manquant | Restaurer NS Netlify ; réappliquer records sauvegardés |

## Certificat HTTPS invalide

| Symptôme | Vérifications | Cause probable | Action |
|---|---|---|---|
| Avertissement SSL | Domaine attaché Netlify, DNS | Propagation / domaine mal lié | Forcer provisionnement SSL Netlify ; attendre DNS |

## Formulaire ne fonctionne plus

| Symptôme | Vérifications | Cause probable | Action |
|---|---|---|---|
| Erreur UI générique | Network tab `/api/contact`, env Netlify | Config / Turnstile / Resend | Lire `reason` JSON ; suivre lignes ci-dessous |

## Email non reçu

| Symptôme | Vérifications | Cause probable | Action |
|---|---|---|---|
| Toast succès mais pas d’email | Resend logs, spam, `CONTACT_EMAIL` | Mauvaise destination, filtre | Corriger env ; vérifier Workspace ; retester |

## Erreur Resend

| Symptôme | Vérifications | Cause probable | Action |
|---|---|---|---|
| `reason: send` / 502 | Dashboard Resend, domaine, clé | Domaine non vérifié, clé révoquée | Réparer DNS Resend / clé ; redéployer |

## Erreur Turnstile

| Symptôme | Vérifications | Cause probable | Action |
|---|---|---|---|
| `reason: turnstile` / 403 | Widget visible, domaines CF, secret | Domaine non autorisé, secret | Dashboard Cloudflare ; env Netlify ; reset widget |

## Événements PostHog absents

| Symptôme | Vérifications | Cause probable | Action |
|---|---|---|---|
| Live events vides | Consentement accepté ? clés / host ? adblock | Opt-out, env, bloqueur | Accepter cookies ; vérifier `NEXT_PUBLIC_POSTHOG_*` ; redeploy |

## Replays absents

| Symptôme | Vérifications | Cause probable | Action |
|---|---|---|---|
| Pas de replay | Consentement, `startSessionRecording`, quota PostHog | Refus cookies / init | Accepter ; parcourir plusieurs pages ; vérifier projet EU |

## Consentement bloqué

| Symptôme | Vérifications | Cause probable | Action |
|---|---|---|---|
| Bannière revient / choix ignoré | Cookie `kyira_cookie_consent`, ITP | Cookie bloqué / mauvais domaine | Tester navigation privée ; SameSite/Secure ; lien footer préférences |

## Variables manquantes

| Symptôme | Vérifications | Cause probable | Action |
|---|---|---|---|
| `config` 503 / pas d’analytics | Netlify env scopes | Scope Preview vs Prod | Ajouter vars ; **redéployer** |

## Problème Google Workspace

| Symptôme | Vérifications | Cause probable | Action |
|---|---|---|---|
| Boîte inaccessible | MX, admin Google | DNS MX altérés | Restaurer MX/DKIM Workspace depuis sauvegarde |

## Propagation DNS

| Symptôme | Vérifications | Cause probable | Action |
|---|---|---|---|
| Comportement intermittent | `dig` multi-résolveurs | TTL / cache | Attendre ; baisser TTL avant prochains changements |

## Cache navigateur

| Symptôme | Vérifications | Cause probable | Action |
|---|---|---|---|
| Ancienne version UI | Hard refresh, autre navigateur | Cache SW/CDN | Hard reload ; vérifier deploy publié ; purge cache Netlify si besoin |

## Routine de maintenance suggérée

Fréquence exacte **À confirmer** avec le responsable maintenance :

- Vérifier formulaires (envoi test)
- Surveiller builds Netlify
- Revue logs Resend
- Contrôle PostHog (spikes / erreurs)
- `pnpm outdated` / audit dépendances
- Sauvegarde périodique des records DNS
