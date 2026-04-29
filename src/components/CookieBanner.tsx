import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import { Link } from "react-router-dom";

const CookieBanner = () => {
  const { t } = useLanguage();
  const { consent, acceptCookies, rejectCookies } = useCookieConsent();

  if (consent !== "pending") {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
      >
        <div className="max-w-7xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            <div className="flex-1">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t("cookie_title")}
              </h3>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                {t("cookie_description")}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {t("cookie_policy_link")}{" "}
                <Link to="/mentions-legales" className="text-cpa-blue dark:text-cpa-blue-light underline hover:no-underline">
                  Politique de confidentialité
                </Link>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 min-w-fit">
              <Button
                variant="outline"
                onClick={rejectCookies}
                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                {t("cookie_reject")}
              </Button>
              <Button
                onClick={acceptCookies}
                className="cpa-gradient-bg text-white hover:opacity-90 shadow-lg"
              >
                {t("cookie_accept")}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CookieBanner;
