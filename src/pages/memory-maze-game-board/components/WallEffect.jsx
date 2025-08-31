import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WallEffect = ({ visible }) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="absolute inset-4 pointer-events-none z-30 rounded-2xl overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Particle effects */}
          {Array.from({ length: 20 })?.map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-purple-400 rounded-full"
              initial={{
                x: Math.random() * 100 + '%',
                y: Math.random() * 100 + '%',
                scale: 0,
                opacity: 0
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                y: [null, '-20px']
              }}
              transition={{
                duration: 0.8,
                delay: i * 0.05,
                ease: "easeOut"
              }}
            />
          ))}
          
          {/* Ripple effect */}
          <motion.div
            className="absolute inset-0 border-2 border-purple-400/50 rounded-2xl"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ 
              scale: [0, 1.2, 1.5], 
              opacity: [1, 0.5, 0] 
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          
          <motion.div
            className="absolute inset-0 border-2 border-purple-400/30 rounded-2xl"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ 
              scale: [0, 1.5, 2], 
              opacity: [1, 0.3, 0] 
            }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          />
          
          {/* Flash effect */}
          <motion.div
            className="absolute inset-0 bg-purple-400/20 rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.5, 0] 
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WallEffect;