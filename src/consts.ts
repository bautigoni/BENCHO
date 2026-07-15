export const SITE = {
  name: 'Grupo CGR',
  legalName: 'Grupo CGR - Servicios para la Construcción',
  tagline: 'Servicios para la construcción',
  description:
    'Grupo CGR es una empresa familiar con más de 18 años de trayectoria en la construcción. Pintura, revestimientos, microcemento, estuco y remodelaciones integrales en Buenos Aires.',
  url: 'https://www.grupocgr.com.ar',
  locale: 'es_AR',
  foundingYear: 2007,
  yearsOfExperience: new Date().getFullYear() - 2007
} as const;

export const NAV_LINKS = [
  { label: 'Inicio', href: '/' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Contacto', href: '/contacto' }
] as const;

export const CONTACT = {
  whatsappMessage: 'Hola Grupo CGR. Quisiera solicitar un presupuesto.',
  email: 'contacto@grupocgr.com.ar',
  addressLocality: 'Buenos Aires',
  addressRegion: 'Buenos Aires',
  addressCountry: 'AR',
  areaServed: 'Zona Norte del Gran Buenos Aires y CABA'
} as const;

export interface WhatsAppContact {
  id: 'guido' | 'rodrigo';
  name: string;
  phoneDisplay: string;
  /** E.164 without the leading + for wa.me links */
  phoneIntl: string;
}

export const WHATSAPP_CONTACTS: readonly [WhatsAppContact, WhatsAppContact] = [
  {
    id: 'guido',
    name: 'Guido Soler',
    phoneDisplay: '+54 11 6688 5195',
    phoneIntl: '5491166885195'
  },
  {
    id: 'rodrigo',
    name: 'Rodrigo Soler',
    phoneDisplay: '+54 11 5844 9450',
    phoneIntl: '5491158449450'
  }
];

export const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/grupocgr',
    handle: '@grupocgr',
    icon: 'instagram'
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/GrupoCGR',
    handle: 'GrupoCGR',
    icon: 'facebook'
  }
] as const;
