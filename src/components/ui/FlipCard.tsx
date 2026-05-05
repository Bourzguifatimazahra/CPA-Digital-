import { useState } from "react";
import { motion } from "framer-motion";

interface FlipCardProps {
  children: (props: { flipped: boolean; toggleFlipped: () => void }) => React.ReactNode;
  className?: string;
  flipOnHover?: boolean;
  flipOnClick?: boolean;
  disabled?: boolean;
  index?: number;
  staggerDelay?: number;
}

/**
 * Reusable FlipCard component with 3D flip animation
 * Eliminates duplication across TeamSection, ValuesSection, and NewInsuranceSection
 */
const FlipCard = ({
  children,
  className = "",
  flipOnHover = true,
  flipOnClick = false,
  disabled = false,
  index = 0,
  staggerDelay = 0.04,
}: FlipCardProps) => {
  const [flipped, setFlipped] = useState(false);

  const toggleFlipped = () => {
    if (!disabled) {
      setFlipped(!flipped);
    }
  };

  const handleHoverStart = () => {
    if (flipOnHover && !disabled) {
      setFlipped(true);
    }
  };

  const handleHoverEnd = () => {
    if (flipOnHover && !disabled) {
      setFlipped(false);
    }
  };

  return (
    <motion.div
      className={`relative ${className}`}
      style={{ perspective: 1000 }}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      onClick={flipOnClick ? toggleFlipped : undefined}
      initial={{ opacity: 0, scale: 0.8, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * staggerDelay }}
    >
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {children({ flipped, toggleFlipped })}
      </motion.div>
    </motion.div>
  );
};

export default FlipCard;
