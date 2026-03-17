import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ChevronRight, Globe } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import cpaLogo from "@/assets/cpa-logo.png";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Lang } from "@/i18n/translations";

interface NavChild {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

const langLabels: Record<Lang, string> = { fr: "FR", en: "EN", ar: "AR", es: "ES" };
const langOrder: Lang[] = ["fr", "en", "ar", "es"];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [mobileSubExpanded, setMobileSubExpanded] = useState<string | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const { t, lang, setLang } = useLanguage();
  const location = useLocation();

  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const submenuTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openDropdown = useCallback((label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(label);
  }, []);

  const closeDropdown = useCallback(() => {
    dropdownTimeout.current = setTimeout(() => {
      setActiveDropdown(null);
      setActiveSubmenu(null);
    }, 200);
  }, []);

  const openSubmenu = useCallback((label: string) => {
    if (submenuTimeout.current) clearTimeout(submenuTimeout.current);
    setActiveSubmenu(label);
  }, []);

  const closeSubmenu = useCallback(() => {
    submenuTimeout.current = setTimeout(() => {
      setActiveSubmenu(null);
    }, 200);
  }, []);

  const navItems: NavItem[] = [
    { label: t("nav_home"), href: "/#hero" },
    {
      label: t("nav_about"), href: "/#apropos",
      children: [
        { label: t("nav_who"), href: "/#apropos" },
        { label: t("nav_values"), href: "/#valeurs" },
      ],
    },
    {
      label: t("nav_individuals"), href: "/particuliers",
      children: [
        { label: t("nav_vehicules"), href: "/particuliers/vehicules" },
        { label: t("nav_health"), href: "/particuliers/sante" },
        { label: t("nav_home_ins"), href: "/particuliers/multirisques-habitation" },
        { label: t("nav_retraite"), href: "/particuliers/retraite-capitalisation" },
        { label: t("nav_responsabilite"), href: "/particuliers/responsabilite" },
        { label: t("nav_assistance"), href: "/particuliers/assistance-voyage" },
        { label: t("nav_individuelle"), href: "/particuliers/individuelle-accident" },
      ],
    },
    {
      label: t("nav_business"), href: "/entreprises",
      children: [
        { label: t("nav_biens"), href: "/entreprises/assurances-biens" },
        { label: t("nav_personnes"), href: "/entreprises/assurances-personnes" },
        { label: t("nav_rc"), href: "/entreprises/responsabilite-civile" },
        { label: t("nav_risques_tech"), href: "/entreprises/risques-techniques" },
        { label: t("nav_auto_flotte"), href: "/entreprises/automobile-flotte" },
        { label: t("nav_transport"), href: "/entreprises/transport-maritime" },
        { label: t("nav_dommage_biens"), href: "/entreprises/dommage-biens" },
        { label: t("nav_pertes"), href: "/entreprises/pertes-exploitation" },
        { label: t("nav_construction"), href: "/entreprises/tout-risques-chantier" },
        { label: t("nav_cyber"), href: "/entreprises/cyber-criminalite" },
        { label: t("nav_terrorisme"), href: "/entreprises/terrorisme-sabotage" },
        { label: t("nav_epargne_vie"), href: "/entreprises/epargne-vie" },
        { label: t("nav_audit"), href: "/entreprises/audit-management" },
      ],
    },
    {
      label: t("nav_expertise"), href: "/expertise",
    },
    { label: t("nav_contact"), href: "/contact" },
  ];

  const isHash = (href: string) => href.includes("#");

  const NavLinkEl = ({ href, children, className, onClick }: { href: string; children: React.ReactNode; className?: string; onClick?: () => void }) => {
    if (isHash(href)) {
      if (location.pathname !== "/" && href.startsWith("/#")) {
        return <Link to={href} className={className} onClick={onClick}>{children}</Link>;
      }
      return <a href={href.replace("/#", "#")} className={className} onClick={onClick}>{children}</a>;
    }
    return <Link to={href} className={className} onClick={onClick}>{children}</Link>;
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 cpa-glass"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <a href="/#hero" className="flex items-center gap-2">
          <img src={cpaLogo} alt="CPA - Conseil et Placement d'Assurances" className="h-10 w-auto" />
        </a>

        {/* Desktop menu */}
        <div className="hidden lg:flex items-center gap-0.5">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => openDropdown(item.label)}
              onMouseLeave={closeDropdown}
            >
              <NavLinkEl
                href={item.href}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:text-primary hover:bg-secondary transition-all"
              >
                {item.label}
                {item.children && <ChevronDown className="w-3 h-3" />}
              </NavLinkEl>
              <AnimatePresence>
                {item.children && activeDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-1 bg-card rounded-xl shadow-lg border border-border p-2 min-w-[240px] max-h-[70vh] overflow-y-auto z-50"
                    onMouseEnter={() => openDropdown(item.label)}
                    onMouseLeave={closeDropdown}
                  >
                    {item.children.map((child) => (
                      <div
                        key={child.label}
                        className="relative"
                        onMouseEnter={() => child.children && openSubmenu(child.label)}
                        onMouseLeave={closeSubmenu}
                      >
                        <NavLinkEl
                          href={child.href}
                          className="flex items-center justify-between px-4 py-2.5 text-sm text-foreground hover:text-primary hover:bg-secondary rounded-lg transition-all"
                        >
                          {child.label}
                          {child.children && <ChevronRight className="w-3 h-3" />}
                        </NavLinkEl>
                        <AnimatePresence>
                          {child.children && activeSubmenu === child.label && (
                            <motion.div
                              initial={{ opacity: 0, x: 8 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 8 }}
                              className="absolute left-full top-0 ml-1 bg-card rounded-xl shadow-lg border border-border p-2 min-w-[220px] z-50"
                              onMouseEnter={() => openSubmenu(child.label)}
                              onMouseLeave={closeSubmenu}
                            >
                              {child.children.map((sub) => (
                                <NavLinkEl
                                  key={sub.label}
                                  href={sub.href}
                                  className="block px-4 py-2.5 text-sm text-foreground hover:text-primary hover:bg-secondary rounded-lg transition-all"
                                >
                                  {sub.label}
                                </NavLinkEl>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-secondary transition-all"
            >
              <Globe className="w-4 h-4" />
              {langLabels[lang]}
              <ChevronDown className="w-3 h-3" />
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  className="absolute top-full right-0 mt-1 bg-card rounded-lg shadow-lg border border-border p-1 min-w-[80px] z-50"
                >
                  {langOrder.map((l) => (
                    <button
                      key={l}
                      onClick={() => { setLang(l); setLangOpen(false); }}
                      className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${l === lang ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"}`}
                    >
                      {langLabels[l]}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl cpa-gradient-bg text-primary-foreground text-sm font-semibold cpa-shadow hover:opacity-90 transition-opacity"
          >
            {t("nav_quote")}
          </Link>
        </div>

        {/* Mobile toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="p-2 rounded-lg border border-border text-sm font-medium flex items-center gap-1"
            >
              <Globe className="w-4 h-4" />
              {langLabels[lang]}
            </button>
            {langOpen && (
              <div className="absolute top-full right-0 mt-1 bg-card rounded-lg shadow-lg border border-border p-1 min-w-[80px] z-50">
                {langOrder.map((l) => (
                  <button
                    key={l}
                    onClick={() => { setLang(l); setLangOpen(false); }}
                    className={`block w-full text-left px-3 py-2 text-sm rounded-md ${l === lang ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"}`}
                  >
                    {langLabels[l]}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-card border-t border-border max-h-[80vh] overflow-y-auto"
          >
            <div className="container mx-auto px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between">
                    <NavLinkEl
                      href={item.href}
                      onClick={() => !item.children && setIsOpen(false)}
                      className="flex-1 block px-4 py-3 text-sm font-medium text-foreground hover:text-primary hover:bg-secondary rounded-lg transition-all"
                    >
                      {item.label}
                    </NavLinkEl>
                    {item.children && (
                      <button
                        onClick={() => { setMobileExpanded(mobileExpanded === item.label ? null : item.label); setMobileSubExpanded(null); }}
                        className="p-2 hover:bg-secondary rounded-lg"
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === item.label ? "rotate-180" : ""}`} />
                      </button>
                    )}
                  </div>
                  <AnimatePresence>
                    {item.children && mobileExpanded === item.label && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="ml-4 space-y-0.5 overflow-hidden"
                      >
                        {item.children.map((child) => (
                          <div key={child.label}>
                            <div className="flex items-center justify-between">
                              <NavLinkEl
                                href={child.href}
                                onClick={() => !child.children && setIsOpen(false)}
                                className="flex-1 block px-4 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                              >
                                {child.label}
                              </NavLinkEl>
                              {child.children && (
                                <button
                                  onClick={() => setMobileSubExpanded(mobileSubExpanded === child.label ? null : child.label)}
                                  className="p-1.5 hover:bg-secondary rounded-lg"
                                >
                                  <ChevronDown className={`w-3 h-3 transition-transform ${mobileSubExpanded === child.label ? "rotate-180" : ""}`} />
                                </button>
                              )}
                            </div>
                            <AnimatePresence>
                              {child.children && mobileSubExpanded === child.label && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="ml-4 overflow-hidden"
                                >
                                  {child.children.map((sub) => (
                                    <NavLinkEl
                                      key={sub.label}
                                      href={sub.href}
                                      onClick={() => setIsOpen(false)}
                                      className="block px-4 py-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                                    >
                                      {sub.label}
                                    </NavLinkEl>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="block text-center px-5 py-3 rounded-xl cpa-gradient-bg text-primary-foreground text-sm font-semibold mt-4"
              >
                {t("nav_quote")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
