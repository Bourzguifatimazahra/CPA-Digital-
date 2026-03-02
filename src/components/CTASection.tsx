import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

const CTASection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 cpa-gradient-bg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary-foreground/5 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-primary-foreground/5 translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary-foreground mb-4">{t("cta_title")}</h2>
          <p className="text-primary-foreground/80 text-lg mb-8">{t("cta_desc")}</p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
            <Link to="/contact"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-primary-foreground text-primary font-heading font-bold text-base hover:bg-primary-foreground/90 transition-colors cpa-shadow-lg">
              {t("cta_button")}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
