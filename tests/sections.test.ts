import { describe, expect, it } from 'vitest';
import { render } from './render';
import Header from '../src/components/sections/Header.astro';
import Hero from '../src/components/sections/Hero.astro';
import Features from '../src/components/sections/Features.astro';
import Steps from '../src/components/sections/Steps.astro';
import Rubros from '../src/components/sections/Rubros.astro';
import MoreList from '../src/components/sections/MoreList.astro';
import Pricing from '../src/components/sections/Pricing.astro';
import Coming from '../src/components/sections/Coming.astro';
import Faq from '../src/components/sections/Faq.astro';
import Signup from '../src/components/sections/Signup.astro';
import Footer from '../src/components/sections/Footer.astro';
import { FAQ } from '../src/lib/faq';
import { STEPS } from '../src/lib/steps';
import { PRICES } from '../src/config';

describe('Header', () => {
  it('has main navigation and a CTA', async () => {
    const html = await render(Header);
    expect(html).toContain('aria-label="Principal"');
    for (const h of ['#funciones', '#empezar', '#precios', '#prueba']) expect(html).toContain(`href="${h}"`);
    expect(html).toContain('Probar gratis');
  });
});

describe('Hero', () => {
  it('renders a heading and the CTA', async () => {
    const html = await render(Hero);
    expect(html).toMatch(/<h1/);
    expect(html).toContain('Abres la app y ves tu día');
  });
});

describe('Features', () => {
  it('renders the three feature blocks', async () => {
    const html = await render(Features);
    for (const t of ['Tu agenda, con los huecos a la vista', 'Un link para que te reserven solos', 'La memoria de tus clientes'])
      expect(html).toContain(t);
  });
});

describe('Steps', () => {
  it('renders every step from lib/steps', async () => {
    const html = await render(Steps);
    for (const s of STEPS) expect(html).toContain(s.title);
  });
});

describe('Rubros', () => {
  it('lists the business types', async () => {
    const html = await render(Rubros);
    for (const r of ['Barberías', 'Spa', 'Tatuajes', 'Clases']) expect(html).toContain(r);
  });
});

describe('MoreList', () => {
  it('lists the extra capabilities', async () => {
    const html = await render(MoreList);
    for (const t of ['Servicios', 'Horarios', 'Bloqueos', 'Equipo', 'Recordatorios', 'Ingresos']) expect(html).toContain(t);
  });
});

describe('Pricing', () => {
  it('renders the free plan with its price and plan anchor', async () => {
    const html = await render(Pricing);
    expect(html).toContain('id="precios"');
    expect(html).toContain(PRICES.free);
    expect(html).toContain('Empezar gratis');
    expect(html).toContain('Próximamente');
  });
});

describe('Coming', () => {
  it('renders the WhatsApp agent and QR payments tabs', async () => {
    const html = await render(Coming);
    expect(html).toContain('Agente de WhatsApp');
    expect(html).toContain('Pagos por QR');
  });
});

describe('Faq', () => {
  it('renders every question, with the first one open', async () => {
    const html = await render(Faq);
    expect((html.match(/<details/g) ?? []).length).toBe(FAQ.length);
    expect((html.match(/<details[^>]*\bopen\b/g) ?? []).length).toBe(1);
    expect(html).toContain('Preguntas frecuentes');
    expect(html).toContain(FAQ[0][0]);
  });
});

describe('Signup', () => {
  it('renders the sign-up section', async () => {
    const html = await render(Signup);
    expect(html).toContain('id="prueba"');
  });
});

describe('Footer', () => {
  it('renders without dead links when legal URLs are unset', async () => {
    const html = await render(Footer);
    expect(html).toContain('NIBLE');
    expect(html).not.toContain('href=""');
    expect(html).not.toContain('Términos');
  });
});
