import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  CheckCircle2,
  AlertCircle,
  TrendingDown,
  TrendingUp,
  Shield,
  Bug,
  Code2,
  Activity,
  BarChart3,
  AlertTriangle,
  CheckSquare,
  MinusCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SectionHeader from "@/components/ui/SectionHeader";

type LocalizedText = { fr: string; en: string; ar: string; es: string };

interface SeverityBreakdown {
  Medium: number;
  Low: number;
  High?: number;
  Critical?: number;
}

interface HealthMetric {
  id: string;
  title: LocalizedText;
  icon: React.ElementType;
  rating: "A" | "B" | "C" | "D" | "E";
  issues: number;
  trend?: string;
  trendDirection?: "up" | "down" | "neutral";
  severityBreakdown?: SeverityBreakdown;
  description?: LocalizedText;
  status?: "passed" | "warning" | "error" | "info";
}

const getLocalizedText = (text: LocalizedText, lang: string): string => {
  return text[lang as keyof LocalizedText] || text.fr;
};

const getRatingColor = (rating: string): string => {
  const colors: Record<string, string> = {
    A: "text-emerald-500",
    B: "text-blue-500",
    C: "text-yellow-500",
    D: "text-orange-500",
    E: "text-red-500",
  };
  return colors[rating] || "text-gray-500";
};

const getRatingBg = (rating: string): string => {
  const colors: Record<string, string> = {
    A: "bg-emerald-500/10 border-emerald-500/20",
    B: "bg-blue-500/10 border-blue-500/20",
    C: "bg-yellow-500/10 border-yellow-500/20",
    D: "bg-orange-500/10 border-orange-500/20",
    E: "bg-red-500/10 border-red-500/20",
  };
  return colors[rating] || "bg-gray-500/10 border-gray-500/20";
};

const getStatusIcon = (status?: string) => {
  switch (status) {
    case "passed":
      return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
    case "warning":
      return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    case "error":
      return <XCircle className="w-5 h-5 text-red-500" />;
    case "info":
      return <Activity className="w-5 h-5 text-blue-500" />;
    default:
      return null;
  }
};

const TrendIndicator = ({ direction, value }: { direction?: "up" | "down" | "neutral"; value: string }) => {
  if (!value) return null;

  const isPositive = direction === "down" && !value.includes("+");
  const isNegative = direction === "up" && value.includes("+");
  const isNeutral = direction === "neutral" || !direction;

  let icon = <MinusCircle className="w-4 h-4" />;
  let colorClass = "text-muted-foreground";

  if (isPositive) {
    icon = <TrendingDown className="w-4 h-4" />;
    colorClass = "text-emerald-500";
  } else if (isNegative) {
    icon = <TrendingUp className="w-4 h-4" />;
    colorClass = "text-red-500";
  }

  return (
    <div className={`flex items-center gap-1 text-sm font-medium ${colorClass}`}>
      {icon}
      <span>{value}</span>
    </div>
  );
};

const SeverityBar = ({ breakdown }: { breakdown?: SeverityBreakdown }) => {
  if (!breakdown) return null;

  const total = breakdown.Medium + breakdown.Low + (breakdown.High || 0) + (breakdown.Critical || 0);
  if (total === 0) return null;

  const mediumPercent = (breakdown.Medium / total) * 100;
  const lowPercent = (breakdown.Low / total) * 100;

  return (
    <div className="space-y-2">
      <div className="flex gap-1 h-2">
        {mediumPercent > 0 && (
          <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${mediumPercent}%` }} />
        )}
        {lowPercent > 0 && (
          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${lowPercent}%` }} />
        )}
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-yellow-500" />
          Medium {breakdown.Medium}
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-blue-500" />
          Low {breakdown.Low}
        </span>
      </div>
    </div>
  );
};

const QualityGateCard = () => {
  const { t, lang } = useLanguage();

  const data = {
    title: { fr: "Qualité du Projet", en: "Project Quality", ar: "جودة المشروع", es: "Calidad del Proyecto" },
    status: "passed",
    message: { fr: "Toutes les conditions sont remplies", en: "All conditions passed", ar: "جميع الشروط محققة", es: "Todas las condiciones cumplidas" },
  };

  return (
    <Card className="border-2 border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-background">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {getStatusIcon(data.status)}
            <div>
              <CardTitle className="text-lg">{getLocalizedText(data.title, lang)}</CardTitle>
              <CardDescription className="text-emerald-600 dark:text-emerald-400 font-medium">
                {getLocalizedText(data.message, lang)}
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

const MetricCard = ({ metric, index }: { metric: HealthMetric; index: number }) => {
  const { t, lang } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="h-full hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg border ${getRatingBg(metric.rating)}`}>
                <metric.icon className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-base">{getLocalizedText(metric.title, lang)}</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-2xl font-bold ${getRatingColor(metric.rating)}`}>
                    {metric.rating}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {metric.issues} {getLocalizedText(
                      { fr: "problèmes", en: "issues", ar: "مشاكل", es: "problemas" },
                      lang
                    )}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {metric.trend && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {getLocalizedText({ fr: "vs dernier 30 jours", en: "vs last 30 days", ar: "مقارنة بـ 30 يوم", es: "vs últimos 30 días" }, lang)}
              </span>
              <TrendIndicator direction={metric.trendDirection} value={metric.trend} />
            </div>
          )}

          {metric.severityBreakdown && (
            <SeverityBar breakdown={metric.severityBreakdown} />
          )}

          {metric.description && (
            <p className="text-sm text-muted-foreground">
              {getLocalizedText(metric.description, lang)}
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ProjectHealthDashboard = () => {
  const { t, lang } = useLanguage();

  const metrics: HealthMetric[] = [
    {
      id: "security",
      title: { fr: "Sécurité", en: "Security", ar: "الأمان", es: "Seguridad" },
      icon: Shield,
      rating: "A",
      issues: 0,
      trend: "0",
      trendDirection: "neutral",
      severityBreakdown: { Medium: 0, Low: 0 },
      description: { fr: "Aucune vulnérabilité critique détectée", en: "No critical vulnerabilities detected", ar: "لم يتم اكتشاف ثغرات حرجة", es: "No se detectaron vulnerabilidades críticas" },
    },
    {
      id: "security-hotspots",
      title: { fr: "Points de Sécurité", en: "Security Hotspots", ar: "نقاط الأمان", es: "Puntos de Seguridad" },
      icon: AlertCircle,
      rating: "A",
      issues: 0,
      trend: "-100%",
      trendDirection: "down",
      severityBreakdown: { Medium: 0, Low: 0 },
      description: { fr: "100% des points de sécurité examinés", en: "100% of security hotspots reviewed", ar: "100% من نقاط الأمان تمت مراجعتها", es: "100% de puntos de seguridad revisados" },
    },
    {
      id: "reliability",
      title: { fr: "Fiabilité", en: "Reliability", ar: "الموثوقية", es: "Fiabilidad" },
      icon: Bug,
      rating: "A",
      issues: 20,
      trend: "-48.7%",
      trendDirection: "down",
      severityBreakdown: { Medium: 19, Low: 1 },
      description: { fr: "95% des problèmes sont de gravité moyenne", en: "95% of issues are medium severity", ar: "95% من المشاكل ذات خطورة متوسطة", es: "95% de los problemas son de gravedad media" },
    },
    {
      id: "maintainability",
      title: { fr: "Maintenabilité", en: "Maintainability", ar: "القابلية للصيانة", es: "Mantenibilidad" },
      icon: Code2,
      rating: "A",
      issues: 385,
      trend: "-30.8%",
      trendDirection: "down",
      severityBreakdown: { Medium: 385, Low: 0 },
      description: { fr: "Code bien structuré et documenté", en: "Well-structured and documented code", ar: "كود منظم وموثق جيداً", es: "Código bien estructurado y documentado" },
    },
    {
      id: "duplications",
      title: { fr: "Duplications", en: "Duplications", ar: "التكرارات", es: "Duplicaciones" },
      icon: BarChart3,
      rating: "A",
      issues: 0,
      trend: "-42.5%",
      trendDirection: "down",
      severityBreakdown: { Medium: 0, Low: 0 },
      description: { fr: "12.6% de code dupliqué", en: "12.6% duplicated code", ar: "12.6% من الكود مكرر", es: "12.6% de código duplicado" },
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section id="project-health" className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <SectionHeader
          badgeKey="health_badge"
          titleKey="health_title"
          descriptionKey="health_subtitle"
        />

        {/* Quality Gate Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <QualityGateCard />
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {metrics.map((metric, index) => (
            <MetricCard key={metric.id} metric={metric} index={index} />
          ))}
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            {
              label: { fr: "Problèmes Ouverts", en: "Open Issues", ar: "المشاكل المفتوحة", es: "Problemas Abiertos" },
              value: "396",
              icon: AlertCircle,
              color: "text-orange-500",
            },
            {
              label: { fr: "Taux de Couverture", en: "Coverage Rate", ar: "معدل التغطية", es: "Tasa de Cobertura" },
              value: "N/A",
              icon: Activity,
              color: "text-blue-500",
            },
            {
              label: { fr: "Note Globale", en: "Overall Rating", ar: "التقييم العام", es: "Calificación General" },
              value: "A",
              icon: CheckSquare,
              color: "text-emerald-500",
            },
            {
              label: { fr: "Amélioration", en: "Improvement", ar: "التحسن", es: "Mejora" },
              value: "-30%",
              icon: TrendingDown,
              color: "text-emerald-500",
            },
          ].map((stat, index) => (
            <Card key={index} className="bg-card/50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {getLocalizedText(stat.label, lang)}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectHealthDashboard;
