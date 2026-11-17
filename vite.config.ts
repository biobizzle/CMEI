import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
const routes=['about','approach','work','partner','films','the-dark-didnt-win'];
const input:Record<string,string>={
  main:resolve(process.cwd(),'index.html'),
  ...Object.fromEntries(routes.map(route=>[route,resolve(process.cwd(),'generated-entries',route+'.html')]))
};
export default defineConfig({plugins:[react()],build:{rollupOptions:{input}}});
