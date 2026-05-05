import { FileText, Download, Users, Building2, Shield, AlertTriangle, ChevronRight, CheckCircle2, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { useState, useEffect } from "react";
import catalogEntreprises from "@/assets/Catalogue/catalogue_CPA_Entreprises.pdf";
import catalogParticuliers from "@/assets/Catalogue/Catalogue_CPA_Particuliers.pdf";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

type BadgeLabel = "badge_obligatoire" | "badge_recommande" | "badge_parfois" | "badge_optionnelle" | "badge_quasi";

type StatusConfig = {
  color: string;
  text: string;
  label: BadgeLabel;
  borderColor: string;
  bgLight: string;
  iconBg: string;
};

const statusConfig: Record<string, StatusConfig> = {
  obligatoire: { color: "bg-red-500", text: "text-red-500", label: "badge_obligatoire", borderColor: "border-red-500/30", bgLight: "bg-red-500/10", iconBg: "from-red-500/20 to-red-500/5" },
  recommandee: { color: "bg-green-600", text: "text-green-600", label: "badge_recommande", borderColor: "border-green-500/30", bgLight: "bg-green-500/10", iconBg: "from-green-500/20 to-green-500/5" },
  parfois: { color: "bg-orange-500", text: "text-orange-600", label: "badge_parfois", borderColor: "border-orange-500/30", bgLight: "bg-orange-500/10", iconBg: "from-orange-500/20 to-orange-500/5" },
  optionnelle: { color: "bg-green-500", text: "text-green-600", label: "badge_optionnelle", borderColor: "border-green-500/30", bgLight: "bg-green-500/10", iconBg: "from-green-500/20 to-green-500/5" },
  quasi: { color: "bg-orange-400", text: "text-orange-500", label: "badge_quasi", borderColor: "border-orange-400/30", bgLight: "bg-orange-400/10", iconBg: "from-orange-400/20 to-orange-400/5" },
};

interface InsuranceCardProps {
  titleKey: string;
  descKey: string;
  categoryKey: string;
  icon: string;
  href: string;
  status: keyof typeof statusConfig;
  onClick?: () => void;
}

const InsuranceCard = ({ titleKey, descKey, categoryKey, icon, href, status, onClick }: InsuranceCardProps) => {
  const { t } = useLanguage();
  const config = statusConfig[status];
  
  return (
    <motion.div
      className={`group bg-card rounded-xl border-2 ${config.borderColor} p-4 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer`}
      variants={fadeUpVariants}
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${config.iconBg} flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1 flex-wrap">
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 ${config.color} text-white text-xs font-bold rounded-full shadow-sm`}>
              {t(config.label)}
            </span>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
              {t(categoryKey)}
            </span>
          </div>
          <h4 className="font-bold text-sm mb-1 line-clamp-1 group-hover:text-primary transition-colors">
            {t(titleKey)}
          </h4>
          <p className="text-muted-foreground text-xs leading-snug line-clamp-2">
            {t(descKey)}
          </p>
          <div className="mt-2 flex items-center gap-1 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            <span>{t("ins_auto_lire_plus")}</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface InsuranceModalProps {
  insurance: InsuranceCardProps | null;
  isOpen: boolean;
  onClose: () => void;
}

// Map translation keys to blog content
const blogContentMap: Record<string, { titleKey: string; contentKeys: string[]; conseilKeys: string[] }> = {
  "ins_vehicules_title": { titleKey: "blog_auto_title", contentKeys: ["blog_auto_content_1", "blog_auto_content_2", "blog_auto_content_3"], conseilKeys: ["blog_auto_advice_1", "blog_auto_advice_2", "blog_auto_advice_3"] },
  "ins_sante_card_title": { titleKey: "blog_sante_title", contentKeys: ["blog_sante_content_1", "blog_sante_content_2", "blog_sante_content_3"], conseilKeys: ["blog_sante_advice_1", "blog_sante_advice_2", "blog_sante_advice_3"] },
  "ins_habitation_title": { titleKey: "blog_habitation_title", contentKeys: ["blog_habitation_content_1", "blog_habitation_content_2", "blog_habitation_content_3"], conseilKeys: ["blog_habitation_advice_1", "blog_habitation_advice_2", "blog_habitation_advice_3"] },
};

const InsuranceModal = ({ insurance, isOpen, onClose }: InsuranceModalProps) => {
  const { t } = useLanguage();
  const config = insurance ? statusConfig[insurance.status] : null;

  // Get translated blog content based on titleKey
  const getBlogContent = () => {
    if (!insurance) return { title: "", content: [], conseils: [] };
    const blogData = blogContentMap[insurance.titleKey];
    
    if (blogData) {
      return {
        title: t(blogData.titleKey),
        content: blogData.contentKeys.map(key => t(key)),
        conseils: blogData.conseilKeys.map(key => t(key)),
      };
    }
    
    // Default blog content
    return {
      title: t("blog_default_title"),
      content: [
        t("blog_default_content_1"),
        t("blog_default_content_2"),
        t("blog_default_content_3"),
      ],
      conseils: [t("blog_default_advice_1"), t("blog_default_advice_2"), t("blog_default_advice_3")],
    };
  };

  const blog = getBlogContent();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!insurance) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-card rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={`bg-gradient-to-r ${config.iconBg} p-6 border-b border-border`}>
              <div className="flex items-start gap-4">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${config.iconBg} flex items-center justify-center text-3xl shadow-lg`}>
                  {insurance.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 ${config.color} text-white text-xs font-bold rounded-full shadow-sm`}>
                      {t(config.label)}
                    </span>
                    <span className="text-xs text-muted-foreground bg-white/50 px-2 py-0.5 rounded-full">
                        {t(insurance.categoryKey)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold">{t(insurance.titleKey)}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{t(insurance.descKey)}</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(85vh-180px)]">
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                {blog.title}
              </h4>
              
              <div className="space-y-4 mb-6">
                {blog.content.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-sm text-muted-foreground leading-relaxed"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-4 mb-6">
                <h5 className="font-bold text-sm mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  {t("blog_expert_advice")}
                </h5>
                <ul className="space-y-2">
                  {blog.conseils.map((conseil, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-start gap-2 text-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                      <span>{conseil}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3">
                <a
                  href={insurance.href}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm transition-all hover:shadow-lg"
                >
                  <Shield className="w-4 h-4" />
                  {t("blog_subscribe_now")}
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border hover:bg-secondary font-medium text-sm transition-all"
                >
                  <FileText className="w-4 h-4" />
                  {t("blog_contact_us")}
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CatalogPage = () => {
  const { t } = useLanguage();
  const [selectedInsurance, setSelectedInsurance] = useState<InsuranceCardProps | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showParticuliersAll, setShowParticuliersAll] = useState(false);
  const [showEntreprisesAll, setShowEntreprisesAll] = useState(false);

  const catalogUrlParticuliers = catalogParticuliers;
  
  const catalogViewUrlParticuliers = catalogParticuliers;
  
  // Entreprises catalog URL (2026)
  const catalogUrlEntreprises = catalogEntreprises;
  const catalogViewUrlEntreprises = catalogEntreprises;
  const particuliersInsurances: InsuranceCardProps[] = [
    { titleKey: "ins_vehicules_title", descKey: "ins_vehicules_desc", categoryKey: "ins_vehicules_category", icon: "🚗", href: "/particuliers/vehicules", status: "obligatoire" as const },
    { titleKey: "ins_sante_card_title", descKey: "ins_sante_card_desc", categoryKey: "ins_sante_category", icon: "🏥", href: "/particuliers/sante", status: "recommandee" as const },
    { titleKey: "ins_habitation_title", descKey: "ins_habitation_desc", categoryKey: "ins_habitation_category", icon: "🏠", href: "/particuliers/multirisques-habitation", status: "recommandee" as const },
    { titleKey: "ins_retraite_title", descKey: "ins_retraite_desc", categoryKey: "ins_retraite_category", icon: "💰", href: "/particuliers/retraite-capitalisation", status: "recommandee" as const },
    { titleKey: "ins_rc_vie_card_title", descKey: "ins_rc_vie_card_desc", categoryKey: "ins_rc_vie_category", icon: "🛡️", href: "/particuliers/responsabilite", status: "recommandee" as const },
    { titleKey: "ins_voyage_card_title", descKey: "ins_voyage_card_desc", categoryKey: "ins_voyage_category", icon: "✈️", href: "/particuliers/assistance-voyage", status: "recommandee" as const },

    { titleKey: "ins_peche_title", descKey: "ins_peche_desc", categoryKey: "ins_peche_category", icon: "🐟", href: "/particuliers", status: "recommandee" as const },
    { titleKey: "ins_forestier_title", descKey: "ins_forestier_desc", categoryKey: "ins_forestier_category", icon: "🌲", href: "/particuliers", status: "recommandee" as const },
  ];

  const entreprisesInsurances: InsuranceCardProps[] = [
    { titleKey: "ins_multi_risque_card_title", descKey: "ins_multi_risque_card_desc", categoryKey: "ins_biens_category", icon: "🏢", href: "/entreprises", status: "recommandee" as const },
    { titleKey: "ins_personnes_card_title", descKey: "ins_personnes_card_desc", categoryKey: "ins_personnes_category", icon: "👥", href: "/entreprises", status: "obligatoire" as const },
    { titleKey: "ins_rc_pro_card_title", descKey: "ins_rc_pro_card_desc", categoryKey: "ins_rc_category", icon: "⚖️", href: "/entreprises", status: "obligatoire" as const },
    { titleKey: "ins_risques_tech_card_title", descKey: "ins_risques_tech_card_desc", categoryKey: "ins_techniques_category", icon: "⚙️", href: "/entreprises", status: "recommandee" as const },
    { titleKey: "ins_flotte_card_title", descKey: "ins_flotte_card_desc", categoryKey: "ins_flotte_category", icon: "🚙", href: "/entreprises", status: "obligatoire" as const },
    { titleKey: "ins_transport_card_title", descKey: "ins_transport_card_desc", categoryKey: "ins_transport_category", icon: "🚢", href: "/entreprises", status: "recommandee" as const },
    { titleKey: "ins_pertes_card_title", descKey: "ins_pertes_card_desc", categoryKey: "ins_pertes_category", icon: "📊", href: "/entreprises", status: "recommandee" as const },
    { titleKey: "ins_chantier_card_title", descKey: "ins_chantier_card_desc", categoryKey: "ins_chantier_category", icon: "🏗️", href: "/entreprises", status: "obligatoire" as const },
    { titleKey: "ins_cyber_card_title", descKey: "ins_cyber_card_desc", categoryKey: "ins_cyber_category", icon: "💻", href: "/entreprises", status: "recommandee" as const },
    { titleKey: "ins_terrorisme_card_title", descKey: "ins_terrorisme_card_desc", categoryKey: "ins_risques_speciaux_category", icon: "🛡️", href: "/entreprises", status: "recommandee" as const },
    { titleKey: "ins_epargne_entreprise_card_title", descKey: "ins_epargne_entreprise_card_desc", categoryKey: "ins_epargne_category", icon: "💎", href: "/entreprises", status: "recommandee" as const },
    { titleKey: "ins_conseil_card_title", descKey: "ins_conseil_card_desc", categoryKey: "ins_conseil_category", icon: "🔍", href: "/entreprises", status: "recommandee" as const },
  ];

  const openInsuranceModal = (insurance: InsuranceCardProps) => {
    setSelectedInsurance(insurance);
    setIsModalOpen(true);
  };

  const initialParticuliersCount = 6;
  const initialEntreprisesCount = 6;

  const displayedParticuliers = showParticuliersAll 
    ? particuliersInsurances 
    : particuliersInsurances.slice(0, initialParticuliersCount);

  const displayedEntreprises = showEntreprisesAll 
    ? entreprisesInsurances 
    : entreprisesInsurances.slice(0, initialEntreprisesCount);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-primary font-semibold text-sm">{t("nav_catalog_our_catalogs")}</span>
            </motion.div>
            <motion.h1
              className="text-3xl md:text-4xl font-bold mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {t("nav_catalog")}
            </motion.h1>
            <motion.p
              className="text-muted-foreground max-w-xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {t("nav_catalog_download_desc")}
            </motion.p>
          </motion.div>

          {/* Download Cards */}
          <motion.div
            className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto mb-14"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={scaleVariants}>
              <div className="bg-card rounded-xl p-5 border border-border shadow-md hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">{t("nav_catalog_particuliers")}</h3>
                    <p className="text-xs text-muted-foreground">{t("catalog_pdf_year")}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <a href={catalogUrlParticuliers} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-all hover:shadow-lg">
                    <Download className="w-4 h-4" /> {t("nav_download")}
                  </a>
                  <a href={catalogViewUrlParticuliers} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-3 py-2 rounded-lg border border-border hover:bg-secondary text-sm transition-colors">
                    <FileText className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div variants={scaleVariants}>
              <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-5 shadow-md relative overflow-hidden hover:shadow-2xl transition-shadow">
                <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 bg-white/20 rounded-full">
                  <Shield className="w-3 h-3 text-white" />
                  <span className="text-white text-xs font-bold">{t("catalog_obligatoire_badge")}</span>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{t("nav_catalog_entreprises")}</h3>
                    <p className="text-xs text-white/80">{t("catalog_pdf_year")}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <a href={catalogUrlEntreprises} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white text-red-600 font-bold text-sm transition-all hover:shadow-lg">
                    <Download className="w-4 h-4" /> {t("nav_download")}
                  </a>
                  <a href={catalogViewUrlEntreprises} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-3 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-sm transition-colors">
                    <FileText className="w-4 h-4 text-white" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Particuliers */}
          <motion.div
            className="max-w-5xl mx-auto mb-14"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-full mb-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span className="text-blue-600 font-bold text-sm">{t("catalog_particuliers_badge")}</span>
              </div>
              <h2 className="text-xl font-bold">{t("catalog_particuliers_title")}</h2>
            </div>
            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {displayedParticuliers.map((ins, i) => (
                <InsuranceCard 
                  key={i} 
                  {...ins} 
                  onClick={() => openInsuranceModal(ins)}
                />
              ))}
            </motion.div>
            {!showParticuliersAll && particuliersInsurances.length > initialParticuliersCount && (
              <motion.div 
                className="text-center mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <button
                  onClick={() => setShowParticuliersAll(true)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 font-semibold text-sm transition-all hover:shadow-md"
                >
                  {t("catalog_particuliers_voir_plus")} ({particuliersInsurances.length - initialParticuliersCount} {t("catalog_particuliers_autres")})
                  <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
            {showParticuliersAll && particuliersInsurances.length > initialParticuliersCount && (
              <motion.div 
                className="text-center mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <button
                  onClick={() => setShowParticuliersAll(false)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-muted hover:bg-muted/80 text-muted-foreground font-medium text-sm transition-all"
                >
                  {t("catalog_particuliers_reduire")}
                  <ChevronRight className="w-4 h-4 rotate-90" />
                </button>
              </motion.div>
            )}
          </motion.div>

          {/* Entreprises */}
          <motion.div
            className="max-w-5xl mx-auto mb-14"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-500/10 rounded-full mb-2">
                <Shield className="w-4 h-4 text-red-500" />
                <span className="text-red-500 font-bold text-sm">{t("catalog_entreprises_badge")}</span>
              </div>
              <h2 className="text-xl font-bold">{t("catalog_entreprises_title")}</h2>
              <p className="text-sm text-muted-foreground">{t("catalog_entreprises_desc")}</p>
            </div>
            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {displayedEntreprises.map((ins, i) => (
                <InsuranceCard 
                  key={i} 
                  {...ins} 
                  onClick={() => openInsuranceModal(ins)}
                />
              ))}
            </motion.div>
            {!showEntreprisesAll && entreprisesInsurances.length > initialEntreprisesCount && (
              <motion.div 
                className="text-center mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <button
                  onClick={() => setShowEntreprisesAll(true)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 font-semibold text-sm transition-all hover:shadow-md"
                >
                  {t("catalog_entreprises_voir_plus")} ({entreprisesInsurances.length - initialEntreprisesCount} {t("catalog_entreprises_autres")})
                  <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
            {showEntreprisesAll && entreprisesInsurances.length > initialEntreprisesCount && (
              <motion.div 
                className="text-center mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <button
                  onClick={() => setShowEntreprisesAll(false)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-muted hover:bg-muted/80 text-muted-foreground font-medium text-sm transition-all"
                >
                  {t("catalog_entreprises_reduire")}
                  <ChevronRight className="w-4 h-4 rotate-90" />
                </button>
              </motion.div>
            )}
          </motion.div>

          {/* CTA */}
          <motion.div
            className="max-w-xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-xl p-6 border border-border">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">{t("catalog_cta_title")}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t("catalog_cta_desc")}
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl cpa-gradient-bg text-primary-foreground font-bold cpa-shadow text-sm transition-all hover:shadow-lg"
              >
                {t("nav_contact")}
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Insurance Modal */}
      <InsuranceModal 
        insurance={selectedInsurance} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      <Footer />
    </div>
  );
};

export default CatalogPage;
