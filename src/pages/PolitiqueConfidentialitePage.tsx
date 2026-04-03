import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { Shield, Lock, FileText, AlertCircle, Globe, UserCheck, Database, Scale } from "lucide-react";

const PolitiqueConfidentialitePage = () => {
  const { lang } = useLanguage();

  const isRTL = lang === "ar";

  const content = {
    // Page Title
    title: {
      fr: "Politique de Protection des Données",
      en: "Data Protection Policy",
      ar: "سياسة حماية البيانات",
      es: "Política de Protección de Datos",
    },
    subtitle: {
      fr: "Protection de vos données personnelles - Conformité RGPD & International",
      en: "Protecting Your Personal Data - GDPR & International Compliance",
      ar: "حماية بياناتك الشخصية - الامتثال لـ GDPR والدولي",
      es: "Protección de Sus Datos Personales - Cumplimiento GDPR e Internacional",
    },
    lastUpdate: {
      fr: "Dernière mise à jour",
      en: "Last updated",
      ar: "آخر تحديث",
      es: "Última actualización",
    },
    
    // Regulatory Framework
    regulatory: {
      title: {
        fr: "Cadre Réglementaire",
        en: "Regulatory Framework",
        ar: "الإطار التنظيمي",
        es: "Marco Regulatorio",
      },
      content: {
        fr: "Cette politique de confidentialité est conçue pour assurer la conformité avec les principales réglementations internationales en matière de protection des données, notamment :",
        en: "This privacy policy is designed to ensure compliance with major international data protection regulations, including:",
        ar: "تم تصميم سياسة الخصوصية هذه لضمان الامتثال للوائح حماية البيانات الدولية الرئيسية، بما في ذلك:",
        es: "Esta política de privacidad está diseñada para garantizar el cumplimiento con las principales regulaciones internacionales de protección de datos, incluyendo:",
      },
      regulations: {
        fr: [
          "Règlement Général sur la Protection des Données (RGPD) - Union Européenne",
          "Loi n° 09-08 relative à la protection des personnes physiques - Maroc",
          "California Consumer Privacy Act (CCPA) / California Privacy Rights Act (CPRA) - États-Unis",
          "Personal Information Protection Law (PIPL) - Chine",
          "Lei Geral de Proteção de Dados (LGPD) - Brésil",
          "Data Protection Act 2018 - Royaume-Uni",
          "Protection of Personal Information Act (POPIA) - Afrique du Sud",
        ],
        en: [
          "General Data Protection Regulation (GDPR) - European Union",
          "Law No. 09-08 on the protection of individuals - Morocco",
          "California Consumer Privacy Act (CCPA) / California Privacy Rights Act (CPRA) - United States",
          "Personal Information Protection Law (PIPL) - China",
          "Lei Geral de Proteção de Dados (LGPD) - Brazil",
          "Data Protection Act 2018 - United Kingdom",
          "Protection of Personal Information Act (POPIA) - South Africa",
        ],
        ar: [
          "اللائحة العامة لحماية البيانات (GDPR) - الاتحاد الأوروبي",
          "القانون رقم 09-08 المتعلق بحماية الأشخاص الطبيعيين - المغرب",
          "قانون خصوصية المستهلك في كاليفورنيا (CCPA) / قانون حقوق الخصوصية في كاليفورنيا (CPRA) - الولايات المتحدة",
          "قانون حماية المعلومات الشخصية (PIPL) - الصين",
          "قانون الحماية العامة للبيانات (LGPD) - البرازيل",
          "قانون حماية البيانات 2018 - المملكة المتحدة",
          "قانون حماية المعلومات الشخصية (POPIA) - جنوب أفريقيا",
        ],
        es: [
          "Reglamento General de Protección de Datos (RGPD) - Unión Europea",
          "Ley N° 09-08 relativa a la protección de personas físicas - Marruecos",
          "Ley de Privacidad del Consumidor de California (CCPA) / Ley de Derechos de Privacidad de California (CPRA) - Estados Unidos",
          "Ley de Protección de Información Personal (PIPL) - China",
          "Lei Geral de Proteção de Dados (LGPD) - Brasil",
          "Ley de Protección de Datos 2018 - Reino Unido",
          "Ley de Protección de Información Personal (POPIA) - Sudáfrica",
        ],
      },
    },
    
    // Sections
    introduction: {
      title: {
        fr: "1. Introduction",
        en: "1. Introduction",
        ar: "1. المقدمة",
        es: "1. Introducción",
      },
      content: {
        fr: "La présente politique de confidentialité décrit comment CPA - Conseil et Placement d'Assurances (\"CPA\", \"nous\", \"notre\") collecte, utilise, traite et protège vos données personnelles conformément à la réglementation marocaine en matière de protection des données, notamment la Loi n° 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel. En utilisant notre site web et nos services, vous acceptez les pratiques décrites dans cette politique.",
        en: "This privacy policy describes how CPA - Conseil et Placement d'Assurances (\"CPA\", \"we\", \"our\") collects, uses, processes and protects your personal data in accordance with Moroccan data protection regulations, particularly Law No. 09-08 on the protection of individuals with regard to the processing of personal data. By using our website and services, you accept the practices described in this policy.",
        ar: "تصف سياسة الخصوصية هذه كيفية قيام CPA - Conseil et Placement d'Assurances (\"CPA\"، \"نحن\"، \"لنا\") بجمع واستخدام ومعالجة وحماية بياناتك الشخصية وفقًا للوائح المغربية لحماية البيانات، ولا سيما القانون رقم 09-08 المتعلق بحماية الأشخاص الطبيعيين فيما يتعلق بمعالجة البيانات ذات الطابع الشخصي. باستخدامك لموقعنا الإلكتروني وخدماتنا، فإنك تقبل الممارسات الموصوفة في هذه السياسة.",
        es: "Esta política de privacidad describe cómo CPA - Conseil et Placement d'Assurances (\"CPA\", \"nosotros\", \"nuestro\") recopila, usa, procesa y protege sus datos personales de acuerdo con las regulaciones marroquíes de protección de datos, particularmente la Ley N° 09-08 relativa a la protección de personas físicas con respecto al tratamiento de datos personales. Al usar nuestro sitio web y servicios, acepta las prácticas descritas en esta política.",
      },
    },

    dataController: {
      title: {
        fr: "2. Responsable du Traitement",
        en: "2. Data Controller",
        ar: "2. مسؤول المعالجة",
        es: "2. Responsable del Tratamiento",
      },
      content: {
        fr: "Le responsable du traitement de vos données personnelles est :",
        en: "The data controller for your personal data is:",
        ar: "مسؤول معالجة بياناتك الشخصية هو:",
        es: "El responsable del tratamiento de sus datos personales es:",
      },
      details: {
        fr: "CPA - Conseil et Placement d'Assurances\nS.A. au capital de 5 000 000 DH\nAngle Boulevard Moulay Youssef et Boulevard Ziraoui\nComplexe Moulay Youssef Work Center, 2ème Étage\nCasablanca, Maroc\n\nTéléphone : +212 5 22 95 39 00\nEmail : info@cpa.ma",
        en: "CPA - Conseil et Placement d'Assurances\nS.A. with capital of 5,000,000 DH\nAngle Boulevard Moulay Youssef and Boulevard Ziraoui\nComplexe Moulay Youssef Work Center, 2nd Floor\nCasablanca, Morocco\n\nPhone: +212 5 22 95 39 00\nEmail: info@cpa.ma",
        ar: "CPA - Conseil et Placement d'Assurances\nشركة مجهولة الاسم برأس مال 5,000,000 درهم\nزاوية شارع الملك يوسف وشارع زراوي\nمجمع العمل مركز الملك يوسف، الطابق الثاني\nالدار البيضاء، المغرب\n\nالهاتف: 212 5 22 95 39 00+\nالبريد الإلكتروني: info@cpa.ma",
        es: "CPA - Conseil et Placement d'Assurances\nS.A. con capital de 5.000.000 DH\nEsquina Boulevard Moulay Youssef y Boulevard Ziraoui\nComplejo Moulay Youssef Work Center, 2º Planta\nCasablanca, Marruecos\n\nTeléfono: +212 5 22 95 39 00\nEmail: info@cpa.ma",
      },
    },
    
    dataProtectionOfficer: {
      title: {
        fr: "2.1 Délégué à la Protection des Données (DPO)",
        en: "2.1 Data Protection Officer (DPO)",
        ar: "2.1 مسؤول حماية البيانات (DPO)",
        es: "2.1 Delegado de Protección de Datos (DPO)",
      },
      content: {
        fr: "Nous avons désigné un Délégué à la Protection des Données (DPO) pour superviser la conformité de notre organisation aux réglementations en matière de protection des données. Le DPO est votre point de contact principal pour toutes les questions relatives à vos droits en matière de protection des données.",
        en: "We have appointed a Data Protection Officer (DPO) to oversee our organization's compliance with data protection regulations. The DPO is your primary contact for all matters relating to your data protection rights.",
        ar: "لقد عينا مسؤول حماية البيانات (DPO) للإشراف على امتثال منظمتنا للوائح حماية البيانات. DPO هو جهة الاتصال الرئيسية الخاصة بك لجميع الأمور المتعلقة بحقوقك في حماية البيانات.",
        es: "Hemos designado un Oficial de Protección de Datos (DPO) para supervisar el cumplimiento de nuestra organización con las regulaciones de protección de datos. El DPO es su contacto principal para todos los asuntos relacionados con sus derechos de protección de datos.",
      },
      contact: {
        fr: "Coordonnées du DPO :",
        en: "DPO Contact Information:",
        ar: "معلومات الاتصال بـ DPO:",
        es: "Información de contacto del DPO:",
      },
       
      note: {
        fr: "Le DPO peut être contacté pour toute question concernant le traitement de vos données ou l'exercice de vos droits.",
        en: "The DPO can be contacted for any questions regarding the processing of your data or the exercise of your rights.",
        ar: "يمكن الاتصال بـ DPO لأي سؤال يتعلق بمعالجة بياناتك أو ممارسة حقوقك.",
        es: "El DPO puede ser contactado para cualquier pregunta sobre el procesamiento de sus datos o el ejercicio de sus derechos.",
      },
    },

    dataCollection: {
      title: {
        fr: "3. Données Collectées",
        en: "3. Data We Collect",
        ar: "3. البيانات التي نجمعها",
        es: "3. Datos Recopilados",
      },
      subtitle: {
        fr: "3.1 Données personnelles que vous nous fournissez",
        en: "3.1 Personal data you provide to us",
        ar: "3.1 البيانات الشخصية التي تقدمها لنا",
        es: "3.1 Datos personales que nos proporciona",
      },
      personalData: {
        fr: "Lorsque vous utilisez nos services ou interagissez avec notre site web, nous pouvons collecter les données personnelles suivantes :",
        en: "When you use our services or interact with our website, we may collect the following personal data:",
        ar: "عند استخدامك لخدماتنا أو تفاعلك مع موقعنا الإلكتروني، قد نجمع البيانات الشخصية التالية:",
        es: "Cuando utiliza nuestros servicios o interactúa con nuestro sitio web, podemos recopilar los siguientes datos personales:",
      },
      list: {
        fr: [
          "Nom et prénom (اسم ولقب)",
          "Adresse email (البريد الإلكتروني)",
          "Numéro de téléphone (رقم الهاتف)",
          "Adresse postale (العنوان البريدي)",
          "Date de naissance (تاريخ الميلاد)",
          "Numéro d'identification nationale (رقم التعريف الوطني)",
          "Informations sur le permis de conduire (معلومات رخصة القيادة)",
          "Informations sur le véhicule (معلومات المركبة)",
          "Informations relatives à l'assurance existante (معلومات التأمين الحالي)",
          "Historique des sinistres (سجل المطالبات)",
          "Coordonnées bancaires (البيانات البنكية)",
        ],
        en: [
          "First and last name",
          "Email address",
          "Phone number",
          "Mailing address",
          "Date of birth",
          "National identification number",
          "Driver's license information",
          "Vehicle information",
          "Existing insurance information",
          "Claims history",
          "Banking information",
        ],
        ar: [
          "الاسم واللقب",
          "البريد الإلكتروني",
          "رقم الهاتف",
          "العنوان البريدي",
          "تاريخ الميلاد",
          "رقم التعريف الوطني",
          "معلومات رخصة القيادة",
          "معلومات المركبة",
          "معلومات التأمين الحالي",
          "سجل المطالبات",
          "البيانات البنكية",
        ],
        es: [
          "Nombre y apellido",
          "Correo electrónico",
          "Número de teléfono",
          "Dirección postal",
          "Fecha de nacimiento",
          "Número de identificación nacional",
          "Información del permiso de conducir",
          "Información del vehículo",
          "Información del seguro existente",
          "Historial de reclamaciones",
          "Información bancaria",
        ],
      },
      automaticData: {
        subtitle: {
          fr: "3.2 Données collectées automatiquement",
          en: "3.2 Data collected automatically",
          ar: "3.2 البيانات المجمعة تلقائيًا",
          es: "3.2 Datos recopilados automáticamente",
        },
        content: {
          fr: "Nous collectons également automatiquement certaines informations lorsque vous visiterez notre site web, notamment :",
          en: "We also automatically collect certain information when you visit our website, including:",
          ar: "نجمع أيضًا تلقائيًا معلومات معينة عند زيارة موقعنا على الويب، بما في ذلك:",
          es: "También recopilamos automáticamente cierta información cuando visita nuestro sitio web, incluyendo:",
        },
        list: {
          fr: [
            "Adresse IP (عنوان IP)",
            "Type de navigateur (نوع المتصفح)",
            "Système d'exploitation (نظام التشغيل)",
            "Pages visitées (الصفحات المزارة)",
            "Date et heure de la visite (تاريخ ووقت الزيارة)",
            "Liens cliqués (الروابط النقر عليها)",
            "Appareil utilisé (الجهاز المستخدم)",
          ],
          en: [
            "IP address",
            "Browser type",
            "Operating system",
            "Pages visited",
            "Date and time of visit",
            "Links clicked",
            "Device used",
          ],
          ar: [
            "عنوان IP",
            "نوع المتصفح",
            "نظام التشغيل",
            "الصفحات المزارة",
            "تاريخ ووقت الزيارة",
            "الروابط النقر عليها",
            "الجهاز المستخدم",
          ],
          es: [
            "Dirección IP",
            "Tipo de navegador",
            "Sistema operativo",
            "Páginas visitadas",
            "Fecha y hora de la visita",
            "Enlaces en los que se hizo clic",
            "Dispositivo utilizado",
          ],
        },
      },
    },

    dataUse: {
      title: {
        fr: "4. Utilisation de vos Données",
        en: "4. Use of Your Data",
        ar: "4. استخدام بياناتك",
        es: "4. Uso de Sus Datos",
      },
      content: {
        fr: "Nous utilisons vos données personnelles pour les finalités suivantes :",
        en: "We use your personal data for the following purposes:",
        ar: "نستخدم بياناتك الشخصية للأغراض التالية:",
        es: "Utilizamos sus datos personales para los siguientes fines:",
      },
      list: {
        fr: [
          "Fournir nos services d'assurance et de conseil (تقديم خدماتنا للتأمين والاستشارات)",
          "Traiter vos demandes de devis et de couverture (معالجة طلبات العرض والتغطية)",
          "Gérer votre dossier d'assurance (إدارة ملف التأمين الخاص بك)",
          "Communiquer avec vous concernant nos produits et services (التواصل معك بشأن منتجاتنا وخدماتنا)",
          "Répondre à vos questions et demandes d'assistance (الرد على أسئلتك وطلبات المساعدة)",
          "Améliorer notre site web et nos services (تحسين موقعنا وخدماتنا)",
          "Respecter nos obligations légales et réglementaires (الامتثال لالتزاماتنا القانونية والتنظيمية)",
          "Prévenir la fraude et les abus (منع الاحتيال وإساءة الاستخدام)",
          "Vous informer des modifications de nos services (إعلامك بتغييرات خدماتنا)",
          "Analyser les tendances et statistiques (تحليل الاتجاهات والإحصائيات)",
        ],
        en: [
          "Provide our insurance and advisory services",
          "Process your quote and coverage requests",
          "Manage your insurance file",
          "Communicate with you about our products and services",
          "Respond to your questions and support requests",
          "Improve our website and services",
          "Comply with our legal and regulatory obligations",
          "Prevent fraud and abuse",
          "Inform you of changes to our services",
          "Analyze trends and statistics",
        ],
        ar: [
          "تقديم خدماتنا للتأمين والاستشارات",
          "معالجة طلبات العرض والتغطية",
          "إدارة ملف التأمين الخاص بك",
          "التواصل معك بشأن منتجاتنا وخدماتنا",
          "الرد على أسئلتك وطلبات المساعدة",
          "تحسين موقعنا وخدماتنا",
          "الامتثال لالتزاماتنا القانونية والتنظيمية",
          "منع الاحتيال وإساءة الاستخدام",
          "إعلامك بتغييرات خدماتنا",
          "تحليل الاتجاهات والإحصائيات",
        ],
        es: [
          "Proporcionar nuestros servicios de seguros y asesoramiento",
          "Procesar sus solicitudes de presupuesto y cobertura",
          "Gestionar su expediente de seguro",
          "Comunicarnos con usted sobre nuestros productos y servicios",
          "Responder a sus preguntas y solicitudes de asistencia",
          "Mejorar nuestro sitio web y servicios",
          "Cumplir con nuestras obligaciones legales y regulatorias",
          "Prevenir el fraude y el abuso",
          "Informarle sobre cambios en nuestros servicios",
          "Analizar tendencias y estadísticas",
        ],
      },
    },

    legalBasis: {
      title: {
        fr: "5. Base Légale du Traitement",
        en: "5. Legal Basis for Processing",
        ar: "5. الأساس القانوني للمعالجة",
        es: "5. Base Legal del Tratamiento",
      },
      content: {
        fr: "Le traitement de vos données personnelles est basé sur les fondements juridiques suivants :",
        en: "The processing of your personal data is based on the following legal grounds:",
        ar: "تعتمد معالجة بياناتك الشخصية على الأسس القانونية التالية:",
        es: "El tratamiento de sus datos personales se basa en los siguientes fundamentos legales:",
      },
      list: {
        fr: [
          { title: "Exécution d'un contrat", desc: "Le traitement est nécessaire à l'exécution d'un contrat auquel vous êtes partie (prestations d'assurance)." },
          { title: "Consentement", desc: "Vous avez donné votre consentement explicite au traitement de vos données pour des finalités spécifiques." },
          { title: "Intérêt légitime", desc: "Le traitement est nécessaire aux fins de nos intérêts légitimes ou de ceux d'un tiers, sous réserve que vos intérêts fondamentaux ne prévalent pas." },
          { title: "Obligation légale", desc: "Le traitement est nécessaire au respect d'une obligation légale à laquelle nous sommes soumis." },
        ],
        en: [
          { title: "Contract performance", desc: "Processing is necessary for the performance of a contract to which you are a party (insurance services)." },
          { title: "Consent", desc: "You have given your explicit consent to the processing of your data for specific purposes." },
          { title: "Legitimate interest", desc: "Processing is necessary for the purposes of our legitimate interests or those of a third party, provided that your fundamental interests do not prevail." },
          { title: "Legal obligation", desc: "Processing is necessary for compliance with a legal obligation to which we are subject." },
        ],
        ar: [
          { title: "تنفيذ عقد", desc: "المعالجة ضرورية لتنفيذ عقد أنت طرف فيه (خدمات التأمين)." },
          { title: "الموافقة", desc: "لقد أعطيت موافقتك الصريحة على معالجة بياناتك لأغراض محددة." },
          { title: "المصلحة المشروعة", desc: "المعالجة ضرورية لتحقيق مصالحنا المشروعة أو مصالح طرف ثالث، شريطة ألا تسود مصالحك الأساسية." },
          { title: "الالتزام القانوني", desc: "المعالجة ضرورية للامتثال لالتزام قانوني我们是." },
        ],
        es: [
          { title: "Ejecución de un contrato", desc: "El tratamiento es necesario para la ejecución de un contrato en el que usted es parte (servicios de seguros)." },
          { title: "Consentimiento", desc: "Ha dado su consentimiento explícito para el tratamiento de sus datos para fines específicos." },
          { title: "Interés legítimo", desc: "El tratamiento es necesario para los fines de nuestros intereses legítimos o de un tercero, siempre que sus intereses fundamentales no prevalezcan." },
          { title: "Obligación legal", desc: "El tratamiento es necesario para cumplir con una obligación legal a la que estamos sujetos." },
        ],
      },
    },

    dataSharing: {
      title: {
        fr: "6. Partage de vos Données",
        en: "6. Sharing Your Data",
        ar: "6. مشاركة بياناتك",
        es: "6. Compartir Sus Datos",
      },
      content: {
        fr: "Nous ne vendons jamais vos données personnelles. Vos données peuvent être partagées avec :",
        en: "We never sell your personal data. Your data may be shared with:",
        ar: "لا نبيع بياناتك الشخصية أبدًا. يمكن مشاركة بياناتك مع:",
        es: "Nunca vendemos sus datos personales. Sus datos pueden ser compartidos con:",
      },
      list: {
        fr: [
          { title: "Compagnies d'assurance", desc: "Pour l'exécution de vos contrats d'assurance." },
          { title: "Partenaires commerciaux", desc: "Pour vous offrir des produits et services adaptés." },
          { title: "Autorités réglementaires", desc: "Pour respecter nos obligations légales." },
          { title: "Fournisseurs de services", desc: "Qui nous aident à exploiter notre entreprise (hébergeurs, paiement, etc.)." },
        ],
        en: [
          { title: "Insurance companies", desc: "For the execution of your insurance contracts." },
          { title: "Business partners", desc: "To offer you suitable products and services." },
          { title: "Regulatory authorities", desc: "To comply with our legal obligations." },
          { title: "Service providers", desc: "Who help us operate our business (hosting, payment, etc.)." },
        ],
        ar: [
          { title: "شركات التأمين", desc: "لتنفيذ عقود التأمين الخاصة بك." },
          { title: "الشركاء التجاريون", desc: "لتقديم منتجات وخدمات مناسبة لك." },
          { title: "السلطات التنظيمية", desc: "للامتثال لالتزاماتنا القانونية." },
          { title: "مزودو الخدمات", desc: "الذين يساعدوننا في إدارة أعمالنا (الاستضافة والدفع وما إلى ذلك)." },
        ],
        es: [
          { title: "Compañías de seguros", desc: "Para la ejecución de sus contratos de seguros." },
          { title: "Socios comerciales", desc: "Para ofrecerle productos y servicios adecuados." },
          { title: "Autoridades reguladoras", desc: "Para cumplir con nuestras obligaciones legales." },
          { title: "Proveedores de servicios", desc: "Que nos ayudan a operar nuestro negocio (alojamiento, pago, etc.)." },
        ],
      },
    },

    dataProtection: {
      title: {
        fr: "7. Protection de vos Données",
        en: "7. Data Security",
        ar: "7. أمان البيانات",
        es: "7. Seguridad de los Datos",
      },
      content: {
        fr: "Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé, modification, divulgation ou destruction. Ces mesures incluent :",
        en: "We implement appropriate technical and organizational security measures to protect your personal data against any unauthorized access, modification, disclosure or destruction. These measures include:",
        ar: "نقوم بتنفيذ تدابير أمنية تقنية وتنظيمية مناسبة لحماية بياناتك الشخصية من أي وصول غير مصرح به أو تعديل أو إفشاء أو تدمير. تشمل هذه التدابير:",
        es: "Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger sus datos personales contra cualquier acceso no autorizado, modificación, divulgación o destrucción. Estas medidas incluyen:",
      },
      list: {
        fr: [
          "Chiffrement des données (تشفير البيانات)",
          "Pare-feu et systèmes de détection d'intrusion (جدران الحماية وأنظمة كشف التسلل)",
          "Contrôle d'accès strict (الوصول الصارم)",
          "Sauvegardes régulières (النسخ الاحتياطي العادية)",
          "Formation du personnel (تدريب الموظفين)",
          "Audits de sécurité réguliers (عمليات تدقيق أمن منتظمة)",
        ],
        en: [
          "Data encryption",
          "Firewall and intrusion detection systems",
          "Strict access control",
          "Regular backups",
          "Staff training",
          "Regular security audits",
        ],
        ar: [
          "تشفير البيانات",
          "جدران الحماية وأنظمة كشف التسلل",
          "الوصول الصارم",
          "النسخ الاحتياطي العادية",
          "تدريب الموظفين",
          "عمليات تدقيق أمن منتظمة",
        ],
        es: [
          "Cifrado de datos",
          "Sistemas de firewall y detección de intrusiones",
          "Control de acceso estricto",
          "Copias de seguridad regulares",
          "Capacitación del personal",
          "Auditorías de seguridad regulares",
        ],
      },
    },

    dataRetention: {
      title: {
        fr: "8. Conservation de vos Données",
        en: "8. Data Retention",
        ar: "8. الاحتفاظ بالبيانات",
        es: "8. Retención de Datos",
      },
      content: {
        fr: "Nous conservons vos données personnelles uniquement pendant la durée nécessaire à la réalisation des finalités pour lesquelles elles ont été collectées, dans le respect des délais légaux de conservation. En général :",
        en: "We retain your personal data only for the duration necessary to achieve the purposes for which it was collected, in compliance with legal retention periods. Generally:",
        ar: "نحتفظ ببياناتك الشخصية فقط للمدة اللازمة لتحقيق الأغراض التي جمعت من أجلها، مع الامتثال لفترات الاحتفاظ القانونية. بشكل عام:",
        es: "Conservamos sus datos personales solo durante el tiempo necesario para lograr los fines para los que fueron recopilados, de acuerdo con los períodos legales de retención. Generalmente:",
      },
      list: {
        fr: [
          "Données de gestion de contrat : durée du contrat + 5 ans (بيانات إدارة العقد: مدة العقد + 5 سنوات)",
          "Données comptables : 10 ans (البيانات المحاسبية: 10 سنوات)",
          "Données de candidature : 2 ans (بيانات الطلب: سنتان)",
          "Données de navigation : 13 mois (بيانات التصفح: 13 شهرًا)",
        ],
        en: [
          "Contract management data: contract duration + 5 years",
          "Accounting data: 10 years",
          "Application data: 2 years",
          "Browsing data: 13 months",
        ],
        ar: [
          "بيانات إدارة العقد: مدة العقد + 5 سنوات",
          "البيانات المحاسبية: 10 سنوات",
          "بيانات الطلب: سنتان",
          "بيانات التصفح: 13 شهرًا",
        ],
        es: [
          "Datos de gestión de contratos: duración del contrato + 5 años",
          "Datos contables: 10 años",
          "Datos de solicitudes: 2 años",
          "Datos de navegación: 13 meses",
        ],
      },
    },

    yourRights: {
      title: {
        fr: "9. Vos Droits",
        en: "9. Your Rights",
        ar: "9. حقوقك",
        es: "9. Sus Derechos",
      },
      content: {
        fr: "Conformément à la réglementation en vigueur, vous disposez des droits suivants concernant vos données personnelles :",
        en: "In accordance with current regulations, you have the following rights regarding your personal data:",
        ar: "وفقًا للوائح المعمول بها، لديك الحقوق التالية فيما يتعلق ببياناتك الشخصية:",
        es: "De conformidad con la normativa vigente, usted tiene los siguientes derechos con respecto a sus datos personales:",
      },
      list: {
        fr: [
          { title: "Droit d'accès", desc: "Obtenir une copie de vos données personnelles." },
          { title: "Droit de rectification", desc: "Corriger les données inexactes ou incomplètes." },
          { title: "Droit à l'effacement", desc: "Demander la suppression de vos données." },
          { title: "Droit d'opposition", desc: "Vous opposer au traitement de vos données." },
          { title: "Droit à la limitation", desc: "Limiter le traitement de vos données." },
          { title: "Droit à la portabilité", desc: "Recevoir vos données dans un format structuré." },
          { title: "Droit de retrait du consentement", desc: "Retirer votre consentement à tout moment." },
        ],
        en: [
          { title: "Right of access", desc: "Obtain a copy of your personal data." },
          { title: "Right to rectification", desc: "Correct inaccurate or incomplete data." },
          { title: "Right to erasure", desc: "Request deletion of your data." },
          { title: "Right to object", desc: "Object to the processing of your data." },
          { title: "Right to restriction", desc: "Restrict the processing of your data." },
          { title: "Right to portability", desc: "Receive your data in a structured format." },
          { title: "Right to withdraw consent", desc: "Withdraw your consent at any time." },
        ],
        ar: [
          { title: "حق الوصول", desc: "الحصول على نسخة من بياناتك الشخصية." },
          { title: "حق التصحيح", desc: "تصحيح البيانات غير الدقيقة أو غير الكاملة." },
          { title: "حق المحو", desc: "طلب حذف بياناتك." },
          { title: "حق الاعتراض", desc: "الاعتراض على معالجة بياناتك." },
          { title: "حق التقييد", desc: "تقييد معالجة بياناتك." },
          { title: "حق النقل", desc: "استلام بياناتك بتنسيق منظم." },
          { title: "حق سحب الموافقة", desc: "سحب موافقتك في أي وقت." },
        ],
        es: [
          { title: "Derecho de acceso", desc: "Obtener una copia de sus datos personales." },
          { title: "Derecho de rectificación", desc: "Corregir datos inexactos o incompletos." },
          { title: "Derecho de supresión", desc: "Solicitar la eliminación de sus datos." },
          { title: "Derecho de oposición", desc: "Oponerse al tratamiento de sus datos." },
          { title: "Derecho a la limitación", desc: "Limitar el tratamiento de sus datos." },
          { title: "Derecho a la portabilidad", desc: "Recibir sus datos en un formato estructurado." },
          { title: "Derecho a retirar el consentimiento", desc: "Retirar su consentimiento en cualquier momento." },
        ],
      },
      exercise: {
        fr: "Pour exercer ces droits, contactez-nous à :",
        en: "To exercise these rights, contact us at:",
        ar: "لممارسة هذه الحقوق، تواصل معنا على:",
        es: "Para ejercer estos derechos, contáctenos en:",
      },
      email: "info@cpa.ma",
      phone: "+212 5 22 95 39 00",
      response: {
        fr: "Nous répondons à toute demande dans un délai d'un mois.",
        en: "We respond to any request within one month.",
        ar: "نرد على أي طلب خلال شهر واحد.",
        es: "Respondemos a cualquier solicitud dentro de un mes.",
      },
    },

    cookies: {
      title: {
        fr: "10. Cookies et Technologies Similaires",
        en: "10. Cookies and Similar Technologies",
        ar: "10. ملفات تعريف الارتباط والتقنيات المماثلة",
        es: "10. Cookies y Tecnologías Similares",
      },
      content: {
        fr: "Notre site web utilise des cookies et des technologies similaires pour améliorer votre expérience de navigation. Les cookies sont de petits fichiers texte stockés sur votre appareil.",
        en: "Our website uses cookies and similar technologies to improve your browsing experience. Cookies are small text files stored on your device.",
        ar: "يستخدم موقعنا على الويب ملفات تعريف الارتباط والتقنيات المماثلة لتحسين تجربة التصفح الخاصة بك. ملفات تعريف الارتباط هي ملفات نصية صغيرة مخزنة على جهازك.",
        es: "Nuestro sitio web utiliza cookies y tecnologías similares para mejorar su experiencia de navegación. Las cookies son pequeños archivos de texto almacenados en su dispositivo.",
      },
      types: {
        title: {
          fr: "Types de cookies utilisés :",
          en: "Types of cookies used:",
          ar: "أنواع ملفات تعريف الارتباط المستخدمة:",
          es: "Tipos de cookies utilizados:",
        },
        list: {
          fr: [
            { title: "Cookies essentiels", desc: "Nécessaires au fonctionnement du site." },
            { title: "Cookies analytiques", desc: "Pour analyser l'utilisation du site." },
            { title: "Cookies de personnalisation", desc: "Pour mémoriser vos préférences." },
            { title: "Cookies marketing", desc: "Pour vous proposer des publicités pertinentes." },
          ],
          en: [
            { title: "Essential cookies", desc: "Necessary for site operation." },
            { title: "Analytical cookies", desc: "To analyze site usage." },
            { title: "Personalization cookies", desc: "To remember your preferences." },
            { title: "Marketing cookies", desc: "To provide relevant advertisements." },
          ],
          ar: [
            { title: "ملفات تعريف الارتباط الأساسية", desc: "ضرورية لتشغيل الموقع." },
            { title: "ملفات تعريف الارتباط التحليلية", desc: "لتحليل استخدام الموقع." },
            { title: "ملفات تعريف الارتباط للتخصيص", desc: "لحفظ تفضيلاتك." },
            { title: "ملفات تعريف الارتباط التسويقية", desc: "لتقديم إعلانات ذات صلة." },
          ],
          es: [
            { title: "Cookies esenciales", desc: "Necesarios para el funcionamiento del sitio." },
            { title: "Cookies analíticos", desc: "Para analizar el uso del sitio." },
            { title: "Cookies de personalización", desc: "Para recordar sus preferencias." },
            { title: "Cookies de marketing", desc: "Para proporcionar anuncios relevantes." },
          ],
        },
      },
      manage: {
        fr: "Vous pouvez configurer votre navigateur pour refuser les cookies. Cependant, cela pourrait affecter certaines fonctionnalités du site.",
        en: "You can configure your browser to refuse cookies. However, this could affect certain features of the site.",
        ar: "يمكنك تكوين متصفحك لرفض ملفات تعريف الارتباط. ومع ذلك، قد يؤثر ذلك على بعض ميزات الموقع.",
        es: "Puede configurar su navegador para rechazar cookies. Sin embargo, esto podría afectar ciertas funciones del sitio.",
      },
    },

    international: {
      title: {
        fr: "15. Transferts Internationaux de Données",
        en: "15. International Data Transfers",
        ar: "15. التحويلات الدولية للبيانات",
        es: "15. Transferencias Internacionales de Datos",
      },
      content: {
        fr: "Nous pouvons être amenés à transférer vos données personnelles vers des pays tiers (en dehors de l'Union Européenne, du Maroc ou de votre pays de résidence). Dans ce cas, nous garantissons que :",
        en: "We may transfer your personal data to third countries (outside the European Union, Morocco, or your country of residence). In this case, we guarantee that:",
        ar: "قد نقوم بنقل بياناتك الشخصية إلى دول terceiros (خارج الاتحاد الأوروبي أو المغرب أو بلد إقامتك). في هذه الحالة، نضمن أن:",
        es: "Podemos transferir sus datos personales a países terceros (fuera de la Unión Europea, Marruecos o su país de residencia). En este caso, garantizamos que:",
      },
      measures: {
        fr: [
          "Les transferts sont effectués conformément aux mécanismes de transfert autorisés (clauses contractuelles types, règles d'entreprise contraignantes, etc.)",
          "Un niveau de protection adéquat est assuré dans le pays de destination",
          "Vous êtes informé de manière claire et transparente de tout transfert international",
          "Des accords de traitement des données sont en place avec tous les sous-traitants",
        ],
        en: [
          "Transfers are carried out in accordance with authorized transfer mechanisms (standard contractual clauses, binding corporate rules, etc.)",
          "An adequate level of protection is ensured in the destination country",
          "You are informed clearly and transparently of any international transfer",
          "Data processing agreements are in place with all sub-processors",
        ],
        ar: [
          "يتم إجراء التحويلات وفقًا لآليات التحويل المصرح بها (البنود التعاقدية القياسية وقواعد الشركة الملزمة وما إلى ذلك)",
          "يتم ضمان مستوى مناسب من الحماية في بلد الوجهة",
          "يتم إبلاغك بشكل واضح وشفاف بأي نقل دولي",
          "توجد اتفاقيات معالجة البيانات مع جميع المعالجين الفرعيين",
        ],
        es: [
          "Las transferencias se realizan de acuerdo con los mecanismos de transferencia autorizados (cláusulas contractuales estándar, normas corporativas vinculantes, etc.)",
          "Se asegura un nivel adecuado de protección en el país de destino",
          "Se le informa de manera clara y transparente sobre cualquier transferencia internacional",
          "Los acuerdos de procesamiento de datos están en vigor con todos los subprocesadores",
        ],
      },
      safeguards: {
        fr: "Mécanismes de protection en place :",
        en: "Protection mechanisms in place:",
        ar: "آليات الحماية المطبقة:",
        es: "Mecanismos de protección implementados:",
      },
      mechanisms: {
        fr: [
          "Clauses contractuelles types approuvées par la Commission Européenne",
          "Règles d'entreprise contraignantes (BCR) pour les transferts intra-groupe",
          "Décisions d'adéquation de la Commission pour certains pays",
          "Certifications et codes de conduite approuvés",
        ],
        en: [
          "Standard Contractual Clauses approved by the European Commission",
          "Binding Corporate Rules (BCR) for intra-group transfers",
          "Commission adequacy decisions for certain countries",
          "Approved certifications and codes of conduct",
        ],
        ar: [
          "البنود التعاقدية القياسية المعتمدة من المفوضية الأوروبية",
          "قواعد الشركة الملزمة (BCR) للتحويلات داخل المجموعة",
          "قرارات الملاءمة للمفوضية لبعض الدول",
          "الشهادات وأخلاقيات السلوك المعتمدة",
        ],
        es: [
          "Cláusulas Contractuales Estándar aprobadas por la Comisión Europea",
          "Normas Corporativas Vinculantes (BCR) para transferencias внутри группы",
          "Decisiones de adecuación de la Comisión para ciertos países",
          "Certificaciones y códigos de conducta aprobados",
        ],
      },
    },

    children: {
      title: {
        fr: "12. Protection des Mineurs",
        en: "12. Protection of Minors",
        ar: "12. حماية القاصرين",
        es: "12. Protección de Menores",
      },
      content: {
        fr: "Nos services ne sont pas destinés aux personnes de moins de 18 ans. Nous ne collectons pas délibérément de données personnelles de mineurs sans le consentement parental.",
        en: "Our services are not intended for persons under 18 years of age. We do not knowingly collect personal data from minors without parental consent.",
        ar: "خدماتنا ليست مخصصة للأشخاص دون سن 18 عامًا. لا نجمع عن قصد بيانات شخصية من القاصرين دون موافقة الوالدين.",
        es: "Nuestros servicios no están destinados a personas menores de 18 años. No recopilamos deliberadamente datos personales de menores sin el consentimiento de los padres.",
      },
    },

    changes: {
      title: {
        fr: "13. Modifications de cette Politique",
        en: "13. Changes to This Policy",
        ar: "13. تغييرات هذه السياسة",
        es: "13. Cambios en Esta Política",
      },
      content: {
        fr: "Nous pouvons modifier cette politique de confidentialité périodiquement. Toute modification substantielle sera publiée sur cette page et, si nécessaire, vous sera notifiée par email. Nous vous encourageons à consulter régulièrement cette page pour rester informé des mises à jour.",
        en: "We may modify this privacy policy periodically. Any substantial changes will be posted on this page and, if necessary, notified to you by email. We encourage you to review this page regularly to stay informed about updates.",
        ar: "قد نقوم بتعديل هذه السياسة بشكل دوري. سيتم نشر أي تغييرات جوهرية على هذه الصفحة وإخطارك بها عبر البريد الإلكتروني إذا لزم الأمر. نشجعك على مراجعة هذه الصفحة بانتظام للبقاء على علم بالتحديثات.",
        es: "Podemos modificar esta política de privacidad periódicamente. Cualquier cambio sustancial se publicará en esta página y, si es necesario, se le notificará por correo electrónico. Le recomendamos que revise esta página regularmente para mantenerse informado sobre las actualizaciones.",
      },
    },
    
    dataBreach: {
      title: {
        fr: "13. Notification de Violation de Données",
        en: "13. Data Breach Notification",
        ar: "13. إشعار اختراق البيانات",
        es: "13. Notificación de Violación de Datos",
      },
      content: {
        fr: "En cas de violation de données à caractère personnel susceptible d'engendrer un risque pour les droits et libertés des personnes concernées, nous nous engageons à :",
        en: "In the event of a personal data breach likely to result in a risk to the rights and freedoms of data subjects, we commit to:",
        ar: "في حالة حدوث اختراق للبيانات الشخصية من المرجح أن يؤدي إلى خطر على حقوق وحريات أصحاب البيانات، نتعهد بـ:",
        es: "En caso de una violación de datos personales que pueda generar un riesgo para los derechos y libertades de los interesados, nos comprometemos a:",
      },
      obligations: {
        fr: [
          "Notifier l'autorité de contrôle compétente (CNDP au Maroc, CNIL en France, etc.) dans un délai de 72 heures",
          "Communiquer la violation à la personne concernée lorsque le risque est élevé",
          "Documenter toute violation de données avérée",
          "Mettre en œuvre immédiatement les mesures correctives appropriées",
        ],
        en: [
          "Notify the competent supervisory authority (CNDP in Morocco, CNIL in France, etc.) within 72 hours",
          "Communicate the breach to the data subject when the risk is high",
          "Document all proven data breaches",
          "Immediately implement appropriate corrective measures",
        ],
        ar: [
          "إخطار سلطة الإشراف المختصة (CNDP في المغرب، CNIL في فرنسا، وما إلى ذلك) في غضون 72 ساعة",
          "إخطار الشخص المعني عندما يكون الخطر مرتفعا",
          "توثيق جميع انتهاكات البيانات الثابتة",
          "تنفيذ تدابير التصحيح المناسبة على الفور",
        ],
        es: [
          "Notificar a la autoridad de control competente (CNDP en Marruecos, CNIL en Francia, etc.) en un plazo de 72 horas",
          "Comunicar la violación a la persona afectada cuando el riesgo sea alto",
          "Documentar todas las violaciones de datos probadas",
          "Implementar inmediatamente las medidas correctivas apropiadas",
        ],
      },
      contact: {
        fr: "Pour signaler une violation de données :",
        en: "To report a data breach:",
        ar: "للإبلاغ عن اختراق البيانات:",
        es: "Para reportar una violación de datos:",
      },
      email: "security@cpa.ma",
    },
    
    supervisoryAuthority: {
      title: {
        fr: "14. Autorités de Contrôle",
        en: "14. Supervisory Authorities",
        ar: "14. سلطات الإشراف",
        es: "14. Autoridades de Supervisión",
      },
      content: {
        fr: "Vous avez le droit de déposer une plainte auprès d'une autorité de contrôle si vous estimez que le traitement de vos données personnelles constitue une violation du RGPD ou de toute autre réglementation applicable. Les autorités de contrôle compétentes sont :",
        en: "You have the right to lodge a complaint with a supervisory authority if you believe that the processing of your personal data constitutes a violation of the GDPR or any other applicable regulation. The competent supervisory authorities are:",
        ar: "لديك الحق في تقديم شكوى إلى سلطة إشراف إذا كنت تعتقد أن معالجة بياناتك الشخصية تشكل انتهاكًا لـ GDPR أو أي لائحة أخرى قابلة للتطبيق. سلطات الإشراف المختصة هي:",
        es: "Tiene derecho a presentar una queja ante una autoridad de supervisión si cree que el procesamiento de sus datos personales constituye una violación del GDPR o cualquier otra regulación aplicable. Las autoridades de supervisión competentes son:",
      },
      morocco: {
        fr: "Commission Nationale de Contrôle de la Protection des Données à Caractère Personnel (CNDP)",
        en: "National Commission for the Control of Personal Data Protection (CNDP)",
        ar: "اللجنة الوطنية لمراقبة حماية البيانات ذات الطابع الشخصي (CNDP)",
        es: "Comisión Nacional de Control de la Protección de Datos de Carácter Personal (CNDP)",
      },
      moroccoAddress: {
        fr: "Angle Avenue Annakhil, Hay Riad, Rabat, Maroc\nSite web: www.cndp.ma",
        en: "Angle Annakhil Avenue, Hay Riad, Rabat, Morocco\nWebsite: www.cndp.ma",
        ar: "زاوية شارع العناقيل، حي الرياض، الرباط، المغرب\nالموقع الإلكتروني: www.cndp.ma",
        es: "Esquina Avenida Annakhil, Hay Riad, Rabat, Marruecos\nSitio web: www.cndp.ma",
      },
      eu: {
        fr: "Pour les résidents de l'UE, vous pouvez également contacter l'autorité de protection des données de votre pays de résidence. Pour plus d'informations :",
        en: "For EU residents, you can also contact the data protection authority in your country of residence. For more information:",
        ar: "بالنسبة للمقيمين في الاتحاد الأوروبي، يمكنك أيضًا الاتصال بسلطة حماية البيانات في بلد إقامتك. لمزيد من المعلومات:",
        es: "Para los residentes de la UE, también puede comunicarse con la autoridad de protección de datos de su país de residencia. Para más información:",
      },
      euLink: "https://edpb.europa.eu/about-edpb/about-edpb/members_en",
    },
    
    privacyByDesign: {
      title: {
        fr: "15. Protection par Conception et par Défaut",
        en: "15. Privacy by Design and Default",
        ar: "15. الحماية حسب التصميم والحسب الافتراضي",
        es: "15. Protección desde el Diseño y por Defecto",
      },
      content: {
        fr: "Conformément aux principes de protection des données par conception et par défaut, nous mettons en œuvre les mesures techniques et organisationnelles appropriées pour :",
        en: "In accordance with the principles of privacy by design and by default, we implement appropriate technical and organizational measures to:",
        ar: "وفقًا لمبادئ حماية البيانات حسب التصميم والحسب الافتراضي، ننفذ التدابير التقنية والتنظيمية المناسبة لـ:",
        es: "De acuerdo con los principios de protección de datos desde el diseño y por defecto, implementamos medidas técnicas y organizativas apropiadas para:",
      },
      principles: {
        fr: [
          "Minimiser la collecte de données : ne collecter que les données strictement nécessaires",
          "Limiter le traitement aux finalités définies : ne pas utiliser les données à des fins non déclarées",
          "Garantir la confidentialité : intégrer la protection des données dès la conception des systèmes",
          "Assurer l'exactitude : maintenir la qualité et l'actualité des données",
          "Permettre la portabilité : faciliter l'exercice des droits des personnes concernées",
          "Définir des durées de conservation appropriées : effacer les données obsolètes",
        ],
        en: [
          "Minimize data collection: only collect data that is strictly necessary",
          "Limit processing to stated purposes: not use data for undeclared purposes",
          "Guarantee confidentiality: integrate data protection from system design",
          "Ensure accuracy: maintain data quality and currency",
          "Enable portability: facilitate the exercise of data subject rights",
          "Define appropriate retention periods: delete obsolete data",
        ],
        ar: [
          "تقليل جمع البيانات: جمع البيانات الضرورية فقط",
          "تقييد المعالجة للأغراض المعلنة: عدم استخدام البيانات لأغراض غير معلنة",
          "ضمان السرية: دمج حماية البيانات من تصميم الأنظمة",
          "ضمان الدقة: الحفاظ على جودة البيانات وتحديثها",
          "تفعيل إمكانية النقل: تسهيل ممارسة حقوق أصحاب البيانات",
          "تحديد فترات الاحتفاظ المناسبة: حذف البيانات القديمة",
        ],
        es: [
          "Minimizar la recolección de datos: solo recolectar datos estrictamente necesarios",
          "Limitar el procesamiento a los propósitos declarados: no usar datos para propósitos no declarados",
          "Garantizar la confidencialidad: integrar la protección de datos desde el diseño del sistema",
          "Asegurar la precisión: mantener la calidad y actualización de los datos",
          "Habilitar la portabilidad: facilitar el ejercicio de los derechos de los interesados",
          "Definir períodos de retención apropiados: eliminar datos obsoletos",
        ],
      },
    },

    contact: {
      title: {
        fr: "20. Nous Contacter",
        en: "20. Contact Us",
        ar: "20. تواصل معنا",
        es: "20. Contáctenos",
      },
      content: {
        fr: "Pour toute question concernant cette politique de protection des données ou pour exercer vos droits, contactez-nous :",
        en: "For any questions regarding this data protection policy or to exercise your rights, contact us:",
        ar: "لأي سؤال بخصوص سياسة حماية البيانات هذه أو لممارسة حقوقك، تواصل معنا:",
        es: "Para cualquier pregunta sobre esta política de protección de datos o para ejercer sus derechos, contáctenos:",
      },
      address: {
        fr: "CPA - Conseil et Placement d'Assurances\nAngle Boulevard Moulay Youssef et Boulevard Ziraoui\nComplexe Moulay Youssef Work Center, 2ème Étage\nCasablanca, Maroc",
        en: "CPA - Conseil et Placement d'Assurances\nAngle Boulevard Moulay Youssef and Boulevard Ziraoui\nComplexe Moulay Youssef Work Center, 2nd Floor\nCasablanca, Morocco",
        ar: "CPA - Conseil et Placement d'Assurances\nزاوية شارع الملك يوسف وشارع زراوي\nمجمع العمل مركز الملك يوسف، الطابق الثاني\nالدار البيضاء، المغرب",
        es: "CPA - Conseil et Placement d'Assurances\nEsquina Boulevard Moulay Youssef y Boulevard Ziraoui\nComplejo Moulay Youssef Work Center, 2º Planta\nCasablanca, Marruecos",
      },
      contactPoints: {
        title: {
          fr: "Points de contact selon votre demande :",
          en: "Contact points according to your request:",
          ar: "نقاط الاتصال حسب طلبك:",
          es: "Puntos de contacto según su solicitud:",
        },
        general: {
          label: "Questions générales",
          email: "info@cpa.ma",
        },
        dpo: {
          label: "Questions relatives au DPO",
          email: "dpo@cpa.ma",
        },
        security: {
          label: "Signaler une violation de données",
          email: "security@cpa.ma",
        },
      },
    },
    
    recordOfProcessing: {
      title: {
        fr: "Registre des Traitements",
        en: "Record of Processing Activities",
        ar: "سجل المعالجات",
        es: "Registro de Actividades de Tratamiento",
      },
      content: {
        fr: "Nous tenons un registre de toutes les activités de traitement de données à caractère personnel conforme aux exigences de l'article 30 du RGPD. Ce registre contient :",
        en: "We maintain a record of all personal data processing activities in compliance with GDPR Article 30 requirements. This record contains:",
        ar: "نحتفظ بسجل لجميع أنشطة معالجة البيانات الشخصية امتثالاً لمتطلبات المادة 30 من اللائحة العامة لحماية البيانات. يحتوي هذا السجل على:",
        es: "Mantenemos un registro de todas las actividades de procesamiento de datos personales de acuerdo con los requisitos del Artículo 30 del RGPD. Este registro contiene:",
      },
      items: {
        fr: [
          "Les finalités du traitement",
          "Les catégories de données à caractère personnel concernées",
          "Les catégories de destinataires auxquels les données ont été communiquées",
          "Les durées de conservation prévues",
          "Une description générale des mesures de sécurité techniques et organisationnelles",
        ],
        en: [
          "The purposes of the processing",
          "The categories of personal data concerned",
          "The categories of recipients to whom the data has been disclosed",
          "The planned retention periods",
          "A general description of technical and organizational security measures",
        ],
        ar: [
          "أغراض المعالجة",
          "فئات البيانات الشخصية المعنية",
          "فئات المستلمين الذين تم الإفصاح عن البيانات لهم",
          "فترات الاحتفاظ المخططة",
          "وصف عام للتدابير الأمنية التقنية والتنظيمية",
        ],
        es: [
          "Los propósitos del procesamiento",
          "Las categorías de datos personales concerned",
          "Las categorías de destinatarios a quienes se han comunicado los datos",
          "Los períodos de retención planificados",
          "Una descripción general de las medidas de seguridad técnicas y organizativas",
        ],
      },
    },
    
    automatedDecision: {
      title: {
        fr: "Décisions Automatisées et Profilage",
        en: "Automated Decision-Making and Profiling",
        ar: "القرارات الآلية والتمييز",
        es: "Decisiones Automatizadas y Perfilado",
      },
      content: {
        fr: "Nous vous informons de la possibilité de faire l'objet d'une décision fondée exclusivement sur un traitement automatisé, y compris le profilage, produisant des effets juridiques vous concernant. Vous avez le droit de ne pas être soumis à une telle décision si elle produit un effet juridique ou vous affecte significativement, sauf si la décision est nécessaire à la conclusion ou à l'exécution d'un contrat.",
        en: "We inform you of the possibility of being subject to automated decision-making, including profiling, producing legal effects concerning you. You have the right not to be subject to such decisions if they produce legal effects or significantly affect you, unless the decision is necessary for the conclusion or performance of a contract.",
        ar: "نخبرك بإمكانية خضوعك لقرار يعتمد حصريًا على المعالجة الآلية، بما في ذلك التمييز، مما ينتج عنه آثار قانونية تخصك. يحق لك عدم خضوع هذا القرار إذا كان ينتج أثرًا قانونيًا أو يؤثر عليك بشكل كبير، ما لم يكن القرار ضروريًا للعقد.",
        es: "Le informamos de la posibilidad de ser objeto de decisiones automatizadas, incluido el perfilado, que produzcan efectos legales que le conciernan. Tiene derecho a no ser objeto de tales decisiones si producen efectos legales o le afectan significativamente, a menos que la decisión sea necesaria para la celebración o ejecución de un contrato.",
      },
      contact: {
        fr: "Pour exercer ce droit ou obtenir des informations complémentaires :",
        en: "To exercise this right or obtain additional information:",
        ar: "لممارسة هذا الحق أو الحصول على معلومات إضافية:",
        es: "Para ejercer este derecho u obtener información adicional:",
      },
      email: "dpo@cpa.ma",
    },
  };

  const getText = (obj: { [key: string]: string }) => obj[lang] || obj.fr;

  const getList = (list: string[]) => {
    if (lang === "fr") return list;
    const index = lang === "en" ? 1 : lang === "ar" ? 2 : 3;
    return list.map((item) => {
      const parts = item.split("(");
      if (parts.length === 2) {
        return parts[0].trim();
      }
      return item;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <Navbar />

      <section className="pt-32 pb-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4">
                <Shield className="w-12 h-12 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-foreground mb-4">
                {getText(content.title)}
              </h1>
              <p className="text-xl text-muted-foreground mb-2">
                {getText(content.subtitle)}
              </p>
              <p className="text-sm text-muted-foreground">
                {content.lastUpdate[lang]} : Mars 2026
              </p>
            </div>

            <div className="space-y-8">
              {/* Regulatory Framework */}
              <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-2xl p-8 border border-primary/20 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <Scale className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-primary">
                    {getText(content.regulatory.title)}
                  </h2>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {getText(content.regulatory.content)}
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {(lang === "fr" ? content.regulatory.regulations.fr : 
                    lang === "en" ? content.regulatory.regulations.en : 
                    lang === "ar" ? content.regulatory.regulations.ar : 
                    content.regulatory.regulations.es).map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Introduction */}
              <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  {getText(content.introduction.title)}
                </h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {getText(content.introduction.content)}
                </p>
              </div>

              {/* Data Controller */}
              <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  {getText(content.dataController.title)}
                </h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line mb-4">
                  {getText(content.dataController.content)}
                </p>
                <div className="bg-muted/50 rounded-lg p-4 whitespace-pre-line">
                  <p className="text-foreground whitespace-pre-line">
                    {lang === "fr" ? content.dataController.details.fr : 
                     lang === "en" ? content.dataController.details.en : 
                     lang === "ar" ? content.dataController.details.ar : 
                     content.dataController.details.es}
                  </p>
                </div>
              </div>

              {/* Data Protection Officer */}
              <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-2xl p-8 border border-primary/20 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <UserCheck className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-primary">
                    {getText(content.dataProtectionOfficer.title)}
                  </h2>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {getText(content.dataProtectionOfficer.content)}
                </p>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-foreground font-semibold mb-2">
                    {getText(content.dataProtectionOfficer.contact)}
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Email:</strong> <a href="mailto:dpo@cpa.ma" className="text-primary hover:underline">dpo@cpa.ma</a>
                  </p>
                  <p className="text-muted-foreground text-sm mt-2">
                    {getText(content.dataProtectionOfficer.note)}
                  </p>
                </div>
              </div>

              {/* Data Collection */}
              <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
                <h2 className="text-2xl font-heading font-bold text-primary mb-6">
                  {getText(content.dataCollection.title)}
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-foreground">
                      {getText(content.dataCollection.subtitle)}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {getText(content.dataCollection.personalData)}
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {getList(content.dataCollection.list.fr).map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-muted-foreground">
                          <span className="text-primary mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <h3 className="text-lg font-semibold mb-3 text-foreground">
                      {getText(content.dataCollection.automaticData.subtitle)}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {getText(content.dataCollection.automaticData.content)}
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {getList(content.dataCollection.automaticData.list.fr).map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-muted-foreground">
                          <span className="text-primary mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Data Use */}
              <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  {getText(content.dataUse.title)}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {getText(content.dataUse.content)}
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {getList(content.dataUse.list.fr).map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground">
                      <span className="text-primary mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal Basis */}
              <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  {getText(content.legalBasis.title)}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {getText(content.legalBasis.content)}
                </p>
                <div className="space-y-4">
                  {content.legalBasis.list.fr.map((item, index) => (
                    <div key={index} className="bg-muted/50 rounded-lg p-4">
                      <h4 className="font-semibold text-foreground mb-1">
                        {lang === "fr" ? item.title : lang === "en" ? content.legalBasis.list.en[index].title : lang === "ar" ? content.legalBasis.list.ar[index].title : content.legalBasis.list.es[index].title}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {lang === "fr" ? item.desc : lang === "en" ? content.legalBasis.list.en[index].desc : lang === "ar" ? content.legalBasis.list.ar[index].desc : content.legalBasis.list.es[index].desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Data Sharing */}
              <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  {getText(content.dataSharing.title)}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {getText(content.dataSharing.content)}
                </p>
                <div className="space-y-4">
                  {content.dataSharing.list.fr.map((item, index) => (
                    <div key={index} className="bg-muted/50 rounded-lg p-4">
                      <h4 className="font-semibold text-foreground mb-1">
                        {lang === "fr" ? item.title : lang === "en" ? content.dataSharing.list.en[index].title : lang === "ar" ? content.dataSharing.list.ar[index].title : content.dataSharing.list.es[index].title}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {lang === "fr" ? item.desc : lang === "en" ? content.dataSharing.list.en[index].desc : lang === "ar" ? content.dataSharing.list.ar[index].desc : content.dataSharing.list.es[index].desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Data Protection */}
              <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  {getText(content.dataProtection.title)}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {getText(content.dataProtection.content)}
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {getList(content.dataProtection.list.fr).map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground">
                      <span className="text-primary mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Data Retention */}
              <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  {getText(content.dataRetention.title)}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {getText(content.dataRetention.content)}
                </p>
                <ul className="space-y-2">
                  {getList(content.dataRetention.list.fr).map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground">
                      <span className="text-primary mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Your Rights */}
              <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  {getText(content.yourRights.title)}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {getText(content.yourRights.content)}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {content.yourRights.list.fr.map((item, index) => (
                    <div key={index} className="bg-muted/50 rounded-lg p-4">
                      <h4 className="font-semibold text-foreground mb-1">
                        {lang === "fr" ? item.title : lang === "en" ? content.yourRights.list.en[index].title : lang === "ar" ? content.yourRights.list.ar[index].title : content.yourRights.list.es[index].title}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {lang === "fr" ? item.desc : lang === "en" ? content.yourRights.list.en[index].desc : lang === "ar" ? content.yourRights.list.ar[index].desc : content.yourRights.list.es[index].desc}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="bg-primary/10 rounded-lg p-4">
                  <p className="text-muted-foreground mb-2">
                    {getText(content.yourRights.exercise)}
                  </p>
                  <p className="text-foreground">
                    <strong>Email:</strong> <a href={`mailto:${content.yourRights.email}`} className="text-primary hover:underline">{content.yourRights.email}</a>
                  </p>
                  <p className="text-foreground">
                    <strong>{lang === "fr" ? "Téléphone" : lang === "en" ? "Phone" : lang === "ar" ? "الهاتف" : "Teléfono"}:</strong> <a href={`tel:${content.yourRights.phone.replace(/\s/g, "")}`} className="text-primary hover:underline">{content.yourRights.phone}</a>
                  </p>
                  <p className="text-muted-foreground text-sm mt-2">
                    {getText(content.yourRights.response)}
                  </p>
                </div>
              </div>

              {/* Cookies */}
              <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  {getText(content.cookies.title)}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {getText(content.cookies.content)}
                </p>
                
                <h3 className="text-lg font-semibold mb-3 text-foreground">
                  {getText(content.cookies.types.title)}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {content.cookies.types.list.fr.map((item, index) => (
                    <div key={index} className="bg-muted/50 rounded-lg p-4">
                      <h4 className="font-semibold text-foreground mb-1">
                        {lang === "fr" ? item.title : lang === "en" ? content.cookies.types.list.en[index].title : lang === "ar" ? content.cookies.types.list.ar[index].title : content.cookies.types.list.es[index].title}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {lang === "fr" ? item.desc : lang === "en" ? content.cookies.types.list.en[index].desc : lang === "ar" ? content.cookies.types.list.ar[index].desc : content.cookies.types.list.es[index].desc}
                      </p>
                    </div>
                  ))}
                </div>
                
                <p className="text-muted-foreground text-sm">
                  {getText(content.cookies.manage)}
                </p>
              </div>

              {/* International Transfers */}
              <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Globe className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-primary">
                    {getText(content.international.title)}
                  </h2>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {getText(content.international.content)}
                </p>
                <div className="space-y-3">
                  <p className="text-foreground font-semibold">
                    {getText(content.international.safeguards)}
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {(lang === "fr" ? content.international.mechanisms.fr : 
                      lang === "en" ? content.international.mechanisms.en : 
                      lang === "ar" ? content.international.mechanisms.ar : 
                      content.international.mechanisms.es).map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <span className="text-primary mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Data Breach Notification */}
              <div className="bg-gradient-to-r from-red-50 to-transparent rounded-2xl p-8 border border-red-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-red-700">
                    {getText(content.dataBreach.title)}
                  </h2>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {getText(content.dataBreach.content)}
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                  {(lang === "fr" ? content.dataBreach.obligations.fr : 
                    lang === "en" ? content.dataBreach.obligations.en : 
                    lang === "ar" ? content.dataBreach.obligations.ar : 
                    content.dataBreach.obligations.es).map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground">
                      <span className="text-red-600 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-foreground font-semibold mb-1">
                    {getText(content.dataBreach.contact)}
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Email:</strong> <a href="mailto:security@cpa.ma" className="text-primary hover:underline">security@cpa.ma</a>
                  </p>
                </div>
              </div>

              {/* Supervisory Authority */}
              <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-primary">
                    {getText(content.supervisoryAuthority.title)}
                  </h2>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {getText(content.supervisoryAuthority.content)}
                </p>
                <div className="bg-muted/50 rounded-lg p-4 mb-4">
                  <p className="text-foreground font-semibold mb-2">
                    {lang === "fr" ? "Maroc - CNDP" : 
                     lang === "en" ? "Morocco - CNDP" : 
                     lang === "ar" ? "المغرب - CNDP" : 
                     "Marruecos - CNDP"}
                  </p>
                  <p className="text-muted-foreground text-sm whitespace-pre-line">
                    {lang === "fr" ? content.supervisoryAuthority.moroccoAddress.fr : 
                     lang === "en" ? content.supervisoryAuthority.moroccoAddress.en : 
                     lang === "ar" ? content.supervisoryAuthority.moroccoAddress.ar : 
                     content.supervisoryAuthority.moroccoAddress.es}
                  </p>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {getText(content.supervisoryAuthority.eu)}
                </p>
                <p className="text-primary hover:underline text-sm mt-1">
                  <a href={content.supervisoryAuthority.euLink} target="_blank" rel="noopener noreferrer">
                    edpb.europa.eu
                  </a>
                </p>
              </div>

              {/* Privacy by Design */}
              <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Database className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-primary">
                    {getText(content.privacyByDesign.title)}
                  </h2>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {getText(content.privacyByDesign.content)}
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(lang === "fr" ? content.privacyByDesign.principles.fr : 
                    lang === "en" ? content.privacyByDesign.principles.en : 
                    lang === "ar" ? content.privacyByDesign.principles.ar : 
                    content.privacyByDesign.principles.es).map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Record of Processing */}
              <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-primary">
                    {getText(content.recordOfProcessing.title)}
                  </h2>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {getText(content.recordOfProcessing.content)}
                </p>
                <ul className="grid grid-cols-1 gap-2">
                  {(lang === "fr" ? content.recordOfProcessing.items.fr : 
                    lang === "en" ? content.recordOfProcessing.items.en : 
                    lang === "ar" ? content.recordOfProcessing.items.ar : 
                    content.recordOfProcessing.items.es).map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Automated Decision Making */}
              <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Lock className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-primary">
                    {getText(content.automatedDecision.title)}
                  </h2>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {getText(content.automatedDecision.content)}
                </p>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-foreground font-semibold mb-1">
                    {getText(content.automatedDecision.contact)}
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Email:</strong> <a href="mailto:dpo@cpa.ma" className="text-primary hover:underline">dpo@cpa.ma</a>
                  </p>
                </div>
              </div>

              {/* Children Protection */}
              <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  {getText(content.children.title)}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {getText(content.children.content)}
                </p>
              </div>

              {/* Changes */}
              <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  {getText(content.changes.title)}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {getText(content.changes.content)}
                </p>
              </div>

              {/* Contact */}
              <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  {getText(content.contact.title)}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {getText(content.contact.content)}
                </p>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-foreground whitespace-pre-line">
                    {getText(content.contact.address)}
                  </p>
                  <p className="mt-3">
                    <strong>Email:</strong> <a href="mailto:info@cpa.ma" className="text-primary hover:underline">info@cpa.ma</a>
                  </p>
                  <p>
                    <strong>{lang === "fr" ? "Téléphone" : lang === "en" ? "Phone" : lang === "ar" ? "الهاتف" : "Teléfono"}:</strong> <a href="tel:+212522953900" className="text-primary hover:underline">+212 5 22 95 39 00</a>
                  </p>
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

export default PolitiqueConfidentialitePage;
