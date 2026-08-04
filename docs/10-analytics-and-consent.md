# 10 — Analytics et consentement

## Rôle de PostHog

PostHog Cloud **EU** mesure l’audience et enregistre des Session Replays **uniquement après consentement**.

Fichiers clés :

- `components/analytics/PostHogProvider.tsx` — init
- `lib/analytics.ts` — events + enable/disable
- `lib/consent.ts` — cookie de choix
- `lib/analytics-utm.ts` — attribution first-touch
- `components/analytics/CookieConsentManager.tsx` — bannière
- `components/analytics/SectionViewTracker.tsx` — `section_viewed`

## Configuration produit (code)

| Option | Valeur |
|---|---|
| Opt-out par défaut | `opt_out_capturing_by_default: true` |
| Autocapture | `false` |
| Person profiles | `never` |
| Session recording au boot | `disable_session_recording: true` |
| Pageview | `capture_pageview: true` (effectif seulement après opt-in) |
| Mask inputs | `maskAllInputs: true` |
| Headers / body réseau | `recordHeaders: false`, `recordBody: false` |
| Turnstile | bloqué via `blockSelector` |

## Consentement

Cookie first-party : `kyira_cookie_consent` = `accepted` \| `rejected`  
Durée : ~13 mois (`COOKIE_CONSENT_MAX_AGE_SECONDS`)  
UI : bannière + modale « Gestion des cookies » (lien footer)

### Avant consentement

- Aucun événement métier via `trackEvent`
- Pas de Session Replay
- PostHog reste opt-out

### Après acceptation

- Cookie `accepted`
- `opt_in_capturing()` + `startSessionRecording()`
- Capture first-touch UTM
- Événements autorisés
- Events consent : `cookie_consent_accepted` / éventuellement `cookie_preferences_saved`

### Après retrait

- Stop replay
- `opt_out_capturing()`
- `reset(true)` puis ré-opt-out
- `clearFirstTouchAttribution()`
- Aucun nouvel événement ; **pas** d’événement de refus

## Événements

Registre : `ANALYTICS_EVENTS` dans `lib/analytics.ts`

| Événement |
|---|
| `logo_clicked` |
| `navigation_link_clicked` |
| `mobile_menu_opened` |
| `hero_primary_cta_clicked` |
| `hero_secondary_cta_clicked` |
| `section_viewed` |
| `faq_item_opened` |
| `contact_form_started` |
| `contact_form_submit_attempted` |
| `contact_form_validation_failed` |
| `contact_form_submitted` |
| `contact_form_failed` |
| `cookie_consent_accepted` |
| `cookie_preferences_opened` |
| `cookie_preferences_saved` |

### Sections trackées (`section_viewed`)

`hero`, `about`, `solution`, `method`, `sectors`, `faq`, `contact`

### Hors tracking section

- Financement (`#financement`)
- Avis / logos (`#confiance`)

Seuil : ~45 % visible pendant 750 ms, une fois par chargement.

## Propriétés

### Autorisées (exemples)

- `page_path` (sans query), `page_title`, `viewport_category`, `referrer_domain`
- `section_name`, `form_location`, `submit_source`, `failure_reason`
- UTM first-touch sur événements de conversion : `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`

### Interdites

- Nom, entreprise, email, téléphone, message
- Token Turnstile
- URL complète avec query sensible
- Tout autre PII

## UTM first-touch

- Stockage : `localStorage` clé `kyira_analytics_attribution`
- TTL : 30 jours
- Enregistré **après** acceptation du consentement
- Non écrasé tant que valide
- Supprimé au retrait du consentement

## Session Replay

- Démarré seulement après acceptation
- Inputs masqués
- Turnstile bloqué
- Pas de capture body/headers réseau
- Pas de capture console configurée actuellement

## Tests PostHog

### Live events

1. Accepter les cookies
2. Naviguer / ouvrir FAQ / soumettre formulaire
3. Vérifier Live events (filtre projet EU)

### Replays

1. Accepter les cookies
2. Parcourir le site
3. Vérifier qu’un replay apparaît
4. Contrôler le masquage des champs contact et l’absence du widget Turnstile

### Funnels recommandés

1. `hero_primary_cta_clicked` → `contact_form_started` → `contact_form_submitted`
2. `section_viewed` (contact) → `contact_form_submitted`
3. `contact_form_submit_attempted` → `contact_form_submitted` (taux de succès)

### Dashboards suggérés

- Volume de `contact_form_submitted` / semaine
- Funnel conversion hero → contact
- Répartition `viewport_category`
- Top `failure_reason`
- Sections vues (hors financement / confiance)

### Conservation

Durée de rétention PostHog : **À vérifier manuellement** dans le projet PostHog (voir [14-open-points.md](./14-open-points.md)).

---

## Reverse proxy PostHog, non activé

### État actuel

- **Non configuré**
- `NEXT_PUBLIC_POSTHOG_HOST` pointe vers l’endpoint PostHog EU **direct**
- Le site fonctionne sans reverse proxy

### Pourquoi PostHog le propose

Un reverse proxy (sous-domaine first-party) peut réduire le blocage par certains adblockers et améliorer la collecte. Ce n’est **pas nécessaire** au fonctionnement actuel.

### Activation future (procédure)

1. Dans PostHog, générer la configuration reverse proxy officielle (ne **pas inventer** le sous-domaine ni les cibles)
2. Créer le sous-domaine choisi
3. Ajouter le **CNAME** (ou record indiqué) dans **Netlify DNS** (zone DNS actuelle)
4. Attendre la propagation / validation PostHog
5. Mettre à jour `NEXT_PUBLIC_POSTHOG_HOST` (local + Netlify) avec l’URL fournie
6. **Redéployer** (variable `NEXT_PUBLIC_*`)
7. Vérifier Live events + politique de confidentialité (cohérence du sous-domaine / destinataires)
8. Tester avec et sans bloqueurs

Tant que PostHog n’a pas fourni les valeurs exactes, **aucune** valeur DNS inventée ne doit être écrite dans la doc ou la config.
