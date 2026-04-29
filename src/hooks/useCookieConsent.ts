import { useState, useCallback } from "react";

type CookieConsent = "accepted" | "rejected" | "pending";

interface CookieConsentState {
  consent: CookieConsent;
  acceptCookies: () => void;
  rejectCookies: () => void;
}

export const useCookieConsent = (): CookieConsentState => {
  const [consent, setConsent] = useState<CookieConsent>(() => {
    // Check localStorage on initial load
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cookie-consent");
      if (stored === "accepted" || stored === "rejected") {
        return stored;
      }
    }
    return "pending";
  });

  const acceptCookies = useCallback(() => {
    setConsent("accepted");
    if (typeof window !== "undefined") {
      localStorage.setItem("cookie-consent", "accepted");
    }
  }, []);

  const rejectCookies = useCallback(() => {
    setConsent("rejected");
    if (typeof window !== "undefined") {
      localStorage.setItem("cookie-consent", "rejected");
    }
  }, []);

  return { consent, acceptCookies, rejectCookies };
};