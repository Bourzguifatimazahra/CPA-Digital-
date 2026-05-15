import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { 
  Shield, Lock, FileText, AlertCircle, Globe, UserCheck, 
  Database, Scale, Mail, Phone, MapPin, Cookie, Eye, 
  Trash2, Edit, Download, XCircle, Clock, Users 
} from "lucide-react";

const PolitiqueConfidentialitePage = () => {
  const { lang } = useLanguage();
  const isRTL = lang === "ar";

  // Translation helper
  const t = (obj: Record<string, string>) => obj[lang] || obj.fr;

  // Content configuration
  const content = {
    meta: {
      title: { fr: "Politique de Protection des Données", en: "Data Protection Policy", ar: "سياسة حماية البيانات", es: "Política de Protección de Datos" },
      subtitle: { fr: "Protection de vos données personnelles - Conformité CNDP & International", en: "Protecting Your Personal Data - GDPR & International Compliance", ar: "حماية بياناتك الشخصية - الامتثال لـ GDPR والدولي", es: "Protección de Sus Datos Personales - Cumplimiento GDPR e Internacional" },
      lastUpdate: "Mars 2026"
    },
    
    sections: {
      regulatory: {
        icon: Scale,
        title: { fr: "Cadre Réglementaire", en: "Regulatory Framework", ar: "الإطار التنظيمي", es: "Marco Regulatorio" },
        content: { fr: "Cette politique de confidentialité est conforme aux principales réglementations internationales en matière de protection des données, notamment :", en: "This privacy policy complies with major international data protection regulations, including:", ar: "تتوافق سياسة الخصوصية هذه مع اللوائح الدولية الرئيسية لحماية البيانات، بما في ذلك:", es: "Esta política de privacidad cumple con las principales regulaciones internacionales de protección de datos, incluyendo:" },
        items: { fr: ["Loi n° 09-08 relative à la protection des personnes physiques (CNDP) - Maroc"], en: ["Law No. 09-08 on the protection of individuals (CNDP) - Morocco"], ar: ["القانون رقم 09-08 المتعلق بحماية الأشخاص الطبيعيين (CNDP)- المغرب"], es: ["Ley N° 09-08 relativa a la protección de personas físicas (CNDP) - Marruecos"] }
      },
      
      introduction: {
        title: { fr: "Introduction", en: "Introduction", ar: "المقدمة", es: "Introducción" },
        content: { fr: "La présente politique de confidentialité décrit comment CPA - Conseil et Placement d'Assurances collecte, utilise, traite et protège vos données personnelles conformément à la réglementation marocaine en matière de protection des données, notamment la Loi n° 09-08.", en: "This privacy policy describes how CPA collects, uses, processes and protects your personal data in accordance with Moroccan data protection regulations, particularly Law No. 09-08.", ar: "تصف سياسة الخصوصية هذه كيفية قيام CPA بجمع واستخدام ومعالجة وحماية بياناتك الشخصية وفقًا للوائح المغربية لحماية البيانات، ولا سيما القانون رقم 09-08.", es: "Esta política de privacidad describe cómo CPA recopila, usa, procesa y protege sus datos personales de acuerdo con las regulaciones marroquíes de protección de datos, particularmente la Ley N° 09-08." }
      },

      dataController: {
        icon: Shield,
        title: { fr: "Responsable du Traitement", en: "Data Controller", ar: "مسؤول المعالجة", es: "Responsable del Tratamiento" },
        content: { fr: "Le responsable du traitement de vos données personnelles est :", en: "The data controller for your personal data is:", ar: "مسؤول معالجة بياناتك الشخصية هو:", es: "El responsable del tratamiento de sus datos personales es:" },
        details: { fr: "CPA - Conseil et Placement d'Assurances\nS.A. au capital de 5 000 000 DH\nAngle Boulevard Moulay Youssef et Boulevard Ziraoui\nComplexe Moulay Youssef Work Center, 2ème Étage\nCasablanca, Maroc", en: "CPA - Conseil et Placement d'Assurances\nS.A. with capital of 5,000,000 DH\nAngle Boulevard Moulay Youssef and Boulevard Ziraoui\nComplexe Moulay Youssef Work Center, 2nd Floor\nCasablanca, Morocco", ar: "CPA - Conseil et Placement d'Assurances\nشركة مجهولة الاسم برأس مال 5,000,000 درهم\nزاوية شارع الملك يوسف وشارع زراوي\nمجمع العمل مركز الملك يوسف، الطابق الثاني\nالدار البيضاء، المغرب", es: "CPA - Conseil et Placement d'Assurances\nS.A. con capital de 5.000.000 DH\nEsquina Boulevard Moulay Youssef y Boulevard Ziraoui\nComplejo Moulay Youssef Work Center, 2º Planta\nCasablanca, Marruecos" }
      },
      
      dpo: {
        icon: UserCheck,
        title: { fr: "Délégué à la Protection des Données", en: "Data Protection Officer", ar: "مسؤول حماية البيانات", es: "Delegado de Protección de Datos" },
        content: { fr: "Nous avons désigné un Délégué à la Protection des Données pour superviser la conformité de notre organisation aux réglementations en matière de protection des données.", en: "We have appointed a Data Protection Officer to oversee our organization's compliance with data protection regulations.", ar: "لقد عينا مسؤول حماية البيانات للإشراف على امتثال منظمتنا للوائح حماية البيانات.", es: "Hemos designado un Oficial de Protección de Datos para supervisar el cumplimiento de nuestra organización con las regulaciones de protección de datos." },
        note: { fr: "Le DPO peut être contacté pour toute question concernant le traitement de vos données ou l'exercice de vos droits.", en: "The DPO can be contacted for any questions regarding the processing of your data or the exercise of your rights.", ar: "يمكن الاتصال بـ DPO لأي سؤال يتعلق بمعالجة بياناتك أو ممارسة حقوقك.", es: "El DPO puede ser contactado para cualquier pregunta sobre el procesamiento de sus datos o el ejercicio de sus derechos." }
      },

      dataCollection: {
        icon: Database,
        title: { fr: "Données Collectées", en: "Data Collected", ar: "البيانات التي نجمعها", es: "Datos Recopilados" },
        personal: {
          title: { fr: "Données personnelles", en: "Personal data", ar: "البيانات الشخصية", es: "Datos personales" },
          items: { fr: ["Nom et prénom", "Adresse email", "Numéro de téléphone", "Adresse postale", "Date de naissance", "Numéro d'identification nationale", "Informations sur le permis de conduire", "Informations sur le véhicule", "Informations sur l'assurance existante", "Historique des sinistres", "Coordonnées bancaires"], en: ["First and last name", "Email address", "Phone number", "Mailing address", "Date of birth", "National identification number", "Driver's license information", "Vehicle information", "Existing insurance information", "Claims history", "Banking information"], ar: ["الاسم واللقب", "البريد الإلكتروني", "رقم الهاتف", "العنوان البريدي", "تاريخ الميلاد", "رقم التعريف الوطني", "معلومات رخصة القيادة", "معلومات المركبة", "معلومات التأمين الحالي", "سجل المطالبات", "البيانات البنكية"], es: ["Nombre y apellido", "Correo electrónico", "Número de teléfono", "Dirección postal", "Fecha de nacimiento", "Número de identificación nacional", "Información del permiso de conducir", "Información del vehículo", "Información del seguro existente", "Historial de reclamaciones", "Información bancaria"] }
        },
        automatic: {
          title: { fr: "Données collectées automatiquement", en: "Automatically collected data", ar: "البيانات المجمعة تلقائيًا", es: "Datos recopilados automáticamente" },
          items: { fr: ["Adresse IP", "Type de navigateur", "Système d'exploitation", "Pages visitées", "Date et heure de la visite", "Liens cliqués", "Appareil utilisé"], en: ["IP address", "Browser type", "Operating system", "Pages visited", "Date and time of visit", "Links clicked", "Device used"], ar: ["عنوان IP", "نوع المتصفح", "نظام التشغيل", "الصفحات المزارة", "تاريخ ووقت الزيارة", "الروابط النقر عليها", "الجهاز المستخدم"], es: ["Dirección IP", "Tipo de navegador", "Sistema operativo", "Páginas visitadas", "Fecha y hora de la visita", "Enlaces en los que se hizo clic", "Dispositivo utilizado"] }
        }
      },

      dataUse: {
        icon: Eye,
        title: { fr: "Utilisation des Données", en: "Use of Data", ar: "استخدام البيانات", es: "Uso de los Datos" },
        items: { fr: ["Fournir nos services d'assurance et de conseil", "Traiter vos demandes de devis et de couverture", "Gérer votre dossier d'assurance", "Communiquer avec vous concernant nos produits et services", "Répondre à vos questions et demandes d'assistance", "Améliorer notre site web et nos services", "Respecter nos obligations légales et réglementaires", "Prévenir la fraude et les abus", "Vous informer des modifications de nos services", "Analyser les tendances et statistiques"], en: ["Provide our insurance and advisory services", "Process your quote and coverage requests", "Manage your insurance file", "Communicate with you about our products and services", "Respond to your questions and support requests", "Improve our website and services", "Comply with our legal and regulatory obligations", "Prevent fraud and abuse", "Inform you of changes to our services", "Analyze trends and statistics"], ar: ["تقديم خدماتنا للتأمين والاستشارات", "معالجة طلبات العرض والتغطية", "إدارة ملف التأمين الخاص بك", "التواصل معك بشأن منتجاتنا وخدماتنا", "الرد على أسئلتك وطلبات المساعدة", "تحسين موقعنا وخدماتنا", "الامتثال لالتزاماتنا القانونية والتنظيمية", "منع الاحتيال وإساءة الاستخدام", "إعلامك بتغييرات خدماتنا", "تحليل الاتجاهات والإحصائيات"], es: ["Proporcionar nuestros servicios de seguros y asesoramiento", "Procesar sus solicitudes de presupuesto y cobertura", "Gestionar su expediente de seguro", "Comunicarnos con usted sobre nuestros productos y servicios", "Responder a sus preguntas y solicitudes de asistencia", "Mejorar nuestro sitio web y servicios", "Cumplir con nuestras obligaciones legales y regulatorias", "Prevenir el fraude y el abuso", "Informarle sobre cambios en nuestros servicios", "Analizar tendencias y estadísticas"] }
      },

      legalBasis: {
        icon: Scale,
        title: { fr: "Base Légale du Traitement", en: "Legal Basis", ar: "الأساس القانوني", es: "Base Legal" },
        items: {
          fr: [
            { title: "Exécution d'un contrat", desc: "Nécessaire à l'exécution de vos contrats d'assurance" },
            { title: "Consentement", desc: "Vous avez donné votre consentement explicite" },
            { title: "Intérêt légitime", desc: "Nécessaire à nos intérêts légitimes" },
            { title: "Obligation légale", desc: "Respect de nos obligations légales" }
          ],
          en: [
            { title: "Contract performance", desc: "Necessary for your insurance contracts" },
            { title: "Consent", desc: "You have given your explicit consent" },
            { title: "Legitimate interest", desc: "Necessary for our legitimate interests" },
            { title: "Legal obligation", desc: "Compliance with legal obligations" }
          ],
          ar: [
            { title: "تنفيذ عقد", desc: "ضروري لعقود التأمين الخاصة بك" },
            { title: "الموافقة", desc: "لقد أعطيت موافقتك الصريحة" },
            { title: "المصلحة المشروعة", desc: "ضروري لمصالحنا المشروعة" },
            { title: "الالتزام القانوني", desc: "الامتثال للالتزامات القانونية" }
          ],
          es: [
            { title: "Ejecución de un contrato", desc: "Necesario para sus contratos de seguros" },
            { title: "Consentimiento", desc: "Ha dado su consentimiento explícito" },
            { title: "Interés legítimo", desc: "Necesario para nuestros intereses legítimos" },
            { title: "Obligación legal", desc: "Cumplimiento de obligaciones legales" }
          ]
        }
      },

      yourRights: {
        icon: Shield,
        title: { fr: "Vos Droits", en: "Your Rights", ar: "حقوقك", es: "Sus Derechos" },
        items: {
          fr: [
            { icon: Eye, title: "Droit d'accès", desc: "Obtenir une copie de vos données" },
            { icon: Edit, title: "Droit de rectification", desc: "Corriger vos données inexactes" },
            { icon: Trash2, title: "Droit à l'effacement", desc: "Supprimer vos données" },
            { icon: XCircle, title: "Droit d'opposition", desc: "Vous opposer au traitement" },
            { icon: Clock, title: "Droit à la limitation", desc: "Limiter le traitement" },
            { icon: Download, title: "Droit à la portabilité", desc: "Recevoir vos données" }
          ],
          en: [
            { icon: Eye, title: "Right of access", desc: "Obtain a copy of your data" },
            { icon: Edit, title: "Right to rectification", desc: "Correct inaccurate data" },
            { icon: Trash2, title: "Right to erasure", desc: "Delete your data" },
            { icon: XCircle, title: "Right to object", desc: "Object to processing" },
            { icon: Clock, title: "Right to restriction", desc: "Restrict processing" },
            { icon: Download, title: "Right to portability", desc: "Receive your data" }
          ],
          ar: [
            { icon: Eye, title: "حق الوصول", desc: "الحصول على نسخة من بياناتك" },
            { icon: Edit, title: "حق التصحيح", desc: "تصحيح البيانات غير الدقيقة" },
            { icon: Trash2, title: "حق المحو", desc: "حذف بياناتك" },
            { icon: XCircle, title: "حق الاعتراض", desc: "الاعتراض على المعالجة" },
            { icon: Clock, title: "حق التقييد", desc: "تقييد المعالجة" },
            { icon: Download, title: "حق النقل", desc: "استلام بياناتك" }
          ],
          es: [
            { icon: Eye, title: "Derecho de acceso", desc: "Obtener una copia de sus datos" },
            { icon: Edit, title: "Derecho de rectificación", desc: "Corregir datos inexactos" },
            { icon: Trash2, title: "Derecho de supresión", desc: "Eliminar sus datos" },
            { icon: XCircle, title: "Derecho de oposición", desc: "Oponerse al tratamiento" },
            { icon: Clock, title: "Derecho a la limitación", desc: "Limitar el tratamiento" },
            { icon: Download, title: "Derecho a la portabilidad", desc: "Recibir sus datos" }
          ]
        },
        contact: { fr: "Pour exercer vos droits, contactez-nous :", en: "To exercise your rights, contact us:", ar: "لممارسة حقوقك، تواصل معنا:", es: "Para ejercer sus derechos, contáctenos:" }
      },

      cookies: {
        icon: Cookie,
        title: { fr: "Cookies", en: "Cookies", ar: "ملفات تعريف الارتباط", es: "Cookies" },
        content: { fr: "Notre site utilise des cookies pour améliorer votre expérience de navigation.", en: "Our site uses cookies to improve your browsing experience.", ar: "يستخدم موقعنا ملفات تعريف الارتباط لتحسين تجربة التصفح الخاصة بك.", es: "Nuestro sitio utiliza cookies para mejorar su experiencia de navegación." },
        types: {
          fr: [
            { title: "Cookies essentiels", desc: "Nécessaires au fonctionnement" },
            { title: "Cookies analytiques", desc: "Analyser l'utilisation" },
            { title: "Cookies de personnalisation", desc: "Mémoriser vos préférences" }
          ],
          en: [
            { title: "Essential cookies", desc: "Necessary for operation" },
            { title: "Analytical cookies", desc: "Analyze usage" },
            { title: "Personalization cookies", desc: "Remember preferences" }
          ],
          ar: [
            { title: "الأساسية", desc: "ضرورية للتشغيل" },
            { title: "التحليلية", desc: "تحليل الاستخدام" },
            { title: "التخصيص", desc: "حفظ التفضيلات" }
          ],
          es: [
            { title: "Esenciales", desc: "Necesarias para el funcionamiento" },
            { title: "Analíticos", desc: "Analizar el uso" },
            { title: "Personalización", desc: "Recordar preferencias" }
          ]
        }
      },

      security: {
        icon: Lock,
        title: { fr: "Sécurité des Données", en: "Data Security", ar: "أمان البيانات", es: "Seguridad de Datos" },
        items: { fr: ["Chiffrement des données", "Pare-feu et détection d'intrusion", "Contrôle d'accès strict", "Sauvegardes régulières", "Formation du personnel", "Audits de sécurité réguliers"], en: ["Data encryption", "Firewall and intrusion detection", "Strict access control", "Regular backups", "Staff training", "Regular security audits"], ar: ["تشفير البيانات", "جدران الحماية وكشف التسلل", "الوصول الصارم", "النسخ الاحتياطي المنتظم", "تدريب الموظفين", "تدقيق أمني منتظم"], es: ["Cifrado de datos", "Firewall y detección de intrusiones", "Control de acceso estricto", "Copias de seguridad regulares", "Capacitación del personal", "Auditorías de seguridad regulares"] }
      },

      retention: {
        icon: Clock,
        title: { fr: "Conservation des Données", en: "Data Retention", ar: "الاحتفاظ بالبيانات", es: "Retención de Datos" },
        items: { fr: ["Données de contrat : durée + 5 ans", "Données comptables : 10 ans", "Données de candidature : 2 ans", "Données de navigation : 12 mois"], en: ["Contract data: duration + 5 years", "Accounting data: 10 years", "Application data: 2 years", "Browsing data: 12 months"], ar: ["بيانات العقد: المدة + 5 سنوات", "البيانات المحاسبية: 10 سنوات", "بيانات الطلب: سنتان", "بيانات التصفح: 12 شهرًا"], es: ["Datos de contrato: duración + 5 años", "Datos contables: 10 años", "Datos de solicitud: 2 años", "Datos de navegación: 12 meses"] }
      }
    }
  };

  // Helper to get nested items
  const getSectionItems = (section: string, subSection?: string) => {
    const data = content.sections[section as keyof typeof content.sections];
    if (subSection && 'items' in data && data.items && typeof data.items === 'object' && !Array.isArray(data.items)) {
      const itemsObj = data.items as Record<string, any>;
      return itemsObj[lang] || itemsObj.fr;
    }
    if ('items' in data && data.items) {
      const itemsArray = data.items as Record<string, string[]>;
      return itemsArray[lang] || itemsArray.fr;
    }
    return [];
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      dir={isRTL ? "rtl" : "ltr"}
      className="min-h-screen bg-gradient-to-b from-slate-50 to-white"
    >
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-primary/70 rounded-2xl shadow-lg mb-6 mx-auto">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:5xl lg:text-6xl font-bold text-slate-900 mb-4">
              {t(content.meta.title)}
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {t(content.meta.subtitle)}
            </p>
            <p className="text-sm text-slate-400 mt-4">
              {t({ fr: "Dernière mise à jour", en: "Last updated", ar: "آخر تحديث", es: "Última actualización" })} : {content.meta.lastUpdate}
            </p>
          </motion.div>

          {/* Content Grid */}
          <div className="space-y-6">
            {/* Regulatory Framework - Highlighted */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl p-6 border-l-4 border-primary"
            >
              <div className="flex items-start gap-4">
                <Scale className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-semibold text-primary mb-2">{t(content.sections.regulatory.title)}</h2>
                  <p className="text-slate-600 mb-3">{t(content.sections.regulatory.content)}</p>
                  <div className="flex flex-wrap gap-2">
                    {getSectionItems('regulatory').map((item: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">✓ {item}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Introduction */}
            <SectionCard icon={FileText} title={t(content.sections.introduction.title)} delay={0.15}>
              <p className="text-slate-600 leading-relaxed">{t(content.sections.introduction.content)}</p>
            </SectionCard>

            {/* Data Controller & DPO */}
            <div className="grid md:grid-cols-2 gap-6">
              <SectionCard icon={content.sections.dataController.icon} title={t(content.sections.dataController.title)} delay={0.2}>
                <p className="text-slate-600 mb-3">{t(content.sections.dataController.content)}</p>
                <div className="bg-slate-50 rounded-xl p-4 text-sm whitespace-pre-line font-mono">
                  {t(content.sections.dataController.details)}
                </div>
              </SectionCard>

              <SectionCard icon={content.sections.dpo.icon} title={t(content.sections.dpo.title)} delay={0.25}>
                <p className="text-slate-600 mb-3">{t(content.sections.dpo.content)}</p>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-slate-600 text-sm mb-2">
                    <strong className="text-slate-900">Email:</strong>{" "}
                    <a href="mailto:info@cpa.ma" className="text-primary hover:underline">info@cpa.ma</a>
                  </p>
                  <p className="text-slate-500 text-sm">{t(content.sections.dpo.note)}</p>
                </div>
              </SectionCard>
            </div>

            {/* Data Collection */}
            <SectionCard icon={content.sections.dataCollection.icon} title={t(content.sections.dataCollection.title)} delay={0.3}>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-slate-800 mb-3">{t(content.sections.dataCollection.personal.title)}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {getSectionItems('dataCollection', 'personal').map((item: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 text-slate-600">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-3">{t(content.sections.dataCollection.automatic.title)}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {getSectionItems('dataCollection', 'automatic').map((item: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 text-slate-600">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Data Use */}
            <SectionCard icon={content.sections.dataUse.icon} title={t(content.sections.dataUse.title)} delay={0.35}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {getSectionItems('dataUse').map((item: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-slate-600 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Legal Basis & Security */}
            <div className="grid md:grid-cols-2 gap-6">
              <SectionCard icon={content.sections.legalBasis.icon} title={t(content.sections.legalBasis.title)} delay={0.4}>
                <div className="space-y-3">
                  {content.sections.legalBasis.items[lang as keyof typeof content.sections.legalBasis.items]?.map((item: any, idx: number) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-lg">
                      <h4 className="font-medium text-slate-800 mb-1">{item.title}</h4>
                      <p className="text-slate-500 text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </SectionCard>

              <SectionCard icon={content.sections.security.icon} title={t(content.sections.security.title)} delay={0.45}>
                <div className="flex flex-wrap gap-2">
                  {getSectionItems('security').map((item: string, idx: number) => (
                    <span key={idx} className="px-3 py-1.5 bg-slate-100 text-slate-600 text-sm rounded-full">🔒 {item}</span>
                  ))}
                </div>
              </SectionCard>
            </div>

            {/* Your Rights */}
            <SectionCard icon={content.sections.yourRights.icon} title={t(content.sections.yourRights.title)} delay={0.5}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {content.sections.yourRights.items[lang as keyof typeof content.sections.yourRights.items]?.map((right: any, idx: number) => {
                  const IconComponent = right.icon;
                  return (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <IconComponent className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-800">{right.title}</h4>
                        <p className="text-slate-500 text-sm">{right.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="bg-primary/5 rounded-xl p-4">
                <p className="text-slate-600 mb-2">{t(content.sections.yourRights.contact)}</p>
                <div className="flex flex-wrap gap-4">
                  <a href="mailto:info@cpa.ma" className="flex items-center gap-2 text-primary hover:underline">
                    <Mail className="w-4 h-4" /> info@cpa.ma
                  </a>
                  <a href="tel:+212522953900" className="flex items-center gap-2 text-primary hover:underline">
                    <Phone className="w-4 h-4" /> +212 5 22 95 39 00
                  </a>
                </div>
              </div>
            </SectionCard>

            {/* Cookies & Retention */}
            <div className="grid md:grid-cols-2 gap-6">
              <SectionCard icon={content.sections.cookies.icon} title={t(content.sections.cookies.title)} delay={0.55}>
                <p className="text-slate-600 mb-4">{t(content.sections.cookies.content)}</p>
                <div className="space-y-2">
                  {content.sections.cookies.types[lang as keyof typeof content.sections.cookies.types]?.map((type: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center p-2 border-b border-slate-100">
                      <span className="text-sm font-medium text-slate-700">{type.title}</span>
                      <span className="text-xs text-slate-400">{type.desc}</span>
                    </div>
                  ))}
                </div>
              </SectionCard>

              <SectionCard icon={content.sections.retention.icon} title={t(content.sections.retention.title)} delay={0.6}>
                <div className="space-y-3">
                  {getSectionItems('retention').map((item: string, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-600 text-sm">{item.split(':')[0]}</span>
                      <span className="text-primary font-medium text-sm">{item.split(':')[1]}</span>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>

            {/* Contact Footer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="bg-slate-900 rounded-2xl p-8 text-center mt-8"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {t({ fr: "Une question ?", en: "Have a question?", ar: "لديك سؤال؟", es: "¿Tiene una pregunta?" })}
              </h3>
              <p className="text-slate-300 mb-4">
                {t({ fr: "Notre équipe est à votre disposition", en: "Our team is at your disposal", ar: "فريقنا في خدمتك", es: "Nuestro equipo está a su disposición" })}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="mailto:info@cpa.ma" className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
                  info@cpa.ma
                </a>
                <a href="tel:+212522953900" className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
                  +212 5 22 95 39 00
                </a>
              </div>
              <p className="text-slate-400 text-sm mt-4">
                CPA - Angle Boulevard Moulay Youssef et Boulevard Ziraoui, Casablanca, Maroc
              </p>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
};

// Reusable Section Card Component
const SectionCard = ({ 
  icon: Icon, 
  title, 
  children, 
  delay = 0 
}: { 
  icon: React.ElementType; 
  title: string; 
  children: React.ReactNode; 
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-primary/10 rounded-xl">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
    </div>
    {children}
  </motion.div>
);

export default PolitiqueConfidentialitePage;