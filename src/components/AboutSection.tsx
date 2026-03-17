import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const aboutTexts: Record<string, string[]> = {
  fr: [
    "Depuis sa création en 1957, CPA est devenue une marque nationale reconnue. Une aventure rendue possible grâce à l'implication de nos collaborateurs qui partagent une même ambition : rendre votre vie meilleure en vous protégeant le mieux possible face aux aléas et aux incertitudes qui la jalonnent. Protéger vos biens naturellement, puisque c'est notre cœur de métier, mais aussi votre santé et vos actifs financiers. Pour cela, nous proposons des offres de produits et de services variés en prenant toujours pour point de départ : le client, ses attentes et ses besoins.",
    "Dans un monde en constante évolution, nous avons à cœur de réinventer sans cesse notre métier pour simplifier toujours et encore l'assurance. Nous nous engageons ainsi résolument dans la transformation digitale pour rendre nos produits, nos conseils et notre assistance accessibles depuis n'importe quel canal. Au-delà des défis techniques, il s'agit pour CPA de devenir non plus un organisme payeur qu'on sollicite dans l'urgence, mais un véritable partenaire présent à tous les moments-clés de la vie de ses assurés… en les rendant confiants, tout simplement.",
    "Œuvrant dans un secteur actif, diversifié et en perpétuelle expansion depuis des décennies, CPA, cabinet de conseil et de courtage en assurance, réassurance, a su instaurer une politique d'accompagnement de ses clients à même de trouver la meilleure offre d'assurance du marché, correspondant à leurs profils et à leurs besoins.",
  ],
  en: [
    "Since its creation in 1957, CPA has become a recognized national brand. An adventure made possible by the commitment of our employees who share the same ambition: to make your life better by protecting you as best as possible against life's uncertainties. Protecting your assets naturally, since it's our core business, but also your health and financial assets. For this, we offer a variety of products and services, always starting from the client, their expectations and needs.",
    "In a constantly evolving world, we are committed to continuously reinventing our profession to simplify insurance. We are resolutely committed to digital transformation to make our products, advice, and assistance accessible from any channel. Beyond technical challenges, CPA aims to become not just an organization you call in emergencies, but a true partner present at all key moments in the lives of its policyholders… simply by giving them confidence.",
    "Operating in an active, diversified and ever-expanding sector for decades, CPA, an insurance and reinsurance consulting and brokerage firm, has established a client support policy to find the best insurance offer on the market, matching their profiles and needs.",
  ],
  ar: [
    "منذ تأسيسها في عام 1957، أصبحت CPA علامة وطنية معترف بها. مغامرة أصبحت ممكنة بفضل التزام موظفينا الذين يتشاركون نفس الطموح: جعل حياتكم أفضل من خلال حمايتكم بأفضل طريقة ممكنة ضد تقلبات الحياة. حماية ممتلكاتكم بشكل طبيعي، لأن ذلك هو صميم عملنا، وأيضاً صحتكم وأصولكم المالية.",
    "في عالم يتطور باستمرار، نحرص على إعادة اختراع مهنتنا لتبسيط التأمين دائماً. نلتزم بالتحول الرقمي لجعل منتجاتنا ونصائحنا ومساعدتنا متاحة من أي قناة.",
    "تعمل CPA في قطاع نشط ومتنوع ومتوسع باستمرار منذ عقود، وقد نجحت في وضع سياسة مرافقة عملائها للعثور على أفضل عرض تأمين في السوق يتوافق مع احتياجاتهم.",
  ],
  es: [
    "Desde su creación en 1957, CPA se ha convertido en una marca nacional reconocida. Una aventura posible gracias al compromiso de nuestros colaboradores que comparten la misma ambición: mejorar su vida protegiéndole lo mejor posible frente a las incertidumbres de la vida. Proteger sus bienes naturalmente, ya que es nuestro negocio principal, pero también su salud y sus activos financieros.",
    "En un mundo en constante evolución, nos comprometemos a reinventar nuestra profesión para simplificar los seguros. Apostamos por la transformación digital para hacer accesibles nuestros productos, consejos y asistencia desde cualquier canal.",
    "Operando en un sector activo, diversificado y en expansión desde hace décadas, CPA ha establecido una política de acompañamiento a sus clientes para encontrar la mejor oferta de seguros del mercado, adaptada a sus perfiles y necesidades.",
  ],
};

const captionTexts: Record<string, string> = {
  fr: "Fondé en 1957, « CPA » Conseil et Placement d'Assurances est un cabinet spécialisé dans le courtage en assurance et réassurance.",
  en: "Founded in 1957, \"CPA\" Insurance Consulting and Placement is a firm specializing in insurance and reinsurance brokerage.",
  ar: "تأسست عام 1957، CPA هي شركة متخصصة في وساطة التأمين وإعادة التأمين.",
  es: "Fundada en 1957, CPA es una firma especializada en correduría de seguros y reaseguros.",
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
