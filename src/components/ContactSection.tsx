import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, Shield, Heart, Car, Briefcase } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { TranslationKey } from "@/i18n/translations";

interface Department {
  id: string;
  nameKey: TranslationKey;
  whatsapp: string;
  whatsappFull: string;
  icon: React.ElementType;
  color: string;
  types: string[];
}

// Department configuration with WhatsApp numbers and responsible insurance types
const departments: Department[] = [
  {
    id: "automobile",
    nameKey: "dept_automobile",
    whatsapp: "0667558436",
    whatsappFull: "+212667558436",
    icon: Car,
    color: "bg-blue-500",
    types: ["auto", "vehicules", "auto_moto", "flotte"],
  },
  {
    id: "sinistre_at",
    nameKey: "dept_sinistre_at",
    whatsapp: "0655357453",
    whatsappFull: "+212665357453",
    icon: Shield,
    color: "bg-orange-500",
    types: ["individuelle"],
  },
  {
    id: "sinistre_maladie",
    nameKey: "dept_sinistre_maladie",
    whatsapp: "0678293901",
    whatsappFull: "+212678293901",
    icon: Heart,
    color: "bg-red-500",
    types: ["sante"],
  },
  {
    id: "production_divers",
    nameKey: "dept_production_divers",
    whatsapp: "078991814",
    whatsappFull: "+21278991814",
    icon: Briefcase,
    color: "bg-green-500",
    types: ["habitation", "multirisques", "voyage", "assistance", "entreprise", "retraite", "epargne", "rc", "rc_pro", "biens", "personnes", "risques_tech", "transport", "dommage", "pertes", "chantier", "cyber", "terrorisme", "audit"],
  },
];

// Helper function to get department for an insurance type
const getDepartmentForInsurance = (insuranceType: string) => {
  for (const dept of departments) {
    if (dept.types.includes(insuranceType)) {
      return dept;
    }
  }
  return departments[3]; // Default to Production & Risques Divers
};

const ContactSection = () => {
  const { t, lang } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", insuranceType: "", message: "" });

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

    // Get the responsible department for the selected insurance type
    const department = getDepartmentForInsurance(formData.insuranceType);
    
    // Get the selected insurance type label
    const selectedOption = insuranceOptions.find(opt => opt.value === formData.insuranceType);
    const insuranceLabel = selectedOption ? selectedOption.label : formData.insuranceType;
    
    // Construct the WhatsApp message
    const whatsappMessage = `Bonjour CPA,\n\nJe suis intéressé(e) par l'assurance suivante : ${insuranceLabel}\n\nMes coordonnées :\n• Nom : ${formData.name}\n• Email : ${formData.email}\n• Téléphone : ${formData.phone || "Non fourni"}\n\nMon message :\n${formData.message}`;
    
    // Encode the message for URL
    const encodedWhatsAppMessage = encodeURIComponent(whatsappMessage);
    
    // Open WhatsApp with the department's phone number and message
    window.open(`https://wa.me/${department.whatsapp}?text=${encodedWhatsAppMessage}`, "_blank");
    
    // Also send via email
    const emailSubject = encodeURIComponent(`Demande de devis - ${insuranceLabel}`);
    const emailBody = encodeURIComponent(`Bonjour,\n\nJe suis intéressé(e) par l'assurance suivante : ${insuranceLabel}\n\nMes coordonnées :\nNom : ${formData.name}\nEmail : ${formData.email}\n• Téléphone : ${formData.phone || "Non fourni"}\n\nMon message :\n${formData.message}\n\nCordialement,\n${formData.name}`);
    window.open(`mailto:info@cpa.ma?subject=${emailSubject}&body=${emailBody}`, "_blank");
    
    // Show success message
    alert(t("contact_success"));
    setFormData({ name: "", email: "", phone: "", insuranceType: "", message: "" });
  };

  const infoItems = [
    { icon: Phone, title: t("contact_phone"), value: "+212 5 22 95 39 00", href: "tel:+212522953900" },
    { icon: Mail, title: t("contact_email"), value: "info@cpa.ma", href: "mailto:info@cpa.ma" },
    { icon: MapPin, title: t("contact_address_casa"), value: "Casablanca, Maroc", href: "https://maps.app.goo.gl/ZL7oQLPCXskUGTUz5" },
    { icon: MapPin, title: t("contact_address_tanger"), value: "Tanger, Maroc", href: "https://maps.app.goo.gl/haMwPhLXUVd39k1eA" },
    { icon: Clock, title: t("contact_hours"), value: t("footer_hours_label") },
  ];

  return (
    <section id="contact" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-accent font-semibold text-sm tracking-wide uppercase">{t("contact_badge")}</span>
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-foreground mt-3 mb-4">{t("contact_title")}</h2>
          <p className="text-muted-foreground text-lg">{t("contact_desc")}</p>
        </motion.div>

        {/* Main Contact Grid: Info + Form */}
        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-4"
          >
            {infoItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 bg-card rounded-xl p-5 border border-border cpa-shadow"
              >
                <div className="w-11 h-11 rounded-lg cpa-gradient-bg flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-foreground text-sm">{item.title}</h4>
                  {item.href ? (
                    <a href={item.href} dir={item.href?.startsWith("tel:") ? "ltr" : undefined} className="text-muted-foreground text-sm hover:text-primary transition-colors">{item.value}</a>
                  ) : (
                    <p className="text-muted-foreground text-sm">{item.value}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 bg-card rounded-2xl p-8 border border-border cpa-shadow-lg"
          >
            <h3 className="font-heading font-bold text-foreground text-xl mb-6">{t("contact_form_title")}</h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">{t("contact_name")}</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                  placeholder={t("contact_name_ph")} />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">{t("contact_email")}</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                  placeholder={t("contact_email_ph")} />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground mb-1.5">{t("contact_phone")}</label>
              <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                placeholder={t("contact_phone_ph")} />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground mb-1.5">{t("contact_insurance_type")}</label>
              <select
                value={formData.insuranceType}
                onChange={(e) => setFormData({ ...formData, insuranceType: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              >
                {insuranceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-1.5">{t("contact_message")}</label>
              <textarea rows={4} required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
                placeholder={t("contact_message_ph")} />
            </div>
            <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl cpa-gradient-bg text-primary-foreground font-heading font-bold text-base cpa-shadow hover:opacity-90 transition-opacity">
              <Send className="w-5 h-5" />
              {t("contact_submit")}
            </motion.button>
          </motion.form>
        </div>

        {/* Department WhatsApp Contacts Section - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto mt-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-heading font-bold text-foreground mb-2">{t("contact_departments_title")}</h3>
            <p className="text-muted-foreground">{t("contact_departments_desc")}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {departments.map((dept, index) => {
              const Icon = dept.icon;
              return (
                <motion.div
                  key={dept.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-xl p-5 border border-border cpa-shadow hover:shadow-lg transition-shadow"
                >
                  <div className={`w-12 h-12 rounded-lg ${dept.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-heading font-bold text-foreground text-sm mb-2">{t(dept.nameKey)}</h4>
                  <a
                    href={`https://wa.me/${dept.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    {dept.whatsapp}
                  </a>
                  <p className="text-xs text-muted-foreground mt-2">
                    {dept.types.length} {dept.types.length > 1 ? t("dept_insurance_types_plural") : t("dept_insurance_types")}
                  </p>
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
