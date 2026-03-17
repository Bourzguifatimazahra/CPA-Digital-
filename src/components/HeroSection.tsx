import { motion } from "framer-motion";
import { ArrowRight, Phone, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import { useLanguage } from "@/i18n/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section id="accueil" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-cpa-blue-deep/95 via-cpa-blue/80 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-24 pb-20">
        <div className="max-w-2xl">
        <motion.div
  initial={{ opacity: 0, y: -20, scale: 0.95 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
  whileHover={{ scale: 1.05 }}
  className="flex items-center gap-2 mb-6 px-4 py-2 
             bg-white rounded-full w-fit
             shadow-md border border-gray-200"
>
  <Shield className="w-5 h-5 text-accent" />

  <span className="text-accent font-semibold text-sm tracking-wide uppercase">
    {t("hero_badge")}
  </span>
</motion.div>

          <motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ 
    opacity: 1,
    y: [0, -8, 0]
  }}
  transition={{ 
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }}
  className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold leading-tight mb-6 whitespace-nowrap"
>
  <span className="text-white">
    {t("hero_title_1")}
  </span>{" "}  
  <span className="text-blue-300">
    {t("hero_title_2")}
  </span>
</motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-100 mb-10 max-w-lg font-body">
            {t("hero_desc")}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8 }} className="flex flex-col sm:flex-row gap-4">
            <Link to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-accent text-accent-foreground font-heading font-bold text-base hover:brightness-110 transition-all cpa-shadow-lg">
              {t("hero_cta")}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="tel:+212522953900"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-gray-200/30 text-white font-heading font-semibold text-base hover:bg-white/10 transition-all">
              <Phone className="w-5 h-5" />
              <span dir="ltr">+212 5 22 95 39 00</span>
            </a>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 40L60 36C120 32 240 24 360 28C480 32 600 48 720 52C840 56 960 48 1080 40C1200 32 1320 24 1380 20L1440 16V80H0V40Z" fill="hsl(210 20% 98%)" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;