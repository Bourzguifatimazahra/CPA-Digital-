import { useState, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { Calculator, ArrowRight, Download, MessageCircle, Mail, ExternalLink, Home } from "lucide-react";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";

const currencies = [
  { code: "DH", label: "MAD (DH)", rate: 1 },
  { code: "€", label: "EUR (€)", rate: 0.091 },
  { code: "$", label: "USD ($)", rate: 0.099 },
];

const insuranceTypes: Record<string, { value: string; label: string; rate: number }[]> = {
  fr: [
    { value: "auto", label: "Automobile", rate: 0.035 },
    { value: "habitation", label: "Multirisques Habitation", rate: 0.003 },
    { value: "sante", label: "Santé", rate: 0.05 },
    { value: "at", label: "Accidents de Travail", rate: 0.02 },
    { value: "rc", label: "Responsabilité Civile", rate: 0.015 },
    { value: "transport", label: "Transport", rate: 0.008 },
    { value: "construction", label: "Construction", rate: 0.012 },
    { value: "cyber", label: "Cyber Risques", rate: 0.025 },
    { value: "flotte", label: "Flotte Auto", rate: 0.03 },
  ],
  en: [
    { value: "auto", label: "Auto", rate: 0.035 },
    { value: "habitation", label: "Home Multi-Risk", rate: 0.003 },
    { value: "sante", label: "Health", rate: 0.05 },
    { value: "at", label: "Work Accidents", rate: 0.02 },
    { value: "rc", label: "Civil Liability", rate: 0.015 },
    { value: "transport", label: "Transport", rate: 0.008 },
    { value: "construction", label: "Construction", rate: 0.012 },
    { value: "cyber", label: "Cyber Risks", rate: 0.025 },
    { value: "flotte", label: "Auto Fleet", rate: 0.03 },
  ],
  ar: [
    { value: "auto", label: "السيارات", rate: 0.035 },
    { value: "habitation", label: "المنزل", rate: 0.003 },
    { value: "sante", label: "الصحة", rate: 0.05 },
    { value: "at", label: "حوادث العمل", rate: 0.02 },
    { value: "rc", label: "المسؤولية المدنية", rate: 0.015 },
    { value: "transport", label: "النقل", rate: 0.008 },
    { value: "construction", label: "البناء", rate: 0.012 },
    { value: "cyber", label: "المخاطر السيبرانية", rate: 0.025 },
    { value: "flotte", label: "أسطول السيارات", rate: 0.03 },
  ],
  es: [
    { value: "auto", label: "Automóvil", rate: 0.035 },
    { value: "habitation", label: "Hogar", rate: 0.003 },
    { value: "sante", label: "Salud", rate: 0.05 },
    { value: "at", label: "Accidentes Laborales", rate: 0.02 },
    { value: "rc", label: "Responsabilidad Civil", rate: 0.015 },
    { value: "transport", label: "Transporte", rate: 0.008 },
    { value: "construction", label: "Construcción", rate: 0.012 },
    { value: "cyber", label: "Riesgos Cibernéticos", rate: 0.025 },
    { value: "flotte", label: "Flota Auto", rate: 0.03 },
  ],
};

const QuoteCalculator = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const types = insuranceTypes[lang] || insuranceTypes.fr;
  // Set Automobile as supreme/default type
  const [selectedType, setSelectedType] = useState("auto");
  const [value, setValue] = useState("100000");
  const [currency, setCurrency] = useState("DH");
  const [result, setResult] = useState<{ min: number; max: number } | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const currencyObj = currencies.find((c) => c.code === currency) || currencies[0];

  const calculate = () => {
    const numValue = parseFloat(value) || 0;
    const type = types.find((t) => t.value === selectedType);
    if (!type || numValue <= 0) return;
    const base = numValue * type.rate;
    const estimated = base;
    setResult({ min: Math.round(estimated * 0.8), max: Math.round(estimated * 1.3) });
    setShowResult(true);
    setShowForm(false);
  };

  const handleBack = () => {
    setShowResult(false);
    setResult(null);
    setShowForm(true);
  };

  const getConvertedAmount = (amount: number) => Math.round(amount * currencyObj.rate);

  const selectedTypeLabel = types.find((t) => t.value === selectedType)?.label || "";

  const exportPDF = () => {
    if (!result) return;
    const doc = new jsPDF();
    const minC = getConvertedAmount(result.min);
    const maxC = getConvertedAmount(result.max);

    // Header with brand colors
    doc.setFillColor(30, 58, 138); // primary blue
    doc.rect(0, 0, 210, 45, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("CPA ASSURANCE", 20, 22);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Courtier d'Assurances depuis 1957", 20, 30);
    doc.text("www.cpa.ma | info@cpa.ma |+212 5 22 95 39 00", 20, 37);

    // Title
    doc.setTextColor(30, 58, 138);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Estimation de Devis", 20, 60);

    // Date
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Date: ${new Date().toLocaleDateString("fr-FR")}`, 20, 68);

    // Info box
    doc.setDrawColor(30, 58, 138);
    doc.setLineWidth(0.5);
    doc.roundedRect(15, 75, 180, 70, 3, 3);

    doc.setTextColor(50, 50, 50);
    doc.setFontSize(11);
    const info = [
      ["Type d'assurance", selectedTypeLabel],
      ["Valeur à assurer", `${parseFloat(value).toLocaleString("fr-FR")} DH`],
      ["Devise", currencyObj.label],
    ];
    let y = 88;
    info.forEach(([label, val]) => {
      doc.setFont("helvetica", "bold");
      doc.text(`${label} :`, 25, y);
      doc.setFont("helvetica", "normal");
      doc.text(val, 90, y);
      y += 14;
    });

    // Result
    doc.setFillColor(240, 245, 255);
    doc.roundedRect(15, 155, 180, 40, 3, 3, "F");
    doc.setTextColor(30, 58, 138);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Estimation de prime annuelle", 20, 170);
    doc.setFontSize(20);
    doc.text(`${minC.toLocaleString("fr-FR")} - ${maxC.toLocaleString("fr-FR")} ${currency}`, 20, 185);

    // Disclaimer
    doc.setTextColor(130, 130, 130);
    doc.setFontSize(8);
    doc.setFont("helvetica", "italic");
    doc.text("* Cette estimation est indicative et ne constitue pas un engagement contractuel.", 20, 210);
    doc.text("Contactez-nous pour obtenir un devis personnalisé et précis.", 20, 216);

    // Footer
    doc.setFillColor(30, 58, 138);
    doc.rect(0, 275, 210, 22, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("CPA Assurance - Angle Boulevard Moulay Youssef et Boulevard Ziraoui, Complexe Moulay Youssef Work Center, 2ème Étage, Casablanca, Maroc", 20, 285);
    doc.text("Tél: +212 5 22 95 39 00| Email: info@cpa.ma", 20, 291);

    doc.save(`Devis_CPA_${selectedTypeLabel.replace(/\s/g, "_")}_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  const sendWhatsApp = () => {
    if (!result) return;
    const minC = getConvertedAmount(result.min);
    const maxC = getConvertedAmount(result.max);
    const msg = encodeURIComponent(
      `Bonjour CPA Assurance,\n\nJe souhaite demander un devis pour :\n- Type : ${selectedTypeLabel}\n- Valeur : ${parseFloat(value).toLocaleString("fr-FR")} DH\n- Estimation : ${minC.toLocaleString("fr-FR")} - ${maxC.toLocaleString("fr-FR")} ${currency}\n\nMerci de me recontacter.`
    );
    window.open(`https://wa.me/0667558436?text=${msg}`, "_blank");
  };

  const sendEmail = () => {
    if (!result) return;
    const minC = getConvertedAmount(result.min);
    const maxC = getConvertedAmount(result.max);
    const subject = encodeURIComponent(`Demande de devis - ${selectedTypeLabel}`);
    const body = encodeURIComponent(
      `Bonjour,\n\nJe souhaite obtenir un devis personnalisé pour :\n\n- Type d'assurance : ${selectedTypeLabel}\n- Valeur à assurer : ${parseFloat(value).toLocaleString("fr-FR")} DH\n- Estimation indicative : ${minC.toLocaleString("fr-FR")} - ${maxC.toLocaleString("fr-FR")} ${currency}\n\nCordialement.`
    );
    window.open(`mailto:info@cpa.ma?subject=${subject}&body=${body}`, "_self");
  };

  // Animation variants for enhanced framer-motion effects
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const buttonHoverVariants: Variants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  const pulseVariants: Variants = {
    pulse: {
      scale: [1, 1.02, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section id="calculateur" className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-accent font-semibold text-sm tracking-wide uppercase"
          >
            {t("calc_badge")}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-3xl md:text-4xl font-heading font-extrabold text-foreground mt-3 mb-4"
          >
            {t("calc_title")}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-muted-foreground text-lg"
          >
            {t("calc_desc")}
          </motion.p>
        </motion.div>

        {/* External Calculator Link Button - Enhanced styling */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mb-8"
        >
          <motion.a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-primary/80 border border-primary text-primary-foreground font-bold text-base shadow-lg hover:shadow-xl transition-all group"
          >
            <ExternalLink className="w-5 h-5" />
            {lang === "fr" ? "Calculateur en ligne" : lang === "en" ? "Online Calculator" : lang === "ar" ? "حاسبة عبر الإنترنت" : "Calculadora en línea"}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>

        {/* Calculator Form */}
        <motion.div 
          initial={{ opacity: 0, y: 40, rotateX: -10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-xl mx-auto bg-card rounded-2xl p-8 border border-border cpa-shadow-lg"
        >
          {/* Back Button */}
          <motion.button
            onClick={handleBack}
            variants={buttonHoverVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <Home className="w-4 h-4" />
            {lang === "fr" ? "Retour à l'accueil" : lang === "en" ? "Back to Home" : "العودة للرئيسية"}
          </motion.button>

          <AnimatePresence mode="wait">
            {showForm && (
              <motion.div 
                variants={containerVariants} 
                initial="hidden" 
                animate="visible"
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {lang === "fr" ? "Type d'assurance" : lang === "en" ? "Insurance Type" : lang === "ar" ? "نوع التأمين" : "Tipo de seguro"}
                  </label>
                  <motion.select 
                    value={selectedType} 
                    onChange={(e) => { setSelectedType(e.target.value); setResult(null); setShowResult(false); }}
                    whileFocus={{ scale: 1.02 }}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                  >
                    {types.map((type, index) => (
                      <option key={type.value} value={type.value}>
                        {index === 0 ? "★ " : ""}{type.label}
                      </option>
                    ))}
                  </motion.select>
                </motion.div>

                {/* Currency selector with enhanced animations */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {lang === "fr" ? "Devise" : lang === "ar" ? "العملة" : lang === "es" ? "Moneda" : "Currency"}
                  </label>
                  <div className="flex gap-2">
                    {currencies.map((c, index) => (
                      <motion.button
                        key={c.code}
                        onClick={() => { setCurrency(c.code); }}
                        type="button"
                        variants={buttonHoverVariants}
                        initial="rest"
                        whileHover="hover"
                        whileTap="tap"
                        custom={index}
                        className={`flex-1 py-3 rounded-xl text-sm font-bold border transition-all ${
                          currency === c.code 
                            ? "cpa-gradient-bg text-primary-foreground border-transparent shadow-md" 
                            : "bg-background text-foreground border-border hover:border-primary/40 hover:shadow-md"
                        }`}
                      >
                        {c.label}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-foreground mb-2">{t("calc_value")}</label>
                  <motion.input 
                    type="number" 
                    value={value} 
                    onChange={(e) => { setValue(e.target.value); setResult(null); setShowResult(false); }} 
                    placeholder="100 000"
                    whileFocus={{ scale: 1.02, borderColor: "rgb(30, 58, 138)" }}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all" 
                  />
                </motion.div>
                 
                <motion.button 
                  type="button"
                  onClick={calculate}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl cpa-gradient-bg text-primary-foreground font-bold text-base cpa-shadow hover:opacity-90 transition-opacity"
                >
                  <Calculator className="w-5 h-5" />
                  {t("calc_estimate")}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results with enhanced animations */}
          <AnimatePresence mode="wait">
            {showResult && result && (
              <motion.div 
                initial={{ opacity: 0, height: 0, scale: 0.9 }}
                animate={{ opacity: 1, height: "auto", scale: 1 }}
                exit={{ opacity: 0, height: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="mt-8 space-y-4"
              >
                {/* Result card */}
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="p-6 rounded-xl bg-gradient-to-br from-secondary to-secondary/80 border border-border text-center shadow-lg"
                >
                  <p className="text-sm text-muted-foreground mb-2">{t("calc_result")}</p>
                  <motion.p 
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl md:text-4xl font-heading font-extrabold cpa-gradient-text mb-1"
                  >
                    {getConvertedAmount(result.min).toLocaleString("fr-FR")} - {getConvertedAmount(result.max).toLocaleString("fr-FR")} {currency}
                  </motion.p>
                  <p className="text-xs text-muted-foreground">{t("calc_range")}</p>
                </motion.div>

                {/* Action buttons */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                >
                  <motion.button 
                    onClick={exportPDF}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
                  >
                    <Download className="w-4 h-4" />
                    {lang === "fr" ? "Exporter PDF" : lang === "ar" ? "تصدير PDF" : lang === "es" ? "Exportar PDF" : "Export PDF"}
                  </motion.button>
                  <motion.button 
                    onClick={sendWhatsApp}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] text-white font-semibold text-sm hover:opacity-90 transition-opacity"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </motion.button>
                  <motion.button 
                    onClick={sendEmail}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl bg-accent text-accent-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
                  >
                    <Mail className="w-4 h-4" />
                    {lang === "fr" ? "Demander Devis" : lang === "ar" ? "طلب عرض" : lang === "es" ? "Solicitar" : "Request Quote"}
                  </motion.button>
                </motion.div>

                <motion.a 
                  href="#contact" 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ x: 5 }}
                  className="flex items-center justify-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors pt-2"
                >
                  {t("calc_contact")}<ArrowRight className="w-4 h-4" />
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default QuoteCalculator;
