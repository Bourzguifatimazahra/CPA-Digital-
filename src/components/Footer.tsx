import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import cpaLogo from "@/assets/cpa-logo.png";
import { useLanguage } from "@/i18n/LanguageContext";

const contactItems = [
  { icon: Phone, text: "+212 5 22 95 39 00", ltr: true },
  { icon: Mail, text: "info@cpas.ma" },
  { icon: MapPin, text: "Casablanca, Maroc" },
  { icon: Clock, text: "Lun - Ven : 8h30 - 18h00" },
];

const Footer = () => {
  const { t, lang } = useLanguage();

  const footerLinks = [
    {
      title: t("footer_nav"),
      links: [
        { label: t("nav_home"), href: "/" },
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
      <div className="border-b border-primary-foreground/10 overflow-hidden py-3">
        <motion.div
          className="flex gap-12 items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {marqueeItems.map((item, i) => (
            <div key={i} className="flex items-center gap-2 shrink-0 text-primary-foreground/70 text-sm">
              <item.icon className="w-4 h-4 text-accent" />
              <span dir={(item as any).ltr ? "ltr" : undefined}>{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={cpaLogo} alt="CPA" className="w-10 h-10 brightness-0 invert" />
              <div>
                <span className="font-heading font-bold text-xl">CPA</span>
                <p className="text-primary-foreground/60 text-xs">Conseil et Placement d'Assurances</p>
              </div>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6 max-w-sm">{t("footer_desc")}</p>
            <div className="flex gap-3">
              {[
                { name: "LinkedIn", href: "https://linkedin.com/company/cpa-assurances", svg: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" },
                { name: "Facebook", href: "https://facebook.com/cpaassurances", svg: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
                { name: "Instagram", href: "https://instagram.com/cpaassurances", svg: "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" },
                { name: "TikTok", href: "https://tiktok.com/@cpaassurances", svg: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.16 15.3a6.34 6.34 0 0 0 6.33 6.34 6.34 6.34 0 0 0 6.34-6.34V8.73a8.19 8.19 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.16z" },
              ].map((social) => (
                <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
                  aria-label={social.name}>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d={social.svg} /></svg>
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="font-heading font-bold text-sm mb-4">{group.title}</h4>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-primary-foreground/60 text-sm hover:text-primary-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={cpaLogo} alt="CPA" className="w-6 h-6 brightness-0 invert" />
            <p className="text-primary-foreground/50 text-xs">
              © {new Date().getFullYear()} CPA – Conseil et Placement d'Assurances. {t("footer_rights")}
            </p>
          </div>
          <div className="flex gap-4 text-primary-foreground/50 text-xs">
            <a href="#" className="hover:text-primary-foreground transition-colors">{t("footer_legal")}</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">{t("footer_privacy")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
