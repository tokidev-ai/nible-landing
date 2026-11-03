import { describe, expect, it } from 'vitest';
import { render } from './render';
import Device from '../src/components/app/Device.astro';
import ScreenHoy from '../src/components/app/ScreenHoy.astro';
import ScreenAgenda from '../src/components/app/ScreenAgenda.astro';
import ScreenCliente from '../src/components/app/ScreenCliente.astro';
import ScreenLink from '../src/components/app/ScreenLink.astro';
import ScreenOnboarding from '../src/components/app/ScreenOnboarding.astro';
import { TODAY } from '../src/components/app/data';

describe('Device', () => {
  it('renders the bottom bar tabs', async () => {
    const html = await render(Device, { props: { tab: 'bHoy' }, slots: { default: 'content' } });
    for (const l of ['Hoy', 'Agenda', 'Clientes', 'Mi negocio']) expect(html).toContain(l);
    expect(html).toContain('content');
  });

  it('omits the bottom bar when no tab is given', async () => {
    const html = await render(Device, { slots: { default: 'content' } });
    expect(html).not.toContain('Mi negocio');
  });
});

describe('ScreenHoy', () => {
  it('shows the day summary and appointments', async () => {
    const html = await render(ScreenHoy);
    expect(html).toContain('citas hoy');
    expect(html).toContain(TODAY[0].client);
  });
});

describe('ScreenAgenda', () => {
  it('shows free slots, and the sheet only when requested', async () => {
    const plain = await render(ScreenAgenda);
    const withSheet = await render(ScreenAgenda, { props: { sheet: true } });
    expect(plain).toContain('Libre');
    expect(withSheet.length).toBeGreaterThan(plain.length);
  });
});

describe('ScreenCliente', () => {
  it('shows client stats and history', async () => {
    const html = await render(ScreenCliente);
    expect(html).toContain('Bs 495');
    expect(html).toContain('Corte + barba');
  });
});

describe('ScreenLink', () => {
  it('renders', async () => {
    expect(await render(ScreenLink)).toContain('<');
  });
});

describe('ScreenOnboarding', () => {
  it.each([
    [1, 'Continuar'],
    [2, 'Continuar'],
    [4, 'Ir a mi agenda'],
  ] as const)('step %i shows its CTA', async (paso, cta) => {
    const html = await render(ScreenOnboarding, { props: { paso } });
    expect(html).toContain(cta);
  });
});
