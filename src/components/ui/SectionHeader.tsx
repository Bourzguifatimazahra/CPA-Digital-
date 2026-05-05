import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { TranslationKey } from "@/i18n/translations";

interface SectionHeaderProps {
  badgeKey: TranslationKey;
  titleKey: TranslationKey;
  descriptionKey?: TranslationKey;
  align?: "center" | "left";
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

/**
 * Reusable section header component with consistent styling and animations
 * Eliminates duplication across multiple section components
 */
const SectionHeader = ({
  badgeKey,
  titleKey,
  descriptionKey,
  align = "center",
  maxWidth = "2xl",
}: SectionHeaderProps) => {
  const { t } = useLanguage();

  const maxWidthClass = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    full: "w-full",
  }[maxWidth];

  const alignmentClass = align === "center" ? "text-center" : "text-left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`${maxWidthClass} ${alignmentClass} mx-auto mb-16`}
    >
      <span className="text-accent font-semibold text-sm tracking-wide uppercase">
        {t(badgeKey)}
      </span>
      <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-foreground mt-3 mb-4">
        {t(titleKey)}
      </h2>
      {descriptionKey && (
        <p className="text-muted-foreground text-lg leading-relaxed">
          {t(descriptionKey)}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
