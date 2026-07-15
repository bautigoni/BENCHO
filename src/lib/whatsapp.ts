import { CONTACT, WHATSAPP_CONTACTS, type WhatsAppContact } from '../consts';

const STORAGE_KEY = 'cgr-whatsapp-contact';

/**
 * Each visitor is pinned to one of the two contacts on first touch so a
 * conversation never appears to switch agents mid-thread. Across visitors
 * the assignment is a coin flip, which keeps the long-run split ~50/50.
 */
export function getAssignedContact(): WhatsAppContact {
  if (typeof window === 'undefined') return WHATSAPP_CONTACTS[0];

  try {
    const storedId = window.localStorage.getItem(STORAGE_KEY);
    const existing = WHATSAPP_CONTACTS.find((contact) => contact.id === storedId);
    if (existing) return existing;

    const chosen = WHATSAPP_CONTACTS[Math.random() < 0.5 ? 0 : 1];
    window.localStorage.setItem(STORAGE_KEY, chosen.id);
    return chosen;
  } catch {
    return WHATSAPP_CONTACTS[Math.floor(Math.random() * WHATSAPP_CONTACTS.length)];
  }
}

export function buildWhatsAppUrl(
  contact: WhatsAppContact,
  message: string = CONTACT.whatsappMessage
): string {
  const params = new URLSearchParams({ text: message });
  return `https://wa.me/${contact.phoneIntl}?${params.toString()}`;
}

/**
 * Server-rendered fallback so links are real and crawlable even before the
 * client script assigns a visitor to one of the two contacts.
 */
export const DEFAULT_WHATSAPP_HREF = buildWhatsAppUrl(WHATSAPP_CONTACTS[0]);
