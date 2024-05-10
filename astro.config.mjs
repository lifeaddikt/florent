import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  output: 'server',
  adapter: vercel(),
  functions: {
    render: {
      runtime: 'nodejs18.x'
    }
  }
});