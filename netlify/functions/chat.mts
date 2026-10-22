// Fonction Netlify du chatbot CPA, servie sur https://cpa.ma/api/chat.
// Exige un jeton d'accès (/api/chat-token) et applique les limites de messages côté serveur.
// La clé Gemini est lue dans la variable Netlify GEMINI_API_KEY et n'est jamais envoyée au navigateur.
import { handleChatHttp, normalizeKey } from "../../src/server/chatHttp";
import { blobCounterStore } from "../shared/blobStore.mts";

export default async (req: Request, context: { ip?: string }): Promise<Response> =>
  handleChatHttp(req, {
    ip: context?.ip || req.headers.get("x-nf-client-connection-ip") || "unknown",
    store: blobCounterStore(),
    geminiKey: normalizeKey(process.env.GEMINI_API_KEY) || normalizeKey(process.env.VITE_GEMINI_API_KEY),
    tokenSecretEnv: process.env.CHAT_TOKEN_SECRET,
  });

export const config = { path: "/api/chat" };
