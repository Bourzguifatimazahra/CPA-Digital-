import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

// Import profile photos
import ceoPhoto from "@/assets/profile/ceo.png";
import hibaPhoto from "@/assets/profile/hiba.png";
import imadPhoto from "@/assets/profile/imad.png";
import rimaPhoto from "@/assets/profile/rima.png";
import profilePhoto from "@/assets/profile/profile.png";

const testimonials = [
  {
    name: "Mohamed B.", role: { fr: "Directeur Général", en: "CEO", ar: "المدير العام", es: "Director General" },
    type: { fr: "Assurance Entreprise", en: "Business Insurance", ar: "تأمين الشركات", es: "Seguro Empresarial" },
    text: { fr: "CPA nous accompagne depuis plus de 60 ans. Leur expertise et réactivité sont remarquables.", en: "CPA has been supporting us for over 60 years. Their expertise and responsiveness are remarkable.", ar: "CPA ترافقنا منذ أكثر من 60 سنوات. خبرتهم واستجابتهم رائعة.", es: "CPA nos acompaña desde hace más de 60 años." },
    rating: 5,
    photo: ceoPhoto,
  },
  {
    name: "Sarah L.", role: { fr: "Particulier", en: "Individual", ar: "فرد", es: "Particular" },
    type: { fr: "Assurance Auto", en: "Auto Insurance", ar: "تأمين السيارات", es: "Seguro de Auto" },
    text: { fr: "J'ai trouvé la meilleure offre grâce à CPA. Le processus était simple et l'équipe très professionnelle.", en: "I found the best offer thanks to CPA. The process was simple and the team very professional.", ar: "وجدت أفضل عرض بفضل CPA.", es: "Encontré la mejor oferta gracias a CPA." },
    rating: 5,
    photo: hibaPhoto,
  },
  {
    name: "Ahmed K.", role: { fr: "Chef d'Entreprise", en: "Business Owner", ar: "رئيس شركة", es: "Empresario" },
    type: { fr: "Accidents de Travail", en: "Work Accidents", ar: "حوادث العمل", es: "Accidentes Laborales" },
    text: { fr: "Un accompagnement personnalisé et des solutions adaptées. Je recommande vivement CPA.", en: "Personalized support and adapted solutions. I highly recommend CPA.", ar: "مرافقة شخصية وحلول مناسبة. أنصح بشدة بـ CPA.", es: "Acompañamiento personalizado y soluciones adaptadas." },
    rating: 5,
    photo: imadPhoto,
  },
  {
    name: "Fatima Z.", role: { fr: "Médecin", en: "Doctor", ar: "طبيبة", es: "Doctora" },
    type: { fr: "RC Professionnelle", en: "Professional Liability", ar: "المسؤولية المهنية", es: "RC Profesional" },
    text: { fr: "Excellente couverture et conseils avisés. CPA comprend les enjeux de ma profession.", en: "Excellent coverage and wise advice. CPA understands my profession's challenges.", ar: "تغطية ممتازة ونصائح حكيمة.", es: "Excelente cobertura y consejos sabios." },
    rating: 5,
    photo: rimaPhoto,
  },
  {
    name: "Youssef M.", role: { fr: "Responsable Logistique", en: "Logistics Manager", ar: "مسؤول لوجستي", es: "Responsable de Logística" },
    type: { fr: "Transport Maritime", en: "Maritime Transport", ar: "النقل البحري", es: "Transporte Marítimo" },
    text: { fr: "CPA gère nos contrats maritimes avec une grande expertise. Partenaire fiable et réactif.", en: "CPA manages our maritime contracts with great expertise. Reliable partner.", ar: "CPA تدير عقودنا البحرية بخبرة كبيرة.", es: "CPA gestiona nuestros contratos marítimos con gran experiencia." },
    rating: 5,
    photo: profilePhoto,
  },
  {
    name: "Leila H.", role: { fr: "DRH", en: "HR Director", ar: "مديرة الموارد البشرية", es: "Directora de RRHH" },
    type: { fr: "Assurance Groupe", en: "Group Insurance", ar: "تأمين جماعي", es: "Seguro Colectivo" },
    text: { fr: "La couverture santé de nos 200 employés est parfaitement gérée par CPA. Service irréprochable.", en: "Our 200 employees' health coverage is perfectly managed by CPA.", ar: "التغطية الصحية لـ 200 موظف تُدار بشكل ممتاز.", es: "La cobertura de salud de nuestros 200 empleados está perfectamente gestionada." },
    rating: 5,
    photo: profilePhoto,
  },
  {
    name: "Rachid A.", role: { fr: "Promoteur Immobilier", en: "Real Estate Developer", ar: "مطور عقاري", es: "Promotor Inmobiliario" },
    type: { fr: "Tout Risques Chantier", en: "All-Risk Construction", ar: "جميع مخاطر البناء", es: "Todo Riesgo Obra" },
    text: { fr: "Pour nos chantiers, CPA nous a proposé des solutions sur mesure avec un excellent rapport qualité-prix.", en: "For our construction sites, CPA proposed tailored solutions with excellent value.", ar: "لمواقع البناء، اقترحت CPA حلولاً مخصصة.", es: "Para nuestras obras, CPA nos propuso soluciones a medida." },
    rating: 5,
    photo: profilePhoto,
  },
  {
    name: "Nadia T.", role: { fr: "Directrice Financière", en: "CFO", ar: "المديرة المالية", es: "Directora Financiera" },
    type: { fr: "Cyber Criminalité", en: "Cybercrime Insurance", ar: "تأمين الجرائم الإلكترونية", es: "Seguro Cibercrimen" },
    text: { fr: "Grâce à CPA, nous avons pu sécuriser notre entreprise contre les risques cyber. Indispensable aujourd'hui.", en: "Thanks to CPA, we secured our company against cyber risks. Essential today.", ar: "بفضل CPA، تمكنا من تأمين شركتنا ضد المخاطر السيبرانية.", es: "Gracias a CPA, pudimos asegurar nuestra empresa contra riesgos cibernéticos." },
    rating: 5,
    photo: profilePhoto,
  },
  {
    name: "Hassan E.", role: { fr: "Agriculteur", en: "Farmer", ar: "مزارع", es: "Agricultor" },
    type: { fr: "Assurance Agricole", en: "Agricultural Insurance", ar: "التأمين الزراعي", es: "Seguro Agrícola" },
    text: { fr: "CPA m'a aidé à protéger mon exploitation agricole. Leur connaissance du secteur est impressionnante.", en: "CPA helped me protect my farm. Their sector knowledge is impressive.", ar: "ساعدتني CPA في حماية مزرعتي.", es: "CPA me ayudó a proteger mi explotación agrícola." },
    rating: 5,
    photo: profilePhoto,
  },
  {
    name: "Karim D.", role: { fr: "Gérant de Flotte", en: "Fleet Manager", ar: "مدير أسطول", es: "Gestor de Flota" },
    type: { fr: "Automobile & Flotte", en: "Auto & Fleet", ar: "سيارات وأسطول", es: "Automóvil y Flota" },
    text: { fr: "50 véhicules assurés chez CPA. Gestion simplifiée, Accidents traités rapidement. Très satisfait.", en: "50 vehicles insured with CPA. Simplified management, claims handled quickly. Very satisfied.", ar: "50 مركبة مؤمنة لدى CPA. إدارة مبسطة.", es: "50 vehículos asegurados con CPA. Gestión simplificada." },
    rating: 5,
    photo: profilePhoto,
  },
  {
    name: "Amina R.", role: { fr: "Avocate", en: "Lawyer", ar: "محامية", es: "Abogada" },
    type: { fr: "RC Professionnelle", en: "Professional Liability", ar: "المسؤولية المهنية", es: "RC Profesional" },
    text: { fr: "En tant qu'avocate, la RC professionnelle est essentielle. CPA m'a trouvé la couverture idéale.", en: "As a lawyer, professional liability is essential. CPA found me the ideal coverage.", ar: "كمحامية، المسؤولية المهنية ضرورية. وجدت CPA التغطية المثالية.", es: "Como abogada, la RC profesional es esencial. CPA me encontró la cobertura ideal." },
    rating: 5,
    photo: profilePhoto,
  },
  {
    name: "Omar S.", role: { fr: "Industriel", en: "Industrialist", ar: "صناعي", es: "Industrial" },
    type: { fr: "Risques Techniques", en: "Technical Risks", ar: "المخاطر التقنية", es: "Riesgos Técnicos" },
    text: { fr: "CPA a su identifier et couvrir tous les risques techniques de notre usine. Expertise pointue et réactive.", en: "CPA identified and covered all technical risks of our factory. Sharp and responsive expertise.", ar: "حددت CPA وغطت جميع المخاطر التقنية لمصنعنا.", es: "CPA identificó y cubrió todos los riesgos técnicos de nuestra fábrica." },
    rating: 5,
    photo: profilePhoto,
  },
];

const TestimonialsSection = () => {
  const { t, lang } = useLanguage();
  const [page, setPage] = useState(0);
  const cardsPerPage = 4;
  const totalPages = Math.ceil(testimonials.length / cardsPerPage);

  useEffect(() => {
    const timer = setInterval(() => setPage((p) => (p + 1) % totalPages), 6000);
    return () => clearInterval(timer);
  }, [totalPages]);

  const prev = () => setPage((p) => (p - 1 + totalPages) % totalPages);
  const next = () => setPage((p) => (p + 1) % totalPages);

  const visibleTestimonials = testimonials.slice(page * cardsPerPage, page * cardsPerPage + cardsPerPage);

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-accent font-semibold text-sm tracking-wide uppercase">{t("testimonials_badge")}</span>
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-foreground mt-3">{t("testimonials_title")}</h2>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.4 }}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {visibleTestimonials.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 30, rotateY: -15 }}
                  animate={{ opacity: 1, y: 0, rotateY: 0 }}
                  transition={{ 
                    delay: i * 0.1,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.03,
                    rotateY: 5,
                    transition: { duration: 0.3 }
                  }}
                  className="bg-card rounded-2xl p-6 border border-border cpa-shadow hover:cpa-shadow-lg transition-all"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <motion.div 
                    className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-primary/20"
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: [0, -5, 5, 0],
                      transition: { duration: 0.4 }
                    }}
                  >
                    <img 
                      src={item.photo} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: item.rating }).map((_, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 + j * 0.05 }}
                      >
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-foreground text-sm leading-relaxed mb-4 italic line-clamp-4">
                    "{item.text[lang] || item.text.fr}"
                  </p>
                  <p className="font-heading font-bold text-foreground text-sm">{item.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {item.role[lang] || item.role.fr} · {item.type[lang] || item.type.fr}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          <button onClick={prev} className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card border border-border cpa-shadow flex items-center justify-center hover:bg-secondary transition-colors z-10">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={next} className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card border border-border cpa-shadow flex items-center justify-center hover:bg-secondary transition-colors z-10">
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${i === page ? "bg-primary w-6" : "bg-border"}`}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground text-sm">
            <span className="font-heading font-extrabold cpa-gradient-text text-lg">2 500+</span>{" "}
            {lang === "ar" ? "عميل راضٍ" : lang === "es" ? "clientes satisfechos" : lang === "en" ? "satisfied clients" : "clients satisfaits"}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
