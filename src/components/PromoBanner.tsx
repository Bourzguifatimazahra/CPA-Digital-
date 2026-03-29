import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface PromoMessage {
  fr: string;
  en: string;
  ar: string;
  es: string;
}

const promoMessages: PromoMessage[] = [
  {
    fr: "🎉 CPA - Votre courtier de confiance depuis 1957 ! Obtenez un devis gratuit maintenant !",
    en: "🎉 CPA - Your trusted broker since 1957! Get a free quote now!",
    ar: "🎉 CPA - وسيطك الموثوق منذ 1957! احصل على عرض أسعار مجاني الآن!",
    es: "🎉 CPA - ¡Su corredor de confianza desde 1957! ¡Obtenga un presupuesto gratis ahora!"
  },
  {
    fr: "✨ Assurance Auto, Santé, Habitation - Les meilleures offres du marché avec CPA !",
    en: "✨ Auto, Health, Home Insurance - The best market offers with CPA!",
    ar: "✨ تأمين السيارات والصحة والمنزل - أفضل عروض السوق مع CPA!",
    es: "✨ Seguro de Auto, Salud, Hogar - ¡Las mejores ofertas del mercado con CPA!"
  },
  {
    fr: "🚀 Nouveau ! Assurance Trottinette Électrique & Animaux de Compagnie - Protégez ce qui compte !",
    en: "🚀 New! Electric Scooter & Pet Insurance - Protect what matters!",
    ar: "🚀 جديد! تأمين السكوتر الكهربائي والحيوانات الأليفة - احمِ ما يهمك!",
    es: "🚀 ¡Nuevo! Seguro de Patinete Eléctrico y Mascotas - ¡Proteja lo que importa!"
  },
  {
    fr: "💼 Entreprises : Solutions d'assurance complètes - Cyber Risques, Flotte Auto, RC Pro !",
    en: "💼 Businesses: Complete insurance solutions - Cyber Risks, Auto Fleet, Professional Liability!",
    ar: "💼 الشركات: حلول تأمين شاملة - مخاطر الإنترنت، أسطول السيارات، المسؤولية المهنية!",
    es: "💼 Empresas: Soluciones de seguro completas - ¡Riesgos Cibernéticos, Flota de Autos, RC Profesional!"
  },
  {
    fr: "🏆 +60 ans d'expertise - CPA accompagne particuliers et entreprises au Maroc !",
    en: "🏆 +60 years of expertise - CPA supports individuals and businesses in Morocco!",
    ar: "🏆 +60 عامًا من الخبرة - CPA ترافق الأفراد والشركات في المغرب!",
    es: "🏆 +60 años de experiencia - ¡CPA acompaña a particulares y empresas en Marruecos!"
  },
  {
    fr: "📞 Contactez-nous : +212 5 22 95 39 00 | info@cpa.ma - Service client disponible !",
    en: "📞 Contact us: +212 5 22 95 39 00 | info@cpa.ma - Customer service available!",
    ar: "📞 اتصل بنا: +212 5 22 95 39 00 | info@cpa.ma - خدمة العملاء متاحة!",
    es: "📞 Contáctenos: +212 5 22 95 39 00 | info@cpa.ma - ¡Servicio al cliente disponible!"
  },
  {
    fr: "💰 Économisez jusqu'à 30% sur vos assurances - Comparez et choisissez avec CPA !",
    en: "💰 Save up to 30% on your insurance - Compare and choose with CPA!",
    ar: "💰 وفر حتى 30% على تأميناتك - قارن واختر مع CPA!",
    es: "💰 ¡Ahorre hasta un 30% en sus seguros - Compare y elija con CPA!"
  },
  {
    fr: "🎯 Devis personnalisé en 24h - Réponse rapide et accompagnement sur mesure !",
    en: "🎯 Personalized quote in 24h - Fast response and tailored support!",
    ar: "🎯 عرض أسعار مخصص في 24 ساعة - استجابة سريعة ودعم مخصص!",
    es: "🎯 ¡Presupuesto personalizado en 24h - Respuesta rápida y acompañamiento a medida!"
  }
];

interface PromoBannerProps {
  onClose?: () => void;
  autoRotate?: boolean;
  rotationInterval?: number;
}

const PromoBanner = ({ 
  onClose, 
  autoRotate = true, 
  rotationInterval = 5000 
}: PromoBannerProps) => {
  const { lang } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!autoRotate || !isVisible) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % promoMessages.length);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [autoRotate, rotationInterval, isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) return null;

  const currentMessage = promoMessages[currentIndex];
  const message = currentMessage[lang as keyof PromoMessage] || currentMessage.fr;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="relative w-full bg-gradient-to-r from-[#1e3a8a] via-[#2563eb] to-[#1e3a8a] text-white px-4 py-2.5 shadow-md"
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <Sparkles className="w-4 h-4 flex-shrink-0 animate-pulse" />
            <p className="text-xs font-medium leading-tight truncate">
              {message}
            </p>
          </div>
          {onClose && (
            <button
              onClick={handleClose}
              className="flex-shrink-0 p-1 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Fermer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        
        {/* Progress indicator dots */}
        {autoRotate && (
          <div className="flex justify-center gap-1 mt-2">
            {promoMessages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  index === currentIndex 
                    ? "bg-white w-4" 
                    : "bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Message ${index + 1}`}
              />
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default PromoBanner;
