import { motion } from "framer-motion";
import { Car, Home, HeartPulse, Shield, Briefcase, PiggyBank, HardHat, Zap } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const servicesData: Record<string, { icon: typeof Car; title: string; description: string }[]> = {
  fr: [
    { icon: Car, title: "Assurance Automobile", description: "Le meilleur rapport qualité/prix pour protéger votre véhicule avec des garanties complètes." },
    { icon: Home, title: "Multirisque Habitation", description: "Protection contre le vol, l'incendie, les dégâts des eaux et bien plus encore." },
    { icon: HeartPulse, title: "Prévoyance & Santé", description: "Couverture complète en cas de maladie ou d'accident pour vous et votre famille." },
    { icon: Shield, title: "Assistance", description: "Des solutions qui vous permettent de protéger votre avenir et celui de votre famille." },
    { icon: Briefcase, title: "Accidents de Travail", description: "Assurance obligatoire pour les entreprises, protégez vos collaborateurs." },
    { icon: PiggyBank, title: "Épargne", description: "Solutions d'épargne et de capitalisation pour protéger et faire fructifier votre avenir." },
    { icon: HardHat, title: "Construction", description: "Couverture complète des chantiers, responsabilité civile décennale et tous risques." },
    { icon: Zap, title: "Cyber Risques", description: "Protégez vos données numériques et votre entreprise contre les menaces cyber." },
  ],
  en: [
    { icon: Car, title: "Auto Insurance", description: "Best value to protect your vehicle with comprehensive coverage." },
    { icon: Home, title: "Home Multi-Risk", description: "Protection against theft, fire, water damage and more." },
    { icon: HeartPulse, title: "Health & Foresight", description: "Complete coverage for illness or accident for you and your family." },
    { icon: Shield, title: "Assistance", description: "Solutions to protect your future and your family's." },
    { icon: Briefcase, title: "Work Accidents", description: "Mandatory insurance for businesses, protect your employees." },
    { icon: PiggyBank, title: "Savings", description: "Savings and capitalization solutions to protect and grow your future." },
    { icon: HardHat, title: "Construction", description: "Complete site coverage, ten-year liability and all risks." },
    { icon: Zap, title: "Cyber Risks", description: "Protect your digital data and business against cyber threats." },
  ],
  ar: [
    { icon: Car, title: "تأمين السيارات", description: "أفضل قيمة لحماية سيارتك بتغطية شاملة." },
    { icon: Home, title: "تأمين المنزل", description: "الحماية ضد السرقة والحريق وأضرار المياه." },
    { icon: HeartPulse, title: "الصحة والتأمين التكميلي", description: "تغطية شاملة في حالة المرض أو الحادث." },
    { icon: Shield, title: "المساعدة", description: "حلول لحماية مستقبلك ومستقبل عائلتك." },
    { icon: Briefcase, title: "حوادث العمل", description: "تأمين إلزامي للشركات." },
    { icon: PiggyBank, title: "الادخار", description: "حلول ادخار لحماية وتنمية مستقبلك." },
    { icon: HardHat, title: "البناء", description: "تغطية شاملة للمشاريع والمسؤولية العشرية." },
    { icon: Zap, title: "المخاطر السيبرانية", description: "احمِ بياناتك الرقمية وشركتك." },
  ],
  es: [
    { icon: Car, title: "Seguro de Auto", description: "La mejor relación calidad/precio para proteger su vehículo." },
    { icon: Home, title: "Multirriesgo Hogar", description: "Protección contra robo, incendio, daños por agua y más." },
    { icon: HeartPulse, title: "Salud y Previsión", description: "Cobertura completa en caso de enfermedad o accidente." },
    { icon: Shield, title: "Asistencia", description: "Soluciones para proteger su futuro y el de su familia." },
    { icon: Briefcase, title: "Accidentes Laborales", description: "Seguro obligatorio para empresas." },
    { icon: PiggyBank, title: "Ahorro", description: "Soluciones de ahorro para proteger y hacer crecer su futuro." },
    { icon: HardHat, title: "Construcción", description: "Cobertura completa de obras y responsabilidad decenal." },
    { icon: Zap, title: "Riesgos Cibernéticos", description: "Proteja sus datos digitales y su empresa." },
  ],
};

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, type: "spring" as const, stiffness: 100 } },
};

const ServicesSection = () => {
  const { t, lang } = useLanguage();
  const services = servicesData[lang] || servicesData.fr;

  return (
    <section id="services" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-block text-accent font-semibold text-sm tracking-wide uppercase"
          >
            {t("services_badge")}
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-foreground mt-3 mb-4">{t("services_title")}</h2>
          <p className="text-muted-foreground text-lg font-body">{t("services_desc")}</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.03, transition: { duration: 0.3 } }}
              className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-all cpa-shadow hover:cpa-shadow-lg cursor-pointer"
            >
              <motion.div
                className="w-14 h-14 rounded-xl cpa-gradient-bg flex items-center justify-center mb-5"
                whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
              >
                <service.icon className="w-7 h-7 text-primary-foreground" />
              </motion.div>
              <h3 className="font-heading font-bold text-foreground text-lg mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
