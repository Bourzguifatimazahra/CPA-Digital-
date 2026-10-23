// [IA désactivée] Fonction Netlify de l'assistant intelligent, mise en commentaire et sortie de netlify/functions/.
// Pour la réactiver : la remettre dans netlify/functions/ et retirer les « // ».
// // Fonction Netlify qui délivre un jeton d'accès au chatbot (valable 1 heure), servie sur /api/chat-token.
// import { handleTokenHttp, normalizeKey } from "../../src/server/chatHttp";
// import { blobCounterStore } from "../shared/blobStore.mts";
//
// export default async (req: Request, context: { ip?: string }): Promise<Response> =>
//   handleTokenHttp(req, {
//     ip: context?.ip || req.headers.get("x-nf-client-connection-ip") || "unknown",
//     store: blobCounterStore(),
//     geminiKey: normalizeKey(process.env.GEMINI_API_KEY) || normalizeKey(process.env.VITE_GEMINI_API_KEY),
//     tokenSecretEnv: process.env.CHAT_TOKEN_SECRET,
//   });
//
// export const config = { path: "/api/chat-token" };
