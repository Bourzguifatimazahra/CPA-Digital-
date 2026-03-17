export type Lang = "fr" | "en" | "ar" | "es";

export const translations = {
  // Navbar
  nav_home: { fr: "Accueil", en: "Home", ar: "الرئيسية", es: "Inicio" },
  nav_about: { fr: "À Propos", en: "About", ar: "من نحن", es: "Acerca de" },
  nav_who: { fr: "Qui Sommes-nous", en: "Who We Are", ar: "من نحن", es: "Quiénes Somos" },
  nav_values: { fr: "Nos Valeurs", en: "Our Values", ar: "قيمنا", es: "Nuestros Valores" },
  nav_individuals: { fr: "Particuliers", en: "Individuals", ar: "الأفراد", es: "Particulares" },
  nav_auto: { fr: "Assurance Automobile", en: "Auto Insurance", ar: "تأمين السيارات", es: "Seguro de Auto" },
  nav_moto: { fr: "Assurance Moto", en: "Motorcycle Insurance", ar: "تأمين الدراجات", es: "Seguro de Moto" },
  nav_home_ins: { fr: "Multirisques Habitation", en: "Home Insurance", ar: "تأمين المنزل", es: "Seguro del Hogar" },
  nav_health: { fr: "Santé", en: "Health", ar: "الصحة", es: "Salud" },
  nav_savings: { fr: "Épargne", en: "Savings", ar: "الادخار", es: "Ahorro" },
  nav_prevoyance: { fr: "Prévoyance", en: "Foresight", ar: "التأمين التكميلي", es: "Previsión" },
  nav_retraite: { fr: "Retraite Capitalisation", en: "Retirement Savings", ar: "التقاعد", es: "Jubilación" },
  nav_responsabilite: { fr: "Responsabilité", en: "Liability", ar: "المسؤولية", es: "Responsabilidad" },
  nav_assistance: { fr: "Assistance / Voyage", en: "Assistance / Travel", ar: "المساعدة / السفر", es: "Asistencia / Viaje" },
  nav_individuelle: { fr: "Individuelle Accident", en: "Individual Accident", ar: "حوادث فردية", es: "Accidente Individual" },
  nav_deces: { fr: "Décès", en: "Death", ar: "الوفاة", es: "Fallecimiento" },
  nav_maladie_ind: { fr: "Maladie Individuelle", en: "Individual Illness", ar: "مرض فردي", es: "Enfermedad Individual" },
  nav_pack_sante: { fr: "Pack Santé Monde", en: "World Health Pack", ar: "باقة الصحة العالمية", es: "Pack Salud Mundial" },
  nav_vehicules: { fr: "Véhicules", en: "Vehicles", ar: "المركبات", es: "Vehículos" },
  nav_business: { fr: "Entreprises", en: "Business", ar: "الشركات", es: "Empresas" },
  nav_at: { fr: "Accidents de Travail", en: "Work Accidents", ar: "حوادث العمل", es: "Accidentes Laborales" },
  nav_rc: { fr: "Responsabilité Civile", en: "Civil Liability", ar: "المسؤولية المدنية", es: "Responsabilidad Civil" },
  nav_rc_pro: { fr: "RC Professionnelle", en: "Professional Liability", ar: "المسؤولية المهنية", es: "RC Profesional" },
  nav_rc_scolaire: { fr: "RC Scolaire", en: "School Liability", ar: "المسؤولية المدرسية", es: "RC Escolar" },
  nav_rc_decennale: { fr: "RC Décennale", en: "Decennial Liability", ar: "المسؤولية العشرية", es: "RC Decenal" },
  nav_rc_mandataire: { fr: "RC Mandataire Sociaux", en: "Directors Liability", ar: "مسؤولية المديرين", es: "RC Administradores" },
  nav_mrp: { fr: "Multirisques Pro", en: "Pro Multi-Risk", ar: "تأمين متعدد المخاطر", es: "Multirriesgo Pro" },
  nav_transport: { fr: "Transport & Maritime", en: "Transport & Maritime", ar: "النقل والبحري", es: "Transporte y Marítimo" },
  nav_construction: { fr: "Tout Risques Chantier", en: "All-Risk Construction", ar: "جميع مخاطر البناء", es: "Todo Riesgo Obra" },
  nav_cyber: { fr: "Cyber Criminalité", en: "Cyber Crime", ar: "الجرائم الإلكترونية", es: "Cibercrimen" },
  nav_terrorisme: { fr: "Terrorisme & Sabotage", en: "Terrorism & Sabotage", ar: "الإرهاب والتخريب", es: "Terrorismo y Sabotaje" },
  nav_biens: { fr: "Assurances des Biens", en: "Property Insurance", ar: "تأمين الممتلكات", es: "Seguro de Bienes" },
  nav_personnes: { fr: "Assurances des Personnes", en: "People Insurance", ar: "تأمين الأشخاص", es: "Seguro de Personas" },
  nav_maladie_inv: { fr: "Maladie – Invalidité / Incapacité – Décès", en: "Illness – Disability / Incapacity – Death", ar: "المرض - الإعاقة / العجز - الوفاة", es: "Enfermedad – Invalidez – Fallecimiento" },
  nav_risques_tech: { fr: "Risques Techniques", en: "Technical Risks", ar: "المخاطر التقنية", es: "Riesgos Técnicos" },
  nav_auto_flotte: { fr: "Automobile & Flotte", en: "Auto & Fleet", ar: "السيارات والأسطول", es: "Auto y Flota" },
  nav_dommage_biens: { fr: "Dommage aux Biens", en: "Property Damage", ar: "أضرار الممتلكات", es: "Daños a Bienes" },
  nav_pertes: { fr: "Pertes d'Exploitation", en: "Business Interruption", ar: "خسائر التشغيل", es: "Pérdidas de Explotación" },
  nav_epargne_vie: { fr: "Épargne & Vie Capitalisation", en: "Savings & Life Capitalization", ar: "الادخار والرسملة", es: "Ahorro y Capitalización" },
  nav_audit: { fr: "Audit et Management des Risques", en: "Risk Audit & Management", ar: "تدقيق وإدارة المخاطر", es: "Auditoría de Riesgos" },
  nav_contact: { fr: "Contact", en: "Contact", ar: "اتصل بنا", es: "Contacto" },
  nav_quote: { fr: "Demander un Devis", en: "Request a Quote", ar: "طلب عرض أسعار", es: "Solicitar Presupuesto" },
  nav_estimate: { fr: "Estimer le Prix", en: "Estimate Price", ar: "تقدير السعر", es: "Estimar Precio" },
  nav_expertise: { fr: "Notre Expertise", en: "Our Expertise", ar: "خبرتنا", es: "Nuestra Experiencia" },
  nav_expertise_solutions: { fr: "Solutions complètes", en: "Complete Solutions", ar: "حلول متكاملة", es: "Soluciones Completas" },
  nav_expertise_gestion: { fr: "Gestion des risques", en: "Risk Management", ar: "إدارة المخاطر", es: "Gestión de Riesgos" },
  nav_expertise_accompagnement: { fr: "Accompagnement qualité", en: "Quality Support", ar: "دعم الجودة", es: "Acompañamiento de Calidad" },
  nav_expertise_revision: { fr: "Révision selon vos besoins", en: "Review by Needs", ar: "مراجعة حسب احتياجاتكم", es: "Revisión según Necesidades" },
  nav_expertise_renouvellements: { fr: "Renouvellements", en: "Renewals", ar: "التجديدات", es: "Renovaciones" },
  nav_expertise_admin: { fr: "Assistance administrative", en: "Admin Assistance", ar: "المساعدة الإدارية", es: "Asistencia Administrativa" },

  // Hero
  hero_badge: { fr: "Votre courtier de confiance", en: "Your trusted broker", ar: "وسيطكم الموثوق", es: "Su corredor de confianza" },
  hero_title_1: { fr: "Votre solution d'assurance", en: "Your tailored insurance solution", ar: "حل التأمين المخصص لك", es: "Su solución de seguro a medida" },
  hero_title_2: { fr: "sur mesure", en: "tailored for you", ar: "مصمم خصيصًا لك", es: "personalizada" },
  hero_title_3: { fr: "", en: "", ar: "", es: "" },
  hero_desc: {
    fr: "Découvrez nos offres d'assurance automobile, habitation, santé, prévoyance et épargne adaptées à vos besoins.",
    en: "Discover our auto, home, health, foresight and savings insurance offers tailored to your needs.",
    ar: "اكتشفوا عروض التأمين على السيارات والمنازل والصحة والادخار المصممة حسب احتياجاتكم.",
    es: "Descubra nuestras ofertas de seguro de auto, hogar, salud, previsión y ahorro adaptadas a sus necesidades.",
  },
  hero_cta: { fr: "Obtenir un Devis Gratuit", en: "Get a Free Quote", ar: "احصل على عرض مجاني", es: "Obtener Presupuesto Gratis" },

  // Services
  services_badge: { fr: "Nos Services", en: "Our Services", ar: "خدماتنا", es: "Nuestros Servicios" },
  services_title: { fr: "Des Solutions Pour Chaque Besoin", en: "Solutions For Every Need", ar: "حلول لكل حاجة", es: "Soluciones Para Cada Necesidad" },
  services_desc: {
    fr: "Particuliers ou entreprises, nous vous accompagnons avec des garanties adaptées.",
    en: "Individuals or businesses, we support you with tailored coverage.",
    ar: "أفراد أو شركات، نرافقكم بضمانات مناسبة.",
    es: "Particulares o empresas, le acompañamos con coberturas adaptadas.",
  },

  // About
  about_badge: { fr: "Qui Sommes-Nous", en: "Who We Are", ar: "من نحن", es: "Quiénes Somos" },
  about_title: { fr: "Votre Partenaire en", en: "Your Partner in", ar: "شريككم في", es: "Su Socio en" },
  about_title_2: { fr: "Assurance", en: "Insurance", ar: "التأمين", es: "Seguros" },
  about_title_3: { fr: "Depuis 1957", en: "Since 1957", ar: "منذ 1957", es: "Desde 1957" },

  // Partners
  partners_badge: { fr: "Nos Partenaires", en: "Our Partners", ar: "شركاؤنا", es: "Nuestros Socios" },
  partners_title: { fr: "Ils Nous Font Confiance", en: "They Trust Us", ar: "يثقون بنا", es: "Confían en Nosotros" },
  partners_desc: {
    fr: "Nous collaborons avec les leaders du secteur pour vous offrir les meilleures solutions d'assurance.",
    en: "We collaborate with industry leaders to offer you the best insurance solutions.",
    ar: "نتعاون مع رواد القطاع لتقديم أفضل حلول التأمين.",
    es: "Colaboramos con líderes del sector para ofrecerle las mejores soluciones de seguros.",
  },

  // Clients
  clients_badge: { fr: "Nos Clients", en: "Our Clients", ar: "عملاؤنا", es: "Nuestros Clientes" },
  clients_title: { fr: "Ils Nous Font Confiance", en: "They Trust Us", ar: "يثقون بنا", es: "Confían en Nosotros" },

  // Team
  team_badge: { fr: "Nos Équipes", en: "Our Teams", ar: "فريقنا", es: "Nuestro Equipo" },
  team_title: { fr: "Une Équipe Pluridisciplinaire", en: "A Multidisciplinary Team", ar: "فريق متعدد التخصصات", es: "Un Equipo Multidisciplinar" },
  team_desc: {
    fr: "Organisation pluridisciplinaire composée de 33 collaborateurs, structurée en pôles métiers spécialisés.",
    en: "Multidisciplinary organization of 33 employees, structured in specialized business units.",
    ar: "منظمة متعددة التخصصات تتكون من 33 موظفاً، منظمة في أقطاب مهنية متخصصة.",
    es: "Organización multidisciplinar de 33 colaboradores, estructurada en polos especializados.",
  },
  team_domains: { fr: "Domaines d'intervention", en: "Areas of Expertise", ar: "مجالات التدخل", es: "Áreas de Intervención" },

  // Key Figures
  figures_badge: { fr: "Nos Chiffres Clés", en: "Key Figures", ar: "أرقامنا الرئيسية", es: "Cifras Clave" },
  figures_title: { fr: "CPA en Chiffres", en: "CPA in Numbers", ar: "CPA بالأرقام", es: "CPA en Cifras" },

  // Values
  values_badge: { fr: "Nos Valeurs", en: "Our Values", ar: "قيمنا", es: "Nuestros Valores" },
  values_title: { fr: "Ce Qui Nous Anime", en: "What Drives Us", ar: "ما يحركنا", es: "Lo Que Nos Motiva" },

  // CTA
  cta_title: {
    fr: "Réalisez Votre Devis Personnalisé en 2 Minutes",
    en: "Get Your Custom Quote in 2 Minutes",
    ar: "احصل على عرضك المخصص في دقيقتين",
    es: "Obtenga Su Presupuesto Personalizado en 2 Minutos",
  },
  cta_desc: {
    fr: "Comparez les meilleures offres d'assurance et trouvez la solution adaptée à vos besoins.",
    en: "Compare the best insurance offers and find the solution tailored to your needs.",
    ar: "قارن أفضل عروض التأمين وابحث عن الحل المناسب لاحتياجاتك.",
    es: "Compare las mejores ofertas de seguro y encuentre la solución adaptada a sus necesidades.",
  },
  cta_button: { fr: "Commencer Maintenant", en: "Start Now", ar: "ابدأ الآن", es: "Comenzar Ahora" },

  // Contact
  contact_badge: { fr: "Contactez-Nous", en: "Contact Us", ar: "اتصل بنا", es: "Contáctenos" },
  contact_title: { fr: "N'hésitez Pas à Nous Contacter", en: "Don't Hesitate to Contact Us", ar: "لا تتردد في الاتصال بنا", es: "No Dude en Contactarnos" },
  contact_desc: {
    fr: "Obtenez votre devis personnalisé en 2 minutes.",
    en: "Get your custom quote in 2 minutes.",
    ar: "احصل على عرض أسعار مخصص في دقيقتين.",
    es: "Obtenga su presupuesto personalizado en 2 minutos.",
  },
  contact_phone: { fr: "Téléphone", en: "Phone", ar: "الهاتف", es: "Teléfono" },
  contact_email: { fr: "Email", en: "Email", ar: "البريد الإلكتروني", es: "Correo" },
  contact_address: { fr: "Adresse", en: "Address", ar: "العنوان", es: "Dirección" },
  contact_hours: { fr: "Horaires", en: "Hours", ar: "أوقات العمل", es: "Horarios" },
  contact_form_title: { fr: "Demander un Devis", en: "Request a Quote", ar: "طلب عرض أسعار", es: "Solicitar Presupuesto" },
  contact_name: { fr: "Nom complet", en: "Full name", ar: "الاسم الكامل", es: "Nombre completo" },
  contact_name_ph: { fr: "Votre nom", en: "Your name", ar: "اسمك", es: "Su nombre" },
  contact_email_ph: { fr: "votre@email.com", en: "your@email.com", ar: "بريدك@email.com", es: "su@email.com" },
  contact_phone_ph: { fr: "+212 6 XX XX XX XX", en: "+212 6 XX XX XX XX", ar: "+212 6 XX XX XX XX", es: "+212 6 XX XX XX XX" },
  contact_message: { fr: "Message", en: "Message", ar: "رسالة", es: "Mensaje" },
  contact_message_ph: {
    fr: "Décrivez votre besoin en assurance...",
    en: "Describe your insurance needs...",
    ar: "صف احتياجاتك في التأمين...",
    es: "Describa sus necesidades de seguro...",
  },
  contact_submit: { fr: "Envoyer la Demande", en: "Send Request", ar: "إرسال الطلب", es: "Enviar Solicitud" },
  contact_success: {
    fr: "Merci ! Votre demande a été envoyée. Nous vous contacterons rapidement.",
    en: "Thank you! Your request has been sent. We will contact you soon.",
    ar: "شكراً! تم إرسال طلبك. سنتصل بك قريباً.",
    es: "¡Gracias! Su solicitud ha sido enviada. Le contactaremos pronto.",
  },

  // Footer
  footer_desc: {
    fr: "Votre courtier de confiance depuis 1957. Nous vous accompagnons pour trouver les meilleures solutions d'assurance.",
    en: "Your trusted broker since 1957. We help you find the best insurance solutions.",
    ar: "وسيطكم الموثوق منذ 1957. نساعدكم في إيجاد أفضل حلول التأمين.",
    es: "Su corredor de confianza desde 1957. Le ayudamos a encontrar las mejores soluciones de seguros.",
  },
  footer_nav: { fr: "Navigation", en: "Navigation", ar: "التنقل", es: "Navegación" },
  footer_rights: { fr: "Tous droits réservés.", en: "All rights reserved.", ar: "جميع الحقوق محفوظة.", es: "Todos los derechos reservados." },
  footer_legal: { fr: "Mentions légales", en: "Legal Notice", ar: "الإشعارات القانونية", es: "Aviso Legal" },
  footer_privacy: { fr: "Politique de confidentialité", en: "Privacy Policy", ar: "سياسة الخصوصية", es: "Política de Privacidad" },
  footer_hours_label: { fr: "Lun - Ven : 8h30 - 18h00", en: "Mon - Fri: 8:30 AM - 6:00 PM", ar: "الإثنين - الجمعة: 8:30 - 18:00", es: "Lun - Vie: 8:30 - 18:00" },

  // Chatbot
  chat_greeting: {
    fr: "Bonjour ! 👋 Je suis l'assistant CPA. Comment puis-je vous aider ?",
    en: "Hello! 👋 I'm the CPA assistant. How can I help you?",
    ar: "مرحباً! 👋 أنا مساعد CPA. كيف يمكنني مساعدتك؟",
    es: "¡Hola! 👋 Soy el asistente de CPA. ¿Cómo puedo ayudarle?",
  },
  chat_placeholder: { fr: "Posez votre question...", en: "Ask your question...", ar: "اطرح سؤالك...", es: "Haga su pregunta..." },
  chat_online: { fr: "En ligne", en: "Online", ar: "متصل", es: "En línea" },
  chat_no_answer: {
    fr: "Je n'ai pas la réponse à cette question. N'hésitez pas à nous contacter au +212 5 22 95 39 00.",
    en: "I don't have the answer to that question. Feel free to contact us at +212 5 22 95 39 00.",
    ar: "ليس لدي إجابة على هذا السؤال. لا تتردد في الاتصال بنا على +212 5 22 95 39 00.",
    es: "No tengo la respuesta a esa pregunta. Contáctenos al +212 5 22 95 39 00.",
  },

  // New Insurance
  new_insurance_badge: { fr: "Nouveautés", en: "New Products", ar: "منتجات جديدة", es: "Novedades" },
  new_insurance_title: { fr: "Assurances Disponibles", en: "Available Insurance", ar: "التأمينات المتاحة", es: "Seguros Disponibles" },
  new_insurance_desc: {
    fr: "Découvrez nos nouvelles offres d'assurance innovantes.",
    en: "Discover our new innovative insurance offers.",
    ar: "اكتشفوا عروض التأمين الجديدة والمبتكرة.",
    es: "Descubra nuestras nuevas ofertas de seguro innovadoras.",
  },
  new_trottinette: { fr: "Assurance Trottinette Électrique", en: "Electric Scooter Insurance", ar: "تأمين السكوتر الكهربائي", es: "Seguro de Patinete Eléctrico" },
  new_trottinette_desc: {
    fr: "Protection complète pour vos déplacements urbains en trottinette.",
    en: "Complete protection for your urban scooter commutes.",
    ar: "حماية كاملة لتنقلاتك الحضرية بالسكوتر.",
    es: "Protección completa para sus desplazamientos urbanos en patinete.",
  },
  new_animaux: { fr: "Assurance Animaux de Compagnie", en: "Pet Insurance", ar: "تأمين الحيوانات الأليفة", es: "Seguro de Mascotas" },
  new_animaux_desc: {
    fr: "Prenez soin de vos compagnons à quatre pattes avec une couverture santé adaptée.",
    en: "Take care of your furry friends with tailored health coverage.",
    ar: "اعتنِ بحيواناتك الأليفة مع تغطية صحية مناسبة.",
    es: "Cuide a sus mascotas con una cobertura de salud adaptada.",
  },
  new_discover: { fr: "Découvrir", en: "Discover", ar: "اكتشف", es: "Descubrir" },

  // Pricing
  packs_badge: { fr: "Nos Offres", en: "Our Offers", ar: "عروضنا", es: "Nuestras Ofertas" },
  packs_title: { fr: "Offres & Packs", en: "Offers & Packs", ar: "العروض والباقات", es: "Ofertas y Packs" },
  packs_desc: {
    fr: "Choisissez le pack qui correspond le mieux à vos besoins.",
    en: "Choose the pack that best suits your needs.",
    ar: "اختر الباقة التي تناسب احتياجاتك.",
    es: "Elija el pack que mejor se adapte a sus necesidades.",
  },
  pack_essential: { fr: "Pack Essentiel", en: "Essential Pack", ar: "الباقة الأساسية", es: "Pack Esencial" },
  pack_comfort: { fr: "Pack Confort", en: "Comfort Pack", ar: "باقة الراحة", es: "Pack Confort" },
  pack_premium: { fr: "Pack Premium", en: "Premium Pack", ar: "الباقة المميزة", es: "Pack Premium" },
  pack_subscribe: { fr: "Souscrire", en: "Subscribe", ar: "اشتراك", es: "Suscribirse" },
  pack_recommended: { fr: "Recommandé", en: "Recommended", ar: "موصى به", es: "Recomendado" },
  pack_monthly: { fr: "Mensuel", en: "Monthly", ar: "شهري", es: "Mensual" },
  pack_annual: { fr: "Annuel", en: "Annual", ar: "سنوي", es: "Anual" },
  pack_on_quote: { fr: "Sur devis", en: "On quote", ar: "حسب العرض", es: "Según presupuesto" },

  // Testimonials
  testimonials_badge: { fr: "Témoignages", en: "Testimonials", ar: "شهادات", es: "Testimonios" },
  testimonials_title: { fr: "Ce Que Disent Nos Clients", en: "What Our Clients Say", ar: "ماذا يقول عملاؤنا", es: "Lo Que Dicen Nuestros Clientes" },

  // Quote Calculator
  calc_badge: { fr: "Calculateur", en: "Calculator", ar: "حاسبة", es: "Calculadora" },
  calc_title: { fr: "Estimez Votre Devis", en: "Estimate Your Quote", ar: "قدّر عرض أسعارك", es: "Estime Su Presupuesto" },
  calc_desc: {
    fr: "Obtenez une estimation rapide du coût de votre assurance.",
    en: "Get a quick estimate of your insurance cost.",
    ar: "احصل على تقدير سريع لتكلفة التأمين الخاص بك.",
    es: "Obtenga una estimación rápida del costo de su seguro.",
  },
  calc_type: { fr: "Type d'assurance", en: "Insurance type", ar: "نوع التأمين", es: "Tipo de seguro" },
  calc_value: { fr: "Valeur à assurer (DH)", en: "Value to insure (DH)", ar: "القيمة المراد تأمينها (درهم)", es: "Valor a asegurar (DH)" },
  calc_estimate: { fr: "Estimer le prix", en: "Estimate price", ar: "تقدير السعر", es: "Estimar precio" },
  calc_result: { fr: "Estimation de prime annuelle", en: "Annual premium estimate", ar: "تقدير القسط السنوي", es: "Estimación de prima anual" },
  calc_range: { fr: "Fourchette de prix", en: "Price range", ar: "نطاق السعر", es: "Rango de precio" },
  calc_contact: { fr: "Contactez-nous pour un devis précis", en: "Contact us for an accurate quote", ar: "اتصل بنا للحصول على عرض دقيق", es: "Contáctenos para un presupuesto preciso" },

  // Expertise
  expertise_badge: { fr: "Notre Expertise", en: "Our Expertise", ar: "خبرتنا", es: "Nuestra Experiencia" },
  expertise_title: { fr: "Un Savoir-Faire Reconnu", en: "Recognized Expertise", ar: "خبرة معترف بها", es: "Experiencia Reconocida" },

  // Affiliations Section
  affiliations_badge: { fr: "Nos Affiliations", en: "Our Affiliations", ar: "انتماءاتنا", es: "Nuestras Afiliaciones" },
  affiliations_title: { fr: "Un réseau solide au niveau national et international", en: "A Solid Network at National and International Levels", ar: "شبكة قوية على المستوى الوطني والدولي", es: "Una Red Sólida a Nivel Nacional e Internacional" },
  affiliations_intro: { fr: "CPA s'appuie sur un réseau de partenaires et d'organisations professionnelles qui renforcent son expertise et sa capacité à offrir des solutions d'assurance et de conseil de haut niveau.", en: "CPA relies on a network of partners and professional organizations that strengthen its expertise and ability to offer high-level insurance and advisory solutions.", ar: "تعتمد CPA على شبكة من الشركاء والمنظمات المهنية التي تعزز خبرتها وقدرتها على تقديم حلول تأمين واستشارات عالية المستوى.", es: "CPA se apoya en una red de socios y organizaciones profesionales que refuerzan su experiencia y capacidad para ofrecer soluciones de seguros y asesoramiento de alto nivel." },
  affiliations_national_badge: { fr: "Niveau National", en: "National Level", ar: "المستوى الوطني", es: "Nivel Nacional" },
  affiliations_international_badge: { fr: "Niveau International", en: "International Level", ar: "المستوى الدولي", es: "Nivel Internacional" },
  affiliations_holmarcom_desc: { fr: "CPA est membre du groupe Holmarcom, un acteur majeur de l'économie marocaine opérant dans plusieurs secteurs stratégiques, notamment la finance, l'assurance et les services.", en: "CPA is a member of the Holmarcom group, a major player in the Moroccan economy operating in several strategic sectors, including finance, insurance and services.", ar: "CPA هي عضو في مجموعة Holmarcom، وهي لاعب رئيسي في الاقتصاد المغربي تعمل في عدة قطاعات استراتيجية، بما في ذلك التمويل والتأمين والخدمات.", es: "CPA es miembro del grupo Holmarcom, un actor importante en la economía marroquí que opera en varios sectores estratégicos, incluidos finanzas, seguros y servicios." },
  affiliations_euaibron_desc: { fr: "Au niveau international, CPA fait partie du réseau EUAIBRON, un groupement de courtiers indépendants permettant d'offrir une expertise globale et un accompagnement pour les clients opérant à l'international.", en: "At the international level, CPA is part of the EUAIBRON network, a group of independent brokers providing global expertise and support for clients operating internationally.", ar: "على المستوى الدولي، تعد CPA جزءًا من شبكة EUAIBRON، وهي مجموعة من الوسطاء المستقلين الذين يقدمون خبرة عالمية ودعمًا للعملاء الذين يعملون دوليًا.", es: "A nivel internacional, CPA forma parte de la red EUAIBRON, un grupo de corredores independientes que ofrece experiencia global y apoyo a clientes que operan internacionalmente." },
  affiliations_bottom_text: { fr: "Grâce à ces affiliations stratégiques, CPA bénéficie d'un réseau solide lui permettant d'accompagner ses clients au Maroc et à l'international.", en: "Thanks to these strategic affiliations, CPA benefits from a solid network that allows it to support its clients in Morocco and internationally.", ar: "بفضل هذه الانتماءات الاستراتيجية، تستفيد CPA من شبكة قوية تمكنها من دعم عملائها في المغرب ودوليًا.", es: "Gracias a estas afiliaciones estratégicas, CPA se beneficia de una red sólida que le permite acompañar a sus clientes en Marruecos e internacionalmente." },
} as const;

export type TranslationKey = keyof typeof translations;
