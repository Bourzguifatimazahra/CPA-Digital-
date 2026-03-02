import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const faqData: { q: string; a: string; keywords: string[] }[] = [
  // Concepts généraux
  { q: "Qu'est-ce que l'assurance ?", a: "L'assurance est un contrat par lequel une personne se protège contre un risque en échange d'une cotisation.", keywords: ["assurance", "contrat", "protège", "risque"] },
  { q: "À quoi sert l'assurance ?", a: "Elle permet de réduire les conséquences financières en cas de sinistre.", keywords: ["sert", "conséquences", "financières", "sinistre"] },
  { q: "Quelle est la différence entre assureur et courtier ?", a: "L'assureur garantit le risque, le courtier conseille et représente le client. CPA est votre courtier de confiance.", keywords: ["différence", "assureur", "courtier", "garantit"] },
  { q: "Qu'est-ce qu'une prime d'assurance ?", a: "C'est le montant que vous payez pour être assuré. Elle varie selon le type de couverture et le profil de risque.", keywords: ["prime", "montant", "payez", "assuré"] },
  { q: "Qu'est-ce qu'une franchise ?", a: "C'est la part du sinistre qui reste à votre charge. Plus la franchise est élevée, plus la prime est basse.", keywords: ["franchise", "charge", "sinistre"] },
  { q: "Le courtier est-il payant ?", a: "Non, sa rémunération est incluse dans la prime d'assurance. Nos services de conseil sont gratuits pour vous.", keywords: ["courtier", "payant", "gratuit", "rémunération"] },
  
  // Automobile
  { q: "L'assurance automobile est-elle obligatoire au Maroc ?", a: "Oui, l'assurance responsabilité civile automobile est obligatoire au Maroc. Elle couvre les dommages causés aux tiers en cas d'accident.", keywords: ["automobile", "obligatoire", "maroc", "voiture", "auto"] },
  { q: "Quelles sont les garanties auto ?", a: "Nous proposons : responsabilité civile, tous risques, vol, incendie, bris de glace, assistance, protection du conducteur, et dommages collision.", keywords: ["garanties", "auto", "tous risques", "vol", "incendie"] },
  { q: "Combien coûte l'assurance auto ?", a: "Le tarif dépend du véhicule, de votre profil conducteur, de la zone géographique et des garanties choisies. Demandez un devis personnalisé !", keywords: ["coût", "prix", "tarif", "auto", "combien"] },
  { q: "Comment assurer ma flotte de véhicules ?", a: "CPA propose des contrats flotte pour les entreprises à partir de 5 véhicules avec des tarifs préférentiels et une gestion simplifiée.", keywords: ["flotte", "véhicules", "entreprise", "parc"] },

  // Habitation
  { q: "Pourquoi souscrire une assurance habitation ?", a: "L'assurance habitation protège votre logement et vos biens contre le vol, l'incendie, les dégâts des eaux, les catastrophes naturelles et la responsabilité civile.", keywords: ["habitation", "maison", "logement", "domicile"] },
  
  // Santé
  { q: "Comment fonctionne l'assurance santé ?", a: "L'assurance santé rembourse vos frais médicaux (consultations, hospitalisations, médicaments, optique, dentaire) selon les barèmes de votre contrat.", keywords: ["santé", "médical", "remboursement", "maladie", "soin"] },
  { q: "Proposez-vous une assurance santé groupe ?", a: "Oui, nous proposons des contrats santé groupe pour les entreprises couvrant les employés et leurs familles avec des tarifs avantageux.", keywords: ["groupe", "entreprise", "employés", "collectif"] },

  // Sinistres
  { q: "Qu'est-ce qu'un sinistre ?", a: "C'est la réalisation du risque assuré : accident, vol, incendie, dégât des eaux, etc.", keywords: ["sinistre", "réalisation", "accident"] },
  { q: "Quand déclarer un sinistre ?", a: "Dans les 5 jours ouvrables à compter du moment où vous en avez connaissance. Pour un vol, le délai est de 48 heures.", keywords: ["déclarer", "sinistre", "délai", "jours"] },
  { q: "Comment déclarer un sinistre ?", a: "Contactez-nous au +212 5 22 95 39 00 ou envoyez un email à info@cpa.ma avec les détails et les justificatifs.", keywords: ["comment", "déclarer", "procédure"] },

  // CPA
  { q: "Qui êtes-vous ?", a: "Nous sommes CPA (Conseil et Placement d'Assurances), un cabinet de courtage en assurances spécialisé dans l'accompagnement des particuliers et des entreprises depuis 1957 à Casablanca.", keywords: ["qui", "êtes", "cpa", "présentation"] },
  { q: "Quelles assurances proposez-vous ?", a: "Nous proposons : Auto, Habitation, Santé, Prévoyance, Épargne, Accidents de Travail, Responsabilité Civile, Construction, Transport Maritime, Cyber Risques, Flotte Auto, Trottinette Électrique et Animaux de Compagnie.", keywords: ["proposez", "services", "offres", "produits", "assurances"] },
  { q: "Pourquoi passer par un courtier ?", a: "Pour comparer les offres de plusieurs compagnies, négocier les meilleurs tarifs, bénéficier d'un accompagnement personnalisé et d'un suivi des sinistres.", keywords: ["pourquoi", "courtier", "avantage", "intérêt"] },
  { q: "Quels sont vos horaires ?", a: "Du lundi au vendredi, de 8h30 à 18h00. Nous sommes également joignables par email 24h/24.", keywords: ["horaires", "heures", "ouverture", "disponible"] },
  { q: "Quelles sont vos valeurs ?", a: "La proximité, l'innovation, la performance et l'éthique. Depuis 1957, nous plaçons le client au cœur de nos préoccupations.", keywords: ["valeurs", "engagement", "philosophie"] },
  { q: "Comment obtenir un devis ?", a: "Appelez-nous au +212 5 22 95 39 00, envoyez un email à info@cpa.ma, ou remplissez le formulaire de contact sur notre site. Vous pouvez aussi utiliser notre estimateur de devis en ligne !", keywords: ["devis", "estimation", "tarif", "prix"] },
  { q: "Où êtes-vous situés ?", a: "Notre siège est à Casablanca, Maroc. Adresse : Casablanca, Maroc. Téléphone : +212 5 22 95 39 00.", keywords: ["adresse", "situés", "localisation", "bureau", "siège"] },

  // Entreprises
  { q: "Proposez-vous des assurances pour les entreprises ?", a: "Oui, nous proposons une gamme complète : Responsabilité Civile, Accidents de Travail, Risques Techniques, Dommage aux Biens, Perte d'Exploitation, Transport, Construction, Cyber Risques et Épargne Vie.", keywords: ["entreprise", "professionnel", "société", "commercial"] },
  { q: "Qu'est-ce que l'assurance responsabilité civile ?", a: "Elle couvre les dommages (corporels, matériels, immatériels) que vous ou votre entreprise pourriez causer à des tiers dans le cadre de votre activité.", keywords: ["responsabilité", "civile", "dommages", "tiers"] },
  { q: "Qu'est-ce que l'assurance accidents de travail ?", a: "C'est une assurance obligatoire qui protège vos employés en cas d'accident survenu sur le lieu de travail ou durant le trajet.", keywords: ["accidents", "travail", "employés", "obligatoire"] },
  { q: "Qu'est-ce que l'assurance cyber risques ?", a: "Elle protège votre entreprise contre les cyberattaques : piratage, vol de données, ransomware, interruption d'activité liée au numérique.", keywords: ["cyber", "numérique", "piratage", "données", "hacking"] },

  // Nouveautés
  { q: "Qu'est-ce que l'assurance trottinette électrique ?", a: "C'est une assurance spécialement conçue pour les utilisateurs de trottinettes électriques. Elle couvre la responsabilité civile, le vol, les dommages matériels et la protection du conducteur.", keywords: ["trottinette", "électrique", "mobilité", "edpm"] },
  { q: "Qu'est-ce que l'assurance animaux de compagnie ?", a: "Elle couvre les frais vétérinaires de vos animaux (chien, chat) en cas de maladie ou d'accident : consultations, chirurgie, hospitalisation et médicaments.", keywords: ["animaux", "compagnie", "chien", "chat", "vétérinaire", "animal"] },
  
  // Paiement / Processus
  { q: "Comment payer ma prime d'assurance ?", a: "Vous pouvez payer par virement bancaire, chèque, ou carte bancaire. Des facilités de paiement sont possibles selon le contrat.", keywords: ["payer", "paiement", "règlement", "carte", "virement"] },
  { q: "Peut-on résilier un contrat d'assurance ?", a: "Oui, vous pouvez résilier votre contrat à l'échéance annuelle avec un préavis (généralement 2 mois). Des cas de résiliation anticipée existent aussi.", keywords: ["résilier", "résiliation", "annuler", "arrêter"] },
  { q: "Comment renouveler mon contrat ?", a: "Votre contrat se renouvelle automatiquement à l'échéance. Notre équipe vous contacte avant pour ajuster les garanties si nécessaire.", keywords: ["renouveler", "renouvellement", "échéance"] },
  
  // Partenaires
  { q: "Avec quelles compagnies travaillez-vous ?", a: "Nous travaillons avec les meilleures compagnies du marché : Allianz, AXA, Wafa Assurance, RMA, Sanlam, AtlantaSanad, La Marocaine Vie, et bien d'autres.", keywords: ["compagnies", "partenaires", "allianz", "axa", "wafa"] },
];

type Message = { role: "bot" | "user"; text: string };

const getContextualSuggestions = (lastMessage: string): string[] => {
  const msg = lastMessage.toLowerCase();
  
  if (msg.includes("auto") || msg.includes("voiture") || msg.includes("véhicule")) {
    return ["Quelles sont les garanties auto ?", "Combien coûte l'assurance auto ?", "Comment assurer ma flotte ?", "Comment déclarer un sinistre ?"];
  }
  if (msg.includes("santé") || msg.includes("médical") || msg.includes("maladie")) {
    return ["Comment fonctionne l'assurance santé ?", "Proposez-vous une assurance santé groupe ?", "Comment obtenir un devis ?"];
  }
  if (msg.includes("entreprise") || msg.includes("professionnel") || msg.includes("société")) {
    return ["Assurances pour les entreprises ?", "Assurance cyber risques ?", "Assurance accidents de travail ?", "Comment obtenir un devis ?"];
  }
  if (msg.includes("sinistre") || msg.includes("accident") || msg.includes("déclar")) {
    return ["Quand déclarer un sinistre ?", "Comment déclarer un sinistre ?", "Qu'est-ce qu'une franchise ?"];
  }
  if (msg.includes("trottinette") || msg.includes("animaux") || msg.includes("nouveau")) {
    return ["Assurance trottinette électrique ?", "Assurance animaux de compagnie ?", "Quelles assurances proposez-vous ?"];
  }
  if (msg.includes("prix") || msg.includes("devis") || msg.includes("tarif") || msg.includes("coût")) {
    return ["Comment obtenir un devis ?", "Comment payer ma prime ?", "Quelles assurances proposez-vous ?"];
  }
  
  // Default suggestions
  return ["Quelles assurances proposez-vous ?", "Comment obtenir un devis ?", "Qui êtes-vous ?", "Vos horaires ?"];
};

const Chatbot = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: t("chat_greeting") },
  ]);
  const [input, setInput] = useState("");
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>(
    ["Qu'est-ce que l'assurance ?", "Vos services ?", "Comment obtenir un devis ?", "Qui êtes-vous ?"]
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const findAnswer = (question: string): string => {
    const q = question.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    // Try exact keyword matching with scoring
    let bestMatch: { faq: typeof faqData[0]; score: number } | null = null;
    
    for (const faq of faqData) {
      let score = 0;
      for (const keyword of faq.keywords) {
        const normalizedKeyword = keyword.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (q.includes(normalizedKeyword)) {
          score += normalizedKeyword.length; // longer keyword matches are more relevant
        }
      }
      if (score > 0 && (!bestMatch || score > bestMatch.score)) {
        bestMatch = { faq, score };
      }
    }
    
    return bestMatch?.faq.a || t("chat_no_answer");
  };

  const handleSend = (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;
    setMessages((prev) => [...prev, { role: "user", text: msg }]);
    setInput("");
    setTimeout(() => {
      const answer = findAnswer(msg);
      setMessages((prev) => [...prev, { role: "bot", text: answer }]);
      setCurrentSuggestions(getContextualSuggestions(msg));
    }, 600);
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full cpa-gradient-bg text-primary-foreground flex items-center justify-center cpa-shadow-lg hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 0 : 1 }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-6rem)] bg-card rounded-2xl border border-border cpa-shadow-lg flex flex-col overflow-hidden"
          >
            <div className="cpa-gradient-bg px-5 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-primary-foreground text-sm">Assistant CPA</h4>
                  <p className="text-primary-foreground/70 text-xs">{t("chat_online")}</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-primary-foreground/70 hover:text-primary-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${msg.role === "bot" ? "cpa-gradient-bg" : "bg-muted"}`}>
                    {msg.role === "bot" ? <Bot className="w-4 h-4 text-primary-foreground" /> : <User className="w-4 h-4 text-muted-foreground" />}
                  </div>
                  <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === "bot" ? "bg-muted text-foreground rounded-bl-sm" : "cpa-gradient-bg text-primary-foreground rounded-br-sm"
                  }`}>{msg.text}</div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
              {/* Always show suggestions */}
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-2 pt-2"
              >
                {currentSuggestions.map((s) => (
                  <button key={s} onClick={() => handleSend(s)}
                    className="text-xs px-3 py-1.5 rounded-full border border-primary/30 text-primary hover:bg-secondary transition-colors">
                    {s}
                  </button>
                ))}
              </motion.div>
            </div>

            <div className="border-t border-border p-3 shrink-0">
              <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2">
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
                  placeholder={t("chat_placeholder")}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <motion.button type="submit" whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-xl cpa-gradient-bg text-primary-foreground flex items-center justify-center shrink-0">
                  <Send className="w-4 h-4" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
