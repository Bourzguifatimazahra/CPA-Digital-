import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";

const PolitiqueConfidentialitePage = () => {
  const { lang } = useLanguage();

  const isRTL = lang === "ar";

  const content = {
    // Page Title
    title: {
      fr: "Politique de Confidentialité",
      en: "Privacy Policy",
      ar: "سياسة الخصوصية",
      es: "Política de Privacidad",
    },
    subtitle: {
      fr: "Protection de vos données personnelles",
      en: "Protecting Your Personal Data",
      ar: "حماية بياناتك الشخصية",
      es: "Protección de Sus Datos Personales",
    },
    lastUpdate: {
      fr: "Dernière mise à jour",
      en: "Last updated",
      ar: "آخر تحديث",
      es: "Última actualización",
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
        fr: "Le responsable du traitement de vos données personnelles est :\n\nCPA - Conseil et Placement d'Assurances\nS.A. au capital de 5 000 000 DH\nAngle Boulevard Moulay Youssef et Boulevard Ziraoui\nComplexe Moulay Youssef Work Center, 2ème Étage\nCasablanca, Maroc\n\nTéléphone : +212 5 22 95 39 00\nEmail : info@cpa.ma",
        en: "The data controller for your personal data is:\n\nCPA - Conseil et Placement d'Assurances\nS.A. with capital of 5,000,000 DH\nAngle Boulevard Moulay Youssef and Boulevard Ziraoui\nComplexe Moulay Youssef Work Center, 2nd Floor\nCasablanca, Morocco\n\nPhone: +212 5 22 95 39 00\nEmail: info@cpa.ma",
        ar: "مسؤول معالجة بياناتك الشخصية هو:\n\nCPA - Conseil et Placement d'Assurances\nشركة مجهولة الاسم برأس مال 5,000,000 درهم\nزاوية شارع الملك يوسف وشارع زراوي\nمجمع العمل مركز الملك يوسف، الطابق الثاني\nالدار البيضاء، المغرب\n\nالهاتف: 212 5 22 95 39 00+\nالبريد الإلكتروني: info@cpa.ma",
        es: "El responsable del tratamiento de sus datos personales es:\n\nCPA - Conseil et Placement d'Assurances\nS.A. con capital de 5.000.000 DH\nEsquina Boulevard Moulay Youssef y Boulevard Ziraoui\nComplejo Moulay Youssef Work Center, 2º Planta\nCasablanca, Marruecos\n\nTeléfono: +212 5 22 95 39 00\nEmail: info@cpa.ma",
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
        fr: "11. Transferts Internationaux",
        en: "11. International Transfers",
        ar: "11. التحويلات الدولية",
        es: "11. Transferencias Internacionales",
      },
      content: {
        fr: "Si nous transférons vos données personnelles en dehors du Maroc, nous nous assurons que des mesures de protection appropriées sont en place, conformément à la réglementation applicable.",
        en: "If we transfer your personal data outside Morocco, we ensure that appropriate protection measures are in place, in accordance with applicable regulations.",
        ar: "إذا نقلنا بياناتك الشخصية خارج المغرب، فإننا نضمن وجود تدابير حماية مناسبة، وفقًا للوائح المعمول بها.",
        es: "Si transferimos sus datos personales fuera de Marruecos, nos aseguramos de que existan medidas de protección apropiadas, de acuerdo con las regulaciones aplicables.",
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

    contact: {
      title: {
        fr: "14. Nous Contacter",
        en: "14. Contact Us",
        ar: "14. تواصل معنا",
        es: "14. Contáctenos",
      },
      content: {
        fr: "Pour toute question concernant cette politique de confidentialité ou pour exercer vos droits, contactez-nous :",
        en: "For any questions regarding this privacy policy or to exercise your rights, contact us:",
        ar: "لأي سؤال بخصوص سياسة الخصوصية هذه أو لممارسة حقوقك، تواصل معنا:",
        es: "Para cualquier pregunta sobre esta política de privacidad o para ejercer sus derechos, contáctenos:",
      },
      address: {
        fr: "CPA - Conseil et Placement d'Assurances\nAngle Boulevard Moulay Youssef et Boulevard Ziraoui\nComplexe Moulay Youssef Work Center, 2ème Étage\nCasablanca, Maroc",
        en: "CPA - Conseil et Placement d'Assurances\nAngle Boulevard Moulay Youssef and Boulevard Ziraoui\nComplexe Moulay Youssef Work Center, 2nd Floor\nCasablanca, Morocco",
        ar: "CPA - Conseil et Placement d'Assurances\nزاوية شارع الملك يوسف وشارع زراوي\nمجمع العمل مركز الملك يوسف، الطابق الثاني\nالدار البيضاء، المغرب",
        es: "CPA - Conseil et Placement d'Assurances\nEsquina Boulevard Moulay Youssef y Boulevard Ziraoui\nComplejo Moulay Youssef Work Center, 2º Planta\nCasablanca, Marruecos",
      },
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
              <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-foreground mb-4">
                {getText(content.title)}
              </h1>
              <p className="text-xl text-muted-foreground mb-2">
                {getText(content.subtitle)}
              </p>
              <p className="text-sm text-muted-foreground">
                {content.lastUpdate[lang]} : Mars 2024
              </p>
            </div>

            <div className="space-y-8">
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
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {getText(content.dataController.content)}
                </p>
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
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  {getText(content.international.title)}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {getText(content.international.content)}
                </p>
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
