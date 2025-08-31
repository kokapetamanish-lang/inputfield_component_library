import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Target, X } from 'lucide-react';

const PowerUpStats = ({ powerUps, onClose }) => {
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      className="w-80 bg-slate-800/95 backdrop-blur-sm border-l border-slate-600/50 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-600/50">
        <h3 className="text-lg font-semibold text-white">Power-Up Analytics</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-slate-700 rounded-lg text-slate-400 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      {/* Stats Content */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {powerUps?.map((powerUp, index) => (
          <motion.div
            key={powerUp?.id}
            className="bg-slate-700/50 rounded-xl p-4 space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            {/* Power-up header */}
            <div className="flex items-center gap-3">
              <span className="text-2xl">{powerUp?.icon}</span>
              <div className="flex-1">
                <h4 className="font-semibold text-white text-sm">{powerUp?.name}</h4>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span>{powerUp?.rarity}</span>
                  <span>{powerUp?.cost} coins</span>
                </div>
              </div>
            </div>
            
            {/* Usage Stats */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-3 h-3 text-green-400" />
                  <span className="text-xs text-slate-300">Usage Rate</span>
                </div>
                <span className="text-xs font-semibold text-white">{powerUp?.stats?.usage}%</span>
              </div>
              <div className="w-full bg-slate-600 rounded-full h-1.5">
                <motion.div
                  className="bg-gradient-to-r from-green-400 to-green-500 h-1.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${powerUp?.stats?.usage}%` }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.8 }}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="w-3 h-3 text-blue-400" />
                  <span className="text-xs text-slate-300">Effectiveness</span>
                </div>
                <span className="text-xs font-semibold text-white">{powerUp?.stats?.effectiveness}%</span>
              </div>
              <div className="w-full bg-slate-600 rounded-full h-1.5">
                <motion.div
                  className="bg-gradient-to-r from-blue-400 to-blue-500 h-1.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${powerUp?.stats?.effectiveness}%` }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-3 h-3 text-purple-400" />
                  <span className="text-xs text-slate-300">Popularity</span>
                </div>
                <span className="text-xs font-semibold text-white">{powerUp?.stats?.popularity}%</span>
              </div>
              <div className="w-full bg-slate-600 rounded-full h-1.5">
                <motion.div
                  className="bg-gradient-to-r from-purple-400 to-purple-500 h-1.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${powerUp?.stats?.popularity}%` }}
                  transition={{ delay: index * 0.1 + 0.4, duration: 0.8 }}
                />
              </div>
            </div>
          </motion.div>
        ))}
        
        {/* Summary */}
        <div className="mt-6 p-4 bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-xl border border-slate-500/30">
          <h4 className="font-semibold text-white mb-3">Player Insights</h4>
          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex justify-between">
              <span>Most Popular:</span>
              <span className="text-white font-medium">Freeze Walls</span>
            </div>
            <div className="flex justify-between">
              <span>Most Effective:</span>
              <span className="text-white font-medium">Wall Phase</span>
            </div>
            <div className="flex justify-between">
              <span>Best Value:</span>
              <span className="text-white font-medium">Magnetic Goal</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PowerUpStats;