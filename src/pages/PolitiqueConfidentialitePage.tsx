import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  Shield, FileText, Mail, Phone, MapPin, Cookie, Eye,
  UserCheck, Database, Scale, Lock
} from "lucide-react";

const PolitiqueConfidentialitePage = () => {
  const { lang } = useLanguage();
  const isRTL = lang === "ar";

  const t = (obj: Record<string, string>) => obj[lang] || obj.fr;

  const content = {
    meta: {
      title: { fr: "Politique de Protection des Données", en: "Data Protection Policy", ar: "سياسة حماية البيانات", es: "Política de Protección de Datos" },
      subtitle: { fr: "Protection de vos données personnelles", en: "Protecting Your Personal Data", ar: "حماية بياناتك الشخصية", es: "Protección de Sus Datos Personales" },
      lastUpdate: "Mars 2026"
    },
    intro: {
      title: { fr: "Introduction", en: "Introduction", ar: "مقدمة", es: "Introducción" },
      text: { fr: "CPA – Conseil et Placement d’Assurances collecte et traite vos données personnelles conformément à la loi marocaine n°09-08 relative à la protection des données à caractère personnel.", en: "CPA collects and processes your personal data in accordance with Moroccan law No. 09-08 on the protection of personal data.", ar: "CPA تقوم بجمع ومعالجة بياناتك الشخصية وفقًا للقانون المغربي رقم 09-08 المتعلق بحماية البيانات الشخصية.", es: "CPA recopila y trata sus datos personales de acuerdo con la ley marroquí n°09-08 sobre la protección de datos personales." }
    },
    dataController: {
      icon: Shield,
      title: { fr: "Responsable du traitement", en: "Data Controller", ar: "مسؤول المعالجة", es: "Responsable del Tratamiento" },
      address: { fr: "Angle Boulevard Moulay Youssef et Boulevard Ziraoui, Casablanca – Maroc", en: "Angle Boulevard Moulay Youssef and Boulevard Ziraoui, Casablanca – Morocco", ar: "زاوية شارع مولاي يوسف وشارع الزراوي، الدار البيضاء – المغرب", es: "Esquina Boulevard Moulay Youssef y Boulevard Ziraoui, Casablanca – Marruecos" },
      email: "info@cpa.ma",
      phone: "+212 5 22 95 39 00"
    },
    dataCollected: {
      icon: Database,
      title: { fr: "Données collectées", en: "Data Collected", ar: "البيانات المجمعة", es: "Datos Recopilados" },
      list: {
        fr: [
          "répondre à vos demandes",
          "établir des devis d'assurance",
          "assurer le suivi client",
          "améliorer nos services"
        ],
        en: [
          "respond to your requests",
          "prepare insurance quotes",
          "ensure customer follow-up",
          "improve our services"
        ],
        ar: [
          "الرد على طلباتك",
          "إعداد عروض التأمين",
          "ضمان متابعة العملاء",
          "تحسين خدماتنا"
        ],
        es: [
          "responder a sus solicitudes",
          "preparar presupuestos de seguros",
          "garantizar el seguimiento al cliente",
          "mejorar nuestros servicios"
        ]
      }
    },
    yourRights: {
      icon: UserCheck,
      title: { fr: "Vos droits", en: "Your Rights", ar: "حقوقك", es: "Sus Derechos" },
      law: { fr: "Conformément à l'Article 5 de la loi 09-08, vous disposez :", en: "According to Article 5 of Law 09-08, you have:", ar: "وفقًا للمادة 5 من القانون 09-08، لديك:", es: "Según el Artículo 5 de la Ley 09-08, usted dispone:" },
      rights: {
        fr: [
          "d'un droit d'accès à vos données",
          "d'un droit de rectification",
          "d'un droit d'opposition au traitement de vos données"
        ],
        en: [
          "a right of access to your data",
          "a right of rectification",
          "a right to object to the processing of your data"
        ],
        ar: [
          "حق الوصول إلى بياناتك",
          "حق التصحيح",
          "حق الاعتراض على معالجة بياناتك"
        ],
        es: [
          "derecho de acceso a sus datos",
          "derecho de rectificación",
          "derecho de oposición al tratamiento de sus datos"
        ]
      },
      contact: { fr: "Pour exercer vos droits :", en: "To exercise your rights:", ar: "لممارسة حقوقك:", es: "Para ejercer sus derechos:" }
    },
    cookies: {
      icon: Cookie,
      title: { fr: "Cookies", en: "Cookies", ar: "ملفات تعريف الارتباط", es: "Cookies" },
      text: { fr: "Le site utilise des cookies afin d’améliorer l’expérience utilisateur et mesurer l’audience du site.", en: "The site uses cookies to improve user experience and measure site traffic.", ar: "يستخدم الموقع ملفات تعريف الارتباط لتحسين تجربة المستخدم وقياس زيارات الموقع.", es: "El sitio utiliza cookies para mejorar la experiencia del usuario y medir la audiencia del sitio." }
    },
    security: {
      icon: Lock,
      title: { fr: "Sécurité", en: "Security", ar: "الأمان", es: "Seguridad" },
      text: { fr: "CPA met en œuvre les mesures nécessaires afin d’assurer la confidentialité et la sécurité de vos données personnelles.", en: "CPA implements the necessary measures to ensure the confidentiality and security of your personal data.", ar: "CPA تقوم بتنفيذ التدابير اللازمة لضمان سرية وأمان بياناتك الشخصية.", es: "CPA implementa las medidas necesarias para garantizar la confidencialidad y seguridad de sus datos personales." }
    }
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
            {/* Introduction */}
            <SectionCard icon={FileText} title={t(content.intro.title)} delay={0.1}>
              <p className="text-slate-600 leading-relaxed">{t(content.intro.text)}</p>
            </SectionCard>

            {/* Data Controller */}
            <SectionCard icon={content.dataController.icon} title={t(content.dataController.title)} delay={0.2}>
              <div className="space-y-2 text-slate-600">
                <p className="font-semibold">CPA – Conseil et Placement d’Assurances</p>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{content.dataController.address.fr}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  <a href={`mailto:${content.dataController.email}`} className="text-primary hover:underline">{content.dataController.email}</a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  <a href={`tel:${content.dataController.phone}`} className="text-primary hover:underline">{content.dataController.phone}</a>
                </div>
              </div>
            </SectionCard>

            {/* Data Collected */}
            <SectionCard icon={content.dataCollected.icon} title={t(content.dataCollected.title)} delay={0.3}>
              <p className="text-slate-600 mb-3">
                {t({ fr: "Les données collectées via le site sont utilisées pour :", en: "Data collected via the site is used to:", ar: "البيانات التي تم جمعها عبر الموقع تستخدم لـ:", es: "Los datos recopilados a través del sitio se utilizan para:" })}
              </p>
              <ul className="space-y-2">
                {content.dataCollected.list[lang as keyof typeof content.dataCollected.list]?.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-600">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </SectionCard>

            {/* Your Rights */}
            <SectionCard icon={content.yourRights.icon} title={t(content.yourRights.title)} delay={0.4}>
              <p className="text-slate-600 mb-3">{t(content.yourRights.law)}</p>
              <ul className="space-y-2 mb-4">
                {content.yourRights.rights[lang as keyof typeof content.yourRights.rights]?.map((right: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-600">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                    <span>{right}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-primary/5 rounded-xl p-4">
                <p className="text-slate-600 mb-2">{t(content.yourRights.contact)}</p>
                <a href={`mailto:${content.dataController.email}`} className="flex items-center gap-2 text-primary hover:underline">
                  <Mail className="w-4 h-4" /> {content.dataController.email}
                </a>
              </div>
            </SectionCard>

            {/* Cookies & Security */}
            <div className="grid md:grid-cols-2 gap-6">
              <SectionCard icon={content.cookies.icon} title={t(content.cookies.title)} delay={0.5}>
                <p className="text-slate-600">{t(content.cookies.text)}</p>
              </SectionCard>

              <SectionCard icon={content.security.icon} title={t(content.security.title)} delay={0.55}>
                <p className="text-slate-600">{t(content.security.text)}</p>
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
                {t({ fr: "Une question ?", en: "Have a question?", ar: "هل لديك سؤال؟", es: "¿Tiene una pregunta?" })}
              </h3>
              <p className="text-slate-300 mb-4">
                {t({ fr: "Notre équipe est à votre disposition", en: "Our team is at your disposal", ar: "فريقنا في خدمتك", es: "Nuestro equipo está a su disposición" })}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href={`mailto:${content.dataController.email}`} className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
                  {content.dataController.email}
                </a>
                <a href={`tel:${content.dataController.phone}`} className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
                  {content.dataController.phone}
                </a>
              </div>
              <p className="text-slate-400 text-sm mt-4">
                {content.dataController.address.fr}
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