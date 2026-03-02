import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const ContactSection = () => {
  const { t, lang } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t("contact_success"));
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const infoItems = [
    { icon: Phone, title: t("contact_phone"), value: "+212 5 22 95 39 00", href: "tel:+212522953900" },
    { icon: Mail, title: t("contact_email"), value: "info@cpas.ma", href: "mailto:info@cpas.ma" },
    { icon: MapPin, title: t("contact_address"), value: "Casablanca, Maroc" },
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
      </div>
    </section>
  );
};

export default ContactSection;
