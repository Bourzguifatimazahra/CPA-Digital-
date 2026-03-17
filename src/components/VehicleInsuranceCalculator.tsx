import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { ArrowRight, ArrowLeft, Phone, Package, FileText, Clock } from "lucide-react";

const VehicleInsuranceCalculator = () => {
  const { lang } = useLanguage();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Page 1: Informations du véhicule
    fuelType: "Diesel",
    fiscalPower: "",
    seats: "5",
    registrationDate: "2025-01-01",
    newValue: "200000",
    venalValue: "200000",
    glassValue: "5000",
    
    // Page 2: Informations du conducteur
    fullName: "",
    birthDate: "",
    phoneNumber: "",
    email: "",
    acceptLegal: false,
    acceptMarketing: false,
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useState(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      // Soumettre le formulaire
      console.log("Form submitted:", formData);
      // Vous pouvez ajouter ici l'envoi par email ou WhatsApp
    }
  };

  const handlePrevious = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const isStep1Valid = formData.fiscalPower !== "" && formData.newValue !== "" && formData.venalValue !== "";
  const isStep2Valid = formData.fullName !== "" && formData.birthDate !== "" && formData.phoneNumber !== "" && formData.email !== "" && formData.acceptLegal;

  return (
    <section id="calculateur" className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/30 min-h-screen relative">
      <div className="container mx-auto px-4 pb-24">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-card rounded-3xl p-8 md:p-12 border border-border cpa-shadow-lg">
                {/* Header */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-foreground mb-2">
                    Les informations du véhicule
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Veuillez remplir à partir de votre carte grise
                  </p>
                </div>

                {/* Form Fields */}
                <div className="space-y-6">
                  {/* Type de carburant */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">
                      Type de carburant
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {["Diesel", "Essence", "Hybride", "Électrique"].map((fuel) => (
                        <button
                          key={fuel}
                          type="button"
                          onClick={() => handleInputChange("fuelType", fuel)}
                          className={`py-3 px-4 rounded-xl font-semibold text-sm transition-all border-2 ${
                            formData.fuelType === fuel
                              ? "cpa-gradient-bg text-primary-foreground border-transparent shadow-md"
                              : "bg-background text-foreground border-border hover:border-primary/40"
                          }`}
                        >
                          {fuel}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Puissance fiscale */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Puissance fiscale (CV)
                    </label>
                    <input
                      type="number"
                      value={formData.fiscalPower}
                      onChange={(e) => handleInputChange("fiscalPower", e.target.value)}
                      placeholder="Ex: 7"
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                    />
                  </div>

                  {/* Nombre de places */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">
                      Nombre de places
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {["5", "8"].map((seats) => (
                        <button
                          key={seats}
                          type="button"
                          onClick={() => handleInputChange("seats", seats)}
                          className={`py-3 px-4 rounded-xl font-semibold text-sm transition-all border-2 ${
                            formData.seats === seats
                              ? "cpa-gradient-bg text-primary-foreground border-transparent shadow-md"
                              : "bg-background text-foreground border-border hover:border-primary/40"
                          }`}
                        >
                          {seats} places
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date de mise en circulation */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Date de mise en circulation
                    </label>
                    <input
                      type="date"
                      value={formData.registrationDate}
                      onChange={(e) => handleInputChange("registrationDate", e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                    />
                  </div>

                  {/* Valeur à neuf */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Valeur à neuf (DH)
                    </label>
                    <input
                      type="number"
                      value={formData.newValue}
                      onChange={(e) => handleInputChange("newValue", e.target.value)}
                      placeholder="200 000"
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                    />
                  </div>

                  {/* Valeur vénale */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Valeur vénale (DH)
                    </label>
                    <input
                      type="number"
                      value={formData.venalValue}
                      onChange={(e) => handleInputChange("venalValue", e.target.value)}
                      placeholder="200 000"
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                    />
                  </div>

                  {/* Valeur des glaces */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Valeur des glaces (DH)
                    </label>
                    <input
                      type="number"
                      value={formData.glassValue}
                      onChange={(e) => handleInputChange("glassValue", e.target.value)}
                      placeholder="5 000"
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Next Button */}
                <motion.button
                  onClick={handleNext}
                  disabled={!isStep1Valid}
                  whileHover={{ scale: isStep1Valid ? 1.02 : 1 }}
                  whileTap={{ scale: isStep1Valid ? 0.98 : 1 }}
                  className={`w-full mt-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                    isStep1Valid
                      ? "cpa-gradient-bg text-primary-foreground shadow-lg hover:shadow-xl cursor-pointer"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
                >
                  Suivant <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-card rounded-3xl p-8 md:p-12 border border-border cpa-shadow-lg">
                {/* Header */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-foreground mb-2">
                    Les informations du conducteur
                  </h2>
                </div>

                {/* Form Fields */}
                <div className="space-y-6">
                  {/* Nom complet */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      placeholder="Votre nom complet"
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                    />
                  </div>

                  {/* Date de naissance */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Date de naissance
                    </label>
                    <input
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => handleInputChange("birthDate", e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                    />
                  </div>

                  {/* Numéro GSM */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Numéro GSM
                    </label>
                    <input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                      placeholder="+212 6XX XXX XXX"
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="votre.email@example.com"
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                    />
                  </div>

                  {/* Legal Text */}
                  <div className="bg-muted/50 rounded-xl p-4 border border-border">
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                      Conformément à la loi 09-08, vous disposez d'un droit d'accès, de rectification et d'opposition 
                      au traitement de vos données personnelles. Ce traitement est autorisé par la CNDP sous le numéro 
                      A-GC-206/2015. Pour exercer vos droits, contactez-nous à info@cpa.ma
                    </p>

                    {/* Checkboxes */}
                    <div className="space-y-3">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={formData.acceptLegal}
                          onChange={(e) => handleInputChange("acceptLegal", e.target.checked)}
                          className="mt-1 w-5 h-5 rounded border-2 border-border text-primary focus:ring-2 focus:ring-primary/30 cursor-pointer"
                        />
                        <span className="text-xs text-foreground group-hover:text-primary transition-colors">
                          J'accepte les mentions légales et la politique de confidentialité *
                        </span>
                      </label>

                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={formData.acceptMarketing}
                          onChange={(e) => handleInputChange("acceptMarketing", e.target.checked)}
                          className="mt-1 w-5 h-5 rounded border-2 border-border text-primary focus:ring-2 focus:ring-primary/30 cursor-pointer"
                        />
                        <span className="text-xs text-foreground group-hover:text-primary transition-colors">
                          J'autorise CPA à me contacter pour des communications commerciales
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 mt-8">
                  <motion.button
                    onClick={handlePrevious}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 bg-muted text-foreground hover:bg-muted/80 transition-all"
                  >
                    <ArrowLeft className="w-5 h-5" /> Précédent
                  </motion.button>

                  <motion.button
                    onClick={handleNext}
                    disabled={!isStep2Valid}
                    whileHover={{ scale: isStep2Valid ? 1.02 : 1 }}
                    whileTap={{ scale: isStep2Valid ? 0.98 : 1 }}
                    className={`flex-1 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                      isStep2Valid
                        ? "cpa-gradient-bg text-primary-foreground shadow-lg hover:shadow-xl cursor-pointer"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    }`}
                  >
                    Envoyer <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Navigation Bar */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="fixed bottom-0 left-0 right-0 bg-card border-t-2 border-border shadow-2xl z-50"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Navigation Icons */}
            <div className="flex items-center gap-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-1 group"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <span className="text-xs font-semibold text-muted-foreground group-hover:text-primary transition-colors">
                  Me rappeler
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-1 group"
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Package className="w-6 h-6 text-accent" />
                </div>
                <span className="text-xs font-semibold text-muted-foreground group-hover:text-accent transition-colors">
                  Produits
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-1 group"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <span className="text-xs font-semibold text-muted-foreground group-hover:text-primary transition-colors">
                  Souscription
                </span>
              </motion.button>
            </div>

            {/* Time and Date Display */}
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <div className="text-right">
                <div className="text-lg font-bold text-foreground">
                  {currentTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="text-xs text-muted-foreground">
                  {currentTime.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default VehicleInsuranceCalculator;
