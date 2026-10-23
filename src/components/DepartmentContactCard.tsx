// [IA désactivée] Fichier de l'assistant intelligent mis entièrement en commentaire.
// Pour le réactiver : retirer les « // » en début de ligne (et la ligne « export {} » ci-dessous).
export {};
// import { Phone, MessageCircle, Mail, Send } from "lucide-react";
// import { departments } from "@/data/departments";
// import { useLanguage } from "@/i18n/LanguageContext";
//
// const LABELS = {
//   fr: { title: "Service concerné", direct: "Direct", contact: "Contacter" },
//   en: { title: "Department to contact", direct: "Direct", contact: "Contact" },
//   ar: { title: "المصلحة المعنية", direct: "مباشر", contact: "تواصل" },
//   es: { title: "Departamento", direct: "Directo", contact: "Contactar" },
// };
//
// const DEFAULT_WHATSAPP_MESSAGE = "Bonjour CPA, je souhaite avoir plus d'informations.";
//
// /** Carte de contact du service CPA vers lequel le chatbot oriente le visiteur. */
// const DepartmentContactCard = ({ departmentId }: { departmentId: string }) => {
//   const { t, lang } = useLanguage();
//   const dept = departments.find((d) => d.id === departmentId);
//   if (!dept) return null;
//   const l = LABELS[lang as keyof typeof LABELS] || LABELS.fr;
//   const whatsappUrl = `https://wa.me/${dept.whatsappFull}?text=${encodeURIComponent(
//     dept.customMessage || DEFAULT_WHATSAPP_MESSAGE,
//   )}`;
//
//   return (
//     <div className="mt-2 rounded-xl border border-gray-200 bg-white p-3 text-xs shadow-sm">
//       <div className="mb-2 flex items-center gap-2">
//         <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${dept.color} text-white`}>
//           <Phone className="h-4 w-4" />
//         </div>
//         <div>
//           <p className="text-[10px] uppercase tracking-wide text-gray-400">{l.title}</p>
//           <p className="font-semibold text-gray-800">{t(dept.nameKey).trim()}</p>
//         </div>
//       </div>
//       <div className="space-y-1.5">
//         <a href={`tel:${dept.fixFull}`} className="flex items-center gap-2 rounded-lg bg-gray-50 px-2 py-1.5 text-gray-700 hover:bg-gray-100">
//           <Phone className="h-3.5 w-3.5 text-gray-500" />
//           <span className="text-[10px] uppercase text-gray-400">{l.direct}</span>
//           <span className="font-medium" dir="ltr">{dept.fix}</span>
//         </a>
//         <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg bg-green-50 px-2 py-1.5 text-green-700 hover:bg-green-100">
//           <MessageCircle className="h-3.5 w-3.5" />
//           <span className="text-[10px] uppercase">WhatsApp</span>
//           <span className="font-medium" dir="ltr">{dept.whatsapp}</span>
//         </a>
//         <a href={`mailto:${dept.email}`} className="flex items-center gap-2 rounded-lg bg-blue-50 px-2 py-1.5 text-blue-700 hover:bg-blue-100">
//           <Mail className="h-3.5 w-3.5" />
//           <span className="font-medium" dir="ltr">{dept.email}</span>
//         </a>
//       </div>
//       <a
//         href={whatsappUrl}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="mt-2 flex items-center justify-center gap-1.5 rounded-lg bg-green-600 py-1.5 font-semibold text-white hover:bg-green-700"
//       >
//         <Send className="h-3.5 w-3.5" />
//         {l.contact}
//       </a>
//     </div>
//   );
// };
//
// export default DepartmentContactCard;
