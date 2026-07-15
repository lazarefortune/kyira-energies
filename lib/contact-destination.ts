/**
 * Résout l'adresse email de destination des demandes de contact.
 *
 * Aujourd'hui : variable d'environnement CONTACT_TO_EMAIL.
 * À terme : lecture depuis la base de données (remplacer le corps de cette fonction).
 */
export async function getContactDestinationEmail(): Promise<string | null> {
  // TODO(bdd): remplacer par une lecture en base (destinataire configurable).
  const email = process.env.CONTACT_TO_EMAIL?.trim();
  return email || null;
}
