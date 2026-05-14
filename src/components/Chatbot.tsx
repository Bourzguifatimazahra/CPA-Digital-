import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, MessageSquare } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import PromoBanner from "./PromoBanner";
import chatbotGif from "@/assets/chatbot.gif";

const WHATSAPP_NUMBER = "0667558436";
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
    { icon: "👨‍👩‍👧‍👦", title: "Famille", titleEn: "Family", titleAr: "عائلة", titleEs: "Familia", text: "Covers all", textEn: "Covers all", textAr: "تغطي الجميع", textEs: "Cubre a todos" },
    { icon: "🏢", title: "Groupe Entreprise", titleEn: "Group Business", titleAr: "مجموعة شركات", titleEs: "Grupo Empresa", text: "Tarifs preferentiels", textEn: "Preferential rates", textAr: "أسعار تفضيلية", textEs: "Tarifas preferenciales" },
    { icon: "💊", title: "Pharmacie", titleEn: "Pharmacy", titleAr: "صيدلية", titleEs: "Farmacia", text: "Remboursement med", textEn: "Reimbursement med", textAr: "تعويض طبي", textEs: "Reembolso médico" },
    { icon: "🚑", title: "Hospitalisation", titleEn: "Hospitalization", titleAr: "مستشفى", titleEs: "Hospitalización", text: "Frais couverts", textEn: "Expenses covered", textAr: "نفقات مشمولة", textEs: "Gastos cubiertos" },
  ],
  epargne: [
    { icon: "💰", title: "Épargne Vie", titleEn: "Life Savings", titleAr: "ادخار الحياة", titleEs: "Ahorro Vida", text: "Fiscalité avantageuse", textEn: "Tax advantages", textAr: "مزايا ضريبية", textEs: "Ventajas fiscales" },
    { icon: "📈", title: "Rendement", titleEn: "Returns", titleAr: "عائد", titleEs: "Rendimiento", text: "Croissance", textEn: "Growth", textAr: "نمو", textEs: "Crecimiento" },
    { icon: "🛡️", title: "Capital", titleEn: "Capital", titleAr: "رأس المال", titleEs: "Capital", text: "Garantie", textEn: "Guaranteed", textAr: "مضمون", textEs: "Garantizado" },
    { icon: "📅", title: "Durée Flexible", titleEn: "Flexible Duration", titleAr: "مدة مرنة", titleEs: "Duración Flexible", text: "Selon vos besoins", textEn: "As needed", textAr: "حسب احتياجاتك", textEs: "Según tus necesidades" },
    { icon: "🎁", title: "Avantages", titleEn: "Benefits", titleAr: "مزايا", titleEs: "Beneficios", text: "Multiples", textEn: "Multiple", textAr: "متعددة", textEs: "Múltiples" },
    { icon: "💎", title: "Capital Différé", titleEn: "Deferred Capital", titleAr: "رأس المال المؤجل", titleEs: "Capital Diferido", text: "Option retraite", textEn: "Retirement option", textAr: "خيار التقاعد", textEs: "Opción jubilación" },
  ],
  prevoyance: [
    { icon: "🛡️", title: "Prévoyance", titleEn: "Foresight", titleAr: "التأمين التكميلي", titleEs: "Previsión", text: "Protection famille", textEn: "Family protection", textAr: "حماية العائلة", textEs: "Protección familia" },
    { icon: "👨‍👩‍👧‍👦", title: "Garantie Décès", titleEn: "Death Benefit", titleAr: "ضمان الوفاة", titleEs: "Garantía Deceso", text: "Securité", textEn: "Security", textAr: "أمان", textEs: "Seguridad" },
    { icon: "💼", title: "PTIA", titleEn: "PTIA", titleAr: "عجز كلي", titleEs: "Invalidez Total", text: "Incapacité totale", textEn: "Total disability", textAr: "عجز كلي", textEs: "Invalidez total" },
    { icon: "🏥", title: "Frais Funéraires", titleEn: "Funeral Expenses", titleAr: "نفقات الجنازة", titleEs: "Gastos Funerarios", text: "Prise en charge", textEn: "Coverage", textAr: "تغطية", textEs: "Cobertura" },
    { icon: "💰", title: "Rente", titleEn: "Annuity", titleAr: "معاش", titleEs: "Renta", text: "Conjoint survivant", textEn: "Surviving spouse", textAr: "الزوج الباقي", textEs: "Cónyuge superviviente" },
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
    { icon: "✈️", title: "Aérien", titleEn: "Air", titleAr: "جوي", titleEs: "Aéreo", text: "Transport Aerial", textEn: "Aerial Transport", textAr: "نقل جوي", textEs: "Transporte Aéreo" },
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
    { icon: "🔧", title: "Assistance IT", titleEn: "IT Assistance", titleAr: "مساعدة تقنية", titleEs: "Asistencia IT", text: "24/7 Support", textEn: "24/7 Support", textAr: "دعم 24/7", textEs: "Soporte 24/7" },
    { icon: "📱", title: "Cybermobbing", titleEn: "Cybermobbing", titleAr: "تنمر إلكتروني", titleEs: "Ciberacoso", text: "Protection", textEn: "Protection", textAr: "حماية", textEs: "Protección" },
  ],
  flotte: [
    { icon: "🚗", title: "Flotte Auto", titleEn: "Auto Fleet", titleAr: "أسطول السيارات", titleEs: "Flota de Autos", text: "5+ véhicules", textEn: "5+ vehicles", textAr: "5+ مركبات", textEs: "5+ vehículos" },
    { icon: "💰", title: "Tarifs Groupés", titleEn: "Group Rates", titleAr: "أسعار جماعية", titleEs: "Tarifas Grupales", text: "-15% réduit", textEn: "-15% discount", textAr: "-15% خصم", textEs: "-15% descuento" },
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
    { icon: "💶", title: "Pas Cher", titleEn: "Not Expensive", titleAr: "غير مكلف", titleEs: "No Caro", text: "À partir de X DH", textEn: "From X DH", textAr: "ابتداءً من X درهم", textEs: "Desde X DH" },
    { icon: "⚡", title: "EDPM", titleEn: "EDPM", titleAr: "مركبات كهربائية", titleEs: "EDPM", text: "Tous types", textEn: "All types", textAr: "جميع الأنواع", textEs: "Todos los tipos" },
  ],
  animaux: [
    { icon: "🐾", title: "Animaux Compagnie", titleEn: "Pet Insurance", titleAr: "تأمين الحيوانات الأليفة", titleEs: "Seguro de Mascotas", text: "Chien & Chat", textEn: "Dog & Cat", textAr: "كلب وقطة", textEs: "Perro y Gato" },
    { icon: "🏥", title: "Frais Vétérinaires", titleEn: "Veterinary Expenses", titleAr: "نفقات بيطرية", titleEs: "Gastos Veterinarios", text: "Consultations", textEn: "Consultations", textAr: "استشارات", textEs: "Consultas" },
    { icon: "💊", title: "Médicaments", titleEn: "Medications", titleAr: "أدوية", titleEs: "Medicamentos", text: "Couverts", textEn: "Covered", textAr: "مشمولة", textEs: "Cubiertos" },
    { icon: "🏨", title: "Hospitalisation", titleEn: "Hospitalization", titleAr: "مستشفى", titleEs: "Hospitalización", text: "Frais couverts", textEn: "Expenses covered", textAr: "نفقات مشمولة", textEs: "Gastos cubiertos" },
    { icon: "💰", title: "Budget Maîtrisé", titleEn: "Controlled Budget", titleAr: "ميزانية متحكم فيها", titleEs: "Presupuesto Controlado", text: "Pas de surprises", textEn: "No surprises", textAr: "بدون مفاجآت", textEs: "Sin sorpresas" },
    { icon: "❤️", title: "Tranquillité", titleEn: "Peace of Mind", titleAr: "راحة البال", titleEs: "Tranquilidad", text: "Pour votre companion", textEn: "For your companion", textAr: "لرفيقك", textEs: "Para tu compañero" },
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
    { icon: "📧", title: "Contact RGPD", titleEn: "GDPR Contact", titleAr: "اتصال RGPD", titleEs: "Contacto RGPD", text: "Pour vos droits", textEn: "For your rights", textAr: "لحقوقك", textEs: "Para tus derechos" },
    { icon: "🍪", title: "Cookies", titleEn: "Cookies", titleAr: "ملفات تعريفية", titleEs: "Cookies", text: "Gestion", textEn: "Management", textAr: "إدارة", textEs: "Gestión" },
    { icon: "📝", title: "Consentement", titleEn: "Consent", titleAr: "موافقة", titleEs: "Consentimiento", text: "Transparent", textEn: "Transparent", textAr: "شفاف", textEs: "Transparente" },
    { icon: "🛡️", title: "Sécurité", titleEn: "Security", titleAr: "الأمان", titleEs: "Seguridad", text: "Données protégées", textEn: "Protected data", textAr: "بيانات محمية", textEs: "Datos protegidos" },
    { icon: "⚙️", title: "Paramètres", titleEn: "Settings", titleAr: "الإعدادات", titleEs: "Configuración", text: "Personnalisation", textEn: "Customization", textAr: "تخصيص", textEs: "Personalización" },
  ],
  'catalog': [
    { icon: "📚", title: "Catalogue", titleEn: "Catalog", titleAr: "الكتالوج", titleEs: "Catálogo", text: "PDF téléchargeable", textEn: "Downloadable PDF", textAr: "PDF قابل للتحميل", textEs: "PDF descargable" },
    { icon: "👥", title: "Particuliers", titleEn: "Individuals", titleAr: "الأفراد", titleEs: "Particulares", text: "Toutes assurances", textEn: "All insurances", textAr: "جميع التأمينات", textEs: "Todos los seguros" },
    { icon: "🏢", title: "Entreprises", titleEn: "Business", titleAr: "الشركات", titleEs: "Empresas", text: "Risques pros", textEn: "Business risks", textAr: "المخاطر المهنية", textEs: "Riesgos profesionales" },
    { icon: "📥", title: "Télécharger", titleEn: "Download", titleAr: "تحميل", titleEs: "Descargar", text: "Gratuit", textEn: "Free", textAr: "مجاني", textEs: "Gratis" },
    { icon: "🚗", title: "Auto", titleEn: "Auto", titleAr: "السيارات", titleEs: "Auto", text: "Particuliers", textEn: "Individuals", textAr: "الأفراد", textEs: "Particulares" },
    { icon: "🏠", title: "Habitation", titleEn: "Home", titleAr: "السكن", titleEs: "Hogar", text: "Particuliers", textEn: "Individuals", textAr: "الأفراد", textEs: "Particulares" },
  ],
  service: [
    { icon: "⭐", title: "Service Premium", titleEn: "Premium Service", titleAr: "خدمة مميزة", titleEs: "Servicio Premium", text: "Devis personnalisé", textEn: "Personalized quote", textAr: "عرض سعر مخصص", textEs: "Presupuesto personalizado" },
    { icon: "💬", title: "Assistance", titleEn: "Assistance", titleAr: "مساعدة", titleEs: "Asistencia", text: "24/7 disponible", textEn: "24/7 available", textAr: "متاح 24/7", textEs: "Disponible 24/7" },
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
  { q: { fr: "Qu'est-ce que l'assurance ?", en: "What is insurance?", ar: "ما هو التأمين؟", es: "¿Qué es el seguro?" }, a: { fr: "L'assurance est un contrat par lequel une personne se protège contre un risque en échange d'une cotisation.", en: "Insurance is a contract by which a person protects themselves against a risk in exchange for a contribution.", ar: "التأمين عقد يحمي الشخص نفسه من المخاطر مقابل اشتراك.", es: "El seguro es un contrato por el cual una persona se protege contra un riesgo a cambio de una contribución." }, keywords: { fr: ["assurance", "contrat", "protège", "risque"], en: ["insurance", "contract", "protect", "risk"], ar: ["تأمين", "عقد", "حماية", "خطر"], es: ["seguro", "contrato", "protege", "riesgo"] } },
  { q: { fr: "À quoi sert l'assurance ?", en: "What is insurance for?", ar: "ما فائدة التأمين؟", es: "¿Para qué sirve el seguro?" }, a: { fr: "Elle permet de réduire les conséquences financières en cas de sinistre.", en: "It helps reduce financial consequences in case of a claim.", ar: "يساعد في تقليل العواقب المالية في حالة المطالبة.", es: "Ayuda a reducir las consecuencias financieras en caso de siniestro." }, keywords: { fr: ["sert", "conséquences", "financières", "sinistre"], en: ["purpose", "consequences", "financial", "claim"], ar: ["الغرض", "العواقب", "مالية", "مطالبة"], es: ["sirve", "consecuencias", "financieras", "siniestro"] } },
  { q: { fr: "Quelle est la différence entre assureur et courtier ?", en: "What is the difference between insurer and broker?", ar: "ما هو الفرق بين شركة التأمين والوسيط؟", es: "¿Cuál es la diferencia entre aseguradora y corredor?" }, a: { fr: "L'assureur garantit le risque, le courtier conseille et représente le client. CPA est votre courtier de confiance.", en: "The insurer guarantees the risk, the broker advises and represents the client. CPA is your trusted broker.", ar: "شركة التأمين تضمن المخاطر، والوسيط ينصح ويمثل العميل. CPA هو وسيطك الموثوق.", es: "La aseguradora garantiza el riesgo, el corredor asesora y representa al cliente. CPA es su corredor de confianza." }, keywords: { fr: ["différence", "assureur", "courtier", "garantit"], en: ["difference", "insurer", "broker", "guarantee"], ar: ["فرق", "شركة تأمين", "وسيط", "يضمن"], es: ["diferencia", "aseguradora", "corredor", "garantiza"] } },
  { q: { fr: "Qu'est-ce qu'une prime d'assurance ?", en: "What is an insurance premium?", ar: "ما هو قسط التأمين؟", es: "¿Qué es una prima de seguro?" }, a: { fr: "C'est le montant que vous payez pour être assuré. Elle varie selon le type de couverture et le profil de risque.", en: "It's the amount you pay to be insured. It varies depending on the type of coverage and risk profile.", ar: "هو المبلغ الذي تدفعه للتأمين. يختلف حسب نوع التغطية وملف المخاطر.", es: "Es el monto que paga por estar asegurado. Varía según el tipo de cobertura y el perfil de riesgo." }, keywords: { fr: ["prime", "montant", "payez", "assuré"], en: ["premium", "amount", "pay", "insured"], ar: ["قسط", "مبلغ", "تدفع", "مؤمن"], es: ["prima", "monto", "paga", "asegurado"] } },
  { q: { fr: "Qu'est-ce qu'une franchise ?", en: "What is a deductible?", ar: "ما هي франшиза؟", es: "¿Qué es un deducible?" }, a: { fr: "C'est la part du sinistre qui reste à votre charge. Plus la franchise est élevée, plus la prime est basse.", en: "It's the portion of the claim that remains your responsibility. The higher the deductible, the lower the premium.", ar: "إنها حصة المطالبة التي تبقى مسؤوليتك. كلما ارتفعت франшиза، انخفض القسط.", es: "Es la parte del siniestro que corre por su cuenta. Cuanto mayor sea el deducible, menor será la prima." }, keywords: { fr: ["franchise", "charge", "sinistre"], en: ["deductible", "charge", "claim"], ar: ["فرانشيز", "مسؤولية", "مطالبة"], es: ["deducible", "cargo", "siniestro"] } },
  { q: { fr: "Le courtier est-il payant ?", en: "Is the broker paid?", ar: "هل الوسيط مدفوع الأجر؟", es: "¿El corredor es de pago?" }, a: { fr: "Non, sa rémunération est incluse dans la prime d'assurance. Nos services de conseil sont gratuits pour vous.", en: "No, their remuneration is included in the insurance premium. Our advisory services are free for you.", ar: "لا، يتم تضمين أجره في قسط التأمين. خدماتنا الاستشارية مجانية لك.", es: "No, su remuneración está incluida en la prima del seguro. Nuestros servicios de asesoramiento son gratuitos para usted." }, keywords: { fr: ["courtier", "payant", "gratuit", "rémunération"], en: ["broker", "paid", "free", "remuneration"], ar: ["وسيط", "مدفوع", "مجاني", "أجر"], es: ["corredor", "pagado", "gratis", "remuneración"] } },
  
  // Automobile / Auto
  { q: { fr: "L'assurance automobile est-elle obligatoire au Maroc ?", en: "Is auto insurance mandatory in Morocco?", ar: "هل التأمين على السيارات إلزامي في المغرب؟", es: "¿El seguro de auto es obligatorio en Marruecos?" }, a: { fr: "Oui, l'assurance responsabilité civile automobile est obligatoire au Maroc. Elle couvre les dommages causés aux tiers en cas d'accident.", en: "Yes, mandatory auto liability insurance is required in Morocco. It covers damages caused to third parties in case of an accident.", ar: "نعم، التأمين الإلزامي على المسؤولية المدنية للسيارات مطلوب في المغرب. يغطي الأضرار التي تلحق بالأطراف الثالثة في حالة الحادث.", es: "Sí, el seguro obligatorio de responsabilidad civil de auto es obligatorio en Marruecos. Cubre los daños causados a terceros en caso de accidente." }, keywords: { fr: ["automobile", "obligatoire", "maroc", "voiture", "auto"], en: ["auto", "mandatory", "morocco", "car"], ar: ["سيارات", "إلزامي", "المغرب", "سيارة"], es: ["auto", "obligatorio", "marruecos", "coche"] } },
  { q: { fr: "Quelles sont les garanties auto ?", en: "What are the auto coverage options?", ar: "ما هي تغطيات السيارات؟", es: "¿Cuáles son las coberturas de auto?" }, a: { fr: "Nous proposons : responsabilité civile, tous risques, vol, incendie, bris de glace, assistance, protection du conducteur, et dommages collision.", en: "We offer: liability, comprehensive, theft, fire, glass breakage, assistance, driver protection, and collision damage.", ar: "نقدم: المسؤولية المدنية، شاملة، سرقة، حريق، كسر الزجاج، مساعدة، حماية السائق، وأضرار التصادم.", es: "Ofrecemos: responsabilidad civil, todo riesgo, robo, incendio, rotura de cristales, asistencia, protección del conductor y daños por colisión." }, keywords: { fr: ["garanties", "auto", "tous risques", "vol", "incendie"], en: ["coverage", "auto", "comprehensive", "theft", "fire"], ar: ["تغطية", "سيارات", "شامل", "سرقة", "حريق"], es: ["coberturas", "auto", "todo riesgo", "robo", "incendio"] } },
  { q: { fr: "Combien coûte l'assurance auto ?", en: "How much does auto insurance cost?", ar: "كم تكلفة التأمين على السيارات؟", es: "¿Cuánto cuesta el seguro de auto?" }, a: { fr: "Le tarif dépend du véhicule, de votre profil conducteur, de la zone géographique et des garanties choisies. Demandez un devis personnalisé !", en: "The rate depends on the vehicle, your driver profile, geographic area and chosen coverage. Request a personalized quote!", ar: "تعتمد الرسوم على السيارة وملف السائق والمنطقة الجغرافية والتغطيات المختارة. اطلب عرض أسعار مخصص!", es: "La tarifa depende del vehículo, su perfil de conductor, área geográfica y coberturas elegidas. ¡Solicite un presupuesto personalizado!" }, keywords: { fr: ["coût", "prix", "tarif", "auto", "combien"], en: ["cost", "price", "rate", "auto", "how much"], ar: ["تكلفة", "سعر", "رسوم", "سيارات", "كم"], es: ["costo", "precio", "tarifa", "auto", "cuánto"] } },
  { q: { fr: "Comment assurer ma flotte de véhicules ?", en: "How to insure my vehicle fleet?", ar: "كيفية تأمين أسطول السيارات؟", es: "¿Cómo asegurar mi flota de vehículos?" }, a: { fr: "CPA propose des contrats flotte pour les entreprises à partir de 5 véhicules avec des tarifs préférentiels et une gestion simplifiée.", en: "CPA offers fleet contracts for companies starting from 5 vehicles with preferential rates and simplified management.", ar: "تقدم CPA عقود أسطول للشركات ابتداءً من 5 سيارات مع أسعار تفضيلية وإدارة مبسطة.", es: "CPA ofrece contratos de flota para empresas a partir de 5 vehículos con tarifas preferenciales y gestión simplificada." }, keywords: { fr: ["flotte", "véhicules", "entreprise", "parc"], en: ["fleet", "vehicles", "company", "fleet"], ar: ["أسطول", "مركبات", "شركة", "مجموعة"], es: ["flota", "vehículos", "empresa", "parque"] } },

  // Habitation / Home
  { q: { fr: "Pourquoi souscription une assurance habitation ?", en: "Why subscribe to home insurance?", ar: "لماذا الاشتراك في تأمين المنزل؟", es: "¿Por qué suscribir un seguro de hogar?" }, a: { fr: "L'assurance habitation protège votre logement et vos biens contre le vol, l'incendie, les dégâts des eaux, les catastrophes naturelles et la responsabilité civile.", en: "Home insurance protects your home and belongings against theft, fire, water damage, natural disasters and civil liability.", ar: "يغطي تأمين المنزل منزلك وممتلكاتك ضد السرقة والحريق وتلف المياه والكوارث الطبيعية والمسؤولية المدنية.", es: "El seguro de hogar protege su vivienda y sus bienes contra robo, incendio, daños por agua, catástrofes naturales y responsabilidad civil." }, keywords: { fr: ["habitation", "maison", "logement", "domicile"], en: ["home", "house", "housing", "residence"], ar: ["منزل", "بيت", "سكن", "إقامة"], es: ["hogar", "casa", "alojamiento", "domicilio"] } },
  
  // Santé / Health
  { q: { fr: "Comment fonctionne l'assurance santé ?", en: "How does health insurance work?", ar: "كيف يعمل التأمين الصحي؟", es: "¿Cómo funciona el seguro de salud?" }, a: { fr: "L'assurance santé rembourse vos frais médicaux (consultations, hospitalisations, médicaments, optique, dentaire) selon les barèmes de votre contrat.", en: "Health insurance reimburses your medical expenses (consultations, hospitalizations, medications, optical, dental) according to your contract rates.", ar: "يعيد التأمين الصحي تعويض نفقاتك الطبية (الاستشارات، المستشفى، الأدوية، البصريات، طب الأسنان) وفق أسعار عقدك.", es: "El seguro de salud reembolsa sus gastos médicos (consultas, hospitalizaciones, medicamentos, óptica, dental) según las tarifas de su contrato." }, keywords: { fr: ["santé", "médical", "remboursement", "maladie", "soin"], en: ["health", "medical", "reimbursement", "illness", "care"], ar: ["صحة", "طبي", "تعويض", "مرض", "رعاية"], es: ["salud", "médico", "reembolso", "enfermedad", "cuidado"] } },
  { q: { fr: "Proposez-vous une assurance santé groupe ?", en: "Do you offer group health insurance?", ar: "هل تقدمون تأمين صحي جماعي؟", es: "¿Ofrecen seguro de salud grupal?" }, a: { fr: "Oui, nous proposons des contrats santé groupe pour les entreprises couvrant les employés et leurs familles avec des tarifs avantageux.", en: "Yes, we offer group health contracts for companies covering employees and their families with advantageous rates.", ar: "نعم، نقدم عقود صحية جماعية للشركات تغطي الموظفين وعائلاتهم بأسعار مميزة.", es: "Sí, ofrecemos contratos de salud grupal para empresas que cubren a los empleados y sus familias con tarifas ventajosas." }, keywords: { fr: ["groupe", "entreprise", "employés", "collectif"], en: ["group", "company", "employees", "collective"], ar: ["جماعي", "شركة", "موظفين", "جماعي"], es: ["grupo", "empresa", "empleados", "colectivo"] } },

  // Sinistres / Claims
  { q: { fr: "Qu'est-ce qu'un sinistre ?", en: "What is a claim?", ar: "ما هي المطالبة؟", es: "¿Qué es un siniestro?" }, a: { fr: "C'est la réalisation du risque assuré : accident, vol, incendie, dégât des eaux, etc.", en: "It's the occurrence of the insured risk: accident, theft, fire, water damage, etc.", ar: "إنها حدوث الخطر المؤمن عليه: حادث، سرقة، حريق، تلف المياه، إلخ.", es: "Es la ocurrencia del riesgo asegurado: accidente, robo, incendio, daños por agua, etc." }, keywords: { fr: ["sinistre", "réalisation", "accident"], en: ["claim", "occurrence", "accident"], ar: ["مطالبة", "وقوع", "حادث"], es: ["siniestro", "ocurrencia", "accidente"] } },
  { q: { fr: "Quand déclarer un sinistre ?", en: "When to report a claim?", ar: "متى يجب الإبلاغ عن مطالبة؟", es: "¿Cuándo denunciar un siniestro?" }, a: { fr: "Dans les 5 jours ouvrables à compter du moment où vous en avez connaissance. Pour un vol, le délai est de 48 heures.", en: "Within 5 working days from when you become aware. For theft, the deadline is 48 hours.", ar: "خلال 5 أيام عمل من علمك بالأمر. في حالة السرقة، المهلة 48 ساعة.", es: "Dentro de los 5 días hábiles desde que tenga conocimiento. Para robo, el plazo es de 48 horas." }, keywords: { fr: ["déclarer", "sinistre", "délai", "jours"], en: ["report", "claim", "deadline", "days"], ar: ["إبلاغ", "مطالبة", "مهلة", "أيام"], es: ["denunciar", "siniestro", "plazo", "días"] } },
   { q: { fr: "Comment déclarer un sinistre ?", en: "How to report a claim?", ar: "كيفية الإبلاغ عن مطالبة؟", es: "¿Cómo denunciar un siniestro?" }, a: { fr: "Contactez-nous au 0667558436 ou envoyez un email à info@cpa.ma avec les détails et les justificatifs.", en: "Contact us at 0667558436 or send an email to info@cpa.ma with the details and supporting documents.", ar: "اتصل بنا على 0667558436 أو أرسل بريدًا إلكترونيًا إلى info@cpa.ma مع التفاصيل والمستندات الداعمة.", es: "Contáctenos al 0667558436 o envíe un correo electrónico a info@cpa.ma con los detalles y documentos de respaldo." }, keywords: { fr: ["comment", "déclarer", "procédure"], en: ["how", "report", "procedure"], ar: ["كيف", "إبلاغ", "إجراء"], es: ["cómo", "denunciar", "procedimiento"] } },

  // CPA
  { q: { fr: "Qui êtes-vous ?", en: "Who are you?", ar: "من أنتم؟", es: "¿Quiénes son?" }, a: { fr: "Nous sommes CPA (Conseil et Placement d'Assurances), un cabinet de courtage en assurances spécialisé dans l'accompagnement des particuliers et des entreprises depuis 1957 à Casablanca.", en: "We are CPA (Conseil et Placement d'Assurances), an insurance brokerage firm specialized in supporting individuals and businesses since 1957 in Casablanca.", ar: "نحن CPA (Conseil et Placement d'Assurances)، مكتب وساطة تأمين متخصص في مرافقة الأفراد والشركات منذ 1957 في الدار البيضاء.", es: "Somos CPA (Conseil et Placement d'Assurances), una correduría de seguros especializada en apoyar a particulares y empresas desde 1957 en Casablanca." }, keywords: { fr: ["qui", "êtes", "cpa", "présentation"], en: ["who", "are", "cpa", "presentation"], ar: ["من", "أنتم", "cpa", "تعريف"], es: ["quién", "son", "cpa", "presentación"] } },
  { q: { fr: "Quelles assurances proposez-vous ?", en: "What insurance do you offer?", ar: "ما هي التأمينات التي تقدمونها؟", es: "¿Qué seguros ofrecen?" }, a: { fr: "Nous proposons : Auto, Habitation, Santé, Prévoyance, Épargne, Accidents de Travail, Responsabilité Civile, Construction, Transport Maritime, Cyber Risques, Flotte Auto, Trottinette Électrique et Animaux de Compagnie.", en: "We offer: Auto, Home, Health, Foresight, Savings, Work Accidents, Civil Liability, Construction, Maritime Transport, Cyber Risks, Auto Fleet, Electric Scooter and Pet Insurance.", ar: "نقدم: السيارات، المنزل، الصحة، التأمين التكميلي، الادخار، حوادث العمل، المسؤولية المدنية، البناء، النقل البحري، مخاطر الإنترنت، أسطول السيارات، السكوتر الكهربائي وتأمين الحيوانات الأليفة.", es: "Ofrecemos: Auto, Hogar, Salud, Previsión, Ahorro, Accidentes Laborales, Responsabilidad Civil, Construcción, Transporte Marítimo, Riesgos Cibernéticos, Flota de Autos, Patinete Eléctrico y Seguro de Mascotas." }, keywords: { fr: ["proposez", "services", "offres", "produits", "assurances"], en: ["offer", "services", "products", "insurance"], ar: ["نقدم", "خدمات", "عروض", "منتجات", "تأمين"], es: ["ofrecen", "servicios", "ofertas", "productos", "seguros"] } },
  { q: { fr: "Pourquoi passer par un courtier ?", en: "Why use a broker?", ar: "لماذا الاستفادة من وسيط؟", es: "¿Por qué usar un corredor?" }, a: { fr: "Pour comparer les offres de plusieurs compagnies, négocier les meilleurs tarifs, bénéficier d'un accompagnement personnalisé et d'un suivi des sinistres.", en: "To compare offers from several companies, negotiate the best rates, benefit from personalized support and claim follow-up.", ar: "لمقارنة عروض عدة شركات، التفاوض على أفضل الأسعار، الاستفادة من الدعم الشخصي ومتابعة المطالبات.", es: "Para comparar ofertas de varias compañías, negociar las mejores tarifas, beneficiarse de acompañamiento personalizado y seguimiento de siniestros." }, keywords: { fr: ["pourquoi", "courtier", "avantage", "intérêt"], en: ["why", "broker", "advantage", "benefit"], ar: ["لماذا", "وسيط", "ميزة", "فائدة"], es: ["por qué", "corredor", "ventaja", "interés"] } },
  { q: { fr: "Quels sont vos horaires ?", en: "What are your hours?", ar: "ما هي ساعات عملكم؟", es: "¿Cuáles son sus horarios?" }, a: { fr: "Du lundi au vendredi, de 8h30 à 18h00. Nous sommes également joignables par email 24h/24.", en: "Monday to Friday, from 8:30 AM to 6:00 PM. We are also reachable by email 24/7.", ar: "من الاثنين إلى الجمعة، من 8:30 إلى 18:00. يمكن أيضًا التواصل معنا عبر البريد الإلكتروني على مدار الساعة.", es: "De lunes a viernes, de 8:30 a 18:00. También puede contactarnos por correo electrónico las 24 horas." }, keywords: { fr: ["horaires", "heures", "ouverture", "disponible"], en: ["hours", "opening", "available"], ar: ["ساعات", "فتح", "متاح"], es: ["horarios", "apertura", "disponible"] } },
  { q: { fr: "Quelles sont vos valeurs ?", en: "What are your values?", ar: "ما هي قيمكم؟", es: "¿Cuáles son sus valores?" }, a: { fr: "La proximité, l'innovation, la performance et l'éthique. Ce sont les valeurs qui nous guident depuis 1957 pour vous offrir un accompagnement humain, des solutions modernes, les meilleures garanties au meilleur rapport qualité-prix et des conseils transparents.", en: "Proximity, innovation, performance and ethics. These are the values that have guided us since 1957 to offer you human support, modern solutions, the best coverage at the best value and transparent advice.", ar: "القرب، الابتكار، الأداء والأخلاق. هذه هي القيم التي ترشدنا منذ 1957 لنقدم لك مرافقة إنسانية، حلولاً عصرية، أفضل الضمانات بأفضل نسبة جودة سعر ونصائح شفافة.", es: "La proximidad, la innovación, el rendimiento y la ética. Estos son los valores que nos guían desde 1957 para ofrecerle acompañamiento humano, soluciones modernas, las mejores garantías al mejor rapport calidad-precio y consejos transparentes." }, keywords: { fr: ["valeurs", "engagement", "philosophie"], en: ["values", "commitment", "philosophy"], ar: ["قيم", "التزام", "فلسفة"], es: ["valores", "compromiso", "filosofía"] } },
   { q: { fr: "Comment obtenir un devis ?", en: "How to get a quote?", ar: "كيفية الحصول على عرض أسعار؟", es: "¿Cómo obtener un presupuesto?" }, a: { fr: "Appelez-nous au 0667558436, envoyez un email à info@cpa.ma, ou remplissez le formulaire de contact sur notre site. Vous pouvez aussi utiliser notre estimateur de devis en ligne !", en: "Call us at 0667558436, send an email to info@cpa.ma, or fill out the contact form on our website. You can also use our online quote estimator!", ar: "اتصل بنا على 0667558436 أو أرسل بريدًا إلكترونيًا إلى info@cpa.ma أو املأ نموذج الاتصال على موقعنا. يمكنك أيضًا استخدام أداة تقدير العرض عبر الإنترنت!", es: "Llámenos al 0667558436, envíe un correo a info@cpa.ma, o complete el formulario de contacto en nuestro sitio. ¡También puede usar nuestro estimador de presupuesto en línea!" }, keywords: { fr: ["devis", "estimation", "tarif", "prix"], en: ["quote", "estimate", "rate", "price"], ar: ["عرض أسعار", "تقدير", "رسوم", "سعر"], es: ["presupuesto", "estimación", "tarifa", "precio"] } },
   { q: { fr: "Où êtes-vous situés ?", en: "Where are you located?", ar: "أين موقعكم؟", es: "¿Dónde están ubicados?" }, a: { fr: "Notre siège est à Casablanca, Maroc. Adresse : Casablanca, Maroc. Téléphone : 0667558436.", en: "Our headquarters is in Casablanca, Morocco. Address: Casablanca, Morocco. Phone: 0667558436.", ar: "مقرنا في الدار البيضاء، المغرب. العنوان: الدار البيضاء، المغرب. الهاتف: 0667558436.", es: "Nuestra sede está en Casablanca, Marruecos. Dirección: Casablanca, Marruecos. Teléfono: 0667558436." }, keywords: { fr: ["adresse", "situés", "localisation", "bureau", "siège"], en: ["address", "located", "location", "office", "headquarters"], ar: ["عنوان", "موقع", "مكتب", "مقر"], es: ["dirección", "ubicados", "ubicación", "oficina", "sede"] } },

  // Entreprises / Business
  { q: { fr: "Proposez-vous des assurances pour les entreprises ?", en: "Do you offer insurance for businesses?", ar: "هل تقدمون التأمين للشركات؟", es: "¿Ofrecen seguros para empresas?" }, a: { fr: "Oui, nous proposons une gamme complète : Responsabilité Civile, Accidents de Travail, Risques Techniques, Dommage aux Biens, Perte d'Exploitation, Transport, Construction, Cyber Risques et Épargne Vie.", en: "Yes, we offer a complete range: Civil Liability, Work Accidents, Technical Risks, Property Damage, Business Interruption, Transport, Construction, Cyber Risks and Life Savings.", ar: "نعم، نقدم مجموعة كاملة: المسؤولية المدنية، حوادث العمل، المخاطر التقنية، أضرار الممتلكات، فقدان الأرباح، النقل، البناء، مخاطر الإنترنت والادخار على الحياة.", es: "Sí, ofrecemos una gama completa: Responsabilidad Civil, Accidentes Laborales, Riesgos Técnicos, Daños a Bienes, Pérdida de Explotación, Transporte, Construcción, Riesgos Cibernéticos y Ahorro Vida." }, keywords: { fr: ["entreprise", "professionnel", "société", "commercial"], en: ["business", "professional", "company", "commercial"], ar: ["شركة", "محترف", "مؤسسة", "تجاري"], es: ["empresa", "profesional", "sociedad", "comercial"] } },
  { q: { fr: "Qu'est-ce que l'assurance responsabilité civile ?", en: "What is civil liability insurance?", ar: "ما هو تأمين المسؤولية المدنية؟", es: "¿Qué es el seguro de responsabilidad civil?" }, a: { fr: "Elle couvre les dommages (corporels, matériels, immatériels) que vous ou votre entreprise pourriez causer à des tiers dans le cadre de votre activité.", en: "It covers damages (physical, material, intangible) that you or your company could cause to third parties in the course of your activity.", ar: "يغطي الأضرار (الجسدية، المادية، غير المادية) التي قد تسببها أنت أو شركتك لأطراف ثالثة في إطار نشاطك.", es: "Cubre los daños (corporales, materiales, inmateriales) que usted o su empresa puedan causar a terceros en el marco de su actividad." }, keywords: { fr: ["responsabilité", "civile", "dommages", "tiers"], en: ["liability", "civil", "damages", "third parties"], ar: ["مسؤولية", "مدنية", "أضرار", "أطراف ثالثة"], es: ["responsabilidad", "civil", "daños", "terceros"] } },
  { q: { fr: "Qu'est-ce que l'assurance accidents de travail ?", en: "What is work accident insurance?", ar: "ما هو تأمين حوادث العمل؟", es: "¿Qué es el seguro de accidentes laborales?" }, a: { fr: "C'est une assurance obligatoire qui protège vos employés en cas d'accident survenu sur le lieu de travail ou durant le trajet.", en: "It's mandatory insurance that protects your employees in case of an accident occurring at the workplace or during the commute.", ar: "إنه تأمين إلزامي يحمي موظفيك في حالة وقوع حادث في مكان العمل أو خلال التنقل.", es: "Es un seguro obligatorio que protege a sus empleados en caso de accidente ocurrido en el lugar de trabajo o durante el trayecto." }, keywords: { fr: ["accidents", "travail", "employés", "obligatoire"], en: ["accidents", "work", "employees", "mandatory"], ar: ["حوادث", "عمل", "موظفين", "إلزامي"], es: ["accidentes", "trabajo", "empleados", "obligatorio"] } },
  { q: { fr: "Qu'est-ce que l'assurance cyber risques ?", en: "What is cyber risk insurance?", ar: "ما هو تأمين مخاطر الإنترنت؟", es: "¿Qué es el seguro de riesgos cibernéticos?" }, a: { fr: "Elle protège votre entreprise contre les cyberattaques : piratage, vol de données, ransomware, interruption d'activité liée au numérique.", en: "It protects your business against cyberattacks: hacking, data theft, ransomware, digital activity interruption.", ar: "تحمي شركتك من الهجمات الإلكترونية: القرصنة، سرقة البيانات، برامج الفدية، انقطاع النشاط الرقمي.", es: "Protege su empresa contra ciberataques: piratería, robo de datos, ransomware, interrupción de actividad digital." }, keywords: { fr: ["cyber", "numérique", "piratage", "données", "hacking"], en: ["cyber", "digital", "hacking", "data", "ransomware"], ar: ["سيبراني", "رقمي", "قرصنة", "بيانات", "اختراق"], es: ["ciber", "digital", "hacking", "datos", "ransomware"] } },

  // Nouveautés / New Products
  { q: { fr: "Qu'est-ce que l'assurance trottinette électrique ?", en: "What is electric scooter insurance?", ar: "ما هو تأمين السكوتر الكهربائي؟", es: "¿Qué es el seguro de patinete eléctrico?" }, a: { fr: "C'est une assurance spécialement conçue pour les utilisateurs de trottinettes électriques. Elle couvre la responsabilité civile, le vol, les dommages matériels et la protection du conducteur.", en: "It's insurance specially designed for electric scooter users. It covers civil liability, theft, material damage and driver protection.", ar: "إنه تأمين مصمم خصيصًا لمستخدمي السكوتر الكهربائي. يغطي المسؤولية المدنية والسرقة والأضرار المادية وحماية السائق.", es: "Es un seguro especialmente diseñado para usuarios de patinetes eléctricos. Cubre responsabilidad civil, robo, daños materiales y protección del conductor." }, keywords: { fr: ["trottinette", "électrique", "mobilité", "edpm"], en: ["scooter", "electric", "mobility", "edpm"], ar: ["سكوتر", "كهربائي", "تنقل", "edpm"], es: ["patinete", "eléctrico", "movilidad", "edpm"] } },
  { q: { fr: "Qu'est-ce que l'assurance animaux de compagnie ?", en: "What is pet insurance?", ar: "ما هو تأمين الحيوانات الأليفة؟", es: "¿Qué es el seguro de mascotas?" }, a: { fr: "Elle couvre les frais vétérinaires de vos animaux (chien, chat) en cas de maladie ou d'accident : consultations, chirurgie, hospitalisation et médicaments.", en: "It covers veterinary expenses for your pets (dog, cat) in case of illness or accident: consultations, surgery, hospitalization and medications.", ar: "تغطي نفقات البيطرية لحيواناتك الأليفة (كلب، قطة) في حالة المرض أو الحادث: الاستشارات، الجراحة، المستشفى والأدوية.", es: "Cubre los gastos veterinarios de sus mascotas (perro, gato) en caso de enfermedad o accidente: consultas, cirugía, hospitalización y medicamentos." }, keywords: { fr: ["animaux", "compagnie", "chien", "chat", "vétérinaire", "animal"], en: ["pets", "companion", "dog", "cat", "veterinary", "animal"], ar: ["حيوانات", "رفقة", "كلب", "قطة", "بيطري", "حيوان"], es: ["mascotas", "compañía", "perro", "gato", "veterinario", "animal"] } },
  
  // Paiement / Payment
  { q: { fr: "Comment payer ma prime d'assurance ?", en: "How to pay my insurance premium?", ar: "كيفية دفع قسط التأمين؟", es: "¿Cómo pagar mi prima de seguro?" }, a: { fr: "Vous pouvez payer par virement bancaire, chèque, ou carte bancaire. Des facilités de paiement sont possibles selon le contrat.", en: "You can pay by bank transfer, check, or credit card. Payment facilities are available depending on the contract.", ar: "يمكنك الدفع عن طريق التحويل البنكي أو الشيك أو بطاقة الائتمان. تسهيلات الدفع متاحة حسب العقد.", es: "Puede pagar mediante transferencia bancaria, cheque o tarjeta de crédito. Hay facilidades de pago disponibles según el contrato." }, keywords: { fr: ["payer", "paiement", "règlement", "carte", "virement"], en: ["pay", "payment", "settlement", "card", "transfer"], ar: ["دفع", "مالية", "تسوية", "بطاقة", "تحويل"], es: ["pagar", "pago", "liquidación", "tarjeta", "transferencia"] } },
  { q: { fr: "Peut-on résilier un contrat d'assurance ?", en: "Can you cancel an insurance contract?", ar: "هل يمكن إلغاء عقد التأمين؟", es: "¿Se puede rescindir un contrato de seguro?" }, a: { fr: "Oui, vous pouvez résilier votre contrat à l'échéance annuelle avec un préavis (généralement 2 mois). Des cas de résiliation anticipée existent aussi.", en: "Yes, you can cancel your contract at the annual expiry with notice (usually 2 months). Early cancellation cases also exist.", ar: "نعم، يمكنك إلغاء عقدك عند انتهاء الصلاحية السنوية مع إشعار (عادةً شهرين). توجد أيضًا حالات إلغاء مبكر.", es: "Sí, puede rescindir su contrato en el vencimiento anual con preaviso (generalmente 2 meses). También existen casos de rescisión anticipada." }, keywords: { fr: ["résilier", "résiliation", "annuler", "arrêter"], en: ["cancel", "termination", "annul", "stop"], ar: ["إلغاء", "فسخ", "إبطال", "توقيف"], es: ["rescindir", "rescisión", "anular", "parar"] } },
  { q: { fr: "Comment renouveler mon contrat ?", en: "How to renew my contract?", ar: "كيفية تجديد عقدي؟", es: "¿Cómo renovar mi contrato?" }, a: { fr: "Votre contrat se renouvelle automatiquement à l'échéance. Notre équipe vous contacte avant pour ajuster les garanties si nécessaire.", en: "Your contract automatically renews at expiry. Our team contacts you before to adjust coverage if necessary.", ar: "يتم تجديد عقدك تلقائيًا عند انتهاء الصلاحية. يتواصل فريقنا معك قبل ذلك لتعديل التغطيات إذا لزم الأمر.", es: "Su contrato se renueva automáticamente al vencimiento. Nuestro equipo le contacta antes para ajustar las coberturas si es necesario." }, keywords: { fr: ["renouveler", "renouvellement", "échéance"], en: ["renew", "renewal", "expiry"], ar: ["تجديد", "تجديد", "انتهاء"], es: ["renovar", "renovación", "vencimiento"] } },
  
  // Partenaires / Partners
  { q: { fr: "Avec quelles compagnies travaillez-vous ?", en: "Which companies do you work with?", ar: "مع أي شركات تعملون؟", es: "¿Con qué compañías trabajan?" }, a: { fr: "Nous travaillons avec les meilleures compagnies du marché : Allianz, AXA, Wafa Assurance, RMA, Sanlam, AtlantaSanad, La Marocaine Vie, et bien d'autres.", en: "We work with the best companies in the market: Allianz, AXA, Wafa Assurance, RMA, Sanlam, AtlantaSanad, La Marocaine Vie, and many more.", ar: "نعمل مع أفضل الشركات في السوق: أليانز، AXA، وفاء للتأمين، RMA، سانلام، أتلانتا صد، الشركة المغربية للحياة، وغيرها الكثير.", es: "Trabajamos con las mejores compañías del mercado: Allianz, AXA, Wafa Assurance, RMA, Sanlam, AtlantaSanad, La Marocaine Vie, y muchas más." }, keywords: { fr: ["compagnies", "partenaires", "allianz", "axa", "wafa"], en: ["companies", "partners", "allianz", "axa", "wafa"], ar: ["شركات", "شركاء", "أليانز", "axa", "وفاء"], es: ["compañías", "socios", "allianz", "axa", "wafa"] } },
];

type Message = { role: "bot" | "user"; text: string };

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
      lang === "ar" ? "ما هي франшиза؟" :
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
      lang === "fr" ? "Comment payer ma prime ?" :
      lang === "en" ? "How to pay my premium?" :
      lang === "ar" ? "كيفية دفع قسط التأمين؟" :
      "¿Cómo pagar mi prima?",
      lang === "fr" ? "Quelles assurances proposez-vous ?" :
      lang === "en" ? "What insurance do you offer?" :
      lang === "ar" ? "ما هي التأمينات التي تقدمونها؟" :
      "¿Qué seguros ofrecen?"
    ];
  }
  
  // Default suggestions
  return [
    lang === "fr" ? "Quelles assurances proposez-vous ?" :
    lang === "en" ? "What insurance do you offer?" :
    lang === "ar" ? "ما هي التأمينات التي تقدمونها؟" :
    "¿Qué seguros ofrecen?",
    lang === "fr" ? "Comment obtenir un devis ?" :
    lang === "en" ? "How to get a quote?" :
    lang === "ar" ? "كيفية الحصول على عرض أسعار؟" :
    "¿Cómo obtener un presupuesto?",
    lang === "fr" ? "Qui êtes-vous ?" :
    lang === "en" ? "Who are you?" :
    lang === "ar" ? "من أنتم؟" :
    "¿Quiénes son?",
    lang === "fr" ? "Quels sont vos horaires ?" :
    lang === "en" ? "What are your hours?" :
    lang === "ar" ? "ما هي ساعات عملكم؟" :
    "¿Cuáles son sus horarios?"
  ];
};

interface ChatbotProps {
  pageContext?: PageContext;
}

const Chatbot: React.FC<ChatbotProps> = ({ pageContext = 'home' }) => {
  const { t, lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [hasAccepted, setHasAccepted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: t("chat_greeting") },
    { role: "bot", text: t("chat_enterprise_protection") },
  ]);
  const [input, setInput] = useState("");
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>([
    t("chat_suggestion_1"),
    t("chat_suggestion_2"),
    t("chat_suggestion_3"),
    t("chat_suggestion_4")
  ]);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [showAds, setShowAds] = useState(true);
  const [showGif, setShowGif] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Privacy consent message
  const privacyMessage = {
    fr: `Bienvenue sur l'Assistant Virtuel CPA

Afin d'améliorer votre expérience et assurer le bon fonctionnement du chatbot, CPA utilise des cookies et peut collecter certaines données techniques et personnelles lors de vos échanges.

Ces informations permettent notamment :
• de répondre à vos demandes ;
• d'améliorer la qualité du service ;
• de vous recontacter si nécessaire ;
• de sécuriser les échanges et prévenir les usages frauduleux.

Conformément à la Loi n°09-08 relative à la protection des données à caractère personnel, vous disposez d'un droit d'accès, de rectification, d'opposition et de suppression de vos données.

Vous pouvez consulter notre politique de confidentialité à tout moment sur :
Mentions légales – Assistant CPA`,
    en: `Welcome to the CPA Virtual Assistant

To improve your experience and ensure the proper functioning of the chatbot, CPA uses cookies and may collect certain technical and personal data during your exchanges.

This information is used to:
• respond to your requests;
• improve service quality;
• contact you if necessary;
• secure exchanges and prevent fraudulent use.

Under Law No. 09-08 on the protection of personal data, you have the right to access, rectify, object to, and delete your data.

You can consult our privacy policy at any time at:
Legal Notice – CPA Assistant`,
    ar: `مرحباً بك في المساعد الافتراضي لـ CPA

لتحسين تجربتك وضمان عمل المساعد بشكل صحيح، يستخدم CPA ملفات تعريف الارتباط وقد يجمع بعض البيانات التقنية والشخصية أثناء تبادلاتك.

يتم استخدام هذه المعلومات لـ:
• الرد على طلباتك؛
• تحسين جودة الخدمة؛
• التواصل معك إذا لزم الأمر؛
• تأمين التبادلات ومنع الاستخدامات الاحتيالية.

وفقاً للقانون رقم 09-08 المتعلق بحماية البيانات الشخصية، لديك حق الوصول والتصحيح والاعتراض وحذف بياناتك.

يمكنك الاطلاع على سياسة الخصوصية الخاصة بنا في أي وقت على:
الإشارات القانونية – مساعد CPA`,
    es: `Bienvenido al Asistente Virtual CPA

Para mejorar tu experiencia y asegurar el correcto funcionamiento del chatbot, CPA utiliza cookies y puede recopilar ciertos datos técnicos y personales durante tus intercambios.

Esta información se utiliza para:
• responder a tus solicitudes;
• mejorar la calidad del servicio;
• contactarte si es necesario;
• asegurar los intercambios y prevenir usos fraudulentos.

De acuerdo con la Ley n°09-08 sobre la protección de datos personales, tienes derecho a acceder, rectificar, oponerte y eliminar tus datos.

Puedes consultar nuestra política de confidencialidad en cualquier momento en:
Aviso Legal – Asistente CPA`
  };

  // Handle privacy consent
  const handleAccept = () => {
    setHasAccepted(true);
    setMessages([
      { role: "bot", text: t("chat_greeting") },
      { role: "bot", text: t("chat_enterprise_protection") },
    ]);
  };

  const handleRefuse = () => {
    setHasAccepted(false);
    setMessages([
      { role: "bot", text: t("chat_privacy_refused") || "Vous devez accepter la politique de confidentialité pour utiliser le chatbot." },
    ]);
  };
  
  // Get page-specific ads or fallback to home ads
  const ads = pageSpecificAds[pageContext] || pageSpecificAds.home;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Rotate through page-specific ads - ONE ad at a time, 5 seconds display, 20 seconds pause
  useEffect(() => {
    // Start with showing the first ad
    setShowAds(true);
    
    // Change to next ad every 25 seconds (5s display + 20s pause)
    const rotateTimer = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % ads.length);
    }, 25000); // 25 seconds total cycle (5s display + 20s wait)
    
    return () => {
      clearInterval(rotateTimer);
    };
  }, [ads.length]);

  // Toggle GIF visibility: 5 seconds display, 20 seconds hidden
  useEffect(() => {
    // First toggle after 5 seconds to start the hidden phase
    const hideTimer = setTimeout(() => {
      setShowGif(false);
      
      // Then toggle every 25 seconds (20s hidden + 5s display)
      const gifTimer = setInterval(() => {
        setShowGif((prev) => !prev);
      }, 25000);
      
      return () => clearInterval(gifTimer);
    }, 5000);
    
    return () => clearTimeout(hideTimer);
  }, []);

  // Update suggestions when language changes
  useEffect(() => {
    setCurrentSuggestions([
      t("chat_suggestion_1"),
      t("chat_suggestion_2"),
      t("chat_suggestion_3"),
      t("chat_suggestion_4")
    ]);
  }, [lang, t]);

  const findAnswer = (question: string): string => {
    const q = question.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    // Try exact keyword matching with scoring
    let bestMatch: { faq: FAQItem; score: number } | null = null;
    
    for (const faq of faqData) {
      let score = 0;
      const keywords = faq.keywords[lang as keyof typeof faq.keywords] || faq.keywords.fr;
      for (const keyword of keywords) {
        const normalizedKeyword = keyword.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (q.includes(normalizedKeyword)) {
          score += normalizedKeyword.length; // longer keyword matches are more relevant
        }
      }
      if (score > 0 && (!bestMatch || score > bestMatch.score)) {
        bestMatch = { faq, score };
      }
    }
    
    if (bestMatch) {
      return bestMatch.faq.a[lang as keyof typeof bestMatch.faq.a] || bestMatch.faq.a.fr;
    }
    
    return t("chat_no_answer");
  };

  const handleSend = (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;
    setMessages((prev) => [...prev, { role: "user", text: msg }]);
    setInput("");
    setTimeout(() => {
      const answer = findAnswer(msg);
      setMessages((prev) => [...prev, { role: "bot", text: answer }]);
      setCurrentSuggestions(getContextualSuggestions(msg, lang));
    }, 600);
  };

  return (
    <>
      {/* Chatbot GIF with Messages ABOVE - LEFT BOTTOM */}
      <motion.div
        className="fixed bottom-6 left-6 z-50 flex flex-col items-center"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {/* Messages Above GIF - ONE ad at a time, 20s duration */}
        <AnimatePresence mode="wait">
          {showAds && (
            <motion.div 
              className="flex flex-col gap-1.5 mb-2"
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="bg-white/20 backdrop-blur-md border-2 border-blue-500/50 text-blue-600 px-4 py-2 rounded-2xl text-xs min-w-[180px] max-w-[220px] shadow-lg"
                animate={{ 
                  boxShadow: [
                    "0 4px 15px rgba(59, 130, 246, 0.2)",
                    "0 8px 25px rgba(59, 130, 246, 0.4)",
                    "0 4px 15px rgba(59, 130, 246, 0.2)"
                  ],
                  borderColor: [
                    "rgba(59, 130, 246, 0.4)",
                    "rgba(59, 130, 246, 0.8)",
                    "rgba(59, 130, 246, 0.4)"
                  ],
                  scale: [1, 1.02, 1]
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <motion.span 
                    className="text-lg"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {ads[currentAdIndex].icon}
                  </motion.span>
                  <span className="font-bold text-[11px] text-blue-600 drop-shadow-sm">
                    {lang === "fr" ? ads[currentAdIndex].title : 
                     lang === "en" ? ads[currentAdIndex].titleEn :
                     lang === "ar" ? ads[currentAdIndex].titleAr :
                     ads[currentAdIndex].titleEs}
                  </span>
                </div>
                <div className="text-[10px] text-blue-500/90 font-medium">
                  {lang === "fr" ? ads[currentAdIndex].text :
                   lang === "en" ? ads[currentAdIndex].textEn :
                   lang === "ar" ? ads[currentAdIndex].textAr :
                   ads[currentAdIndex].textEs}
                </div>
                {/* Progress bar showing 5s duration with gradient */}
                <div className="mt-2 h-1.5 bg-blue-500/30 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5, ease: "linear" }}
                    key={currentAdIndex}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* GIF Container - Show for 5 seconds, hide for 20 seconds */}
        <AnimatePresence mode="wait">
          {showGif && (
            <motion.div
              className="relative"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
            >
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-2xl cpa-shadow-lg">
                <img 
                  src={chatbotGif} 
                  alt="CPA Assistant" 
                  className="w-full h-full object-cover bg-transparent transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 rounded-full border-4 border-[#1a365d]/20 animate-ping"></div>
              <div className="absolute inset-0 rounded-full border-2 border-[#1a365d]/30 animate-pulse"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.button
        onClick={openWhatsApp}
        className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center cpa-shadow-lg hover:scale-110 transition-transform"
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

      <motion.button
        onClick={() => {
          setIsOpen(true);
          if (!hasAccepted) {
            setMessages([{ role: "bot", text: privacyMessage[lang as keyof typeof privacyMessage] || privacyMessage.fr }]);
          }
        }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full cpa-gradient-bg text-primary-foreground flex items-center justify-center cpa-shadow-lg hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 0 : 1 }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-6rem)] bg-card rounded-2xl border border-border cpa-shadow-lg flex flex-col overflow-hidden"
          >
            {/* Promotional Banner */}
            <PromoBanner autoRotate={true} rotationInterval={5000} />
            
            <div className="cpa-gradient-bg px-5 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-primary-foreground text-sm">{t("chat_assistant_title")}</h4>
                  <p className="text-primary-foreground/70 text-xs">{t("chat_online")}</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-primary-foreground/70 hover:text-primary-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${msg.role === "bot" ? "cpa-gradient-bg" : "bg-muted"}`}>
                    {msg.role === "bot" ? <Bot className="w-4 h-4 text-primary-foreground" /> : <User className="w-4 h-4 text-muted-foreground" />}
                  </div>
                  <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === "bot" ? "bg-muted text-foreground rounded-bl-sm" : "cpa-gradient-bg text-primary-foreground rounded-br-sm"
                  }`}>{msg.text}</div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
              
              {/* Privacy Consent Buttons - Show only when not accepted yet */}
              {!hasAccepted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2 pt-2"
                >
                  <button
                    onClick={handleAccept}
                    className="flex-1 px-4 py-2 cpa-gradient-bg text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    {t("chat_accept") || "Accepter"}
                  </button>
                  <button
                    onClick={handleRefuse}
                    className="flex-1 px-4 py-2 bg-muted text-foreground rounded-lg text-sm font-medium hover:bg-muted/80 transition-colors"
                  >
                    {t("chat_refuse") || "Refuser"}
                  </button>
                </motion.div>
              )}
              
              {/* Suggestions - Show only after acceptance */}
              {hasAccepted && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-2 pt-2"
                >
                  {currentSuggestions.map((s) => (
                    <button key={s} onClick={() => handleSend(s)}
                      className="text-xs px-3 py-1.5 rounded-full border border-primary/30 text-primary hover:bg-secondary transition-colors">
                      {s}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
