import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { Zap, PawPrint, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const FlipInsuranceCard = ({ icon: Icon, title, desc, gradient, discoverLabel, index, link }: {
  icon: typeof Zap; title: string; desc: string; gradient: string; discoverLabel: string; index: number; link: string;
}) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      className="relative w-full h-72 cursor-pointer"
      style={{ perspective: 1000 }}
      onHoverStart={() => setFlipped(true)}
      onHoverEnd={() => setFlipped(false)}
      onClick={() => setFlipped(!flipped)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
    >
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 bg-card rounded-2xl p-8 border border-border cpa-shadow flex flex-col overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-4 right-4 bg-accent text-accent-foreground text-[10px] font-bold px-3 py-1 rounded-full"
          >
            NEW
          </motion.div>
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-6`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-heading font-bold text-foreground text-xl mb-3">{title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
        </div>

        {/* Back */}
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} flex flex-col items-center justify-center p-8 text-center`}
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <Icon className="w-12 h-12 text-white mb-4" />
          <h3 className="text-white font-heading font-bold text-xl mb-4">{title}</h3>
          <Link
            to={link}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/20 text-white font-semibold text-sm hover:bg-white/30 transition-colors backdrop-blur-sm"
          >
            {discoverLabel}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

const NewInsuranceSection = () => {
  const { t } = useLanguage();

  const products = [
    { icon: Zap, title: t("new_trottinette"), desc: t("new_trottinette_desc"), gradient: "from-emerald-500 to-teal-500", link: "/particuliers/trottinette-electrique" },
    { icon: PawPrint, title: t("new_animaux"), desc: t("new_animaux_desc"), gradient: "from-amber-500 to-orange-500", link: "/particuliers/animaux-compagnie" },
  ];

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-accent font-semibold text-sm tracking-wide uppercase">{t("new_insurance_badge")}</span>
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-foreground mt-3 mb-4">{t("new_insurance_title")}</h2>
          <p className="text-muted-foreground text-lg">{t("new_insurance_desc")}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {products.map((product, i) => (
            <FlipInsuranceCard key={product.title} {...product} discoverLabel={t("new_discover")} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewInsuranceSection;