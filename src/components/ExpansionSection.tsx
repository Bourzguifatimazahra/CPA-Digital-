import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { MapPin, Sparkles, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import tangerImage from "@/assets/site/tanger.jpg";
import casaImage from "@/assets/site/casa.jpg";

const ExpansionSection = () => {
  const { t, lang } = useLanguage();

  const offices = [
    {
      city: { fr: "Tanger", en: "Tangier", ar: "طنجة", es: "Tánger" },
      isNew: true,
      address: {
        fr: "15 Résidence Al TAJMIL, Avenue Abi Dardae, 4ème étage, Bureau n°25, Place des Nations, Tanger",
        en: "15 Al TAJMIL Residence, Abi Dardae Avenue, 4th floor, Office n°25, Place des Nations, Tangier",
        ar: "15 إقامة التجميل، شارع أبي درداء، الطابق الرابع، مكتب رقم 25، ساحة الأمم، طنجة",
        es: "15 Residencia Al TAJMIL, Avenida Abi Dardae, 4º piso, Oficina n°25, Plaza de las Naciones, Tánger"
      },
      phone: "+212 5 22 95 39 00",
      email: "info@cpa.ma",
      image: tangerImage
    },
    {
      city: { fr: "Casablanca", en: "Casablanca", ar: "الدار البيضاء", es: "Casablanca" },
      isNew: false,
      address: {
        fr: "Angle bd Moulay Youssef et bd Ziraoui, Complexe Moulay Youssef Work Center, 2ᵉ étage, Casablanca",
        en: "Corner bd Moulay Youssef and bd Ziraoui, Moulay Youssef Work Center Complex, 2nd floor, Casablanca",
        ar: "زاوية شارع مولاي يوسف وشارع زيراوي، مجمع مولاي يوسف وورك سنتر، الطابق الثاني، الدار البيضاء",
        es: "Esquina bd Moulay Youssef y bd Ziraoui, Complejo Moulay Youssef Work Center, 2º piso, Casablanca"
      },
      phone: "+212 5 22 95 39 00",
      email: "info@cpa.ma",
      image: casaImage
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <Sparkles className="w-5 h-5 text-accent" />
            <span className="text-accent font-semibold text-sm tracking-wide uppercase">
              {lang === "fr" ? "Expansion Nationale" : 
               lang === "en" ? "National Expansion" : 
               lang === "ar" ? "التوسع الوطني" : "Expansión Nacional"}
            </span>
            <Sparkles className="w-5 h-5 text-accent" />
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-foreground mb-4">
            {lang === "fr" ? "CPA renforce sa présence nationale" : 
             lang === "en" ? "CPA strengthens its national presence" : 
             lang === "ar" ? "CPA تعزز حضورها الوطني" : "CPA refuerza su presencia nacional"}
          </h2>
          
          <p className="text-lg text-muted-foreground font-medium">
            {lang === "fr" ? "Ouverture officielle de notre nouveau bureau à Tanger" : 
             lang === "en" ? "Official opening of our new office in Tangier" : 
             lang === "ar" ? "الافتتاح الرسمي لمكتبنا الجديد في طنجة" : "Apertura oficial de nuestra nueva oficina en Tánger"}
          </p>
        </motion.div>

        {/* Offices Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {offices.map((office, index) => (
            <motion.div
              key={office.city.fr}
              initial={{ opacity: 0, y: 40, rotateY: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                delay: index * 0.2,
                duration: 0.6,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className={`relative bg-card rounded-3xl overflow-hidden border-2 cpa-shadow-lg hover:cpa-shadow-xl transition-all ${
                office.isNew ? "border-accent shadow-accent/20" : "border-border"
              }`}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* New Badge */}
              {office.isNew && (
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  className="absolute top-4 right-4 z-10"
                >
                  <Badge className="bg-accent text-white px-4 py-1.5 text-sm font-bold shadow-lg">
                    <Sparkles className="w-4 h-4 mr-1 inline" />
                    {lang === "fr" ? "NOUVEAU" : 
                     lang === "en" ? "NEW" : 
                     lang === "ar" ? "جديد" : "NUEVO"}
                  </Badge>
                </motion.div>
              )}

              {/* Office Image */}
              <motion.div 
                className="relative h-56 overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src={office.image}
                  alt={`Bureau ${(office.city as any)[lang]}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {/* City Name Overlay */}
                <div className="absolute bottom-4 left-6">
                  <div className="flex items-center gap-2 text-white">
                    <Building2 className="w-6 h-6" />
                    <h3 className="text-2xl font-heading font-bold">
                      {(office.city as any)[lang] || office.city.fr}
                    </h3>
                  </div>
                </div>
              </motion.div>

              {/* Office Details */}
              <div className="p-6 space-y-4">
                {/* Address */}
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">
                      {lang === "fr" ? "Adresse" : 
                       lang === "en" ? "Address" : 
                       lang === "ar" ? "العنوان" : "Dirección"}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {(office.address as any)[lang] || office.address.fr}
                    </p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3 pt-2 border-t border-border">
                  {/* Phone */}
                  <motion.div 
                    className="flex items-center gap-3"
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a 
                      href={`tel:${office.phone}`}
                      className="text-sm font-semibold text-primary hover:text-accent transition-colors"
                    >
                      {office.phone}
                    </a>
                  </motion.div>

                  {/* Email */}
                  <motion.div 
                    className="flex items-center gap-3"
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a 
                      href={`mailto:${office.email}`}
                      className="text-sm font-semibold text-primary hover:text-accent transition-colors"
                    >
                      {office.email}
                    </a>
                  </motion.div>
                </div>
              </div>

              {/* Accent Bar for New Office */}
              {office.isNew && (
                <motion.div 
                  className="h-1.5 bg-gradient-to-r from-accent via-primary to-accent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Strategic Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 max-w-4xl mx-auto text-center"
        >
          <div className="bg-card rounded-2xl p-8 border border-border cpa-shadow">
            <motion.p 
              className="text-base md:text-lg text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              {lang === "fr" ? 
                "Cette ouverture marque une étape stratégique majeure dans le développement national de CPA. En étendant notre présence à Tanger, nous renforçons notre engagement à accompagner nos clients sur l'ensemble du territoire marocain avec le même niveau d'excellence et de proximité qui fait notre réputation depuis plus de 60 ans." :
               lang === "en" ? 
                "This opening marks a major strategic milestone in CPA's national development. By extending our presence to Tangier, we strengthen our commitment to supporting our clients throughout Morocco with the same level of excellence and proximity that has built our reputation for over 60 years." :
               lang === "ar" ? 
                "يمثل هذا الافتتاح مرحلة استراتيجية رئيسية في التطور الوطني لـ CPA. من خلال توسيع تواجدنا في طنجة، نعزز التزامنا بمرافقة عملائنا في جميع أنحاء المغرب بنفس مستوى التميز والقرب الذي بنى سمعتنا لأكثر من 60 سنوات." :
                "Esta apertura marca un hito estratégico importante en el desarrollo nacional de CPA. Al extender nuestra presencia a Tánger, reforzamos nuestro compromiso de acompañar a nuestros clientes en todo Marruecos con el mismo nivel de excelencia y proximidad que ha construido nuestra reputación durante más de 60 años."}
            </motion.p>
            
            <motion.div 
              className="mt-6 flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <motion.div 
                className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: 0.7,
                  type: "spring",
                  stiffness: 200,
                  damping: 10
                }}
                whileHover={{ 
                  scale: 1.1,
                  backgroundColor: "rgba(var(--primary), 0.15)",
                  transition: { duration: 0.2 }
                }}
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                >
                  <Building2 className="w-4 h-4 text-primary" />
                </motion.div>
                <span className="text-sm font-semibold text-foreground">
                  {lang === "fr" ? "2 Bureaux" : 
                   lang === "en" ? "2 Offices" : 
                   lang === "ar" ? "مكتبان" : "2 Oficinas"}
                </span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: 0.9,
                  type: "spring",
                  stiffness: 200,
                  damping: 10
                }}
                whileHover={{ 
                  scale: 1.1,
                  backgroundColor: "rgba(var(--accent), 0.15)",
                  transition: { duration: 0.2 }
                }}
              >
                <motion.div
                  animate={{ 
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                >
                  <MapPin className="w-4 h-4 text-accent" />
                </motion.div>
                <span className="text-sm font-semibold text-foreground">
                  {lang === "fr" ? "Couverture Nationale" : 
                   lang === "en" ? "National Coverage" : 
                   lang === "ar" ? "تغطية وطنية" : "Cobertura Nacional"}
                </span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExpansionSection;
