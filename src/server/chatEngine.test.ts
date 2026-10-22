import { describe, it, expect } from "vitest";
import {
  detectLanguage,
  handleChatRequest,
  isAllowedOrigin,
  parseChatRequest,
  parseModelOutput,
  redactPersonalData,
  sanitizeAnswer,
} from "./chatEngine";

describe("redactPersonalData (avant envoi à Google)", () => {
  it("masque les coordonnées et identifiants", () => {
    expect(redactPersonalData("mon mail est karim.b@gmail.com")).toBe("mon mail est [masqué]");
    expect(redactPersonalData("appelez-moi au 06 12 34 56 78")).toBe("appelez-moi au [masqué]");
    expect(redactPersonalData("whatsapp +212 661-234567")).toBe("whatsapp [masqué]");
    expect(redactPersonalData("tel 0033612345678")).toBe("tel [masqué]");
    expect(redactPersonalData("ma CIN est BE123456")).toBe("ma CIN est [masqué]");
    expect(redactPersonalData("RIB 011 780 0000123456789012 34")).toBe("RIB [masqué]");
    expect(redactPersonalData("IBAN MA64 0117 8000 0012 3456 7890 1234")).toBe("IBAN [masqué]");
    expect(redactPersonalData("carte 4111 1111 1111 1111")).toBe("carte [masqué]");
    expect(redactPersonalData("police n° 20231234567")).toBe("police n° [masqué]");
  });

  it("ne touche pas aux informations utiles à la question", () => {
    const text =
      "Accident le 19/10/2026 vers 8h30, voiture de 2019, immatriculation 12345-A-6, dégâts de 50 000 DH, déclaré sous 5 jours.";
    expect(redactPersonalData(text)).toBe(text);
  });
});

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
    expect(res.status).toBe(503);
    expect(res.payload).toEqual({ error: "unavailable" });
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
