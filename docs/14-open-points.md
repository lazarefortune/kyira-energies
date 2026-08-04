# 14 — Points ouverts

Légende : **Confirmé** · **À vérifier dans le code / dashboard** · **À demander au client** · **Option future**

## Infrastructure et comptes

| Point | Statut |
|---|---|
| Hébergement Netlify | Confirmé (contexte) |
| Registrar Squarespace / Yannis | Confirmé (contexte) |
| DNS Netlify | Confirmé (contexte) |
| Owner exact compte Netlify | À demander au client / équipe |
| Owner Resend / Cloudflare / PostHog / GitHub | À demander |
| Owner Google Workspace | À demander |
| Branche de production Netlify | À vérifier dans le dashboard (candidat : `main`) |
| Présence plugin Next.js Netlify / config UI | À vérifier (pas de `netlify.toml` dans le repo) |

## Email

| Point | Statut |
|---|---|
| Domaine Resend vérifié | Confirmé (contexte) |
| Réception Resend désactivée | Confirmé (contexte) |
| Adresse définitive `CONTACT_EMAIL` | À demander / à vérifier Netlify (ne pas publier ici) |
| Adresse définitive `RESEND_FROM_EMAIL` | À demander / à vérifier Netlify |
| Politique de conservation des emails reçus | À demander au client |
| Destinataire contact depuis BDD | Option future (`lib/contact-destination.ts`) |

## Analytics

| Point | Statut |
|---|---|
| PostHog EU + consentement | Confirmé (code + contexte) |
| Autocapture off, profiles never, replay masqué | Confirmé (code) |
| Sections financement / confiance hors `section_viewed` | Confirmé (code) |
| Durée de conservation PostHog | À vérifier dans le dashboard PostHog |
| Reverse proxy PostHog | Option future — non actif |
| Sous-domaine / CNAME proxy | À ne pas inventer — attendre config PostHog |
| Dashboard client dédié | Option future |

## Sécurité / RGPD

| Point | Statut |
|---|---|
| Politique de rotation des clés | À demander / à définir |
| DPA sous-traitants | À demander |
| Mentions légales : hébergeur, TVA, directeur publication, contacts | Placeholders `PendingValue` — à compléter avec le client |
| Alignement cookies mentions vs politique de confidentialité | À vérifier (politique plus à jour) |
| Responsabilité maintenance après livraison | À demander |

## Contenu métier

| Point | Statut |
|---|---|
| Positionnement récupération de chaleur / CEE | Confirmé (contenu actuel) |
| Logos / références clients | Placeholders — à demander |
| Certifications | À demander — ne pas inventer |
| Zone d’intervention | À demander |
| Téléphone / email publics affichés | À demander |
| Périmètre exact étude / fourniture / installation / maintenance | À demander |
| Activation éditoriale section avis avec vrais clients | Option future |
| Claims « 100 % » CEE | Présents dans le contenu — validation commerciale / juridique à confirmer si besoin |

## Technique repo

| Point | Statut |
|---|---|
| `docs/content-v1.md` référencé par d’anciennes notes | Absent du dépôt au moment de l’audit — à recréer ou retirer des liens |
| Variante hero `classic` active | Confirmé (`lib/site-variant.ts`) |
| Fréquence de contrôle des dépendances | À demander / à définir |

## Actions à demander à Yannis

1. Confirmer les owners de chaque compte cloud et les invitations nécessaires
2. Confirmer les adresses email From / To définitives
3. Valider ou remplacer les placeholders clients / preuves
4. Clarifier zone d’intervention et périmètre de service
5. Indiquer qui maintient le site après livraison
6. Valider les mentions légales restantes / contacts légaux
7. Décider si le reverse proxy PostHog est souhaité plus tard
