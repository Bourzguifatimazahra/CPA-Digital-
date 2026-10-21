import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import imagemin from "vite-plugin-imagemin";

// En développement, sert /api/chat comme la fonction Netlify (netlify/functions/chat.mts),
// avec la clé lue dans .env.local côté serveur : elle n'est jamais envoyée au navigateur.
const devChatApi = (mode: string): Plugin => ({
  name: "cpa-dev-chat-api",
  apply: "serve",
  configureServer(server) {
    const env = loadEnv(mode, process.cwd(), "");
    const apiKey = env.GEMINI_API_KEY || env.VITE_GEMINI_API_KEY;
    server.middlewares.use("/api/chat", async (req, res) => {
      const chunks: Buffer[] = [];
      for await (const chunk of req) chunks.push(chunk as Buffer);
      const { handleChatRequest } = await server.ssrLoadModule("/src/server/chatEngine.ts");
      let body: unknown = null;
      try {
        body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
      } catch {
        // corps invalide : handleChatRequest renverra 400
      }
      const { status, payload } = await handleChatRequest(body, apiKey);
      res.statusCode = status;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(payload));
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    devChatApi(mode),
    imagemin({
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      pngquant: { quality: [0.8, 0.9], speed: 4 },
      svgo: {
        plugins: [
          { name: "removeAttrs", params: { attrs: "(stroke|fill)" } },
          { name: "removeDimensions" },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom"],
  },
  build: {
    target: "esnext",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-radix': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-select',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-tabs',
          ],
          'vendor-ui': ['class-variance-authority', 'clsx', 'tailwind-merge', 'lucide-react'],
          'vendor-motion': ['framer-motion'],
          'vendor-charts': ['recharts'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
}));
