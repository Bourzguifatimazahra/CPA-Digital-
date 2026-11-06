import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

// Bandeau de la fête de la Marche Verte (6 novembre). Il s'affiche uniquement le 6 novembre
// (heure du Maroc) et revient chaque année avec le bon numéro d'anniversaire.
// Aperçu un autre jour : ajouter ?marche-verte à l'adresse de la page.
const MARCHE_VERTE_YEAR = 1975;
const DISMISS_KEY = "cpa_marche_verte_closed";
const ROTATION_MS = 4500;

const moroccoToday = () => {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Casablanca",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  return { year: get("year"), month: get("month"), day: get("day") };
};

const isPreview = () => {
  try {
    return new URLSearchParams(window.location.search).has("marche-verte");
  } catch {
    return false;
  }
};

const ordinalFr = (n: number) => `${n}ᵉ`;
const ordinalEn = (n: number) => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return `${n}${s[(v - 20) % 10] || s[v] || s[0]}`;
};

const messagesFor = (lang: string, year: number, n: number): string[] => {
  switch (lang) {
    case "ar":
      return [
        `الذكرى ${n} للمسيرة الخضراء المظفرة — 6 نونبر 1975 · 6 نونبر ${year}`,
        "تحتفي CPA بهذه الذكرى المجيدة، رمز الوحدة الوطنية والتلاحم بين العرش والشعب.",
        "عاش المغرب",
      ];
    case "en":
      return [
        `${ordinalEn(n)} anniversary of the Green March — 6 November 1975 · 6 November ${year}`,
        "CPA proudly celebrates this glorious day, a symbol of national unity.",
        "Long live Morocco!",
      ];
    case "es":
      return [
        `${n}.º aniversario de la Marcha Verde — 6 de noviembre de 1975 · 6 de noviembre de ${year}`,
        "CPA celebra con orgullo este día glorioso, símbolo de unidad nacional.",
        "¡Viva Marruecos!",
      ];
    default:
      return [
        `${ordinalFr(n)} anniversaire de la glorieuse Marche Verte — 6 novembre 1975 · 6 novembre ${year}`,
        "CPA célèbre avec fierté ce jour glorieux, symbole de l'unité nationale.",
        "Vive le Maroc !",
      ];
  }
};

/** Drapeau du Maroc qui flotte (fond rouge, pentagramme vert). */
const WavingFlag = () => (
  <span className="mv-flag inline-block shrink-0 overflow-hidden rounded-[3px] shadow-md ring-1 ring-white/30" aria-hidden="true">
    <svg viewBox="0 0 60 40" className="block h-5 w-[30px] sm:h-6 sm:w-9">
      <rect width="60" height="40" fill="#C1272D" />
      <path
        d="M30 7 L37.64 30.52 L17.64 15.98 L42.36 15.98 L22.36 30.52 Z"
        fill="none"
        stroke="#006233"
        strokeWidth="1.8"
        strokeLinejoin="miter"
      />
    </svg>
  </span>
);

const MarcheVerteBanner = () => {
  const { lang } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const today = moroccoToday();
  const anniversary = today.year - MARCHE_VERTE_YEAR;

  useEffect(() => {
    let closed = false;
    try {
      closed = sessionStorage.getItem(DISMISS_KEY) === "1";
    } catch {
      // sessionStorage indisponible : le bandeau reste affichable
    }
    const isNov6 = today.month === 11 && today.day === 6;
    setVisible(!closed && (isNov6 || isPreview()));
  }, [today.month, today.day]);

  useEffect(() => {
    if (!visible) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % 3), ROTATION_MS);
    return () => clearInterval(timer);
  }, [visible]);

  const close = () => {
    setVisible(false);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // ignoré
    }
  };

  if (!visible) return null;
  const messages = messagesFor(lang, today.year, anniversary);

  return (
    <div
      role="region"
      aria-label={lang === "ar" ? "ذكرى المسيرة الخضراء" : "Marche Verte"}
      className="mv-banner relative overflow-hidden text-white"
      style={{
        // Couleurs principales de CPA (variables de src/index.css)
        backgroundImage:
          "linear-gradient(90deg, hsl(var(--cpa-blue-deep)) 0%, hsl(var(--cpa-blue)) 50%, hsl(var(--cpa-blue-deep)) 100%)",
      }}
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      {/* Reflet lumineux qui traverse le bandeau */}
      <span className="mv-shine pointer-events-none absolute inset-y-0 w-1/3" aria-hidden="true" />
      <div className="container relative mx-auto flex items-center justify-center gap-3 px-10 py-1.5 text-center sm:py-2">
        <WavingFlag />
        <div className="relative min-h-[1.25rem] flex-1 overflow-hidden sm:flex-none">
          <AnimatePresence mode="wait">
            <motion.p
              key={`${lang}-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="text-xs font-semibold leading-snug sm:text-sm"
              aria-live="polite"
            >
              {messages[index]}
            </motion.p>
          </AnimatePresence>
        </div>
        <span className="hidden shrink-0 sm:inline-block">
          <WavingFlag />
        </span>
      </div>
      <button
        type="button"
        onClick={close}
        className="absolute end-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        aria-label={lang === "ar" ? "إغلاق" : lang === "en" ? "Close" : lang === "es" ? "Cerrar" : "Fermer"}
      >
        <X className="h-4 w-4" />
      </button>
      <style>{`
        .mv-flag { transform-origin: left center; animation: mv-wave 2.4s ease-in-out infinite; }
        @keyframes mv-wave {
          0%, 100% { transform: perspective(60px) rotateY(0deg) skewY(0deg); }
          25% { transform: perspective(60px) rotateY(-14deg) skewY(2deg); }
          75% { transform: perspective(60px) rotateY(10deg) skewY(-2deg); }
        }
        .mv-shine { left: -40%; background: linear-gradient(100deg, transparent, rgba(255,255,255,0.18), transparent); animation: mv-shine 5s ease-in-out infinite; }
        @keyframes mv-shine { 0% { left: -40%; } 60%, 100% { left: 110%; } }
        @media (prefers-reduced-motion: reduce) {
          .mv-flag, .mv-shine { animation: none; }
        }
      `}</style>
    </div>
  );
};

export default MarcheVerteBanner;
