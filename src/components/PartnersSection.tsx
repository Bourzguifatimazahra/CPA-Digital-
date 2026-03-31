import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

// Import all partner logos
import catLogo from "@/assets/cat.png";
import maiLogo from "@/assets/mai.png";
import africaLogo from "@/assets/africa.png";
import wafaLogo from "@/assets/wafa.png";
import coverLogo from "@/assets/cover .png";
import sanlamLogo from "@/assets/sanlam.png";
import allianzLogo from "@/assets/allianz.png";
import axaLogo from "@/assets/axa.png";
import wafaAssuranceLogo from "@/assets/wafa assurance.png";
import rmaLogo from "@/assets/rma.png";
import atlantasanadLogo from "@/assets/atlantasanad.png";
import lamarocainevieLogo from "@/assets/lamarocainevie.png";
import mcmaLogo from "@/assets/mcma.png";
import atlanticreLogo from "@/assets/atlanticre.png";
import matuLogo from "@/assets/matu.png";

const partners = [
  { name: "CAT Assurance & Réassurance", logo: catLogo },
  { name: "Maroc Assistance Internationale", logo: maiLogo },
  { name: "Africa First Assist", logo: africaLogo },
  { name: "Wafa IMA Assistance", logo: wafaLogo },
  { name: "Cover Edge", logo: coverLogo },
  { name: "Sanlam", logo: sanlamLogo },
  { name: "Allianz", logo: allianzLogo },
  { name: "AXA", logo: axaLogo },
  { name: "Wafa Assurance", logo: wafaAssuranceLogo },
  { name: "RMA Royale Marocaine d'Assurance", logo: rmaLogo },
  { name: "AtlantaSanad Assurance", logo: atlantasanadLogo },
  { name: "La Marocaine Vie", logo: lamarocainevieLogo },
  { name: "MCMA", logo: mcmaLogo },
  { name: "Atlantic Re", logo: atlanticreLogo },
  { name: "MATU Assurance", logo: matuLogo },
];

const PartnersSection = () => {
  const { t } = useLanguage();

  return (
    <section id="partenaires" className="py-16 bg-muted/50 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-accent font-semibold text-sm tracking-wide uppercase">
            {t("partners_badge")}
          </span>
          <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-foreground mt-3 mb-3">
            {t("partners_title")}
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            {t("partners_desc")}
          </p>
        </motion.div>
      </div>

      {/* Single marquee */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-muted/80 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-muted/80 to-transparent z-10" />

        <motion.div
          className="flex gap-6 py-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {[...partners, ...partners].map((partner, i) => (
            <motion.div
              key={`${partner.name}-${i}`}
              whileHover={{ scale: 1.08, y: -4 }}
              className="shrink-0"
            >
              <div className="bg-card rounded-xl px-6 py-4 border border-border cpa-shadow flex items-center gap-4 min-w-[260px] h-[100px] hover:border-primary/30 transition-colors">
                <div className="w-20 h-20 flex items-center justify-center shrink-0">
                  <img 
                    src={partner.logo} 
                    alt={`${partner.name} logo`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="font-heading font-bold text-foreground text-sm whitespace-nowrap">
                  {partner.name}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;
