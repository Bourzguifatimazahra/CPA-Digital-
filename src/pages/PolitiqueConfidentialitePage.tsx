import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";

const PolitiqueConfidentialitePage = () => {
  const { t, lang } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      
      <section className="pt-32 pb-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-foreground mb-8">
              {lang === "fr" ? "Politique de Confidentialité" : lang === "en" ? "Privacy Policy" : "سياسة الخصوصية"}
            </h1>
            
            <div className="prose prose-lg max-w-none space-y-6 text-foreground">
              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  {lang === "fr" ? "Introduction" : lang === "en" ? "Introduction" : "مقدمة"}
                </h2>
                <p className="text-muted-foreground">
                  {lang === "fr"
                    ? "La présente politique de confidentialité décrit comment CPA collecte, utilise et protège vos données personnelles conformément à la réglementation marocaine en matière de protection des données personnelles (Loi 09-08)."
                    : lang === "en"
                    ? "This privacy policy describes how CPA collects, uses and protects your personal data in accordance with Moroccan data protection regulations (Law 09-08)."
                    : "تصف سياسة الخصوصية هذه كيفية قيام CPA بجمع واستخدام وحماية بياناتك الشخصية وفقًا للوائح حماية البيانات المغربية (القانون 09-08)."
                  }
                </p>
              </div>

              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  {lang === "fr" ? "Collecte des données personnelles" : lang === "en" ? "Collection of Personal Data" : "جمع البيانات الشخصية"}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {lang === "fr"
                    ? "CPA collecte les données personnelles suivantes :"
                    : lang === "en"
                    ? "CPA collects the following personal data:"
                    : "تجمع CPA البيانات الشخصية التالية:"
                  }
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>{lang === "fr" ? "Nom et prénom" : lang === "en" ? "First and last name" : "الاسم واللقب"}</li>
                  <li>{lang === "fr" ? "Adresse email" : lang === "en" ? "Email address" : "عنوان البريد الإلكتروني"}</li>
                  <li>{lang === "fr" ? "Numéro de téléphone" : lang === "en" ? "Phone number" : "رقم الهاتف"}</li>
                  <li>{lang === "fr" ? "Adresse postale" : lang === "en" ? "Postal address" : "العنوان البريدي"}</li>
                  <li>{lang === "fr" ? "Informations relatives à votre demande d'assurance" : lang === "en" ? "Information related to your insurance request" : "المعلومات المتعلقة بطلب التأمين الخاص بك"}</li>
                </ul>
              </div>

              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  {lang === "fr" ? "Utilisation des données" : lang === "en" ? "Use of Data" : "استخدام البيانات"}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {lang === "fr"
                    ? "Vos données personnelles sont utilisées pour :"
                    : lang === "en"
                    ? "Your personal data is used to:"
                    : "تُستخدم بياناتك الشخصية لـ:"
                  }
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>{lang === "fr" ? "Répondre à vos demandes de devis" : lang === "en" ? "Respond to your quote requests" : "الرد على طلبات عروض الأسعار الخاصة بك"}</li>
                  <li>{lang === "fr" ? "Vous contacter dans le cadre de votre dossier d'assurance" : lang === "en" ? "Contact you regarding your insurance file" : "التواصل معك بشأن ملف التأمين الخاص بك"}</li>
                  <li>{lang === "fr" ? "Vous envoyer des informations sur nos produits et services" : lang === "en" ? "Send you information about our products and services" : "إرسال معلومات حول منتجاتنا وخدماتنا"}</li>
                  <li>{lang === "fr" ? "Améliorer notre site web et nos services" : lang === "en" ? "Improve our website and services" : "تحسين موقعنا وخدماتنا"}</li>
                </ul>
              </div>

              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  {lang === "fr" ? "Protection des données" : lang === "en" ? "Data Protection" : "حماية البيانات"}
                </h2>
                <p className="text-muted-foreground">
                  {lang === "fr"
                    ? "CPA met en œuvre toutes les mesures techniques et organisationnelles nécessaires pour protéger vos données personnelles contre tout accès non autorisé, toute modification, divulgation ou destruction. Nous utilisons des protocoles de sécurité avancés pour garantir la confidentialité de vos informations."
                    : lang === "en"
                    ? "CPA implements all necessary technical and organizational measures to protect your personal data against any unauthorized access, modification, disclosure or destruction. We use advanced security protocols to guarantee the confidentiality of your information."
                    : "تنفذ CPA جميع التدابير التقنية والتنظيمية اللازمة لحماية بياناتك الشخصية ضد أي وصول غير مصرح به أو تعديل أو إفشاء أو تدمير. نستخدم بروتوكولات أمنية متقدمة لضمان سرية معلوماتك."
                  }
                </p>
              </div>

              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  {lang === "fr" ? "Conservation des données" : lang === "en" ? "Data Retention" : "الاحتفاظ بالبيانات"}
                </h2>
                <p className="text-muted-foreground">
                  {lang === "fr"
                    ? "Vos données personnelles sont conservées pour la durée nécessaire à la réalisation des finalités pour lesquelles elles ont été collectées, dans le respect des délais légaux de conservation."
                    : lang === "en"
                    ? "Your personal data is kept for the duration necessary to achieve the purposes for which it was collected, in compliance with legal retention periods."
                    : "يتم الاحتفاظ ببياناتك الشخصية للمدة اللازمة لتحقيق الأغراض التي جمعتها من أجلها، مع الالتزام بفترات الاحتفاظ القانونية."
                  }
                </p>
              </div>

              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  {lang === "fr" ? "Vos droits" : lang === "en" ? "Your Rights" : "حقوقك"}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {lang === "fr"
                    ? "Conformément à la réglementation en vigueur, vous disposez des droits suivants :"
                    : lang === "en"
                    ? "In accordance with current regulations, you have the following rights:"
                    : "وفقًا للوائح المعمول بها، لديك الحقوق التالية:"
                  }
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>{lang === "fr" ? "Droit d'accès à vos données personnelles" : lang === "en" ? "Right to access your personal data" : "الوصول إلى بياناتك الشخصية"}</li>
                  <li>{lang === "fr" ? "Droit de rectification de vos données" : lang === "en" ? "Right to rectification of your data" : "تصحيح بياناتك"}</li>
                  <li>{lang === "fr" ? "Droit à l'effacement de vos données" : lang === "en" ? "Right to erasure of your data" : "محو بياناتك"}</li>
                  <li>{lang === "fr" ? "Droit d'opposition au traitement de vos données" : lang === "en" ? "Right to object to the processing of your data" : "الاعتراض على معالجة بياناتك"}</li>
                  <li>{lang === "fr" ? "Droit à la portabilité de vos données" : lang === "en" ? "Right to data portability" : "نقل بياناتك"}</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  {lang === "fr"
                    ? "Pour exercer ces droits, vous pouvez nous contacter à l'adresse : info@cpa.ma"
                    : lang === "en"
                    ? "To exercise these rights, you can contact us at: info@cpa.ma"
                    : "لممارسة هذه الحقوق، يمكنك الاتصال بنا على: info@cpa.ma"
                  }
                </p>
              </div>

              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  {lang === "fr" ? "Cookies" : lang === "en" ? "Cookies" : "ملفات تعريف الارتباط"}
                </h2>
                <p className="text-muted-foreground">
                  {lang === "fr"
                    ? "Notre site utilise des cookies pour améliorer votre expérience de navigation. Vous pouvez configurer votre navigateur pour refuser tous les cookies ou pour être alerté lorsqu'un cookie est envoyé."
                    : lang === "en"
                    ? "Our website uses cookies to improve your browsing experience. You can configure your browser to refuse all cookies or to be alerted when a cookie is sent."
                    : "يستخدم موقعنا ملفات تعريف الارتباط لتحسين تجربة التصفح الخاصة بك. يمكنك تكوين متصفحك لرفض جميع ملفات تعريف الارتباط أو للتنبيه عند إرسال ملف تعريف ارتباط."
                  }
                </p>
              </div>

              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  {lang === "fr" ? "Contact" : lang === "en" ? "Contact" : "اتصل بنا"}
                </h2>
                <p className="text-muted-foreground">
                  {lang === "fr"
                    ? "Pour toute question concernant notre politique de confidentialité, vous pouvez nous contacter à l'adresse email suivante : info@cpa.ma ou par téléphone au +212 5 22 95 39 00."
                    : lang === "en"
                    ? "For any questions regarding our privacy policy, you can contact us at: info@cpa.ma or by phone at +212 5 22 95 39 00."
                    : "لأي أسئلة تتعلق بسياسة الخصوصية الخاصة بنا، يمكنك الاتصال بنا على: info@cpa.ma أو عبر الهاتف على +212 5 22 95 39 00."
                  }
                </p>
              </div>

              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  {lang === "fr" ? "Mise à jour" : lang === "en" ? "Update" : "تحديث"}
                </h2>
                <p className="text-muted-foreground">
                  {lang === "fr"
                    ? "Cette politique de confidentialité peut être modifiée à tout moment. En cas de modification substantielle, nous vous en informerons par le biais d'un avis sur notre site web."
                    : lang === "en"
                    ? "This privacy policy may be modified at any time. In case of substantial modification, we will inform you through a notice on our website."
                    : "قد يتم تعديل سياسة الخصوصية هذه في أي وقت. في حالة وجود تعديل جوهري، سنعلمك من خلال إشعار على موقعنا على الويب."
                  }
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
};

export default PolitiqueConfidentialitePage;
