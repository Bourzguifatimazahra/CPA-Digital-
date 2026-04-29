import { useCookieConsent } from "@/hooks/useCookieConsent";
import { initializeAnalytics, trackPageView, trackEvent } from "@/lib/analytics";
import { useEffect, useRef } from "react";

export const useGA4Consent = () => {
  const { consent } = useCookieConsent();
  const initializedRef = useRef(false);

  useEffect(() => {
    if (consent === "accepted" && !initializedRef.current) {
      initializeAnalytics();
      initializedRef.current = true;
    }
  }, [consent]);

  return {
    consent,
    trackPageView,
    trackEvent
  };
};