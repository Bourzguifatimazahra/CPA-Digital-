import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Shield,
  Heart,
  Car,
  Briefcase,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { TranslationKey } from "@/i18n/translations";
import { Link } from "react-router-dom";

interface Department {
  id: string;
  nameKey: TranslationKey;
  whatsapp: string;
  whatsappFull: string;
  fix: string;
  fixFull: string;
  icon: React.ElementType;
  color: string;
  glow: string;
  types: string[];
}

const departments: Department[] = [
  {
    id: "automobile",
    nameKey: "dept_automobile",
    whatsapp: "0667558436",
    whatsappFull: "212667558436",
    fix: "05 22 95 39 02",
    fixFull: "+212522953902",
    icon: Car,
    color: "from-blue-500 to-cyan-500",
    glow: "shadow-blue-500/30",
    types: ["auto", "vehicules", "auto_moto", "flotte"],
  },
  {
    id: "sinistre_at",
    nameKey: "dept_sinistre_at",
    whatsapp: "0655357453",
    whatsappFull: "212655357453",
    fix: "05 22 95 39 08",
    fixFull: "+212522953908",
    icon: Shield,
    color: "from-orange-500 to-amber-500",
    glow: "shadow-orange-500/30",
    types: ["individuelle"],
  },
  {
    id: "sinistre_maladie",
    nameKey: "dept_sinistre_maladie",
    whatsapp: "0678293901",
    whatsappFull: "212678293901",
    fix: "05 22 95 39 06",
    fixFull: "+212522953906",
    icon: Heart,
    color: "from-red-500 to-pink-500",
    glow: "shadow-red-500/30",
    types: ["sante"],
  },
  {
    id: "sinistre_auto_risque_divers",
    nameKey: "dept_sinistre_auto_risque_divers",
    whatsapp: "0678828163",
    whatsappFull: "212678828163",
    fix: "05 22 95 39 17",
    fixFull: "+212522953917",
    icon: Shield,
    color: "from-purple-500 to-violet-500",
    glow: "shadow-purple-500/30",
    types: ["auto_sinistre", "risque_divers"],
  },
  {
    id: "production_divers",
    nameKey: "dept_production_divers",
    whatsapp: "0678991814",
    whatsappFull: "212678991814", // CORRIGÉ : 212678991814 au lieu de 21278991814
    fix: "05 22 95 39 04",
    fixFull: "+212522953904",
    icon: Briefcase,
    color: "from-green-500 to-emerald-500",
    glow: "shadow-green-500/30",
    types: [
      "habitation",
      "multirisques",
      "voyage",
      "assistance",
      "entreprise",
      "retraite",
      "epargne",
      "rc",
      "rc_pro",
      "biens",
      "personnes",
      "risques_tech",
      "transport",
      "dommage",
      "pertes",
      "chantier",
      "cyber",
      "terrorisme",
      "audit",
    ],
  },
];

const getDepartmentForInsurance = (insuranceType: string) => {
  for (const dept of departments) {
    if (dept.types.includes(insuranceType)) {
      return dept;
    }
  }
  return departments[3];
};

const ContactSection = () => {
  const { t, lang } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    insuranceType: "",
    message: "",
  });

  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Détecter mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const insuranceOptions = [
    { value: "", label: t("contact_insurance_select") },
    { value: "auto", label: t("ins_auto") },
    { value: "habitation", label: t("ins_habitation") },
    { value: "voyage", label: t("ins_voyage") },
    { value: "sante", label: t("ins_sante") },
    { value: "entreprise", label: t("ins_entreprise") },
    { value: "vehicules", label: t("ins_vehicules") },
    { value: "auto_moto", label: t("ins_auto_moto") },
    { value: "multirisques", label: t("ins_multirisques") },
    { value: "retraite", label: t("ins_retraite") },
    { value: "rc", label: t("ins_rc") },
    { value: "assistance", label: t("ins_assistance") },
    { value: "individuelle", label: t("ins_individuelle") },
    { value: "biens", label: t("ins_biens") },
    { value: "personnes", label: t("ins_personnes") },
    { value: "rc_pro", label: t("ins_rc_pro") },
    { value: "risques_tech", label: t("ins_risques_tech") },
    { value: "flotte", label: t("ins_flotte") },
    { value: "transport", label: t("ins_transport") },
    { value: "dommage", label: t("ins_dommage") },
    { value: "pertes", label: t("ins_pertes") },
    { value: "chantier", label: t("ins_chantier") },
    { value: "cyber", label: t("ins_cyber") },
    { value: "terrorisme", label: t("ins_terrorisme") },
    { value: "epargne", label: t("ins_epargne") },
    { value: "audit", label: t("ins_audit") },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.insuranceType) {
      alert("Veuillez sélectionner un type d'assurance");
      return;
    }

    if (!privacyAccepted) {
      alert(t("contact_privacy_error"));
      return;
    }

    const department = getDepartmentForInsurance(formData.insuranceType);

    const selectedOption = insuranceOptions.find(
      (opt) => opt.value === formData.insuranceType
    );

    const insuranceLabel = selectedOption
      ? selectedOption.label
      : formData.insuranceType;

    const whatsappMessage = `Bonjour CPA,

Je suis intéressé(e) par :
${insuranceLabel}

Nom : ${formData.name}
Email : ${formData.email}
Téléphone : ${formData.phone || "Non fourni"}

Message :
${formData.message}`;

    const encodedWhatsAppMessage = encodeURIComponent(whatsappMessage);

    window.open(
      `https://wa.me/${department.whatsappFull}?text=${encodedWhatsAppMessage}`,
      "_blank"
    );

    alert(t("contact_success"));

    setFormData({
      name: "",
      email: "",
      phone: "",
      insuranceType: "",
      message: "",
    });
  };

  // Fonction pour envoyer directement vers WhatsApp
  const sendToWhatsApp = (phoneNumber: string, customMessage?: string) => {
    const message = customMessage || "Bonjour CPA, je souhaite obtenir plus d'informations.";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  // Fonction pour appeler directement
  const makePhoneCall = (phoneNumber: string) => {
    window.open(`tel:${phoneNumber}`, "_blank");
  };

  const infoItems = [
    {
      icon: Phone,
      title: t("contact_phone"),
      value: "+212 5 22 95 39 00",
      href: "tel:+212522953900",
    },
    {
      icon: Mail,
      title: t("contact_email"),
      value: "info@cpa.ma",
      href: "mailto:info@cpa.ma",
    },
    {
      icon: MapPin,
      title: t("contact_address_casa"),
      value: "Casablanca, Maroc",
      href: "https://maps.app.goo.gl/ZL7oQLPCXskUGTUz5",
    },
    {
      icon: Clock,
      title: t("contact_hours"),
      value: t("footer_hours_label"),
    },
  ];

  return (
    <section
      id="contact"
      className="py-12 md:py-24 bg-gradient-to-b from-background to-muted/20 overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-20"
        >
          <span className="inline-flex px-4 md:px-5 py-2 rounded-full bg-primary/10 text-primary font-bold text-xs md:text-sm mb-4 md:mb-5">
            {t("contact_badge")}
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4 md:mb-6 px-2">
            {t("contact_title")}
          </h2>

          <p className="text-muted-foreground text-base md:text-lg px-4">
            {t("contact_desc")}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid lg:grid-cols-5 gap-6 md:gap-8 max-w-7xl mx-auto">
          {/* Left Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-4 md:space-y-5"
          >
            {infoItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-card/80 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-6 border border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg flex-shrink-0">
                    <item.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-foreground mb-1 text-sm md:text-base">
                      {item.title}
                    </h4>

                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-muted-foreground hover:text-primary transition-colors text-sm md:text-base break-words"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-muted-foreground text-sm md:text-base">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 bg-card/90 backdrop-blur-xl border border-border/50 rounded-2xl md:rounded-[32px] p-6 md:p-8 lg:p-10 shadow-2xl"
          >
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6 md:mb-8">
              {t("contact_form_title")}
            </h3>

            <div className="grid sm:grid-cols-2 gap-4 md:gap-5 mb-4 md:mb-5">
              <input
                type="text"
                required
                placeholder={t("contact_name_ph")}
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                className="w-full px-4 md:px-5 py-3 md:py-4 rounded-xl md:rounded-2xl bg-muted border border-border focus:ring-2 focus:ring-primary/40 outline-none text-sm md:text-base"
              />

              <input
                type="email"
                required
                placeholder={t("contact_email_ph")}
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                className="w-full px-4 md:px-5 py-3 md:py-4 rounded-xl md:rounded-2xl bg-muted border border-border focus:ring-2 focus:ring-primary/40 outline-none text-sm md:text-base"
              />
            </div>

            <div className="mb-4 md:mb-5">
              <input
                type="tel"
                placeholder={t("contact_phone_ph")}
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value,
                  })
                }
                className="w-full px-4 md:px-5 py-3 md:py-4 rounded-xl md:rounded-2xl bg-muted border border-border focus:ring-2 focus:ring-primary/40 outline-none text-sm md:text-base"
              />
            </div>

            <div className="mb-4 md:mb-5">
              <select
                value={formData.insuranceType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    insuranceType: e.target.value,
                  })
                }
                className="w-full px-4 md:px-5 py-3 md:py-4 rounded-xl md:rounded-2xl bg-muted border border-border focus:ring-2 focus:ring-primary/40 outline-none text-sm md:text-base"
              >
                {insuranceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-5 md:mb-6">
              <textarea
                rows={4}
                required
                placeholder={t("contact_message_ph")}
                value={formData.message}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    message: e.target.value,
                  })
                }
                className="w-full px-4 md:px-5 py-3 md:py-4 rounded-xl md:rounded-2xl bg-muted border border-border focus:ring-2 focus:ring-primary/40 outline-none resize-none text-sm md:text-base"
              />
            </div>

            {/* Privacy */}
            <div className="mb-6 md:mb-8">
              <label className="flex items-start gap-2 md:gap-3">
                <input
                  type="checkbox"
                  checked={privacyAccepted}
                  onChange={(e) => setPrivacyAccepted(e.target.checked)}
                  className="mt-0.5 w-4 h-4 md:w-5 md:h-5 flex-shrink-0"
                  required
                />

                <span className="text-xs md:text-sm text-muted-foreground">
                  {t("contact_privacy_accept")}{" "}
                  <Link
                    to="/politique-confidentialite"
                    className="text-primary font-semibold hover:underline"
                  >
                    {t("contact_privacy_link")}
                  </Link>
                </span>
              </label>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 md:py-5 rounded-xl md:rounded-2xl bg-gradient-to-r from-primary to-primary/80 text-white font-bold text-base md:text-lg flex items-center justify-center gap-2 md:gap-3 shadow-2xl hover:shadow-primary/30 transition-all"
            >
              <Send className="w-4 h-4 md:w-5 md:h-5" />
              {t("contact_submit")}
            </motion.button>
          </motion.form>
        </div>

        {/* Departments Cards - Version cliquable direct WhatsApp et téléphone */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto mt-16 md:mt-24"
        >
          <div className="text-center mb-10 md:mb-14">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground mb-3 md:mb-4 px-4">
              {t("contact_departments_title")}
            </h3>

            <p className="text-muted-foreground text-base md:text-lg px-4">
              {t("contact_departments_desc")}
            </p>
          </div>

          {/* Carousel avec cartes cliquables */}
          <div className="relative">
            {/* Boutons de navigation */}
            <button
              onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-xl flex items-center justify-center hover:bg-gray-50 transition-all disabled:opacity-50"
              disabled={currentSlide === 0}
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
            </button>
            
            <button
              onClick={() => setCurrentSlide(Math.min(departments.length - 3, currentSlide + 1))}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-xl flex items-center justify-center hover:bg-gray-50 transition-all disabled:opacity-50"
              disabled={currentSlide >= departments.length - 3}
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
            </button>

            {/* Container du carousel */}
            <div className="overflow-hidden mx-8 md:mx-10">
              <motion.div
                className="flex gap-4 md:gap-6"
                animate={{ x: `-${currentSlide * (100 / 3)}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {departments.map((dept, index) => {
                  const Icon = dept.icon;

                  return (
                    <motion.div
                      key={dept.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="cursor-pointer group"
                      style={{ flex: "0 0 calc(33.333% - 16px)" }}
                    >
                      {/* Version Desktop avec effet flip */}
                      {!isMobile ? (
                        <div className="relative h-[280px] w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                          {/* FRONT */}
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-card to-card/90 border border-border/50 shadow-xl overflow-hidden [backface-visibility:hidden]">
                            <div className={`absolute inset-0 bg-gradient-to-br ${dept.color} opacity-5`} />
                            <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-center">
                              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${dept.color} flex items-center justify-center shadow-2xl ${dept.glow} mb-5`}>
                                <Icon className="w-10 h-10 text-white" />
                              </div>
                              <h3 className="text-xl font-bold text-foreground mb-2">
                                {t(dept.nameKey)}
                              </h3>
                              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mt-2" />
                              <p className="text-xs text-muted-foreground mt-4 flex items-center gap-1">
                                <MessageCircle className="w-3 h-3 text-green-600" />
                                {lang === "fr" ? "Cliquez pour contacter" : 
                                 lang === "en" ? "Click to contact" : 
                                 lang === "es" ? "Haga clic para contactar" : 
                                 "انقر للاتصال"}
                              </p>
                            </div>
                          </div>

                          {/* BACK - Avec numéro direct et WhatsApp */}
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-card to-card/95 border border-primary/20 shadow-xl overflow-hidden [transform:rotateY(180deg)] [backface-visibility:hidden]">
                            <div className={`absolute inset-0 bg-gradient-to-br ${dept.color} opacity-10`} />
                            <div className="relative z-10 flex flex-col justify-center h-full p-6">
                              <div className="text-center mb-4">
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${dept.color} flex items-center justify-center shadow-lg mx-auto mb-3`}>
                                  <Icon className="w-7 h-7 text-white" />
                                </div>
                                <h4 className="text-lg font-bold text-foreground">
                                  {t(dept.nameKey)}
                                </h4>
                              </div>
                              
                              <div className="space-y-3">
                                {/* Numéro direct (téléphone) */}
                                <div 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    makePhoneCall(dept.fixFull);
                                  }}
                                  className="w-full flex items-center justify-between gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-all cursor-pointer"
                                >
                                  <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-primary" />
                                    <span className="text-xs font-medium text-muted-foreground">DIRECT</span>
                                  </div>
                                  <span className="text-sm font-semibold text-foreground">
                                    {dept.fix}
                                  </span>
                                </div>

                                {/* WhatsApp */}
                                <div 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    sendToWhatsApp(dept.whatsappFull);
                                  }}
                                  className="w-full flex items-center justify-between gap-3 p-3 rounded-xl bg-green-50 hover:bg-green-100 transition-all cursor-pointer"
                                >
                                  <div className="flex items-center gap-2">
                                    <MessageCircle className="w-4 h-4 text-green-600" />
                                    <span className="text-xs font-medium text-green-700">WHATSAPP</span>
                                  </div>
                                  <span className="text-sm font-semibold text-green-700">
                                    {dept.whatsapp}
                                  </span>
                                </div>

                                {/* Bouton principal WhatsApp */}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    sendToWhatsApp(dept.whatsappFull);
                                  }}
                                  className={`w-full mt-4 py-2.5 rounded-xl bg-gradient-to-r ${dept.color} text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]`}
                                >
                                  <MessageCircle className="w-4 h-4" />
                                  {lang === "fr" ? "Discuter sur WhatsApp" : 
                                   lang === "en" ? "Chat on WhatsApp" : 
                                   lang === "es" ? "Chatear en WhatsApp" : 
                                   "تحدث على واتساب"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Version Mobile - Carte simple cliquable avec les deux options */
                        <div 
                          onClick={() => sendToWhatsApp(dept.whatsappFull)}
                          className="bg-card rounded-2xl border border-border/50 shadow-md overflow-hidden transition-all duration-300 active:scale-95"
                        >
                          <div className={`h-1.5 bg-gradient-to-r ${dept.color}`} />
                          <div className="p-5 text-center">
                            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${dept.color} flex items-center justify-center shadow-md mx-auto mb-3`}>
                              <Icon className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-base font-bold text-foreground mb-2">
                              {t(dept.nameKey)}
                            </h3>
                            
                            {/* Numéro direct sur mobile */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                makePhoneCall(dept.fixFull);
                              }}
                              className="w-full flex items-center justify-center gap-2 mt-3 p-2 rounded-lg bg-muted/50 active:bg-muted transition-colors"
                            >
                              <Phone className="w-3 h-3 text-primary" />
                              <span className="text-xs text-muted-foreground">Appeler</span>
                              <span className="text-xs font-medium text-foreground">{dept.fix}</span>
                            </button>
                            
                            <div className="flex items-center justify-center gap-2 mt-2 text-green-600">
                              <MessageCircle className="w-4 h-4" />
                              <span className="text-xs font-medium">
                                {lang === "fr" ? "Cliquez pour WhatsApp" : 
                                 lang === "en" ? "Tap for WhatsApp" : 
                                 lang === "es" ? "Toque para WhatsApp" : 
                                 "انقر للواتساب"}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* Indicateurs de pagination */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: Math.ceil(departments.length / 3) }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i * 3)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    Math.floor(currentSlide / 3) === i ? "bg-primary w-8" : "bg-muted w-2"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;