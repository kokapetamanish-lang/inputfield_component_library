import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, AlertTriangle } from 'lucide-react';

const ConfirmationDialog = ({ isOpen, powerUp, onConfirm, onCancel, rarityColor }) => {
  if (!powerUp) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
          onClick={onCancel}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 max-w-md w-full border border-slate-600/50 shadow-2xl"
            onClick={(e) => e?.stopPropagation()}
          >
            {/* Header */}
            <div className="text-center mb-6">
              <motion.div
                className="text-5xl mb-4"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0] 
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {powerUp?.icon}
              </motion.div>
              
              <h3 className="text-2xl font-bold text-white mb-2">Activate Power-Up?</h3>
              <h4 className={`text-lg font-semibold bg-gradient-to-r ${rarityColor} bg-clip-text text-transparent`}>
                {powerUp?.name}
              </h4>
            </div>
            
            {/* Details */}
            <div className="space-y-4 mb-6">
              <div className="bg-slate-700/50 rounded-xl p-4">
                <p className="text-slate-300 text-sm leading-relaxed">
                  {powerUp?.description}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-700/30 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-white">{powerUp?.duration}s</div>
                  <div className="text-xs text-slate-400">Duration</div>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-yellow-400">{powerUp?.cost}</div>
                  <div className="text-xs text-slate-400">Cost</div>
                </div>
              </div>
              
              {/* Warning for expensive power-ups */}
              {powerUp?.cost > 75 && (
                <motion.div
                  className="flex items-center gap-2 p-3 bg-orange-500/20 border border-orange-500/30 rounded-lg"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <AlertTriangle className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  <p className="text-xs text-orange-200">
                    This is a high-cost power-up. Use wisely!
                  </p>
                </motion.div>
              )}
            </div>
            
            {/* Actions */}
            <div className="flex gap-3">
              <motion.button
                onClick={onCancel}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-slate-600 hover:bg-slate-500 text-white rounded-xl transition-colors font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <X className="w-4 h-4" />
                Cancel
              </motion.button>
              
              <motion.button
                onClick={onConfirm}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r ${rarityColor} text-white rounded-xl font-medium shadow-lg`}
                whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)' }}
                whileTap={{ scale: 0.98 }}
              >
                <Check className="w-4 h-4" />
                Activate
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationDialog;