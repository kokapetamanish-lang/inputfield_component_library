import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pause, Play, RotateCcw } from 'lucide-react';
import GameGrid from './components/GameGrid';
import PlayerCharacter from './components/PlayerCharacter';
import GameHUD from './components/GameHUD';
import WallEffect from './components/WallEffect';
import PowerUpInventory from './components/PowerUpInventory';

const GRID_SIZE = 12;
const INITIAL_WALL_SHIFT_INTERVAL = 8000; // 8 seconds

const MemoryMazeGameBoard = () => {
  const [gameState, setGameState] = useState('playing'); // playing, paused, gameOver
  const [currentLevel, setCurrentLevel] = useState(1);
  const [playerPosition, setPlayerPosition] = useState({ x: 1, y: 1 });
  const [goalPosition] = useState({ x: GRID_SIZE - 2, y: GRID_SIZE - 2 });
  const [walls, setWalls] = useState([]);
  const [dynamicWalls, setDynamicWalls] = useState([]);
  const [wallShiftTimer, setWallShiftTimer] = useState(INITIAL_WALL_SHIFT_INTERVAL / 1000);
  const [powerUps, setPowerUps] = useState({
    freezeWalls: 2,
    seeMap: 1,
    speedBoost: 1,
    wallPhase: 1
  });
  const [activePowerUps, setActivePowerUps] = useState({
    freezeWalls: false,
    seeMap: false,
    speedBoost: false,
    wallPhase: false
  });
  const [wallsVisible, setWallsVisible] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [score, setScore] = useState(0);

  // Initialize maze
  useEffect(() => {
    generateMaze();
  }, [currentLevel]);

  // Wall shift timer
  useEffect(() => {
    if (gameState !== 'playing' || activePowerUps?.freezeWalls) return;

    const timer = setInterval(() => {
      setWallShiftTimer(prev => {
        if (prev <= 1) {
          shiftWalls();
          const newInterval = Math.max(3, INITIAL_WALL_SHIFT_INTERVAL / 1000 - (currentLevel - 1) * 0.5);
          return newInterval;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, activePowerUps?.freezeWalls, currentLevel]);

  const generateMaze = useCallback(() => {
    const staticWalls = [];
    const dynamicWallsNew = [];
    
    // Create border walls
    for (let i = 0; i < GRID_SIZE; i++) {
      staticWalls?.push({ x: 0, y: i, type: 'static' });
      staticWalls?.push({ x: GRID_SIZE - 1, y: i, type: 'static' });
      staticWalls?.push({ x: i, y: 0, type: 'static' });
      staticWalls?.push({ x: i, y: GRID_SIZE - 1, type: 'static' });
    }
    
    // Create some internal static walls for maze structure
    for (let i = 2; i < GRID_SIZE - 2; i += 2) {
      for (let j = 2; j < GRID_SIZE - 2; j += 2) {
        if (Math.random() > 0.3) {
          staticWalls?.push({ x: i, y: j, type: 'static' });
        }
      }
    }
    
    // Create dynamic walls
    const dynamicWallCount = 8 + currentLevel * 2;
    for (let i = 0; i < dynamicWallCount; i++) {
      let x, y;
      do {
        x = Math.floor(Math.random() * (GRID_SIZE - 2)) + 1;
        y = Math.floor(Math.random() * (GRID_SIZE - 2)) + 1;
      } while (
        staticWalls?.some(wall => wall?.x === x && wall?.y === y) ||
        (x === playerPosition?.x && y === playerPosition?.y) ||
        (x === goalPosition?.x && y === goalPosition?.y)
      );
      
      dynamicWallsNew?.push({ 
        x, 
        y, 
        type: 'dynamic',
        id: `dynamic-${i}-${Date.now()}`
      });
    }
    
    setWalls(staticWalls);
    setDynamicWalls(dynamicWallsNew);
  }, [currentLevel, playerPosition, goalPosition]);

  const shiftWalls = useCallback(() => {
    if (activePowerUps?.freezeWalls) return;
    
    setWallsVisible(false);
    
    setTimeout(() => {
      generateMaze();
      setWallsVisible(true);
      setWallShiftTimer(Math.max(3, INITIAL_WALL_SHIFT_INTERVAL / 1000 - (currentLevel - 1) * 0.5));
    }, 300);
  }, [activePowerUps?.freezeWalls, generateMaze, currentLevel]);

  const movePlayer = useCallback((direction) => {
    if (gameState !== 'playing') return;
    
    const moveDistance = activePowerUps?.speedBoost ? 2 : 1;
    let newX = playerPosition?.x;
    let newY = playerPosition?.y;
    
    switch (direction) {
      case 'up':
        newY = Math.max(0, playerPosition?.y - moveDistance);
        break;
      case 'down':
        newY = Math.min(GRID_SIZE - 1, playerPosition?.y + moveDistance);
        break;
      case 'left':
        newX = Math.max(0, playerPosition?.x - moveDistance);
        break;
      case 'right':
        newX = Math.min(GRID_SIZE - 1, playerPosition?.x + moveDistance);
        break;
    }
    
    // Check for wall collision
    const allWalls = [...walls, ...(wallsVisible ? dynamicWalls : [])];
    const hasWall = allWalls?.some(wall => wall?.x === newX && wall?.y === newY);
    
    if (hasWall && !activePowerUps?.wallPhase) {
      // Haptic feedback simulation
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
      return;
    }
    
    setPlayerPosition({ x: newX, y: newY });
    setScore(prev => prev + 1);
    
    // Check for goal reached
    if (newX === goalPosition?.x && newY === goalPosition?.y) {
      setCurrentLevel(prev => prev + 1);
      setPlayerPosition({ x: 1, y: 1 });
      setScore(prev => prev + 100);
    }
  }, [playerPosition, walls, dynamicWalls, wallsVisible, gameState, activePowerUps, goalPosition]);

  const handleTouchStart = (e) => {
    const touch = e?.touches?.[0];
    setTouchStart({ x: touch?.clientX, y: touch?.clientY });
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    
    const touch = e?.changedTouches?.[0];
    const deltaX = touch?.clientX - touchStart?.x;
    const deltaY = touch?.clientY - touchStart?.y;
    const threshold = 30;
    
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (Math.abs(deltaX) > threshold) {
        movePlayer(deltaX > 0 ? 'right' : 'left');
      }
    } else {
      if (Math.abs(deltaY) > threshold) {
        movePlayer(deltaY > 0 ? 'down' : 'up');
      }
    }
    
    setTouchStart(null);
  };

  const togglePause = () => {
    setGameState(prev => prev === 'playing' ? 'paused' : 'playing');
  };

  const resetGame = () => {
    setCurrentLevel(1);
    setPlayerPosition({ x: 1, y: 1 });
    setScore(0);
    setGameState('playing');
    setActivePowerUps({
      freezeWalls: false,
      seeMap: false,
      speedBoost: false,
      wallPhase: false
    });
    setPowerUps({
      freezeWalls: 2,
      seeMap: 1,
      speedBoost: 1,
      wallPhase: 1
    });
  };

  const getTimerColor = () => {
    if (wallShiftTimer > 5) return 'text-green-400';
    if (wallShiftTimer > 3) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      {/* Game Container */}
      <div 
        className="relative h-screen flex flex-col touch-none select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Game Grid Area */}
        <div className="flex-1 relative p-4">
          <GameGrid 
            gridSize={GRID_SIZE}
            walls={walls}
            dynamicWalls={wallsVisible ? dynamicWalls : []}
            showMap={activePowerUps?.seeMap}
          />
          
          <PlayerCharacter 
            position={playerPosition}
            gridSize={GRID_SIZE}
            speedBoost={activePowerUps?.speedBoost}
          />
          
          {/* Goal */}
          <motion.div
            className="absolute w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg shadow-yellow-400/50"
            style={{
              left: `${(goalPosition?.x * 100) / GRID_SIZE}%`,
              top: `${(goalPosition?.y * 100) / GRID_SIZE}%`,
              transform: 'translate(-50%, -50%)'
            }}
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 360]
            }}
            transition={{
              scale: { duration: 2, repeat: Infinity },
              rotate: { duration: 3, repeat: Infinity, ease: "linear" }
            }}
          />
          
          {/* Wall Effects */}
          <WallEffect visible={!wallsVisible} />
        </div>
        
        {/* HUD Overlay */}
        <GameHUD
          level={currentLevel}
          timer={wallShiftTimer}
          timerColor={getTimerColor()}
          score={score}
          isPaused={gameState === 'paused'}
          onPause={togglePause}
          onReset={resetGame}
        />
        
        {/* Power-Up Inventory */}
        <PowerUpInventory
          powerUps={powerUps}
          activePowerUps={activePowerUps}
          onActivatePowerUp={(type) => {
            if (powerUps?.[type] > 0 && !activePowerUps?.[type]) {
              setPowerUps(prev => ({ ...prev, [type]: prev?.[type] - 1 }));
              setActivePowerUps(prev => ({ ...prev, [type]: true }));
              
              // Set duration for power-ups
              setTimeout(() => {
                setActivePowerUps(prev => ({ ...prev, [type]: false }));
              }, type === 'seeMap' ? 5000 : type === 'freezeWalls' ? 10000 : 8000);
            }
          }}
        />
        
        {/* Pause Overlay */}
        <AnimatePresence>
          {gameState === 'paused' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="bg-slate-800 rounded-2xl p-8 text-center space-y-4"
              >
                <h2 className="text-2xl font-bold text-white">Game Paused</h2>
                <div className="flex gap-4">
                  <button
                    onClick={togglePause}
                    className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors"
                  >
                    <Play className="w-5 h-5" />
                    Resume
                  </button>
                  <button
                    onClick={resetGame}
                    className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors"
                  >
                    <RotateCcw className="w-5 h-5" />
                    Restart
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MemoryMazeGameBoard;