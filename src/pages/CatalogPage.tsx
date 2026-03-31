import { FileText, Download, Users, Building2, Shield, AlertTriangle, ChevronRight, CheckCircle2, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { useState, useEffect } from "react";

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

const statusConfig = {
  obligatoire: { color: "bg-red-500", text: "text-red-500", label: "Obligatoire", borderColor: "border-red-500/30", bgLight: "bg-red-500/10", iconBg: "from-red-500/20 to-red-500/5" },
  recommandee: { color: "bg-green-600", text: "text-green-600", label: "Recommandée", borderColor: "border-green-500/30", bgLight: "bg-green-500/10", iconBg: "from-green-500/20 to-green-500/5" },
  parfois: { color: "bg-orange-500", text: "text-orange-600", label: "Parfois obligatoire", borderColor: "border-orange-500/30", bgLight: "bg-orange-500/10", iconBg: "from-orange-500/20 to-orange-500/5" },
  optionnelle: { color: "bg-green-500", text: "text-green-600", label: "Optionnelle", borderColor: "border-green-500/30", bgLight: "bg-green-500/10", iconBg: "from-green-500/20 to-green-500/5" },
  quasi: { color: "bg-orange-400", text: "text-orange-500", label: "Quasi obligatoire", borderColor: "border-orange-400/30", bgLight: "bg-orange-400/10", iconBg: "from-orange-400/20 to-orange-400/5" },
};

interface InsuranceCardProps {
  title: string;
  description: string;
  icon: string;
  category: string;
  href: string;
  status: keyof typeof statusConfig;
  fullDescription?: string;
  avantages?: string[];
  onClick?: () => void;
}

const InsuranceCard = ({ title, description, icon, category, href, status, onClick }: InsuranceCardProps) => {
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
              {config.label}
            </span>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
              {category}
            </span>
          </div>
          <h4 className="font-bold text-sm mb-1 line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h4>
          <p className="text-muted-foreground text-xs leading-snug line-clamp-2">
            {description}
          </p>
          <div className="mt-2 flex items-center gap-1 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            <span>Lire plus</span>
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

const InsuranceModal = ({ insurance, isOpen, onClose }: InsuranceModalProps) => {
  if (!insurance) return null;
  const config = statusConfig[insurance.status];

  const blogContent: Record<string, { title: string; content: string[]; conseils: string[] }> = {
    "Assurance Véhicules": {
      title: "Guide complet de l'Assurance Auto au Maroc",
      content: [
        "L'assurance automobile est obligatoire au Maroc pour tous les propriétaires de véhicules à moteur. Elle couvre la responsabilité civile envers les tiers.",
        "Les garanties principales incluent la RC (responsabilité civile), la garantie tous risques, le vol, l'incendie, et l'assistance dépannage.",
        "Le prix varie selon le type de véhicule, l'âge du conducteur, et le历史 de sinistres. Comparez toujours plusieurs devis.",
      ],
      conseils: [
        "Vérifiez toujours les exclusions de votre contrat",
        "Conservez un historique de conduite sans sinistres pour bénéficier de réduction",
        "Ajoutez une garantie conducteur pour une protection complète",
      ],
    },
    "Assurance Santé": {
      title: "Comprendre l'Assurance Santé au Maroc",
      content: [
        "L'assurance santé au Maroc peut être obligatoire pour les salariés du secteur privé via la CNSS, ou volontaire pour les indépendants.",
        "Les mutuelles d'entreprise couvrent généralement l'hospitalisation, les consultations, et parfois l'optique et le dentaire.",
        "Choose between complementary insurance and main insurance based on your needs and budget.",
      ],
      conseils: [
        "Vérifiez le plafond de remboursement annuel",
        "Préférez les réseaux de soins conventionnés pour de meilleurs tarifs",
        "Souscrivez avant d'avoir des problèmes de santé pour éviter les exclusions",
      ],
    },
    "Multi Risque": {
      title: "Multirisques Habitation : Protégez votre foyer",
      content: [
        "La multirisques habitation couvre votre logement et vos biens contre les dommages causés par le feu, le vol, les dégâts des eaux, et plus encore.",
        "Elle inclut généralement la responsabilité civile villégiature qui vous protège lors de vos vacances.",
        "Some contracts also cover temporary relocation costs if your home becomes uninhabitable.",
      ],
      conseils: [
        "Faites un inventaire précis de vos biens avec photos",
        "Mettez à jour la valeur de vos biens chaque année",
        "Vérifiez les franchises et les plafonds de garantie",
      ],
    },
    "default": {
      title: `Tout savoir sur ${insurance.title}`,
      content: [
        `L'assurance ${insurance.title} est conçue pour vous protéger contre les risques spécifiques liés à votre situation.`,
        "Nos experts CPA sont là pour vous conseiller et vous proposer la couverture la plus adaptée à vos besoins.",
        "Contactez-nous pour un devis personnalisé et une analyse approfondie de vos besoins.",
      ],
      conseils: [
        "Évaluez vos besoins réels avant de choisir votre couverture",
        "Comparez les garanties et les tarifs entre différents assureurs",
        "N'hésitez pas à demander conseil à nos experts",
      ],
    },
  };

  const blog = blogContent[insurance.title] || blogContent["default"];

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
                      {config.label}
                    </span>
                    <span className="text-xs text-muted-foreground bg-white/50 px-2 py-0.5 rounded-full">
                      {insurance.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold">{insurance.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{insurance.description}</p>
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
                  Nos conseils d'experts
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
                  Souscrire maintenant
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border hover:bg-secondary font-medium text-sm transition-all"
                >
                  <FileText className="w-4 h-4" />
                  Nous contacter
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

  const catalogUrl = "https://drive.google.com/uc?export=download&id=1888tZBVYKyLlBpuiOD2osjF34b1y_q3J";
  const catalogViewUrl = "https://drive.google.com/file/d/1888tZBVYKyLlBpuiOD2osjF34b1y_q3J/view";

  const particuliersInsurances: InsuranceCardProps[] = [
    { title: "Assurance Véhicules", description: "Protection complète pour automobile et moto. RC, tous risques, assistance.", icon: "🚗", category: "RC Auto", href: "/particuliers/vehicules", status: "obligatoire" as const },
    { title: "Assurance Santé", description: "Couverture santé complète. Hospitalisation, soins, optique, dentaire.", icon: "🏥", category: "Santé", href: "/particuliers/sante", status: "recommandee" as const },
    { title: "Multirisques Habitation", description: "Protégez votre logement et biens contre tous les risques.", icon: "🏠", category: "Logement", href: "/particuliers/multirisques-habitation", status: "recommandee" as const },
    { title: "Retraite & Capitalisation", description: "Préparez votre avenir avec nos solutions d'épargne retraite.", icon: "💰", category: "Épargne", href: "/particuliers/retraite-capitalisation", status: "recommandee" as const },
    { title: "Responsabilité Civile", description: "Protection contre les dommages causés à des tiers.", icon: "🛡️", category: "RC Vie privée", href: "/particuliers/responsabilite", status: "recommandee" as const },
    { title: "Assistance & Voyage", description: "Voyagez l'esprit tranquille avec couverture internationale.", icon: "✈️", category: "Voyage", href: "/particuliers/assistance-voyage", status: "recommandee" as const },
    { title: "Individuelle Accident", description: "Protection en cas d'accident. Décès, maladie, pack santé monde.", icon: "❤️", category: "Accident", href: "/particuliers/individuelle-accident", status: "recommandee" as const },
    { title: "Accident de Travail", description: "Protection et indemnisation en cas d'accident professionnel.", icon: "⚠️", category: "Accident", href: "/particuliers/accident-travail", status: "recommandee" as const },
    { title: "Pêche Artisanale", description: "Assurance spécifique pour les activités de pêche artisanale.", icon: "🐟", category: "Pêche", href: "/particuliers/peche-artisanale", status: "recommandee" as const },
    { title: "Accident de Travail Forestière", description: "Couverture pour les travailleurs forestiers contre les accidents.", icon: "🌲", category: "Forestier", href: "/particuliers/accident-travail-forestiere", status: "recommandee" as const },
  ];

  const entreprisesInsurances: InsuranceCardProps[] = [
    { title: "Multi Risque", description: "Protection complète de votre entreprise contre tous les risques.", icon: "🏢", category: "Biens", href: "/entreprises/multi-risque", status: "recommandee" as const },
    { title: "Accident de Travail", description: "Protection des collaborateurs contre les accidents du travail.", icon: "👥", category: "Personnes", href: "/entreprises/accident-travail", status: "recommandee" as const },
    { title: "Responsabilité Civile Professionnelle", description: "Obligatoire pour médecins, cliniques, experts comptables, avocats, architectes et intermédiaires d'assurances.", icon: "⚖️", category: "RC", href: "/entreprises/responsabilite-civile", status: "obligatoire" as const },
    { title: "Risques Techniques", description: "Couverture des risques liés aux équipements techniques et industriels.", icon: "⚙️", category: "Techniques", href: "/entreprises/risques-techniques", status: "recommandee" as const },
    { title: "Responsabilité Civile Automobile", description: "Gérez et protégez l'ensemble de votre parc automobile.", icon: "🚙", category: "Flotte", href: "/entreprises/responsabilite-civile-automobile", status: "obligatoire" as const },
    { title: "Transport & Maritime", description: "Assurance des marchandises transportées et des corps de navires.", icon: "🚢", category: "Transport", href: "/entreprises/transport-maritime", status: "recommandee" as const },
    { title: "Pertes d'Exploitation", description: "Garantissez la continuité financière en cas de sinistre.", icon: "📊", category: "Pertes", href: "/entreprises/pertes-exploitation", status: "recommandee" as const },
    { title: "Tout Risques Chantier", description: "Assurance obligatoire pour vos chantiers de construction.", icon: "🏗️", category: "Chantier", href: "/entreprises/tout-risques-chantier", status: "obligatoire" as const },
    { title: "Cyber Criminalité", description: "Protégez votre entreprise contre les menaces numériques.", icon: "💻", category: "Cyber", href: "/entreprises/cyber-criminalite", status: "recommandee" as const },
    { title: "Terrorisme & Sabotage", description: "Couverture spécifique contre les actes de terrorismee.", icon: "🛡️", category: "Risques Spéciaux", href: "/entreprises/terrorisme-sabotage", status: "recommandee" as const },
    { title: "Épargne & Vie Capitalisation", description: "Solutions d'épargne pour collaborateurs et dirigeants.", icon: "💎", category: "Épargne", href: "/entreprises/epargne-vie", status: "recommandee" as const },
    { title: "Audit et Management des Risques", description: "Analyse approfondie et gestion proactive de vos risques.", icon: "🔍", category: "Conseil", href: "/entreprises/audit-management", status: "recommandee" as const },
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
              <span className="text-primary font-semibold text-sm">Nos Catalogues</span>
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
              Téléchargez nos catalogues PDF et découvrez nos solutions d'assurance pour particuliers et entreprises.
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
                    <p className="text-xs text-muted-foreground">PDF 2024</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <a href={catalogUrl} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-all hover:shadow-lg">
                    <Download className="w-4 h-4" /> Télécharger
                  </a>
                  <a href={catalogViewUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-3 py-2 rounded-lg border border-border hover:bg-secondary text-sm transition-colors">
                    <FileText className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div variants={scaleVariants}>
              <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-5 shadow-md relative overflow-hidden hover:shadow-2xl transition-shadow">
                <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 bg-white/20 rounded-full">
                  <Shield className="w-3 h-3 text-white" />
                  <span className="text-white text-xs font-bold">OBLIGATOIRE</span>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{t("nav_catalog_entreprises")}</h3>
                    <p className="text-xs text-white/80">PDF 2024</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <a href={catalogUrl} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white text-red-600 font-bold text-sm transition-all hover:shadow-lg">
                    <Download className="w-4 h-4" /> Télécharger
                  </a>
                  <a href={catalogViewUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-3 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-sm transition-colors">
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
                <span className="text-blue-600 font-bold text-sm">Particuliers</span>
              </div>
              <h2 className="text-xl font-bold">Nos Solutions pour les Particuliers</h2>
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
                  Voir plus ({particuliersInsurances.length - initialParticuliersCount} autres)
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
                  Réduire
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
                <span className="text-red-500 font-bold text-sm">Entreprises</span>
              </div>
              <h2 className="text-xl font-bold">Assurances pour les Entreprises</h2>
              <p className="text-sm text-muted-foreground">Protégez votre activité avec nos solutions professionnelles</p>
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
                  Voir plus ({entreprisesInsurances.length - initialEntreprisesCount} autres)
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
                  Réduire
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
              <h3 className="font-bold mb-2">Besoin d'un conseil personnalisé ?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Nos experts CPA vous accompagnent dans le choix de vos assurances.
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
