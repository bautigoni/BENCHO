import { SITE, CONTACT, WHATSAPP_CONTACTS, SOCIAL_LINKS } from '../consts';

export function buildLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    '@id': `${SITE.url}/#organization`,
    name: SITE.legalName,
    alternateName: SITE.name,
    description: SITE.description,
    url: SITE.url,
    telephone: `+${WHATSAPP_CONTACTS[0].phoneIntl}`,
    email: CONTACT.email,
    foundingDate: String(SITE.foundingYear),
    image: `${SITE.url}/og-image.jpg`,
    logo: `${SITE.url}/icon-512.png`,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: CONTACT.addressLocality,
      addressRegion: CONTACT.addressRegion,
      addressCountry: CONTACT.addressCountry
    },
    areaServed: CONTACT.areaServed,
    sameAs: SOCIAL_LINKS.map((link) => link.href)
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE.url}${item.url}`
    }))
  };
}
