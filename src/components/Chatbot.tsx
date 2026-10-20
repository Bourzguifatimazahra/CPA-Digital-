import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, MessageSquare, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import PromoBanner from "./PromoBanner";
import { askGemini, isGeminiEnabled } from "@/lib/gemini";
import { isLeadCaptureEnabled } from "@/lib/leads";
import DepartmentContactCard from "./DepartmentContactCard";
import LeadForm, { leadThanksMessage } from "./LeadForm";

const WHATSAPP_NUMBER = "212667558436";
// Limites pour protéger le quota gratuit Gemini
const MAX_INPUT_LENGTH = 500;
const MAX_AI_MESSAGES_PER_SESSION = 30;
const AI_COUNT_KEY = "cpa_chatbot_ai_count";

const getAiCount = (): number => {
  try {
    return Number(sessionStorage.getItem(AI_COUNT_KEY)) || 0;
  } catch {
    return 0;
  }
};

const incrementAiCount = () => {
  try {
    sessionStorage.setItem(AI_COUNT_KEY, String(getAiCount() + 1));
  } catch {
    // sessionStorage indisponible (navigation privée) : on ignore
  }
};

// Formulaire de coordonnées : proposé une fois par session, après la 3e question
const QUESTIONS_BEFORE_LEAD_FORM = 3;
const LEAD_STATE_KEY = "cpa_chatbot_lead_state"; // "submitted" | "dismissed"

const isLeadFormClosed = (): boolean => {
  try {
    return Boolean(sessionStorage.getItem(LEAD_STATE_KEY));
  } catch {
    return false;
  }
};

const closeLeadForm = (state: "submitted" | "dismissed") => {
  try {
    sessionStorage.setItem(LEAD_STATE_KEY, state);
  } catch {
    // sessionStorage indisponible : le formulaire pourra réapparaître, sans gravité
  }
};
const WHATSAPP_MESSAGE = "Bonjour, je souhaite avoir plus d'informations sur vos services.";

// Page context types for page-specific ads
export type PageContext = 
  | 'home' 
  | 'particuliers' 
  | 'entreprises' 
  | 'expertise' 
  | 'contact'
  | 'auto' 
  | 'habitation' 
  | 'sante' 
  | 'epargne' 
  | 'prevoyance'
  | 'travail' 
  | 'construction' 
  | 'transport' 
  | 'cyber' 
  | 'flotte'
  | 'trottinette'
  | 'animaux'
  | 'mentions-legales'
  | 'mentions-legales-assistant'
  | 'politique-confidentialite'
  | 'catalog'
  | 'service';

// Page-specific ads configuration
const pageSpecificAds: Record<PageContext, Array<{ icon: string; title: string; text: string; titleEn: string; titleAr: string; titleEs: string; textEn: string; textAr: string; textEs: string }>> = {
  home: [
    { icon: "🏠", title: "Assurance Habitation", titleEn: "Home Insurance", titleAr: "تأمين المنزل", titleEs: "Seguro de Hogar", text: "Protégez votre foyer", textEn: "Protect your home", textAr: "احمِ منزلك", textEs: "Protege tu hogar" },
    { icon: "🚗", title: "Assurance Auto", titleEn: "Auto Insurance", titleAr: "تأمين السيارات", titleEs: "Seguro de Auto", text: "Devis gratuit", textEn: "Free quote", textAr: "عرض سعر مجاني", textEs: "Presupuesto gratis" },
    { icon: "❤️", title: "Assurance Santé", titleEn: "Health Insurance", titleAr: "التأمين الصحي", titleEs: "Seguro de Salud", text: "Meilleur coverage", textEn: "Best coverage", textAr: "أفضل تغطية", textEs: "Mejor cobertura" },
    { icon: "🏢", title: "Assurance Entreprise", titleEn: "Business Insurance", titleAr: "تأمين الشركات", titleEs: "Seguro de Empresa", text: "Solutions pro", textEn: "Pro solutions", textAr: "حلول احترافية", textEs: "Soluciones pro" },
    { icon: "🔒", title: "Bienvenue!", titleEn: "Welcome!", titleAr: "مرحباً!", titleEs: "¡Bienvenido!", text: "CPA à votre service", textEn: "CPA at your service", textAr: "CPA في خدمتك", textEs: "CPA a tu servicio" },
    { icon: "✨", title: "Promotions", titleEn: "Promotions", titleAr: "عروض خاصة", titleEs: "Promociones", text: "-20% sur auto", textEn: "-20% on auto", textAr: "-20% على السيارات", textEs: "-20% en auto" },
  ],
  particuliers: [
    { icon: "🚗", title: "Assurance Auto", titleEn: "Auto Insurance", titleAr: "تأمين السيارات", titleEs: "Seguro de Auto", text: "Devis gratuit", textEn: "Free quote", textAr: "عرض سعر مجاني", textEs: "Presupuesto gratis" },
    { icon: "🏠", title: "Assurance Habitation", titleEn: "Home Insurance", titleAr: "تأمين المنزل", titleEs: "Seguro de Hogar", text: "Protégez votre foyer", textEn: "Protect your home", textAr: "احمِ منزلك", textEs: "Protege tu hogar" },
    { icon: "❤️", title: "Assurance Santé", titleEn: "Health Insurance", titleAr: "التأمين الصحي", titleEs: "Seguro de Salud", text: "Meilleur coverage", textEn: "Best coverage", textAr: "أفضل تغطية", textEs: "Mejor cobertura" },
    { icon: "🏥", title: "Assurance Vie", titleEn: "Life Insurance", titleAr: "تأمين الحياة", titleEs: "Seguro de Vida", text: "Épargnez demain", textEn: "Save for tomorrow", textAr: "ادخر للغد", textEs: "Ahorra para mañana" },
    { icon: "🐾", title: "Assurance Animaux", titleEn: "Pet Insurance", titleAr: "تأمين الحيوانات", titleEs: "Seguro de Mascotas", text: "Protégez vos pets", textEn: "Protect your pets", textAr: "احمِ حيواناتك", textEs: "Protege tus mascotas" },
    { icon: "🛴", title: "Trottinette Électrique", titleEn: "Electric Scooter", titleAr: "سكوتر كهربائي", titleEs: "Patinete Eléctrico", text: "Nouvelle protection", textEn: "New protection", textAr: "حماية جديدة", textEs: "Nueva protección" },
  ],
  entreprises: [
    { icon: "🏢", title: "RC Professionnelle", titleEn: "Professional Liability", titleAr: "المسؤولية المهنية", titleEs: "RC Profesional", text: "Protection complète", textEn: "Complete protection", textAr: "حماية كاملة", textEs: "Protección completa" },
    { icon: "⚙️", title: "Accidents de Travail", titleEn: "Work Accidents", titleAr: "حوادث العمل", titleEs: "Accidentes Laborales", text: "Obligatoire", textEn: "Mandatory", textAr: "إلزامي", textEs: "Obligatorio" },
    { icon: "🔒", title: "Cyber Risques", titleEn: "Cyber Risks", titleAr: "مخاطر الإنترنت", titleEs: "Riesgos Cibernéticos", text: "Protection digitale", textEn: "Digital protection", textAr: "حماية رقمية", textEs: "Protección digital" },
    { icon: "🚗", title: "Flotte Auto", titleEn: "Auto Fleet", titleAr: "أسطول السيارات", titleEs: "Flota de Autos", text: "-15% pour 5+", textEn: "-15% for 5+", textAr: "-15% لـ 5+", textEs: "-15% para 5+" },
    { icon: "🏗️", title: "Construction", titleEn: "Construction", titleAr: "البناء", titleEs: "Construcción", text: "Garantie décennale", textEn: "10-year warranty", textAr: "ضمان 10 سنوات", textEs: "Garantía 10 años" },
    { icon: "🚢", title: "Transport Maritime", titleEn: "Marine Transport", titleAr: "النقل البحري", titleEs: "Transporte Marítimo", text: "Couverture globale", textEn: "Global coverage", textAr: "تغطية شاملة", textEs: "Cobertura global" },
  ],
  expertise: [
    { icon: "🎯", title: "Courtier Expert", titleEn: "Expert Broker", titleAr: "وسيط خبير", titleEs: "Corredor Experto", text: "Depuis 1957", textEn: "Since 1957", textAr: "منذ 1957", textEs: "Desde 1957" },
    { icon: "⭐", title: "Meilleur Service", titleEn: "Best Service", titleAr: "أفضل خدمة", titleEs: "Mejor Servicio", text: "Client au cœur", textEn: "Client at heart", textAr: "العميل أولاً", textEs: "Cliente primero" },
    { icon: "🤝", title: "Partenaires", titleEn: "Partners", titleAr: "شركاء", titleEs: "Socios", text: "10+ compagnies", textEn: "10+ companies", textAr: "10+ شركات", textEs: "10+ compañías" },
    { icon: "💼", title: "Conseil Gratuit", titleEn: "Free Advice", titleAr: "استشارة مجانية", titleEs: "Asesoría Gratis", text: "Sans engagement", textEn: "No obligation", textAr: "بدون التزام", textEs: "Sin compromiso" },
    { icon: "🛡️", title: "Suivi Sinistres", titleEn: "Claims Follow-up", titleAr: "متابعة المطالبات", titleEs: "Seguimiento Siniestros", text: "À vos côtés", textEn: "By your side", textAr: "بجانبك", textEs: "A tu lado" },
    { icon: "⚡", title: "Réactivité", titleEn: "Responsiveness", titleAr: "الاستجابة", titleEs: "Rapidez", text: "Réponse 24h", textEn: "24h response", textAr: "استجابة 24 ساعة", textEs: "Respuesta 24h" },
  ],
  contact: [
    { icon: "📞", title: "Appelez-nous", titleEn: "Call us", titleAr: "اتصل بنا", titleEs: "Llámanos", text: "0667558436", textEn: "0667558436", textAr: "0667558436", textEs: "0667558436" },
    { icon: "✉️", title: "Email", titleEn: "Email", titleAr: "البريد الإلكتروني", titleEs: "Correo", text: "info@cpa.ma", textEn: "info@cpa.ma", textAr: "info@cpa.ma", textEs: "info@cpa.ma" },
    { icon: "📍", title: "Casablanca", titleEn: "Casablanca", titleAr: "الدار البيضاء", titleEs: "Casablanca", text: "Siège CPA", textEn: "CPA Headquarters", textAr: "مقر CPA", textEs: "Sede CPA" },
    { icon: "⏰", title: "Horaires", titleEn: "Hours", titleAr: "ساعات العمل", titleEs: "Horarios", text: "Lun-Ven 8h30-18h", textEn: "Mon-Fri 8:30-18h", textAr: "الإثنين-الجمعة 8:30-18", textEs: "Lun-Vie 8:30-18h" },
    { icon: "💬", title: "WhatsApp", titleEn: "WhatsApp", titleAr: "واتساب", titleEs: "WhatsApp", text: "Contact rapide", textEn: "Quick contact", textAr: "اتصال سريع", textEs: "Contacto rápido" },
    { icon: "📋", title: "Devis Gratuit", titleEn: "Free Quote", titleAr: "عرض سعر مجاني", titleEs: "Presupuesto Gratis", text: "Sans engagement", textEn: "No obligation", textAr: "بدون التزام", textEs: "Sin compromiso" },
  ],
  auto: [
    { icon: "🚗", title: "RC Obligatoire", titleEn: "Mandatory Liability", titleAr: "المسؤولية المدنية الإلزامية", titleEs: "RC Obligatorio", text: "Au Maroc", textEn: "In Morocco", textAr: "في المغرب", textEs: "En Marruecos" },
    { icon: "🛡️", title: "Tous Risques", titleEn: "Full Coverage", titleAr: "تغطية شاملة", titleEs: "Todo Riesgo", text: "Protection max", textEn: "Max protection", textAr: "أقصى حماية", textEs: "Protección máx" },
    { icon: "🔥", title: "Incendie & Vol", titleEn: "Fire & Theft", titleAr: "حريق وسرقة", titleEs: "Incendio y Robo", text: "Sécurisez", textEn: "Secure it", textAr: "احمِ سيارتك", textEs: "Asegúralo" },
    { icon: "👤", title: "Conducteur", titleEn: "Driver", titleAr: "السائق", titleEs: "Conductor", text: "Protection incluse", textEn: "Protection included", textAr: "حماية مشمولة", textEs: "Protección incluida" },
    { icon: "🚗", title: "Flotte Auto", titleEn: "Auto Fleet", titleAr: "أسطول السيارات", titleEs: "Flota de Autos", text: "5+ véhicules -15%", textEn: "5+ vehicles -15%", textAr: "5+ مركبات -15%", textEs: "5+ vehículos -15%" },
    { icon: "🛵", title: "Trottinette Électrique", titleEn: "Electric Scooter", titleAr: "سكوتر كهربائي", titleEs: "Patinete Eléctrico", text: "Nouvelle coverage", textEn: "New coverage", textAr: "تغطية جديدة", textEs: "Nueva cobertura" },
  ],
  habitation: [
    { icon: "🏠", title: "Vol & Incendie", titleEn: "Theft & Fire", titleAr: "سرقة وحريق", titleEs: "Robo e Incendio", text: "Protégez", textEn: "Protect", textAr: "احمِ", textEs: "Protege" },
    { icon: "💧", title: "Dégâts des Eaux", titleEn: "Water Damage", titleAr: "أضرار المياه", titleEs: "Daños por Agua", text: "Couvert", textEn: "Covered", textAr: "مشمول", textEs: "Cubierto" },
    { icon: "🌊", title: "Catastrophes", titleEn: "Disasters", titleAr: "كوارث", titleEs: "Catástrofes", text: "Naturelles", textEn: "Natural", textAr: "طبيعية", textEs: "Naturales" },
    { icon: "👥", title: "RC Vie Privée", titleEn: "Privacy Liability", titleAr: "مسؤولية خاصة", titleEs: "RC Vida Privada", text: "Familiale", textEn: "Family", textAr: "عائلي", textEs: "Familiar" },
    { icon: "🔧", title: "Assistance", titleEn: "Assistance", titleAr: "مساعدة", titleEs: "Asistencia", text: "Dépannage 24h", textEn: "24h repair", textAr: "إصلاح 24 ساعة", textEs: "Reparación 24h" },
    { icon: "💰", title: "Prix Compétitif", titleEn: "Competitive Price", titleAr: "سعر تنافسي", titleEs: "Precio Competitivo", text: "Devis gratuit", textEn: "Free quote", textAr: "عرض سعر مجاني", textEs: "Presupuesto gratis" },
  ],
  sante: [
    { icon: "🏥", title: "Remboursement", titleEn: "Reimbursement", titleAr: "تعويض", titleEs: "Reembolso", text: "Frais médicaux", textEn: "Medical expenses", textAr: "نفقات طبية", textEs: "Gastos médicos" },
    { icon: "🦷", title: "Dentaire & Optique", titleEn: "Dental & Optical", titleAr: "أسنان وبصريات", titleEs: "Dental y Óptica", text: "Inclus", textEn: "Included", textAr: "مشمول", textEs: "Incluido" },
    { icon: "👨‍👩‍👧‍👦", title: "Famille", titleEn: "Family", titleAr: "عائلة", titleEs: "Familia", text: "Couvre toute votre famille", textEn: "Covers your whole family", textAr: "يغطي عائلتك بأكملها", textEs: "Cubre a toda tu familia" },
    { icon: "🏢", title: "Groupe Entreprise", titleEn: "Group Business", titleAr: "مجموعة شركات", titleEs: "Grupo Empresa", text: "Tarifs préférentiels", textEn: "Preferential rates", textAr: "أسعار تفضيلية", textEs: "Tarifas preferenciales" },
    { icon: "💊", title: "Pharmacie", titleEn: "Pharmacy", titleAr: "صيدلية", titleEs: "Farmacia", text: "Remboursement médicaments", textEn: "Medication reimbursement", textAr: "تعويض الأدوية", textEs: "Reembolso de medicamentos" },
    { icon: "🚑", title: "Hospitalisation", titleEn: "Hospitalization", titleAr: "مستشفى", titleEs: "Hospitalización", text: "Frais couverts", textEn: "Expenses covered", textAr: "نفقات مشمولة", textEs: "Gastos cubiertos" },
  ],
  epargne: [
    { icon: "💰", title: "Épargne Vie", titleEn: "Life Savings", titleAr: "ادخار الحياة", titleEs: "Ahorro Vida", text: "Fiscalité avantageuse", textEn: "Tax advantages", textAr: "مزايا ضريبية", textEs: "Ventajas fiscales" },
    { icon: "📈", title: "Rendement", titleEn: "Returns", titleAr: "عائد", titleEs: "Rendimiento", text: "Faites croître votre argent", textEn: "Grow your money", textAr: "نمِّ أموالك", textEs: "Haz crecer tu dinero" },
    { icon: "🛡️", title: "Capital", titleEn: "Capital", titleAr: "رأس المال", titleEs: "Capital", text: "Garanti", textEn: "Guaranteed", textAr: "مضمون", textEs: "Garantizado" },
    { icon: "📅", title: "Durée Flexible", titleEn: "Flexible Duration", titleAr: "مدة مرنة", titleEs: "Duración Flexible", text: "Selon vos besoins", textEn: "According to your needs", textAr: "حسب احتياجاتك", textEs: "Según tus necesidades" },
    { icon: "🎁", title: "Avantages", titleEn: "Benefits", titleAr: "مزايا", titleEs: "Beneficios", text: "Multiples avantages", textEn: "Multiple benefits", textAr: "مزايا متعددة", textEs: "Múltiples beneficios" },
    { icon: "💎", title: "Capital Différé", titleEn: "Deferred Capital", titleAr: "رأس المال المؤجل", titleEs: "Capital Diferido", text: "Option retraite", textEn: "Retirement option", textAr: "خيار التقاعد", textEs: "Opción jubilación" },
  ],
  prevoyance: [
    { icon: "🛡️", title: "Prévoyance", titleEn: "Foresight", titleAr: "التأمين التكميلي", titleEs: "Previsión", text: "Protégez votre famille", textEn: "Protect your family", textAr: "احمِ عائلتك", textEs: "Protege a tu familia" },
    { icon: "👨‍👩‍👧‍👦", title: "Garantie Décès", titleEn: "Death Benefit", titleAr: "ضمان الوفاة", titleEs: "Garantía Deceso", text: "Sécurité pour vos proches", textEn: "Security for your loved ones", textAr: "أمان لأحبائك", textEs: "Seguridad para tus seres queridos" },
    { icon: "💼", title: "PTIA", titleEn: "PTIA", titleAr: "عجز كلي", titleEs: "Invalidez Total", text: "Incapacité totale", textEn: "Total disability", textAr: "عجز كلي", textEs: "Invalidez total" },
    { icon: "🏥", title: "Frais Funéraires", titleEn: "Funeral Expenses", titleAr: "نفقات الجنازة", titleEs: "Gastos Funerarios", text: "Prise en charge", textEn: "Coverage", textAr: "تغطية", textEs: "Cobertura" },
    { icon: "💰", title: "Rente", titleEn: "Annuity", titleAr: "معاش", titleEs: "Renta", text: "Pour votre conjoint", textEn: "For your spouse", textAr: "لزوجك", textEs: "Para tu cónyuge" },
    { icon: "📋", title: "Personnalisable", titleEn: "Customizable", titleAr: "قابل للتخصيص", titleEs: "Personalizable", text: "Adapté à vous", textEn: "Adapted to you", textAr: "مناسب لك", textEs: "Adaptado a ti" },
  ],
  travail: [
    { icon: "⚙️", title: "AT/MP", titleEn: "Work Accidents", titleAr: "حوادث العمل", titleEs: "Accidentes Laborales", text: "Obligatoire", textEn: "Mandatory", textAr: "إلزامي", textEs: "Obligatorio" },
    { icon: "🏢", title: "Entreprises", titleEn: "Businesses", titleAr: "شركات", titleEs: "Empresas", text: "Toutes tailles", textEn: "All sizes", textAr: "جميع الأحجام", textEs: "Todos los tamaños" },
    { icon: "👷", title: "Salariés", titleEn: "Employees", titleAr: "موظفين", titleEs: "Empleados", text: "Protégés", textEn: "Protected", textAr: "محميون", textEs: "Protegidos" },
    { icon: "🏥", title: "Soins", titleEn: "Care", titleAr: "رعاية", titleEs: "Cuidado", text: "Couverts", textEn: "Covered", textAr: "مشمولون", textEs: "Cubiertos" },
    { icon: "💰", title: "Indemnités", titleEn: "Compensation", titleAr: "تعويضات", titleEs: "Indemnizaciones", text: "Journalières", textEn: "Daily", textAr: "يومية", textEs: "Diarias" },
    { icon: "📋", title: "Conformité", titleEn: "Compliance", titleAr: "امتثال", titleEs: "Conformidad", text: "Légale", textEn: "Legal", textAr: "قانوني", textEs: "Legal" },
  ],
  construction: [
    { icon: "🏗️", title: "Dommage Ouvrage", titleEn: "Damage to Work", titleAr: "أضرار العمل", titleEs: "Daño Obra", text: "Garantie 10 ans", textEn: "10-year warranty", textAr: "ضمان 10 سنوات", textEs: "Garantía 10 años" },
    { icon: "👷", title: "RC Professionnelle", titleEn: "Professional Liability", titleAr: "المسؤولية المهنية", titleEs: "RC Profesional", text: "BTP & Architectes", textEn: "Construction & Architects", textAr: "بناء ومهندسون", textEs: "Construcción y Arquitectos" },
    { icon: "🏭", title: "Matériel", titleEn: "Equipment", titleAr: "معدات", titleEs: "Material", text: "Couvert", textEn: "Covered", textAr: "مشمول", textEs: "Cubierto" },
    { icon: "👥", title: "Tiers", titleEn: "Third Parties", titleAr: "أطراف ثالثة", titleEs: "Terceros", text: "Protection", textEn: "Protection", textAr: "حماية", textEs: "Protección" },
    { icon: "📋", title: "Multirisque", titleEn: "Multi-risk", titleAr: "متعدد المخاطر", titleEs: "Multiriesgo", text: "Complet", textEn: "Complete", textAr: "كامل", textEs: "Completo" },
    { icon: "⚡", title: "Garantie Prolongée", titleEn: "Extended Warranty", titleAr: "ضمان ممتد", titleEs: "Garantía Extendida", text: "Option", textEn: "Option", textAr: "خيار", textEs: "Opción" },
  ],
  transport: [
    { icon: "🚢", title: "Maritime", titleEn: "Maritime", titleAr: "بحري", titleEs: "Marítimo", text: "Cargo & Marchandises", textEn: "Cargo & Goods", textAr: "شحن وبضائع", textEs: "Carga y Mercancías" },
    { icon: "✈️", title: "Aérien", titleEn: "Air", titleAr: "جوي", titleEs: "Aéreo", text: "Transport Aérien", textEn: "Air Transport", textAr: "نقل جوي", textEs: "Transporte Aéreo" },
    { icon: "🚛", title: "Terrestre", titleEn: "Land", titleAr: "بري", titleEs: "Terrestre", text: "Camions & Autos", textEn: "Trucks & Cars", textAr: "شاحنات وسيارات", textEs: "Camiones y Autos" },
    { icon: "📦", title: "Entreposage", titleEn: "Warehousing", titleAr: "تخزين", titleEs: "Almacenamiento", text: "Stockage couvert", textEn: "Storage covered", textAr: "تخزين مشمول", textEs: "Almacenamiento cubierto" },
    { icon: "🛡️", title: "RC Transport", titleEn: "Transport Liability", titleAr: "مسؤولية النقل", titleEs: "RC Transporte", text: "Responsabilité", textEn: "Liability", textAr: "مسؤولية", textEs: "Responsabilidad" },
    { icon: "🌍", title: "International", titleEn: "International", titleAr: "دولي", titleEs: "Internacional", text: "Couverture mondiale", textEn: "Worldwide coverage", textAr: "تغطية عالمية", textEs: "Cobertura mundial" },
  ],
  cyber: [
    { icon: "🔐", title: "Cyber Risques", titleEn: "Cyber Risks", titleAr: "مخاطر الإنترنت", titleEs: "Riesgos Cibernéticos", text: "Protection digitale", textEn: "Digital protection", textAr: "حماية رقمية", textEs: "Protección digital" },
    { icon: "🦠", title: "Ransomware", titleEn: "Ransomware", titleAr: "برامج الفدية", titleEs: "Ransomware", text: "Couvert", textEn: "Covered", textAr: "مشمول", textEs: "Cubierto" },
    { icon: "💻", title: "Perte de Données", titleEn: "Data Loss", titleAr: "فقدان البيانات", titleEs: "Pérdida de Datos", text: "Récupération", textEn: "Recovery", textAr: "استرداد", textEs: "Recuperación" },
    { icon: "⚖️", title: "RC Numérique", titleEn: "Digital Liability", titleAr: "المسؤولية الرقمية", titleEs: "RC Digital", text: "Couverture", textEn: "Coverage", textAr: "تغطية", textEs: "Cobertura" },
    { icon: "📱", title: "Cyberharcèlement", titleEn: "Cyberbullying", titleAr: "تنمر إلكتروني", titleEs: "Ciberacoso", text: "Protection", textEn: "Protection", textAr: "حماية", textEs: "Protección" },
  ],
  flotte: [
    { icon: "🚗", title: "Flotte Auto", titleEn: "Auto Fleet", titleAr: "أسطول السيارات", titleEs: "Flota de Autos", text: "5+ véhicules", textEn: "5+ vehicles", textAr: "5+ مركبات", textEs: "5+ vehículos" },
    { icon: "💰", title: "Tarifs Groupés", titleEn: "Group Rates", titleAr: "أسعار جماعية", titleEs: "Tarifas Grupales", text: "-15% de réduction", textEn: "-15% discount", textAr: "-15% خصم", textEs: "-15% descuento" },
    { icon: "📋", title: "Gestion Simplifiée", titleEn: "Simplified Management", titleAr: "إدارة مبسطة", titleEs: "Gestión Simplificada", text: "Un seul contrat", textEn: "One contract", textAr: "عقد واحد", textEs: "Un contrato" },
    { icon: "🛡️", title: "Couvertures Multiples", titleEn: "Multiple Coverages", titleAr: "تغطيات متعددة", titleEs: "Coberturas Múltiples", text: "Flexibles", textEn: "Flexible", textAr: "مرنة", textEs: "Flexible" },
    { icon: "📊", title: "Reporting", titleEn: "Reporting", titleAr: "تقارير", titleEs: "Informes", text: "Suivi détaillé", textEn: "Detailed tracking", textAr: "تتبع مفصل", textEs: "Seguimiento detallado" },
    { icon: "⚡", title: "Sinistres Rapides", titleEn: "Fast Claims", titleAr: "مطالبات سريعة", titleEs: "Siniestros Rápidos", text: "Traitement prioritaire", textEn: "Priority processing", textAr: "أولوية المعالجة", textEs: "Procesamiento prioritario" },
  ],
  trottinette: [
    { icon: "🛵", title: "Trottinette Électrique", titleEn: "Electric Scooter", titleAr: "سكوتر كهربائي", titleEs: "Patinete Eléctrico", text: "Nouvelle protection", textEn: "New protection", textAr: "حماية جديدة", textEs: "Nueva protección" },
    { icon: "👤", title: "RC Obligatoire", titleEn: "Mandatory Liability", titleAr: "المسؤولية المدنية الإلزامية", titleEs: "RC Obligatorio", text: "Légal", textEn: "Legal", textAr: "قانوني", textEs: "Legal" },
    { icon: "🔒", title: "Vol & Vandalisme", titleEn: "Theft & Vandalism", titleAr: "سرقة وتخريب", titleEs: "Robo y Vandalismo", text: "Sécurisé", textEn: "Secure", textAr: "مؤمن", textEs: "Asegurado" },
    { icon: "🩹", title: "Blessures", titleEn: "Injuries", titleAr: "إصابات", titleEs: "Lesiones", text: "Couvertes", textEn: "Covered", textAr: "مشمولة", textEs: "Cubiertas" },
    { icon: "💶", title: "Prix Compétitif", titleEn: "Competitive Price", titleAr: "سعر تنافسي", titleEs: "Precio Competitivo", text: "À partir de X DH", textEn: "From X DH", textAr: "ابتداءً من X درهم", textEs: "Desde X DH" },
    { icon: "⚡", title: "EDPM", titleEn: "EDPM", titleAr: "مركبات كهربائية", titleEs: "EDPM", text: "Tous types", textEn: "All types", textAr: "جميع الأنواع", textEs: "Todos los tipos" },
  ],
  animaux: [
    { icon: "🐾", title: "Animaux Compagnie", titleEn: "Pet Insurance", titleAr: "تأمين الحيوانات الأليفة", titleEs: "Seguro de Mascotas", text: "Chien & Chat", textEn: "Dog & Cat", textAr: "كلب وقطة", textEs: "Perro y Gato" },
    { icon: "🏥", title: "Frais Vétérinaires", titleEn: "Veterinary Expenses", titleAr: "نفقات بيطرية", titleEs: "Gastos Veterinarios", text: "Consultations", textEn: "Consultations", textAr: "استشارات", textEs: "Consultas" },
    { icon: "💊", title: "Médicaments", titleEn: "Medications", titleAr: "أدوية", titleEs: "Medicamentos", text: "Couverts", textEn: "Covered", textAr: "مشمولة", textEs: "Cubiertos" },
    { icon: "🏨", title: "Hospitalisation", titleEn: "Hospitalization", titleAr: "مستشفى", titleEs: "Hospitalización", text: "Frais couverts", textEn: "Expenses covered", textAr: "نفقات مشمولة", textEs: "Gastos cubiertos" },
    { icon: "💰", title: "Budget Maîtrisé", titleEn: "Controlled Budget", titleAr: "ميزانية متحكم فيها", titleEs: "Presupuesto Controlado", text: "Pas de surprises", textEn: "No surprises", textAr: "بدون مفاجآت", textEs: "Sin sorpresas" },
    { icon: "❤️", title: "Tranquillité", titleEn: "Peace of Mind", titleAr: "راحة البال", titleEs: "Tranquilidad", text: "Pour votre compagnon", textEn: "For your companion", textAr: "لرفيقك", textEs: "Para tu compañero" },
  ],
  'mentions-legales': [
    { icon: "📜", title: "Mentions Légales", titleEn: "Legal Notice", titleAr: "الإشارات القانونية", titleEs: "Aviso Legal", text: "CPA 1957", textEn: "CPA 1957", textAr: "CPA 1957", textEs: "CPA 1957" },
    { icon: "🏢", title: "Siège Social", titleEn: "Headquarters", titleAr: "المقر الاجتماعي", titleEs: "Sede Social", text: "Casablanca", textEn: "Casablanca", textAr: "الدار البيضاء", textEs: "Casablanca" },
    { icon: "📋", title: "RC courtier", titleEn: "Broker Liability", titleAr: "مسؤولية الوسيط", titleEs: "RC Corredor", text: "Autorisé", textEn: "Authorized", textAr: "مرخص", textEs: "Autorizado" },
    { icon: "⚖️", title: "Juridiction", titleEn: "Jurisdiction", titleAr: "الاختصاص", titleEs: "Jurisdicción", text: "Maroc", textEn: "Morocco", textAr: "المغرب", textEs: "Marruecos" },
    { icon: "📧", title: "Contact", titleEn: "Contact", titleAr: "اتصل", titleEs: "Contacto", text: "info@cpa.ma", textEn: "info@cpa.ma", textAr: "info@cpa.ma", textEs: "info@cpa.ma" },
    { icon: "💼", title: "ICE", titleEn: "ICE", titleAr: "المعرف الموحد", titleEs: "ICE", text: "Obligatoire", textEn: "Mandatory", textAr: "إلزامي", textEs: "Obligatorio" },
  ],
  'mentions-legales-assistant': [
    { icon: "🤖", title: "Assistant Virtuel", titleEn: "Virtual Assistant", titleAr: "المساعد الافتراضي", titleEs: "Asistente Virtual", text: "CPA 1957", textEn: "CPA 1957", textAr: "CPA 1957", textEs: "CPA 1957" },
    { icon: "🏢", title: "Siège Social", titleEn: "Headquarters", titleAr: "المقر الاجتماعي", titleEs: "Sede Social", text: "Casablanca", textEn: "Casablanca", textAr: "الدار البيضاء", textEs: "Casablanca" },
    { icon: "📋", title: "RC courtier", titleEn: "Broker Liability", titleAr: "مسؤولية الوسيط", titleEs: "RC Corredor", text: "Autorisé", textEn: "Authorized", textAr: "مرخص", textEs: "Autorizado" },
    { icon: "⚖️", title: "Juridiction", titleEn: "Jurisdiction", titleAr: "الاختصاص", titleEs: "Jurisdicción", text: "Maroc", textEn: "Morocco", textAr: "المغرب", textEs: "Marruecos" },
    { icon: "📧", title: "Contact", titleEn: "Contact", titleAr: "اتصل", titleEs: "Contacto", text: "info@cpa.ma", textEn: "info@cpa.ma", textAr: "info@cpa.ma", textEs: "info@cpa.ma" },
    { icon: "💼", title: "ICE", titleEn: "ICE", titleAr: "المعرف الموحد", titleEs: "ICE", text: "Obligatoire", textEn: "Mandatory", textAr: "إلزامي", textEs: "Obligatorio" },
  ],
  'politique-confidentialite': [
    { icon: "🔒", title: "Confidentialité", titleEn: "Privacy", titleAr: "الخصوصية", titleEs: "Confidencialidad", text: "Protection données", textEn: "Data protection", textAr: "حماية البيانات", textEs: "Protección de datos" },
    { icon: "📧", title: "Contact CNDP", titleEn: "GDPR Contact", titleAr: "اتصال CNDP", titleEs: "Contacto CNDP", text: "Pour vos droits", textEn: "For your rights", textAr: "لحقوقك", textEs: "Para tus derechos" },
    { icon: "🍪", title: "Cookies", titleEn: "Cookies", titleAr: "ملفات تعريفية", titleEs: "Cookies", text: "Gestion", textEn: "Management", textAr: "إدارة", textEs: "Gestión" },
    { icon: "📝", title: "Consentement", titleEn: "Consent", titleAr: "موافقة", titleEs: "Consentimiento", text: "Transparent", textEn: "Transparent", textAr: "شفاف", textEs: "Transparente" },
    { icon: "🛡️", title: "Sécurité", titleEn: "Security", titleAr: "الأمان", titleEs: "Seguridad", text: "Données protégées", textEn: "Protected data", textAr: "بيانات محمية", textEs: "Datos protegidos" },
    { icon: "⚙️", title: "Paramètres", titleEn: "Settings", titleAr: "الإعدادات", titleEs: "Configuración", text: "Personnalisation", textEn: "Customization", textAr: "تخصيص", textEs: "Personalización" },
  ],
  catalog: [
    { icon: "📚", title: "Catalogue", titleEn: "Catalog", titleAr: "الكتالوج", titleEs: "Catálogo", text: "PDF téléchargeable", textEn: "Downloadable PDF", textAr: "PDF قابل للتحميل", textEs: "PDF descargable" },
    { icon: "👥", title: "Particuliers", titleEn: "Individuals", titleAr: "الأفراد", titleEs: "Particulares", text: "Toutes assurances", textEn: "All insurances", textAr: "جميع التأمينات", textEs: "Todos los seguros" },
    { icon: "🏢", title: "Entreprises", titleEn: "Business", titleAr: "الشركات", titleEs: "Empresas", text: "Risques pros", textEn: "Business risks", textAr: "المخاطر المهنية", textEs: "Riesgos profesionales" },
    { icon: "📥", title: "Télécharger", titleEn: "Download", titleAr: "تحميل", titleEs: "Descargar", text: "Gratuit", textEn: "Free", textAr: "مجاني", textEs: "Gratis" },
    { icon: "🚗", title: "Auto", titleEn: "Auto", titleAr: "السيارات", titleEs: "Auto", text: "Particuliers", textEn: "Individuals", textAr: "الأفراد", textEs: "Particulares" },
    { icon: "🏠", title: "Habitation", titleEn: "Home", titleAr: "السكن", titleEs: "Hogar", text: "Particuliers", textEn: "Individuals", textAr: "الأفراد", textEs: "Particulares" },
  ],
  service: [
    { icon: "⭐", title: "Service Premium", titleEn: "Premium Service", titleAr: "خدمة مميزة", titleEs: "Servicio Premium", text: "Devis personnalisé", textEn: "Personalized quote", textAr: "عرض سعر مخصص", textEs: "Presupuesto personalizado" },
    { icon: "🔄", title: "Suivi", titleEn: "Tracking", titleAr: "تتبع", titleEs: "Seguimiento", text: "En temps réel", textEn: "Real-time", textAr: "في الوقت الفعلي", textEs: "En tiempo real" },
    { icon: "📋", title: "Documents", titleEn: "Documents", titleAr: "مستندات", titleEs: "Documentos", text: "Upload sécurisé", textEn: "Secure upload", textAr: "تحميل آمن", textEs: "Carga segura" },
    { icon: "💰", title: "Économies", titleEn: "Savings", titleAr: "توفير", titleEs: "Ahorros", text: "Meilleur tarif", textEn: "Best rate", textAr: "أفضل سعر", textEs: "Mejor tarifa" },
    { icon: "🎯", title: "Expertise", titleEn: "Expertise", titleAr: "خبرة", titleEs: "Experiencia", text: "Depuis 1957", textEn: "Since 1957", textAr: "منذ 1957", textEs: "Desde 1957" },
  ],
};

const openWhatsApp = () => {
  const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, "_blank");
};

// FAQ data structure with multilingual support
interface FAQItem {
  q: { fr: string; en: string; ar: string; es: string };
  a: { fr: string; en: string; ar: string; es: string };
  keywords: { fr: string[]; en: string[]; ar: string[]; es: string[] };
}

const faqData: FAQItem[] = [
  // Concepts généraux / General Concepts
  { q: { fr: "Qu'est-ce que l'assurance ?", en: "What is insurance?", ar: "ما هو التأمين؟", es: "¿Qué es el seguro?" }, a: { fr: "L'assurance est un contrat qui vous protège contre un risque en échange d'une cotisation.", en: "Insurance is a contract that protects you against a risk in exchange for a contribution.", ar: "التأمين عقد يحميك من المخاطر مقابل اشتراك.", es: "El seguro es un contrato que te protege contra un riesgo a cambio de una contribución." }, keywords: { fr: ["assurance", "contrat", "protège", "risque"], en: ["insurance", "contract", "protect", "risk"], ar: ["تأمين", "عقد", "حماية", "خطر"], es: ["seguro", "contrato", "protege", "riesgo"] } },
  { q: { fr: "À quoi sert l'assurance ?", en: "What is insurance for?", ar: "ما فائدة التأمين؟", es: "¿Para qué sirve el seguro?" }, a: { fr: "Elle vous permet de réduire les conséquences financières en cas de sinistre.", en: "It helps you reduce financial consequences in case of a claim.", ar: "يساعدك في تقليل العواقب المالية في حالة المطالبة.", es: "Te ayuda a reducir las consecuencias financieras en caso de siniestro." }, keywords: { fr: ["sert", "conséquences", "financières", "sinistre"], en: ["purpose", "consequences", "financial", "claim"], ar: ["الغرض", "العواقب", "مالية", "مطالبة"], es: ["sirve", "consecuencias", "financieras", "siniestro"] } },
  { q: { fr: "Quelle est la différence entre assureur et courtier ?", en: "What is the difference between insurer and broker?", ar: "ما هو الفرق بين شركة التأمين والوسيط؟", es: "¿Cuál es la diferencia entre aseguradora y corredor?" }, a: { fr: "L'assureur garantit le risque, le courtier vous conseille et vous représente. CPA est votre courtier de confiance.", en: "The insurer guarantees the risk, the broker advises and represents you. CPA is your trusted broker.", ar: "شركة التأمين تضمن المخاطر، والوسيط ينصحك ويمثلك. CPA هو وسيطك الموثوق.", es: "La aseguradora garantiza el riesgo, el corredor te asesora y te representa. CPA es tu corredor de confianza." }, keywords: { fr: ["différence", "assureur", "courtier", "garantit"], en: ["difference", "insurer", "broker", "guarantee"], ar: ["فرق", "شركة تأمين", "وسيط", "يضمن"], es: ["diferencia", "aseguradora", "corredor", "garantiza"] } },
  { q: { fr: "Qu'est-ce qu'une prime d'assurance ?", en: "What is an insurance premium?", ar: "ما هو قسط التأمين؟", es: "¿Qué es una prima de seguro?" }, a: { fr: "C'est le montant que vous payez pour être assuré. Il varie selon le type de couverture et votre profil de risque.", en: "It's the amount you pay to be insured. It varies depending on the type of coverage and your risk profile.", ar: "هو المبلغ الذي تدفعه للتأمين. يختلف حسب نوع التغطية وملف المخاطر الخاص بك.", es: "Es el monto que pagas por estar asegurado. Varía según el tipo de cobertura y tu perfil de riesgo." }, keywords: { fr: ["prime", "montant", "payez", "assuré"], en: ["premium", "amount", "pay", "insured"], ar: ["قسط", "مبلغ", "تدفع", "مؤمن"], es: ["prima", "monto", "pagas", "asegurado"] } },
  { q: { fr: "Qu'est-ce qu'une franchise ?", en: "What is a deductible?", ar: "ما هي الفرانشيز؟", es: "¿Qué es un deducible?" }, a: { fr: "C'est la part du sinistre qui reste à votre charge. Plus la franchise est élevée, plus votre prime est basse.", en: "It's the portion of the claim that remains your responsibility. The higher the deductible, the lower your premium.", ar: "إنها حصة المطالبة التي تبقى مسؤوليتك. كلما ارتفعت الفرانشيز، انخفض قسطك.", es: "Es la parte del siniestro que corre por tu cuenta. Cuanto mayor sea el deducible, menor será tu prima." }, keywords: { fr: ["franchise", "charge", "sinistre"], en: ["deductible", "charge", "claim"], ar: ["فرانشيز", "مسؤولية", "مطالبة"], es: ["deducible", "cargo", "siniestro"] } },
  { q: { fr: "Le courtier est-il payant ?", en: "Is the broker paid?", ar: "هل الوسيط مدفوع الأجر؟", es: "¿El corredor es de pago?" }, a: { fr: "Non, sa rémunération est incluse dans votre prime d'assurance. Nos services de conseil sont gratuits pour vous.", en: "No, their remuneration is included in your insurance premium. Our advisory services are free for you.", ar: "لا، يتم تضمين أجره في قسط التأمين الخاص بك. خدماتنا الاستشارية مجانية لك.", es: "No, su remuneración está incluida en tu prima de seguro. Nuestros servicios de asesoramiento son gratuitos para ti." }, keywords: { fr: ["courtier", "payant", "gratuit", "rémunération"], en: ["broker", "paid", "free", "remuneration"], ar: ["وسيط", "مدفوع", "مجاني", "أجر"], es: ["corredor", "pagado", "gratis", "remuneración"] } },
  
  // Automobile / Auto
  { q: { fr: "L'assurance automobile est-elle obligatoire au Maroc ?", en: "Is auto insurance mandatory in Morocco?", ar: "هل التأمين على السيارات إلزامي في المغرب؟", es: "¿El seguro de auto es obligatorio en Marruecos?" }, a: { fr: "Oui, l'assurance responsabilité civile automobile est obligatoire au Maroc. Elle couvre les dommages que vous pourriez causer aux tiers en cas d'accident.", en: "Yes, mandatory auto liability insurance is required in Morocco. It covers damages you could cause to third parties in case of an accident.", ar: "نعم، التأمين الإلزامي على المسؤولية المدنية للسيارات مطلوب في المغرب. يغطي الأضرار التي قد تسببها للأطراف الثالثة في حالة الحادث.", es: "Sí, el seguro obligatorio de responsabilidad civil de auto es obligatorio en Marruecos. Cubre los daños que puedas causar a terceros en caso de accidente." }, keywords: { fr: ["automobile", "obligatoire", "maroc", "voiture", "auto"], en: ["auto", "mandatory", "morocco", "car"], ar: ["سيارات", "إلزامي", "المغرب", "سيارة"], es: ["auto", "obligatorio", "marruecos", "coche"] } },
  { q: { fr: "Quelles sont les garanties auto ?", en: "What are the auto coverage options?", ar: "ما هي تغطيات السيارات؟", es: "¿Cuáles son las coberturas de auto?" }, a: { fr: "Nous vous proposons : responsabilité civile, tous risques, vol, incendie, bris de glace, assistance, protection du conducteur, et dommages collision.", en: "We offer you: liability, comprehensive, theft, fire, glass breakage, assistance, driver protection, and collision damage.", ar: "نقدم لك: المسؤولية المدنية، شاملة، سرقة، حريق، كسر الزجاج، مساعدة، حماية السائق، وأضرار التصادم.", es: "Te ofrecemos: responsabilidad civil, todo riesgo, robo, incendio, rotura de cristales, asistencia, protección del conductor y daños por colisión." }, keywords: { fr: ["garanties", "auto", "tous risques", "vol", "incendie"], en: ["coverage", "auto", "comprehensive", "theft", "fire"], ar: ["تغطية", "سيارات", "شامل", "سرقة", "حريق"], es: ["coberturas", "auto", "todo riesgo", "robo", "incendio"] } },
  { q: { fr: "Combien coûte l'assurance auto ?", en: "How much does auto insurance cost?", ar: "كم تكلفة التأمين على السيارات؟", es: "¿Cuánto cuesta el seguro de auto?" }, a: { fr: "Le tarif dépend de votre véhicule, de votre profil conducteur, de votre zone géographique et des garanties que vous choisissez. Demandez un devis personnalisé !", en: "The rate depends on your vehicle, your driver profile, your geographic area and the coverage you choose. Request a personalized quote!", ar: "تعتمد الرسوم على سيارتك وملف السائق الخاص بك والمنطقة الجغرافية والتغطيات التي تختارها. اطلب عرض أسعار مخصص!", es: "La tarifa depende de tu vehículo, tu perfil de conductor, tu área geográfica y las coberturas que elijas. ¡Solicita un presupuesto personalizado!" }, keywords: { fr: ["coût", "prix", "tarif", "auto", "combien"], en: ["cost", "price", "rate", "auto", "how much"], ar: ["تكلفة", "سعر", "رسوم", "سيارات", "كم"], es: ["costo", "precio", "tarifa", "auto", "cuánto"] } },
  { q: { fr: "Comment assurer ma flotte de véhicules ?", en: "How to insure my vehicle fleet?", ar: "كيفية تأمين أسطول السيارات؟", es: "¿Cómo asegurar mi flota de vehículos?" }, a: { fr: "CPA vous propose des contrats flotte pour les entreprises à partir de 5 véhicules avec des tarifs préférentiels et une gestion simplifiée.", en: "CPA offers you fleet contracts for companies starting from 5 vehicles with preferential rates and simplified management.", ar: "تقدم لك CPA عقود أسطول للشركات ابتداءً من 5 سيارات مع أسعار تفضيلية وإدارة مبسطة.", es: "CPA te ofrece contratos de flota para empresas a partir de 5 vehículos con tarifas preferenciales y gestión simplificada." }, keywords: { fr: ["flotte", "véhicules", "entreprise", "parc"], en: ["fleet", "vehicles", "company", "fleet"], ar: ["أسطول", "مركبات", "شركة", "مجموعة"], es: ["flota", "vehículos", "empresa", "parque"] } },

  // Habitation / Home
  { q: { fr: "Pourquoi souscrire une assurance habitation ?", en: "Why subscribe to home insurance?", ar: "لماذا الاشتراك في تأمين المنزل؟", es: "¿Por qué suscribir un seguro de hogar?" }, a: { fr: "L'assurance habitation protège votre logement et vos biens contre le vol, l'incendie, les dégâts des eaux, les catastrophes naturelles et votre responsabilité civile.", en: "Home insurance protects your home and belongings against theft, fire, water damage, natural disasters and your civil liability.", ar: "يغطي تأمين المنزل منزلك وممتلكاتك ضد السرقة والحريق وتلف المياه والكوارث الطبيعية ومسؤوليتك المدنية.", es: "El seguro de hogar protege tu vivienda y tus bienes contra robo, incendio, daños por agua, catástrofes naturales y tu responsabilidad civil." }, keywords: { fr: ["habitation", "maison", "logement", "domicile"], en: ["home", "house", "housing", "residence"], ar: ["منزل", "بيت", "سكن", "إقامة"], es: ["hogar", "casa", "alojamiento", "domicilio"] } },
  
  // Santé / Health
  { q: { fr: "Comment fonctionne l'assurance santé ?", en: "How does health insurance work?", ar: "كيف يعمل التأمين الصحي؟", es: "¿Cómo funciona el seguro de salud?" }, a: { fr: "L'assurance santé vous rembourse vos frais médicaux (consultations, hospitalisations, médicaments, optique, dentaire) selon les barèmes de votre contrat.", en: "Health insurance reimburses your medical expenses (consultations, hospitalizations, medications, optical, dental) according to your contract rates.", ar: "يعيد التأمين الصحي تعويض نفقاتك الطبية (الاستشارات، المستشفى، الأدوية، البصريات، طب الأسنان) وفق أسعار عقدك.", es: "El seguro de salud te reembolsa tus gastos médicos (consultas, hospitalizaciones, medicamentos, óptica, dental) según las tarifas de tu contrato." }, keywords: { fr: ["santé", "médical", "remboursement", "maladie", "soin"], en: ["health", "medical", "reimbursement", "illness", "care"], ar: ["صحة", "طبي", "تعويض", "مرض", "رعاية"], es: ["salud", "médico", "reembolso", "enfermedad", "cuidado"] } },
  { q: { fr: "Proposez-vous une assurance santé groupe ?", en: "Do you offer group health insurance?", ar: "هل تقدمون تأمين صحي جماعي؟", es: "¿Ofrecen seguro de salud grupal?" }, a: { fr: "Oui, nous vous proposons des contrats santé groupe pour les entreprises couvrant les employés et leurs familles avec des tarifs avantageux.", en: "Yes, we offer you group health contracts for companies covering employees and their families with advantageous rates.", ar: "نعم، نقدم لك عقود صحية جماعية للشركات تغطي الموظفين وعائلاتهم بأسعار مميزة.", es: "Sí, te ofrecemos contratos de salud grupal para empresas que cubren a los empleados y sus familias con tarifas ventajosas." }, keywords: { fr: ["groupe", "entreprise", "employés", "collectif"], en: ["group", "company", "employees", "collective"], ar: ["جماعي", "شركة", "موظفين", "جماعي"], es: ["grupo", "empresa", "empleados", "colectivo"] } },

  // Sinistres / Claims
  { q: { fr: "Qu'est-ce qu'un sinistre ?", en: "What is a claim?", ar: "ما هي المطالبة؟", es: "¿Qué es un siniestro?" }, a: { fr: "C'est la réalisation du risque assuré : accident, vol, incendie, dégât des eaux, etc.", en: "It's the occurrence of the insured risk: accident, theft, fire, water damage, etc.", ar: "إنها حدوث الخطر المؤمن عليه: حادث، سرقة، حريق، تلف المياه، إلخ.", es: "Es la ocurrencia del riesgo asegurado: accidente, robo, incendio, daños por agua, etc." }, keywords: { fr: ["sinistre", "réalisation", "accident"], en: ["claim", "occurrence", "accident"], ar: ["مطالبة", "وقوع", "حادث"], es: ["siniestro", "ocurrencia", "accidente"] } },
  { q: { fr: "Quand déclarer un sinistre ?", en: "When to report a claim?", ar: "متى يجب الإبلاغ عن مطالبة؟", es: "¿Cuándo denunciar un siniestro?" }, a: { fr: "Dans les 5 jours ouvrables à compter du moment où vous en avez connaissance. Pour un vol, le délai est de 48 heures.", en: "Within 5 working days from when you become aware. For theft, the deadline is 48 hours.", ar: "خلال 5 أيام عمل من علمك بالأمر. في حالة السرقة، المهلة 48 ساعة.", es: "Dentro de los 5 días hábiles desde que tengas conocimiento. Para robo, el plazo es de 48 horas." }, keywords: { fr: ["déclarer", "sinistre", "délai", "jours"], en: ["report", "claim", "deadline", "days"], ar: ["إبلاغ", "مطالبة", "مهلة", "أيام"], es: ["denunciar", "siniestro", "plazo", "días"] } },
  { q: { fr: "Comment déclarer un sinistre ?", en: "How to report a claim?", ar: "كيفية الإبلاغ عن مطالبة؟", es: "¿Cómo denunciar un siniestro?" }, a: { fr: "Vous pouvez cliquer sur devis, utiliser les contacts directs ou WhatsApp et nous écrire sur info@cpa.ma", en: "Contact us at 0667558436 or send an email to info@cpa.ma with the details and supporting documents.", ar: "اتصل بنا على 0667558436 أو أرسل بريدًا إلكترونيًا إلى info@cpa.ma مع التفاصيل والمستندات الداعمة.", es: "Contáctanos al 0667558436 o envía un correo electrónico a info@cpa.ma con los detalles y documentos de respaldo." }, keywords: { fr: ["comment", "déclarer", "procédure"], en: ["how", "report", "procedure"], ar: ["كيف", "إبلاغ", "إجراء"], es: ["cómo", "denunciar", "procedimiento"] } },

  // CPA
  { q: {
    "fr": "Qui sommes-nous ?",
    "en": "Who are we?",
    "ar": "من نحن؟",
    "es": "¿Quiénes somos?"
  }, a: { fr: "Nous sommes CPA (Conseil et Placement d'Assurances), un cabinet de courtage en assurances spécialisé pour vous accompagner, vous particuliers et entreprises, depuis 1957 à Casablanca.", en: "We are CPA (Conseil et Placement d'Assurances), an insurance brokerage firm specialized in supporting you, individuals and businesses, since 1957 in Casablanca.", ar: "نحن CPA (Conseil et Placement d'Assurances)، مكتب وساطة تأمين متخصص في مرافقتك، أنت الأفراد والشركات، منذ 1957 في الدار البيضاء.", es: "Somos CPA (Conseil et Placement d'Assurances), una correduría de seguros especializada en apoyarte, a ti particulares y empresas, desde 1957 en Casablanca." }, keywords: { fr: ["qui", "sommes", "cpa", "présentation"], en: ["who", "are", "cpa", "presentation"], ar: ["من", "نحن", "cpa", "تعريف"], es: ["quién", "somos", "cpa", "presentación"] } },
  { q: { fr: "Quelles assurances proposez-vous ?", en: "What insurance do you offer?", ar: "ما هي التأمينات التي تقدمونها؟", es: "¿Qué seguros ofrecen?" }, a: { fr: "Je vous propose : Auto, Habitation, Santé, Prévoyance, Épargne, Accidents de Travail, Responsabilité Civile, Construction, Transport Maritime, Cyber Risques, Flotte Auto, Trottinette Électrique et Animaux de Compagnie.", en: "I offer you: Auto, Home, Health, Foresight, Savings, Work Accidents, Civil Liability, Construction, Maritime Transport, Cyber Risks, Auto Fleet, Electric Scooter and Pet Insurance.", ar: "أقدم لك: السيارات، المنزل، الصحة، التأمين التكميلي، الادخار، حوادث العمل، المسؤولية المدنية، البناء، النقل البحري، مخاطر الإنترنت، أسطول السيارات، السكوتر الكهربائي وتأمين الحيوانات الأليفة.", es: "Te ofrezco: Auto, Hogar, Salud, Previsión, Ahorro, Accidentes Laborales, Responsabilidad Civil, Construcción, Transporte Marítimo, Riesgos Cibernéticos, Flota de Autos, Patinete Eléctrico y Seguro de Mascotas." }, keywords: { fr: ["proposez", "services", "offres", "produits", "assurances"], en: ["offer", "services", "products", "insurance"], ar: ["نقدم", "خدمات", "عروض", "منتجات", "تأمين"], es: ["ofrecen", "servicios", "ofertas", "productos", "seguros"] } },
  { q: { fr: "Pourquoi passer par un courtier ?", en: "Why use a broker?", ar: "لماذا الاستفادة من وسيط؟", es: "¿Por qué usar un corredor?" }, a: { fr: "Pour comparer les offres de plusieurs compagnies, négocier les meilleurs tarifs pour vous, bénéficier d'un accompagnement personnalisé et d'un suivi des sinistres.", en: "To compare offers from several companies, negotiate the best rates for you, benefit from personalized support and claim follow-up.", ar: "لمقارنة عروض عدة شركات، التفاوض على أفضل الأسعار لك، الاستفادة من الدعم الشخصي ومتابعة المطالبات.", es: "Para comparar ofertas de varias compañías, negociar las mejores tarifas para ti, beneficiarte de acompañamiento personalizado y seguimiento de siniestros." }, keywords: { fr: ["pourquoi", "courtier", "avantage", "intérêt"], en: ["why", "broker", "advantage", "benefit"], ar: ["لماذا", "وسيط", "ميزة", "فائدة"], es: ["por qué", "corredor", "ventaja", "interés"] } },
  { q: { fr: "Quels sont vos horaires ?", en: "What are your hours?", ar: "ما هي ساعات عملكم؟", es: "¿Cuáles son sus horarios?" }, a: { fr: "Nous sommes à votre disposition du lundi au vendredi, de 8h30 à 18h00.", en: "We are at your disposal Monday to Friday, from 8:30 AM to 6:00 PM.", ar: "نحن في خدمتك من الاثنين إلى الجمعة، من 8:30 إلى 18:00.", es: "Estamos a tu disposición de lunes a viernes, de 8:30 a 18:00." }, keywords: { fr: ["horaires", "heures", "ouverture", "disponible"], en: ["hours", "opening", "available"], ar: ["ساعات", "فتح", "متاح"], es: ["horarios", "apertura", "disponible"] } },
  { q: { fr: "Quelles sont vos valeurs ?", en: "What are your values?", ar: "ما هي قيمكم؟", es: "¿Cuáles son sus valores?" }, a: { fr: "La proximité, l'innovation, la performance et l'éthique. Ce sont les valeurs qui nous guident depuis 1957 pour vous offrir un accompagnement humain, des solutions modernes, les meilleures garanties au meilleur rapport qualité-prix et des conseils transparents.", en: "Proximity, innovation, performance and ethics. These are the values that have guided us since 1957 to offer you human support, modern solutions, the best coverage at the best value and transparent advice.", ar: "القرب، الابتكار، الأداء والأخلاق. هذه هي القيم التي ترشدنا منذ 1957 لنقدم لك مرافقة إنسانية، حلولاً عصرية، أفضل الضمانات بأفضل نسبة جودة سعر ونصائح شفافة.", es: "La proximidad, la innovación, el rendimiento y la ética. Estos son los valores que nos guían desde 1957 para ofrecerte acompañamiento humano, soluciones modernas, las mejores garantías al mejor rapport calidad-precio y consejos transparentes." }, keywords: { fr: ["valeurs", "engagement", "philosophie"], en: ["values", "commitment", "philosophy"], ar: ["قيم", "التزام", "فلسفة"], es: ["valores", "compromiso", "filosofía"] } },
  { q: { fr: "Comment obtenir un devis ?", en: "How to get a quote?", ar: "كيفية الحصول على عرض أسعار؟", es: "¿Cómo obtener un presupuesto?" }, a: { fr: "Appelez-nous au 0667558436, envoyez un email à info@cpa.ma, ou remplissez le formulaire de contact sur notre site. Vous pouvez aussi utiliser notre estimateur de devis en ligne !", en: "Call us at 0667558436, send an email to info@cpa.ma, or fill out the contact form on our website. You can also use our online quote estimator!", ar: "اتصل بنا على 0667558436 أو أرسل بريدًا إلكترونيًا إلى info@cpa.ma أو املأ نموذج الاتصال على موقعنا. يمكنك أيضًا استخدام أداة تقدير العرض عبر الإنترنت!", es: "Llámanos al 0667558436, envía un correo a info@cpa.ma, o completa el formulario de contacto en nuestro sitio. ¡También puedes usar nuestro estimador de presupuesto en línea!" }, keywords: { fr: ["devis", "estimation", "tarif", "prix"], en: ["quote", "estimate", "rate", "price"], ar: ["عرض أسعار", "تقدير", "رسوم", "سعر"], es: ["presupuesto", "estimación", "tarifa", "precio"] } },
    { q: { fr: "Où êtes-vous situés ?", en: "Where are you located?", ar: "أين موقعكم؟", es: "¿Dónde están ubicados?" }, a: { fr: "Notre siège est à Casablanca, Maroc. Adresse : Casablanca, Maroc. Téléphone : 0667558436.", en: "Our headquarters is in Casablanca, Morocco. Address: Casablanca, Morocco. Phone: 0667558436.", ar: "مقرنا في الدار البيضاء، المغرب. العنوان: الدار البيضاء، المغرب. الهاتف: 0667558436.", es: "Nuestra sede está en Casablanca, Marruecos. Dirección: Casablanca, Marruecos. Teléfono: 0667558436." }, keywords: { fr: ["adresse", "situés", "localisation", "bureau", "siège"], en: ["address", "located", "location", "office", "headquarters"], ar: ["عنوان", "موقع", "مكتب", "مقر"], es: ["dirección", "ubicados", "ubicación", "oficina", "sede"] } },
    { q: { fr: "Qui est CPA et comment pouvez-vous m'aider ?", en: "Who is CPA and how can you help me?", ar: "من هي CPA وكيف يمكنكم مساعدتي؟", es: "¿Quién es CPA y cómo pueden ayudarme?" }, a: { fr: "CPA – Conseil et Placement d’Assurances accompagne particuliers et entreprises depuis 1957 avec des solutions d’assurance adaptées et un accompagnement personnalisé.", en: "CPA – Conseil et Placement d’Assurances accompanies individuals and businesses since 1957 with tailored insurance solutions and personalized support.", ar: "CPA – Conseil et Placement d’Assurances ترافق الأفراد والشركات منذ 1957 مع حلول تأمينية مخصصة ودعم شخصي.", es: "CPA – Conseil et Placement d’Assurances acompaña a particulares y empresas desde 1957 con soluciones de seguro adaptadas y un acompañamiento personalizado." }, keywords: { fr: ["cpa", "qui", "aide", "accompagne", "particuliers", "entreprises"], en: ["cpa", "who", "help", "accompanies", "individuals", "businesses"], ar: ["cpa", "من", "مساعدة", "ترافق", "أفراد", "شركات"], es: ["cpa", "quién", "ayuda", "acompaña", "particulares", "empresas"] } },

  // Entreprises / Business
  { q: { fr: "Proposez-vous des assurances pour les entreprises ?", en: "Do you offer insurance for businesses?", ar: "هل تقدمون التأمين للشركات؟", es: "¿Ofrecen seguros para empresas?" }, a: { fr: "Oui, je vous propose une gamme complète : Responsabilité Civile, Accidents de Travail, Risques Techniques, Dommage aux Biens, Perte d'Exploitation, Transport, Construction, Cyber Risques et Épargne Vie.", en: "Yes, I offer you a complete range: Civil Liability, Work Accidents, Technical Risks, Property Damage, Business Interruption, Transport, Construction, Cyber Risks and Life Savings.", ar: "نعم، أقدم لك مجموعة كاملة: المسؤولية المدنية، حوادث العمل، المخاطر التقنية، أضرار الممتلكات، فقدان الأرباح، النقل، البناء، مخاطر الإنترنت والادخار على الحياة.", es: "Sí, te ofrezco una gama completa: Responsabilidad Civil, Accidentes Laborales, Riesgos Técnicos, Daños a Bienes, Pérdida de Explotación, Transporte, Construcción, Riesgos Cibernéticos y Ahorro Vida." }, keywords: { fr: ["entreprise", "professionnel", "société", "commercial"], en: ["business", "professional", "company", "commercial"], ar: ["شركة", "محترف", "مؤسسة", "تجاري"], es: ["empresa", "profesional", "sociedad", "comercial"] } },
  { q: { fr: "Qu'est-ce que l'assurance responsabilité civile ?", en: "What is civil liability insurance?", ar: "ما هو تأمين المسؤولية المدنية؟", es: "¿Qué es el seguro de responsabilidad civil?" }, a: { fr: "Elle couvre les dommages (corporels, matériels, immatériels) que vous ou votre entreprise pourriez causer à des tiers dans le cadre de votre activité.", en: "It covers damages (physical, material, intangible) that you or your company could cause to third parties in the course of your activity.", ar: "يغطي الأضرار (الجسدية، المادية، غير المادية) التي قد تسببها أنت أو شركتك لأطراف ثالثة في إطار نشاطك.", es: "Cubre los daños (corporales, materiales, inmateriales) que tú o tu empresa puedan causar a terceros en el marco de tu actividad." }, keywords: { fr: ["responsabilité", "civile", "dommages", "tiers"], en: ["liability", "civil", "damages", "third parties"], ar: ["مسؤولية", "مدنية", "أضرار", "أطراف ثالثة"], es: ["responsabilidad", "civil", "daños", "terceros"] } },
  { q: { fr: "Qu'est-ce que l'assurance accidents de travail ?", en: "What is work accident insurance?", ar: "ما هو تأمين حوادث العمل؟", es: "¿Qué es el seguro de accidentes laborales?" }, a: { fr: "C'est une assurance obligatoire qui protège vos employés en cas d'accident survenu sur le lieu de travail ou durant le trajet.", en: "It's mandatory insurance that protects your employees in case of an accident occurring at the workplace or during the commute.", ar: "إنه تأمين إلزامي يحمي موظفيك في حالة وقوع حادث في مكان العمل أو خلال التنقل.", es: "Es un seguro obligatorio que protege a tus empleados en caso de accidente ocurrido en el lugar de trabajo o durante el trayecto." }, keywords: { fr: ["accidents", "travail", "employés", "obligatoire"], en: ["accidents", "work", "employees", "mandatory"], ar: ["حوادث", "عمل", "موظفين", "إلزامي"], es: ["accidentes", "trabajo", "empleados", "obligatorio"] } },
  { q: { fr: "Qu'est-ce que l'assurance cyber risques ?", en: "What is cyber risk insurance?", ar: "ما هو تأمين مخاطر الإنترنت؟", es: "¿Qué es el seguro de riesgos cibernéticos?" }, a: { fr: "Elle protège votre entreprise contre les cyberattaques : piratage, vol de données, ransomware, interruption d'activité liée au numérique.", en: "It protects your business against cyberattacks: hacking, data theft, ransomware, digital activity interruption.", ar: "تحمي شركتك من الهجمات الإلكترونية: القرصنة، سرقة البيانات، برامج الفدية، انقطاع النشاط الرقمي.", es: "Protege tu empresa contra ciberataques: piratería, robo de datos, ransomware, interrupción de actividad digital." }, keywords: { fr: ["cyber", "numérique", "piratage", "données", "hacking"], en: ["cyber", "digital", "hacking", "data", "ransomware"], ar: ["سيبراني", "رقمي", "قرصنة", "بيانات", "اختراق"], es: ["ciber", "digital", "hacking", "datos", "ransomware"] } },

  // Nouveautés / New Products
  { q: { fr: "Qu'est-ce que l'assurance trottinette électrique ?", en: "What is electric scooter insurance?", ar: "ما هو تأمين السكوتر الكهربائي؟", es: "¿Qué es el seguro de patinete eléctrico?" }, a: { fr: "C'est une assurance spécialement conçue pour les utilisateurs de trottinettes électriques. Elle couvre votre responsabilité civile, le vol, les dommages matériels et la protection du conducteur.", en: "It's insurance specially designed for electric scooter users. It covers your civil liability, theft, material damage and driver protection.", ar: "إنه تأمين مصمم خصيصًا لمستخدمي السكوتر الكهربائي. يغطي مسؤوليتك المدنية والسرقة والأضرار المادية وحماية السائق.", es: "Es un seguro especialmente diseñado para usuarios de patinetes eléctricos. Cubre tu responsabilidad civil, robo, daños materiales y protección del conductor." }, keywords: { fr: ["trottinette", "électrique", "mobilité", "edpm"], en: ["scooter", "electric", "mobility", "edpm"], ar: ["سكوتر", "كهربائي", "تنقل", "edpm"], es: ["patinete", "eléctrico", "movilidad", "edpm"] } },
  { q: { fr: "Qu'est-ce que l'assurance animaux de compagnie ?", en: "What is pet insurance?", ar: "ما هو تأمين الحيوانات الأليفة؟", es: "¿Qué es el seguro de mascotas?" }, a: { fr: "Elle couvre les frais vétérinaires de vos animaux (chien, chat) en cas de maladie ou d'accident : consultations, chirurgie, hospitalisation et médicaments.", en: "It covers veterinary expenses for your pets (dog, cat) in case of illness or accident: consultations, surgery, hospitalization and medications.", ar: "تغطي النفقات البيطرية لحيواناتك الأليفة (كلب، قطة) في حالة المرض أو الحادث: الاستشارات، الجراحة، المستشفى والأدوية.", es: "Cubre los gastos veterinarios de tus mascotas (perro, gato) en caso de enfermedad o accidente: consultas, cirugía, hospitalización y medicamentos." }, keywords: { fr: ["animaux", "compagnie", "chien", "chat", "vétérinaire", "animal"], en: ["pets", "companion", "dog", "cat", "veterinary", "animal"], ar: ["حيوانات", "رفقة", "كلب", "قطة", "بيطري", "حيوان"], es: ["mascotas", "compañía", "perro", "gato", "veterinario", "animal"] } },
  
  // Paiement / Payment
  { q: { fr: "Peut-on résilier un contrat d'assurance ?", en: "Can you cancel an insurance contract?", ar: "هل يمكن إلغاء عقد التأمين؟", es: "¿Se puede rescindir un contrato de seguro?" }, a: { fr: "Oui, vous pouvez résilier votre contrat à l'échéance annuelle avec un préavis (généralement 2 mois). Des cas de résiliation anticipée existent aussi.", en: "Yes, you can cancel your contract at the annual expiry with notice (usually 2 months). Early cancellation cases also exist.", ar: "نعم، يمكنك إلغاء عقدك عند انتهاء الصلاحية السنوية مع إشعار (عادةً شهرين). توجد أيضًا حالات إلغاء مبكر.", es: "Sí, puedes rescindir tu contrato en el vencimiento anual con preaviso (generalmente 2 meses). También existen casos de rescisión anticipada." }, keywords: { fr: ["résilier", "résiliation", "annuler", "arrêter"], en: ["cancel", "termination", "annul", "stop"], ar: ["إلغاء", "فسخ", "إبطال", "توقيف"], es: ["rescindir", "rescisión", "anular", "parar"] } },
  { q: { fr: "Comment renouveler mon contrat ?", en: "How to renew my contract?", ar: "كيفية تجديد عقدي؟", es: "¿Cómo renovar mi contrato?" }, a: { fr: "Votre contrat se renouvelle automatiquement à l'échéance. Notre équipe vous contacte avant pour ajuster les garanties si nécessaire.", en: "Your contract automatically renews at expiry. Our team contacts you before to adjust coverage if necessary.", ar: "يتم تجديد عقدك تلقائيًا عند انتهاء الصلاحية. يتواصل فريقنا معك قبل ذلك لتعديل التغطيات إذا لزم الأمر.", es: "Tu contrato se renueva automáticamente al vencimiento. Nuestro equipo te contacta antes para ajustar las coberturas si es necesario." }, keywords: { fr: ["renouveler", "renouvellement", "échéance"], en: ["renew", "renewal", "expiry"], ar: ["تجديد", "تجديد", "انتهاء"], es: ["renovar", "renovación", "vencimiento"] } },
  
  // Partenaires / Partners
  { q: { fr: "Avec quelles compagnies travaillez-vous ?", en: "Which companies do you work with?", ar: "مع أي شركات تعملون؟", es: "¿Con qué compañías trabajan?" }, a: { fr: "Nous travaillons avec les meilleures compagnies du marché : Allianz, AXA, Wafa Assurance, RMA, Sanlam, AtlantaSanad, La Marocaine Vie, et bien d'autres.", en: "We work with the best companies in the market: Allianz, AXA, Wafa Assurance, RMA, Sanlam, AtlantaSanad, La Marocaine Vie, and many more.", ar: "نعمل مع أفضل الشركات في السوق: أليانز، AXA، وفاء للتأمين، RMA، سانلام، أتلانتا صد، الشركة المغربية للحياة، وغيرها الكثير.", es: "Trabajamos con las mejores compañías del mercado: Allianz, AXA, Wafa Assurance, RMA, Sanlam, AtlantaSanad, La Marocaine Vie, y muchas más." }, keywords: { fr: ["compagnies", "partenaires", "allianz", "axa", "wafa"], en: ["companies", "partners", "allianz", "axa", "wafa"], ar: ["شركات", "شركاء", "أليانز", "axa", "وفاء"], es: ["compañías", "socios", "allianz", "axa", "wafa"] } },
];

// Welcome message for new visitors
const getWelcomeMessage = (lang: string): string => {
  const messages = {
    fr: "👋 Bonjour ! Je suis l'assistant CPA. Comment puis-je vous aider ?",
    en: "👋 Hello! I'm the CPA assistant. How can I help you?",
    ar: "👋 مرحباً! أنا مساعد CPA. كيف يمكنني مساعدتك؟",
    es: "👋 ¡Hola! Soy el asistente de CPA. ¿Cómo puedo ayudarte?"
  };
  return messages[lang as keyof typeof messages] || messages.fr;
};

type Message = { role: "bot" | "user"; text: string; departmentId?: string | null };

const getContextualSuggestions = (lastMessage: string, lang: string): string[] => {
  const msg = lastMessage.toLowerCase();
  
  if (msg.includes("auto") || msg.includes("voiture") || msg.includes("véhicule") || msg.includes("car") || msg.includes("vehicule") || msg.includes("coche") || msg.includes("سيارة") || msg.includes("automobile")) {
    return [
      lang === "fr" ? "Quelles sont les garanties auto ?" : 
      lang === "en" ? "What are auto coverage options?" :
      lang === "ar" ? "ما هي تغطيات السيارات؟" :
      "¿Cuáles son las coberturas de auto?",
      lang === "fr" ? "Combien coûte l'assurance auto ?" :
      lang === "en" ? "How much does auto insurance cost?" :
      lang === "ar" ? "كم تكلفة التأمين على السيارات؟" :
      "¿Cuánto cuesta el seguro de auto?",
      lang === "fr" ? "Comment assurer ma flotte ?" :
      lang === "en" ? "How to insure my fleet?" :
      lang === "ar" ? "كيفية تأمين أسطولي؟" :
      "¿Cómo asegurar mi flota?",
      lang === "fr" ? "Comment déclarer un sinistre ?" :
      lang === "en" ? "How to report a claim?" :
      lang === "ar" ? "كيفية الإبلاغ عن مطالبة؟" :
      "¿Cómo denunciar un siniestro?"
    ];
  }
  if (msg.includes("santé") || msg.includes("médical") || msg.includes("maladie") || msg.includes("health") || msg.includes("médico") || msg.includes("enfermedad") || msg.includes("صحة") || msg.includes("طبي")) {
    return [
      lang === "fr" ? "Comment fonctionne l'assurance santé ?" :
      lang === "en" ? "How does health insurance work?" :
      lang === "ar" ? "كيف يعمل التأمين الصحي؟" :
      "¿Cómo funciona el seguro de salud?",
      lang === "fr" ? "Proposez-vous une assurance santé groupe ?" :
      lang === "en" ? "Do you offer group health insurance?" :
      lang === "ar" ? "هل تقدمون تأمين صحي جماعي؟" :
      "¿Ofrecen seguro de salud grupal?",
      lang === "fr" ? "Comment obtenir un devis ?" :
      lang === "en" ? "How to get a quote?" :
      lang === "ar" ? "كيفية الحصول على عرض أسعار؟" :
      "¿Cómo obtener un presupuesto?"
    ];
  }
  if (msg.includes("entreprise") || msg.includes("professionnel") || msg.includes("société") || msg.includes("business") || msg.includes("compañía") || msg.includes("empresa") || msg.includes("شركة") || msg.includes("مؤسسة")) {
    return [
      lang === "fr" ? "Assurances pour les entreprises ?" :
      lang === "en" ? "Insurance for businesses?" :
      lang === "ar" ? "تأمين للشركات؟" :
      "¿Seguros para empresas?",
      lang === "fr" ? "Assurance cyber risques ?" :
      lang === "en" ? "Cyber risk insurance?" :
      lang === "ar" ? "تأمين مخاطر الإنترنت؟" :
      "¿Seguro de riesgos cibernéticos?",
      lang === "fr" ? "Assurance accidents de travail ?" :
      lang === "en" ? "Work accident insurance?" :
      lang === "ar" ? "تأمين حوادث العمل؟" :
      "¿Seguro de accidentes laborales?",
      lang === "fr" ? "Comment obtenir un devis ?" :
      lang === "en" ? "How to get a quote?" :
      lang === "ar" ? "كيفية الحصول على عرض أسعار؟" :
      "¿Cómo obtener un presupuesto?"
    ];
  }
  if (msg.includes("sinistre") || msg.includes("accident") || msg.includes("déclar") || msg.includes("claim") || msg.includes("siniestro") || msg.includes("accidente") || msg.includes("مطالبة") || msg.includes("حادث")) {
    return [
      lang === "fr" ? "Quand déclarer un sinistre ?" :
      lang === "en" ? "When to report a claim?" :
      lang === "ar" ? "متى يجب الإبلاغ عن مطالبة؟" :
      "¿Cuándo denunciar un siniestro?",
      lang === "fr" ? "Comment déclarer un sinistre ?" :
      lang === "en" ? "How to report a claim?" :
      lang === "ar" ? "كيفية الإبلاغ عن مطالبة؟" :
      "¿Cómo denunciar un siniestro?",
      lang === "fr" ? "Qu'est-ce qu'une franchise ?" :
      lang === "en" ? "What is a deductible?" :
      lang === "ar" ? "ما هي الفرانشيز؟" :
      "¿Qué es un deducible?"
    ];
  }
  if (msg.includes("trottinette") || msg.includes("animaux") || msg.includes("nouveau") || msg.includes("scooter") || msg.includes("patinete") || msg.includes("pets") || msg.includes("mascota") || msg.includes("سكوتر") || msg.includes("حيوانات")) {
    return [
      lang === "fr" ? "Assurance trottinette électrique ?" :
      lang === "en" ? "Electric scooter insurance?" :
      lang === "ar" ? "تأمين السكوتر الكهربائي؟" :
      "¿Seguro de patinete eléctrico?",
      lang === "fr" ? "Assurance animaux de compagnie ?" :
      lang === "en" ? "Pet insurance?" :
      lang === "ar" ? "تأمين الحيوانات الأليفة؟" :
      "¿Seguro de mascotas?",
      lang === "fr" ? "Quelles assurances proposez-vous ?" :
      lang === "en" ? "What insurance do you offer?" :
      lang === "ar" ? "ما هي التأمينات التي تقدمونها؟" :
      "¿Qué seguros ofrecen?"
    ];
  }
  if (msg.includes("prix") || msg.includes("devis") || msg.includes("tarif") || msg.includes("coût") || msg.includes("price") || msg.includes("quote") || msg.includes("presupuesto") || msg.includes("tarifa") || msg.includes("سعر") || msg.includes("عرض")) {
    return [
      lang === "fr" ? "Comment obtenir un devis ?" :
      lang === "en" ? "How to get a quote?" :
      lang === "ar" ? "كيفية الحصول على عرض أسعار؟" :
      "¿Cómo obtener un presupuesto?",
      lang === "fr" ? "Quelles assurances proposez-vous ?" :
      lang === "en" ? "What insurance do you offer?" :
      lang === "ar" ? "ما هي التأمينات التي تقدمونها؟" :
      "¿Qué seguros ofrecen?"
    ];
  }
  
  // Default suggestions - welcome the visitor with personalized suggestions
  return [
    lang === "fr" ? "Quelles assurances proposez-vous ?" :
    lang === "en" ? "What insurance do you offer?" :
    lang === "ar" ? "ما هي التأمينات التي تقدمونها؟" :
    "¿Qué seguros ofrecen?",
    
    lang === "fr" ? "Comment obtenir un devis personnalisé ?" :
    lang === "en" ? "How to get a personalized quote?" :
    lang === "ar" ? "كيفية الحصول على عرض سعر مخصص؟" :
    "¿Cómo obtener un presupuesto personalizado?",
    
    lang === "fr" ? "Qui est CPA et comment pouvez-vous m'aider ?" :
    lang === "en" ? "Who is CPA and how can you help me?" :
    lang === "ar" ? "من هي CPA وكيف يمكنكم مساعدتي؟" :
    "¿Quién es CPA y cómo pueden ayudarme?",
    
    lang === "fr" ? "Quels sont vos horaires d'ouverture ?" :
    lang === "en" ? "What are your opening hours?" :
    lang === "ar" ? "ما هي ساعات عملكم؟" :
    "¿Cuáles son sus horarios de apertura?"
  ];
};

interface ChatbotProps {
  pageContext?: PageContext;
}

const Chatbot: React.FC<ChatbotProps> = ({ pageContext = 'home' }) => {
  const { t, lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: getWelcomeMessage(lang) }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  // Mode IA actif : les questions suggérées ne s'affichent qu'en mode FAQ statique (IA indisponible)
  const [aiActive, setAiActive] = useState(() => isGeminiEnabled && getAiCount() < MAX_AI_MESSAGES_PER_SESSION);
  // Dernier service CPA détecté dans la conversation (sert au formulaire)
  const [lastDepartmentId, setLastDepartmentId] = useState<string | null>(null);
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>([]);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [showAds, setShowAds] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Get page-specific ads or fallback to home ads
  const ads = pageSpecificAds[pageContext] || pageSpecificAds.home;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initialize suggestions with welcome suggestions
  useEffect(() => {
    setCurrentSuggestions(getContextualSuggestions("", lang));
  }, [lang]);

  // Rotate through page-specific ads - ONE ad at a time, 5 seconds display, 20 seconds pause
  useEffect(() => {
    setShowAds(true);
    const rotateTimer = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % ads.length);
    }, 25000);
    return () => clearInterval(rotateTimer);
  }, [ads.length]);

  const findAnswer = (question: string): string => {
    const q = question.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    let bestMatch: { faq: FAQItem; score: number } | null = null;
    
    for (const faq of faqData) {
      let score = 0;
      const keywords = faq.keywords[lang as keyof typeof faq.keywords] || faq.keywords.fr;
      for (const keyword of keywords) {
        const normalizedKeyword = keyword.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (q.includes(normalizedKeyword)) {
          score += normalizedKeyword.length;
        }
      }
      if (score > 0 && (!bestMatch || score > bestMatch.score)) {
        bestMatch = { faq, score };
      }
    }
    
    if (bestMatch) {
      return bestMatch.faq.a[lang as keyof typeof bestMatch.faq.a] || bestMatch.faq.a.fr;
    }
    
    const noAnswerMessages = {
      fr: "Je suis désolé, je n'ai pas encore de réponse à cette question. Souhaitez-vous que je vous mette en contact avec un conseiller CPA ? Vous pouvez nous appeler au 0667558436 ou nous écrire à info@cpa.ma.",
      en: "I'm sorry, I don't have an answer to that question yet. Would you like me to put you in touch with a CPA advisor? You can call us at 0667558436 or email us at info@cpa.ma.",
      ar: "عذراً، ليس لدي إجابة على هذا السؤال بعد. هل تريد مني أن أربطك بمستشار CPA؟ يمكنك الاتصال بنا على 0667558436 أو مراسلتنا على info@cpa.ma.",
      es: "Lo siento, todavía no tengo respuesta a esa pregunta. ¿Te gustaría que te ponga en contacto con un asesor de CPA? Puedes llamarnos al 0667558436 o escribirnos a info@cpa.ma."
    };
    return noAnswerMessages[lang as keyof typeof noAnswerMessages] || noAnswerMessages.fr;
  };

  const handleSend = async (text?: string) => {
    const msg = (text || input.trim()).slice(0, MAX_INPUT_LENGTH);
    if (!msg || isTyping) return;
    const history: Message[] = [...messages, { role: "user", text: msg }];
    setMessages(history);
    setInput("");
    setIsTyping(true);

    let answer: string;
    let departmentId: string | null = null;
    if (isGeminiEnabled && getAiCount() < MAX_AI_MESSAGES_PER_SESSION) {
      try {
        ({ text: answer, departmentId } = await askGemini(history, lang));
        incrementAiCount();
        setAiActive(getAiCount() < MAX_AI_MESSAGES_PER_SESSION);
      } catch (err) {
        // Quota épuisé, réseau, clé invalide... : on retombe sur la FAQ statique
        console.warn("[Chatbot] Gemini indisponible, réponse FAQ utilisée", err);
        answer = findAnswer(msg);
        setAiActive(false);
      }
    } else {
      await new Promise((resolve) => setTimeout(resolve, 600));
      answer = findAnswer(msg);
      setAiActive(false);
    }

    setMessages((prev) => [...prev, { role: "bot", text: answer, departmentId }]);
    if (departmentId) setLastDepartmentId(departmentId);
    setCurrentSuggestions(getContextualSuggestions(msg, lang));
    setIsTyping(false);

    const questionCount = history.filter((m) => m.role === "user").length;
    if (isLeadCaptureEnabled && questionCount >= QUESTIONS_BEFORE_LEAD_FORM && !isLeadFormClosed()) {
      setShowLeadForm(true);
    }
  };

  const handleLeadDone = () => {
    closeLeadForm("submitted");
    setShowLeadForm(false);
    setMessages((prev) => [...prev, { role: "bot", text: leadThanksMessage(lang) }]);
  };

  const handleLeadDismiss = () => {
    closeLeadForm("dismissed");
    setShowLeadForm(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* WhatsApp Button */}
      <motion.button
        onClick={openWhatsApp}
        className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform hover:shadow-2xl"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        title={t("chat_whatsapp") || "Contacter via WhatsApp"}
      >
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </motion.button>

      {/* Chatbot Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 0 : 1 }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[550px] max-h-[calc(100vh-6rem)] bg-white rounded-2xl border border-gray-200 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Promotional Banner */}
            <PromoBanner autoRotate={true} rotationInterval={5000} />
            
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm flex items-center gap-1">
                    CPA Assistant
                    <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                  </h4>
                  <p className="text-white/80 text-xs flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    {t("chat_online") || "En ligne"}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-white/70 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-br from-gray-50 to-gray-100">
              {messages.map((msg, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-md ${
                    msg.role === "bot" 
                      ? "bg-gradient-to-br from-blue-500 to-indigo-500" 
                      : "bg-gradient-to-br from-gray-600 to-gray-700"
                  }`}>
                    {msg.role === "bot" 
                      ? <Bot className="w-4 h-4 text-white" /> 
                      : <User className="w-4 h-4 text-white" />
                    }
                  </div>
                  <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm whitespace-pre-line ${
                    msg.role === "bot" 
                      ? "bg-white text-gray-800 rounded-bl-sm border border-gray-200" 
                      : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-sm"
                  }`}>
                    {msg.text}
                    {msg.role === "bot" && msg.departmentId && (
                      <DepartmentContactCard departmentId={msg.departmentId} />
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Formulaire de coordonnées (après 3 questions) */}
              {showLeadForm && !isTyping && (
                <LeadForm
                  departmentId={lastDepartmentId}
                  questions={messages.filter((m) => m.role === "user").map((m) => m.text)}
                  page={pageContext}
                  onDone={handleLeadDone}
                  onDismiss={handleLeadDismiss}
                />
              )}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-2" aria-live="polite">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-md bg-gradient-to-br from-blue-500 to-indigo-500">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="rounded-2xl rounded-bl-sm px-4 py-3 bg-white border border-gray-200 shadow-sm flex gap-1 items-center">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                        style={{ animationDelay: `${d * 150}ms` }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Suggestions */}
              {!isTyping && !aiActive && currentSuggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-2 pt-3"
                >
                  {currentSuggestions.map((s, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => handleSend(s)}
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      className="text-xs px-3 py-1.5 rounded-full border border-blue-300 bg-white text-blue-600 hover:bg-blue-50 hover:border-blue-400 transition-all shadow-sm"
                    >
                      {s}
                    </motion.button>
                  ))}
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200 bg-white shrink-0">
              <div className="flex gap-2 items-end">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  maxLength={MAX_INPUT_LENGTH}
                  placeholder={lang === "fr" ? "Écrivez votre message..." : lang === "en" ? "Type your message..." : lang === "ar" ? "اكتب رسالتك..." : "Escribe tu mensaje..."}
                  className="flex-1 resize-none rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all max-h-24 min-h-[40px]"
                  rows={1}
                  style={{ overflow: 'auto' }}
                />
                <motion.button
                  onClick={() => handleSend()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!input.trim() || isTyping}
                  className={`rounded-xl px-4 py-2 transition-all ${
                    input.trim() && !isTyping
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:shadow-lg" 
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
              <p className="text-[10px] text-gray-400 mt-2 text-center">
                {lang === "fr" ? "Assistant IA — n'écrivez pas d'informations confidentielles (CIN, n° de contrat, santé) dans le chat." :
                 lang === "en" ? "AI assistant — don't write confidential information (ID, policy number, health) in the chat." :
                 lang === "ar" ? "مساعد ذكي — لا تكتب معلومات سرية (البطاقة الوطنية، رقم العقد، الصحة) في المحادثة." :
                 "Asistente IA — no escriba información confidencial (DNI, n.º de póliza, salud) en el chat."}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;