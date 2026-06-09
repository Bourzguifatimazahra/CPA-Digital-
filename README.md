# 🏢 CPA Digital - Conseil et Placement d'Assurances

<div align="center">
  <img src="src/assets/cpa-logo.png" alt="CPA Logo" width="200"/>
  
  ### Application Web Moderne pour Services d'Assurance
  
   [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
   [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
   [![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
   [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
   
   ![Version](https://img.shields.io/badge/version-2.0.0-38B2AC?style=for-the-badge)
   ![License](https://img.shields.io/badge/license-Proprietary-FF6B6B?style=for-the-badge)
   ![Last Update](https://img.shields.io/badge/last%20update-April%202026-38B2AC?style=for-the-badge)
   [![Quality Gate](https://sonarcloud.io/api/project_badges/measure?project=CPA-Digital&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=CPA-Digital)
  
</div>

---

## 📋 Table des Matières

- [🎯 Présentation du Projet](#-présentation-du-projet)
- [💎 Valeur Ajoutée](#-valeur-ajoutée)
- [✨ Fonctionnalités & Options](#-fonctionnalités--options)
- [📊 Google Analytics & Data Analytics](#-google-analytics--data-analytics)
- [🔗 Lien entre Développement Web et Data Analytics](#-lien-entre-développement-web-et-data-analytics)
- [🛠️ Technologies Utilisées](#️-technologies-utilisées)
- [🌐 Internationalisation](#-internationalisation)
- [📁 Structure du Projet](#-structure-du-projet)
- [🚀 Installation & Déploiement](#-installation--déploiement)
- [🤝 Partenaires & Clients](#-partenaires--clients)
- [📞 Contact](#-contact)

---

## 🎯 Présentation du Projet

**CPA Digital** est la plateforme web de nouvelle génération pour **CPA - Conseil et Placement d'Assurances**, leader marocain du courtage d'assurances depuis 1957. Cette application moderne transforme l'expérience client en offrant un accès digital complet aux services d'assurance pour particuliers et entreprises.

### 🏢 À Propos de CPA

CPA est un courtier d'assurances indépendant basé à Casablanca, avec plus de **10 ans d'expertise** dans le conseil et le placement d'assurances. En tant qu'intermédiaire neutre, CPA représente les intérêts des clients en négociant avec les meilleures compagnies d'assurance du marché marocain pour obtenir les couvertures optimales aux tarifs les plus compétitifs.

### 🎯 Mission de la Plateforme

La plateforme digitale CPA a pour objectifs de :
- **Démocratiser l'accès** aux services d'assurance via une interface intuitive
- **Accélérer le processus** de devis et de souscription
- **Personnaliser l'expérience** selon le profil (particulier/entreprise)
- **Assurer la transparence** through comparaisons et explications claires
- **Offrir un support 24/7** via chatbot intelligent
- **Garantir la conformité** réglementaire (RGPD/Maroc)

---

## 💎 Valeur Ajoutée

### 🎯 Pour les Clients

| Bénéfice | Description |
|----------|-------------|
| **Indépendance & Neutralité** | Courtier indépendant = conseil objectif sans lien avec une compagnie spécifique |
| **Comparaison Multi-compagnies** | Accès à 15+ assureurs en un seul endroit |
| **Personnalisation Totale** | Devis sur mesure adapté aux besoins réels |
| **Gain de Temps** | Devis en 2 minutes vs. plusieurs jours traditionnellement |
| **Expertise Gratuite** | Conseil d'experts sans frais supplémentaires |
| **Support 24/7** | Chatbot IA + conseillers humains |
| **Transparence** | Explication claire des garanties et exclusions |
| **Suivi Simplifié** | Gestion centralisée de tous les contrats |

### 🏢 Pour les Entreprises

- **Solutions sur mesure** adaptées à la taille et secteur d'activité
- **Gestion de flotte** avec tableaux de bord détaillés
- **Couvertures complexes** (RC professionnelle, cyber-risques, transport maritime)
- **Épargne entreprise** et prévoyance collective
- **Réduction des coûts** through négociation groupée
- **Conformité légale** assurée

### 🤝 Pour les Partenaires Assureurs

- **Distribution accélérée** through canal digital
- **Génération de leads qualifiés**
- **Analyse de marché** via données agrégées (anonymisées)
- **Feedback client** en temps réel
- **Réduction des coûts** d'acquisition

---

## 🛠️ Technologies Utilisées

### **Frontend Core**

<div align="center">

| Technologie | Version | Rôle |
|------------|---------|------|
| ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) | 18.3.1 | Bibliothèque UI moderne |
| ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white) | 5.8.3 | Langage typé sécurisé |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white) | 5.4.19 | Build tool ultra-rapide (HMR < 100ms) |

</div>

### **Styling & UI**

| Technologie | Version | Rôle |
|-------------|---------|------|
| Tailwind CSS 3.4.17 | Framework utilitaire atomic |
| shadcn/ui | Composants accessibles (Radix UI) |
| Framer Motion 12.34.3 | Animations professionnelles |
| Lucide React | Icônes cohérentes |

### **Routing & State**

| Technologie | Version | Rôle |
|-------------|---------|------|
| React Router 6.30.1 | Routing SPA |
| TanStack Query 5.83.0 | Gestion d'état serveur (cache, sync) |
| React Hook Form 7.61.1 | Formulaires performants |
| Zod 3.25.76 | Validation de schémas |

### **Data & Export**

| Technologie | Version | Rôle |
|-------------|---------|------|
| jsPDF 4.2.0 | Génération de PDF |
| Recharts 2.15.4 | Graphiques interactifs |

### **Analytics & SEO**

| Technologie | Version | Rôle |
|-------------|---------|------|
| React GA4 3.0.1 | Google Analytics 4 |
| React Helmet Async | Gestion des meta tags SEO |

### **Testing & Quality**

| Technologie | Version | Rôle |
|-------------|---------|------|
| Vitest 3.2.4 | Tests unitaires & intégration |
| Testing Library 16.0.0 | Tests React |
| ESLint 9.32.0 | Linting & bonnes pratiques |

---

## ✨ Fonctionnalités & Options

### 🏠 Pages Principales

- 🏠 **Page d'accueil** - Hero animé avec CTA stratégiques
- 📋 **Catalogue des services** - Tous les produits d'assurance détaillés
- 👤 **Espace Particuliers** - Assurances auto, santé, habitation, épargne
- 🏢 **Espace Entreprises** - Solutions corporate complètes
- 🎓 **Page Expertise** - Valeurs, équipe, certifications
- 📞 **Page Contact** - Formulaire + infos directes
- 📜 **Pages légales** - Mentions légales, politique confidentialité
- ❓ **FAQ** - Questions fréquentes

### 🧮 Calculateurs de Devis

#### 🚗 Calculateur Assurance Véhicule
```
Fonctionnalités :
├── Saisie des informations véhicule (marque, modèle, année)
├── Sélection du type de couverture (au tiers, tous risques)
├── Calcul instantané du premium
├── Comparaison des options
├── Génération de PDF professionnel
└── Transfert vers conseiller
```

#### 💰 Calculateur Universel
```
Fonctionnalités :
├── Multi-types d'assurance (auto, santé, habitation, etc.)
├── Questionnaire adaptatif selon le produit
├── Calcul en temps réel avec algorithmes propriétaires
├── Estimation des coûts sur 12 mois
├── Export PDF + CSV
└── Envoi par email automatique
```

### 🤖 Chatbot Intelligent

Le chatbot CPA offre une assistance conversationnelle avancée :

**Capacités :**
- 🤖 **Réponses instantanées** 24h/24, 7j/7
- 📋 **Base de connaissances** de 500+ Q/R pré-entraînées
- 🎯 **Suggestions intelligentes** selon le contexte de navigation
- 📧 **Transfert fluide** vers conseiller humain
- 📞 **Génération de leads** qualifiés
- 🌐 **Support multilingue** (FR, EN, AR, ES)

**Intégration technique :**
```typescript
// Le chatbot reçoit le contexte de la page actuelle
const pageContext = usePageContext();
// 'home' | 'particuliers' | 'entreprises' | 'service' | 'contact'
// Adapte ses réponses selon le contexte
```

### 🎨 Animations & UX

- ✨ **Framer Motion** - Animations d'entrée fluides
- 🔄 **Effets hover** interactifs sur cartes et boutons
- 🎪 **Transitions de page** douces
- 🌀 **Marquee défilant** pour les logos partenaires
- 💫 **Loading screen** personnalisé
- 📜 **Scroll animations** (reveal on scroll)
- 🎨 **Effets 3D** et parallax subtils

### 🔒 Conformité & RGPD

- 📜 **Mentions légales** complètes (loi marocaine 09-08)
- 🔐 **Politique de confidentialité** conforme RGPD
- 📋 **Bannière cookies** avec consentement explicite
- 🍪 **Gestion des traceurs** (Google Analytics conditionnel)
- ⚖️ **Droits utilisateurs** (accès, rectification, suppression)

---

## 📊 Google Analytics & Data Analytics

### 🎯 Intégration Google Analytics 4

La plateforme intègre **Google Analytics 4** avec une approche **Privacy-First** :

```typescript
// src/lib/analytics.ts
const TRACKING_ID = "G-W1KQ22WHE7";

// Initialisation conditionnelle (uniquement après consentement)
export const initializeAnalytics = () => {
  if (isAnalyticsEnabled()) {
    ReactGA.initialize(TRACKING_ID);
  }
};

// Tracking des pages vues
export const trackPageView = (path: string) => {
  if (isAnalyticsEnabled()) {
    ReactGA.send({ hitType: "pageview", page: path });
  }
};

// Tracking d'événements personnalisés
export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
) => {
  if (isAnalyticsEnabled()) {
    ReactGA.event(action, { category, label, value });
  }
};
```

### 📈 Métriques Suivies

| Type de Métrique | Exemples | Utilité |
|-----------------|----------|---------|
| **Pages vues** | Nombre de visites par page | Identifier contenu populaire |
| **Utilisateurs** | Nouveaux vs. retour | Mesurer fidélisation |
| **Sessions** | Durée, pages/session | Engagement utilisateur |
| **Événements** | Clics sur devis, chatbot, contact | Conversion tracking |
| **Device** | Desktop/mobile/tablette | Optimisation responsive |
| **Géolocalisation** | Pays, ville (anonymisé) | Ciblage géographique |
| **Langue** | FR/EN/AR/ES | Préférences linguistiques |
| **Temps réel** | Utilisateurs actifs | Monitoring immédiat |

### 🎪 Événements Personnalisés Implémentés

```typescript
// Exemples d'événements trackés
trackEvent('Calculator', 'open', 'vehicle-insurance');
trackEvent('Calculator', 'submit', 'vehicle-insurance');
trackEvent('Chatbot', 'open', 'homepage');
trackEvent('Chatbot', 'transfer_to_human', 'insurance-question');
trackEvent('Contact', 'form_submit', 'contact-page');
trackEvent('PDF', 'download', 'catalogue-particuliers');
trackEvent('Service', 'click', 'auto-assurance');
```

### 🔒 Respect de la Vie Privée

- ✅ **Consentement explicite** requis avant tout tracking
- ✅ **Anonymisation IP** activée
- ✅ **Pas de cookies** sans accord utilisateur
- ✅ **Désactivation facile** via bannière cookies
- ✅ **Conforme RGPD** et loi marocaine 09-08
- ✅ **Pas de partage** avec tiers sans consentement

### 📊 Tableaux de Bord Analytics

Les données collectées permettent de créer des rapports sur :

1. **Acquisition** - D'où viennent les visiteurs ?
2. **Comportement** - Que font-ils sur le site ?
3. **Conversion** - Quels chemins mènent aux devis ?
4. **Performance** - Quelles pages sont les plus lentes ?
5. **Technologie** - Quels appareils/navigateurs ?
6. **Contenu** - Quels articles/services populaires ?

---

## 🔗 Lien entre Développement Web et Data Analytics

### 🎯 Pourquoi lier Web Dev et Analytics ?

Le développement web moderne ne se limite pas à créer des interfaces fonctionnelles. L'intégration de l'analytics permet de :

#### 1. **Prise de Décision Data-Driven**
```
Exemple : Si 70% des utilisateurs quittent sur la page de devis,
           → Optimiser le formulaire (réduction des champs)
           → A/B tester différentes versions
           → Améliorer le taux de conversion
```

#### 2. **Optimisation Continue (CRO)**
- Identifier les **frictions UX** through taux de sortie
- Tester des **hypothèses** avec A/B testing
- Mesurer l'**impact** des changements
- Prioriser les **développements** selon l'impact

#### 3. **Personnalisation Intelligente**
```
Données utilisateur → Segmentation → Personnalisation
Exemple : 
- Utilisateur visite "assurance auto" 3 fois
→ Afficher bannière promotionnelle auto
→ Proposer chatbot spécialisé auto
→ Envoyer email de suivi personnalisé
```

#### 4. **Mesure du ROI Marketing**
- Coût par acquisition (CPA) par canal
- Retour sur investissement des campagnes
- Attribution multi-touch (quel canal convertit ?)

### 🔄 Workflow Dev + Analytics

```
┌─────────────────────────────────────────────────────────────┐
│                    CYCLE D'AMÉLIORATION                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. CODE → Développer une fonctionnalité                    │
│                                                             │
│  2. TRACK → Ajouter tracking d'événements                  │
│     (ex: trackEvent('Button', 'click', 'CTA-devis'))       │
│                                                             │
│  3. DEPLOY → Mettre en production                          │
│                                                             │
│  4. MEASURE → Collecter données (GA4, Hotjar, etc.)        │
│                                                             │
│  5. ANALYZE → Analyser métriques, entonnoirs de conversion │
│                                                             │
│  6. INSIGHT → Identifier problèmes & opportunités          │
│                                                             │
│  7. ITERATE → Planifier prochaines améliorations           │
│                                                             │
│  (Retour à l'étape 1)                                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 🛠️ Outils Analytics Intégrés

| Outil | Usage | Intégration |
|-------|-------|-------------|
| **Google Analytics 4** | Métriques site-wide | React GA4 library |
| **Google Search Console** | SEO performance | Vérification site |
| **Hotjar** (optionnel) | Heatmaps, enregistrements | Script async |
| **Vite Bundle Analyzer** | Performance build | Plugin dev |
| **Lighthouse CI** | Quality scores | GitHub Actions |

### 📈 KPIs (Key Performance Indicators) Suivis

**Traffic & Acquisition:**
- Sessions mensuelles
- Nouveaux utilisateurs
- Taux de rebond
- Canaux d'acquisition (organic, direct, referral)

**Engagement:**
- Temps moyen sur page
- Pages par session
- Taux de clics sur CTAs
- Taux d'ouverture chatbot

**Conversion:**
- Taux de conversion devis (formulaires)
- Coût par acquisition (CPA)
- Taux d'abandon panier (si e-commerce)
- Taux de complétion calculateur

**Technique:**
- Core Web Vitals (LCP, FID, CLS)
- Temps de chargement par page
- Erreurs JavaScript (Sentry)
- Compatibilité navigateurs

### 🎪 Implementation dans le Code

**Exemple : Tracking d'un bouton CTA**
```tsx
const QuoteButton = () => {
  const handleClick = () => {
    // Tracking avant navigation
    trackEvent('CTA', 'click', 'quote-button-home');
    
    // Navigation après tracking
    navigate('/contact');
  };
  
  return (
    <Button onClick={handleClick}>
      Obtenir un devis gratuit
    </Button>
  );
};
```

**Exemple : Tracking d'un formulaire**
```tsx
const ContactForm = () => {
  const onSubmit = (data: FormData) => {
    trackEvent('Form', 'submit', 'contact-form', data.serviceType);
    // Envoi des données...
  };
  
  return <Form onSubmit={onSubmit}>...</Form>;
};
```

---

## 📦 Nouveaux Composants

### 🆕 **PromoBanner**
Bannière promotionnelle pour les offres spéciales et actualités.

### 🌍 **ExpansionSection**
Section dédiée à l'expansion internationale de CPA avec carte interactive et statistiques.

### 🛡️ **NewInsuranceSection**
Présentation des nouvelles couvertures d'assurance innovantes.

### 🏛️ **AffiliationsSection**
Affichage des affiliations et certifications (EURIBRON, HOLMARCOM, FMSAR).

### 📊 **KeyFiguresSection**
Section animée avec les chiffres clés de l'entreprise.

### 🧮 **QuoteCalculator**
Calculateur de devis complet et polyvalent.

### 🚗 **VehicleInsuranceCalculator**
Calculateur spécialisé pour l'assurance véhicule.

### 📜 **Legal Pages**
- Mentions Légales
- Politique de Confidentialité

### 📚 **CatalogPage**
Catalogue complet de tous les services.

---

## 🧮 Calculateurs de Devis

### 🚗 Calculateur Assurance Véhicule

Le calculateur d'assurance véhicule permet de :
- Saisie des informations du véhicule
- Sélection du type de couverture
- Calcul instantané du premium
- Génération de devis PDF
- Comparaison des options

### 💰 Calculateur de Devis Général

Fonctionnalités :
- Multiples types d'assurance
- Personnalisation des besoins
- Tarification en temps réel
- Export PDF professionnel
- Contact direct avec un conseiller

---

## 🌐 Internationalisation (i18n)

La plateforme supporte **4 langues** avec une architecture flexible :

| Langue | Code | RTL | Utilisateurs |
|--------|------|-----|--------------|
| 🇫🇷 Français | FR | Non | Principal (60%) |
| 🇬🇧 Anglais | EN | Non | International (25%) |
| 🇸🇦 Arabe | AR | ✅ Oui | Marché local (10%) |
| 🇪🇸 Espagnol | ES | Non | Touristes/Expatriés (5%) |

**Architecture i18n :**
```typescript
// src/i18n/translations.ts - 60,000+ caractères de traductions
const translations = {
  fr: { /* ... */ },
  en: { /* ... */ },
  ar: { /* ... */ },
  es: { /* ... */ }
};

// Context pour切换 langue partout
const { language, setLanguage, t } = useLanguage();
// t('home.hero.title') → titre traduit automatiquement
```

**Support RTL (Right-to-Left) pour l'arabe :**
- Mirroir automatique de l'interface
- Adaptation des positions (flex-direction: row-reverse)
- Polices arabes optimisées (Noto Sans Arabic)

---

## 💬 Chatbot Intelligent

Le chatbot CPA offre :
- 🤖 Réponses instantanées 24/7
- 📋 FAQ complète
- 📧 Transfert vers conseiller
- 🎯 Suggestions intelligentes
- 💬 Interface moderne et intuitive

---

## 📁 Structure du Projet

```
CPA-Digital-/
├── public/                          # Fichiers statiques
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt                  # SEO: directives robots
├── src/
│   ├── assets/                      # Images et ressources
│   │   ├── clients/               # 47 logos clients
│   │   ├── profile/               # Photos équipe
│   │   ├── Affiliations/          # Logos certifications
│   │   ├── site/                   # Photos lieux
│   │   ├── Catalogue/              # PDF catalogues
│   │   └── ...
│   ├── components/                 # Composants React (80+)
│   │   ├── ui/                    # shadcn/ui (40+ composants)
│   │   ├── sections/              # Sections page d'accueil
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ServicesSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── TeamSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   ├── ClientsSection.tsx
│   │   │   ├── PartnersSection.tsx
│   │   │   ├── CTASection.tsx
│   │   │   ├── ContactSection.tsx
│   │   │   ├── FAQSection.tsx
│   │   │   ├── ValuesSection.tsx
│   │   │   ├── ExpertiseSection.tsx
│   │   │   ├── KeyFiguresSection.tsx      # 🆕 Chiffres clés animés
│   │   │   ├── ExpansionSection.tsx        # 🆕 Expansion internationale
│   │   │   ├── PromoBanner.tsx            # 🆕 Bannière promo
│   │   │   ├── NewInsuranceSection.tsx    # 🆕 Nouvelles assurances
│   │   │   └── AffiliationsSection.tsx    # 🆕 Affiliations
│   │   ├── calculators/           # Calculateurs interactifs
│   │   │   ├── QuoteCalculator.tsx        # 🆕 Calculateur universel
│   │   │   └── VehicleInsuranceCalculator.tsx  # 🆕 Calculateur auto
│   │   ├── Chatbot.tsx            # Chatbot IA
│   │   ├── CookieConsent.tsx      # Gestion cookies (RGPD)
│   │   ├── Footer.tsx             # Footer multilingue
│   │   ├── Navbar.tsx             # Navigation responsive
│   │   ├── LoadingScreen.tsx      # Écran de chargement
│   │   └── ServicePageTemplate.tsx
│   ├── pages/                      # Pages (lazy-loaded)
│   │   ├── Index.tsx              # Page d'accueil
│   │   ├── ParticuliersPage.tsx
│   │   ├── EntreprisesPage.tsx
│   │   ├── ExpertisePage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── CatalogPage.tsx        # 🆕 Catalogue services
│   │   ├── ServiceDetail.tsx      # Détail d'un service
│   │   ├── MentionsLegalesPage.tsx    # 🆕 Pages légales
│   │   ├── PolitiqueConfidentialitePage.tsx  # 🆕
│   │   ├── FAQPage.tsx            # FAQ
│   │   └── NotFound.tsx           # 404
│   ├── data/                       # Données statiques
│   │   └── servicePages.ts        # Catalogue services (12 catégories)
│   ├── hooks/                      # Custom hooks
│   │   ├── use-mobile.tsx
│   │   ├── use-toast.ts
│   │   └── useCookieConsent.ts    # Gestion consentement cookies
│   ├── i18n/                       # Internationalisation
│   │   ├── LanguageContext.tsx    # Context langue
│   │   └── translations.ts        # 60K+ caractères traduits
│   ├── lib/                        # Utilitaires
│   │   ├── utils.ts               # Helpers (cn function)
│   │   └── analytics.ts           # 📊 Google Analytics integration
│   ├── App.tsx                     # Composant principal (routing)
│   ├── main.tsx                    # Point d'entrée
│   ├── index.css                   # Styles globaux + Tailwind
│   └── App.css                     # Styles spécifiques
├── components.json                 # Config shadcn/ui
├── eslint.config.js                # Config ESLint
├── package.json                    # Dépendances (94 packages)
├── postcss.config.js               # Config PostCSS
├── tailwind.config.ts              # Config Tailwind + thème
├── tsconfig.json                   # Config TypeScript
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts                  # Config Vite (optimisations)
├── vitest.config.ts                # Config tests
├── netlify.toml                    # Déploiement Netlify
└── README.md                       # Ce fichier
```

---

## 🚀 Installation & Déploiement

### 📋 Prérequis

- **Node.js** >= 18.x (LTS recommandé)
- **npm**, **yarn** ou **bun** comme gestionnaire de paquets
- **Git** pour cloner le repository

### 🔧 Installation Locale

```bash
# 1. Cloner le repository
git clone https://github.com/Bourzguifatimazahra/CPA-Digital-
cd CPA-Digital-

# 2. Installer les dépendances
npm install
# ou avec yarn
yarn install
# ou avec bun (ultra-rapide)
bun install

# 3. Lancer le serveur de développement
npm run dev
# Application accessible sur http://localhost:8080
```

### 🏗️ Build de Production

```bash
# Build optimisé (minification, tree-shaking)
npm run build

# Build de développement (non-minifié)
npm run build:dev

# Prévisualiser le build localement
npm run preview
# Accessible sur http://localhost:4173
```

### 📦 Scripts Disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement (HMR) |
| `npm run build` | Build production optimisé |
| `npm run build:dev` | Build développement (debug) |
| `npm run preview` | Preview du build production |
| `npm run lint` | Linter ESLint (code quality) |
| `npm run test` | Tests unitaires (Vitest) |
| `npm run test:watch` | Tests en mode watch |

### ☁️ Déploiement

**Plateformes supportées :**
- ✅ **Netlify** (configuration incluse dans `netlify.toml`)
- ✅ **Vercel** (compatible)
- ✅ **GitHub Pages** (nécessite config)
- ✅ **AWS S3 + CloudFront** (static hosting)

**Variables d'environnement  :**
```env
# .env
VITE_GA_ID=G-xxxx        # Google Analytics
VITE_API_URL=https://api.xx # Backend API
```

---

## 📜 Scripts Disponibles

| Script | Description |
|--------|-------------|
| `npm run dev` | Démarrer le serveur de développement |
| `npm run build` | Build de production optimisé |
| `npm run build:dev` | Build de développement |
| `npm run preview` | Prévisualiser le build |
| `npm run lint` | Linter le code avec ESLint |
| `npm run test` | Exécuter les tests |
| `npm run test:watch` | Tests en mode watch |

---

## 🤝 Partenaires & Clients

### 🏢 Compagnies d'Assurance (15+)

<div align="center">

| Partenaire | Type |
|------------|------|
| CAT Assurance & Réassurance | Partenaire principal |
| Maroc Assistance Internationale (MAI) | Assistance voyage |
| Allianz Maroc | Assurance globale |
| AXA Assurance Maroc | Multirisques |
| Wafa Assurance | Bancassurance |
| RMA Maroc | Mutuelle |
| Sanlam Assurance | Vie & non-vie |
| AtlantaSanad | Dommages |
| Atlantic Re | Réassurance |
| MCMA | Maritime |
| Africa Assurance | Générale |
| La Marocaine Vie | Prévoyance |
| Matu | Multirisque |
| Wafa Bank | Bancassurance |

</div>

### 👨‍💼 Clients Entreprises (47+)

**Industrie & Restauration:**
- Americana Restaurants (KFC, Krispy Kreme)
- Coca-Cola Maroc
- Layher (échafaudages)
- Cosco Shipping

**Transport & Aviation:**
- Air Arabia
- Sixt Maroc
- JPS (transport)

**Banque & Finance:**
- Crédit du Maroc
- PKF (cabinet)
- OCA (organisme)

**Santé & Cliniques:**
- Ghandi Clinique
- Guess Clinic
- Radioplus

**Agriculture & Agroalimentaire:**
- Agrotec
- Aquamag
- Denia (eaux)
- Oulmes (boissons)
- Fadesol

**Construction & Engineering:**
- Camusat (télécoms)
- Copima
- Cogepra
- Layher
- Smart Composite Company

**Commerce & Distribution:**
- Americana
- Effiplast
- Biscoland
- Yellow Rock

... et **25+ autres entreprises** de tous secteurs.

### 🏛️ Affiliations & Certifications

| Organisation | Rôle |
|--------------|------|
| EURIBRON | Réseau européen de courtage |
| HOLMARCOM Group | Holding marocaine |
| FMSAR | Fédération Marocaine des Sociétés d'Assurances et de Réassurance |

---

## 📞 Contact

**CPA - Conseil et Placement d'Assurances**

📍 **Adresse :** 123 Boulevard de la Corniche, Casablanca, Maroc  
📞 **Téléphone :** +212 667 558 436  
📧 **Email :** info@cpa.ma  
🌐 **Site :** https://cpa.ma/  
🕐 **Horaires :** Lundi - Vendredi, 08:30 - 18:00

**Réseaux Sociaux :**
- [LinkedIn](https://www.linkedin.com/company/cpa-conseil-assurances)
- [Facebook](https://facebook.com/cpaassurances)
- [Instagram](https://www.instagram.com/c.p.a_ma/)
- [TikTok](https://www.tiktok.com/@cpaholmarcom)
- [YouTube](https://www.youtube.com/@CPA-j6z)

---

## 📄 Licence

Ce projet est la propriété exclusive de **CPA - Conseil et Placement d'Assurances**.  
Tous droits réservés. © 2026 CPA.  
Le code source est fourni à des fins de démonstration et ne peut être reproduit sans autorisation.

---

## 🙏 Remerciements

- Équipe de développement : Fatima Zahra Bourzguig & collaborateurs
- Design : Inspiré par les meilleures pratiques modernes (shadcn/ui, Tailwind)
- Communauté open-source : React, Vite, TypeScript, Tailwind CSS
- Partenaires assureurs pour leur confiance
- 47+ clients pour leur fidélité depuis 1957

---

<div align="center">

**💡 Vous avez des questions sur votre assurance ?**  
**Consultez-nous pour une analyse gratuite de vos besoins !**

[![Site Web](https://img.shields.io/badge/🌐_cpa.ma-007ACC?style=for-the-badge&logo=google-chrome)](https://cpa.ma)
[![Contact](https://img.shields.io/badge/📞_Contactez-nous-38B2AC?style=for-the-badge)](mailto:info@cpa.ma)

</div>
