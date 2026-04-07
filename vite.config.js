
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: '/detumima/', // Set to your repo name
  plugins: [react()]
});
