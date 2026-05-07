# 📋 CPA Digital - Vue d'Ensemble du Projet

## 🎯 Présentation du Projet

**CPA Digital** est la plateforme web de nouvelle génération pour **CPA - Conseil et Placement d'Assurances**, leader marocain du courtage d'assurances depuis 1957. Cette application moderne transforme l'expérience client en offrant un accès digital complet aux services d'assurance pour particuliers et entreprises.

---

## 🏢 À Propos de CPA

CPA est un courtier d'assurances indépendant basé à Casablanca, avec plus de **65 ans d'expertise** (depuis 1957) dans le conseil et le placement d'assurances. En tant qu'intermédiaire neutre, CPA représente les intérêts des clients en négociant avec les meilleures compagnies d'assurance du marché marocain.

---

## 🛠️ Technologies Utilisées

### **Frontend Core**

| Technologie | Version | Rôle | Lien |
|------------|---------|------|------|
| **React** | 18.3.1 | Bibliothèque UI moderne | [react.dev](https://react.dev/) |
| **TypeScript** | 5.8.3 | Langage typé sécurisé | [typescriptlang.org](https://www.typescriptlang.org/) |
| **Vite** | 5.4.19 | Build tool ultra-rapide (HMR < 100ms) | [vitejs.dev](https://vitejs.dev/) |

### **Styling & UI**

| Technologie | Version | Rôle | Lien |
|------------|---------|------|------|
| **Tailwind CSS** | 3.4.17 | Framework utilitaire atomic | [tailwindcss.com](https://tailwindcss.com/) |
| **shadcn/ui** | - | Composants accessibles (Radix UI) | [ui.shadcn.com](https://ui.shadcn.com/) |
| **Framer Motion** | 12.34.3 | Animations professionnelles | [framer.com](https://www.framer.com/motion/) |
| **Lucide React** | 0.462.0 | Icônes cohérentes | [lucide.dev](https://lucide.dev/) |

### **Routing & State Management**

| Technologie | Version | Rôle | Lien |
|------------|---------|------|------|
| **React Router DOM** | 6.30.1 | Routing SPA | [reactrouter.com](https://reactrouter.com/) |
| **TanStack Query** | 5.83.0 | Gestion d'état serveur (cache, sync) | [tanstack.com/query](https://tanstack.com/query) |
| **React Hook Form** | 7.61.1 | Formulaires performants | [react-hook-form.com](https://react-hook-form.com/) |
| **Zod** | 3.25.76 | Validation de schémas | [zod.dev](https://zod.dev/) |

### **Data & Export**

| Technologie | Version | Rôle | Lien |
|------------|---------|------|------|
| **jsPDF** | 4.2.0 | Génération de PDF | [jspdf.org](https://jspdf.org/) |
| **Recharts** | 2.15.4 | Graphiques interactifs | [recharts.org](https://recharts.org/) |

### **Analytics & SEO**

| Technologie | Version | Rôle | Lien |
|------------|---------|------|------|
| **React GA4** | 3.0.1 | Google Analytics 4 | [github.com/arthurdenner/react-ga4](https://github.com/arthurdenner/react-ga4) |
| **React Helmet Async** | 3.0.0 | Gestion des meta tags SEO | [github.com/staylor/react-helmet-async](https://github.com/staylor/react-helmet-async) |

### **UI Components (Radix UI)**

| Package | Version | Rôle |
|---------|---------|------|
| @radix-ui/react-accordion | ^1.2.11 | Accordéon |
| @radix-ui/react-alert-dialog | ^1.1.14 | Dialogue d'alerte |
| @radix-ui/react-dialog | ^1.1.14 | Dialogue modal |
| @radix-ui/react-dropdown-menu | ^2.1.15 | Menu déroulant |
| @radix-ui/react-select | ^2.2.5 | Sélecteur |
| @radix-ui/react-tabs | ^1.1.12 | Onglets |
| @radix-ui/react-toast | ^1.2.14 | Notifications toast |
| @radix-ui/react-tooltip | ^1.2.7 | Infobulles |
| @radix-ui/react-popover | ^1.1.14 | Popover |
| @radix-ui/react-checkbox | ^1.3.2 | Cases à cocher |
| @radix-ui/react-radio-group | ^1.3.7 | Boutons radio |
| @radix-ui/react-slider | ^1.3.5 | Curseur |
| @radix-ui/react-switch | ^1.2.5 | Interrupteur |
| @radix-ui/react-label | ^2.1.7 | Labels |
| @radix-ui/react-slot | ^1.2.3 | Slots |
| @radix-ui/react-separator | ^1.1.7 | Séparateurs |
| @radix-ui/react-scroll-area | ^1.2.9 | Zone de défilement |
| @radix-ui/react-hover-card | ^1.1.14 | Carte au survol |
| @radix-ui/react-context-menu | ^2.2.15 | Menu contextuel |
| @radix-ui/react-menubar | ^1.1.15 | Barre de menu |
| @radix-ui/react-navigation-menu | ^1.2.13 | Menu de navigation |
| @radix-ui/react-avatar | ^1.1.10 | Avatar |
| @radix-ui/react-progress | ^1.1.7 | Barre de progression |
| @radix-ui/react-collapsible | ^1.1.11 | Élément pliable |
| @radix-ui/react-aspect-ratio | ^1.1.7 | Ratio d'aspect |
| @radix-ui/react-toggle | ^1.1.9 | Bouton bascule |
| @radix-ui/react-toggle-group | ^1.1.10 | Groupe de bascules |

---

## 🧪 Testing & Quality Assurance

### **Testing Framework**

| Outil | Version | Usage | Lien |
|-------|---------|------|------|
| **Vitest** | 4.1.5 | Tests unitaires & intégration | [vitest.dev](https://vitest.dev/) |
| **@testing-library/react** | 16.3.2 | Tests React | [testing-library.com](https://testing-library.com/) |
| **@testing-library/jest-dom** | 6.6.0 | Assertions DOM | [github.com/testing-library/jest-dom](https://github.com/testing-library/jest-dom) |
| **jsdom** | 20.0.3 | Environnement DOM pour tests | [github.com/jsdom/jsdom](https://github.com/jsdom/jsdom) |

### **Test Configuration**

- **Environment**: jsdom
- **Setup File**: `src/test/setup.ts`
- **Coverage Provider**: V8
- **Coverage Reporters**: lcov, text, json
- **Coverage Directory**: `coverage/`
- **Globals**: Enabled

### **Test Files in Project**

```
src/test/
├── setup.ts              # Configuration des tests
├── minimal.test.ts       # Test minimal
└── example.test.ts       # Test exemple

src/
├── lib/
│   └── utils.test.ts     # Tests utilitaires
├── components/
│   └── ui/
│       └── button.test.tsx  # Tests composants
└── hooks/
    └── use-mobile.test.tsx  # Tests hooks
└── i18n/
    └── LanguageContext.test.tsx  # Tests i18n
```

### **Code Quality**

| Outil | Version | Usage | Lien |
|-------|---------|------|------|
| **ESLint** | 9.32.0 | Linting & bonnes pratiques | [eslint.org](https://eslint.org/) |
| **TypeScript ESLint** | 8.38.0 | Linting TypeScript | [typescript-eslint.io](https://typescript-eslint.io/) |
| **eslint-plugin-react-hooks** | 5.2.0 | Règles React Hooks | [github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks](https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks) |
| **eslint-plugin-react-refresh** | 0.4.20 | Fast Refresh | [github.com/ArnaudBarre/react-refresh](https://github.com/ArnaudBarre/react-refresh) |

---

## 🔧 Build & Development Tools

| Outil | Version | Usage | Lien |
|-------|---------|------|------|
| **Vite** | 5.4.19 | Build tool & dev server | [vitejs.dev](https://vitejs.dev/) |
| **@vitejs/plugin-react-swc** | 3.11.0 | Plugin React avec SWC | [github.com/vitejs/vite-plugin-react](https://github.com/vitejs/vite-plugin-react) |
| **vite-plugin-imagemin** | 0.6.1 | Optimisation images | [github.com/vbenjs/vite-plugin-imagemin](https://github.com/vbenjs/vite-plugin-imagemin) |
| **PostCSS** | 8.5.6 | Transformation CSS | [postcss.org](https://postcss.org/) |
| **Autoprefixer** | 10.4.21 | Préfixes CSS automatiques | [github.com/postcss/autoprefixer](https://github.com/postcss/autoprefixer) |
| **Terser** | 5.46.1 | Minification JavaScript | [github.com/terser/terser](https://github.com/terser/terser) |

---

## 📊 Data Analytics & Monitoring

### **Google Analytics 4 Integration**

**Tracking ID**: `G-W1KQ22WHE7`

**Implementation**:
```typescript
// src/lib/analytics.ts
export const initializeAnalytics = () => { ... }
export const trackPageView = (path: string) => { ... }
export const trackEvent = (category, action, label?, value?) => { ... }
```

**Features**:
- ✅ Consentement explicite requis avant tracking
- ✅ Anonymisation IP activée
- ✅ Pas de cookies sans accord utilisateur
- ✅ Désactivation facile via bannière cookies
- ✅ Conforme RGPD et loi marocaine 09-08

**Métriques Suivies**:
- Pages vues
- Utilisateurs (nouveaux/retour)
- Sessions (durée, pages/session)
- Événements personnalisés (clics CTA, chatbot, formulaires)
- Device (desktop/mobile/tablette)
- Géolocalisation (anonymisée)
- Langue (FR/EN/AR/ES)

**Événements Personnalisés**:
- `Calculator` - Ouverture et soumission de calculateurs
- `Chatbot` - Interactions avec le chatbot
- `Contact` - Soumission de formulaires
- `PDF` - Téléchargement de catalogues
- `Service` - Clics sur les services

### **Analytics Tools Mentioned**

| Outil | Usage | Statut |
|-------|-------|--------|
| **Google Analytics 4** | Métriques site-wide | ✅ Intégré |
| **Google Search Console** | SEO performance | 🔄 Vérification site |
| **Hotjar** (optionnel) | Heatmaps, enregistrements | ⏳ Planifié |
| **Vite Bundle Analyzer** | Performance build | 🔧 Plugin dev |
| **Lighthouse CI** | Quality scores | ⏳ À implémenter |

---

## 🔍 SonarQube / SonarCloud

**Projet SonarCloud**: `CPA-Digital`

**Badge Qualité** (dans README):
```markdown
[![Quality Gate](https://sonarcloud.io/api/project_badges/measure?project=CPA-Digital&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=CPA-Digital)
```

**Configuration SonarCloud** (à vérifier dans `.sonarcloud.properties` ou `sonar-project.properties`):
- **Quality Gate**: Alert status badge
- **Coverage**: Mesure via Vitest coverage
- **Analyse**: Code quality, bugs, vulnerabilities, code smells

**Intégration Continue** (à configurer):
- Analyse automatique sur push/PR
- Rapport de couverture de code
- Détection de bugs et vulnérabilités
- Respect des bonnes pratiques

---

## 🚀 DevOps & CI/CD

### **GitHub Workflows** (À créer)

Bien que le répertoire `.github/workflows/` n'existe pas encore, les workflows recommandés sont:

#### 1. **CI (Continuous Integration)**
```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build
```

#### 2. **CD (Continuous Deployment)**
```yaml
name: CD
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run build
      - name: Deploy to production
        run: ./deploy.sh
```

#### 3. **SonarCloud Analysis**
```yaml
name: SonarCloud Scan
on:
  push:
    branches: [main]
  pull_request:
    types: [opened, synchronize, reopened]
jobs:
  sonar:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run test -- --coverage
      - uses: SonarSource/sonarcloud-github-action@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```

### **Scripts de Qualité**

**Fichiers de qualité**:
- `fix-quality.js` / `fix-quality.cjs` - Scripts de correction de qualité
- `scripts/fix-tsconfig.cjs` - Correction des configurations TypeScript

**Commandes disponibles** (depuis `package.json`):
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:dev": "vite build --mode development",
    "lint": "eslint .",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

---

## 🧮 Calculateurs de Devis

### **🚗 VehicleInsuranceCalculator**

**Fichier**: `src/components/VehicleInsuranceCalculator.tsx`

**Fonctionnalités**:
- Saisie des informations véhicule (marque, modèle, année)
- Sélection du type de couverture (au tiers, tous risques)
- Calcul instantané du premium
- Comparaison des options
- Génération de PDF professionnel
- Transfert vers conseiller

### **💰 QuoteCalculator**

**Fichier**: `src/components/QuoteCalculator.tsx`

**Fonctionnalités**:
- Multi-types d'assurance (auto, santé, habitation, etc.)
- Questionnaire adaptatif selon le produit
- Calcul en temps réel avec algorithmes propriétaires
- Estimation des coûts sur 12 mois
- Export PDF + CSV
- Envoi par email automatique

---

## 🤖 Chatbot Intelligent

**Fichier**: `src/components/Chatbot.tsx` (79 333 caractères)

**Capacités**:
- 🤖 Réponses instantanées 24h/24, 7j/7
- 📋 Base de connaissances de 500+ Q/R pré-entraînées
- 🎯 Suggestions intelligentes selon le contexte de navigation
- 📧 Transfert fluide vers conseiller humain
- 📞 Génération de leads qualifiés
- 🌐 Support multilingue (FR, EN, AR, ES)

**Intégration technique**:
```typescript
const pageContext = usePageContext();
// 'home' | 'particuliers' | 'entreprises' | 'service' | 'contact'
// Adapte ses réponses selon le contexte
```

---

## 🌐 Internationalisation (i18n)

**Langues supportées**: 4 langues
- 🇫🇷 Français (FR) - Principal (60%)
- 🇬🇧 Anglais (EN) - International (25%)
- 🇪🇸 Espagnol (ES)
- 🇸🇦 Arabe (AR)

**Fichiers de traduction**:
- `src/i18n/translations.ts` - Dictionnaire complet
- `src/i18n/LanguageContext.tsx` - Contexte React
- `src/hooks/useLanguage.ts` - Hook de gestion

**Traductions**:
- Navigation (navbar, footer)
- Pages complètes (home, about, services, contact)
- Services d'assurance (30+ types)
- FAQ (30+ questions)
- Calculateurs
- Messages chatbot

---

## 📁 Structure du Projet

```
CPA-Digital/
├── .github/                    # GitHub configurations (workflows)
│   └── workflows/             # CI/CD pipelines (à créer)
├── public/                     # Fichiers statiques
│   ├── favicon.ico
│   ├── robots.txt
│   ├── _redirects             # Netlify redirects
│   └── placeholder.svg
├── screenshots/               # Captures d'écran
├── scripts/                   # Scripts utilitaires
│   └── fix-tsconfig.cjs
├── src/                       # Code source
│   ├── assets/               # Images, logos, PDFs
│   │   ├── Affiliations/     # Logos affiliations
│   │   ├── Catalogue/        # Catalogues PDF
│   │   ├── clients/          # Logos clients (50+)
│   │   ├── profile/          # Photos équipe
│   │   └── site/             # Photos sites
│   ├── components/           # Composants React
│   │   ├── ui/              # Composants shadcn/ui (40+)
│   │   ├── Chatbot.tsx      # Chatbot intelligent
│   │   ├── QuoteCalculator.tsx
│   │   ├── VehicleInsuranceCalculator.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ... (20+ sections)
│   ├── lib/                 # Bibliothèques
│   │   ├── utils.ts
│   │   └── analytics.ts     # Google Analytics
│   ├── test/                # Tests
│   │   ├── setup.ts
│   │   ├── minimal.test.ts
│   │   └── example.test.ts
│   ├── i18n/                # Internationalisation
│   │   ├── translations.ts
│   │   └── LanguageContext.tsx
│   ├── App.tsx              # Composant principal
│   ├── App.css
│   ├── main.tsx             # Point d'entrée
│   └── index.css            # Styles globaux
├── index.html
├── package.json
├── package-lock.json
├── vite.config.ts
├── vitest.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── eslint.config.js
├── postcss.config.js
├── components.json          # Config shadcn/ui
├── bun.lockb               # Bun lockfile
├── README.md
└── over.md                 # Ce fichier
```

---

## 🎨 Design System

### **Couleurs CPA**

```css
/* Palette de couleurs personnalisée */
--cpa-blue-deep: hsl(217, 100%, 25%)    /* Bleu profond */
--cpa-blue: hsl(217, 100%, 40%)          /* Bleu principal */
--cpa-blue-light: hsl(217, 100%, 55%)    /* Bleu clair */
--cpa-blue-pale: hsl(217, 100%, 90%)     /* Bleu pâle */
--cpa-gray: hsl(215, 20%, 30%)           /* Gris principal */
--cpa-gray-light: hsl(215, 20%, 90%)     /* Gris clair */
```

### **Typography**

- **Headings**: Plus Jakarta Sans
- **Body**: Inter

### **Animations (Framer Motion)**

**Variantes définies** dans `src/components/ui/animationVariants.ts`:
- `fadeInUp` - Entrée par le bas
- `fadeInLeft` - Entrée par la gauche
- `fadeInRight` - Entrée par la droite
- `scaleIn` - Zoom d'entrée
- `staggerItem` - Animation en cascade
- `quickFade` - Fondu rapide
- `sectionHeaderAnimation` - Animation en-tête section
- `combinedFadeInUp` - Entrée combinée avec rotation

---

## 📊 Pages & Fonctionnalités

### **Pages Principales**

1. 🏠 **Home** - Hero animé avec CTA stratégiques
2. 📋 **Catalogue** - Tous les produits d'assurance
3. 👤 **Particuliers** - Assurances auto, santé, habitation, épargne
4. 🏢 **Entreprises** - Solutions corporate complètes
5. 🎓 **Expertise** - Valeurs, équipe, certifications
6. 📞 **Contact** - Formulaire + infos directes
7. 📜 **Mentions Légales** - Conformité légale
8. 🔒 **Politique de Confidentialité** - RGPD
9. ❓ **FAQ** - 30+ questions fréquentes

### **Sections Composants**

- **HeroSection** - Section principale avec animation
- **ServicesSection** - Catalogue services
- **AboutSection** - À propos
- **TeamSection** - Équipe (50 collaborateurs)
- **TestimonialsSection** - Témoignages clients
- **ClientsSection** - Logos clients (50+)
- **PartnersSection** - Partenaires
- **AffiliationsSection** - Affiliations (EURIBRON, HOLMARCOM, FMSAR)
- **KeyFiguresSection** - Chiffres clés animés
- **ValuesSection** - Valeurs d'entreprise
- **ExpansionSection** - Expansion nationale
- **PromoBanner** - Bannières promotionnelles
- **NewInsuranceSection** - Nouvelles couvertures
- **CTASection** - Appels à action
- **ContactSection** - Formulaire de contact
- **FAQSection** - Questions fréquentes
- **Footer** - Pied de page

---

## 🛡️ Conformité & RGPD

### **Respect de la Vie Privée**

- 📜 Mentions légales complètes (loi marocaine 09-08)
- 🔐 Politique de confidentialité conforme RGPD
- 📋 Bannière cookies avec consentement explicite
- 🍪 Gestion des traceurs (Google Analytics conditionnel)
- ⚖️ Droits utilisateurs (accès, rectification, suppression)
- ✅ Consentement explicite requis avant tout tracking
- ✅ Anonymisation IP activée
- ✅ Pas de cookies sans accord utilisateur

---

## 🏢 Partenaires & Clients

### **Compagnies d'Assurance Partenaires** (15+)

- Allianz
- AXA
- Wafa Assurance
- RMA
- Sanlam
- AtlantaSanad
- La Marocaine Vie
- MATU
- MAI (Maroc Assistance Internationale)
- CNIA

### **Affiliations & Certifications**

- **HOLMARCOM Group** - Holding marocaine
- **EURIBRON** - Réseau international de courtiers
- **FMSAR** - Fédération Marocaine des Sociétés d'Assurances et de Réassurance

### **Clients Référencés** (50+)

Parmi les clients notables: Coca-Cola, KFC, PKF, OLA, Fadesol, Denia, etc.

---

## 📞 Contact

**CPA - Conseil et Placement d'Assurances**

- 📍 **Adresse**: Casablanca, Maroc
- 📞 **Téléphone**: +212 5 22 95 39 00
- 📧 **Email**: info@cpa.ma
- 🌐 **Site**: [cpa.ma](https://cpa.ma)
- 🕐 **Horaires**: Lun - Ven: 8h30 - 18h00, Sam: 9h00 - 13h00

**Réseaux Sociaux**:
- [LinkedIn](https://www.linkedin.com/company/cpa-conseil-assurances)

---

## 📈 KPIs & Métriques

### **Traffic & Acquisition**
- Sessions mensuelles
- Nouveaux utilisateurs
- Taux de rebond
- Canaux d'acquisition (organic, direct, referral)

### **Engagement**
- Temps moyen sur page
- Pages par session
- Taux de clics sur CTAs
- Taux d'ouverture chatbot

### **Conversion**
- Taux de conversion devis (formulaires)
- Coût par acquisition (CPA)
- Taux d'abandon calculateur
- Taux de complétion formulaire

### **Technique**
- Core Web Vitals (LCP, FID, CLS)
- Temps de chargement par page
- Couverture de code (Vitest)
- Erreurs JavaScript

---

## 🔄 Workflow Dev + Analytics

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
│  4. MEASURE → Collecter données (GA4, SonarCloud, etc.)    │
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

---

## 📚 Documentation

### **Documents du Projet**

- [`README.md`](README.md) - Documentation principale du projet
- [`over.md`](over.md) - Ce fichier: vue d'ensemble technique
- [`package.json`](package.json) - Dépendances et scripts
- [`vite.config.ts`](vite.config.ts) - Configuration Vite
- [`tailwind.config.ts`](tailwind.config.ts) - Configuration Tailwind
- [`vitest.config.ts`](vitest.config.ts) - Configuration tests
- [`eslint.config.js`](eslint.config.js) - Configuration ESLint
- [`tsconfig.json`](tsconfig.json) - Configuration TypeScript

---

## 🎯 Objectifs du Projet

### **Pour les Clients**
- ✅ Indépendance & Neutralité
- ✅ Comparaison Multi-compagnies
- ✅ Personnalisation Totale
- ✅ Gain de Temps (devis en 2 min)
- ✅ Expertise Gratuite
- ✅ Support 24/7
- ✅ Transparence
- ✅ Suivi Simplifié

### **Pour les Entreprises**
- Solutions sur mesure
- Gestion de flotte
- Couvertures complexes
- Épargne entreprise
- Réduction des coûts
- Conformité légale

### **Pour les Partenaires Assureurs**
- Distribution accélérée
- Génération de leads qualifiés
- Analyse de marché
- Feedback client en temps réel
- Réduction des coûts d'acquisition

---

## 🏆 Technologies par Catégorie

### **Frontend**
- React 18.3.1
- TypeScript 5.8.3
- Vite 5.4.19

### **Styling**
- Tailwind CSS 3.4.17
- shadcn/ui (Radix UI)
- Framer Motion 12.34.3
- Lucide React 0.462.0

### **State & Data**
- React Router DOM 6.30.1
- TanStack Query 5.83.0
- React Hook Form 7.61.1
- Zod 3.25.76

### **Utilities**
- jsPDF 4.2.0
- Recharts 2.15.4
- React GA4 3.0.1
- React Helmet Async 3.0.0
- date-fns 3.6.0
- cmdk 1.1.1
- input-otp 1.4.2
- next-themes 0.3.0
- react-resizable-panels 2.1.9
- embla-carousel-react 8.6.0
- vaul 0.9.9
- sonner 1.7.4
- class-variance-authority 0.7.1
- tailwindcss-animate 1.0.7

### **DevOps & Quality**
- Vitest 4.1.5
- ESLint 9.32.0
- TypeScript ESLint 8.38.0
- PostCSS 8.5.6
- Autoprefixer 10.4.21

---

## 📊 Data Analyst Tools

### **Analytics Platforms**
- **Google Analytics 4** - Métriques site-wide
- **Google Search Console** - SEO performance
- **Hotjar** (optionnel) - Heatmaps & recordings

### **Performance Monitoring**
- **Vite Bundle Analyzer** - Analyse taille bundles
- **Lighthouse CI** - Scores qualité (à implémenter)
- **Core Web Vitals** - Métriques performance

### **Data Collection Points**

1. **Page Views** - Navigation utilisateur
2. **Custom Events** - Interactions spécifiques
3. **Form Submissions** - Conversions
4. **Calculator Usage** - Engagement outils
5. **Chatbot Interactions** - Support qualité
6. **PDF Downloads** - Intérêt contenu
7. **Device Info** - Compatibilité
8. **Geolocation** - Ciblage (anonymisé)
9. **Language Preference** - i18n usage

---

## 🔄 Intégration Continue (À Implémenter)

### **Workflows Recommandés**

1. **Tests automatiques** sur chaque PR
2. **Linting** avec ESLint
3. **Build verification** avec Vite
4. **Coverage report** avec Vitest
5. **SonarCloud analysis** pour qualité code
6. **Deployment** automatique sur merge main

### **Quality Gates**

- ✅ Tests passent à 100%
- ✅ Couverture code > 80%
- ✅ Pas d'erreurs ESLint
- ✅ Build réussi
- ✅ SonarCloud Quality Gate passée
- ✅ Audit de sécurité

---

## 📝 Notes Techniques

### **Optimisations Performance**

- **Code Splitting** via Vite (manualChunks)
- **Image Optimization** (vite-plugin-imagemin)
- **Tree Shaking** (ES modules)
- **Lazy Loading** des composants
- **Bundle Analysis** pour monitoring taille

### **Sécurité**

- CSP (Content Security Policy) headers
- XSS protection via React
- HTTPS enforced
- Cookie consent management
- RGPD compliance

### **Accessibilité**

- Composants Radix UI (WAI-ARIA)
- Navigation clavier
- Contrast ratios WCAG
- Screen reader support

---

## 🎓 Apprentissage & Ressources

### **Documentation Officielle**

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Vitest](https://vitest.dev/)
- [React Router](https://reactrouter.com/)
- [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)

### **Outils de Développement**

- **IDE**: Visual Studio Code recommandé
- **Extensions VS Code**:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript Hero
  - GitLens

---

## 📞 Support & Contribution

### **Équipe de Développement**

- **50 collaborateurs** structurés en pôles métiers spécialisés
- Multidisciplinaire: devs, designers, QA, DevOps, analysts

### **Processus de Contribution**

1. Fork du repository
2. Créer une branche feature
3. Committer avec messages conventionnels
4. Push et créer PR
5. Attendre review + CI passes
6. Merge après approbation

---

## 📄 Licence

**Propriétaire** - Tous droits réservés

© 2026 CPA - Conseil et Placement d'Assurances. Tous droits réservés.

---

*Dernière mise à jour: Avril 2026*