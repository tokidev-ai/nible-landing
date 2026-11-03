import type { APIRoute } from 'astro';
import { FAQ } from '../lib/faq';
import { STEPS } from '../lib/steps';

// Plain-text summary for AI search engines and assistants (llms.txt convention).
export const GET: APIRoute = ({ site }) => {
  const url = new URL('/', site).href;
  const body = `# Nible

> Nible es una app de agenda y reservas online para negocios en Bolivia. Los clientes reservan solos desde un link, a cualquier hora, y el dueño gestiona su agenda, cupos libres y ficha de clientes desde el celular. Hecho en Bolivia por Pomlab.

- Sitio: ${url}
- Idioma: español (Bolivia)
- Plan Gratis para siempre (Bs 0): agenda, link de reservas, servicios y un usuario. Pro y Pro Max: próximamente.

## Para quién
Barberías, salones de belleza, uñas, consultorios, entrenadores, spa, masajes, fisioterapia, tatuajes y clases.

## Cómo empezar
${STEPS.map((s, i) => `${i + 1}. ${s.title}: ${s.text}`).join('\n')}

## Preguntas frecuentes
${FAQ.map(([q, a]) => `### ${q}\n${a}`).join('\n\n')}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
