import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { particuliersPages, entreprisesPages } from "@/data/servicePages";

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const itemVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const PricingSection = () => {
  const { lang } = useLanguage();
  const t = (obj: Record<string, string>) => obj[lang] || obj.fr;

  const allPages = [...particuliersPages.slice(0, 4), ...entreprisesPages.slice(0, 4)];

  return (
    <section className="py-20 md:py-28 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-accent font-semibold text-sm tracking-wide uppercase">
            {lang === "fr" ? "Nos Assurances" : lang === "ar" ? "تأميناتنا" : lang === "es" ? "Nuestros Seguros" : "Our Insurance"}
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-foreground mt-3 mb-4">
            {lang === "fr" ? "Découvrez Nos Solutions" : lang === "ar" ? "اكتشف حلولنا" : lang === "es" ? "Descubra Nuestras Soluciones" : "Discover Our Solutions"}
          </h2>
          <p className="text-muted-foreground text-lg">
            {lang === "fr" ? "Particuliers ou entreprises, trouvez l'assurance qui vous convient." : lang === "ar" ? "أفراد أو شركات، اعثر على التأمين المناسب." : lang === "es" ? "Particulares o empresas, encuentre el seguro que le conviene." : "Individuals or businesses, find the right insurance for you."}
          </p>
        </motion.div>

        <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {allPages.map((page) => (
            <motion.div key={page.slug} variants={itemVariants} whileHover={{ y: -8 }}>
              <Link to={`/${page.category}/${page.slug}`}
                className="group block bg-card rounded-2xl p-6 border border-border hover:border-primary/30 cpa-shadow hover:cpa-shadow-lg transition-all h-full">
                <div className="w-12 h-12 rounded-xl cpa-gradient-bg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <page.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-heading font-bold text-foreground text-base mb-2">{t(page.title)}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3 line-clamp-2">{t(page.description)}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                  {lang === "fr" ? "Détails" : lang === "ar" ? "التفاصيل" : lang === "es" ? "Detalles" : "Details"}
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex justify-center gap-4 mt-10">
          <Link to="/particuliers" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl cpa-gradient-bg text-primary-foreground font-semibold text-sm cpa-shadow hover:opacity-90 transition-opacity">
            {lang === "fr" ? "Particuliers" : lang === "ar" ? "الأفراد" : lang === "es" ? "Particulares" : "Individuals"}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/entreprises" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-primary text-primary font-semibold text-sm hover:bg-primary hover:text-primary-foreground transition-all">
            {lang === "fr" ? "Entreprises" : lang === "ar" ? "الشركات" : lang === "es" ? "Empresas" : "Business"}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
