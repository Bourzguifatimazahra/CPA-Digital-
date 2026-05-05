import { createContext, useContext, useState, ReactNode } from "react";
import { Lang, translations, TranslationKey } from "./translations";

type LanguageContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
  isRTL: boolean;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("fr");
  const isRTL = lang === "ar";

  const t = (key: string): string => {
    return translations[key]?.[lang] || translations[key]?.["fr"] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isRTL }}>
      <div dir={isRTL ? "rtl" : "ltr"}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
