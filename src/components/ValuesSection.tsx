import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { Heart, Lightbulb, Target, Shield } from "lucide-react";
import FlipCard from "@/components/ui/FlipCard";

const values = [
  {
    icon: Heart,
    title: { fr: "Proximité", en: "Proximity", ar: "القرب", es: "Proximidad" },
    desc: {
      fr: "Un accompagnement humain, personnalisé et proche de vos besoins.",
      en: "Human, personalized support close to your needs.",
      ar: "مرافقة إنسانية ومخصصة وقريبة من احتياجاتك.",
      es: "Acompañamiento humano, personalizado y cercano a sus necesidades.",
    },
  },
  {
    icon: Lightbulb,
    title: { fr: "Innovation", en: "Innovation", ar: "الابتكار", es: "Innovación" },
    desc: {
      fr: "Des solutions modernes pour simplifier votre expérience assurance.",
      en: "Modern solutions to simplify your insurance experience.",
      ar: "حلول عصرية لتبسيط تجربة التأمين الخاصة بك.",
      es: "Soluciones modernas para simplificar su experiencia de seguros.",
    },
  },
  {
    icon: Target,
    title: { fr: "Performance", en: "Performance", ar: "الأداء", es: "Rendimiento" },
    desc: {
      fr: "Les meilleures garanties négociées au meilleur rapport qualité-prix.",
      en: "The best coverage negotiated at the best value.",
      ar: "أفضل الضمانات Negotiated بأفضل نسبة جودة سعر.",
      es: "Las mejores garantías negociadas al mejor rapport calidad-precio.",
    },
  },
  {
    icon: Shield,
    title: { fr: "Éthique", en: "Ethics", ar: "الأخلاقيات", es: "Ética" },
    desc: {
      fr: "Des conseils transparents, intègres et dans votre intérêt.",
      en: "Transparent, honest advice in your best interest.",
      ar: "نصائح شفافة ونزيهة و لصالحك.",
      es: "Consejos transparentes, íntegros y en su interés.",
    },
  },
];

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
            <FlipCard key={v.title.fr} index={i} className="h-64" flipOnClick>
              {({ flipped }) => (
                <>
                  {/* Front */}
                  <div
                    className="absolute inset-0 bg-card rounded-2xl p-8 border border-border cpa-shadow flex flex-col items-center text-center"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="w-16 h-16 rounded-2xl cpa-gradient-bg flex items-center justify-center mb-5">
                      <v.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="font-heading font-bold text-foreground text-lg mb-2">
                      {(v.title as any)[lang] || v.title.fr}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {(v.desc as any)[lang] || v.desc.fr}
                    </p>
                  </div>
                  {/* Back */}
                  <div
                    className="absolute inset-0 rounded-2xl cpa-gradient-bg flex flex-col items-center justify-center p-8 text-center"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    <v.icon className="w-12 h-12 text-primary-foreground mb-4" />
                    <h3 className="text-primary-foreground font-heading font-bold text-xl mb-3">
                      {(v.title as any)[lang] || v.title.fr}
                    </h3>
                    <p className="text-primary-foreground/80 text-sm leading-relaxed">
                      {(v.desc as any)[lang] || v.desc.fr}
                    </p>
                  </div>
                </>
              )}
            </FlipCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
