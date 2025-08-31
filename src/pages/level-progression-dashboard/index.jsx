import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Clock, Star, Target, Settings, ChevronLeft, TrendingUp } from 'lucide-react';
import LevelPathway from './components/LevelPathway';
import PerformanceAnalytics from './components/PerformanceAnalytics';
import DifficultySettings from './components/DifficultySettings';
import AchievementBadges from './components/AchievementBadges';
import DailyChallenges from './components/DailyChallenges';
import SocialSharing from './components/SocialSharing';

const LevelProgressionDashboard = () => {
  const [currentLevel, setCurrentLevel] = useState(5);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [playerStats, setPlayerStats] = useState({
    totalLevelsCompleted: 12,
    bestTime: 45.2,
    averageTime: 62.8,
    totalPowerUpsUsed: 34,
    globalRank: 1247,
    totalScore: 15840
  });

  const [levels, setLevels] = useState([
    // Completed levels
    { id: 1, status: 'completed', stars: 3, bestTime: 42.1, attempts: 3, difficulty: 'Easy', wallShiftFreq: 8 },
    { id: 2, status: 'completed', stars: 3, bestTime: 38.5, attempts: 2, difficulty: 'Easy', wallShiftFreq: 7 },
    { id: 3, status: 'completed', stars: 2, bestTime: 51.2, attempts: 5, difficulty: 'Easy', wallShiftFreq: 6 },
    { id: 4, status: 'completed', stars: 3, bestTime: 45.8, attempts: 4, difficulty: 'Medium', wallShiftFreq: 5.5 },
    { id: 5, status: 'current', stars: 0, bestTime: null, attempts: 7, difficulty: 'Medium', wallShiftFreq: 5 },
    // Upcoming levels
    { id: 6, status: 'locked', stars: 0, bestTime: null, attempts: 0, difficulty: 'Medium', wallShiftFreq: 4.5, newMechanics: ['Moving Walls'] },
    { id: 7, status: 'locked', stars: 0, bestTime: null, attempts: 0, difficulty: 'Hard', wallShiftFreq: 4, newMechanics: ['Teleport Pads'] },
    { id: 8, status: 'locked', stars: 0, bestTime: null, attempts: 0, difficulty: 'Hard', wallShiftFreq: 3.5, newMechanics: ['Mirror Maze'] },
    { id: 9, status: 'locked', stars: 0, bestTime: null, attempts: 0, difficulty: 'Expert', wallShiftFreq: 3, newMechanics: ['Gravity Shifts'] },
    { id: 10, status: 'locked', stars: 0, bestTime: null, attempts: 0, difficulty: 'Expert', wallShiftFreq: 2.5, newMechanics: ['Time Dilation'] },
  ]);

  const [achievements, setAchievements] = useState([
    { id: 1, name: 'Speed Runner', description: 'Complete 5 levels under 30 seconds', unlocked: true, icon: '⚡' },
    { id: 2, name: 'Perfect Path', description: 'Complete a level without using power-ups', unlocked: true, icon: '🎯' },
    { id: 3, name: 'Wall Master', description: 'Complete 10 levels', unlocked: true, icon: '🧱' },
    { id: 4, name: 'Star Collector', description: 'Earn 25 stars total', unlocked: false, icon: '⭐' },
    { id: 5, name: 'Maze Legend', description: 'Reach level 15', unlocked: false, icon: '👑' }
  ]);

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
  };

  const handleLevelReplay = (levelId) => {
    // Simulate replay functionality
    console.log(`Replaying level ${levelId}`);
    setSelectedLevel(null);
  };

  const handleDifficultyChange = (levelId, newDifficulty) => {
    setLevels(prev => prev?.map(level => 
      level?.id === levelId 
        ? { ...level, difficulty: newDifficulty, wallShiftFreq: getDifficultyFrequency(newDifficulty) }
        : level
    ));
  };

  const getDifficultyFrequency = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 8;
      case 'Medium': return 5;
      case 'Hard': return 3.5;
      case 'Expert': return 2.5;
      default: return 5;
    }
  };

  const getProgressPercentage = () => {
    const completedLevels = levels?.filter(level => level?.status === 'completed')?.length;
    return (completedLevels / levels?.length) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      {/* Header */}
      <div className="relative z-10 p-4 border-b border-white/10 backdrop-blur-sm bg-black/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">Level Progress</h1>
              <p className="text-purple-300 text-sm">Track your Memory Maze journey</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowAnalytics(!showAnalytics)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <TrendingUp className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <Settings className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
            <div className="flex items-center gap-2 text-yellow-400 mb-1">
              <Trophy className="w-4 h-4" />
              <span className="text-xs font-medium">Level</span>
            </div>
            <p className="text-xl font-bold text-white">{currentLevel}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
            <div className="flex items-center gap-2 text-blue-400 mb-1">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-medium">Best Time</span>
            </div>
            <p className="text-xl font-bold text-white">{playerStats?.bestTime}s</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
            <div className="flex items-center gap-2 text-green-400 mb-1">
              <Star className="w-4 h-4" />
              <span className="text-xs font-medium">Total Stars</span>
            </div>
            <p className="text-xl font-bold text-white">{levels?.reduce((sum, level) => sum + level?.stars, 0)}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
            <div className="flex items-center gap-2 text-purple-400 mb-1">
              <Target className="w-4 h-4" />
              <span className="text-xs font-medium">Progress</span>
            </div>
            <p className="text-xl font-bold text-white">{Math.round(getProgressPercentage())}%</p>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="relative z-10 p-4 space-y-6">
        {/* Level Pathway */}
        <LevelPathway
          levels={levels}
          currentLevel={currentLevel}
          onLevelSelect={handleLevelSelect}
          onLevelReplay={handleLevelReplay}
        />

        {/* Achievement Badges */}
        <AchievementBadges achievements={achievements} />

        {/* Daily Challenges */}
        <DailyChallenges />
      </div>
      {/* Level Detail Modal */}
      <AnimatePresence>
        {selectedLevel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedLevel(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="bg-slate-800 rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e?.stopPropagation()}
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Level {selectedLevel?.id}</h3>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="flex gap-1">
                    {[1, 2, 3]?.map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          star <= selectedLevel?.stars 
                            ? 'text-yellow-400 fill-current' :'text-gray-500'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    selectedLevel?.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                    selectedLevel?.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    selectedLevel?.difficulty === 'Hard'? 'bg-orange-500/20 text-orange-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {selectedLevel?.difficulty}
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-sm text-gray-300">
                {selectedLevel?.bestTime && (
                  <div className="flex justify-between">
                    <span>Best Time:</span>
                    <span className="text-white font-medium">{selectedLevel?.bestTime}s</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Attempts:</span>
                  <span className="text-white font-medium">{selectedLevel?.attempts}</span>
                </div>
                <div className="flex justify-between">
                  <span>Wall Shift Frequency:</span>
                  <span className="text-white font-medium">Every {selectedLevel?.wallShiftFreq}s</span>
                </div>
                {selectedLevel?.newMechanics && (
                  <div>
                    <span>New Mechanics:</span>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {selectedLevel?.newMechanics?.map((mechanic, index) => (
                        <span key={index} className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">
                          {mechanic}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-6">
                {selectedLevel?.status === 'completed' && (
                  <button
                    onClick={() => handleLevelReplay(selectedLevel?.id)}
                    className="flex-1 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors"
                  >
                    Replay Level
                  </button>
                )}
                <SocialSharing level={selectedLevel} className="flex-1" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Performance Analytics Modal */}
      <AnimatePresence>
        {showAnalytics && (
          <PerformanceAnalytics
            isOpen={showAnalytics}
            onClose={() => setShowAnalytics(false)}
            playerStats={playerStats}
            levels={levels}
          />
        )}
      </AnimatePresence>
      {/* Difficulty Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <DifficultySettings
            isOpen={showSettings}
            onClose={() => setShowSettings(false)}
            levels={levels}
            onDifficultyChange={handleDifficultyChange}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default LevelProgressionDashboard;