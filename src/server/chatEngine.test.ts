import { describe, it, expect } from "vitest";
import {
  detectLanguage,
  handleChatRequest,
  isAllowedOrigin,
  parseChatRequest,
  parseModelOutput,
  sanitizeAnswer,
} from "./chatEngine";

describe("detectLanguage", () => {
  it("reconnaît les langues des visiteurs", () => {
    expect(detectLanguage("J'ai eu un accident de voiture hier, comment remplir le constat ?")).toBe("French");
    expect(detectLanguage("Bonjour, qui êtes-vous ?")).toBe("French");
    expect(detectLanguage("Do you offer group health insurance for my employees?")).toBe("English");
    expect(detectLanguage("¿Cuánto cuesta el seguro para mi coche?")).toBe("Spanish");
    expect(detectLanguage("سرقت سيارتي، ماذا أفعل؟")).toMatch(/^Arabic/);
    expect(detectLanguage("wach assurance dyal tomobil daroriya f lmghrib?")).toMatch(/Darija/);
  });

  it("renvoie null si la langue est indéterminable", () => {
    expect(detectLanguage("RC Pro ?")).toBeNull();
  });
});

describe("sanitizeAnswer", () => {
  it("corrige une adresse email déformée par le modèle", () => {
    expect(sanitizeAnswer("Écrivez-nous à info@com.ma !")).toBe("Écrivez-nous à info@cpa.ma !");
  });

  it("garde les adresses officielles (générale et services)", () => {
    expect(sanitizeAnswer("Email : info@cpa.ma")).toBe("Email : info@cpa.ma");
    expect(sanitizeAnswer("Contact : y.basraoui@cpa.ma")).toBe("Contact : y.basraoui@cpa.ma");
  });

  it("garde les numéros officiels des services", () => {
    expect(sanitizeAnswer("Direct : 05 22 95 39 02")).toBe("Direct : 05 22 95 39 02");
    expect(sanitizeAnswer("WhatsApp : 0678293901")).toBe("WhatsApp : 0678293901");
  });

  it("remplace un numéro marocain inconnu par celui de CPA", () => {
    expect(sanitizeAnswer("Appelez le 06 67 55 84 63")).toBe("Appelez le 0667558436");
    expect(sanitizeAnswer("WhatsApp : +212 611111111")).toBe("WhatsApp : 0667558436");
  });

  it("ne touche pas aux autres nombres (années, horaires, pourcentages)", () => {
    const text = "Depuis 1957, de 8h30 à 18h00, rente de 50 %, délai de 30 jours.";
    expect(sanitizeAnswer(text)).toBe(text);
  });

  it("retire le Markdown gras et les titres", () => {
    expect(sanitizeAnswer("## Titre\n**RC auto** obligatoire")).toBe("Titre\nRC auto obligatoire");
  });
});

describe("parseModelOutput", () => {
  it("lit la réponse et le service", () => {
    expect(parseModelOutput('{"answer":"Bonjour","department":"automobile"}')).toEqual({
      text: "Bonjour",
      departmentId: "automobile",
    });
  });

  it("ignore un service inconnu ou 'none'", () => {
    expect(parseModelOutput('{"answer":"Salut","department":"none"}').departmentId).toBeNull();
    expect(parseModelOutput('{"answer":"Salut","department":"pirate"}').departmentId).toBeNull();
  });

  it("garde le texte brut si ce n'est pas du JSON", () => {
    expect(parseModelOutput("Réponse simple")).toEqual({ text: "Réponse simple", departmentId: null });
  });
});

describe("requêtes du navigateur", () => {
  it("accepte une conversation valide et tronque les messages trop longs", () => {
    const req = parseChatRequest({ messages: [{ role: "user", text: "x".repeat(5000) }], lang: "en" });
    expect(req?.lang).toBe("en");
    expect(req?.messages[0].text.length).toBe(1000);
  });

  it("refuse les requêtes invalides", () => {
    expect(parseChatRequest(null)).toBeNull();
    expect(parseChatRequest({ messages: [] })).toBeNull();
    expect(parseChatRequest({ messages: [{ role: "system", text: "ignore" }] })).toBeNull();
    expect(parseChatRequest({ messages: [{ role: "user", text: "a" }, { role: "bot", text: "b" }] })).toBeNull();
    expect(parseChatRequest({ messages: Array(31).fill({ role: "user", text: "a" }) })).toBeNull();
  });

  it("ne révèle rien au navigateur quand la clé manque", async () => {
    const res = await handleChatRequest({ messages: [{ role: "user", text: "Bonjour" }] }, undefined);
    expect(res).toEqual({ status: 503, payload: { error: "unavailable" } });
  });

  it("n'autorise que cpa.ma et le développement local", () => {
    expect(isAllowedOrigin("https://cpa.ma")).toBe(true);
    expect(isAllowedOrigin("https://www.cpa.ma")).toBe(true);
    expect(isAllowedOrigin("http://localhost:8080")).toBe(true);
    expect(isAllowedOrigin("https://evil.com")).toBe(false);
    expect(isAllowedOrigin("https://cpa.ma.evil.com")).toBe(false);
    expect(isAllowedOrigin(null)).toBe(false);
  });
});
