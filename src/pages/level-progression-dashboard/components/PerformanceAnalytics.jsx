import React from 'react';
import { motion } from 'framer-motion';
import { X, TrendingUp, Clock, Target, Zap, Award } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const PerformanceAnalytics = ({ isOpen, onClose, playerStats, levels }) => {
  const completedLevels = levels?.filter(level => level?.status === 'completed');
  
  // Generate performance data for charts
  const performanceData = completedLevels?.map((level, index) => ({
    level: level?.id,
    time: level?.bestTime,
    attempts: level?.attempts,
    stars: level?.stars,
    efficiency: level?.bestTime ? Math.round(100 / level?.bestTime * 10) / 10 : 0
  }));

  const skillProgressData = [
    { skill: 'Speed', value: 85, color: 'text-blue-400' },
    { skill: 'Strategy', value: 72, color: 'text-green-400' },
    { skill: 'Memory', value: 90, color: 'text-purple-400' },
    { skill: 'Adaptability', value: 68, color: 'text-yellow-400' }
  ];

  const recentAchievements = [
    { name: 'Speed Demon', description: 'Complete 3 levels under 40s', date: '2 days ago' },
    { name: 'Perfect Run', description: 'Complete level without retries', date: '4 days ago' },
    { name: 'Wall Master', description: 'Navigate through 100 wall shifts', date: '1 week ago' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e?.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-slate-800 border-b border-white/10 p-6 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">Performance Analytics</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Overall Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <Clock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{playerStats?.averageTime}s</p>
              <p className="text-xs text-gray-400">Avg. Completion</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <Target className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">#{playerStats?.globalRank}</p>
              <p className="text-xs text-gray-400">Global Rank</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <Zap className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{playerStats?.totalPowerUpsUsed}</p>
              <p className="text-xs text-gray-400">Power-ups Used</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <Award className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{playerStats?.totalScore?.toLocaleString()}</p>
              <p className="text-xs text-gray-400">Total Score</p>
            </div>
          </div>

          {/* Performance Chart */}
          <div className="bg-white/5 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Completion Times</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <XAxis 
                    dataKey="level" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#9CA3AF' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#9CA3AF' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1E293B',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="time" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: '#60A5FA' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Skill Assessment */}
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Skill Assessment</h3>
              <div className="space-y-4">
                {skillProgressData?.map((skill, index) => (
                  <div key={skill?.skill} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-300">{skill?.skill}</span>
                      <span className={`text-sm font-bold ${skill?.color}`}>{skill?.value}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full bg-gradient-to-r ${
                          skill?.skill === 'Speed' ? 'from-blue-500 to-blue-400' :
                          skill?.skill === 'Strategy' ? 'from-green-500 to-green-400' :
                          skill?.skill === 'Memory'? 'from-purple-500 to-purple-400' : 'from-yellow-500 to-yellow-400'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill?.value}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Achievements</h3>
              <div className="space-y-3">
                {recentAchievements?.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
                  >
                    <div className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{achievement?.name}</p>
                      <p className="text-xs text-gray-400 truncate">{achievement?.description}</p>
                    </div>
                    <span className="text-xs text-purple-400 flex-shrink-0">{achievement?.date}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Difficulty Progress Chart */}
          <div className="bg-white/5 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Attempts vs Success Rate</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <XAxis 
                    dataKey="level" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#9CA3AF' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#9CA3AF' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1E293B',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="attempts"
                    stackId="1"
                    stroke="#F59E0B"
                    fill="url(#gradientAttempts)"
                  />
                  <defs>
                    <linearGradient id="gradientAttempts" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PerformanceAnalytics;