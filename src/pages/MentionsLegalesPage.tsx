import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { Shield, FileText, Eye, Cookie, MapPin, Mail, Phone, Building, User, Scale, Lock } from "lucide-react";

const MentionsLegalesPage = () => {
  const { lang } = useLanguage();
  const isRTL = lang === "ar";

  const t = (obj: Record<string, string>) => obj[lang] || obj.fr;

  const content = {
    meta: {
      title: { fr: "Mentions Légales & Confidentialité", en: "Legal Notice & Privacy", ar: "إشعارات قانونية وسرية", es: "Aviso Legal y Privacidad" },
      subtitle: { fr: "CPA – Conseil et Placement d'Assurances", en: "CPA – Insurance Consulting and Placement", ar: "CPA – الاستشارات ووضع التأمين", es: "CPA – Consultoría y Colocación de Seguros" }
    },
    company: {
      title: { fr: "Informations légales", en: "Legal Information", ar: "معلومات قانونية", es: "Información Legal" },
      name: "CPA – Conseil et Placement d’Assurances",
      legalForm: { fr: "Société Anonyme (S.A.)", en: "Public Limited Company (S.A.)", ar: "شركة مساهمة (S.A.)", es: "Sociedad Anónima (S.A.)" },
      capital: "5 000 000 DH",
      rc: "25601",
      ice: "001518917000065",
      address: { fr: "Angle Boulevard Moulay Youssef et Boulevard Ziraoui, Complexe Moulay Youssef Work Center, 2ème Étage, Casablanca – Maroc", en: "Angle Boulevard Moulay Youssef and Boulevard Ziraoui, Complexe Moulay Youssef Work Center, 2nd Floor, Casablanca – Morocco", ar: "زاوية شارع مولاي يوسف وشارع الزراوي، مجمع مولاي يوسف وورك سنتر، الطابق الثاني، الدار البيضاء – المغرب", es: "Esquina Boulevard Moulay Youssef y Boulevard Ziraoui, Complejo Moulay Youssef Work Center, 2º Piso, Casablanca – Marruecos" },
      phone: "+212 5 22 95 39 00",
      email: "info@cpa.ma"
    },
    publication: {
      title: { fr: "Directeur de publication", en: "Publication Director", ar: "مدير النشر", es: "Director de Publicación" },
      name: "Jalal Ennouni"
    },
    intellectualProperty: {
      title: { fr: "Propriété intellectuelle", en: "Intellectual Property", ar: "الملكية الفكرية", es: "Propiedad Intelectual" },
      text: { fr: "Tous les contenus du site sont protégés par les lois relatives à la propriété intellectuelle. Toute reproduction sans autorisation est interdite.", en: "All site content is protected by intellectual property laws. Any reproduction without authorization is prohibited.", ar: "جميع محتويات الموقع محمية بقوانين الملكية الفكرية. أي نسخ دون إذن ممنوع.", es: "Todos los contenidos del sitio están protegidos por las leyes de propiedad intelectual. Cualquier reproducción sin autorización está prohibida." }
    },
    responsibility: {
      title: { fr: "Responsabilité", en: "Liability", ar: "المسؤولية", es: "Responsabilidad" },
      text: { fr: "CPA s'efforce d'assurer l'exactitude des informations publiées sans garantir l'absence d'erreurs.", en: "CPA strives to ensure the accuracy of published information without guaranteeing the absence of errors.", ar: "تبذل CPA قصارى جهدها لضمان دقة المعلومات المنشورة دون ضمان عدم وجود أخطاء.", es: "CPA se esfuerza por garantizar la exactitud de la información publicada sin garantizar la ausencia de errores." }
    },
    privacy: {
      title: { fr: "Protection des données personnelles", en: "Personal Data Protection", ar: "حماية البيانات الشخصية", es: "Protección de Datos Personales" },
      text: { fr: "Les données personnelles collectées via le site sont utilisées uniquement dans le cadre des demandes clients et sont traitées conformément à la loi marocaine 09-08.", en: "Personal data collected via the site is used solely for customer requests and is processed in accordance with Moroccan Law 09-08.", ar: "تُستخدم البيانات الشخصية التي يتم جمعها عبر الموقع فقط في إطار طلبات العملاء ويتم معالجتها وفقًا للقانون المغربي 09-08.", es: "Los datos personales recopilados a través del sitio se utilizan únicamente para solicitudes de clientes y se tratan de acuerdo con la ley marroquí 09-08." }
    },
    cookies: {
      title: { fr: "Cookies", en: "Cookies", ar: "ملفات تعريف الارتباط", es: "Cookies" },
      text: { fr: "Le site utilise des cookies pour améliorer l'expérience utilisateur et mesurer l'audience.", en: "The site uses cookies to improve user experience and measure traffic.", ar: "يستخدم الموقع ملفات تعريف الارتباط لتحسين تجربة المستخدم وقياس الجمهور.", es: "El sitio utiliza cookies para mejorar la experiencia del usuario y medir la audiencia." }
    },
    governingLaw: {
      title: { fr: "Droit applicable", en: "Governing Law", ar: "القانون الواجب التطبيق", es: "Ley aplicable" },
      text: { fr: "Le présent site est soumis au droit marocain.", en: "This site is subject to Moroccan law.", ar: "هذا الموقع يخضع للقانون المغربي.", es: "Este sitio está sujeto a la ley marroquí." }
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
          </motion.div>

          {/* Content Grid */}
          <div className="space-y-6">
            {/* Legal Information */}
            <SectionCard icon={Building} title={t(content.company.title)} delay={0.1}>
              <div className="space-y-3 text-slate-600">
                <p><strong className="text-slate-800">CPA – Conseil et Placement d’Assurances</strong></p>
                <p><span className="font-medium">{t(content.company.legalForm)}</span> – {t({ fr: "Capital", en: "Capital", ar: "رأس المال", es: "Capital" })}: {content.company.capital}</p>
                <p><span className="font-medium">RC:</span> {content.company.rc} – <span className="font-medium">ICE:</span> {content.company.ice}</p>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <span>{t(content.company.address)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  <a href={`tel:${content.company.phone}`} className="text-primary hover:underline">{content.company.phone}</a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  <a href={`mailto:${content.company.email}`} className="text-primary hover:underline">{content.company.email}</a>
                </div>
              </div>
            </SectionCard>

            {/* Publication Director */}
            <SectionCard icon={User} title={t(content.publication.title)} delay={0.2}>
              <p className="text-slate-600">
                <span className="font-medium">{t({ fr: "Directeur de publication", en: "Publication Director", ar: "مدير النشر", es: "Director de Publicación" })} :</span> {content.publication.name}
              </p>
            </SectionCard>

            {/* Intellectual Property */}
            <SectionCard icon={FileText} title={t(content.intellectualProperty.title)} delay={0.3}>
              <p className="text-slate-600">{t(content.intellectualProperty.text)}</p>
            </SectionCard>

            {/* Responsibility */}
            <SectionCard icon={Scale} title={t(content.responsibility.title)} delay={0.35}>
              <p className="text-slate-600">{t(content.responsibility.text)}</p>
            </SectionCard>

            {/* Privacy & Cookies - Two columns */}
            <div className="grid md:grid-cols-2 gap-6">
              <SectionCard icon={Lock} title={t(content.privacy.title)} delay={0.4}>
                <p className="text-slate-600">{t(content.privacy.text)}</p>
              </SectionCard>

              <SectionCard icon={Cookie} title={t(content.cookies.title)} delay={0.45}>
                <p className="text-slate-600">{t(content.cookies.text)}</p>
              </SectionCard>
            </div>

            {/* Governing Law */}
            <SectionCard icon={Scale} title={t(content.governingLaw.title)} delay={0.5}>
              <p className="text-slate-600">{t(content.governingLaw.text)}</p>
            </SectionCard>

            {/* Contact Footer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
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
                <a href={`mailto:${content.company.email}`} className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
                  {content.company.email}
                </a>
                <a href={`tel:${content.company.phone}`} className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
                  {content.company.phone}
                </a>
              </div>
              <p className="text-slate-400 text-sm mt-4">
                {t(content.company.address)}
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

export default MentionsLegalesPage;