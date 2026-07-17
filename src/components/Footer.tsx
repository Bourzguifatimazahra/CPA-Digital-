import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import cpaLogo from "@/assets/cpa-logo.png";
import holmarcomLogo from "@/assets/Affiliations/holmarcom.png";
import euribronLogo from "@/assets/Affiliations/euribron.png";
import { useLanguage } from "@/i18n/LanguageContext";

interface ContactItem {
  icon: React.ElementType;
  text: string;
  ltr?: boolean;
  href?: string;
}

const contactItems: ContactItem[] = [
  { icon: Phone, text: "+212 5 22 95 39 00", ltr: true },
  { icon: Mail, text: "info@cpa.ma" },
  { icon: MapPin, text: "Casablanca, Maroc", href: "https://maps.app.goo.gl/ZL7oQLPCXskUGTUz5" },
  { icon: Clock, text: "Lun - Ven : 8h30 - 18h00" },
  { icon: Phone, text: "+212 5 22 95 39 00", ltr: true },
  { icon: Mail, text: "info@cpa.ma" },
  { icon: MapPin, text: "Tanger, Maroc", href: "https://maps.app.goo.gl/haMwPhLXUVd39k1eA" },
  { icon: Clock, text: "Lun - Ven : 8h30 - 18h00" },
];

const Footer = () => {
  const { t, lang } = useLanguage();

  const footerLinks = [
    {
      title: t("footer_nav"),
      links: [
        { label: t("nav_home"), href: "/#hero" },
        { label: t("nav_about"), href: "/#apropos" },
        { label: t("nav_expertise"), href: "/expertise" },
        { label: t("nav_contact"), href: "/contact" },
      ],
    },
    {
      title: t("nav_individuals"),
      links: [
        { label: lang === "fr" ? "Véhicules" : "Vehicles", href: "/particuliers/vehicules" },
        { label: t("nav_health"), href: "/particuliers/sante" },
        { label: t("nav_home_ins"), href: "/particuliers/multirisques-habitation" },
        { label: t("nav_retraite"), href: "/particuliers/retraite-capitalisation" },
      ],
    },
    {
      title: t("nav_business"),
      links: [
        { label: t("nav_biens"), href: "/entreprises/assurances-biens" },
        { label: t("nav_rc"), href: "/entreprises/responsabilite-civile" },
        { label: t("nav_construction"), href: "/entreprises/tout-risques-chantier" },
        { label: t("nav_cyber"), href: "/entreprises/cyber-criminalite" },
      ],
    },
  ];

  const marqueeItems = [...contactItems, ...contactItems, ...contactItems, ...contactItems];

  return (
    <footer className="cpa-gradient-dark-bg text-primary-foreground">
      {/* Minimized marquee section */}
      <div className="border-b border-primary-foreground/10 overflow-hidden py-2">
        <motion.div
          className="flex gap-12 items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {marqueeItems.map((item, i) => (
            <div key={i} className="flex items-center gap-2 shrink-0 text-primary-foreground/70 text-xs">
              <item.icon className="w-3 h-3 text-accent" />
              {item.href ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">{item.text}</a>
              ) : (
                <span dir={item.ltr ? "ltr" : undefined}>{item.text}</span>
              )}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Minimized main footer content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <img src={cpaLogo} alt="CPA" className="w-8 h-8 brightness-0 invert" />
              <div>
                <span className="font-heading font-bold text-lg">CPA</span>
                <p className="text-primary-foreground/60 text-xs">Conseil et Placement d'Assurances</p>
              </div>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-4 max-w-sm">{t("footer_desc")}</p>
            <div className="flex gap-2">
              {[
                { name: "LinkedIn", href: "https://www.linkedin.com/company/cpa-conseil-assurances", svg: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" },
                { name: "Facebook", href: "https://www.facebook.com/share/1866xpgDAb/?mibextid=wwXIfr", svg: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
                { name: "Instagram", href: "https://www.instagram.com/c.p.a.ma?igsh=dmxrdXdwbG84MTZw", svg: "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" },
                { name: "TikTok", href: "https://www.tiktok.com/@cpaholmarcom?lang=fr", svg: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.16 15.3a6.34 6.34 0 0 0 6.33 6.34 6.34 6.34 0 0 0 6.34-6.34V8.73a8.19 8.19 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.16z" },
                { name: "YouTube", href: "https://www.youtube.com/@CPA-j6z", svg: "M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z" },
              ].map((social) => (
                <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
                  aria-label={social.name}>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d={social.svg} /></svg>
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="font-heading font-bold text-xs mb-3">{group.title}</h4>
              <ul className="space-y-1.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-primary-foreground/60 text-xs hover:text-primary-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Minimized bottom section with affiliations centered */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col items-center gap-3">
            {/* Affiliation Logos - Centered */}
            <motion.div
              initial={{ opacity: 50, y: 10 }}
              whileInView={{ opacity: 10, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-2"
            >
              <div className="flex items-center gap-2">
                <motion.div
                   whileHover={{ scale: 1.1 }}
                   transition={{ duration: 0.8 }}
                   className="bg-white rounded p-1 w-16 h-10 flex items-center justify-center"
                 >
                   <a href="https://www.holmarcom.ma" target="_blank" rel="noopener noreferrer">
                     <img src={holmarcomLogo} alt="Holmarcom" className="w-full h-full object-contain cursor-pointer" />
                   </a>
                 </motion.div>
                 <motion.div
                   whileHover={{ scale: 1.1 }}
                   transition={{ duration: 0.3 }}
                   className="bg-white rounded p-1 w-16 h-10 flex items-center justify-center"
                 >
                   <a href="https://euribron.com" target="_blank" rel="noopener noreferrer">
                     <img src={euribronLogo} alt="EURIBRON" className="w-full h-full object-contain cursor-pointer" />
                   </a>
                 </motion.div>
              </div>
            </motion.div>

            {/* Copyright and Legal Links - Centered */}
            <div className="flex items-center gap-2">
              <img src={cpaLogo} alt="CPA" className="w-5 h-5 brightness-0 invert" />
              <p className="text-primary-foreground/50 text-xs">
                © {new Date().getFullYear()} CPA – {t("footer_rights")}
              </p>
              <div className="flex gap-3 text-primary-foreground/50 text-xs ml-2">
                <Link to="/mentions-legales" className="hover:text-primary-foreground transition-colors">{t("footer_legal")}</Link>
                 <Link to="/politique-confidentialite" className="hover:text-primary-foreground transition-colors">{t("footer_privacy")}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
