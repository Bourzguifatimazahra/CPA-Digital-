import { TranslationKey } from "@/i18n/translations";
import type { LucideProps } from "lucide-react";

export interface Department {
  id: string;
  nameKey: TranslationKey;
  whatsapp: string;
  whatsappFull: string;
  fix: string;
  fixFull: string;
  icon: () => Promise<React.ComponentType<LucideProps>>;
  color: string;
  glow: string;
  types: string[];
  customMessage?: string;
}

export const departments: Department[] = [
  {
    id: "automobile",
    nameKey: "dept_automobile",
    whatsapp: "0667558436",
    whatsappFull: "212667558436",
    fix: "05 22 95 39 02",
    fixFull: "+212522953902",
    icon: () => import("lucide-react").then((mod) => mod.Car),
    color: "from-blue-500 to-cyan-500",
    glow: "shadow-blue-500/30",
    types: ["auto", "vehicules", "auto_moto", "flotte"],
  },
  {
    id: "Accident_at",
    nameKey: "dept_Accident_at",
    whatsapp: "0655357453",
    whatsappFull: "212655357453",
    fix: "05 22 95 39 08",
    fixFull: "+212522953908",
    icon: () => import("lucide-react").then((mod) => mod.Shield),
    color: "from-orange-500 to-amber-500",
    glow: "shadow-orange-500/30",
    types: ["individuelle"],
    customMessage: "Bonjour CPA, je souhaite obtenir plus d'informations concernant une déclaration d'accident de travail (AT). Pourriez-vous m'indiquer la procédure ainsi que les documents nécessaires ?",
  },
  {
    id: "Accident_maladie",
    nameKey: "dept_Accident_maladie",
    whatsapp: "0678293901",
    whatsappFull: "212678293901",
    fix: "05 22 95 39 06",
    fixFull: "+212522953906",
    icon: () => import("lucide-react").then((mod) => mod.Heart),
    color: "from-red-500 to-pink-500",
    glow: "shadow-red-500/30",
    types: ["sante"],
    customMessage: "Bonjour CPA, je souhaite obtenir plus d’informations concernant les services liés à la santé et à la couverture maladie. Pourriez-vous me guider sur les démarches et les options disponibles ?",
  },
  {
    id: "Accident_auto_risque_divers",
    nameKey: "dept_Accident_auto_risque_divers",
    whatsapp: "0678828163",
    whatsappFull: "212678828163",
    fix: "05 22 95 39 17",
    fixFull: "+212522953917",
    icon: () => import("lucide-react").then((mod) => mod.Shield),
    color: "from-purple-500 to-violet-500",
    glow: "shadow-purple-500/30",
    types: ["auto_Accident", "risque_divers"],
    customMessage: "Bonjour CPA, je souhaite obtenir plus d’informations concernant une déclaration de sinistre auto et risques divers auprès de votre organisation. Pourriez-vous m’indiquer les démarches à suivre ainsi que les documents nécessaires ?",
  },
  {
    id: "production_divers",
    nameKey: "dept_production_divers",
    whatsapp: "0678991814",
    whatsappFull: "212678991814",
    fix: "05 22 95 39 04",
    fixFull: "+212522953904",
    icon: () => import("lucide-react").then((mod) => mod.Briefcase),
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
    customMessage: "Bonjour CPA, je souhaite obtenir une proposition concernant un contrat Multirisque ou une couverture Accident de Travail. Pourriez-vous me communiquer les offres disponibles ainsi que les informations nécessaires pour la souscription ?",
  },
];