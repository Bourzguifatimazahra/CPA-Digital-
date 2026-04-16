import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { Lightbulb, ShieldCheck, Handshake, RefreshCw, FileCheck, HeadphonesIcon, Briefcase, Building2, Truck, Zap, Wrench, Users, HardHat, Plane, Heart, Landmark, Factory, Wheat, Droplets, GraduationCap } from "lucide-react";

const expertiseItems = [
  { icon: Lightbulb, title: { fr: "Solutions adaptées", en: "Tailored solutions", ar: "حلول مخصصة", es: "Soluciones adaptadas" } },
  { icon: ShieldCheck, title: { fr: "Analyse des risques", en: "Risk analysis", ar: "تحليل المخاطر", es: "Análisis de riesgos" } },
  { icon: Handshake, title: { fr: "Suivi personnalisé", en: "Personalized follow-up", ar: "متابعة شخصية", es: "Seguimiento personalizado" } },
  { icon: RefreshCw, title: { fr: "Révision continue", en: "Continuous review", ar: "مراجعة مستمرة", es: "Revisión continua" } },
  { icon: FileCheck, title: { fr: "Renouvellement facilité", en: "Facilitated renewal", ar: "تجديد ميسر", es: "Renovación facilitada" } },
  { icon: HeadphonesIcon, title: { fr: "Support administratif", en: "Administrative support", ar: "دعم إداري", es: "Soporte administrativo" } },
];

const domainsData = [
  { icon: Landmark, label: { fr: "Finance", en: "Finance", ar: "المالية", es: "Finanzas" } },
  { icon: Factory, label: { fr: "Industrie", en: "Industry", ar: "الصناعة", es: "Industria" } },
  { icon: Wheat, label: { fr: "Agroalimentaire", en: "Agri-Food", ar: "الصناعات الغذائية", es: "Agroalimentario" } },
  { icon: Heart, label: { fr: "Santé", en: "Healthcare", ar: "الصحة", es: "Salud" } },
  { icon: Zap, label: { fr: "Énergies", en: "Energy", ar: "الطاقة", es: "Energía" } },
  { icon: Droplets, label: { fr: "Eaux", en: "Water", ar: "المياه", es: "Agua" } },
  { icon: Truck, label: { fr: "Transport", en: "Transport", ar: "النقل", es: "Transporte" } },
  { icon: Plane, label: { fr: "Aérien", en: "Aviation", ar: "الطيران", es: "Aviación" } },
  { icon: GraduationCap, label: { fr: "Formation", en: "Training", ar: "التكوين", es: "Formación" } },
  { icon: Building2, label: { fr: "BTP", en: "Construction", ar: "البناء", es: "Construcción" } },
  { icon: Briefcase, label: { fr: "Logistique", en: "Logistics", ar: "اللوجستيك", es: "Logística" } },
  { icon: Users, label: { fr: "Artisanat", en: "Craftsmanship", ar: "الحرف", es: "Artesanía" } },
  { icon: HardHat, label: { fr: "Agriculture", en: "Agriculture", ar: "الفلاحة", es: "Agricultura" } },
];

const ExpertiseSection = () => {
  const { t, lang } = useLanguage();

  const doubled = [...domainsData, ...domainsData];

  return (
    <section id="expertise" className="py-20 md:py-28 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-accent font-semibold text-sm tracking-wide uppercase">{t("expertise_badge")}</span>
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-foreground mt-3">{t("expertise_title")}</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">
          {expertiseItems.map((item, i) => (
            <motion.div
              key={item.title.fr}
              initial={{ opacity: 0, y: 40, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                delay: i * 0.1, 
                duration: 0.6,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -10, 
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="group bg-card rounded-2xl p-6 border border-border cpa-shadow hover:cpa-shadow-lg transition-all cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div 
                className="w-14 h-14 rounded-xl cpa-gradient-bg flex items-center justify-center mb-4"
                whileHover={{ 
                  scale: 1.2, 
                  rotate: 360,
                  transition: { duration: 0.6 }
                }}
              >
                <item.icon className="w-7 h-7 text-primary-foreground" />
              </motion.div>
              <h3 className="font-heading font-bold text-foreground text-base">
                {(item.title as any)[lang] || item.title.fr}
              </h3>
            </motion.div>
          ))}
        </div>

        {/* Domaines d'intervention - Marquee Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h3 className="text-2xl md:text-3xl font-heading font-extrabold text-foreground">{t("team_domains")}</h3>
        </motion.div>

        <div className="relative overflow-hidden py-4">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-muted/50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-muted/50 to-transparent z-10 pointer-events-none" />
          
          <motion.div
            className="flex gap-4 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {doubled.map((domain, i) => {
              const Icon = domain.icon;
              return (
                <div
                  key={`${domain.label.fr}-${i}`}
                  className="flex items-center gap-3 px-6 py-3 bg-card rounded-xl border border-border cpa-shadow shrink-0 hover:cpa-shadow-lg transition-shadow"
                >
                  <div className="w-8 h-8 rounded-lg cpa-gradient-bg flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="font-heading font-semibold text-foreground text-sm whitespace-nowrap">
                    {(domain.label as any)[lang] || domain.label.fr}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
