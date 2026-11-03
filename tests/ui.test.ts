import { describe, expect, it } from 'vitest';
import { render } from './render';
import Button from '../src/components/ui/Button.astro';
import Icon from '../src/components/ui/Icon.astro';
import Logo from '../src/components/ui/Logo.astro';
import IPhone from '../src/components/ui/IPhone.astro';
import PhoneLayer from '../src/components/ui/PhoneLayer.astro';

describe('Button', () => {
  it('renders a link with defaults and slot content', async () => {
    const html = await render(Button, { props: { href: '#prueba' }, slots: { default: 'Probar' } });
    expect(html).toContain('href="#prueba"');
    expect(html).toContain('btn-primary');
    expect(html).toContain('btn-lg');
    expect(html).toContain('Probar');
    expect(html).not.toContain('btn-full');
  });

  it('applies variant, size, fullWidth and extra class', async () => {
    const html = await render(Button, {
      props: { href: '/', variant: 'outline', size: 'sm', fullWidth: true, class: 'extra' },
    });
    for (const c of ['btn-outline', 'btn-sm', 'btn-full', 'extra']) expect(html).toContain(c);
  });
});

describe('Icon', () => {
  it('renders a decorative svg with the given size', async () => {
    const html = await render(Icon, { props: { name: 'clock', size: 20 } });
    expect(html).toContain('<svg');
    expect(html).toContain('width="20"');
    expect(html).toContain('aria-hidden="true"');
  });

  it('supports the bold variant', async () => {
    const html = await render(Icon, { props: { name: 'tick-circle', variant: 'bold' } });
    expect(html).toContain('<svg');
  });

  it('throws for an unknown icon', async () => {
    await expect(render(Icon, { props: { name: 'does-not-exist' } })).rejects.toThrow(/Unknown icon/);
  });
});

describe('Logo', () => {
  it.each(['dark', 'white'] as const)('renders the %s logo with alt text', async (variant) => {
    const html = await render(Logo, { props: { variant, height: 28 } });
    expect(html).toContain('alt="NIBLE"');
    expect(html).toContain('height:28px');
  });
});

describe('IPhone', () => {
  it('renders the frame with its slot', async () => {
    const html = await render(IPhone, { slots: { default: '<p>screen</p>' } });
    expect(html).toContain('screen');
  });
});

describe('PhoneLayer', () => {
  it('renders its slot', async () => {
    const html = await render(PhoneLayer, { props: { active: true, motion: 'slide' }, slots: { default: '<i>x</i>' } });
    expect(html).toContain('<i>x</i>');
  });
});
