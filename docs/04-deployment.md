# 04 — Déploiement

## Prérequis

- Accès au dépôt Git (branche de production)
- Accès au site Netlify
- Variables d’environnement renseignées sur Netlify
- Comptes Resend / Turnstile / PostHog opérationnels pour un test bout-en-bout

Installation locale : voir [README racine](../README.md).

## Fonctionnement Netlify

**Confirmé par le contexte** : Netlify héberge et déploie le projet Next.js.

**Confirmé par le dépôt** :

- Package manager : **pnpm** (`pnpm-lock.yaml`)
- Script de build : `pnpm build` (`package.json` → `"build": "next build"`)
- Branche Git distante observée : `main` (remote `origin`)
- **Aucun** `netlify.toml`, `_redirects` ou `_headers` versionné

Conséquence : la commande de build, le plugin Next.js Netlify éventuel et le mapping de branche se configurent dans l’UI Netlify. **Ne pas inventer** un nom de branche de production autre que celui réellement branché dans Netlify — vérifier dans le dashboard (`main` est le candidat le plus probable).

### Déclenchement

Typiquement (**hypothèse d’exploitation Netlify standard**, à vérifier dans le dashboard) :

- Push sur la branche de production → build automatique
- Pull requests → deploys de preview (si activés)
- Trigger manuel « Clear cache and deploy » possible depuis Netlify

## Variables d’environnement

Voir [06-environment-variables.md](./06-environment-variables.md).

Points critiques :

- Les variables `NEXT_PUBLIC_*` sont **injectées au build** : un changement nécessite un **redéploiement**
- Les secrets serveur (`TURNSTILE_SECRET_KEY`, `RESEND_API_KEY`, etc.) doivent être définis pour le contexte Production (et Preview si on teste le formulaire hors prod)
- Après modification des variables Netlify : **redéployer** explicitement

## Différence URL Netlify vs domaine principal

| URL | Usage |
|---|---|
| `https://kyira-energies.com` (et www selon redirection) | Domaine public |
| `https://<site>.netlify.app` | URL Netlify native / previews |

Les domaines autorisés Turnstile et les liens absolus éventuels doivent inclure le domaine public (et éventuellement l’URL Netlify pour les previews).

## Vérifications post-déploiement

1. Page d’accueil HTTP 200, HTTPS valide
2. Redirection apex ↔ www conforme
3. Navigation ancres (`#contact`, etc.)
4. Bannière cookies + préférences
5. Formulaire : envoi test réel (email reçu)
6. Turnstile visible et validable
7. PostHog : aucun event avant acceptation ; events après acceptation
8. Pages `/mentions-legales` et `/politique-confidentialite`
9. Responsive mobile / desktop rapide

## Preview

1. Ouvrir le deploy preview Netlify (PR ou branche)
2. Vérifier que les env Preview sont présentes si le formulaire doit être testé
3. Ajouter l’URL preview aux domaines Turnstile si besoin
4. Ne pas utiliser de clés de production partagées sans précaution

## Validation avant production

- [ ] Build Netlify vert
- [ ] Diff / revue de code faite
- [ ] Contenu sensible relu (claims CEE, mentions légales)
- [ ] Test formulaire sur preview ou staging
- [ ] Pas de secrets dans le commit
- [ ] Déploiement production
- [ ] Checklist post-déploiement ci-dessus

## Rollback

Procédure Netlify typique (**à exécuter dans le dashboard**) :

1. Site → Deploys
2. Identifier le dernier deploy connu bon
3. « Publish deploy » / rollback vers ce deploy
4. Vérifier le site + formulaire
5. Investiguer le commit fautif avant de redéployer

Si le problème vient des **DNS** ou des **variables**, le rollback applicatif seul ne suffit pas.

## Checklist de déploiement

- [ ] `pnpm build` OK en local (optionnel mais recommandé)
- [ ] Variables Netlify à jour
- [ ] Redéploiement déclenché après changement d’env
- [ ] Domaine principal répond
- [ ] Formulaire OK
- [ ] Analytics / consentement OK
- [ ] Pas de régression pages légales
