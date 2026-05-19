import { useState, useCallback } from "react";

export interface CookiePrefs {
  essential: boolean;
  stats: boolean;
  personalization: boolean;
  security: boolean;
}

type CookieConsentStatus = "pending" | "saved";

interface CookieConsentState {
  status: CookieConsentStatus;
  prefs: CookiePrefs;
  acceptAll: () => void;
  rejectAll: () => void;
  savePrefs: (prefs: CookiePrefs) => void;
}

const DEFAULT_PREFS: CookiePrefs = {
  essential: true,
  stats: false,
  personalization: false,
  security: true,
};

export const useCookieConsent = (): CookieConsentState => {
  const [status, setStatus] = useState<CookieConsentStatus>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cookie-consent");
      if (stored) {
        try {
          JSON.parse(stored);
          return "saved";
        } catch {
          return "pending";
        }
      }
    }
    return "pending";
  });

  const [prefs, setPrefs] = useState<CookiePrefs>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cookie-consent");
      if (stored) {
        try {
          return { ...DEFAULT_PREFS, ...JSON.parse(stored) };
        } catch {
          return DEFAULT_PREFS;
        }
      }
    }
    return DEFAULT_PREFS;
  });

  const savePrefs = useCallback((data: CookiePrefs) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cookie-consent", JSON.stringify(data));
    }
    setPrefs(data);
    setStatus("saved");
  }, []);

  const acceptAll = useCallback(() => {
    savePrefs({
      essential: true,
      stats: true,
      personalization: true,
      security: true,
    });
  }, [savePrefs]);

  const rejectAll = useCallback(() => {
    savePrefs({
      essential: true,
      stats: false,
      personalization: false,
      security: false,
    });
  }, [savePrefs]);

  return { status, prefs, acceptAll, rejectAll, savePrefs };
};
