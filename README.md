# Nible — landing

Static Astro site for the Nible business landing (`project/Nible Landing v2.dc.html` from the Claude Design handoff).

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run check    # type check
```

Needs Node 22.12 or newer.

## Where things are

- `src/config.ts`: placeholders still open in the design: site URL, the app sign-up/login links (`#`) and the Pro / Pro Max prices (`Bs —`).
- `src/pages/index.astro`: page order. Each section is in `src/components/sections/`.
- `src/components/app/`: static rebuilds of the Nible Mobile screens shown inside the phones (Hoy, Agenda + "Nueva cita" sheet, Link de reservas, Ficha de cliente, onboarding steps). They are decorative (`aria-hidden`, `inert`).
- `src/components/ui/`: design-system primitives (Button, Icon, Logo) and the iPhone frame.
- `src/styles/tokens.css`: NIBLE tokens, copied verbatim from the design system. `src/lib/icons.ts` holds the Iconsax glyphs.
- `src/scripts/landing.ts`: the only client JS: demo phones, carousels, WhatsApp/QR demo and scroll reveal. All content is in the HTML, so the page reads fine without JS, and animations stop under `prefers-reduced-motion`.
- `src/lib/faq.ts`: FAQ copy, also emitted as `FAQPage` structured data.

## SEO

Spanish (`es-BO`) metadata, canonical URL, Open Graph, `SoftwareApplication` + `FAQPage` JSON-LD, `sitemap.xml` and `robots.txt` generated from `SITE_URL`. Logos are served as resized WebP.
