import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";

const MentionsLegalesPage = () => {
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
              {lang === "fr" ? "Mentions Légales" : lang === "en" ? "Legal Notice" : "الإشعارات القانونية"}
            </h1>
            
            <div className="prose prose-lg max-w-none space-y-6 text-foreground">
              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  {lang === "fr" ? "Informations légales" : lang === "en" ? "Legal Information" : "المعلومات القانونية"}
                </h2>
                
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong>{lang === "fr" ? "Dénomination sociale" : lang === "en" ? "Company name" : "التسمية الاجتماعية"}:</strong> CPA - Conseil et Placement d'Assurances
                  </p>
                  <p>
                    <strong>{lang === "fr" ? "Forme juridique" : lang === "en" ? "Legal form" : "الشكل القانوني"}:</strong> S.A.
                  </p>
                  <p>
                    <strong>{lang === "fr" ? "Capital social" : lang === "en" ? "Share capital" : "رأس المال"}:</strong> 10 000 000 DH
                  </p>
                  <p>
                    <strong>{lang === "fr" ? "Siège social" : lang === "en" ? "Headquarters" : "المقر الاجتماعي"}:</strong> Angle Boulevard Moulay Youssef et Boulevard Ziraoui, Complexe Moulay Youssef Work Center, 2ème Étage, Casablanca, Maroc
                  </p>
                  <p>
                    <strong>{lang === "fr" ? "Numéro RC" : lang === "en" ? "RC Number" : "رقم السجل التجاري"}:</strong> 123456
                  </p>
                  <p>
                    <strong>{lang === "fr" ? "ICE" : lang === "en" ? "ICE" : "الرقم التعريفي"}:</strong> 000123456789
                  </p>
                  <p>
                    <strong>{lang === "fr" ? "Téléphone" : lang === "en" ? "Phone" : "الهاتف"}:</strong> +212 5 22 95 39 00
                  </p>
                  <p>
                    <strong>Email:</strong> info@cpa.ma
                  </p>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  {lang === "fr" ? "Directeur de la publication" : lang === "en" ? "Publication Director" : "مدير النشر"}
                </h2>
                <p className="text-muted-foreground">
                  {lang === "fr" 
                    ? "Le directeur de la publication est M. Imad BERRADA, Directeur Général de CPA."
                    : lang === "en" 
                    ? "The publication director is Mr. Imad BERRADA, General Manager of CPA."
                    : "مدير النشر هو السيد عماد بريدا، المدير العام لشركة سي بي إيه."
                  }
                </p>
              </div>

              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  {lang === "fr" ? "Hébergement" : lang === "en" ? "Hosting" : "الاستضافة"}
                </h2>
                <p className="text-muted-foreground">
                  {lang === "fr"
                    ? "Ce site est hébergé par [Nom de l'hébergeur], [Adresse], [Code postal, Ville], [Pays]."
                    : lang === "en"
                    ? "This website is hosted by [Hosting provider name], [Address], [Postal code, City], [Country]."
                    : "هذا الموقع مستضاف بواسطة [اسم المستضيف]، [العنوان]، [الرمز البريدي، المدينة]، [البلد]."
                  }
                </p>
              </div>

              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  {lang === "fr" ? "Propriété intellectuelle" : lang === "en" ? "Intellectual Property" : "الملكية الفكرية"}
                </h2>
                <p className="text-muted-foreground">
                  {lang === "fr"
                    ? "L'ensemble des contenus présents sur ce site (textes, images, logos, vidéos, sons, logiciels, etc.) est protégé par le droit d'auteur et le droit de la propriété intellectuelle. Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site est interdite sans autorisation écrite préalable de CPA."
                    : lang === "en"
                    ? "All content present on this website (texts, images, logos, videos, sounds, software, etc.) is protected by copyright and intellectual property rights. Any reproduction, representation, modification, publication or adaptation of all or part of the elements of the site is prohibited without prior written authorization from CPA."
                    : "جميع المحتويات الموجودة على هذا الموقع (النصوص والصور والشعارات ومقاطع الفيديو والأصوات والبرمجيات وما إلى ذلك) محمية بموجب حقوق التأليف والنشر وحقوق الملكية الفكرية. يُحظر أي نسخ أو تمثيل أو تعديل أو نشر أو تكييف لأي جزء من عناصر الموقع دون الحصول على إذن كتابي مسبق من CPA."
                  }
                </p>
              </div>

              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  {lang === "fr" ? "Responsabilité" : lang === "en" ? "Liability" : "المسؤولية"}
                </h2>
                <p className="text-muted-foreground">
                  {lang === "fr"
                    ? "CPA s'efforce de fournir des informations aussi précises que possible. Toutefois, CPA ne pourra être tenue responsable des omissions, des inexactitudes et des carences dans la mise à jour, qu'elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations."
                    : lang === "en"
                    ? "CPA endeavors to provide information that is as accurate as possible. However, CPA cannot be held responsible for omissions, inaccuracies, and deficiencies in updating, whether caused by itself or by third-party partners who provide this information."
                    : "تسعى CPA جاهدة لتوفير معلومات دقيقة قدر الإمكان. ومع ذلك، لا يمكن تحميل CPA مسؤولية أي سهو أو عدم دقة أو نقص في التحديث، سواء كان ناتجًا عن نفسها أو عن الأطراف الثالثة الشريكة التي توفر هذه المعلومات."
                  }
                </p>
              </div>

              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  {lang === "fr" ? "Liens hypertextes" : lang === "en" ? "Hypertext Links" : "الروابط التشعبية"}
                </h2>
                <p className="text-muted-foreground">
                  {lang === "fr"
                    ? "Le site peut contenir des liens hypertextes vers d'autres sites. CPA n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu."
                    : lang === "en"
                    ? "The site may contain hypertext links to other sites. CPA exercises no control over these sites and disclaims any responsibility for their content."
                    : "قد يحتوي الموقع على روابط تشعبية لمواقع أخرى. لا تمارس CPA أي رقابة على هذه المواقع وتتحمل أي مسؤولية فيما يتعلق بمحتواها."
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

export default MentionsLegalesPage;
