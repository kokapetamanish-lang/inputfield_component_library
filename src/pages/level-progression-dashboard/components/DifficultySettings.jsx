import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Settings, Volume2, VolumeX, Smartphone } from 'lucide-react';

const DifficultySettings = ({ isOpen, onClose, levels, onDifficultyChange }) => {
  const [globalSettings, setGlobalSettings] = useState({
    soundEnabled: true,
    hapticsEnabled: true,
    autoAdjustDifficulty: false,
    assistiveMode: false
  });

  const difficultyOptions = [
    { value: 'Easy', label: 'Easy', color: 'text-green-400', description: 'Slower wall shifts, more time to think' },
    { value: 'Medium', label: 'Medium', color: 'text-yellow-400', description: 'Balanced challenge for most players' },
    { value: 'Hard', label: 'Hard', color: 'text-orange-400', description: 'Fast-paced with frequent wall shifts' },
    { value: 'Expert', label: 'Expert', color: 'text-red-400', description: 'Ultimate challenge for maze masters' }
  ];

  const accessibilityFeatures = [
    { id: 'colorBlind', label: 'Color Blind Support', description: 'Enhanced visual patterns', enabled: false },
    { id: 'largeText', label: 'Large Text Mode', description: 'Increased font sizes', enabled: false },
    { id: 'reduceMotion', label: 'Reduce Motion', description: 'Minimize animations', enabled: false },
    { id: 'highContrast', label: 'High Contrast', description: 'Better visibility', enabled: false }
  ];

  const handleGlobalSettingChange = (setting, value) => {
    setGlobalSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const unlockedLevels = levels?.filter(level => level?.status !== 'locked');

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
        className="bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e?.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-slate-800 border-b border-white/10 p-6 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <Settings className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold text-white">Difficulty & Accessibility</h2>
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
          {/* Global Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Game Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {globalSettings?.soundEnabled ? 
                    <Volume2 className="w-5 h-5 text-blue-400" /> : 
                    <VolumeX className="w-5 h-5 text-gray-400" />
                  }
                  <div>
                    <p className="text-white font-medium">Sound Effects</p>
                    <p className="text-xs text-gray-400">Game audio feedback</p>
                  </div>
                </div>
                <button
                  onClick={() => handleGlobalSettingChange('soundEnabled', !globalSettings?.soundEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    globalSettings?.soundEnabled ? 'bg-blue-500' : 'bg-gray-600'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                    globalSettings?.soundEnabled ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              <div className="bg-white/5 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="text-white font-medium">Haptic Feedback</p>
                    <p className="text-xs text-gray-400">Vibration on collisions</p>
                  </div>
                </div>
                <button
                  onClick={() => handleGlobalSettingChange('hapticsEnabled', !globalSettings?.hapticsEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    globalSettings?.hapticsEnabled ? 'bg-purple-500' : 'bg-gray-600'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                    globalSettings?.hapticsEnabled ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-white font-medium">Auto-Adjust Difficulty</p>
                  <p className="text-xs text-gray-400">Automatically balance challenge based on performance</p>
                </div>
                <button
                  onClick={() => handleGlobalSettingChange('autoAdjustDifficulty', !globalSettings?.autoAdjustDifficulty)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    globalSettings?.autoAdjustDifficulty ? 'bg-green-500' : 'bg-gray-600'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                    globalSettings?.autoAdjustDifficulty ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
              {globalSettings?.autoAdjustDifficulty && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="text-xs text-green-400 mt-2 p-2 bg-green-500/10 rounded"
                >
                  ✓ Difficulty will adapt based on your completion times and retry rates
                </motion.div>
              )}
            </div>
          </div>

          {/* Individual Level Difficulty */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Level Difficulty Override</h3>
            <p className="text-sm text-gray-400">Customize difficulty for individual levels you've unlocked</p>
            
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {unlockedLevels?.map((level) => (
                <div key={level?.id} className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-white font-medium">Level {level?.id}</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        level?.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                        level?.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        level?.difficulty === 'Hard'? 'bg-orange-500/20 text-orange-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {level?.difficulty}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">Every {level?.wallShiftFreq}s</span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {difficultyOptions?.map((option) => (
                      <button
                        key={option?.value}
                        onClick={() => onDifficultyChange(level?.id, option?.value)}
                        className={`p-2 rounded-lg text-xs font-medium transition-colors ${
                          level?.difficulty === option?.value
                            ? 'bg-white/20 border border-white/30' :'bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        <span className={option?.color}>{option?.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Accessibility Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Accessibility Features</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {accessibilityFeatures?.map((feature) => (
                <div key={feature?.id} className="bg-white/5 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">{feature?.label}</p>
                    <p className="text-xs text-gray-400">{feature?.description}</p>
                  </div>
                  <button
                    className={`w-12 h-6 rounded-full transition-colors relative ${
                      feature?.enabled ? 'bg-blue-500' : 'bg-gray-600'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                      feature?.enabled ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Apply Button */}
          <div className="flex gap-3 pt-4 border-t border-white/10">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-medium transition-colors"
            >
              Apply Settings
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DifficultySettings;