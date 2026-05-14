import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Shield,
  Heart,
  Car,
  Briefcase,
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { TranslationKey } from "@/i18n/translations";
import { Link } from "react-router-dom";

interface Department {
  id: string;
  nameKey: TranslationKey;
  whatsapp: string;
  whatsappFull: string;
  direct: string;
  directFull: string;
  icon: React.ElementType;
  color: string;
  glow: string;
  types: string[];
}

const departments: Department[] = [
  {
    id: "automobile",
    nameKey: "dept_automobile",
    whatsapp: "0667558436",
    whatsappFull: "212667558436",
    direct: "05 22 95 39 02",
    directFull: "+212522953902",
    icon: Car,
    color: "from-blue-500 to-cyan-500",
    glow: "shadow-blue-500/30",
    types: ["auto", "vehicules", "auto_moto", "flotte"],
  },
  {
    id: "sinistre_at",
    nameKey: "dept_sinistre_at",
    whatsapp: "0655357453",
    whatsappFull: "212665357453",
    direct: "05 22 95 39 08",
    directFull: "+212522953908",
    icon: Shield,
    color: "from-orange-500 to-amber-500",
    glow: "shadow-orange-500/30",
    types: ["individuelle"],
  },
  {
    id: "sinistre_maladie",
    nameKey: "dept_sinistre_maladie",
    whatsapp: "0678293901",
    whatsappFull: "212678293901",
    direct: "05 22 95 39 06",
    directFull: "+212522953906",
    icon: Heart,
    color: "from-red-500 to-pink-500",
    glow: "shadow-red-500/30",
    types: ["sante"],
  },
  {
    id: "production_divers",
    nameKey: "dept_production_divers",
    whatsapp: "078991814",
    whatsappFull: "21278991814",
    direct: "05 22 95 39 04",
    directFull: "+212522953904",
    icon: Briefcase,
    color: "from-green-500 to-emerald-500",
    glow: "shadow-green-500/30",
    types: [
      "habitation",
      "multirisques",
      "voyage",
      "assistance",
      "entreprise",
      "retraite",
      "epargne",
      "rc",
      "rc_pro",
      "biens",
      "personnes",
      "risques_tech",
      "transport",
      "dommage",
      "pertes",
      "chantier",
      "cyber",
      "terrorisme",
      "audit",
    ],
  },
];

const ContactSection = () => {
  const { t, lang } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    insuranceType: "",
    message: "",
  });

  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const insuranceOptions = [
    { value: "", label: t("contact_insurance_select") },
    { value: "auto", label: t("ins_auto") },
    { value: "habitation", label: t("ins_habitation") },
    { value: "voyage", label: t("ins_voyage") },
    { value: "sante", label: t("ins_sante") },
    { value: "entreprise", label: t("ins_entreprise") },
    { value: "vehicules", label: t("ins_vehicules") },
    { value: "auto_moto", label: t("ins_auto_moto") },
    { value: "multirisques", label: t("ins_multirisques") },
    { value: "retraite", label: t("ins_retraite") },
    { value: "rc", label: t("ins_rc") },
    { value: "assistance", label: t("ins_assistance") },
    { value: "individuelle", label: t("ins_individuelle") },
    { value: "biens", label: t("ins_biens") },
    { value: "personnes", label: t("ins_personnes") },
    { value: "rc_pro", label: t("ins_rc_pro") },
    { value: "risques_tech", label: t("ins_risques_tech") },
    { value: "flotte", label: t("ins_flotte") },
    { value: "transport", label: t("ins_transport") },
    { value: "dommage", label: t("ins_dommage") },
    { value: "pertes", label: t("ins_pertes") },
    { value: "chantier", label: t("ins_chantier") },
    { value: "cyber", label: t("ins_cyber") },
    { value: "terrorisme", label: t("ins_terrorisme") },
    { value: "epargne", label: t("ins_epargne") },
    { value: "audit", label: t("ins_audit") },
  ];

  const getDepartmentForInsurance = (type: string) => {
    return departments.find((d) => d.types.includes(type)) || departments[3];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.insuranceType || !privacyAccepted) return;

    const dept = getDepartmentForInsurance(formData.insuranceType);

    const label =
      insuranceOptions.find((o) => o.value === formData.insuranceType)
        ?.label || formData.insuranceType;

    const msg = `CPA - Demande

Type: ${label}
Nom: ${formData.name}
Email: ${formData.email}
Téléphone: ${formData.phone}
Message: ${formData.message}`;

    window.open(
      `https://wa.me/${dept.whatsappFull}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );

    setFormData({
      name: "",
      email: "",
      phone: "",
      insuranceType: "",
      message: "",
    });
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">

        {/* DEPARTMENTS FLIP */}
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4 max-w-[1800px] mx-auto mt-20">

          {departments.map((dept, index) => {
            const Icon = dept.icon;

            return (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group [perspective:1600px] h-[420px] w-full"
              >
                <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                  {/* FRONT */}
                  <div className="absolute inset-0 rounded-[36px] overflow-hidden border bg-card shadow-2xl [backface-visibility:hidden]">
                    <div className={`absolute inset-0 bg-gradient-to-br ${dept.color} opacity-10`} />

                    <div className="flex flex-col items-center justify-center h-full text-center p-8">
                      <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${dept.color} flex items-center justify-center mb-8 ${dept.glow}`}>
                        <Icon className="w-10 h-10 text-white" />
                      </div>

                      <h3 className="text-xl font-bold text-foreground mb-3">
                        {t(dept.nameKey)}
                      </h3>

                      <div className="text-sm text-muted-foreground">
                        {dept.types.length} services
                      </div>
                    </div>
                  </div>

                  {/* BACK */}
                  <div className="absolute inset-0 rounded-[36px] overflow-hidden border bg-card shadow-2xl [transform:rotateY(180deg)] [backface-visibility:hidden]">

                    <div className="p-7 h-full flex flex-col justify-between">

                      {/* DIRECT */}
                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Phone className="w-5 h-5 text-primary" />
                        </div>

                        <div>
                          <p className="text-xs text-muted-foreground mb-1">
                            Direct
                          </p>
                          <a
                            href={`tel:${dept.directFull}`}
                            className="font-bold text-foreground"
                          >
                            {dept.direct}
                          </a>
                        </div>
                      </div>

                      {/* WHATSAPP */}
                      <div className="flex items-start gap-4 mt-6">
                        <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center">
                          <Phone className="w-5 h-5 text-green-600" />
                        </div>

                        <div>
                          <p className="text-xs text-muted-foreground mb-1">
                            WhatsApp
                          </p>
                          <a
                            href={`https://wa.me/${dept.whatsappFull}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-green-600"
                          >
                            {dept.whatsapp}
                          </a>
                        </div>
                      </div>

                      <a
                        href={`https://wa.me/${dept.whatsappFull}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`mt-8 py-4 rounded-2xl text-white text-center font-bold bg-gradient-to-r ${dept.color}`}
                      >
                        Contacter
                      </a>
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ContactSection;