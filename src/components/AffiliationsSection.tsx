import { motion, Variants } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { Globe2, MapPin, Network } from "lucide-react";

// Import logos
import cpaLogo from "@/assets/cpa-logo.png";
import holmarcomLogo from "@/assets/Affiliations/holmarcom.png";
import euaibronLogo from "@/assets/Affiliations/euribron.png";

const AffiliationsSection = () => {
  const { t, lang } = useLanguage();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardHoverVariants: Variants = {
    rest: { scale: 1, y: 0 },
    hover: {
      scale: 1.02,
      y: -8,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6"
          >
            <Network className="w-4 h-4 text-primary" />
            <span className="text-primary font-semibold text-sm tracking-wide uppercase">
              {t("affiliations_badge")}
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-foreground mb-6">
            {t("affiliations_title")}
          </h2>

          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t("affiliations_intro")}
          </p>
        </motion.div>

        {/* Affiliations Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-8 mb-12"
        >
          {/* National Card - Holmarcom */}
          <motion.div variants={itemVariants}>
            <motion.div
              variants={cardHoverVariants}
              initial="rest"
              whileHover="hover"
              className="bg-card border-2 border-border rounded-2xl p-8 h-full cpa-shadow hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start gap-4 mb-6">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center shrink-0"
                >
                  <MapPin className="w-7 h-7 text-primary" />
                </motion.div>
                <div>
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                    {t("affiliations_national_badge")}
                  </span>
                  <h3 className="text-2xl font-heading font-bold text-foreground mt-1">
                    Holmarcom
                  </h3>
                </div>
              </div>

              {/* Holmarcom Logo */}
              <motion.div 
                className="mb-6 bg-white rounded-xl p-6 flex items-center justify-center h-32 cpa-shadow-sm"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={holmarcomLogo} 
                  alt="Holmarcom Logo" 
                  className="max-w-full max-h-full object-contain"
                />
              </motion.div>

              <p className="text-muted-foreground leading-relaxed">
                {t("affiliations_holmarcom_desc")}
              </p>
            </motion.div>
          </motion.div>

          {/* International Card - EURIBRON */}
          <motion.div variants={itemVariants}>
            <motion.div
              variants={cardHoverVariants}
              initial="rest"
              whileHover="hover"
              className="bg-card border-2 border-border rounded-2xl p-8 h-full cpa-shadow hover:border-accent/30 transition-colors"
            >
              <div className="flex items-start gap-4 mb-6">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center shrink-0"
                >
                  <Globe2 className="w-7 h-7 text-accent" />
                </motion.div>
                <div>
                  <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                    {t("affiliations_international_badge")}
                  </span>
                  <h3 className="text-2xl font-heading font-bold text-foreground mt-1">
                    EURIBRON
                  </h3>
                </div>
              </div>

              {/* EURIBRON Logo */}
              <motion.div 
                className="mb-6 bg-white rounded-xl p-6 flex items-center justify-center h-32 cpa-shadow-sm"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={euaibronLogo} 
                  alt="EURIBRON Logo" 
                  className="max-w-full max-h-full object-contain"
                />
              </motion.div>

              <p className="text-muted-foreground leading-relaxed">
                {t("affiliations_euaibron_desc")}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom Banner - CPA Network */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border border-border rounded-2xl p-8 md:p-12"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* CPA Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="shrink-0"
            >
              <div className="w-24 h-24 bg-white rounded-xl p-3 cpa-shadow">
                <img 
                  src={cpaLogo} 
                  alt="CPA Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>

            {/* Connector Line */}
            <div className="hidden md:block flex-1 h-0.5 bg-gradient-to-r from-primary/30 to-accent/30" />

            {/* Holmarcom Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="shrink-0"
            >
              <div className="w-24 h-24 bg-white rounded-xl p-3 cpa-shadow flex items-center justify-center">
                <img 
                  src={holmarcomLogo} 
                  alt="Holmarcom" 
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>

            {/* Connector Line */}
            <div className="hidden md:block flex-1 h-0.5 bg-gradient-to-r from-accent/30 to-primary/30" />

            {/* EURIBRON Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="shrink-0"
            >
              <div className="w-24 h-24 bg-white rounded-xl p-3 cpa-shadow flex items-center justify-center">
                <img 
                  src={euaibronLogo} 
                  alt="EURIBRON" 
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-center text-muted-foreground mt-8 text-sm md:text-base leading-relaxed"
          >
            {t("affiliations_bottom_text")}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default AffiliationsSection;
