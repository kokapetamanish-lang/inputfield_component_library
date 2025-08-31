import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GameGrid = ({ gridSize, walls, dynamicWalls, showMap }) => {
  const renderGrid = () => {
    const grid = [];
    
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const isStaticWall = walls?.some(wall => wall?.x === x && wall?.y === y);
        const isDynamicWall = dynamicWalls?.some(wall => wall?.x === x && wall?.y === y);
        
        if (isStaticWall || isDynamicWall) {
          grid?.push(
            <motion.div
              key={`wall-${x}-${y}`}
              className={`absolute rounded-sm ${
                isStaticWall 
                  ? 'bg-slate-600 border border-slate-500' :'bg-purple-500 border border-purple-400 shadow-lg shadow-purple-400/30'
              }`}
              style={{
                left: `${(x * 100) / gridSize}%`,
                top: `${(y * 100) / gridSize}%`,
                width: `${100 / gridSize}%`,
                height: `${100 / gridSize}%`
              }}
              initial={isDynamicWall ? { opacity: 0, scale: 0.5 } : { opacity: 1 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                boxShadow: isDynamicWall ? [
                  '0 0 10px rgba(168, 85, 247, 0.3)',
                  '0 0 20px rgba(168, 85, 247, 0.5)',
                  '0 0 10px rgba(168, 85, 247, 0.3)'
                ] : '0 0 0 rgba(0, 0, 0, 0)'
              }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ 
                duration: 0.3,
                boxShadow: { duration: 2, repeat: Infinity }
              }}
            />
          );
        } else if (showMap && (x + y) % 2 === 0) {
          // Show path hints when map power-up is active
          grid?.push(
            <motion.div
              key={`path-${x}-${y}`}
              className="absolute bg-green-400/20 rounded-sm"
              style={{
                left: `${(x * 100) / gridSize}%`,
                top: `${(y * 100) / gridSize}%`,
                width: `${100 / gridSize}%`,
                height: `${100 / gridSize}%`
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          );
        }
      }
    }
    
    return grid;
  };

  return (
    <div className="absolute inset-4 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-600/50 overflow-hidden">
      {/* Grid Lines */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: gridSize - 1 })?.map((_, i) => (
          <React.Fragment key={i}>
            {/* Vertical lines */}
            <div
              className="absolute top-0 bottom-0 w-px bg-slate-400"
              style={{ left: `${((i + 1) * 100) / gridSize}%` }}
            />
            {/* Horizontal lines */}
            <div
              className="absolute left-0 right-0 h-px bg-slate-400"
              style={{ top: `${((i + 1) * 100) / gridSize}%` }}
            />
          </React.Fragment>
        ))}
      </div>
      {/* Walls */}
      <AnimatePresence mode="wait">
        {renderGrid()}
      </AnimatePresence>
      {/* Corner highlights for better visual reference */}
      <div className="absolute top-0 left-0 w-2 h-2 bg-blue-400 rounded-br-lg opacity-50" />
      <div className="absolute top-0 right-0 w-2 h-2 bg-blue-400 rounded-bl-lg opacity-50" />
      <div className="absolute bottom-0 left-0 w-2 h-2 bg-blue-400 rounded-tr-lg opacity-50" />
      <div className="absolute bottom-0 right-0 w-2 h-2 bg-blue-400 rounded-tl-lg opacity-50" />
    </div>
  );
};

export default GameGrid;