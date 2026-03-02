import { motion } from "framer-motion";
import { ArrowRight, Check, Phone, ChevronLeft, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import type { ServicePageData } from "@/data/servicePages";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface Props {
  page: ServicePageData;
  relatedPages: ServicePageData[];
}

const ServicePageTemplate = ({ page, relatedPages }: Props) => {
  const { lang } = useLanguage();
  const t = (obj: Record<string, string>) => obj[lang] || obj.fr;

  const whyTitle: Record<string, string> = {
    fr: "Pourquoi souscrire cette assurance ?",
    en: "Why get this insurance?",
    ar: "لماذا تحتاج هذا التأمين؟",
    es: "¿Por qué contratar este seguro?",
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 cpa-gradient-bg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary-foreground/5 -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-4 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground text-sm mb-6 transition-colors">
            <ChevronLeft className="w-4 h-4" />
            {lang === "fr" ? "Retour à l'accueil" : lang === "ar" ? "العودة للرئيسية" : lang === "es" ? "Volver al inicio" : "Back to home"}
          </Link>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-primary-foreground/10 flex items-center justify-center">
                <page.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-primary-foreground">
                {t(page.title)}
              </h1>
            </div>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl">{t(page.description)}</p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none"><path d="M0 30L720 60L1440 30V60H0V30Z" fill="hsl(220 20% 97%)" /></svg>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
            {/* Main */}
            <div className="lg:col-span-3">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
                  {lang === "fr" ? "Détails de la couverture" : lang === "ar" ? "تفاصيل التغطية" : lang === "es" ? "Detalles de la cobertura" : "Coverage details"}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-10">{t(page.details)}</p>

                <h3 className="text-xl font-heading font-bold text-foreground mb-6">
                  {lang === "fr" ? "Garanties incluses" : lang === "ar" ? "الضمانات المشمولة" : lang === "es" ? "Garantías incluidas" : "Included guarantees"}
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {(page.features[lang as keyof typeof page.features] || page.features.fr).map((feature, i) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border"
                    >
                      <div className="w-6 h-6 rounded-full cpa-gradient-bg flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 text-primary-foreground" />
                      </div>
                      <span className="text-sm text-foreground">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Why Insure Section */}
                {page.whyInsure && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-14"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl cpa-gradient-bg flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <h3 className="text-xl font-heading font-bold text-foreground">
                        {whyTitle[lang] || whyTitle.fr}
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {(page.whyInsure[lang as keyof typeof page.whyInsure] || page.whyInsure.fr).map((reason, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -15 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + i * 0.08 }}
                          className="flex items-start gap-3 p-4 rounded-xl bg-accent/10 border border-accent/20"
                        >
                          <span className="w-6 h-6 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <p className="text-sm text-foreground leading-relaxed">{reason}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                className="bg-card rounded-2xl p-8 border border-border">
                <h3 className="font-heading font-bold text-foreground text-lg mb-4">
                  {lang === "fr" ? "Demander un devis" : lang === "ar" ? "طلب عرض أسعار" : lang === "es" ? "Solicitar presupuesto" : "Request a quote"}
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  {lang === "fr" ? "Obtenez une estimation personnalisée en quelques minutes." : lang === "ar" ? "احصل على تقدير مخصص في بضع دقائق." : lang === "es" ? "Obtenga una estimación personalizada en pocos minutos." : "Get a personalized estimate in minutes."}
                </p>
                <Link to="/contact"
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl cpa-gradient-bg text-primary-foreground font-heading font-bold text-sm cpa-shadow hover:opacity-90 transition-opacity mb-4">
                  {lang === "fr" ? "Obtenir un Devis" : lang === "ar" ? "احصل على عرض" : lang === "es" ? "Obtener Presupuesto" : "Get a Quote"}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="tel:+212522953900"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl border border-border text-foreground font-medium text-sm hover:bg-secondary transition-colors">
                  <Phone className="w-4 h-4" />
                  <span dir="ltr">+212 5 22 95 39 00</span>
                </a>
              </motion.div>

              {relatedPages.length > 0 && (
                <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
                  className="bg-card rounded-2xl p-6 border border-border">
                  <h4 className="font-heading font-bold text-foreground text-sm mb-4">
                    {lang === "fr" ? "Voir aussi" : lang === "ar" ? "انظر أيضاً" : lang === "es" ? "Ver también" : "See also"}
                  </h4>
                  <div className="space-y-2">
                    {relatedPages.slice(0, 5).map((rp) => (
                      <Link key={rp.slug} to={`/${rp.category}/${rp.slug}`}
                        className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-secondary transition-colors group">
                        <rp.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{t(rp.title)}</span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicePageTemplate;