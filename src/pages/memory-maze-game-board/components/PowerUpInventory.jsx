import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Snowflake, Map, Zap, Ghost } from 'lucide-react';
import Icon from '../../../components/AppIcon';


const PowerUpInventory = ({ powerUps, activePowerUps, onActivatePowerUp }) => {
  const powerUpConfig = {
    freezeWalls: {
      icon: Snowflake,
      name: 'Freeze',
      color: 'from-cyan-400 to-blue-500',
      activeColor: 'from-cyan-300 to-blue-400',
      description: 'Stop wall shifts'
    },
    seeMap: {
      icon: Map,
      name: 'Map',
      color: 'from-green-400 to-emerald-500',
      activeColor: 'from-green-300 to-emerald-400',
      description: 'Show optimal path'
    },
    speedBoost: {
      icon: Zap,
      name: 'Speed',
      color: 'from-yellow-400 to-orange-500',
      activeColor: 'from-yellow-300 to-orange-400',
      description: 'Move faster'
    },
    wallPhase: {
      icon: Ghost,
      name: 'Phase',
      color: 'from-purple-400 to-pink-500',
      activeColor: 'from-purple-300 to-pink-400',
      description: 'Pass through walls'
    }
  };

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
      <motion.div 
        className="flex items-center gap-3 bg-slate-800/90 backdrop-blur-sm rounded-2xl p-4 border border-slate-600/50"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {Object.entries(powerUpConfig)?.map(([key, config]) => {
          const Icon = config?.icon;
          const count = powerUps?.[key];
          const isActive = activePowerUps?.[key];
          const isAvailable = count > 0 && !isActive;
          
          return (
            <motion.button
              key={key}
              onClick={() => isAvailable && onActivatePowerUp(key)}
              className={`relative flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${
                isActive 
                  ? 'bg-gradient-to-br ' + config?.activeColor + ' text-white shadow-lg'
                  : isAvailable
                    ? 'bg-gradient-to-br ' + config?.color + ' text-white hover:scale-105 active:scale-95' :'bg-slate-600/50 text-slate-400 cursor-not-allowed'
              }`}
              whileHover={isAvailable ? { scale: 1.05 } : {}}
              whileTap={isAvailable ? { scale: 0.95 } : {}}
              disabled={!isAvailable}
            >
              {/* Active indicator */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-white/20 to-white/10 rounded-xl"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: [0.5, 1, 0.5], 
                      scale: [0.9, 1.1, 0.9] 
                    }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity,
                      ease: "easeInOut" 
                    }}
                  />
                )}
              </AnimatePresence>
              {/* Icon */}
              <motion.div
                animate={isActive ? { rotate: [0, 10, -10, 0] } : {}}
                transition={isActive ? { duration: 0.5, repeat: Infinity } : {}}
              >
                <Icon className="w-6 h-6" />
              </motion.div>
              {/* Name */}
              <span className="text-xs font-medium">{config?.name}</span>
              {/* Count badge */}
              <AnimatePresence>
                {count > 0 && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    layout
                  >
                    {count}
                  </motion.div>
                )}
              </AnimatePresence>
              {/* Tooltip */}
              <div className="absolute bottom-full mb-2 hidden group-hover:block bg-slate-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {config?.description}
              </div>
            </motion.button>
          );
        })}
      </motion.div>
      {/* Instructions */}
      <motion.div 
        className="mt-2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1 }}
      >
        <p className="text-xs text-slate-400">Tap power-ups to activate • Swipe to move</p>
      </motion.div>
    </div>
  );
};

export default PowerUpInventory;