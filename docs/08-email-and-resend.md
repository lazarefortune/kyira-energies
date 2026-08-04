# 08 — Email et Resend

## Google Workspace vs Resend

| | Google Workspace | Resend |
|---|---|---|
| Rôle | Messagerie humaine (lire / répondre) | Envoi transactionnel du formulaire |
| Remplace l’autre ? | Non | Non |
| DNS | MX + DKIM (+ SPF) | Enregistrements de vérification / authentification d’envoi |
| Réception | Oui | Désactivée (**contexte**) |

Resend n’est **pas** la boîte mail de KYIRA. Il envoie un message vers `CONTACT_EMAIL`, qui doit être une adresse Workspace (ou autre boîte réelle).

## Pourquoi vérifier le domaine

Sans domaine vérifié, les emails risquent d’être refusés ou d’atterrir en spam. Le domaine `kyira-energies.com` est vérifié chez Resend (**contexte**).

Pour les tests locaux, Resend autorise souvent `onboarding@resend.dev` (rappel dans `.env.example`).

## SPF, DKIM, MX `send`

| Mécanisme | Rôle |
|---|---|
| **SPF** | Autorise les serveurs autorisés à envoyer pour le domaine |
| **DKIM** | Signature cryptographique des messages |
| **MX `send` (Resend)** | Peut faire partie de la config Resend — **ne pas confondre** avec les MX Workspace de réception humaine |

Toute modification DNS doit conserver **à la fois** Workspace et Resend. Voir [05-domain-dns-and-https.md](./05-domain-dns-and-https.md).

## Adresses

| Rôle | Variable / lieu | Statut |
|---|---|---|
| Expéditeur technique | `RESEND_FROM_EMAIL` | **À confirmer** (ex. documenté comme `noreply@…` dans `.env.example`) |
| Destinataire demandes | `CONTACT_EMAIL` | **À confirmer** |
| Reply-To | Email saisi par le prospect | Confirmé par le code (`replyTo`) |

## API key

- Limitée à l’envoi (**contexte**)
- Stockée uniquement serveur (`RESEND_API_KEY`)
- Visible dans le dashboard Resend (logs d’envoi) pour le diagnostic

### Rotation

1. Créer une nouvelle clé Resend
2. Mettre à jour Netlify + `.env.local`
3. Redéployer
4. Révoquer l’ancienne clé
5. Tester le formulaire

### Clé compromise

1. Révoquer immédiatement dans Resend
2. Générer une nouvelle clé
3. Mettre à jour Netlify + redéployer
4. Vérifier les logs d’envoi suspects
5. Informer le client si nécessaire

## Gestion des erreurs côté app

`sendContactEmail` lève une erreur si Resend renvoie `error` → API répond `502` / `reason: send`. Le détail Resend n’est pas renvoyé au client (bonne pratique).

## Journal Resend

Utiliser le dashboard Resend pour :

- confirmer la livraison
- lire les messages d’erreur d’API
- vérifier le domaine

## Procédure de test

1. Configurer env locales ou preview
2. Envoyer un message test via le formulaire
3. Vérifier réception sur `CONTACT_EMAIL`
4. Vérifier que « Répondre » cible le prospect
5. Contrôler l’entrée dans les logs Resend

## Points de vigilance anti-spam

- Garder SPF/DKIM alignés
- Éviter un volume soudain anormal
- Ne pas utiliser une adresse From non vérifiée
- Surveiller les bounces dans Resend
- Ne pas désactiver Workspace MX « pour simplifier »
