import { describe, it, expect } from "vitest";
import { sanitizeAnswer } from "./gemini";

describe("sanitizeAnswer", () => {
  it("corrige une adresse email déformée par le modèle", () => {
    expect(sanitizeAnswer("Écrivez-nous à info@com.ma !")).toBe("Écrivez-nous à info@cpa.ma !");
  });

  it("garde la bonne adresse email", () => {
    expect(sanitizeAnswer("Email : info@cpa.ma")).toBe("Email : info@cpa.ma");
  });

  it("remplace un numéro marocain erroné par celui de CPA", () => {
    expect(sanitizeAnswer("Appelez le 06 67 55 84 63")).toBe("Appelez le 0667558436");
    expect(sanitizeAnswer("WhatsApp : +212 667558436")).toBe("WhatsApp : 0667558436");
  });

  it("ne touche pas aux autres nombres (années, horaires, pourcentages)", () => {
    const text = "Depuis 1957, de 8h30 à 18h00, rente de 50 %, délai de 30 jours.";
    expect(sanitizeAnswer(text)).toBe(text);
  });

  it("retire le Markdown gras et les titres", () => {
    expect(sanitizeAnswer("## Titre\n**RC auto** obligatoire")).toBe("Titre\nRC auto obligatoire");
  });
});
