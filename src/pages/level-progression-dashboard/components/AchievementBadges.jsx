import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock, Target, Zap, Award, Star } from 'lucide-react';

const AchievementBadges = ({ achievements }) => {
  const getAchievementIcon = (achievement) => {
    switch (achievement?.name) {
      case 'Speed Runner':
        return <Clock className="w-6 h-6" />;
      case 'Perfect Path':
        return <Target className="w-6 h-6" />;
      case 'Wall Master':
        return <Zap className="w-6 h-6" />;
      case 'Star Collector':
        return <Star className="w-6 h-6" />;
      case 'Maze Legend':
        return <Trophy className="w-6 h-6" />;
      default:
        return <Award className="w-6 h-6" />;
    }
  };

  const getAchievementColor = (achievement) => {
    if (achievement?.unlocked) {
      switch (achievement?.name) {
        case 'Speed Runner':
          return 'from-blue-500 to-cyan-500';
        case 'Perfect Path':
          return 'from-green-500 to-emerald-500';
        case 'Wall Master':
          return 'from-purple-500 to-violet-500';
        case 'Star Collector':
          return 'from-yellow-500 to-orange-500';
        case 'Maze Legend':
          return 'from-pink-500 to-rose-500';
        default:
          return 'from-gray-500 to-gray-600';
      }
    }
    return 'from-gray-700 to-gray-800';
  };

  const unlockedCount = achievements?.filter(a => a?.unlocked)?.length;
  const progressPercentage = (unlockedCount / achievements?.length) * 100;

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Achievements</h2>
          <p className="text-purple-300 text-sm">{unlockedCount} of {achievements?.length} unlocked</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">{Math.round(progressPercentage)}%</div>
          <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {achievements?.map((achievement, index) => (
          <motion.div
            key={achievement?.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="relative group"
          >
            <motion.div
              className={`relative p-4 rounded-xl bg-gradient-to-br ${getAchievementColor(achievement)} ${
                achievement?.unlocked 
                  ? 'shadow-lg shadow-purple-500/20 cursor-pointer' 
                  : 'opacity-60'
              }`}
              whileHover={achievement?.unlocked ? { scale: 1.05, y: -2 } : {}}
              whileTap={achievement?.unlocked ? { scale: 0.95 } : {}}
            >
              {/* Achievement Icon */}
              <div className={`text-center mb-3 ${achievement?.unlocked ? 'text-white' : 'text-gray-500'}`}>
                {getAchievementIcon(achievement)}
              </div>

              {/* Badge Glow Effect for Unlocked Achievements */}
              {achievement?.unlocked && (
                <motion.div
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
              )}

              {/* Lock Overlay for Locked Achievements */}
              {!achievement?.unlocked && (
                <div className="absolute inset-0 rounded-xl bg-black/50 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-gray-400 rounded-full flex items-center justify-center">
                    <div className="w-2 h-3 border-r-2 border-b-2 border-gray-400 transform rotate-12" />
                  </div>
                </div>
              )}

              {/* Recently Unlocked Indicator */}
              {achievement?.unlocked && index < 2 && (
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [1, 0.7, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}
            </motion.div>

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
              <div className="bg-slate-800 text-white p-3 rounded-lg text-center shadow-xl max-w-48">
                <p className="font-semibold text-sm">{achievement?.name}</p>
                <p className="text-xs text-gray-300 mt-1">{achievement?.description}</p>
                {achievement?.unlocked && (
                  <p className="text-xs text-green-400 mt-2 font-medium">✓ Unlocked!</p>
                )}
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45" />
            </div>
          </motion.div>
        ))}
      </div>
      {/* Achievement Progress Bar */}
      <div className="mt-6 p-4 bg-white/5 rounded-xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-300">Achievement Progress</span>
          <span className="text-sm text-purple-400">{unlockedCount}/{achievements?.length}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 rounded-full relative"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            {progressPercentage > 0 && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            )}
          </motion.div>
        </div>
      </div>
      {/* Next Achievement Preview */}
      {unlockedCount < achievements?.length && (
        <div className="mt-4 p-3 bg-white/5 rounded-xl border border-purple-500/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center opacity-60">
              {getAchievementIcon(achievements?.find(a => !a?.unlocked))}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">
                Next: {achievements?.find(a => !a?.unlocked)?.name}
              </p>
              <p className="text-xs text-gray-400">
                {achievements?.find(a => !a?.unlocked)?.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AchievementBadges;