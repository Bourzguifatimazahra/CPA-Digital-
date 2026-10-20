import { describe, it, expect } from "vitest";
import { detectLanguage, parseModelOutput, sanitizeAnswer } from "./gemini";

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
import { isValidEmail, isValidPhone } from "./leads";

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

describe("validation du formulaire", () => {
  it("accepte les téléphones marocains et internationaux", () => {
    expect(isValidPhone("0612345678")).toBe(true);
    expect(isValidPhone("06 12 34 56 78")).toBe(true);
    expect(isValidPhone("+212 612345678")).toBe(true);
    expect(isValidPhone("+33612345678")).toBe(true);
  });

  it("refuse les téléphones invalides", () => {
    expect(isValidPhone("123")).toBe(false);
    expect(isValidPhone("0812345678")).toBe(false);
  });

  it("email facultatif mais valide s'il est rempli", () => {
    expect(isValidEmail("")).toBe(true);
    expect(isValidEmail("a@b.ma")).toBe(true);
    expect(isValidEmail("pas-un-email")).toBe(false);
  });
});
