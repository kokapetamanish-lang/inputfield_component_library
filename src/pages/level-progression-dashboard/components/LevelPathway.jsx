import React from 'react';
import { motion } from 'framer-motion';
import { Star, Lock, Play, CheckCircle } from 'lucide-react';

const LevelPathway = ({ levels, currentLevel, onLevelSelect, onLevelReplay }) => {
  const getLevelStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'from-green-500 to-emerald-600';
      case 'current': return 'from-yellow-500 to-orange-600';
      case 'locked': return 'from-gray-600 to-gray-700';
      default: return 'from-gray-600 to-gray-700';
    }
  };

  const getLevelStatusIcon = (level) => {
    switch (level?.status) {
      case 'completed': 
        return <CheckCircle className="w-6 h-6 text-white" />;
      case 'current': 
        return <Play className="w-6 h-6 text-white" />;
      case 'locked': 
        return <Lock className="w-5 h-5 text-gray-400" />;
      default: 
        return <Lock className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Your Journey</h2>
        <div className="text-sm text-purple-300">
          {levels?.filter(l => l?.status === 'completed')?.length} / {levels?.length} Completed
        </div>
      </div>
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute left-8 top-0 w-0.5 h-full bg-gradient-to-b from-green-500 via-yellow-500 to-gray-600 opacity-30" />

        {/* Level Nodes */}
        <div className="space-y-4">
          {levels?.map((level, index) => (
            <motion.div
              key={level?.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex items-center gap-4"
            >
              {/* Level Node */}
              <motion.button
                onClick={() => onLevelSelect(level)}
                className={`relative z-10 w-16 h-16 rounded-full bg-gradient-to-br ${getLevelStatusColor(level?.status)} flex items-center justify-center shadow-lg transition-transform hover:scale-105 ${
                  level?.status === 'locked' ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
                }`}
                whileHover={level?.status !== 'locked' ? { scale: 1.05 } : {}}
                whileTap={level?.status !== 'locked' ? { scale: 0.95 } : {}}
                animate={level?.status === 'current' ? {
                  boxShadow: ['0 0 0 0px rgba(234, 179, 8, 0.7)', '0 0 0 10px rgba(234, 179, 8, 0)'],
                  transition: { duration: 2, repeat: Infinity }
                } : {}}
              >
                {getLevelStatusIcon(level)}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white bg-black/50 px-2 py-1 rounded">
                  {level?.id}
                </div>
              </motion.button>

              {/* Level Info */}
              <div className="flex-1 bg-white/10 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-white">Level {level?.id}</h3>
                  <div className="flex items-center gap-2">
                    {level?.status === 'completed' && (
                      <div className="flex gap-1">
                        {[1, 2, 3]?.map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= level?.stars 
                                ? 'text-yellow-400 fill-current' :'text-gray-500'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      level?.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                      level?.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      level?.difficulty === 'Hard'? 'bg-orange-500/20 text-orange-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {level?.difficulty}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
                  <div>
                    <span className="text-gray-400">Wall Shift:</span>
                    <span className="ml-2 text-white">Every {level?.wallShiftFreq}s</span>
                  </div>
                  {level?.bestTime && (
                    <div>
                      <span className="text-gray-400">Best Time:</span>
                      <span className="ml-2 text-white">{level?.bestTime}s</span>
                    </div>
                  )}
                  {level?.status === 'current' && (
                    <div>
                      <span className="text-gray-400">Attempts:</span>
                      <span className="ml-2 text-white">{level?.attempts}</span>
                    </div>
                  )}
                </div>

                {level?.newMechanics && level?.newMechanics?.length > 0 && (
                  <div className="mt-2">
                    <span className="text-xs text-purple-400">New: </span>
                    {level?.newMechanics?.map((mechanic, idx) => (
                      <span key={idx} className="text-xs text-purple-300 ml-1">
                        {mechanic}{idx < level?.newMechanics?.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </div>
                )}

                {level?.status === 'completed' && (
                  <button
                    onClick={(e) => {
                      e?.stopPropagation();
                      onLevelReplay(level?.id);
                    }}
                    className="mt-3 px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-xs font-medium hover:bg-blue-500/30 transition-colors"
                  >
                    Replay
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LevelPathway;