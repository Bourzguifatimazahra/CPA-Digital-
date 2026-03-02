import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ParticuliersPage from "./pages/ParticuliersPage";
import EntreprisesPage from "./pages/EntreprisesPage";
import ExpertisePage from "./pages/ExpertisePage";
import ContactPage from "./pages/ContactPage";
import ServiceDetail from "./pages/ServiceDetail";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/particuliers" element={<ParticuliersPage />} />
            <Route path="/entreprises" element={<EntreprisesPage />} />
            <Route path="/expertise" element={<ExpertisePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/:category/:slug" element={<ServiceDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
