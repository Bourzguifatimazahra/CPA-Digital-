import { motion } from "framer-motion";
import { Search, HelpCircle, Phone, Mail, ChevronUp, ChevronDown } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import React from "react";

interface FAQItem {
  questionKey: string;
  answerKey: string;
}

const faqData: FAQItem[] = [
  {
    questionKey: "faq_personalized_quote",
    answerKey: "faq_personalized_quote_answer",
  },
  {
    questionKey: "faq_contact_support",
    answerKey: "faq_contact_support_answer",
  },
  {
    questionKey: "faq_office_hours",
    answerKey: "faq_office_hours_answer",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

const FAQSection = () => {
  const { t } = useLanguage();
  const [expandedItems, setExpandedItems] = React.useState<Set<number>>(new Set());

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-accent font-semibold text-sm tracking-wide uppercase">{t("nav_faq")}</span>
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-foreground mt-3 mb-4">{t("faq_title")}</h2>
          <p className="text-muted-foreground text-lg">{t("faq_subtitle")}</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto space-y-6"
        >
          {faqData.map((faq, index) => {
            const isExpanded = expandedItems.has(index);
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-card rounded-xl border border-border shadow-sm overflow-hidden"
                whileHover={{ borderColor: "rgba(var(--primary), 0.3)" }}
                transition={{ duration: 0.2 }}
              >
                <button
                  onClick={() => toggleExpanded(index)}
                  className="w-full px-6 py-4 flex items-start justify-between gap-4 text-left"
                >
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 rounded-lg bg-blue-500/10 mt-0.5">
                      <HelpCircle className="w-4 h-4 text-blue-500" />
                    </div>
                    <span className="font-medium text-foreground">{t(faq.questionKey as any)}</span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  )}
                </button>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4"
                  >
                    <div className="pl-11 text-muted-foreground leading-relaxed">
                      {t(faq.answerKey as any)}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center py-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("faq_contact_us")}</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <a
              href="tel:+212522953900"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              <Phone className="w-5 h-5" />
              +212 5 22 95 39 00
            </a>
            <a
              href="mailto:info@cpa.ma"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-primary text-primary font-medium hover:bg-primary/5 transition-colors"
            >
              <Mail className="w-5 h-5" />
              info@cpa.ma
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;