import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const aboutTexts: Record<string, string[]> = {
  fr: [
    "Depuis 1957, CPA accompagne particuliers et entreprises avec des solutions d'assurance sur mesure. Grâce à notre expertise, notre proximité et notre réseau de partenaires, nous aidons nos clients à protéger leurs biens, leur santé, leurs activités et leur avenir.",
    "Notre mission est simple : offrir les meilleures solutions du marché, avec un accompagnement humain, réactif et personnalisé.",
    "Aujourd'hui, CPA poursuit sa transformation digitale afin de rendre ses services, ses conseils et son assistance accessibles partout et à tout moment.",
  ],
  en: [
    "Since 1957, CPA has been accompanying individuals and businesses with tailored insurance solutions. Thanks to our expertise, proximity and network of partners, we help our clients protect their assets, health, activities and future.",
    "Our mission is simple: offer the best solutions on the market, with human, responsive and personalized support.",
    "Today, CPA continues its digital transformation to make its services, advice and assistance accessible everywhere and at any time.",
  ],
  ar: [
    "منذ عام 1957، ترافق CPA الأفراد والشركات بحلول تأمينية مخصصة. بفضل خبرتنا وقربنا وشبكة شركائنا، نساعد عملائنا على حماية ممتلكاتهم وصحتهم وأنشطتهم ومستقبلهم.",
    "مهمتنا بسيطة: تقديم أفضل الحلول في السوق مع دعم إنساني سريع وشخصي.",
    "اليوم، تواصل CPA تحولها الرقمي لجعل خدماتها ونصائحها ومساعدتها متاحة في كل مكان وفي أي وقت.",
  ],
  es: [
    "Desde 1957, CPA acompaña a particulares y empresas con soluciones de seguros a medida. Gracias a nuestra experiencia, proximidad y red de socios, ayudamos a nuestros clientes a proteger sus bienes, salud, actividades y futuro.",
    "Nuestra misión es simple: ofrecer las mejores soluciones del mercado, con un acompañamiento humano, reactivo y personalizado.",
    "Hoy, CPA continúa su transformación digital para hacer sus servicios, consejos y asistencia accesibles en cualquier lugar y en cualquier momento.",
  ],
};

const captionTexts: Record<string, string> = {
  fr: "CPA, votre partenaire de confiance en assurance depuis 1957.",
  en: "CPA, your trusted insurance partner since 1957.",
  ar: "CPA، شريككم الموثوق في التأمين منذ 1957.",
  es: "CPA, su socio de confianza en seguros desde 1957.",
};

const AboutSection = () => {
  const { t, lang } = useLanguage();
  const texts = aboutTexts[lang] || aboutTexts.fr;
  const caption = captionTexts[lang] || captionTexts.fr;

  return (
    <section id="apropos" className="py-20 md:py-28 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent font-semibold text-sm tracking-wide uppercase">{t("about_badge")}</span>
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-foreground mt-3 mb-6">
              {t("about_title")} <span className="cpa-gradient-text">{t("about_title_2")}</span> {t("about_title_3")}
            </h2>
            {texts.map((text, i) => (
              <p key={i} className="text-muted-foreground text-base leading-relaxed mb-4">{text}</p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="rounded-2xl overflow-hidden border border-border cpa-shadow-lg aspect-video bg-card">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/VNMEF87lOTQ?si=XN9nVw9bBCXP3kwG"
                title="CPA Présentation"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <p className="text-center text-sm text-muted-foreground italic">{caption}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
