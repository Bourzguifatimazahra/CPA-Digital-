import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { Heart, Lightbulb, Target, Shield } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: { fr: "Proximité", en: "Proximity", ar: "القرب", es: "Proximidad" },
    desc: {
      fr: "Un accompagnement personnalisé et à l'écoute de vos besoins.",
      en: "Personalized support, listening to your needs.",
      ar: "مرافقة شخصية واستماع لاحتياجاتكم.",
      es: "Acompañamiento personalizado y atento a sus necesidades.",
    },
  },
  {
    icon: Lightbulb,
    title: { fr: "Innovation", en: "Innovation", ar: "الابتكار", es: "Innovación" },
    desc: {
      fr: "Des solutions modernes pour répondre aux enjeux actuels.",
      en: "Modern solutions for today's challenges.",
      ar: "حلول عصرية لمواجهة التحديات الحالية.",
      es: "Soluciones modernas para los desafíos actuales.",
    },
  },
  {
    icon: Target,
    title: { fr: "Performance", en: "Performance", ar: "الأداء", es: "Rendimiento" },
    desc: {
      fr: "Les meilleures garanties au meilleur prix du marché.",
      en: "The best coverage at the best market price.",
      ar: "أفضل الضمانات بأفضل سعر في السوق.",
      es: "Las mejores garantías al mejor precio del mercado.",
    },
  },
  {
    icon: Shield,
    title: { fr: "Éthique", en: "Ethics", ar: "الأخلاقيات", es: "Ética" },
    desc: {
      fr: "Transparence et intégrité dans chaque conseil.",
      en: "Transparency and integrity in every advice.",
      ar: "الشفافية والنزاهة في كل نصيحة.",
      es: "Transparencia e integridad en cada consejo.",
    },
  },
];

const FlipValueCard = ({ value, index, lang }: { value: typeof values[0]; index: number; lang: string }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      className="relative w-full h-64 cursor-pointer"
      style={{ perspective: 1000 }}
      onHoverStart={() => setFlipped(true)}
      onHoverEnd={() => setFlipped(false)}
      onClick={() => setFlipped(!flipped)}
      initial={{ opacity: 0, y: 40, rotateY: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.6, type: "spring" }}
    >
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 bg-card rounded-2xl p-8 border border-border cpa-shadow flex flex-col items-center text-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="w-16 h-16 rounded-2xl cpa-gradient-bg flex items-center justify-center mb-5">
            <value.icon className="w-8 h-8 text-primary-foreground" />
          </div>
          <h3 className="font-heading font-bold text-foreground text-lg mb-2">
            {(value.title as any)[lang] || value.title.fr}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {(value.desc as any)[lang] || value.desc.fr}
          </p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl cpa-gradient-bg flex flex-col items-center justify-center p-8 text-center"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <value.icon className="w-12 h-12 text-primary-foreground mb-4" />
          <h3 className="text-primary-foreground font-heading font-bold text-xl mb-3">
            {(value.title as any)[lang] || value.title.fr}
          </h3>
          <p className="text-primary-foreground/80 text-sm leading-relaxed">
            {(value.desc as any)[lang] || value.desc.fr}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ValuesSection = () => {
  const { t, lang } = useLanguage();

  return (
    <section id="valeurs" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-accent font-semibold text-sm tracking-wide uppercase">{t("values_badge")}</span>
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-foreground mt-3">{t("values_title")}</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {values.map((v, i) => (
            <FlipValueCard key={v.title.fr} value={v} index={i} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
