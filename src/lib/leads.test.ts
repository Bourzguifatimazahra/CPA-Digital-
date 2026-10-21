import { describe, it, expect } from "vitest";
import { isValidEmail, isValidPhone } from "./leads";

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
