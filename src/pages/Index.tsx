import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ValuesSection from "@/components/ValuesSection";
import ExpertiseSection from "@/components/ExpertiseSection";
// TeamSection removed - domains moved to ExpertiseSection marquee
import KeyFiguresSection from "@/components/KeyFiguresSection";
import ExpansionSection from "@/components/ExpansionSection";
import NewInsuranceSection from "@/components/NewInsuranceSection";
import CTASection from "@/components/CTASection";
import PartnersSection from "@/components/PartnersSection";
import ClientsSection from "@/components/ClientsSection";
import AffiliationsSection from "@/components/AffiliationsSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

       {!loading && (
         <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 0.5 }}
         >
           <Navbar />
           <HeroSection />
           <AboutSection />
           <ValuesSection />
           <ExpertiseSection />
           {/* TeamSection removed - domains in ExpertiseSection */}
            <KeyFiguresSection />
            <ExpansionSection />
           <NewInsuranceSection />
           <PartnersSection />
           <ClientsSection />
           <AffiliationsSection />
           <CTASection />
           <Footer />
         </motion.div>
       )}
    </>
  );
};

export default Index;
