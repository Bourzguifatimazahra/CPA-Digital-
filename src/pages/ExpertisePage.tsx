import { motion } from "framer-motion";
import { Lightbulb, ShieldCheck, Handshake, RefreshCw, FileCheck, HeadphonesIcon } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const expertiseItems = [
  {
    icon: Lightbulb,
    title: { fr: "Solutions complètes pour les besoins clients", en: "Complete solutions for client needs", ar: "حلول متكاملة لاحتياجات العملاء", es: "Soluciones completas para las necesidades del cliente" },
    desc: { fr: "Des offres personnalisées couvrant l'ensemble de vos risques. Nous analysons votre situation pour vous proposer la couverture la plus adaptée, en tenant compte de votre budget et de vos priorités.", en: "Personalized offers covering all your risks. We analyze your situation to propose the most adapted coverage.", ar: "عروض مخصصة تغطي جميع مخاطركم. نحلل وضعكم لنقترح التغطية الأنسب.", es: "Ofertas personalizadas que cubren todos sus riesgos. Analizamos su situación para proponer la cobertura más adaptada." },
  },
  {
    icon: ShieldCheck,
    title: { fr: "Gestion des risques et responsabilités", en: "Risk and liability management", ar: "إدارة المخاطر والمسؤوليات", es: "Gestión de riesgos y responsabilidades" },
    desc: { fr: "Accompagnement environnemental et responsabilités civiles. Nous identifions et évaluons vos risques pour mettre en place les protections nécessaires et vous accompagner en cas de Accident.", en: "Environmental support and civil liabilities. We identify and evaluate your risks to implement necessary protections.", ar: "دعم بيئي ومسؤوليات مدنية. نحدد ونقيم مخاطركم لتنفيذ الحماية اللازمة.", es: "Apoyo ambiental y responsabilidades civiles. Identificamos y evaluamos sus riesgos para implementar las protecciones necesarias." },
  },
  {
    icon: Handshake,
    title: { fr: "Accompagnement de qualité", en: "Quality support", ar: "دعم عالي الجودة", es: "Acompañamiento de calidad" },
    desc: { fr: "Un suivi personnalisé et une protection optimale. Votre conseiller dédié vous accompagne à chaque étape, de la souscription à la gestion de vos Accidents, avec réactivité et professionnalisme.", en: "Personalized follow-up and optimal protection. Your dedicated advisor accompanies you at every step.", ar: "متابعة شخصية وحماية مثلى. مستشارك المخصص يرافقك في كل خطوة.", es: "Seguimiento personalizado y protección óptima. Su asesor dedicado le acompaña en cada paso." },
  },
  {
    icon: RefreshCw,
    title: { fr: "Révision selon vos besoins", en: "Review based on your needs", ar: "مراجعة حسب احتياجاتكم", es: "Revisión según sus necesidades" },
    desc: { fr: "Adaptation continue de vos contrats à votre réalité. Nous révisons régulièrement vos garanties pour qu'elles correspondent toujours à l'évolution de votre situation personnelle ou professionnelle.", en: "Continuous adaptation of your contracts to your reality. We regularly review your guarantees.", ar: "تكييف مستمر لعقودكم مع واقعكم. نراجع ضماناتكم بانتظام.", es: "Adaptación continua de sus contratos a su realidad. Revisamos regularmente sus garantías." },
  },
  {
    icon: FileCheck,
    title: { fr: "Renouvellements", en: "Renewals", ar: "التجديدات", es: "Renovaciones" },
    desc: { fr: "Gestion proactive des renouvellements et négociations. Nous anticipons chaque échéance pour vous garantir les meilleures conditions de renouvellement et négocier en votre faveur auprès des compagnies.", en: "Proactive renewal management and negotiations. We anticipate each deadline to guarantee the best renewal conditions.", ar: "إدارة استباقية للتجديدات والمفاوضات. نستبق كل موعد لضمان أفضل شروط التجديد.", es: "Gestión proactiva de renovaciones y negociaciones. Anticipamos cada vencimiento para garantizar las mejores condiciones." },
  },
  {
    icon: HeadphonesIcon,
    title: { fr: "Assistance administrative", en: "Administrative assistance", ar: "المساعدة الإدارية", es: "Asistencia administrativa" },
    desc: { fr: "Support complet dans toutes vos démarches administratives. De la déclaration de Accident au suivi des indemnisations, nous gérons l'ensemble de vos formalités pour vous simplifier la vie.", en: "Complete support in all your administrative procedures. From claims declaration to compensation monitoring.", ar: "دعم كامل في جميع إجراءاتكم الإدارية. من إعلان الحادث إلى متابعة التعويضات.", es: "Soporte completo en todos sus trámites administrativos. Desde la declaración de siniestro hasta el seguimiento de indemnizaciones." },
  },
];

const ExpertisePage = () => {
  const { lang } = useLanguage();
  const t = (obj: Record<string, string>) => obj[lang] || obj.fr;

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-28 pb-16 cpa-gradient-bg relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-heading font-extrabold text-primary-foreground mb-4">
            {lang === "fr" ? "Notre Expertise" : lang === "ar" ? "خبرتنا" : lang === "es" ? "Nuestra Experiencia" : "Our Expertise"}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-primary-foreground/80 text-lg max-w-2xl">
            {lang === "fr" ? "Un savoir-faire reconnu au service de votre protection depuis 1957." : lang === "ar" ? "خبرة معترف بها في خدمة حمايتكم منذ 1957." : lang === "es" ? "Un saber hacer reconocido al servicio de su protección desde 1957." : "Recognized expertise serving your protection since 1957."}
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0"><svg viewBox="0 0 1440 60" fill="none"><path d="M0 30L720 60L1440 30V60H0V30Z" fill="hsl(220 20% 97%)" /></svg></div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="space-y-8">
            {expertiseItems.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group bg-card rounded-2xl p-8 border border-border cpa-shadow hover:cpa-shadow-lg transition-all">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-xl cpa-gradient-bg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <item.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-foreground text-xl mb-3">{t(item.title)}</h3>
                    <p className="text-muted-foreground leading-relaxed">{t(item.desc)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ExpertisePage;
