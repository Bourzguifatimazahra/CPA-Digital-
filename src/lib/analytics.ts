import ReactGA from "react-ga4";

// Google Analytics Measurement ID
const TRACKING_ID = "G-W1KQ22WHE7";

// Check if analytics is enabled (user has accepted cookies)
export const isAnalyticsEnabled = (): boolean => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("cookie-consent") === "accepted";
};

// Initialize Google Analytics (only if consent given)
export const initializeAnalytics = () => {
  if (isAnalyticsEnabled()) {
    ReactGA.initialize(TRACKING_ID);
  }
};

// Track a page view (only if analytics enabled)
export const trackPageView = (path: string) => {
  if (isAnalyticsEnabled()) {
    ReactGA.send({ hitType: "pageview", page: path });
  }
};

// Track a custom event (only if analytics enabled)
export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
) => {
  if (isAnalyticsEnabled()) {
    ReactGA.event(action, {
      category,
      label,
      value,
    });
  }
};
