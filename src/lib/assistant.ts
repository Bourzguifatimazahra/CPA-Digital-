// Client du chatbot côté navigateur : il envoie uniquement la conversation à /api/chat
// (fonction serveur Netlify) et reçoit uniquement le texte de la réponse et le service concerné.
// Aucune clé, aucun prompt, aucun nom de modèle n'est présent dans le code du site.
const CHAT_ENDPOINT = "/api/chat";
const TIMEOUT_MS = 12000;

export type ChatTurn = { role: "user" | "bot"; text: string };
export type AssistantAnswer = { text: string; departmentId: string | null };

export async function askAssistant(history: ChatTurn[], lang: string): Promise<AssistantAnswer> {
  const res = await fetch(CHAT_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: history.map(({ role, text }) => ({ role, text })), lang }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`assistant ${res.status}`);
  const data = await res.json();
  if (typeof data?.answer !== "string" || !data.answer) throw new Error("assistant empty");
  return { text: data.answer, departmentId: typeof data.department === "string" ? data.department : null };
}
