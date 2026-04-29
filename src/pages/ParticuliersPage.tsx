import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { particuliersPages } from "@/data/servicePages";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";

const ParticuliersPage = () => {
  const { lang } = useLanguage();
  const t = (obj: Record<string, string>) => obj[lang] || obj.fr;

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-28 pb-16 cpa-gradient-bg relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-heading font-extrabold text-primary-foreground mb-4">
            {lang === "fr" ? "Assurances Particuliers" : lang === "ar" ? "تأمينات الأفراد" : lang === "es" ? "Seguros Particulares" : "Individual Insurance"}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-primary-foreground/80 text-lg max-w-2xl">
            {lang === "fr" ? "Découvrez nos solutions d'assurance adaptées à vos besoins personnels et familiaux." : lang === "ar" ? "اكتشف حلول التأمين المصممة لاحتياجاتك الشخصية والعائلية." : lang === "es" ? "Descubra nuestras soluciones de seguro adaptadas a sus necesidades personales y familiares." : "Discover our insurance solutions tailored to your personal and family needs."}
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0"><svg viewBox="0 0 1440 60" fill="none"><path d="M0 30L720 60L1440 30V60H0V30Z" fill="hsl(220 20% 97%)" /></svg></div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {particuliersPages.map((page, i) => (
              <motion.div key={page.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <div className="group block bg-card rounded-2xl p-6 border border-border hover:border-primary/30 cpa-shadow hover:cpa-shadow-lg transition-all h-full flex flex-col">
                  <div className="w-14 h-14 rounded-xl cpa-gradient-bg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <page.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  {page.badge && (
                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-accent/10 text-accent mb-2">
                      {t(page.badge)}
                    </span>
                  )}
                  <h3 className="font-heading font-bold text-foreground text-lg mb-2">{t(page.title)}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow">{t(page.description)}</p>
                  <div className="space-y-3 mt-auto">
                    <Link to={`/particuliers/${page.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                      {lang === "fr" ? "En savoir plus" : lang === "ar" ? "اعرف المزيد" : lang === "es" ? "Saber más" : "Learn more"}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link to="/contact#contact"
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl cpa-gradient-bg text-primary-foreground font-heading font-bold text-sm hover:opacity-90 transition-opacity cpa-shadow">
                      <CalendarCheck className="w-4 h-4" />
                      {lang === "fr" ? "Souscrire maintenant" : lang === "ar" ? "اشترك الآن" : lang === "es" ? "Suscribirse Ahora" : "Subscribe Now"}
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

        <ContactSection />
      <Footer />
    </div>
  );
};

export default ParticuliersPage;
