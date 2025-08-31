import React from 'react';
import { motion } from 'framer-motion';

const PlayerCharacter = ({ position, gridSize, speedBoost }) => {
  return (
    <motion.div
      className={`absolute z-10 w-6 h-6 rounded-full shadow-lg ${
        speedBoost 
          ? 'bg-gradient-to-r from-cyan-400 to-blue-500 shadow-cyan-400/50' 
          : 'bg-gradient-to-r from-emerald-400 to-teal-500 shadow-emerald-400/50'
      }`}
      style={{
        left: `${(position?.x * 100) / gridSize}%`,
        top: `${(position?.y * 100) / gridSize}%`,
        transform: 'translate(-50%, -50%)'
      }}
      animate={{
        x: 0,
        y: 0,
        scale: speedBoost ? [1, 1.2, 1] : [1, 1.1, 1],
        boxShadow: speedBoost ? [
          '0 0 10px rgba(34, 211, 238, 0.5)',
          '0 0 20px rgba(34, 211, 238, 0.8)',
          '0 0 10px rgba(34, 211, 238, 0.5)'
        ] : [
          '0 0 10px rgba(16, 185, 129, 0.5)',
          '0 0 15px rgba(16, 185, 129, 0.7)',
          '0 0 10px rgba(16, 185, 129, 0.5)'
        ]
      }}
      transition={{
        x: { duration: 0.2 },
        y: { duration: 0.2 },
        scale: { duration: speedBoost ? 0.5 : 1, repeat: Infinity },
        boxShadow: { duration: speedBoost ? 1 : 1.5, repeat: Infinity }
      }}
      layout
    >
      {/* Inner glow effect */}
      <div className="absolute inset-1 bg-white/30 rounded-full" />
      {/* Speed trail effect */}
      {speedBoost && (
        <>
          <motion.div
            className="absolute inset-0 bg-cyan-400/30 rounded-full"
            animate={{
              scale: [1, 1.5, 1.8],
              opacity: [0.6, 0.2, 0]
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
          <motion.div
            className="absolute inset-0 bg-cyan-400/20 rounded-full"
            animate={{
              scale: [1, 1.3, 1.6],
              opacity: [0.4, 0.1, 0]
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.2
            }}
          />
        </>
      )}
    </motion.div>
  );
};

export default PlayerCharacter;