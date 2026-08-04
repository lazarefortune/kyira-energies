# 09 — Cloudflare Turnstile

## Rôle

Turnstile protège le formulaire de contact contre les soumissions automatisées. Cloudflare est utilisé **uniquement** pour Turnstile dans ce projet (**contexte**) — pas comme proxy CDN principal du site.

## Architecture

| Côté | Fichier | Action |
|---|---|---|
| Client | `components/ui/TurnstileWidget.tsx` | Charge le script, rend le widget, fournit un token |
| Client | `ContactForm.tsx` | Exige le token si site key présente, reset après envoi |
| Serveur | `lib/turnstile.ts` | `POST` vers `https://challenges.cloudflare.com/turnstile/v0/siteverify` |

## Clés

| Clé | Variable | Exposition |
|---|---|---|
| Site key (publique) | `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Navigateur |
| Secret | `TURNSTILE_SECRET_KEY` | Serveur uniquement |

Le secret **ne doit jamais** être préfixé `NEXT_PUBLIC_` ni committé.

## Widget côté client

- Script : `api.js?render=explicit`
- Thème `light`, taille `flexible`
- Callbacks : succès / expiration / erreur → `onTokenChange`
- Remount via `key={turnstileResetKey}` après soumission
- Conteneur marqué `ph-no-capture` + `data-ph-block="turnstile"` pour Session Replay

Si la site key est absente, le composant retourne `null` (pas de widget).

## Vérification serveur

Sans secret ou sans token → échec. La route contact renvoie `403` `{ ok: false, reason: "turnstile" }`.

## Domaines autorisés

À configurer dans le dashboard Cloudflare Turnstile :

- `kyira-energies.com` / `www`
- `localhost` pour le dev
- URLs `*.netlify.app` de preview si besoin

**À confirmer** la liste exacte actuellement enregistrée.

## Local vs production

| Environnement | Attendu |
|---|---|
| Local | Site key + secret de test/prod selon config ; domaines localhost autorisés |
| Production | Clés prod ; domaines publics autorisés |

## Reset du widget

Après succès, échec API, ou erreur réseau, `ContactForm` appelle `resetTurnstile()` pour invalider l’ancien token.

## Erreurs fréquentes

| Symptôme | Piste |
|---|---|
| Widget invisible | Site key absente / bloquée / mauvais domaine |
| Toujours « anti-spam a échoué » | Secret manquant, token expiré, domaine non autorisé |
| OK en local, KO en prod | Domaines Turnstile ou variables Netlify |
| Replay PostHog montre le captcha | Vérifier `blockSelector` / classes `ph-no-capture` |

## Sécurité et confidentialité

- Le token est éphémère ; ne pas le logger
- Ne pas l’envoyer à PostHog
- Le secret reste serveur
- Interaction Session Replay : zone bloquée dans `PostHogProvider` (`blockSelector` + classes)

## Interaction avec Session Replay

Confirmé dans `components/analytics/PostHogProvider.tsx` :

- `maskAllInputs: true`
- `blockSelector` inclut `[data-ph-block="turnstile"]`, `.cf-turnstile`, iframes Cloudflare challenges
