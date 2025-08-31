import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Trophy, Target, Zap, Star, CheckCircle, RefreshCw } from 'lucide-react';

const DailyChallenges = () => {
  const [challenges, setChallenges] = useState([
    {
      id: 1,
      title: 'Speed Demon',
      description: 'Complete any level in under 30 seconds',
      type: 'speed',
      reward: { type: 'powerup', amount: 2, name: 'Freeze Walls' },
      progress: 0,
      target: 1,
      completed: false,
      timeLeft: 18 * 3600, // 18 hours in seconds
      icon: Clock,
      difficulty: 'Medium'
    },
    {
      id: 2,
      title: 'Perfect Navigation',
      description: 'Complete 3 levels without hitting walls',
      type: 'precision',
      reward: { type: 'points', amount: 500, name: 'Bonus Points' },
      progress: 1,
      target: 3,
      completed: false,
      timeLeft: 18 * 3600,
      icon: Target,
      difficulty: 'Hard'
    },
    {
      id: 3,
      title: 'Power User',
      description: 'Use 5 different power-ups in one session',
      type: 'usage',
      reward: { type: 'achievement', amount: 1, name: 'Power Master Badge' },
      progress: 3,
      target: 5,
      completed: false,
      timeLeft: 18 * 3600,
      icon: Zap,
      difficulty: 'Easy'
    }
  ]);

  const [timeLeft, setTimeLeft] = useState(18 * 3600); // 18 hours

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
      setChallenges(prev => 
        prev?.map(challenge => ({
          ...challenge,
          timeLeft: Math.max(0, challenge?.timeLeft - 1)
        }))
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours?.toString()?.padStart(2, '0')}:${minutes?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const getChallengeColor = (type) => {
    switch (type) {
      case 'speed': return 'from-blue-500 to-cyan-500';
      case 'precision': return 'from-green-500 to-emerald-500';
      case 'usage': return 'from-purple-500 to-violet-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/20 text-green-400';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'Hard': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getRewardIcon = (rewardType) => {
    switch (rewardType) {
      case 'powerup': return <Zap className="w-4 h-4" />;
      case 'points': return <Star className="w-4 h-4" />;
      case 'achievement': return <Trophy className="w-4 h-4" />;
      default: return <Trophy className="w-4 h-4" />;
    }
  };

  const handleChallengeClick = (challengeId) => {
    // Simulate challenge interaction
    console.log(`Clicked challenge ${challengeId}`);
  };

  const completedChallenges = challenges?.filter(c => c?.completed)?.length;
  const totalRewards = challenges?.reduce((sum, c) => c?.completed ? sum + c?.reward?.amount : sum, 0);

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Daily Challenges</h2>
            <p className="text-orange-300 text-sm">Resets in {formatTime(timeLeft)}</p>
          </div>
        </div>
        
        {/* Stats Overview */}
        <div className="text-right">
          <div className="text-sm text-gray-400">Completed Today</div>
          <div className="text-2xl font-bold text-white">{completedChallenges}/{challenges?.length}</div>
        </div>
      </div>
      {/* Challenge List */}
      <div className="space-y-4 mb-6">
        {challenges?.map((challenge, index) => (
          <motion.div
            key={challenge?.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 ${
              challenge?.completed 
                ? 'bg-white/10 border border-green-500/30' :'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20'
            }`}
            onClick={() => handleChallengeClick(challenge?.id)}
          >
            {/* Challenge Content */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${getChallengeColor(challenge?.type)}`}>
                    <challenge.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-white">{challenge?.title}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(challenge?.difficulty)}`}>
                        {challenge?.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300">{challenge?.description}</p>
                  </div>
                </div>
                
                {challenge?.completed && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="p-1 bg-green-500 rounded-full"
                  >
                    <CheckCircle className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400">Progress</span>
                  <span className="text-xs text-gray-300">{challenge?.progress}/{challenge?.target}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${getChallengeColor(challenge?.type)} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(challenge?.progress / challenge?.target) * 100}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>
              </div>

              {/* Reward */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-400">Reward:</span>
                  <div className="flex items-center gap-1 text-yellow-400">
                    {getRewardIcon(challenge?.reward?.type)}
                    <span>{challenge?.reward?.amount}x {challenge?.reward?.name}</span>
                  </div>
                </div>
                
                <div className="text-xs text-gray-400">
                  {formatTime(challenge?.timeLeft)} left
                </div>
              </div>
            </div>

            {/* Completion Overlay */}
            <AnimatePresence>
              {challenge?.completed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-[1px]"
                />
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
      {/* Daily Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white/5 rounded-xl">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">{completedChallenges}</div>
          <div className="text-xs text-gray-400">Challenges Complete</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-400">{totalRewards}</div>
          <div className="text-xs text-gray-400">Rewards Earned</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-400">{Math.round((completedChallenges / challenges?.length) * 100)}%</div>
          <div className="text-xs text-gray-400">Daily Progress</div>
        </div>
      </div>
      {/* Refresh Notice */}
      {timeLeft < 3600 && ( // Show when less than 1 hour left
        (<motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-center gap-3"
        >
          <RefreshCw className="w-4 h-4 text-orange-400" />
          <div className="flex-1">
            <p className="text-sm font-medium text-orange-400">New challenges coming soon!</p>
            <p className="text-xs text-gray-400">Fresh daily challenges in {formatTime(timeLeft)}</p>
          </div>
        </motion.div>)
      )}
    </div>
  );
};

export default DailyChallenges;