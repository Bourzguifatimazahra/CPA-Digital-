import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { useEffect, lazy, Suspense } from "react";
import Chatbot, { PageContext } from "./components/Chatbot";
import { useLanguage } from "./i18n/LanguageContext";
import { allServicePages } from "./data/servicePages";
import { initializeAnalytics, trackPageView } from "@/lib/analytics";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import CookieConsent from "@/components/CookieConsent";

// Lazy load all pages for code splitting
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ParticuliersPage = lazy(() => import("./pages/ParticuliersPage"));
const EntreprisesPage = lazy(() => import("./pages/EntreprisesPage"));
const ExpertisePage = lazy(() => import("./pages/ExpertisePage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const CatalogPage = lazy(() => import("./pages/CatalogPage"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const MentionsLegalesPage = lazy(() => import("./pages/MentionsLegalesPage"));
const PolitiqueConfidentialitePage = lazy(() => import("./pages/PolitiqueConfidentialitePage"));
const FAQPage = lazy(() => import("./pages/FAQPage"));

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

// Google Analytics tracking component (only active when stats consent given)
const GoogleAnalyticsTracker = () => {
  const { pathname, search } = useLocation();
  const { prefs } = useCookieConsent();

  useEffect(() => {
    // Initialize Google Analytics only if stats consent was given
    if (prefs.stats) {
      initializeAnalytics();
    }
  }, [prefs.stats]);

  useEffect(() => {
    // Track page view on route change only if stats consent was given
    if (prefs.stats) {
      trackPageView(pathname + search);
    }
  }, [pathname, search, prefs.stats]);

  return null;
};

// Get page context based on current route
const usePageContext = (): PageContext => {
  const location = useLocation();
  const path = location.pathname;
  
  // Map routes to page contexts
  if (path === "/") return 'home';
  if (path === "/particuliers") return 'particuliers';
  if (path === "/entreprises") return 'entreprises';
  if (path === "/expertise") return 'expertise';
  if (path === "/contact") return 'contact';
  if (path === "/mentions-legales") return 'mentions-legales';
  if (path === "/mentions-legales-assistant") return 'mentions-legales-assistant';
  if (path === "/politique-confidentialite") return 'politique-confidentialite';
  if (path === "/catalog") return 'catalog';
  
  // Check for service detail pages
  const match = path.match(/^\/([^/]+)\/([^/]+)$/);
  if (match) {
    const [, category, slug] = match;
    const page = allServicePages.find((p) => p.category === category && p.slug === slug);
    if (page) {
      // Map service categories to page contexts
      const categoryMap: Record<string, PageContext> = {
        'auto': 'auto',
        'habitation': 'habitation',
        'sante': 'sante',
        'epargne': 'epargne',
        'prevoyance': 'prevoyance',
        'accidents-travail': 'travail',
        'construction': 'construction',
        'transport': 'transport',
        'cyber-risques': 'cyber',
        'flotte-auto': 'flotte',
        'trottinette-electrique': 'trottinette',
        'animaux': 'animaux',
      };
      return categoryMap[category] || 'service';
    }
  }
  
  return 'home';
};

// Chatbot wrapper that provides page context
const ChatbotWrapper = () => {
  const pageContext = usePageContext();
  return <Chatbot pageContext={pageContext} />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <GoogleAnalyticsTracker />
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/particuliers" element={<ParticuliersPage />} />
              <Route path="/entreprises" element={<EntreprisesPage />} />
              <Route path="/expertise" element={<ExpertisePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
              <Route path="/politique-confidentialite" element={<PolitiqueConfidentialitePage />} />
              <Route path="/:category/:slug" element={<ServiceDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <ChatbotWrapper />
          <CookieConsent />
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
