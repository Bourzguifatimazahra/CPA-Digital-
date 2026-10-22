import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import imagemin from "vite-plugin-imagemin";

// En développement, sert /api/chat-token et /api/chat comme les fonctions Netlify (netlify/functions),
// avec la clé lue dans .env.local côté serveur (jamais envoyée au navigateur) et des compteurs en mémoire.
const devChatApi = (mode: string): Plugin => ({
  name: "cpa-dev-chat-api",
  apply: "serve",
  configureServer(server) {
    const env = loadEnv(mode, process.cwd(), "");
    let store: unknown;
    const route = (handlerName: "handleChatHttp" | "handleTokenHttp") =>
      async (req: import("http").IncomingMessage, res: import("http").ServerResponse) => {
        const chunks: Buffer[] = [];
        for await (const chunk of req) chunks.push(chunk as Buffer);
        const http = await server.ssrLoadModule("/src/server/chatHttp.ts");
        const security = await server.ssrLoadModule("/src/server/chatSecurity.ts");
        store ??= security.memoryStore();
        const headers = new Headers();
        for (const [k, v] of Object.entries(req.headers)) if (typeof v === "string") headers.set(k, v);
        const request = new Request(`http://localhost${req.url ?? ""}`, {
          method: req.method,
          headers,
          body: req.method === "GET" || req.method === "HEAD" ? undefined : Buffer.concat(chunks),
        });
        const response: Response = await http[handlerName](request, {
          ip: req.socket.remoteAddress ?? "local",
          store,
          geminiKey: http.normalizeKey(env.GEMINI_API_KEY) || http.normalizeKey(env.VITE_GEMINI_API_KEY),
          tokenSecretEnv: env.CHAT_TOKEN_SECRET,
        });
        res.statusCode = response.status;
        response.headers.forEach((value, key) => res.setHeader(key, value));
        res.end(await response.text());
      };
    server.middlewares.use("/api/chat-token", route("handleTokenHttp"));
    server.middlewares.use("/api/chat", route("handleChatHttp"));
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
