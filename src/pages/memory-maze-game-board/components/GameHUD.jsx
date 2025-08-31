import React from 'react';
import { motion } from 'framer-motion';
import { Pause, Play, RotateCcw } from 'lucide-react';

const GameHUD = ({ 
  level, 
  timer, 
  timerColor, 
  score, 
  isPaused, 
  onPause, 
  onReset 
}) => {
  return (
    <div className="absolute top-0 left-0 right-0 z-20 p-4">
      <div className="flex items-center justify-between">
        {/* Left Section - Level & Score */}
        <div className="flex items-center gap-4">
          <motion.div 
            className="bg-slate-800/90 backdrop-blur-sm rounded-xl px-4 py-2 border border-slate-600/50"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="text-xs text-slate-400">Level</div>
            <div className="text-xl font-bold text-white">{level}</div>
          </motion.div>
          
          <motion.div 
            className="bg-slate-800/90 backdrop-blur-sm rounded-xl px-4 py-2 border border-slate-600/50"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="text-xs text-slate-400">Score</div>
            <div className="text-xl font-bold text-white">{score}</div>
          </motion.div>
        </div>

        {/* Center Section - Timer */}
        <motion.div 
          className="bg-slate-800/90 backdrop-blur-sm rounded-xl px-6 py-3 border border-slate-600/50"
          animate={{ 
            borderColor: timer <= 3 ? 'rgb(248 113 113)' : timer <= 5 ? 'rgb(251 191 36)' : 'rgb(34 197 94)',
            boxShadow: timer <= 3 ? '0 0 20px rgba(248, 113, 113, 0.3)' : 'none'
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-xs text-slate-400 text-center">Next Shift</div>
          <div className={`text-2xl font-bold text-center ${timerColor}`}>
            {Math.ceil(timer)}s
          </div>
          
          {/* Timer progress bar */}
          <div className="w-16 h-1 bg-slate-600 rounded-full mt-2 overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${
                timer <= 3 ? 'bg-red-400' : timer <= 5 ? 'bg-yellow-400' : 'bg-green-400'
              }`}
              animate={{ 
                width: `${(timer / (8 - Math.floor(level / 3))) * 100}%` 
              }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </motion.div>

        {/* Right Section - Controls */}
        <div className="flex items-center gap-2">
          <motion.button
            onClick={onPause}
            className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-3 border border-slate-600/50 text-white hover:bg-slate-700/90 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
          </motion.button>
          
          <motion.button
            onClick={onReset}
            className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-3 border border-slate-600/50 text-white hover:bg-slate-700/90 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default GameHUD;