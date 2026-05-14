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
              {lang === "fr" ? "Mentions Légales & Politique de Confidentialité" : lang === "en" ? "Legal Notice & Privacy Policy" : lang === "es" ? "Aviso Legal y Política de Privacidad" : "الإشعارات القانونية وسياسة الخصوصية"}
            </h1>
            
            <div className="prose prose-lg max-w-none space-y-6 text-foreground">
              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  {lang === "fr" ? "Informations légales" : lang === "en" ? "Legal Information" : lang === "es" ? "Información Legal" : "المعلومات القانونية"}
                </h2>
                
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong>{lang === "fr" ? "Dénomination sociale" : lang === "en" ? "Company name" : lang === "es" ? "Razón social" : "التسمية الاجتماعية"}:</strong> CPA - Conseil et Placement d'Assurances
                  </p>
                  <p>
                    <strong>{lang === "fr" ? "Forme juridique" : lang === "en" ? "Legal form" : lang === "es" ? "Forma jurídica" : "الشكل القانوني"}:</strong> S.A.
                  </p>
                  <p>
                    <strong>{lang === "fr" ? "Capital social" : lang === "en" ? "Share capital" : lang === "es" ? "Capital social" : "رأس المال"}:</strong> 5 000 000 DH
                  </p>
                  <p>
                    <strong>{lang === "fr" ? "Siège social" : lang === "en" ? "Headquarters" : lang === "es" ? "Sede social" : "المقر الاجتماعي"}:</strong> Angle Boulevard Moulay Youssef et Boulevard Ziraoui, Complexe Moulay Youssef Work Center, 2ème Étage, Casablanca, Maroc
                  </p>
                  <p>
                    <strong>{lang === "fr" ? "Numéro RC" : lang === "en" ? "RC Number" : lang === "es" ? "Número RC" : "رقم السجل التجاري"}:</strong> 25601
                  </p>
                  <p>
                    <strong>{lang === "fr" ? "ICE" : lang === "en" ? "ICE" : lang === "es" ? "ICE" : "الرقم التعريفي"}:</strong> 001518917000065
                  </p>
                  <p>
                    <strong>{lang === "fr" ? "Téléphone" : lang === "en" ? "Phone" : lang === "es" ? "Teléfono" : "الهاتف"}:</strong> +212 5 22 95 39 00
                  </p>
                  <p>
                    <strong>Email:</strong> info@cpa.ma
                  </p>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  {lang === "fr" ? "Directeur de la publication" : lang === "en" ? "Publication Director" : lang === "es" ? "Director de Publicación" : "مدير النشر"}
                </h2>
                <p className="text-muted-foreground">
                  {lang === "fr" 
                    ? "Le directeur de la publication est M. Jalal Ennouni, Directeur Général de CPA."
                    : lang === "en" 
                    ? "The publication director is Mr. Jalal Ennouni, General Manager of CPA."
                    : lang === "es"
                    ? "El director de publicación es el Sr. Jalal Ennouni, Director General de CPA."
                    : "مدير النشر هو السيد جلّال النّائحي، المدير العام لشركة سي بي إيه."
                  }
                </p>
              </div>

              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  {lang === "fr" ? "Hébergement" : lang === "en" ? "Hosting" : lang === "es" ? "Alojamiento" : "الاستضافة"}
                </h2>
                <p className="text-muted-foreground">
                {
     lang === "fr"
    ? "Ce site ainsi que l’ensemble des données et informations associées sont hébergés et stockés au Maroc sur des infrastructures sécurisées conformes aux exigences de protection des données."
    : lang === "en"
    ? "This website, including all associated data and information, is hosted and stored in Morocco on secure infrastructures compliant with data protection requirements."
    : lang === "es"
    ? "Este sitio web, así como todos los datos e informaciones asociados, están alojados y almacenados en Marruecos sobre infraestructuras seguras conformes a los requisitos de protección de datos."
    : "يتم استضافة هذا الموقع وجميع البيانات والمعلومات المرتبطة به داخل المغرب على بنية تحتية آمنة ومتوافقة مع متطلبات حماية المعطيات الشخصية."
}
                </p>
              </div>

              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  {lang === "fr" ? "Propriété intellectuelle" : lang === "en" ? "Intellectual Property" : lang === "es" ? "Propiedad Intelectual" : "الملكية الفكرية"}
                </h2>
                <p className="text-muted-foreground">
                  {lang === "fr"
                    ? "L'ensemble des contenus présents sur ce site (textes, images, logos, vidéos, sons, logiciels, etc.) est protégé par le droit d'auteur et le droit de la propriété intellectuelle. Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site est interdite sans autorisation écrite préalable de CPA."
                    : lang === "en"
                    ? "All content present on this website (texts, images, logos, videos, sounds, software, etc.) is protected by copyright and intellectual property rights. Any reproduction, representation, modification, publication or adaptation of all or part of the elements of the site is prohibited without prior written authorization from CPA."
                    : lang === "es"
                    ? "Todo el contenido presente en este sitio web (textos, imágenes, logotipos, vídeos, sonidos, software, etc.) está protegido por los derechos de autor y los derechos de propiedad intelectual. Cualquier reproducción, representación, modificación, publicación o adaptación de todo o parte de los elementos del sitio está prohibida sin la autorización escrita previa de CPA."
                    : "جميع المحتويات الموجودة على هذا الموقع (النصوص والصور والشعارات ومقاطع الفيديو والأصوات والبرمجيات وما إلى ذلك) محمية بموجب حقوق التأليف والنشر وحقوق الملكية الفكرية. يُحظر أي نسخ أو تمثيل أو تعديل أو نشر أو تكييف لأي جزء من عناصر الموقع دون الحصول على إذن كتابي مسبق من CPA."
                  }
                </p>
              </div>

              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  {lang === "fr" ? "Responsabilité" : lang === "en" ? "Liability" : lang === "es" ? "Responsabilidad" : "المسؤولية"}
                </h2>
                <p className="text-muted-foreground">
                  {lang === "fr"
                    ? "CPA s'efforce de fournir des informations aussi précises que possible. Toutefois, CPA ne pourra être tenue responsable des omissions, des inexactitudes et des carences dans la mise à jour, qu'elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations."
                    : lang === "en"
                    ? "CPA endeavors to provide information that is as accurate as possible. However, CPA cannot be held responsible for omissions, inaccuracies, and deficiencies in updating, whether caused by itself or by third-party partners who provide this information."
                    : lang === "es"
                    ? "CPA se esforzará por proporcionar información lo más precisa posible. Sin embargo, CPA no se hará responsable de las omisiones, inexactitudes y deficiencias en la actualización, ya sea por su parte o por parte de los socios terceros que le proporcionan esta información."
                    : "تسعى CPA جاهدة لتوفير معلومات دقيقة قدر الإمكان. ومع ذلك، لا يمكن تحميل CPA مسؤولية أي سهو أو عدم دقة أو نقص في التحديث، سواء كان ناتجًا عن نفسها أو عن الأطراف الثالثة الشريكة التي توفر هذه المعلومات."
                  }
                </p>
              </div>

              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  {lang === "fr" ? "Liens hypertextes" : lang === "en" ? "Hypertext Links" : lang === "es" ? "Enlaces Hipervínculos" : "الروابط التشعبية"}
                </h2>
                <p className="text-muted-foreground">
                  {lang === "fr"
                    ? "Le site peut contenir des liens hypertextes vers d'autres sites. CPA n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu."
                    : lang === "en"
                    ? "The site may contain hypertext links to other sites. CPA exercises no control over these sites and disclaims any responsibility for their content."
                    : lang === "es"
                    ? "El sitio puede contener enlaces hipervínculos a otros sitios. CPA no ejerce ningún control sobre estos sitios y declina cualquier responsabilidad con respecto a su contenido."
                    : "قد يحتوي الموقع على روابط تشعبية لمواقع أخرى. لا تمارس CPA أي رقابة على هذه المواقع وتتحمل أي مسؤولية فيما يتعلق بمحتواها."
                  }
                </p>
              </div>

              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  {lang === "fr" ? "Politique de Confidentialité" : lang === "en" ? "Privacy Policy" : lang === "es" ? "Política de Privacidad" : "سياسة الخصوصية"}
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      {lang === "fr" ? "Introduction" : lang === "en" ? "Introduction" : lang === "es" ? "Introducción" : "المقدمة"}
                    </h3>
                    <p>
                      {lang === "fr"
                        ? "La présente politique de confidentialité décrit comment CPA collecte, utilise et protège vos données personnelles conformément à la réglementation marocaine en matière de protection des données personnelles (Loi 09-08)."
                        : lang === "en"
                        ? "This privacy policy describes how CPA collects, uses and protects your personal data in accordance with Moroccan regulations on personal data protection (Law 09-08)."
                        : lang === "es"
                        ? "Esta política de privacidad describe cómo CPA recopila, usa y protege sus datos personales de acuerdo con las regulaciones marroquíes sobre protección de datos personales (Ley 09-08)."
                        : "تصف سياسة الخصوصية هذه كيفية قيام CPA بجمع واستخدام وحماية بياناتك الشخصية وفقًا للوائح المغربية لحماية البيانات الشخصية (القانون 09-08)."
                      }
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      {lang === "fr" ? "Collecte des données personnelles" : lang === "en" ? "Collection of Personal Data" : lang === "es" ? "Recopilación de Datos Personales" : "جمع البيانات الشخصية"}
                    </h3>
                    <p>
                      {lang === "fr"
                        ? "CPA collecte les données personnelles suivantes :"
                        : lang === "en"
                        ? "CPA collects the following personal data:"
                        : lang === "es"
                        ? "CPA recopila los siguientes datos personales:"
                        : "تجمع CPA البيانات الشخصية التالية:"
                      }
                    </p>
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                      <li>{lang === "fr" ? "Nom et prénom" : lang === "en" ? "First and last name" : lang === "es" ? "Nombre y apellido" : "الاسم واللقب"}</li>
                      <li>{lang === "fr" ? "Adresse email" : lang === "en" ? "Email address" : lang === "es" ? "Correo electrónico" : "البريد الإلكتروني"}</li>
                      <li>{lang === "fr" ? "Numéro de téléphone" : lang === "en" ? "Phone number" : lang === "es" ? "Número de teléfono" : "رقم الهاتف"}</li>
                      <li>{lang === "fr" ? "Adresse postale" : lang === "en" ? "Mailing address" : lang === "es" ? "Dirección postal" : "العنوان البريدي"}</li>
                      <li>{lang === "fr" ? "Informations relatives à votre demande d'assurance" : lang === "en" ? "Information related to your insurance request" : lang === "es" ? "Información relacionada con su solicitud de seguro" : "المعلومات المتعلقة بطلب التأمين الخاص بك"}</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      {lang === "fr" ? "Utilisation des données" : lang === "en" ? "Use of Data" : lang === "es" ? "Uso de los Datos" : "استخدام البيانات"}
                    </h3>
                    <p>
                      {lang === "fr"
                        ? "Vos données personnelles sont utilisées pour :"
                        : lang === "en"
                        ? "Your personal data is used to:"
                        : lang === "es"
                        ? "Sus datos personales se utilizan para:"
                        : "تستخدم بياناتك الشخصية لـ:"
                      }
                    </p>
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                      <li>{lang === "fr" ? "Répondre à vos demandes de devis" : lang === "en" ? "Respond to your quote requests" : lang === "es" ? "Responder a sus solicitudes de cotización" : "الرد على طلبات العرض الخاصة بك"}</li>
                      <li>{lang === "fr" ? "Vous contacter dans le cadre de votre dossier d'assurance" : lang === "en" ? "Contact you regarding your insurance file" : lang === "es" ? "Contactarlo en el marco de su dossier de seguro" : "التواصل معك بخصوص ملف التأمين الخاص بك"}</li>
                      <li>{lang === "fr" ? "Vous envoyer des informations sur nos produits et services" : lang === "en" ? "Send you information about our products and services" : lang === "es" ? "Enviarle información sobre nuestros productos y servicios" : "إرسال معلومات حول منتجاتنا وخدماتنا"}</li>
                      <li>{lang === "fr" ? "Améliorer notre site web et nos services" : lang === "en" ? "Improve our website and services" : lang === "es" ? "Mejorar nuestro sitio web y servicios" : "تحسين موقعنا وخدماتنا"}</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      {lang === "fr" ? "Protection des données" : lang === "en" ? "Data Protection" : lang === "es" ? "Protección de Datos" : "حماية البيانات"}
                    </h3>
                    <p>
                      {lang === "fr"
                        ? "CPA met en œuvre toutes les mesures techniques et organisationnelles nécessaires pour protéger vos données personnelles contre tout accès non autorisé, toute modification, divulgation ou destruction. Nous utilisons des protocoles de sécurité avancés pour garantir la confidentialité de vos informations."
                        : lang === "en"
                        ? "CPA implements all necessary technical and organizational measures to protect your personal data against any unauthorized access, modification, disclosure or destruction. We use advanced security protocols to guarantee the confidentiality of your information."
                        : lang === "es"
                        ? "CPA implementa todas las medidas técnicas y organizativas necesarias para proteger sus datos personales contra cualquier acceso no autorizado, modificación, divulgación o destrucción. Utilizamos protocolos de seguridad avanzados para garantizar la confidencialidad de su información."
                        : "تنفذ CPA جميع التدابير التقنية والتنظيمية اللازمة لحماية بياناتك الشخصية من أي وصول غير مصرح به أو تعديل أو إفشاء أو تدمير. نستخدم بروتوكولات أمان متقدمة لضمان سرية معلوماتك."
                      }
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      {lang === "fr" ? "Conservation des données" : lang === "en" ? "Data Retention" : lang === "es" ? "Conservación de Datos" : "الاحتفاظ بالبيانات"}
                    </h3>
                    <p>
                    {
  lang === "fr"
    ? "Vos données personnelles sont conservées pendant une durée maximale de 12 mois, dans le respect de la réglementation applicable relative à la protection des données. Vous pouvez à tout moment demander la suppression ou la modification de vos informations en nous contactant à l’adresse suivante : info@cpa.ma."
    : lang === "en"
    ? "Your personal data is retained for a maximum period of 12 months in compliance with applicable data protection regulations. You may request the deletion or modification of your information at any time by contacting us at: info@cpa.ma."
    : lang === "es"
    ? "Sus datos personales se conservan durante un período máximo de 12 meses, de conformidad con la normativa aplicable en materia de protección de datos. Puede solicitar la eliminación o modificación de su información en cualquier momento contactándonos en: info@cpa.ma."
    : "يتم الاحتفاظ ببياناتكم الشخصية لمدة أقصاها 12 شهرًا وفقًا للتشريعات المعمول بها المتعلقة بحماية المعطيات الشخصية. ويمكنكم في أي وقت طلب حذف أو تعديل معلوماتكم عبر التواصل معنا على البريد الإلكتروني التالي: info@cpa.ma."
}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      {lang === "fr" ? "Vos droits" : lang === "en" ? "Your Rights" : lang === "es" ? "Sus Derechos" : "حقوقك"}
                    </h3>
                    <p>
                      {lang === "fr"
                        ? "Conformément à la réglementation en vigueur, vous disposez des droits suivants :"
                        : lang === "en"
                        ? "In accordance with current regulations, you have the following rights:"
                        : lang === "es"
                        ? "De conformidad con la normativa vigente, usted tiene los siguientes derechos:"
                        : "وفقًا للوائح المعمول بها، لديك الحقوق التالية:"
                      }
                    </p>
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                      <li>{lang === "fr" ? "Droit d'accès à vos données personnelles" : lang === "en" ? "Right to access your personal data" : lang === "es" ? "Derecho a acceder a sus datos personales" : "الحق في الوصول إلى بياناتك الشخصية"}</li>
                      <li>{lang === "fr" ? "Droit de rectification de vos données" : lang === "en" ? "Right to rectification of your data" : lang === "es" ? "Derecho a rectificación de sus datos" : "الحق في تصحيح بياناتك"}</li>
                      <li>{lang === "fr" ? "Droit à l'effacement de vos données" : lang === "en" ? "Right to erasure of your data" : lang === "es" ? "Derecho a supresión de sus datos" : "الحق في محو بياناتك"}</li>
                      <li>{lang === "fr" ? "Droit d'opposition au traitement de vos données" : lang === "en" ? "Right to object to the processing of your data" : lang === "es" ? "Derecho de oposición al tratamiento de sus datos" : "الحق في الاعتراض على معالجة بياناتك"}</li>
                      <li>{lang === "fr" ? "Droit à la portabilité de vos données" : lang === "en" ? "Right to data portability" : lang === "es" ? "Derecho a la portabilidad de sus datos" : "الحق في نقل بياناتك"}</li>
                    </ul>
                    <p className="mt-2">
                      {lang === "fr"
                        ? "Pour exercer ces droits, vous pouvez nous contacter à l'adresse :"
                        : lang === "en"
                        ? "To exercise these rights, you can contact us at:"
                        : lang === "es"
                        ? "Para ejercer estos derechos, puede contactarnos en:"
                        : "لممارسة هذه الحقوق، يمكنك الاتصال بنا على:"
                      } <a href="mailto:info@cpa.ma" className="text-primary hover:underline">info@cpa.ma</a>
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      {lang === "fr" ? "Cookies" : lang === "en" ? "Cookies" : lang === "es" ? "Cookies" : "ملفات تعريف الارتباط"}
                    </h3>
                    <p>
                      {lang === "fr"
                        ? "Notre site utilise des cookies pour améliorer votre expérience de navigation. Vous pouvez configurer votre navigateur pour refuser tous les cookies ou pour être alerté lorsqu'un cookie est envoyé."
                        : lang === "en"
                        ? "Our site uses cookies to improve your browsing experience. You can configure your browser to refuse all cookies or to be alerted when a cookie is sent."
                        : lang === "es"
                        ? "Nuestro sitio utiliza cookies para mejorar su experiencia de navegación. Puede configurar su navegador para rechazar todas las cookies o para ser alertado cuando se envíe una cookie."
                        : "يستخدم موقعنا ملفات تعريف الارتباط لتحسين تجربة التصفح الخاصة بك. يمكنك تكوين متصفحك لرفض جميع ملفات تعريف الارتباط أو لتنبيهك عند إرسال ملف تعريف ارتباط."
                      }
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      {lang === "fr" ? "Contact" : lang === "en" ? "Contact" : lang === "es" ? "Contacto" : "اتصل بنا"}
                    </h3>
                    <p>
                      {lang === "fr"
                        ? "Pour toute question concernant notre politique de confidentialité, vous pouvez nous contacter à l'adresse email suivante :"
                        : lang === "en"
                        ? "For any questions regarding our privacy policy, you can contact us at the following email address:"
                        : lang === "es"
                        ? "Para cualquier pregunta sobre nuestra política de privacidad, puede contactarnos en la siguiente dirección de correo electrónico:"
                        : "لأي سؤال بخصوص سياسة الخصوصية الخاصة بنا، يمكنك الاتصال بنا على عنوان البريد الإلكتروني التالي:"
                      } <a href="mailto:info@cpa.ma" className="text-primary hover:underline">info@cpa.ma</a> {lang === "fr" ? "ou par téléphone au" : lang === "en" ? "or by phone at" : lang === "es" ? "o por teléfono al" : "أو عبر الهاتف على"} <a href="tel: +212 5 22 95 39 00" className="text-primary hover:underline"> +212 5 22 95 39 00 </a>.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      {lang === "fr" ? "Mise à jour" : lang === "en" ? "Update" : lang === "es" ? "Actualización" : "التحديث"}
                    </h3>
                    <p>
                      {lang === "fr"
                        ? "Cette politique de confidentialité peut être modifiée à tout moment. En cas de modification substantielle, nous vous en informerons par le biais d'un avis sur notre site web."
                        : lang === "en"
                        ? "This privacy policy may be modified at any time. In case of substantial modification, we will inform you through a notice on our website."
                        : lang === "es"
                        ? "Esta política de privacidad puede ser modificada en cualquier momento. En caso de modificación sustancial, le informaremos a través de un aviso en nuestro sitio web."
                        : "يمكن تعديل سياسة الخصوصية هذه في أي وقت. في حالة وجود تعديل جوهري، سنعلمك من خلال إشعار على موقعنا على الويب."
                      }
                    </p>
                  </div>
                </div>
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
