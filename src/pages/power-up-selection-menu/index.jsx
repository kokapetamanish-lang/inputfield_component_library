import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info } from 'lucide-react';
import PowerUpCard from './components/PowerUpCard';
import ConfirmationDialog from './components/ConfirmationDialog';
import PowerUpStats from './components/PowerUpStats';
import RecommendationPanel from './components/RecommendationPanel';

const PowerUpSelectionMenu = ({ isOpen, onClose, onSelectPowerUp, gameState }) => {
  const [selectedPowerUp, setSelectedPowerUp] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const powerUps = [
    {
      id: 'freezeWalls',
      name: 'Freeze Walls',
      description: 'Temporarily stops wall shifting cycles, giving you time to plan your route',
      icon: '❄️',
      cost: 50,
      duration: 10,
      cooldown: 30,
      uses: 3,
      rarity: 'common',
      effects: ['Stops wall movement', 'Perfect for strategic planning'],
      stats: {
        usage: 45,
        effectiveness: 85,
        popularity: 92
      }
    },
    {
      id: 'seeMap',
      name: 'See Map',
      description: 'Reveals the complete maze layout with optimal paths highlighted',
      icon: '🗺️',
      cost: 75,
      duration: 5,
      cooldown: 45,
      uses: 2,
      rarity: 'rare',
      effects: ['Shows full maze layout', 'Highlights optimal paths', 'Reveals hidden shortcuts'],
      stats: {
        usage: 32,
        effectiveness: 95,
        popularity: 78
      }
    },
    {
      id: 'speedBoost',
      name: 'Speed Boost',
      description: 'Increases character movement speed for faster navigation',
      icon: '⚡',
      cost: 40,
      duration: 8,
      cooldown: 25,
      uses: 4,
      rarity: 'common',
      effects: ['Double movement speed', 'Improved reaction time'],
      stats: {
        usage: 67,
        effectiveness: 75,
        popularity: 88
      }
    },
    {
      id: 'wallPhase',
      name: 'Wall Phase',
      description: 'Allows temporary passage through solid barriers',
      icon: '👻',
      cost: 100,
      duration: 6,
      cooldown: 60,
      uses: 1,
      rarity: 'legendary',
      effects: ['Pass through walls', 'Take shortcuts', 'Emergency escape'],
      stats: {
        usage: 18,
        effectiveness: 98,
        popularity: 65
      }
    },
    {
      id: 'timeSlip',
      name: 'Time Slip',
      description: 'Slows down time during wall shifts for precise movement',
      icon: '⏰',
      cost: 80,
      duration: 4,
      cooldown: 50,
      uses: 2,
      rarity: 'rare',
      effects: ['Slows time during shifts', 'Enhanced precision'],
      stats: {
        usage: 25,
        effectiveness: 88,
        popularity: 71
      }
    },
    {
      id: 'magneticGoal',
      name: 'Magnetic Goal',
      description: 'Shows direction and distance to the goal with visual indicators',
      icon: '🧭',
      cost: 35,
      duration: 15,
      cooldown: 20,
      uses: 5,
      rarity: 'common',
      effects: ['Goal direction indicator', 'Distance measurement', 'Path optimization hints'],
      stats: {
        usage: 56,
        effectiveness: 72,
        popularity: 81
      }
    }
  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-yellow-400 to-orange-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const handlePowerUpSelect = (powerUp) => {
    setSelectedPowerUp(powerUp);
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    if (selectedPowerUp) {
      onSelectPowerUp(selectedPowerUp);
      setShowConfirmation(false);
      setSelectedPowerUp(null);
      onClose();
    }
  };

  const getRecommendations = () => {
    if (!gameState) return [];
    
    const { level, playerPerformance, timeRemaining } = gameState;
    const recommendations = [];
    
    if (level > 5 && timeRemaining < 30) {
      recommendations?.push(powerUps?.find(p => p?.id === 'speedBoost'));
    }
    
    if (playerPerformance?.wallCollisions > 3) {
      recommendations?.push(powerUps?.find(p => p?.id === 'seeMap'));
    }
    
    if (level > 8) {
      recommendations?.push(powerUps?.find(p => p?.id === 'wallPhase'));
    }
    
    return recommendations?.filter(Boolean)?.slice(0, 2);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: '100%', scale: 0.9 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: '100%', scale: 0.9 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-t-3xl sm:rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-slate-600/50 shadow-2xl"
            onClick={(e) => e?.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-600/50">
              <div>
                <h2 className="text-2xl font-bold text-white">Power-Up Arsenal</h2>
                <p className="text-slate-400 text-sm">Choose your strategic advantage</p>
              </div>
              
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={() => setShowStats(!showStats)}
                  className="p-2 bg-slate-700 hover:bg-slate-600 rounded-xl text-slate-300 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Info className="w-5 h-5" />
                </motion.button>
                
                <motion.button
                  onClick={onClose}
                  className="p-2 bg-slate-700 hover:bg-slate-600 rounded-xl text-slate-300 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row max-h-[calc(90vh-80px)]">
              {/* Main Content */}
              <div className="flex-1 p-6 overflow-y-auto">
                {/* Recommendations */}
                <RecommendationPanel 
                  recommendations={getRecommendations()}
                  onSelect={handlePowerUpSelect}
                />
                
                {/* Power-Up Grid */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-white mb-4">All Power-Ups</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {powerUps?.map((powerUp) => (
                      <PowerUpCard
                        key={powerUp?.id}
                        powerUp={powerUp}
                        rarityColor={getRarityColor(powerUp?.rarity)}
                        onSelect={() => handlePowerUpSelect(powerUp)}
                        disabled={powerUp?.uses === 0}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Stats Panel */}
              <AnimatePresence>
                {showStats && (
                  <PowerUpStats 
                    powerUps={powerUps}
                    onClose={() => setShowStats(false)}
                  />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showConfirmation}
        powerUp={selectedPowerUp}
        onConfirm={handleConfirm}
        onCancel={() => {
          setShowConfirmation(false);
          setSelectedPowerUp(null);
        }}
        rarityColor={selectedPowerUp ? getRarityColor(selectedPowerUp?.rarity) : ''}
      />
    </AnimatePresence>
  );
};

export default PowerUpSelectionMenu;