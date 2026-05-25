import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { Phone, MessageCircle, ArrowRight, Send } from "lucide-react";

const DepartmentsContactsSection = () => {
  const { t } = useLanguage();

  const departments = [
    {
      id: "automobile",
      name: t("dept_automobile"),
      direct: "0522953902",
      whatsapp: "0667558436",
      whatsappLink: "https://wa.me/212667558436",
      message: "Bonjour, je souhaite des informations sur l’assurance automobile .",
      icon: Phone,
      color: "from-blue-500 to-cyan-500",
      lightColor: "from-blue-50 to-cyan-50",
      borderColor: "group-hover:border-blue-400",
    },
    {
      id: "accident_at",
      name: t("dept_Accident_at"),
      direct: "0522953908",
      whatsapp: "0655357453",
      whatsappLink: "https://wa.me/212655357453",
      message: "Bonjour, je souhaite déclarer un sinistre accident de travail. Prière de me contacter afin de m’aider à finaliser la déclaration. Merci",
      icon: Phone,
      color: "from-orange-500 to-amber-500",
      lightColor: "from-orange-50 to-amber-50",
      borderColor: "group-hover:border-orange-400",
    },
    {
      id: "accident_maladie",
      name: t("dept_Accident_maladie"),
      direct: "0522953906",
      whatsapp: "0678293901",
      whatsappLink: "https://wa.me/212678293901",
      message: "Bonjour, je suis assurer auprès de CPA et je souhaite quelques informations sur mon contrat maladie.",
      icon: Phone,
      color: "from-red-500 to-pink-500",
      lightColor: "from-red-50 to-pink-50",
      borderColor: "group-hover:border-red-400",
    },
    {
      id: "accident_auto_risque_divers",
      name: t("dept_Accident_auto_risque_divers"),
      direct: "0522953917",
      whatsapp: "0678828163",
      whatsappLink: "https://wa.me/212678828163",
      message: " Bonjour, je souhaite déclarer un sinistre auto, quelles sont les étapes suivantes? ",
      icon: Phone,
      color: "from-purple-500 to-violet-500",
      lightColor: "from-purple-50 to-violet-50",
      borderColor: "group-hover:border-purple-400",
    },
    {
      id: "production_divers",
      name: t("dept_production_divers"),
      direct: "0522953904",
      whatsapp: "0678991814",
      whatsappLink: "https://wa.me/212678991814",
      message: "Bonjour, je souhaite obtenir des informations sur le département Production et Risques Divers.",
      icon: Phone,
      color: "from-green-500 to-emerald-500",
      lightColor: "from-green-50 to-emerald-50",
      borderColor: "group-hover:border-green-400",
    },
  ];

  const handleWhatsAppClick = (whatsappLink: string, message: string) => {
    const encodedMessage = encodeURIComponent(message);
    const url = `${whatsappLink}?text=${encodedMessage}`;
    window.open(url, "_blank");
  };

  const handlePhoneClick = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <section id="departements-contacts" className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 text-primary font-bold text-xs mb-4 backdrop-blur-sm border border-primary/20">
              {t("contact_badge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              {t("contact_departments_title")}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary/50 to-primary mx-auto mb-6 rounded-full" />
            <p className="text-muted-foreground text-base max-w-2xl mx-auto">
              {t("contact_departments_desc")}
            </p>
          </motion.div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {departments.map((dept, index) => (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className={`relative h-full bg-white rounded-xl border-2 border-gray-100 ${dept.borderColor} shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl`}>
                {/* Gradient Bar */}
                <div className={`h-1.5 bg-gradient-to-r ${dept.color}`} />
                
                {/* Content - Compact */}
                <div className="p-5">
                  {/* Icon & Title - Ligne plus compacte */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${dept.color} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300`}>
                      <dept.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="flex-1 text-base font-bold text-foreground leading-tight line-clamp-2">
                      {dept.name}
                    </h3>
                  </div>

                  {/* Contact Info - Plus compact */}
                  <div className="space-y-2 mb-4">
                    {/* Direct Phone - Clickable */}
                    <button
                      onClick={() => handlePhoneClick(dept.direct)}
                      className="w-full flex items-center gap-2 p-2.5 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-200 group/phone"
                    >
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-primary/20 to-primary/10 flex items-center justify-center">
                        <Phone className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">
                          DIRECT
                        </p>
                        <p className="text-xs font-semibold text-foreground">
                          {dept.direct.match(/.{1,2}/g)?.join(' ') || dept.direct}
                        </p>
                      </div>
                    </button>

                    {/* WhatsApp - Clickable with message */}
                    <button
                      onClick={() => handleWhatsAppClick(dept.whatsappLink, dept.message)}
                      className="w-full flex items-center gap-2 p-2.5 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition-all duration-200 group/whatsapp"
                    >
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-green-600/20 to-emerald-600/20 flex items-center justify-center">
                        <MessageCircle className="w-3.5 h-3.5 text-green-600" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-[9px] font-bold text-green-700 uppercase tracking-wider">
                          WHATSAPP
                        </p>
                        <p className="text-xs font-semibold text-green-700">
                          {dept.whatsapp}
                        </p>
                      </div>
                    </button>
                  </div>

                  {/* Action Button - Contacter with message */}
                  <button
                    onClick={() => handleWhatsAppClick(dept.whatsappLink, dept.message)}
                    className="group/btn w-full py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                  >
                    <Send className="w-4 h-4" />
                    <span>Contacter</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>

                {/* Tooltip message preview */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-sm p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-[10px] text-white/90 text-center line-clamp-1">
                    💬 {dept.message.substring(0, 50)}...
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-sm text-muted-foreground">
            📞 Ouvert du Lundi au Vendredi de 8h à 18h
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default DepartmentsContactsSection;