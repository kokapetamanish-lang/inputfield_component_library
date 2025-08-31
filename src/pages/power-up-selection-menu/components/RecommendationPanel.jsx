import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp } from 'lucide-react';

const RecommendationPanel = ({ recommendations, onSelect }) => {
  if (!recommendations || recommendations?.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-yellow-400" />
        <h3 className="text-lg font-semibold text-white">Recommended for You</h3>
        <TrendingUp className="w-4 h-4 text-green-400" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {recommendations?.map((powerUp, index) => (
          <motion.div
            key={powerUp?.id}
            className="relative bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 rounded-xl p-4 cursor-pointer group hover:border-yellow-400/50 transition-all"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(powerUp)}
          >
            {/* Recommended badge */}
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              HOT
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-3xl">{powerUp?.icon}</div>
              <div className="flex-1">
                <h4 className="font-bold text-white">{powerUp?.name}</h4>
                <p className="text-sm text-slate-300 line-clamp-2">
                  {powerUp?.description}
                </p>
                <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                  <span>{powerUp?.duration}s duration</span>
                  <span>•</span>
                  <span className="text-yellow-400 font-semibold">{powerUp?.cost} coins</span>
                </div>
              </div>
            </div>
            
            {/* Hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 to-orange-400/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>
      <motion.div
        className="mt-3 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-xs text-slate-400">
          💡 Based on your current performance and level progression
        </p>
      </motion.div>
    </motion.div>
  );
};

export default RecommendationPanel;