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
  ChevronDown,
  ChevronUp,
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
    id: "production_divers",
    nameKey: "dept_production_divers",
    whatsapp: "078991814",
    whatsappFull: "21278991814",
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
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [isMobile, setIsMobile] = useState(false);

  // Détecter si c'est un appareil mobile
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

  // Basculer l'état d'expansion de la carte (pour mobile)
  const toggleCard = (cardId: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
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
        {/* Header - Responsive */}
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

        {/* Grid - Responsive */}
        <div className="grid lg:grid-cols-5 gap-6 md:gap-8 max-w-7xl mx-auto">
          {/* Left Info - Responsive */}
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

          {/* Form - Responsive */}
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

            {/* Privacy - Responsive */}
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

            {/* Submit - Responsive */}
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

        {/* Departments Cards - Responsive avec support mobile/tablette */}
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

          <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2">
            {departments.map((dept, index) => {
              const Icon = dept.icon;
              const isExpanded = expandedCards[dept.id] || false;

              // Version mobile : carte cliquable qui s'étend
              if (isMobile) {
                return (
                  <motion.div
                    key={dept.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card rounded-2xl border border-border/50 shadow-xl overflow-hidden"
                  >
                    {/* Front de la carte (visible toujours) */}
                    <button
                      onClick={() => toggleCard(dept.id)}
                      className="w-full p-5 md:p-6 text-left flex items-center justify-between gap-4 hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${dept.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                          <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                        </div>

                        <div className="flex-1">
                          <h4 className="text-lg md:text-xl font-bold text-foreground">
                            {t(dept.nameKey)}
                          </h4>
                          <div className="inline-flex px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-semibold text-xs mt-1">
                            {dept.types.length} {dept.types.length > 1 ? t("dept_insurance_types_plural") : t("dept_insurance_types")}
                          </div>
                        </div>
                      </div>

                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      )}
                    </button>

                    {/* Contenu expansé */}
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-border/50 p-5 md:p-6 space-y-4"
                      >
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs uppercase text-muted-foreground mb-1 flex items-center gap-1">
                              DIRECT
                              <MessageCircle className="w-3 h-3 text-green-600" />
                            </p>
                            <button
                              onClick={() => sendToWhatsApp(dept.whatsappFull)}
                              className="font-bold text-foreground hover:text-green-600 text-base md:text-lg transition-colors w-full text-left"
                            >
                              {dept.fix}
                            </button>
                          </div>

                          <div>
                            <p className="text-xs uppercase text-muted-foreground mb-1">
                              WhatsApp
                            </p>
                            <button
                              onClick={() => sendToWhatsApp(dept.whatsappFull)}
                              className="font-bold text-green-600 hover:text-green-700 text-base md:text-lg transition-colors w-full text-left"
                            >
                              {dept.whatsapp}
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={() => sendToWhatsApp(dept.whatsappFull)}
                          className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r ${dept.color} text-white font-bold shadow-lg hover:scale-[1.02] transition-all`}
                        >
                          <MessageCircle className="w-4 h-4" />
                          {lang === "fr" ? "Contacter sur WhatsApp" : lang === "en" ? "Contact on WhatsApp" : lang === "es" ? "Contactar en WhatsApp" : "تواصل على واتساب"}
                        </button>
                      </motion.div>
                    )}
                  </motion.div>
                );
              }

              // Version desktop : carte avec flip au hover
              return (
                <motion.div
                  key={dept.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group [perspective:1500px] h-[240px] md:h-[260px]"
                >
                  <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                    {/* FRONT */}
                    <div className="absolute inset-0 rounded-2xl md:rounded-[24px] border border-white/10 bg-card shadow-2xl overflow-hidden [backface-visibility:hidden]">
                      <div className={`absolute inset-0 bg-gradient-to-br ${dept.color} opacity-10`} />
                      <div className="relative z-10 flex items-center h-full p-6 md:p-8 gap-6 md:gap-8">
                        <div className={`w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-[24px] bg-gradient-to-br ${dept.color} flex items-center justify-center shadow-2xl ${dept.glow} flex-shrink-0`}>
                          <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                        </div>
                        <div className="flex-1 text-left">
                          <h4 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                            {t(dept.nameKey)}
                          </h4>
                          <div className="inline-flex px-3 md:px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-semibold text-xs md:text-sm">
                            {dept.types.length} {dept.types.length > 1 ? t("dept_insurance_types_plural") : t("dept_insurance_types")}
                          </div>
                        </div>
                        <p className="text-muted-foreground text-xs md:text-sm animate-pulse hidden sm:block">
                          {lang === "fr" ? "Survolez" : lang === "en" ? "Hover" : lang === "es" ? "Pase el cursor" : "مرر"}
                        </p>
                      </div>
                    </div>

                    {/* BACK */}
                    <div className="absolute inset-0 rounded-2xl md:rounded-[24px] border border-primary/20 bg-card overflow-hidden shadow-2xl [transform:rotateY(180deg)] [backface-visibility:hidden]">
                      <div className={`absolute inset-0 bg-gradient-to-br ${dept.color} opacity-5`} />
                      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between h-full p-6 md:p-8 gap-4 md:gap-6">
                        <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto">
                          <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${dept.color} flex items-center justify-center shadow-xl flex-shrink-0`}>
                            <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-base md:text-xl font-bold text-foreground mb-3 md:mb-4">
                              {t(dept.nameKey)}
                            </h4>
                            <div className="space-y-2 md:space-y-3">
                              <div>
                                <p className="text-xs uppercase text-muted-foreground mb-1 flex items-center gap-1">
                                  DIRECT <MessageCircle className="w-3 h-3 text-green-600" />
                                </p>
                                <button
                                  onClick={() => sendToWhatsApp(dept.whatsappFull)}
                                  className="font-bold text-foreground hover:text-green-600 text-sm md:text-lg transition-colors w-full text-left"
                                >
                                  {dept.fix}
                                </button>
                              </div>
                              <div>
                                <p className="text-xs uppercase text-muted-foreground mb-1">WhatsApp</p>
                                <button
                                  onClick={() => sendToWhatsApp(dept.whatsappFull)}
                                  className="font-bold text-green-600 hover:text-green-700 text-sm md:text-lg transition-colors w-full text-left"
                                >
                                  {dept.whatsapp}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => sendToWhatsApp(dept.whatsappFull)}
                          className={`w-full md:w-auto flex items-center justify-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-xl bg-gradient-to-r ${dept.color} text-white font-bold shadow-xl hover:scale-[1.05] transition-all text-sm md:text-base`}
                        >
                          <MessageCircle className="w-4 h-4" />
                          {lang === "fr" ? "Contacter" : lang === "en" ? "Contact" : lang === "es" ? "Contactar" : "تواصل"}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;