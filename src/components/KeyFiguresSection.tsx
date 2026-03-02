import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { useEffect, useRef, useState } from "react";
import { TrendingUp, HeartPulse, Car, Anchor, HardHat, Home, AlertTriangle, Users } from "lucide-react";

const figures = [
  { icon: TrendingUp, value: 410000, suffix: "", label: { fr: "Kdh de primes émises", en: "Kdh in premiums", ar: "ألف درهم أقساط", es: "Kdh en primas" } },
  { icon: Users, value: 345000, suffix: "", label: { fr: "Adhérents assurance maladie", en: "Health insurance members", ar: "منخرط في التأمين الصحي", es: "Afiliados de salud" } },
  { icon: HeartPulse, value: 230000, suffix: "", label: { fr: "Sinistres maladies", en: "Health claims", ar: "مطالبات صحية", es: "Siniestros de salud" } },
  { icon: AlertTriangle, value: 900, suffix: "", label: { fr: "Prises en charge majeures", en: "Major care cases", ar: "حالات رعاية كبرى", es: "Casos de atención mayor" } },
  { icon: Car, value: 4000, suffix: "", label: { fr: "Véhicules et camions assurés", en: "Insured vehicles & trucks", ar: "مركبة مؤمنة", es: "Vehículos asegurados" } },
  { icon: Car, value: 720, suffix: "/an", label: { fr: "Sinistres auto matériels", en: "Auto material claims", ar: "مطالبات سيارات/سنة", es: "Siniestros auto/año" } },
  { icon: Anchor, value: 815, suffix: "/an", label: { fr: "Contrats maritimes", en: "Maritime contracts", ar: "عقود بحرية/سنة", es: "Contratos marítimos/año" } },
  { icon: HardHat, value: 220, suffix: "/an", label: { fr: "Sinistres AT", en: "Work accident claims", ar: "حوادث عمل/سنة", es: "Siniestros laborales/año" } },
  { icon: Home, value: 110, suffix: "", label: { fr: "Sinistres dommages", en: "Damage claims", ar: "مطالبات أضرار", es: "Siniestros de daños" } },
];

const AnimatedNumber = ({ value, suffix }: { value: number; suffix: string }) => {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const start = Date.now();
          const step = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * value);
            setDisplay(current.toLocaleString());
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-heading font-extrabold cpa-gradient-text">
      {display}{suffix}
    </span>
  );
};

const KeyFiguresSection = () => {
  const { t, lang } = useLanguage();

  return (
    <section className="py-20 md:py-28 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-accent font-semibold text-sm tracking-wide uppercase">{t("figures_badge")}</span>
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-foreground mt-3">{t("figures_title")}</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-14 max-w-5xl mx-auto">
          {figures.map((fig, i) => (
            <motion.div
              key={fig.label.fr}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="text-center"
            >
              <fig.icon className="w-8 h-8 text-primary mx-auto mb-3 opacity-70" />
              <AnimatedNumber value={fig.value} suffix={fig.suffix} />
              <p className="text-muted-foreground text-sm font-medium mt-2">
                {(fig.label as any)[lang] || fig.label.fr}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFiguresSection;
