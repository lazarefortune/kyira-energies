# 13 — Checklist de transmission (handover)

Ne jamais échanger de mots de passe dans ce document ou par canal non sécurisé. Utiliser des invitations de compte / SSO.

## Accès

- [ ] Netlify (site + DNS)
- [ ] Squarespace Domains (registrar)
- [ ] Resend
- [ ] Cloudflare (Turnstile)
- [ ] PostHog (projet EU)
- [ ] Google Workspace (admin / boîtes)
- [ ] GitHub (dépôt + droits)
- [ ] (Optionnel) comptes design / assets

## Domaine et DNS

- [ ] Domaine `kyira-energies.com` identifié
- [ ] Nameservers = Netlify
- [ ] Export / capture des records DNS sauvegardé
- [ ] HTTPS valide apex + www
- [ ] MX Workspace vérifiés
- [ ] Enregistrements Resend vérifiés

## Application

- [ ] Accès code source
- [ ] README racine lu (install local)
- [ ] Documentation `docs/` lue
- [ ] `.env.example` compris
- [ ] Variables Netlify listées (sans exposer les secrets dans un doc partagé)
- [ ] Branche de production Netlify identifiée

## Emails

- [ ] `CONTACT_EMAIL` connue des destinataires métier
- [ ] `RESEND_FROM_EMAIL` documentée
- [ ] Test formulaire → email reçu
- [ ] Reply-To prospect OK
- [ ] Distinction Workspace / Resend comprise

## Analytics

- [ ] Projet PostHog EU accessible
- [ ] Test consentement accepté / refusé
- [ ] Live events OK
- [ ] Replay OK + masquage vérifié
- [ ] Reverse proxy noté comme **non actif**

## Qualité

- [ ] Test responsive mobile / desktop
- [ ] Parcours CTA → contact
- [ ] Pages légales relues
- [ ] SEO de base (titles / meta)
- [ ] Perf approximative (chargement landing)
- [ ] Accessibilité rapide (focus, contraste, labels formulaire)
- [ ] HTTPS vérifié

## Contenu client

- [ ] Informations manquantes listées (voir [14-open-points.md](./14-open-points.md))
- [ ] Placeholders logos / claims identifiés
- [ ] Interlocuteur Yannis Miame confirmé pour validations métier

## Livrables de transmission

- [ ] Liste des comptes et owners
- [ ] Procédure d’incident (lien doc 12)
- [ ] Contact escalation technique
- [ ] Responsabilité maintenance post-livraison **à confirmer**
