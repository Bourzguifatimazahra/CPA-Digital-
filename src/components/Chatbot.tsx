import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, MessageSquare } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import PromoBanner from "./PromoBanner";

const WHATSAPP_NUMBER = "212522953900";
const WHATSAPP_MESSAGE = "Bonjour, je souhaite avoir plus d'informations sur vos services.";

const openWhatsApp = () => {
  const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, "_blank");
};

// FAQ data structure with multilingual support
interface FAQItem {
  q: { fr: string; en: string; ar: string; es: string };
  a: { fr: string; en: string; ar: string; es: string };
  keywords: { fr: string[]; en: string[]; ar: string[]; es: string[] };
}

const faqData: FAQItem[] = [
  // Concepts généraux / General Concepts
  { q: { fr: "Qu'est-ce que l'assurance ?", en: "What is insurance?", ar: "ما هو التأمين؟", es: "¿Qué es el seguro?" }, a: { fr: "L'assurance est un contrat par lequel une personne se protège contre un risque en échange d'une cotisation.", en: "Insurance is a contract by which a person protects themselves against a risk in exchange for a contribution.", ar: "التأمين عقد يحمي الشخص نفسه من المخاطر مقابل اشتراك.", es: "El seguro es un contrato por el cual una persona se protege contra un riesgo a cambio de una contribución." }, keywords: { fr: ["assurance", "contrat", "protège", "risque"], en: ["insurance", "contract", "protect", "risk"], ar: ["تأمين", "عقد", "حماية", "خطر"], es: ["seguro", "contrato", "protege", "riesgo"] } },
  { q: { fr: "À quoi sert l'assurance ?", en: "What is insurance for?", ar: "ما فائدة التأمين؟", es: "¿Para qué sirve el seguro?" }, a: { fr: "Elle permet de réduire les conséquences financières en cas de sinistre.", en: "It helps reduce financial consequences in case of a claim.", ar: "يساعد في تقليل العواقب المالية في حالة المطالبة.", es: "Ayuda a reducir las consecuencias financieras en caso de siniestro." }, keywords: { fr: ["sert", "conséquences", "financières", "sinistre"], en: ["purpose", "consequences", "financial", "claim"], ar: ["الغرض", "العواقب", "مالية", "مطالبة"], es: ["sirve", "consecuencias", "financieras", "siniestro"] } },
  { q: { fr: "Quelle est la différence entre assureur et courtier ?", en: "What is the difference between insurer and broker?", ar: "ما هو الفرق بين شركة التأمين والوسيط؟", es: "¿Cuál es la diferencia entre aseguradora y corredor?" }, a: { fr: "L'assureur garantit le risque, le courtier conseille et représente le client. CPA est votre courtier de confiance.", en: "The insurer guarantees the risk, the broker advises and represents the client. CPA is your trusted broker.", ar: "شركة التأمين تضمن المخاطر، والوسيط ينصح ويمثل العميل. CPA هو وسيطك الموثوق.", es: "La aseguradora garantiza el riesgo, el corredor asesora y representa al cliente. CPA es su corredor de confianza." }, keywords: { fr: ["différence", "assureur", "courtier", "garantit"], en: ["difference", "insurer", "broker", "guarantee"], ar: ["فرق", "شركة تأمين", "وسيط", "يضمن"], es: ["diferencia", "aseguradora", "corredor", "garantiza"] } },
  { q: { fr: "Qu'est-ce qu'une prime d'assurance ?", en: "What is an insurance premium?", ar: "ما هو قسط التأمين؟", es: "¿Qué es una prima de seguro?" }, a: { fr: "C'est le montant que vous payez pour être assuré. Elle varie selon le type de couverture et le profil de risque.", en: "It's the amount you pay to be insured. It varies depending on the type of coverage and risk profile.", ar: "هو المبلغ الذي تدفعه للتأمين. يختلف حسب نوع التغطية وملف المخاطر.", es: "Es el monto que paga por estar asegurado. Varía según el tipo de cobertura y el perfil de riesgo." }, keywords: { fr: ["prime", "montant", "payez", "assuré"], en: ["premium", "amount", "pay", "insured"], ar: ["قسط", "مبلغ", "تدفع", "مؤمن"], es: ["prima", "monto", "paga", "asegurado"] } },
  { q: { fr: "Qu'est-ce qu'une franchise ?", en: "What is a deductible?", ar: "ما هي франшиза؟", es: "¿Qué es un deducible?" }, a: { fr: "C'est la part du sinistre qui reste à votre charge. Plus la franchise est élevée, plus la prime est basse.", en: "It's the portion of the claim that remains your responsibility. The higher the deductible, the lower the premium.", ar: "إنها حصة المطالبة التي تبقى مسؤوليتك. كلما ارتفعت франшиза، انخفض القسط.", es: "Es la parte del siniestro que corre por su cuenta. Cuanto mayor sea el deducible, menor será la prima." }, keywords: { fr: ["franchise", "charge", "sinistre"], en: ["deductible", "charge", "claim"], ar: ["فرانشيز", "مسؤولية", "مطالبة"], es: ["deducible", "cargo", "siniestro"] } },
  { q: { fr: "Le courtier est-il payant ?", en: "Is the broker paid?", ar: "هل الوسيط مدفوع الأجر؟", es: "¿El corredor es de pago?" }, a: { fr: "Non, sa rémunération est incluse dans la prime d'assurance. Nos services de conseil sont gratuits pour vous.", en: "No, their remuneration is included in the insurance premium. Our advisory services are free for you.", ar: "لا، يتم تضمين أجره في قسط التأمين. خدماتنا الاستشارية مجانية لك.", es: "No, su remuneración está incluida en la prima del seguro. Nuestros servicios de asesoramiento son gratuitos para usted." }, keywords: { fr: ["courtier", "payant", "gratuit", "rémunération"], en: ["broker", "paid", "free", "remuneration"], ar: ["وسيط", "مدفوع", "مجاني", "أجر"], es: ["corredor", "pagado", "gratis", "remuneración"] } },
  
  // Automobile / Auto
  { q: { fr: "L'assurance automobile est-elle obligatoire au Maroc ?", en: "Is auto insurance mandatory in Morocco?", ar: "هل التأمين على السيارات إلزامي في المغرب؟", es: "¿El seguro de auto es obligatorio en Marruecos?" }, a: { fr: "Oui, l'assurance responsabilité civile automobile est obligatoire au Maroc. Elle couvre les dommages causés aux tiers en cas d'accident.", en: "Yes, mandatory auto liability insurance is required in Morocco. It covers damages caused to third parties in case of an accident.", ar: "نعم، التأمين الإلزامي على المسؤولية المدنية للسيارات مطلوب في المغرب. يغطي الأضرار التي تلحق بالأطراف الثالثة في حالة الحادث.", es: "Sí, el seguro obligatorio de responsabilidad civil de auto es obligatorio en Marruecos. Cubre los daños causados a terceros en caso de accidente." }, keywords: { fr: ["automobile", "obligatoire", "maroc", "voiture", "auto"], en: ["auto", "mandatory", "morocco", "car"], ar: ["سيارات", "إلزامي", "المغرب", "سيارة"], es: ["auto", "obligatorio", "marruecos", "coche"] } },
  { q: { fr: "Quelles sont les garanties auto ?", en: "What are the auto coverage options?", ar: "ما هي تغطيات السيارات؟", es: "¿Cuáles son las coberturas de auto?" }, a: { fr: "Nous proposons : responsabilité civile, tous risques, vol, incendie, bris de glace, assistance, protection du conducteur, et dommages collision.", en: "We offer: liability, comprehensive, theft, fire, glass breakage, assistance, driver protection, and collision damage.", ar: "نقدم: المسؤولية المدنية، شاملة، سرقة، حريق، كسر الزجاج، مساعدة، حماية السائق، وأضرار التصادم.", es: "Ofrecemos: responsabilidad civil, todo riesgo, robo, incendio, rotura de cristales, asistencia, protección del conductor y daños por colisión." }, keywords: { fr: ["garanties", "auto", "tous risques", "vol", "incendie"], en: ["coverage", "auto", "comprehensive", "theft", "fire"], ar: ["تغطية", "سيارات", "شامل", "سرقة", "حريق"], es: ["coberturas", "auto", "todo riesgo", "robo", "incendio"] } },
  { q: { fr: "Combien coûte l'assurance auto ?", en: "How much does auto insurance cost?", ar: "كم تكلفة التأمين على السيارات؟", es: "¿Cuánto cuesta el seguro de auto?" }, a: { fr: "Le tarif dépend du véhicule, de votre profil conducteur, de la zone géographique et des garanties choisies. Demandez un devis personnalisé !", en: "The rate depends on the vehicle, your driver profile, geographic area and chosen coverage. Request a personalized quote!", ar: "تعتمد الرسوم على السيارة وملف السائق والمنطقة الجغرافية والتغطيات المختارة. اطلب عرض أسعار مخصص!", es: "La tarifa depende del vehículo, su perfil de conductor, área geográfica y coberturas elegidas. ¡Solicite un presupuesto personalizado!" }, keywords: { fr: ["coût", "prix", "tarif", "auto", "combien"], en: ["cost", "price", "rate", "auto", "how much"], ar: ["تكلفة", "سعر", "رسوم", "سيارات", "كم"], es: ["costo", "precio", "tarifa", "auto", "cuánto"] } },
  { q: { fr: "Comment assurer ma flotte de véhicules ?", en: "How to insure my vehicle fleet?", ar: "كيفية تأمين أسطول السيارات؟", es: "¿Cómo asegurar mi flota de vehículos?" }, a: { fr: "CPA propose des contrats flotte pour les entreprises à partir de 5 véhicules avec des tarifs préférentiels et une gestion simplifiée.", en: "CPA offers fleet contracts for companies starting from 5 vehicles with preferential rates and simplified management.", ar: "تقدم CPA عقود أسطول للشركات ابتداءً من 5 سيارات مع أسعار تفضيلية وإدارة مبسطة.", es: "CPA ofrece contratos de flota para empresas a partir de 5 vehículos con tarifas preferenciales y gestión simplificada." }, keywords: { fr: ["flotte", "véhicules", "entreprise", "parc"], en: ["fleet", "vehicles", "company", "fleet"], ar: ["أسطول", "مركبات", "شركة", "مجموعة"], es: ["flota", "vehículos", "empresa", "parque"] } },

  // Habitation / Home
  { q: { fr: "Pourquoi souscription une assurance habitation ?", en: "Why subscribe to home insurance?", ar: "لماذا الاشتراك في تأمين المنزل؟", es: "¿Por qué suscribir un seguro de hogar?" }, a: { fr: "L'assurance habitation protège votre logement et vos biens contre le vol, l'incendie, les dégâts des eaux, les catastrophes naturelles et la responsabilité civile.", en: "Home insurance protects your home and belongings against theft, fire, water damage, natural disasters and civil liability.", ar: "يغطي تأمين المنزل منزلك وممتلكاتك ضد السرقة والحريق وتلف المياه والكوارث الطبيعية والمسؤولية المدنية.", es: "El seguro de hogar protege su vivienda y sus bienes contra robo, incendio, daños por agua, catástrofes naturales y responsabilidad civil." }, keywords: { fr: ["habitation", "maison", "logement", "domicile"], en: ["home", "house", "housing", "residence"], ar: ["منزل", "بيت", "سكن", "إقامة"], es: ["hogar", "casa", "alojamiento", "domicilio"] } },
  
  // Santé / Health
  { q: { fr: "Comment fonctionne l'assurance santé ?", en: "How does health insurance work?", ar: "كيف يعمل التأمين الصحي؟", es: "¿Cómo funciona el seguro de salud?" }, a: { fr: "L'assurance santé rembourse vos frais médicaux (consultations, hospitalisations, médicaments, optique, dentaire) selon les barèmes de votre contrat.", en: "Health insurance reimburses your medical expenses (consultations, hospitalizations, medications, optical, dental) according to your contract rates.", ar: "يعيد التأمين الصحي تعويض نفقاتك الطبية (الاستشارات، المستشفى، الأدوية، البصريات، طب الأسنان) وفق أسعار عقدك.", es: "El seguro de salud reembolsa sus gastos médicos (consultas, hospitalizaciones, medicamentos, óptica, dental) según las tarifas de su contrato." }, keywords: { fr: ["santé", "médical", "remboursement", "maladie", "soin"], en: ["health", "medical", "reimbursement", "illness", "care"], ar: ["صحة", "طبي", "تعويض", "مرض", "رعاية"], es: ["salud", "médico", "reembolso", "enfermedad", "cuidado"] } },
  { q: { fr: "Proposez-vous une assurance santé groupe ?", en: "Do you offer group health insurance?", ar: "هل تقدمون تأمين صحي جماعي؟", es: "¿Ofrecen seguro de salud grupal?" }, a: { fr: "Oui, nous proposons des contrats santé groupe pour les entreprises couvrant les employés et leurs familles avec des tarifs avantageux.", en: "Yes, we offer group health contracts for companies covering employees and their families with advantageous rates.", ar: "نعم، نقدم عقود صحية جماعية للشركات تغطي الموظفين وعائلاتهم بأسعار مميزة.", es: "Sí, ofrecemos contratos de salud grupal para empresas que cubren a los empleados y sus familias con tarifas ventajosas." }, keywords: { fr: ["groupe", "entreprise", "employés", "collectif"], en: ["group", "company", "employees", "collective"], ar: ["جماعي", "شركة", "موظفين", "جماعي"], es: ["grupo", "empresa", "empleados", "colectivo"] } },

  // Sinistres / Claims
  { q: { fr: "Qu'est-ce qu'un sinistre ?", en: "What is a claim?", ar: "ما هي المطالبة؟", es: "¿Qué es un siniestro?" }, a: { fr: "C'est la réalisation du risque assuré : accident, vol, incendie, dégât des eaux, etc.", en: "It's the occurrence of the insured risk: accident, theft, fire, water damage, etc.", ar: "إنها حدوث الخطر المؤمن عليه: حادث، سرقة، حريق، تلف المياه، إلخ.", es: "Es la ocurrencia del riesgo asegurado: accidente, robo, incendio, daños por agua, etc." }, keywords: { fr: ["sinistre", "réalisation", "accident"], en: ["claim", "occurrence", "accident"], ar: ["مطالبة", "وقوع", "حادث"], es: ["siniestro", "ocurrencia", "accidente"] } },
  { q: { fr: "Quand déclarer un sinistre ?", en: "When to report a claim?", ar: "متى يجب الإبلاغ عن مطالبة؟", es: "¿Cuándo denunciar un siniestro?" }, a: { fr: "Dans les 5 jours ouvrables à compter du moment où vous en avez connaissance. Pour un vol, le délai est de 48 heures.", en: "Within 5 working days from when you become aware. For theft, the deadline is 48 hours.", ar: "خلال 5 أيام عمل من علمك بالأمر. في حالة السرقة، المهلة 48 ساعة.", es: "Dentro de los 5 días hábiles desde que tenga conocimiento. Para robo, el plazo es de 48 horas." }, keywords: { fr: ["déclarer", "sinistre", "délai", "jours"], en: ["report", "claim", "deadline", "days"], ar: ["إبلاغ", "مطالبة", "مهلة", "أيام"], es: ["denunciar", "siniestro", "plazo", "días"] } },
  { q: { fr: "Comment déclarer un sinistre ?", en: "How to report a claim?", ar: "كيفية الإبلاغ عن مطالبة؟", es: "¿Cómo denunciar un siniestro?" }, a: { fr: "Contactez-nous au +212 5 22 95 39 00 ou envoyez un email à info@cpa.ma avec les détails et les justificatifs.", en: "Contact us at +212 5 22 95 39 00 or send an email to info@cpa.ma with the details and supporting documents.", ar: "اتصل بنا على +212 5 22 95 39 00 أو أرسل بريدًا إلكترونيًا إلى info@cpa.ma مع التفاصيل والمستندات الداعمة.", es: "Contáctenos al +212 5 22 95 39 00 o envíe un correo electrónico a info@cpa.ma con los detalles y documentos de respaldo." }, keywords: { fr: ["comment", "déclarer", "procédure"], en: ["how", "report", "procedure"], ar: ["كيف", "إبلاغ", "إجراء"], es: ["cómo", "denunciar", "procedimiento"] } },

  // CPA
  { q: { fr: "Qui êtes-vous ?", en: "Who are you?", ar: "من أنتم؟", es: "¿Quiénes son?" }, a: { fr: "Nous sommes CPA (Conseil et Placement d'Assurances), un cabinet de courtage en assurances spécialisé dans l'accompagnement des particuliers et des entreprises depuis 1957 à Casablanca.", en: "We are CPA (Conseil et Placement d'Assurances), an insurance brokerage firm specialized in supporting individuals and businesses since 1957 in Casablanca.", ar: "نحن CPA (Conseil et Placement d'Assurances)، مكتب وساطة تأمين متخصص في مرافقة الأفراد والشركات منذ 1957 في الدار البيضاء.", es: "Somos CPA (Conseil et Placement d'Assurances), una correduría de seguros especializada en apoyar a particulares y empresas desde 1957 en Casablanca." }, keywords: { fr: ["qui", "êtes", "cpa", "présentation"], en: ["who", "are", "cpa", "presentation"], ar: ["من", "أنتم", "cpa", "تعريف"], es: ["quién", "son", "cpa", "presentación"] } },
  { q: { fr: "Quelles assurances proposez-vous ?", en: "What insurance do you offer?", ar: "ما هي التأمينات التي تقدمونها؟", es: "¿Qué seguros ofrecen?" }, a: { fr: "Nous proposons : Auto, Habitation, Santé, Prévoyance, Épargne, Accidents de Travail, Responsabilité Civile, Construction, Transport Maritime, Cyber Risques, Flotte Auto, Trottinette Électrique et Animaux de Compagnie.", en: "We offer: Auto, Home, Health, Foresight, Savings, Work Accidents, Civil Liability, Construction, Maritime Transport, Cyber Risks, Auto Fleet, Electric Scooter and Pet Insurance.", ar: "نقدم: السيارات، المنزل، الصحة، التأمين التكميلي، الادخار، حوادث العمل، المسؤولية المدنية، البناء، النقل البحري، مخاطر الإنترنت، أسطول السيارات، السكوتر الكهربائي وتأمين الحيوانات الأليفة.", es: "Ofrecemos: Auto, Hogar, Salud, Previsión, Ahorro, Accidentes Laborales, Responsabilidad Civil, Construcción, Transporte Marítimo, Riesgos Cibernéticos, Flota de Autos, Patinete Eléctrico y Seguro de Mascotas." }, keywords: { fr: ["proposez", "services", "offres", "produits", "assurances"], en: ["offer", "services", "products", "insurance"], ar: ["نقدم", "خدمات", "عروض", "منتجات", "تأمين"], es: ["ofrecen", "servicios", "ofertas", "productos", "seguros"] } },
  { q: { fr: "Pourquoi passer par un courtier ?", en: "Why use a broker?", ar: "لماذا الاستفادة من وسيط؟", es: "¿Por qué usar un corredor?" }, a: { fr: "Pour comparer les offres de plusieurs compagnies, négocier les meilleurs tarifs, bénéficier d'un accompagnement personnalisé et d'un suivi des sinistres.", en: "To compare offers from several companies, negotiate the best rates, benefit from personalized support and claim follow-up.", ar: "لمقارنة عروض عدة شركات، التفاوض على أفضل الأسعار، الاستفادة من الدعم الشخصي ومتابعة المطالبات.", es: "Para comparar ofertas de varias compañías, negociar las mejores tarifas, beneficiarse de acompañamiento personalizado y seguimiento de siniestros." }, keywords: { fr: ["pourquoi", "courtier", "avantage", "intérêt"], en: ["why", "broker", "advantage", "benefit"], ar: ["لماذا", "وسيط", "ميزة", "فائدة"], es: ["por qué", "corredor", "ventaja", "interés"] } },
  { q: { fr: "Quels sont vos horaires ?", en: "What are your hours?", ar: "ما هي ساعات عملكم؟", es: "¿Cuáles son sus horarios?" }, a: { fr: "Du lundi au vendredi, de 8h30 à 18h00. Nous sommes également joignables par email 24h/24.", en: "Monday to Friday, from 8:30 AM to 6:00 PM. We are also reachable by email 24/7.", ar: "من الاثنين إلى الجمعة، من 8:30 إلى 18:00. يمكن أيضًا التواصل معنا عبر البريد الإلكتروني على مدار الساعة.", es: "De lunes a viernes, de 8:30 a 18:00. También puede contactarnos por correo electrónico las 24 horas." }, keywords: { fr: ["horaires", "heures", "ouverture", "disponible"], en: ["hours", "opening", "available"], ar: ["ساعات", "فتح", "متاح"], es: ["horarios", "apertura", "disponible"] } },
  { q: { fr: "Quelles sont vos valeurs ?", en: "What are your values?", ar: "ما هي قيمكم؟", es: "¿Cuáles son sus valores?" }, a: { fr: "La proximité, l'innovation, la performance et l'éthique. Depuis 1957, nous plaçons le client au cœur de nos préoccupations.", en: "Proximity, innovation, performance and ethics. Since 1957, we place the client at the heart of our concerns.", ar: "القرب، الابتكار، الأداء والأخلاق. منذ 1957، نضع العميل في صميم اهتماماتنا.", es: "Proximidad, innovación, rendimiento y ética. Desde 1957, colocamos al cliente en el centro de nuestras preocupaciones." }, keywords: { fr: ["valeurs", "engagement", "philosophie"], en: ["values", "commitment", "philosophy"], ar: ["قيم", "التزام", "فلسفة"], es: ["valores", "compromiso", "filosofía"] } },
  { q: { fr: "Comment obtenir un devis ?", en: "How to get a quote?", ar: "كيفية الحصول على عرض أسعار؟", es: "¿Cómo obtener un presupuesto?" }, a: { fr: "Appelez-nous au +212 5 22 95 39 00, envoyez un email à info@cpa.ma, ou remplissez le formulaire de contact sur notre site. Vous pouvez aussi utiliser notre estimateur de devis en ligne !", en: "Call us at +212 5 22 95 39 00, send an email to info@cpa.ma, or fill out the contact form on our website. You can also use our online quote estimator!", ar: "اتصل بنا على +212 5 22 95 39 00 أو أرسل بريدًا إلكترونيًا إلى info@cpa.ma أو املأ نموذج الاتصال على موقعنا. يمكنك أيضًا استخدام أداة تقدير العرض عبر الإنترنت!", es: "Llámenos al +212 5 22 95 39 00, envíe un correo a info@cpa.ma, o complete el formulario de contacto en nuestro sitio. ¡También puede usar nuestro estimador de presupuesto en línea!" }, keywords: { fr: ["devis", "estimation", "tarif", "prix"], en: ["quote", "estimate", "rate", "price"], ar: ["عرض أسعار", "تقدير", "رسوم", "سعر"], es: ["presupuesto", "estimación", "tarifa", "precio"] } },
  { q: { fr: "Où êtes-vous situés ?", en: "Where are you located?", ar: "أين موقعكم؟", es: "¿Dónde están ubicados?" }, a: { fr: "Notre siège est à Casablanca, Maroc. Adresse : Casablanca, Maroc. Téléphone : +212 5 22 95 39 00.", en: "Our headquarters is in Casablanca, Morocco. Address: Casablanca, Morocco. Phone: +212 5 22 95 39 00.", ar: "مقرنا في الدار البيضاء، المغرب. العنوان: الدار البيضاء، المغرب. الهاتف: +212 5 22 95 39 00.", es: "Nuestra sede está en Casablanca, Marruecos. Dirección: Casablanca, Marruecos. Teléfono: +212 5 22 95 39 00." }, keywords: { fr: ["adresse", "situés", "localisation", "bureau", "siège"], en: ["address", "located", "location", "office", "headquarters"], ar: ["عنوان", "موقع", "مكتب", "مقر"], es: ["dirección", "ubicados", "ubicación", "oficina", "sede"] } },

  // Entreprises / Business
  { q: { fr: "Proposez-vous des assurances pour les entreprises ?", en: "Do you offer insurance for businesses?", ar: "هل تقدمون التأمين للشركات؟", es: "¿Ofrecen seguros para empresas?" }, a: { fr: "Oui, nous proposons une gamme complète : Responsabilité Civile, Accidents de Travail, Risques Techniques, Dommage aux Biens, Perte d'Exploitation, Transport, Construction, Cyber Risques et Épargne Vie.", en: "Yes, we offer a complete range: Civil Liability, Work Accidents, Technical Risks, Property Damage, Business Interruption, Transport, Construction, Cyber Risks and Life Savings.", ar: "نعم، نقدم مجموعة كاملة: المسؤولية المدنية، حوادث العمل، المخاطر التقنية، أضرار الممتلكات، فقدان الأرباح، النقل، البناء، مخاطر الإنترنت والادخار على الحياة.", es: "Sí, ofrecemos una gama completa: Responsabilidad Civil, Accidentes Laborales, Riesgos Técnicos, Daños a Bienes, Pérdida de Explotación, Transporte, Construcción, Riesgos Cibernéticos y Ahorro Vida." }, keywords: { fr: ["entreprise", "professionnel", "société", "commercial"], en: ["business", "professional", "company", "commercial"], ar: ["شركة", "محترف", "مؤسسة", "تجاري"], es: ["empresa", "profesional", "sociedad", "comercial"] } },
  { q: { fr: "Qu'est-ce que l'assurance responsabilité civile ?", en: "What is civil liability insurance?", ar: "ما هو تأمين المسؤولية المدنية؟", es: "¿Qué es el seguro de responsabilidad civil?" }, a: { fr: "Elle couvre les dommages (corporels, matériels, immatériels) que vous ou votre entreprise pourriez causer à des tiers dans le cadre de votre activité.", en: "It covers damages (physical, material, intangible) that you or your company could cause to third parties in the course of your activity.", ar: "يغطي الأضرار (الجسدية، المادية، غير المادية) التي قد تسببها أنت أو شركتك لأطراف ثالثة في إطار نشاطك.", es: "Cubre los daños (corporales, materiales, inmateriales) que usted o su empresa puedan causar a terceros en el marco de su actividad." }, keywords: { fr: ["responsabilité", "civile", "dommages", "tiers"], en: ["liability", "civil", "damages", "third parties"], ar: ["مسؤولية", "مدنية", "أضرار", "أطراف ثالثة"], es: ["responsabilidad", "civil", "daños", "terceros"] } },
  { q: { fr: "Qu'est-ce que l'assurance accidents de travail ?", en: "What is work accident insurance?", ar: "ما هو تأمين حوادث العمل؟", es: "¿Qué es el seguro de accidentes laborales?" }, a: { fr: "C'est une assurance obligatoire qui protège vos employés en cas d'accident survenu sur le lieu de travail ou durant le trajet.", en: "It's mandatory insurance that protects your employees in case of an accident occurring at the workplace or during the commute.", ar: "إنه تأمين إلزامي يحمي موظفيك في حالة وقوع حادث في مكان العمل أو خلال التنقل.", es: "Es un seguro obligatorio que protege a sus empleados en caso de accidente ocurrido en el lugar de trabajo o durante el trayecto." }, keywords: { fr: ["accidents", "travail", "employés", "obligatoire"], en: ["accidents", "work", "employees", "mandatory"], ar: ["حوادث", "عمل", "موظفين", "إلزامي"], es: ["accidentes", "trabajo", "empleados", "obligatorio"] } },
  { q: { fr: "Qu'est-ce que l'assurance cyber risques ?", en: "What is cyber risk insurance?", ar: "ما هو تأمين مخاطر الإنترنت؟", es: "¿Qué es el seguro de riesgos cibernéticos?" }, a: { fr: "Elle protège votre entreprise contre les cyberattaques : piratage, vol de données, ransomware, interruption d'activité liée au numérique.", en: "It protects your business against cyberattacks: hacking, data theft, ransomware, digital activity interruption.", ar: "تحمي شركتك من الهجمات الإلكترونية: القرصنة، سرقة البيانات، برامج الفدية، انقطاع النشاط الرقمي.", es: "Protege su empresa contra ciberataques: piratería, robo de datos, ransomware, interrupción de actividad digital." }, keywords: { fr: ["cyber", "numérique", "piratage", "données", "hacking"], en: ["cyber", "digital", "hacking", "data", "ransomware"], ar: ["سيبراني", "رقمي", "قرصنة", "بيانات", "اختراق"], es: ["ciber", "digital", "hacking", "datos", "ransomware"] } },

  // Nouveautés / New Products
  { q: { fr: "Qu'est-ce que l'assurance trottinette électrique ?", en: "What is electric scooter insurance?", ar: "ما هو تأمين السكوتر الكهربائي؟", es: "¿Qué es el seguro de patinete eléctrico?" }, a: { fr: "C'est une assurance spécialement conçue pour les utilisateurs de trottinettes électriques. Elle couvre la responsabilité civile, le vol, les dommages matériels et la protection du conducteur.", en: "It's insurance specially designed for electric scooter users. It covers civil liability, theft, material damage and driver protection.", ar: "إنه تأمين مصمم خصيصًا لمستخدمي السكوتر الكهربائي. يغطي المسؤولية المدنية والسرقة والأضرار المادية وحماية السائق.", es: "Es un seguro especialmente diseñado para usuarios de patinetes eléctricos. Cubre responsabilidad civil, robo, daños materiales y protección del conductor." }, keywords: { fr: ["trottinette", "électrique", "mobilité", "edpm"], en: ["scooter", "electric", "mobility", "edpm"], ar: ["سكوتر", "كهربائي", "تنقل", "edpm"], es: ["patinete", "eléctrico", "movilidad", "edpm"] } },
  { q: { fr: "Qu'est-ce que l'assurance animaux de compagnie ?", en: "What is pet insurance?", ar: "ما هو تأمين الحيوانات الأليفة؟", es: "¿Qué es el seguro de mascotas?" }, a: { fr: "Elle couvre les frais vétérinaires de vos animaux (chien, chat) en cas de maladie ou d'accident : consultations, chirurgie, hospitalisation et médicaments.", en: "It covers veterinary expenses for your pets (dog, cat) in case of illness or accident: consultations, surgery, hospitalization and medications.", ar: "تغطي نفقات البيطرية لحيواناتك الأليفة (كلب، قطة) في حالة المرض أو الحادث: الاستشارات، الجراحة، المستشفى والأدوية.", es: "Cubre los gastos veterinarios de sus mascotas (perro, gato) en caso de enfermedad o accidente: consultas, cirugía, hospitalización y medicamentos." }, keywords: { fr: ["animaux", "compagnie", "chien", "chat", "vétérinaire", "animal"], en: ["pets", "companion", "dog", "cat", "veterinary", "animal"], ar: ["حيوانات", "رفقة", "كلب", "قطة", "بيطري", "حيوان"], es: ["mascotas", "compañía", "perro", "gato", "veterinario", "animal"] } },
  
  // Paiement / Payment
  { q: { fr: "Comment payer ma prime d'assurance ?", en: "How to pay my insurance premium?", ar: "كيفية دفع قسط التأمين؟", es: "¿Cómo pagar mi prima de seguro?" }, a: { fr: "Vous pouvez payer par virement bancaire, chèque, ou carte bancaire. Des facilités de paiement sont possibles selon le contrat.", en: "You can pay by bank transfer, check, or credit card. Payment facilities are available depending on the contract.", ar: "يمكنك الدفع عن طريق التحويل البنكي أو الشيك أو بطاقة الائتمان. تسهيلات الدفع متاحة حسب العقد.", es: "Puede pagar mediante transferencia bancaria, cheque o tarjeta de crédito. Hay facilidades de pago disponibles según el contrato." }, keywords: { fr: ["payer", "paiement", "règlement", "carte", "virement"], en: ["pay", "payment", "settlement", "card", "transfer"], ar: ["دفع", "مالية", "تسوية", "بطاقة", "تحويل"], es: ["pagar", "pago", "liquidación", "tarjeta", "transferencia"] } },
  { q: { fr: "Peut-on résilier un contrat d'assurance ?", en: "Can you cancel an insurance contract?", ar: "هل يمكن إلغاء عقد التأمين؟", es: "¿Se puede rescindir un contrato de seguro?" }, a: { fr: "Oui, vous pouvez résilier votre contrat à l'échéance annuelle avec un préavis (généralement 2 mois). Des cas de résiliation anticipée existent aussi.", en: "Yes, you can cancel your contract at the annual expiry with notice (usually 2 months). Early cancellation cases also exist.", ar: "نعم، يمكنك إلغاء عقدك عند انتهاء الصلاحية السنوية مع إشعار (عادةً شهرين). توجد أيضًا حالات إلغاء مبكر.", es: "Sí, puede rescindir su contrato en el vencimiento anual con preaviso (generalmente 2 meses). También existen casos de rescisión anticipada." }, keywords: { fr: ["résilier", "résiliation", "annuler", "arrêter"], en: ["cancel", "termination", "annul", "stop"], ar: ["إلغاء", "فسخ", "إبطال", "توقيف"], es: ["rescindir", "rescisión", "anular", "parar"] } },
  { q: { fr: "Comment renouveler mon contrat ?", en: "How to renew my contract?", ar: "كيفية تجديد عقدي؟", es: "¿Cómo renovar mi contrato?" }, a: { fr: "Votre contrat se renouvelle automatiquement à l'échéance. Notre équipe vous contacte avant pour ajuster les garanties si nécessaire.", en: "Your contract automatically renews at expiry. Our team contacts you before to adjust coverage if necessary.", ar: "يتم تجديد عقدك تلقائيًا عند انتهاء الصلاحية. يتواصل فريقنا معك قبل ذلك لتعديل التغطيات إذا لزم الأمر.", es: "Su contrato se renueva automáticamente al vencimiento. Nuestro equipo le contacta antes para ajustar las coberturas si es necesario." }, keywords: { fr: ["renouveler", "renouvellement", "échéance"], en: ["renew", "renewal", "expiry"], ar: ["تجديد", "تجديد", "انتهاء"], es: ["renovar", "renovación", "vencimiento"] } },
  
  // Partenaires / Partners
  { q: { fr: "Avec quelles compagnies travaillez-vous ?", en: "Which companies do you work with?", ar: "مع أي شركات تعملون؟", es: "¿Con qué compañías trabajan?" }, a: { fr: "Nous travaillons avec les meilleures compagnies du marché : Allianz, AXA, Wafa Assurance, RMA, Sanlam, AtlantaSanad, La Marocaine Vie, et bien d'autres.", en: "We work with the best companies in the market: Allianz, AXA, Wafa Assurance, RMA, Sanlam, AtlantaSanad, La Marocaine Vie, and many more.", ar: "نعمل مع أفضل الشركات في السوق: أليانز، AXA، وفاء للتأمين، RMA، سانلام، أتلانتا صد، الشركة المغربية للحياة، وغيرها الكثير.", es: "Trabajamos con las mejores compañías del mercado: Allianz, AXA, Wafa Assurance, RMA, Sanlam, AtlantaSanad, La Marocaine Vie, y muchas más." }, keywords: { fr: ["compagnies", "partenaires", "allianz", "axa", "wafa"], en: ["companies", "partners", "allianz", "axa", "wafa"], ar: ["شركات", "شركاء", "أليانز", "axa", "وفاء"], es: ["compañías", "socios", "allianz", "axa", "wafa"] } },
];

type Message = { role: "bot" | "user"; text: string };

const getContextualSuggestions = (lastMessage: string, lang: string): string[] => {
  const msg = lastMessage.toLowerCase();
  
  if (msg.includes("auto") || msg.includes("voiture") || msg.includes("véhicule") || msg.includes("car") || msg.includes("vehicule") || msg.includes("coche") || msg.includes("سيارة") || msg.includes("automobile")) {
    return [
      lang === "fr" ? "Quelles sont les garanties auto ?" : 
      lang === "en" ? "What are auto coverage options?" :
      lang === "ar" ? "ما هي تغطيات السيارات؟" :
      "¿Cuáles son las coberturas de auto?",
      lang === "fr" ? "Combien coûte l'assurance auto ?" :
      lang === "en" ? "How much does auto insurance cost?" :
      lang === "ar" ? "كم تكلفة التأمين على السيارات؟" :
      "¿Cuánto cuesta el seguro de auto?",
      lang === "fr" ? "Comment assurer ma flotte ?" :
      lang === "en" ? "How to insure my fleet?" :
      lang === "ar" ? "كيفية تأمين أسطولي؟" :
      "¿Cómo asegurar mi flota?",
      lang === "fr" ? "Comment déclarer un sinistre ?" :
      lang === "en" ? "How to report a claim?" :
      lang === "ar" ? "كيفية الإبلاغ عن مطالبة؟" :
      "¿Cómo denunciar un siniestro?"
    ];
  }
  if (msg.includes("santé") || msg.includes("médical") || msg.includes("maladie") || msg.includes("health") || msg.includes("médico") || msg.includes("enfermedad") || msg.includes("صحة") || msg.includes("طبي")) {
    return [
      lang === "fr" ? "Comment fonctionne l'assurance santé ?" :
      lang === "en" ? "How does health insurance work?" :
      lang === "ar" ? "كيف يعمل التأمين الصحي؟" :
      "¿Cómo funciona el seguro de salud?",
      lang === "fr" ? "Proposez-vous une assurance santé groupe ?" :
      lang === "en" ? "Do you offer group health insurance?" :
      lang === "ar" ? "هل تقدمون تأمين صحي جماعي؟" :
      "¿Ofrecen seguro de salud grupal?",
      lang === "fr" ? "Comment obtenir un devis ?" :
      lang === "en" ? "How to get a quote?" :
      lang === "ar" ? "كيفية الحصول على عرض أسعار؟" :
      "¿Cómo obtener un presupuesto?"
    ];
  }
  if (msg.includes("entreprise") || msg.includes("professionnel") || msg.includes("société") || msg.includes("business") || msg.includes("compañía") || msg.includes("empresa") || msg.includes("شركة") || msg.includes("مؤسسة")) {
    return [
      lang === "fr" ? "Assurances pour les entreprises ?" :
      lang === "en" ? "Insurance for businesses?" :
      lang === "ar" ? "تأمين للشركات؟" :
      "¿Seguros para empresas?",
      lang === "fr" ? "Assurance cyber risques ?" :
      lang === "en" ? "Cyber risk insurance?" :
      lang === "ar" ? "تأمين مخاطر الإنترنت؟" :
      "¿Seguro de riesgos cibernéticos?",
      lang === "fr" ? "Assurance accidents de travail ?" :
      lang === "en" ? "Work accident insurance?" :
      lang === "ar" ? "تأمين حوادث العمل؟" :
      "¿Seguro de accidentes laborales?",
      lang === "fr" ? "Comment obtenir un devis ?" :
      lang === "en" ? "How to get a quote?" :
      lang === "ar" ? "كيفية الحصول على عرض أسعار؟" :
      "¿Cómo obtener un presupuesto?"
    ];
  }
  if (msg.includes("sinistre") || msg.includes("accident") || msg.includes("déclar") || msg.includes("claim") || msg.includes("siniestro") || msg.includes("accidente") || msg.includes("مطالبة") || msg.includes("حادث")) {
    return [
      lang === "fr" ? "Quand déclarer un sinistre ?" :
      lang === "en" ? "When to report a claim?" :
      lang === "ar" ? "متى يجب الإبلاغ عن مطالبة؟" :
      "¿Cuándo denunciar un siniestro?",
      lang === "fr" ? "Comment déclarer un sinistre ?" :
      lang === "en" ? "How to report a claim?" :
      lang === "ar" ? "كيفية الإبلاغ عن مطالبة؟" :
      "¿Cómo denunciar un siniestro?",
      lang === "fr" ? "Qu'est-ce qu'une franchise ?" :
      lang === "en" ? "What is a deductible?" :
      lang === "ar" ? "ما هي франшиза؟" :
      "¿Qué es un deducible?"
    ];
  }
  if (msg.includes("trottinette") || msg.includes("animaux") || msg.includes("nouveau") || msg.includes("scooter") || msg.includes("patinete") || msg.includes("pets") || msg.includes("mascota") || msg.includes("سكوتر") || msg.includes("حيوانات")) {
    return [
      lang === "fr" ? "Assurance trottinette électrique ?" :
      lang === "en" ? "Electric scooter insurance?" :
      lang === "ar" ? "تأمين السكوتر الكهربائي؟" :
      "¿Seguro de patinete eléctrico?",
      lang === "fr" ? "Assurance animaux de compagnie ?" :
      lang === "en" ? "Pet insurance?" :
      lang === "ar" ? "تأمين الحيوانات الأليفة؟" :
      "¿Seguro de mascotas?",
      lang === "fr" ? "Quelles assurances proposez-vous ?" :
      lang === "en" ? "What insurance do you offer?" :
      lang === "ar" ? "ما هي التأمينات التي تقدمونها؟" :
      "¿Qué seguros ofrecen?"
    ];
  }
  if (msg.includes("prix") || msg.includes("devis") || msg.includes("tarif") || msg.includes("coût") || msg.includes("price") || msg.includes("quote") || msg.includes("presupuesto") || msg.includes("tarifa") || msg.includes("سعر") || msg.includes("عرض")) {
    return [
      lang === "fr" ? "Comment obtenir un devis ?" :
      lang === "en" ? "How to get a quote?" :
      lang === "ar" ? "كيفية الحصول على عرض أسعار؟" :
      "¿Cómo obtener un presupuesto?",
      lang === "fr" ? "Comment payer ma prime ?" :
      lang === "en" ? "How to pay my premium?" :
      lang === "ar" ? "كيفية دفع قسط التأمين؟" :
      "¿Cómo pagar mi prima?",
      lang === "fr" ? "Quelles assurances proposez-vous ?" :
      lang === "en" ? "What insurance do you offer?" :
      lang === "ar" ? "ما هي التأمينات التي تقدمونها؟" :
      "¿Qué seguros ofrecen?"
    ];
  }
  
  // Default suggestions
  return [
    lang === "fr" ? "Quelles assurances proposez-vous ?" :
    lang === "en" ? "What insurance do you offer?" :
    lang === "ar" ? "ما هي التأمينات التي تقدمونها؟" :
    "¿Qué seguros ofrecen?",
    lang === "fr" ? "Comment obtenir un devis ?" :
    lang === "en" ? "How to get a quote?" :
    lang === "ar" ? "كيفية الحصول على عرض أسعار؟" :
    "¿Cómo obtener un presupuesto?",
    lang === "fr" ? "Qui êtes-vous ?" :
    lang === "en" ? "Who are you?" :
    lang === "ar" ? "من أنتم؟" :
    "¿Quiénes son?",
    lang === "fr" ? "Quels sont vos horaires ?" :
    lang === "en" ? "What are your hours?" :
    lang === "ar" ? "ما هي ساعات عملكم؟" :
    "¿Cuáles son sus horarios?"
  ];
};

const Chatbot = () => {
  const { t, lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: t("chat_greeting") },
  ]);
  const [input, setInput] = useState("");
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>([
    t("chat_suggestion_1"),
    t("chat_suggestion_2"),
    t("chat_suggestion_3"),
    t("chat_suggestion_4")
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Update suggestions when language changes
  useEffect(() => {
    setCurrentSuggestions([
      t("chat_suggestion_1"),
      t("chat_suggestion_2"),
      t("chat_suggestion_3"),
      t("chat_suggestion_4")
    ]);
  }, [lang, t]);

  const findAnswer = (question: string): string => {
    const q = question.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    // Try exact keyword matching with scoring
    let bestMatch: { faq: FAQItem; score: number } | null = null;
    
    for (const faq of faqData) {
      let score = 0;
      const keywords = faq.keywords[lang as keyof typeof faq.keywords] || faq.keywords.fr;
      for (const keyword of keywords) {
        const normalizedKeyword = keyword.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (q.includes(normalizedKeyword)) {
          score += normalizedKeyword.length; // longer keyword matches are more relevant
        }
      }
      if (score > 0 && (!bestMatch || score > bestMatch.score)) {
        bestMatch = { faq, score };
      }
    }
    
    if (bestMatch) {
      return bestMatch.faq.a[lang as keyof typeof bestMatch.faq.a] || bestMatch.faq.a.fr;
    }
    
    return t("chat_no_answer");
  };

  const handleSend = (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;
    setMessages((prev) => [...prev, { role: "user", text: msg }]);
    setInput("");
    setTimeout(() => {
      const answer = findAnswer(msg);
      setMessages((prev) => [...prev, { role: "bot", text: answer }]);
      setCurrentSuggestions(getContextualSuggestions(msg, lang));
    }, 600);
  };

  return (
    <>
      <motion.button
        onClick={openWhatsApp}
        className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center cpa-shadow-lg hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        title={t("chat_whatsapp") || "Contacter via WhatsApp"}
      >
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </motion.button>

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
            {/* Promotional Banner */}
            <PromoBanner autoRotate={true} rotationInterval={5000} />
            
            <div className="cpa-gradient-bg px-5 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-primary-foreground text-sm">{t("chat_assistant_title")}</h4>
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

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
