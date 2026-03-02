import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cpaLogo from "@/assets/cpa-logo.png";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Spinning Circle with Logo */}
        <div className="relative mb-8">
          {/* Outer spinning circle */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ 
              width: 140, 
              height: 140, 
              top: -20, 
              left: -20,
              border: "4px solid transparent",
              borderTopColor: "#0066cc",
              borderRightColor: "#0066cc",
            }}
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
          
          {/* Middle spinning circle */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ 
              width: 120, 
              height: 120, 
              top: -10, 
              left: -10,
              border: "3px solid transparent",
              borderBottomColor: "#00aaff",
              borderLeftColor: "#00aaff",
            }}
            animate={{ rotate: -360 }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />

          {/* Logo with white background */}
          <motion.div
            className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          >
            <motion.img
              src={cpaLogo}
              alt="CPA"
              className="w-20 h-20 object-contain"
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>

        <motion.h1
          className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          CPA
        </motion.h1>
        <motion.p
          className="text-gray-600 text-sm font-body mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Conseil et Placement d'Assurances
        </motion.p>

        {/* Progress bar */}
        <motion.div
          className="w-48 h-1.5 rounded-full overflow-hidden bg-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            className="h-full rounded-full cpa-gradient-bg"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
