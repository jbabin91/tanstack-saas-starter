import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from '@tanstack/react-start/config';
import viteTsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  server: {
    compatibilityDate: '2024-11-25',
    preset: 'node-server',
  },
  tsr: {
    appDirectory: 'src',
    autoCodeSplitting: true,
    quoteStyle: 'single',
    semicolons: true,
  },
  vite: {
    plugins: [
      // this is the plugin that enables path aliases
      viteTsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
      tailwindcss(),
    ],
  },
});
