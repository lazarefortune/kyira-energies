# 11 — Sécurité et confidentialité

> Document technique d’exploitation. **Ce n’est pas un avis juridique.**

## Principes

- Moindre exposition des secrets
- Validation serveur systématique sur le formulaire
- Antibot (honeypot + Turnstile)
- Analytics opt-in
- Pas de PII dans PostHog
- Contenu business non inventé

## Secrets et variables

Voir [06-environment-variables.md](./06-environment-variables.md).

- Secrets uniquement serveur
- `.env*` gitignoré sauf `.env.example`
- Pas de secrets dans le frontend, les tickets publics ou cette documentation

## Validation et antibot

- Validation longueurs / email côté serveur
- Honeypot `website`
- Turnstile siteverify avant Resend

## Limitation des données

Formulaire : uniquement les champs nécessaires à la reprise de contact.  
Analytics : propriétés contextuelles non nominatives.

## Consentement et Session Replay

- Cookie first-party de choix
- Opt-out PostHog par défaut
- Replay masqué / Turnstile bloqué / pas de body ni headers réseau

## Pages légales

| Page | Chemin |
|---|---|
| Mentions légales | `/mentions-legales` |
| Politique de confidentialité | `/politique-confidentialite` |

Informations déjà renseignées (ex. dénomination, forme juridique, SIREN/SIRET, siège, code APE).  

Placeholders `PendingValue` encore présents dans `app/mentions-legales/page.tsx` au moment de l’audit :

- TVA intracommunautaire
- Directeur de la publication
- Email / téléphone de contact publics
- Nom, adresse et site de l’hébergeur (texte indiquant encore une complétion « avant mise en ligne »)
- Email pour les demandes relatives aux données personnelles

La page `politique-confidentialite` décrit PostHog / Turnstile / Resend de façon plus à jour que le paragraphe cookies des mentions légales (encore générique) — **alignement éditorial à confirmer**.

## Sous-traitants techniques (vue exploitation)

| Acteur | Traitement approximatif |
|---|---|
| Netlify | Hébergement / logs techniques |
| Resend | Envoi email formulaire |
| Cloudflare | Turnstile |
| PostHog EU | Analytics / replay après consentement |
| Google Workspace | Messagerie humaine |

Responsable de traitement / base légale / DPA : **points RGPD à confirmer** avec le client / conseil.

## Risques

| Risque | Commentaire |
|---|---|
| Logs applicatifs | Éviter de logger le body du formulaire ou les tokens |
| Messages d’erreur trop verbeux | L’API renvoie des `reason` génériques — conserver ce niveau |
| Dépendances npm | Surveiller `pnpm audit` / mises à jour Next/React |
| Fuite de clé | Rotation immédiate (Resend, Turnstile, PostHog) |
| DNS mal migré | Cassee email + formulaire — voir doc DNS |

## Procédure en cas de fuite de clé

1. Révoquer la clé compromise
2. Générer une nouvelle clé
3. Mettre à jour Netlify (+ local)
4. Redéployer
5. Vérifier logs d’usage anormal
6. Documenter l’incident en interne (sans republier le secret)

## Conservation

| Donnée | Lieu | Durée |
|---|---|---|
| Choix cookies | Cookie navigateur | ~13 mois (code) |
| UTM first-touch | localStorage | 30 jours (code) |
| Emails reçus | Workspace | **Politique client à confirmer** |
| Events / replays | PostHog | **À vérifier dans PostHog** |
| Logs Resend | Resend | Selon offre Resend — **à confirmer** |

## Points RGPD à confirmer (non exhaustif)

- Registre des traitements
- DPA signés avec sous-traitants
- Durées de conservation email / PostHog
- Mentions hébergeur complètes
- Contact DPO / responsable si applicable
