// Envoi des coordonnées des visiteurs du chatbot vers le Google Sheet privé de CPA,
// via un Google Apps Script (voir scripts/google-apps-script/leads.gs).
// L'URL du script est publique (comme tout le JS du site) : le script ne peut qu'AJOUTER des lignes,
// jamais lire le Sheet, qui reste privé.
const LEADS_ENDPOINT = import.meta.env.VITE_LEADS_ENDPOINT as string | undefined;

export const isLeadCaptureEnabled = Boolean(LEADS_ENDPOINT);

export type LeadFieldKey =
  | "vehicle"
  | "insurerEndDate"
  | "accidentDate"
  | "plate"
  | "company"
  | "employees"
  | "activity"
  | "coverType";

export type LeadField = { key: LeadFieldKey; type: "text" | "date" | "number" };

// Champs spécifiques demandés selon le service détecté dans la conversation
export const LEAD_FIELDS_BY_DEPARTMENT: Record<string, LeadField[]> = {
  automobile: [
    { key: "vehicle", type: "text" },
    { key: "insurerEndDate", type: "date" },
  ],
  Accident_auto_risque_divers: [
    { key: "accidentDate", type: "date" },
    { key: "plate", type: "text" },
  ],
  Accident_at: [
    { key: "company", type: "text" },
    { key: "accidentDate", type: "date" },
  ],
  Accident_maladie: [
    { key: "company", type: "text" },
    { key: "employees", type: "number" },
  ],
  production_divers: [
    { key: "activity", type: "text" },
    { key: "coverType", type: "text" },
  ],
};

export type LeadPayload = {
  department: string;
  fullName: string;
  phone: string;
  email: string;
  details: Partial<Record<LeadFieldKey, string>>;
  questions: string[];
  lang: string;
  page: string;
  consent: boolean;
  website: string; // pot de miel anti-robots : doit rester vide
};

// Téléphone marocain (05/06/07 ou +212) ou international (+ et 8 à 15 chiffres)
export const isValidPhone = (phone: string) => {
  const p = phone.replace(/[\s.()-]/g, "");
  return /^(0[5-7]\d{8}|\+212[5-7]\d{8}|\+\d{8,15})$/.test(p);
};

export const isValidEmail = (email: string) => email === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

/** Envoie la fiche au Google Sheet. Lance une erreur si l'envoi échoue. */
export async function submitLead(payload: LeadPayload): Promise<void> {
  if (!LEADS_ENDPOINT) throw new Error("Lead endpoint not configured");
  // text/plain évite la requête CORS « preflight », non supportée par Apps Script
  const res = await fetch(LEADS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Lead HTTP ${res.status}`);
  const data = await res.json().catch(() => null);
  if (!data?.ok) throw new Error(`Lead rejected: ${data?.error ?? "unknown"}`);
}
