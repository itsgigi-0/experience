/*
 * DESIGN: Celestial Observatory Dashboard
 * Side Quests page featuring:
 * - Playable Alien Runner mini-game
 * - Gaming HUD elements
 * - Score tracking with localStorage
 */

import { motion } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, RotateCcw, Gamepad2 } from "lucide-react";

interface GameState {
  isPlaying: boolean;
  isPaused: boolean;
  score: number;
  highScore: number;
  gameOver: boolean;
}

export default function SideQuests() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number>(0);
  const [gameState, setGameState] = useState<GameState>({
    isPlaying: false,
    isPaused: false,
    score: 0,
    highScore: 0,
    gameOver: false,
  });

  // Game variables
  const playerRef = useRef({ y: 200, velocity: 0, isJumping: false });
  const obstaclesRef = useRef<{ x: number; width: number; height: number; gap: number }[]>([]);
  const frameCountRef = useRef(0);

  // Load high score from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("alienRunnerHighScore");
    if (saved) {
      setGameState((prev) => ({ ...prev, highScore: parseInt(saved, 10) }));
    }
  }, []);

  const jump = useCallback(() => {
    if (!playerRef.current.isJumping && gameState.isPlaying && !gameState.isPaused) {
      playerRef.current.velocity = -12;
      playerRef.current.isJumping = true;
    }
  }, [gameState.isPlaying, gameState.isPaused]);

  const startGame = useCallback(() => {
    playerRef.current = { y: 200, velocity: 0, isJumping: false };
    obstaclesRef.current = [];
    frameCountRef.current = 0;
    setGameState((prev) => ({
      ...prev,
      isPlaying: true,
      isPaused: false,
      score: 0,
      gameOver: false,
    }));
  }, []);

  const togglePause = useCallback(() => {
    setGameState((prev) => ({ ...prev, isPaused: !prev.isPaused }));
  }, []);

  const restartGame = useCallback(() => {
    startGame();
  }, [startGame]);

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gameLoop = () => {
      if (!gameState.isPlaying || gameState.isPaused) {
        gameLoopRef.current = requestAnimationFrame(gameLoop);
        return;
      }

      // Clear canvas
      ctx.fillStyle = "#15001E";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw starfield background
      ctx.fillStyle = "rgba(230, 199, 242, 0.3)";
      for (let i = 0; i < 50; i++) {
        const x = (i * 37 + frameCountRef.current * 0.5) % canvas.width;
        const y = (i * 23) % canvas.height;
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fill();
      }

      // Update player
      playerRef.current.velocity += 0.6; // Gravity
      playerRef.current.y += playerRef.current.velocity;

      // Ground collision
      const groundY = canvas.height - 60;
      if (playerRef.current.y > groundY) {
        playerRef.current.y = groundY;
        playerRef.current.velocity = 0;
        playerRef.current.isJumping = false;
      }

      // Ceiling collision
      if (playerRef.current.y < 30) {
        playerRef.current.y = 30;
        playerRef.current.velocity = 0;
      }

      // Draw ground
      ctx.fillStyle = "#2B0F3A";
      ctx.fillRect(0, canvas.height - 40, canvas.width, 40);
      ctx.strokeStyle = "#C44BC1";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height - 40);
      ctx.lineTo(canvas.width, canvas.height - 40);
      ctx.stroke();

      // Draw player (alien ship)
      const playerX = 80;
      const playerY = playerRef.current.y;
      
      // Ship body
      ctx.fillStyle = "#F06AD8";
      ctx.beginPath();
      ctx.ellipse(playerX, playerY, 25, 15, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Ship dome
      ctx.fillStyle = "#E6C7F2";
      ctx.beginPath();
      ctx.ellipse(playerX, playerY - 8, 12, 10, 0, Math.PI, 0);
      ctx.fill();
      
      // Ship glow
      ctx.shadowColor = "#F06AD8";
      ctx.shadowBlur = 15;
      ctx.fillStyle = "#C44BC1";
      ctx.beginPath();
      ctx.ellipse(playerX - 20, playerY + 5, 8, 4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Spawn obstacles
      frameCountRef.current++;
      if (frameCountRef.current % 90 === 0) {
        const height = 40 + Math.random() * 60;
        obstaclesRef.current.push({
          x: canvas.width,
          width: 30,
          height,
          gap: 120 + Math.random() * 40,
        });
      }

      // Update and draw obstacles
      obstaclesRef.current = obstaclesRef.current.filter((obs) => {
        obs.x -= 5;

        // Draw obstacle (asteroid)
        ctx.fillStyle = "#4A1E5F";
        ctx.strokeStyle = "#C44BC1";
        ctx.lineWidth = 2;
        
        // Bottom obstacle
        ctx.beginPath();
        ctx.roundRect(obs.x, canvas.height - 40 - obs.height, obs.width, obs.height, 5);
        ctx.fill();
        ctx.stroke();
        
        // Top obstacle
        const topHeight = canvas.height - 40 - obs.height - obs.gap;
        if (topHeight > 0) {
          ctx.beginPath();
          ctx.roundRect(obs.x, 0, obs.width, topHeight, 5);
          ctx.fill();
          ctx.stroke();
        }

        // Collision detection
        const playerLeft = playerX - 20;
        const playerRight = playerX + 20;
        const playerTop = playerY - 15;
        const playerBottom = playerY + 15;

        const obsLeft = obs.x;
        const obsRight = obs.x + obs.width;
        const bottomObsTop = canvas.height - 40 - obs.height;

        // Check bottom obstacle collision
        if (
          playerRight > obsLeft &&
          playerLeft < obsRight &&
          playerBottom > bottomObsTop
        ) {
          handleGameOver();
        }

        // Check top obstacle collision
        if (topHeight > 0 && playerRight > obsLeft && playerLeft < obsRight && playerTop < topHeight) {
          handleGameOver();
        }

        return obs.x > -obs.width;
      });

      // Update score
      setGameState((prev) => ({
        ...prev,
        score: Math.floor(frameCountRef.current / 10),
      }));

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    const handleGameOver = () => {
      setGameState((prev) => {
        const newHighScore = Math.max(prev.highScore, prev.score);
        localStorage.setItem("alienRunnerHighScore", newHighScore.toString());
        return {
          ...prev,
          isPlaying: false,
          gameOver: true,
          highScore: newHighScore,
        };
      });
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(gameLoopRef.current);
    };
  }, [gameState.isPlaying, gameState.isPaused]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (!gameState.isPlaying && !gameState.gameOver) {
          startGame();
        } else if (gameState.gameOver) {
          restartGame();
        } else {
          jump();
        }
      }
      if (e.code === "KeyP" && gameState.isPlaying) {
        togglePause();
      }
      if (e.code === "KeyR" && (gameState.gameOver || gameState.isPlaying)) {
        restartGame();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState, jump, startGame, restartGame, togglePause]);

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="py-20 lg:py-28 relative">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('/images/constellation-pattern.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="hud-label text-[#F06AD8] mb-4">
              EXPERIMENTS // MISC
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F3EDF7] mb-6 leading-tight font-['Space_Grotesk']">
              Side Quests
            </h1>
            <p className="text-lg lg:text-xl text-[#E6C7F2] leading-relaxed">
              Small projects, experiments, and passion builds — the fun stuff that still ships (and still teaches).
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mini Game Section */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Game Header */}
            <div className="flex items-center gap-3 mb-6">
              <Gamepad2 className="w-6 h-6 text-[#F06AD8]" />
              <h2 className="text-2xl font-bold text-[#F3EDF7] font-['Space_Grotesk']">
                Alien Runner
              </h2>
            </div>
            <p className="text-[#E6C7F2] mb-6">
              A tiny side quest — jump the obstacles, rack up points, and don't get abducted by deadlines.
            </p>

            {/* Game Container */}
            <div className="glass-card rounded-xl p-4 lg:p-6">
              {/* HUD */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-6">
                  <div>
                    <span className="text-xs font-['Orbitron'] uppercase tracking-wider text-[#E6C7F2]/70">
                      SCORE
                    </span>
                    <div className="text-2xl font-bold text-[#F06AD8] font-['Space_Grotesk']">
                      {gameState.score}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-['Orbitron'] uppercase tracking-wider text-[#E6C7F2]/70">
                      HIGH SCORE
                    </span>
                    <div className="text-2xl font-bold text-[#E6C7F2] font-['Space_Grotesk']">
                      {gameState.highScore}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {gameState.isPlaying && (
                    <button
                      onClick={togglePause}
                      className="p-2 rounded-lg bg-[#2B0F3A] text-[#E6C7F2] hover:bg-[#4A1E5F] transition-all"
                      aria-label={gameState.isPaused ? "Resume" : "Pause"}
                    >
                      {gameState.isPaused ? <Play size={20} /> : <Pause size={20} />}
                    </button>
                  )}
                  <button
                    onClick={restartGame}
                    className="p-2 rounded-lg bg-[#2B0F3A] text-[#E6C7F2] hover:bg-[#4A1E5F] transition-all"
                    aria-label="Restart"
                  >
                    <RotateCcw size={20} />
                  </button>
                </div>
              </div>

              {/* Canvas */}
              <div className="relative rounded-lg overflow-hidden border border-[#C44BC1]/30">
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={400}
                  className="w-full h-auto bg-[#15001E]"
                  onClick={() => {
                    if (!gameState.isPlaying && !gameState.gameOver) {
                      startGame();
                    } else if (gameState.gameOver) {
                      restartGame();
                    } else {
                      jump();
                    }
                  }}
                />

                {/* Overlay states */}
                {!gameState.isPlaying && !gameState.gameOver && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#15001E]/80">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-[#F3EDF7] mb-4 font-['Space_Grotesk']">
                        Ready to Launch?
                      </h3>
                      <p className="text-[#E6C7F2] mb-6">
                        Press SPACE or tap to start
                      </p>
                      <button
                        onClick={startGame}
                        className="px-6 py-3 rounded-lg btn-glow text-[#15001E] font-semibold"
                      >
                        Start Game
                      </button>
                    </div>
                  </div>
                )}

                {gameState.gameOver && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#15001E]/80">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-[#F06AD8] mb-2 font-['Space_Grotesk']">
                        Game Over
                      </h3>
                      <p className="text-[#E6C7F2] mb-2">
                        Score: {gameState.score}
                      </p>
                      {gameState.score >= gameState.highScore && gameState.score > 0 && (
                        <p className="text-[#F06AD8] mb-4 font-semibold">
                          New High Score!
                        </p>
                      )}
                      <button
                        onClick={restartGame}
                        className="px-6 py-3 rounded-lg btn-glow text-[#15001E] font-semibold"
                      >
                        Play Again
                      </button>
                    </div>
                  </div>
                )}

                {gameState.isPaused && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#15001E]/80">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-[#E6C7F2] mb-4 font-['Space_Grotesk']">
                        Paused
                      </h3>
                      <button
                        onClick={togglePause}
                        className="px-6 py-3 rounded-lg btn-glow text-[#15001E] font-semibold"
                      >
                        Resume
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-[#E6C7F2]/70">
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 rounded bg-[#2B0F3A] text-[#E6C7F2] font-mono text-xs">
                    SPACE
                  </kbd>
                  <span>Jump</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 rounded bg-[#2B0F3A] text-[#E6C7F2] font-mono text-xs">
                    P
                  </kbd>
                  <span>Pause</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 rounded bg-[#2B0F3A] text-[#E6C7F2] font-mono text-xs">
                    R
                  </kbd>
                  <span>Restart</span>
                </div>
                <div className="flex items-center gap-2 lg:hidden">
                  <span className="px-2 py-1 rounded bg-[#2B0F3A] text-[#E6C7F2] text-xs">
                    TAP
                  </span>
                  <span>Jump (Mobile)</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
