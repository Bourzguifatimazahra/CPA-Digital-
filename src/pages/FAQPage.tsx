import { useState, useMemo } from "react";
import { Search, HelpCircle, FileText, Shield, ChevronDown, ChevronUp, Phone, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";

interface FAQItem {
  questionKey: string;
  answerKey: string;
  category: "catalog" | "insurance" | "general";
  originalIndex?: number;
}

const faqData: FAQItem[] = [
  // Catalog Questions
  {
    questionKey: "faq_view_online",
    answerKey: "faq_view_online_answer",
    category: "catalog",
  },
  {
    questionKey: "faq_update_frequency",
    answerKey: "faq_update_frequency_answer",
    category: "catalog",
  },
  {
    questionKey: "faq_catalog_languages",
    answerKey: "faq_catalog_languages_answer",
    category: "catalog",
  },
  {
    questionKey: "faq_catalog_free",
    answerKey: "faq_catalog_free_answer",
    category: "catalog",
  },
  // Insurance Questions
  {
    questionKey: "faq_personalized_quote",
    answerKey: "faq_personalized_quote_answer",
    category: "insurance",
  },
  {
    questionKey: "faq_coverage_details",
    answerKey: "faq_coverage_details_answer",
    category: "insurance",
  },
  {
    questionKey: "faq_insurance_types",
    answerKey: "faq_insurance_types_answer",
    category: "insurance",
  },
  {
    questionKey: "faq_contract_modification",
    answerKey: "faq_contract_modification_answer",
    category: "insurance",
  },
  {
    questionKey: "faq_claims_process",
    answerKey: "faq_claims_process_answer",
    category: "insurance",
  },
  {
    questionKey: "faq_payment_options",
    answerKey: "faq_payment_options_answer",
    category: "insurance",
  },
  {
    questionKey: "faq_waiting_period",
    answerKey: "faq_waiting_period_answer",
    category: "insurance",
  },
  {
    questionKey: "faq_premium_calculation",
    answerKey: "faq_premium_calculation_answer",
    category: "insurance",
  },
  // General Questions
  {
    questionKey: "faq_company_experience",
    answerKey: "faq_company_experience_answer",
    category: "general",
  },
  {
    questionKey: "faq_contact_support",
    answerKey: "faq_contact_support_answer",
    category: "general",
  },
  {
    questionKey: "faq_office_hours",
    answerKey: "faq_office_hours_answer",
    category: "general",
  },
  {
    questionKey: "faq_network_agencies",
    answerKey: "faq_network_agencies_answer",
    category: "general",
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

const FAQPage = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const filteredFAQs = useMemo(() => {
    if (!searchQuery.trim()) return faqData;
    
    const query = searchQuery.toLowerCase();
    return faqData.filter((faq) => 
      t(faq.questionKey as any).toLowerCase().includes(query) ||
      t(faq.answerKey as any).toLowerCase().includes(query)
    );
  }, [searchQuery, t]);

  const groupedFAQs = useMemo(() => {
    const groups: Record<string, FAQItem[]> = {
      catalog: [],
      insurance: [],
      general: [],
    };
    
    filteredFAQs.forEach((faq, index) => {
      groups[faq.category].push({ ...faq, originalIndex: index });
    });
    
    return groups;
  }, [filteredFAQs]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <HelpCircle className="w-4 h-4" />
                {t("nav_faq")}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                {t("faq_title")}
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                {t("faq_subtitle")}
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={t("faq_search_placeholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-border bg-card shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            {searchQuery && filteredFAQs.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <HelpCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg text-muted-foreground">{t("faq_no_results")}</p>
              </motion.div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-4xl mx-auto space-y-12"
              >
                {/* Catalog Section */}
                {groupedFAQs.catalog.length > 0 && (
                  <motion.div variants={itemVariants}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 rounded-xl bg-blue-500/10">
                        <FileText className="w-6 h-6 text-blue-500" />
                      </div>
                      <h2 className="text-2xl font-bold">{t("faq_catalog_section")}</h2>
                    </div>
                    <div className="space-y-4">
                      {groupedFAQs.catalog.map((faq) => {
                        const globalIndex = faq.originalIndex || 0;
                        const isExpanded = expandedItems.has(globalIndex);
                        return (
                          <motion.div
                            key={globalIndex}
                            className="bg-card rounded-xl border border-border shadow-sm overflow-hidden"
                            whileHover={{ borderColor: "rgba(var(--primary), 0.3)" }}
                            transition={{ duration: 0.2 }}
                          >
                            <button
                              onClick={() => toggleExpanded(globalIndex)}
                              className="w-full px-6 py-4 flex items-start justify-between gap-4 text-left"
                            >
                              <div className="flex items-start gap-3 flex-1">
                                <div className="p-2 rounded-lg bg-blue-500/10 mt-0.5">
                                  <FileText className="w-4 h-4 text-blue-500" />
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
                    </div>
                  </motion.div>
                )}

                {/* Insurance Section */}
                {groupedFAQs.insurance.length > 0 && (
                  <motion.div variants={itemVariants}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 rounded-xl bg-green-500/10">
                        <Shield className="w-6 h-6 text-green-500" />
                      </div>
                      <h2 className="text-2xl font-bold">{t("faq_insurance_section")}</h2>
                    </div>
                    <div className="space-y-4">
                      {groupedFAQs.insurance.map((faq) => {
                        const globalIndex = faq.originalIndex || 0;
                        const isExpanded = expandedItems.has(globalIndex);
                        return (
                          <motion.div
                            key={globalIndex}
                            className="bg-card rounded-xl border border-border shadow-sm overflow-hidden"
                            whileHover={{ borderColor: "rgba(var(--primary), 0.3)" }}
                            transition={{ duration: 0.2 }}
                          >
                            <button
                              onClick={() => toggleExpanded(globalIndex)}
                              className="w-full px-6 py-4 flex items-start justify-between gap-4 text-left"
                            >
                              <div className="flex items-start gap-3 flex-1">
                                <div className="p-2 rounded-lg bg-green-500/10 mt-0.5">
                                  <Shield className="w-4 h-4 text-green-500" />
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
                    </div>
                  </motion.div>
                )}

                {/* General Section */}
                {groupedFAQs.general.length > 0 && (
                  <motion.div variants={itemVariants}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 rounded-xl bg-purple-500/10">
                        <HelpCircle className="w-6 h-6 text-purple-500" />
                      </div>
                      <h2 className="text-2xl font-bold">{t("faq_general_section")}</h2>
                    </div>
                    <div className="space-y-4">
                      {groupedFAQs.general.map((faq) => {
                        const globalIndex = faq.originalIndex || 0;
                        const isExpanded = expandedItems.has(globalIndex);
                        return (
                          <motion.div
                            key={globalIndex}
                            className="bg-card rounded-xl border border-border shadow-sm overflow-hidden"
                            whileHover={{ borderColor: "rgba(var(--primary), 0.3)" }}
                            transition={{ duration: 0.2 }}
                          >
                            <button
                              onClick={() => toggleExpanded(globalIndex)}
                              className="w-full px-6 py-4 flex items-start justify-between gap-4 text-left"
                            >
                              <div className="flex items-start gap-3 flex-1">
                                <div className="p-2 rounded-lg bg-purple-500/10 mt-0.5">
                                  <HelpCircle className="w-4 h-4 text-purple-500" />
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
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-12 md:py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("faq_contact_us")}
              </h2>
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
      </div>

      <Footer />
    </div>
  );
};

export default FAQPage;
