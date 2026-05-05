import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { Users, Briefcase, Building2 } from "lucide-react";
import FlipCard from "@/components/ui/FlipCard";

const domainsData: Record<string, string[]> = {
  fr: ["Finance", "Industrie", "Agroalimentaire", "Santé", "Énergies", "Eaux", "Transport", "Aérien", "Formation", "Agriculture", "BTP", "Logistique", "Audiovisuel", "Artisanat"],
  en: ["Finance", "Industry", "Agri-Food", "Healthcare", "Energy", "Water", "Transport", "Aviation", "Training", "Agriculture", "Construction", "Logistics", "Audiovisual", "Craftsmanship"],
  ar: ["المالية", "الصناعة", "الصناعات الغذائية", "الصحة", "الطاقة", "المياه", "النقل", "الطيران", "التكوين", "الفلاحة", "البناء", "اللوجستيك", "السمعي البصري", "الحرف"],
  es: ["Finanzas", "Industria", "Agroalimentario", "Salud", "Energía", "Agua", "Transporte", "Aviación", "Formación", "Agricultura", "Construcción", "Logística", "Audiovisual", "Artesanía"],
};

const domainIcons = ["💰", "🏭", "🌾", "🏥", "⚡", "💧", "🚛", "✈️", "📚", "🌱", "🏗️", "📦", "🎬", "🎨"];

const TeamSection = () => {
  const { t, lang } = useLanguage();
  const domainList = domainsData[lang] || domainsData.fr;

  const statLabels: Record<string, Record<string, string>> = {
    employees: { fr: "Collaborateurs", en: "Employees", ar: "موظف", es: "Colaboradores" },
    sectors: { fr: "Secteurs", en: "Sectors", ar: "قطاع", es: "Sectores" },
    units: { fr: "Pôles métiers", en: "Business Units", ar: "أقطاب مهنية", es: "Polos" },
  };

  return (
    <section className="py-20 md:py-28 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent font-semibold text-sm tracking-wide uppercase">
              {t("team_badge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-foreground mt-3 mb-6">
              {t("team_title")}
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-8">
              {t("team_desc")}
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { icon: Users, value: "33", label: statLabels.employees[lang] || "Employees" },
                { icon: Briefcase, value: "15+", label: statLabels.sectors[lang] || "Sectors" },
                { icon: Building2, value: "6", label: statLabels.units[lang] || "Units" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card rounded-xl p-4 text-center border border-border cpa-shadow"
                >
                  <div className="w-10 h-10 rounded-lg cpa-gradient-bg flex items-center justify-center mx-auto mb-2">
                    <stat.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="text-2xl font-heading font-extrabold cpa-gradient-text">{stat.value}</div>
                  <p className="text-muted-foreground text-xs">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Domains as flip cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-heading font-bold text-foreground text-lg mb-6">
              🧩 {t("team_domains")}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {domainList.map((domain, i) => (
                <FlipCard key={domain} index={i} className="h-20">
                  {({ flipped }) => (
                    <>
                      {/* Front */}
                      <div
                        className="absolute inset-0 bg-card rounded-xl border border-border cpa-shadow flex items-center gap-3 px-4"
                        style={{ backfaceVisibility: "hidden" }}
                      >
                        <span className="text-2xl">{domainIcons[i]}</span>
                        <span className="font-heading font-semibold text-foreground text-sm">{domain}</span>
                      </div>
                      {/* Back */}
                      <div
                        className="absolute inset-0 rounded-xl cpa-gradient-bg flex items-center justify-center px-3"
                        style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                      >
                        <span className="text-primary-foreground font-heading font-bold text-sm text-center">{domain}</span>
                      </div>
                    </>
                  )}
                </FlipCard>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
