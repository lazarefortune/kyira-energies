# 01 — Vue d’ensemble du projet

## Objectif business

**Confirmé par le contexte / brief** : générer des demandes de contact B2B via une landing page professionnelle.

Le site ne vend pas en ligne : il présente l’offre et oriente vers un échange commercial.

## Positionnement

**Confirmé par le contenu éditorial** (`content/landing.ts`) et le contexte :

KYIRA ENERGIES accompagne des acteurs du **tertiaire** dans la **récupération et la valorisation de chaleur**, notamment issue d’**installations frigorifiques**, pour des usages thermiques (eau chaude, chauffage, etc.) et une meilleure performance énergétique des bâtiments.

Le financement possible des projets éligibles via les **Certificats d’économies d’énergie (CEE)** est mis en avant (jusqu’à 100 % pour les projets éligibles — formulation présente dans le contenu actuel ; l’éligibilité reste à vérifier au cas par cas).

## Public cible

Professionnels et organisations du tertiaire, par exemple :

- commerces et grande distribution
- hôtellerie et restauration
- bureaux et bâtiments tertiaires
- bâtiments publics et collectivités

Ces secteurs restent **génériques** tant que le client n’a pas fourni une liste restrictive.

## Proposition de valeur (telle que présentée sur le site)

- Valoriser une chaleur déjà produite et souvent perdue
- Contribuer aux besoins thermiques du bâtiment
- Réduire certaines dépenses énergétiques
- Accompagner de l’étude à la mise en œuvre
- Orienter vers le financement CEE lorsque le projet est éligible

## Sections principales

Ordre actuel dans `app/page.tsx` :

| Section | Composant | Ancre / id | Tracking `section_viewed` |
|---|---|---|---|
| Hero | `HeroSection` | `#accueil` | Oui (`hero`) |
| À propos | `AboutSection` | `#a-propos` | Oui (`about`) |
| Solution | `ServicesSection` | `#solution` | Oui (`solution`) |
| Financement | `FinancingSection` | `#financement` | Non |
| Méthode | `MethodSection` | `#methode` | Oui (`method`) |
| Secteurs | `SectorsSection` | `#secteurs` | Oui (`sectors`) |
| Confiance / logos | `TestimonialsSection` | `#confiance` | Non |
| FAQ | `FAQSection` | `#faq` | Oui (`faq`) |
| Contact | `ContactSection` | `#contact` | Oui (`contact`) |

Pages annexes :

- `/mentions-legales`
- `/politique-confidentialite`

## Parcours utilisateur principal

1. Arrivée sur la landing (souvent via recherche, lien direct ou campagne UTM)
2. Lecture du hero et découverte de la solution
3. (Optionnel) lecture méthode / secteurs / FAQ / financement
4. Clic CTA vers `#contact`
5. Remplissage du formulaire + Turnstile
6. Envoi réussi → toast de confirmation ; email reçu par KYIRA
7. (Si consentement analytics) événements PostHog et éventuellement Session Replay

## CTA principaux

| CTA | Destination | Source typique |
|---|---|---|
| Demander un échange | `#contact` | Hero (primaire) |
| Découvrir la solution | `#solution` | Hero (secondaire) |
| Étudier mon potentiel | `#contact` | Section solution |
| Vérifier mon éligibilité | `#contact` | Section financement |
| Poser une question | `#contact` | FAQ |
| Navigation Contact | `#contact` | Header |

## Fonctionnalités présentes

**Confirmé par le code** :

- Landing one-page responsive
- Formulaire de contact (validation, honeypot, Turnstile, Resend)
- Consentement cookies + PostHog (événements + Session Replay après acceptation)
- Attribution UTM first-touch (30 jours, localStorage)
- Pages légales
- Variante hero/header (`classic` | `split`) via `lib/site-variant.ts` (valeur actuelle : `classic`)
- Animations Motion limitées aux besoins UI

## Fonctionnalités envisagées mais non actives

| Élément | Statut |
|---|---|
| Reverse proxy PostHog | **Option future** — non configuré |
| Destinataire contact depuis BDD | **TODO** dans `lib/contact-destination.ts` |
| Logos clients réels | Placeholders dans `trustedBy` |
| Téléphone / email publics affichés | Non exposés comme canaux secondaires confirmés sur le formulaire (contact via formulaire + identité Yannis Miame) |
| Dashboard client analytics | Non présent dans le dépôt |

## Confirmé vs hypothèses

| Sujet | Statut |
|---|---|
| Objectif = demandes de contact | Confirmé (brief + architecture) |
| Domaine `kyira-energies.com` | Confirmé par le contexte |
| Hébergement Netlify | Confirmé par le contexte (aucun `netlify.toml` dans le dépôt) |
| Contact principal Yannis Miame | Confirmé (contenu + contexte) |
| Zone géographique d’intervention | **À confirmer** auprès du client |
| Certifications | **À confirmer** — ne pas inventer |
| Références clients | Placeholders — **à confirmer** |
| Pourcentage CEE « 100 % » | Présent dans le contenu actuel — cadrage juridique / commercial **à confirmer** si besoin |
