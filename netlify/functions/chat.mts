// Fonction Netlify du chatbot CPA, servie sur https://cpa.ma/api/chat.
// La clé Gemini est lue dans la variable d'environnement Netlify GEMINI_API_KEY (jamais envoyée au navigateur).
import { handleChatRequest, isAllowedOrigin } from "../../src/server/chatEngine";

const MAX_BODY_BYTES = 40_000;

export default async (req: Request): Promise<Response> => {
  const origin = req.headers.get("origin");
  const json = (status: number, payload: unknown) =>
    new Response(JSON.stringify(payload), {
      status,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
        ...(origin && isAllowedOrigin(origin) ? { "Access-Control-Allow-Origin": origin, Vary: "Origin" } : {}),
      },
    });

  if (req.method !== "POST") return json(405, { error: "method_not_allowed" });
  if (!isAllowedOrigin(origin)) return json(403, { error: "forbidden" });

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) return json(413, { error: "too_large" });
  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json(400, { error: "bad_request" });
  }

  const { status, payload } = await handleChatRequest(body, process.env.GEMINI_API_KEY);
  return json(status, payload);
};

export const config = { path: "/api/chat" };
