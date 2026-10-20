/**
 * CPA — réception des coordonnées laissées dans le chatbot du site cpa.ma.
 *
 * Installation (dans le Google Sheet des leads) :
 *   1. Extensions → Apps Script → coller ce fichier à la place du contenu → Enregistrer.
 *   2. Déployer → Nouveau déploiement → type « Application Web »
 *        - Exécuter en tant que : Moi
 *        - Qui a accès : Tout le monde
 *      → Autoriser l'accès → copier l'URL « …/exec ».
 *   3. Mettre cette URL dans VITE_LEADS_ENDPOINT (fichier .env.production du site).
 *
 * Sécurité : le script peut uniquement AJOUTER des lignes ; il ne renvoie jamais le contenu du Sheet,
 * qui reste privé (partage « Restreint »). Validation des champs, pot de miel anti-robots,
 * protection contre l'injection de formules et limite de 20 envois par minute.
 */

const SHEET_NAME = "Leads chatbot";
const MAX_PER_MINUTE = 20;
// Mettre à true pour envoyer un email au responsable du service à chaque nouveau contact
const NOTIFY_DEPARTMENT = false;

const DEPARTMENTS = {
  automobile: { name: "Automobile", email: "y.basraoui@cpa.ma" },
  Accident_at: { name: "Accident AT", email: "s.rachidi@cpa.ma" },
  Accident_maladie: { name: "Département Maladie", email: "s.tawfik@cpa.ma" },
  Accident_auto_risque_divers: { name: "Accident Auto", email: "a.benouhoud@cpa.ma" },
  production_divers: { name: "Production Risques Divers", email: "h.msadya@cpa.ma" },
  none: { name: "Général", email: "" },
};

const HEADERS = [
  "Date", "Service", "Responsable", "Nom", "Téléphone", "Email",
  "Véhicule", "Fin contrat actuel", "Date accident", "Immatriculation",
  "Entreprise", "Nb salariés", "Activité", "Couverture souhaitée",
  "Questions posées", "Langue", "Page", "Consentement",
];

function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || "{}");

    // Robots : le champ caché "website" doit rester vide → on fait semblant d'accepter
    if (data.website) return json_({ ok: true });

    const fullName = clean_(data.fullName, 100);
    const phone = clean_(data.phone, 20);
    const email = clean_(data.email, 120);
    if (fullName.length < 2) return json_({ ok: false, error: "name" });
    if (!/^(0[5-7]\d{8}|\+212[5-7]\d{8}|\+\d{8,15})$/.test(phone.replace(/[\s.()-]/g, ""))) {
      return json_({ ok: false, error: "phone" });
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json_({ ok: false, error: "email" });
    if (data.consent !== true) return json_({ ok: false, error: "consent" });

    if (!underRateLimit_()) return json_({ ok: false, error: "rate_limited" });

    const dept = DEPARTMENTS[data.department] || DEPARTMENTS.none;
    const d = data.details || {};
    const questions = (Array.isArray(data.questions) ? data.questions : [])
      .slice(0, 20)
      .map(function (q, i) { return (i + 1) + ". " + clean_(q, 500); })
      .join("\n");

    const row = [
      new Date(), dept.name, dept.email, fullName, phone, email,
      clean_(d.vehicle, 120), clean_(d.insurerEndDate, 20), clean_(d.accidentDate, 20), clean_(d.plate, 30),
      clean_(d.company, 120), clean_(d.employees, 10), clean_(d.activity, 120), clean_(d.coverType, 120),
      questions, clean_(data.lang, 5), clean_(data.page, 50), "Oui",
    ];

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      sheet_().appendRow(row);
    } finally {
      lock.releaseLock();
    }

    if (NOTIFY_DEPARTMENT && dept.email) {
      MailApp.sendEmail(dept.email, "Nouveau contact chatbot cpa.ma — " + dept.name,
        "Nom : " + fullName + "\nTéléphone : " + phone + "\nEmail : " + (email || "-") +
        "\n\nQuestions posées :\n" + questions + "\n\n(Voir le Google Sheet des leads pour le détail.)");
    }

    return json_({ ok: true });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: "server" });
  }
}

/** Texte nettoyé, tronqué, et neutralisé contre l'injection de formules (=, +, -, @). */
function clean_(value, maxLength) {
  let s = String(value == null ? "" : value).replace(/[\u0000-\u0008\u000B-\u001F]/g, "").trim().slice(0, maxLength);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function underRateLimit_() {
  const cache = CacheService.getScriptCache();
  const key = "count_" + Math.floor(Date.now() / 60000);
  const count = Number(cache.get(key) || 0);
  if (count >= MAX_PER_MINUTE) return false;
  cache.put(key, String(count + 1), 120);
  return true;
}

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
  }
  return sheet;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
