
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Fixed: Cast process to any to resolve 'cwd' property missing error on Process type in specific environments.
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // Mapping the Vercel env variable to the one expected by the app code
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY || env.API_KEY),
    },
    build: {
      outDir: 'dist',
    }
  };
});
