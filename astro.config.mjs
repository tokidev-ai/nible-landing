// @ts-check
import { defineConfig } from 'astro/config';
import { SITE_URL } from './src/config.ts';

export default defineConfig({
  site: SITE_URL,
  build: { inlineStylesheets: 'auto' },
  compressHTML: true,
});
