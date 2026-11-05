// Values that are still placeholders in the design. Change them here and they update everywhere.

/** Public URL of the landing. Used for canonical, Open Graph and the sitemap. */
export const SITE_URL = 'https://nible.bo';

/** The Nible app. Every sign-up / login / CTA link on the landing points here. */
export const APP_URL = 'https://app.nible.pro';

/** "Crear mi cuenta gratis" — sign-up in the Nible app. */
export const APP_SIGNUP_URL = APP_URL;

/** "Ingresa a la app" — login in the Nible app. */
export const APP_LOGIN_URL = APP_URL;

/** Monthly prices. Pro and Pro Max are "Próximamente" and have no price yet. */
export const PRICES = {
  free: 'Bs 0',
  pro: 'Bs —',
  proMax: 'Bs —',
};

/** Contact email. When set, the footer shows "Contacto" (mailto) and the Organization schema gets a ContactPoint. */
export const CONTACT_EMAIL: string = '';

/** Legal pages. A footer link is only rendered when its URL is set (no dead "#" links). */
export const LEGAL_URLS = {
  terms: '',
  privacy: '',
};

/** Public brand profiles (Instagram, Facebook, LinkedIn, WhatsApp…). Used for `sameAs` in the Organization schema. */
export const SOCIAL_LINKS: string[] = [];
