import { experimental_AstroContainer as AstroContainer } from 'astro/container';

type Component = Parameters<AstroContainer['renderToString']>[0];

/** Renders an .astro component to an HTML string. */
export async function render(
  component: Component,
  options: Parameters<AstroContainer['renderToString']>[1] = {},
): Promise<string> {
  const container = await AstroContainer.create();
  return container.renderToString(component, options);
}
