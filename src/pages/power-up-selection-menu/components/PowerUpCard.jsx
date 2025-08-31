import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Star, Zap, Lock } from 'lucide-react';

const PowerUpCard = ({ powerUp, rarityColor, onSelect, disabled }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getRarityLabel = (rarity) => {
    return rarity?.charAt(0)?.toUpperCase() + rarity?.slice(1);
  };

  const getRarityIcon = (rarity) => {
    switch (rarity) {
      case 'legendary': return '💎';
      case 'epic': return '🔮';
      case 'rare': return '⭐';
      case 'common': return '🔘';
      default: return '🔘';
    }
  };

  return (
    <motion.div
      className={`relative bg-slate-700/50 backdrop-blur-sm rounded-2xl border border-slate-600/50 overflow-hidden transition-all duration-300 ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-slate-500/70'
      }`}
      whileHover={!disabled ? { 
        scale: 1.02, 
        y: -4,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
      } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={!disabled ? onSelect : undefined}
      layout
    >
      {/* Rarity Border */}
      <div className={`absolute inset-0 bg-gradient-to-r ${rarityColor} opacity-20 rounded-2xl`} />
      {/* Disabled Overlay */}
      {disabled && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] rounded-2xl flex items-center justify-center z-10">
          <div className="flex flex-col items-center text-slate-400">
            <Lock className="w-8 h-8 mb-2" />
            <span className="text-sm font-medium">No Uses Left</span>
          </div>
        </div>
      )}
      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div 
              className="text-3xl"
              animate={isHovered && !disabled ? { 
                scale: [1, 1.1, 1],
                rotate: [0, 10, 0] 
              } : {}}
              transition={{ duration: 0.3 }}
            >
              {powerUp?.icon}
            </motion.div>
            <div>
              <h3 className="text-lg font-bold text-white">{powerUp?.name}</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs">{getRarityIcon(powerUp?.rarity)}</span>
                <span className={`text-xs font-medium bg-gradient-to-r ${rarityColor} bg-clip-text text-transparent`}>
                  {getRarityLabel(powerUp?.rarity)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-yellow-400">{powerUp?.cost}</div>
            <div className="text-xs text-slate-400">coins</div>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-sm text-slate-300 mb-4 leading-relaxed">
          {powerUp?.description}
        </p>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center p-2 bg-slate-800/50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <Clock className="w-3 h-3 text-blue-400" />
            </div>
            <div className="text-sm font-semibold text-white">{powerUp?.duration}s</div>
            <div className="text-xs text-slate-400">Duration</div>
          </div>
          
          <div className="text-center p-2 bg-slate-800/50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <Zap className="w-3 h-3 text-green-400" />
            </div>
            <div className="text-sm font-semibold text-white">{powerUp?.uses}</div>
            <div className="text-xs text-slate-400">Uses</div>
          </div>
          
          <div className="text-center p-2 bg-slate-800/50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <Star className="w-3 h-3 text-purple-400" />
            </div>
            <div className="text-sm font-semibold text-white">{powerUp?.cooldown}s</div>
            <div className="text-xs text-slate-400">Cooldown</div>
          </div>
        </div>
        
        {/* Effects */}
        <div className="space-y-1">
          {powerUp?.effects?.map((effect, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-2 text-xs text-slate-400"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-1 h-1 bg-green-400 rounded-full" />
              {effect}
            </motion.div>
          ))}
        </div>
        
        {/* Hover Action */}
        <motion.div
          className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm flex items-center justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: isHovered && !disabled ? 1 : 0, 
            y: isHovered && !disabled ? 0 : 10 
          }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-white font-medium">Tap to Select</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PowerUpCard;