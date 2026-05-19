import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useCookieConsent, type CookiePrefs } from "@/hooks/useCookieConsent";
import { Link } from "react-router-dom";

export default function CookieConsent() {
  const { t, isRTL } = useLanguage();
  const { status, prefs, acceptAll, rejectAll, savePrefs } = useCookieConsent();

  const [openModal, setOpenModal] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const [localPrefs, setLocalPrefs] = useState<CookiePrefs>(prefs);

  // Sync local prefs when hook prefs change (e.g. after acceptAll/rejectAll from banner)
  useEffect(() => {
    setLocalPrefs(prefs);
  }, [prefs]);

  // Show banner only when consent is still pending
  if (status !== "pending") return null;

  const handleSave = (data: CookiePrefs) => {
    savePrefs(data);
    setAnimateOut(true);
    setTimeout(() => {
      setOpenModal(false);
    }, 300);
  };

  const handleAcceptAll = () => {
    acceptAll();
    setAnimateOut(true);
    setTimeout(() => {
      setOpenModal(false);
    }, 300);
  };

  const handleRejectAll = () => {
    rejectAll();
    setAnimateOut(true);
    setTimeout(() => {
      setOpenModal(false);
    }, 300);
  };

  const togglePref = (key: keyof CookiePrefs) => {
    if (key === "essential") return; // essential is always on
    setLocalPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <AnimatePresence>
      {/* ── Banner ── */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={animateOut ? { y: 100, opacity: 0 } : { y: 0, opacity: 1 }}
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
                  {isRTL ? "سياسة الخصوصية" : "Politique de confidentialité"}
                </Link>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 min-w-fit">
              <Button
                variant="outline"
                onClick={handleRejectAll}
                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                {t("cookie_continue_without")}
              </Button>
              <Button
                variant="outline"
                onClick={() => setOpenModal(true)}
                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                {t("cookie_settings")}
              </Button>
              <Button
                onClick={handleAcceptAll}
                className="cpa-gradient-bg text-white hover:opacity-90 shadow-lg"
              >
                {t("cookie_accept")}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Modal ── */}
      {openModal && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
          onClick={() => setOpenModal(false)}
        >
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            dir={isRTL ? "rtl" : "ltr"}
          >
            {/* Modal header */}
            <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4 rounded-t-2xl z-10">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {t("cookie_modal_title")}
              </h2>
            </div>

            {/* Toggle list */}
            <div className="p-6 space-y-3">
              <ToggleRow
                label={t("cookie_essential")}
                description={t("cookie_essential_desc")}
                checked={true}
                disabled
                onChange={() => {}}
              />
              <ToggleRow
                label={t("cookie_stats")}
                description={t("cookie_stats_desc")}
                checked={localPrefs.stats}
                disabled={false}
                onChange={() => togglePref("stats")}
              />
              <ToggleRow
                label={t("cookie_personalization")}
                description={t("cookie_personalization_desc")}
                checked={localPrefs.personalization}
                disabled={false}
                onChange={() => togglePref("personalization")}
              />
              <ToggleRow
                label={t("cookie_security")}
                description={t("cookie_security_desc")}
                checked={localPrefs.security}
                disabled={false}
                onChange={() => togglePref("security")}
              />
            </div>

            {/* Modal footer */}
            <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-6 py-4 rounded-b-2xl">
              <div className="flex gap-3 flex-wrap">
                <Button
                  variant="outline"
                  onClick={handleRejectAll}
                  className="flex-1 border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950"
                >
                  {t("cookie_all_reject")}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleAcceptAll}
                  className="flex-1 border-green-200 dark:border-green-900 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-950"
                >
                  {t("cookie_all_accept")}
                </Button>
                <Button
                  onClick={() => handleSave(localPrefs)}
                  className="flex-1 cpa-gradient-bg text-white hover:opacity-90 shadow-md"
                >
                  {t("cookie_save")}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* ── ToggleRow sub-component ── */
function ToggleRow({
  label,
  description,
  checked,
  onChange,
  disabled,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
  disabled: boolean;
}) {
  return (
    <div className="flex items-start justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150">
      <div className="flex-1">
        <div className="font-medium text-gray-900 dark:text-white">{label}</div>
        {description && (
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{description}</div>
        )}
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={onChange}
        className={`
          relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent
          transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          ${checked ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"}
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        <span
          className={`
            pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0
            transition duration-200 ease-in-out
            ${checked ? "translate-x-5" : "translate-x-0"}
          `}
        />
      </button>
    </div>
  );
}
