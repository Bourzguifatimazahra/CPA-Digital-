// [IA désactivée] Fichier de l'assistant intelligent mis entièrement en commentaire.
// Pour le réactiver : retirer les « // » en début de ligne (et la ligne « export {} » ci-dessous).
export {};
// import { useState } from "react";
// import { Loader2, ShieldCheck } from "lucide-react";
// import { useLanguage } from "@/i18n/LanguageContext";
// import {
//   LEAD_FIELDS_BY_DEPARTMENT,
//   LeadFieldKey,
//   isValidEmail,
//   isValidPhone,
//   submitLead,
// } from "@/lib/leads";
//
// type Lang = "fr" | "en" | "ar" | "es";
//
// const TEXT: Record<Lang, Record<string, string>> = {
//   fr: {
//     intro: "Pour qu'un conseiller CPA du bon service vous recontacte, laissez-nous vos coordonnées :",
//     fullName: "Nom complet *",
//     phone: "Téléphone *",
//     email: "Email (facultatif)",
//     vehicle: "Marque et modèle du véhicule",
//     insurerEndDate: "Fin de votre contrat actuel",
//     accidentDate: "Date de l'accident",
//     plate: "Immatriculation",
//     company: "Nom de l'entreprise",
//     employees: "Nombre de salariés",
//     activity: "Entreprise / activité",
//     coverType: "Type de couverture souhaitée",
//     consent: "J'accepte que CPA utilise ces informations pour me recontacter, conformément à la",
//     policy: "politique de confidentialité",
//     submit: "Envoyer",
//     later: "Plus tard",
//     errName: "Indiquez votre nom.",
//     errPhone: "Numéro de téléphone invalide.",
//     errEmail: "Adresse email invalide.",
//     errConsent: "Veuillez accepter pour continuer.",
//     errSend: "L'envoi a échoué. Réessayez ou contactez-nous sur WhatsApp.",
//     thanks: "Merci ! Un conseiller CPA vous recontactera rapidement.",
//   },
//   en: {
//     intro: "So that a CPA advisor from the right department can call you back, leave your details:",
//     fullName: "Full name *",
//     phone: "Phone *",
//     email: "Email (optional)",
//     vehicle: "Vehicle make and model",
//     insurerEndDate: "End of your current policy",
//     accidentDate: "Accident date",
//     plate: "Plate number",
//     company: "Company name",
//     employees: "Number of employees",
//     activity: "Company / activity",
//     coverType: "Type of cover needed",
//     consent: "I agree that CPA may use this information to contact me, in accordance with the",
//     policy: "privacy policy",
//     submit: "Send",
//     later: "Later",
//     errName: "Please enter your name.",
//     errPhone: "Invalid phone number.",
//     errEmail: "Invalid email address.",
//     errConsent: "Please accept to continue.",
//     errSend: "Sending failed. Try again or contact us on WhatsApp.",
//     thanks: "Thank you! A CPA advisor will contact you shortly.",
//   },
//   ar: {
//     intro: "ليتواصل معك مستشار CPA من المصلحة المعنية، اترك معلوماتك:",
//     fullName: "الاسم الكامل *",
//     phone: "الهاتف *",
//     email: "البريد الإلكتروني (اختياري)",
//     vehicle: "نوع وطراز السيارة",
//     insurerEndDate: "تاريخ انتهاء عقدك الحالي",
//     accidentDate: "تاريخ الحادث",
//     plate: "رقم التسجيل",
//     company: "اسم الشركة",
//     employees: "عدد الأجراء",
//     activity: "الشركة / النشاط",
//     coverType: "نوع التغطية المطلوبة",
//     consent: "أوافق على أن تستعمل CPA هذه المعلومات للتواصل معي، وفقاً لـ",
//     policy: "سياسة الخصوصية",
//     submit: "إرسال",
//     later: "لاحقاً",
//     errName: "يرجى إدخال اسمك.",
//     errPhone: "رقم الهاتف غير صالح.",
//     errEmail: "البريد الإلكتروني غير صالح.",
//     errConsent: "يرجى الموافقة للمتابعة.",
//     errSend: "فشل الإرسال. حاول مرة أخرى أو تواصل معنا عبر واتساب.",
//     thanks: "شكراً! سيتواصل معك مستشار CPA قريباً.",
//   },
//   es: {
//     intro: "Para que un asesor de CPA del departamento adecuado le contacte, déjenos sus datos:",
//     fullName: "Nombre completo *",
//     phone: "Teléfono *",
//     email: "Email (opcional)",
//     vehicle: "Marca y modelo del vehículo",
//     insurerEndDate: "Fin de su contrato actual",
//     accidentDate: "Fecha del accidente",
//     plate: "Matrícula",
//     company: "Nombre de la empresa",
//     employees: "Número de empleados",
//     activity: "Empresa / actividad",
//     coverType: "Tipo de cobertura deseada",
//     consent: "Acepto que CPA utilice esta información para contactarme, conforme a la",
//     policy: "política de privacidad",
//     submit: "Enviar",
//     later: "Más tarde",
//     errName: "Indique su nombre.",
//     errPhone: "Número de teléfono no válido.",
//     errEmail: "Email no válido.",
//     errConsent: "Acepte para continuar.",
//     errSend: "El envío falló. Inténtelo de nuevo o contáctenos por WhatsApp.",
//     thanks: "¡Gracias! Un asesor de CPA le contactará pronto.",
//   },
// };
//
// interface LeadFormProps {
//   departmentId: string | null;
//   questions: string[];
//   page: string;
//   onDone: () => void;
//   onDismiss: () => void;
// }
//
// const inputClass =
//   "w-full rounded-lg border border-gray-300 px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500";
//
// /** Formulaire affiché après 3 questions : coordonnées + champs propres au service concerné. */
// const LeadForm = ({ departmentId, questions, page, onDone, onDismiss }: LeadFormProps) => {
//   const { lang } = useLanguage();
//   const tx = TEXT[(lang as Lang) in TEXT ? (lang as Lang) : "fr"];
//   const extraFields = (departmentId && LEAD_FIELDS_BY_DEPARTMENT[departmentId]) || [];
//
//   const [fullName, setFullName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [details, setDetails] = useState<Partial<Record<LeadFieldKey, string>>>({});
//   const [consent, setConsent] = useState(false);
//   const [website, setWebsite] = useState(""); // pot de miel anti-robots
//   const [error, setError] = useState("");
//   const [sending, setSending] = useState(false);
//
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (fullName.trim().length < 2) return setError(tx.errName);
//     if (!isValidPhone(phone)) return setError(tx.errPhone);
//     if (!isValidEmail(email.trim())) return setError(tx.errEmail);
//     if (!consent) return setError(tx.errConsent);
//     setError("");
//     setSending(true);
//     try {
//       await submitLead({
//         department: departmentId || "none",
//         fullName: fullName.trim(),
//         phone: phone.trim(),
//         email: email.trim(),
//         details,
//         questions,
//         lang,
//         page,
//         consent,
//         website,
//       });
//       onDone();
//     } catch (err) {
//       console.warn("[Chatbot] Envoi des coordonnées impossible", err);
//       setError(tx.errSend);
//     } finally {
//       setSending(false);
//     }
//   };
//
//   return (
//     <form onSubmit={handleSubmit} className="space-y-2 rounded-xl border border-blue-200 bg-blue-50/60 p-3 text-xs">
//       <p className="text-gray-700">{tx.intro}</p>
//       <input className={inputClass} placeholder={tx.fullName} value={fullName} onChange={(e) => setFullName(e.target.value)} maxLength={100} autoComplete="name" />
//       <input className={inputClass} placeholder={tx.phone} value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={20} type="tel" autoComplete="tel" dir="ltr" />
//       <input className={inputClass} placeholder={tx.email} value={email} onChange={(e) => setEmail(e.target.value)} maxLength={120} type="email" autoComplete="email" dir="ltr" />
//       {extraFields.map((f) => (
//         <label key={f.key} className="block">
//           {f.type === "date" && <span className="mb-0.5 block text-[10px] text-gray-500">{tx[f.key]}</span>}
//           <input
//             className={inputClass}
//             type={f.type}
//             placeholder={tx[f.key]}
//             aria-label={tx[f.key]}
//             value={details[f.key] ?? ""}
//             onChange={(e) => setDetails((d) => ({ ...d, [f.key]: e.target.value }))}
//             maxLength={120}
//             min={f.type === "number" ? 0 : undefined}
//           />
//         </label>
//       ))}
//       {/* Pot de miel : invisible pour les humains, rempli par les robots */}
//       <input type="text" name="website" value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
//       <label className="flex items-start gap-2 text-[11px] text-gray-600">
//         <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5" />
//         <span>
//           {tx.consent}{" "}
//           <a href="/politique-confidentialite" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
//             {tx.policy}
//           </a>
//           .
//         </span>
//       </label>
//       {error && <p className="text-[11px] text-red-600">{error}</p>}
//       <div className="flex gap-2">
//         <button type="submit" disabled={sending} className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 py-1.5 font-semibold text-white disabled:opacity-60">
//           {sending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ShieldCheck className="h-3.5 w-3.5" />}
//           {tx.submit}
//         </button>
//         <button type="button" onClick={onDismiss} className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-gray-600 hover:bg-gray-50">
//           {tx.later}
//         </button>
//       </div>
//     </form>
//   );
// };
//
// export const leadThanksMessage = (lang: string) => TEXT[(lang as Lang) in TEXT ? (lang as Lang) : "fr"].thanks;
//
// export default LeadForm;
