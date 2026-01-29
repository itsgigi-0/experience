import { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

interface GameState {
  isPlaying: boolean;
  isPaused: boolean;
  score: number;
  highScore: number;
  gameOver: boolean;
}

export default function AlienRunnerGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const [gameState, setGameState] = useState<GameState>({
    isPlaying: false,
    isPaused: false,
    score: 0,
    highScore: 0,
    gameOver: false,
  });

  // Game state refs for the animation loop
  const gameStateRef = useRef(gameState);
  const playerRef = useRef({ y: 200, velocity: 0, isJumping: false });
  const obstaclesRef = useRef<{ x: number; width: number; height: number; gap: number }[]>([]);
  const frameCountRef = useRef(0);

  // Keep gameStateRef in sync
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  // Load high score from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("alienRunnerHighScore");
    if (saved) {
      setGameState((prev) => ({ ...prev, highScore: parseInt(saved, 10) }));
    }
  }, []);

  const jump = useCallback(() => {
    if (!playerRef.current.isJumping && gameStateRef.current.isPlaying && !gameStateRef.current.isPaused) {
      playerRef.current.velocity = -12;
      playerRef.current.isJumping = true;
    }
  }, []);

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

  const handleGameOver = useCallback(() => {
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
  }, []);

  // Main game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isRunning = true;

    const gameLoop = () => {
      if (!isRunning) return;

      const currentState = gameStateRef.current;

      // Always clear and draw background
      ctx.fillStyle = "#15001E";
      ctx.fillRect(0, 0, 800, 400);

      // Draw stars
      ctx.fillStyle = "rgba(230, 199, 242, 0.3)";
      for (let i = 0; i < 50; i++) {
        const x = (i * 37 + frameCountRef.current * 0.5) % 800;
        const y = (i * 23) % 400;
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw ground
      ctx.fillStyle = "#2B0F3A";
      ctx.fillRect(0, 360, 800, 40);
      ctx.strokeStyle = "#C44BC1";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 360);
      ctx.lineTo(800, 360);
      ctx.stroke();

      if (currentState.isPlaying && !currentState.isPaused) {
        // Update player physics
        playerRef.current.velocity += 0.6;
        playerRef.current.y += playerRef.current.velocity;

        const groundY = 340;
        if (playerRef.current.y > groundY) {
          playerRef.current.y = groundY;
          playerRef.current.velocity = 0;
          playerRef.current.isJumping = false;
        }

        if (playerRef.current.y < 30) {
          playerRef.current.y = 30;
          playerRef.current.velocity = 0;
        }

        // Spawn obstacles
        frameCountRef.current++;
        if (frameCountRef.current % 90 === 0) {
          const height = 40 + Math.random() * 60;
          obstaclesRef.current.push({
            x: 800,
            width: 30,
            height,
            gap: 120 + Math.random() * 40,
          });
        }

        // Update obstacles
        obstaclesRef.current = obstaclesRef.current.filter((obs) => {
          obs.x -= 5;
          return obs.x > -obs.width;
        });

        // Update score
        setGameState((prev) => ({
          ...prev,
          score: Math.floor(frameCountRef.current / 10),
        }));
      }

      // Draw player
      const playerX = 80;
      const playerY = playerRef.current.y;
      
      ctx.fillStyle = "#F06AD8";
      ctx.beginPath();
      ctx.ellipse(playerX, playerY, 25, 15, 0, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = "#E6C7F2";
      ctx.beginPath();
      ctx.ellipse(playerX, playerY - 8, 12, 10, 0, Math.PI, 0);
      ctx.fill();
      
      ctx.shadowColor = "#F06AD8";
      ctx.shadowBlur = 15;
      ctx.fillStyle = "#C44BC1";
      ctx.beginPath();
      ctx.ellipse(playerX - 20, playerY + 5, 8, 4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw and check obstacles
      obstaclesRef.current.forEach((obs) => {
        ctx.fillStyle = "#4A1E5F";
        ctx.strokeStyle = "#C44BC1";
        ctx.lineWidth = 2;
        
        // Bottom obstacle
        ctx.beginPath();
        ctx.roundRect(obs.x, 360 - obs.height, obs.width, obs.height, 5);
        ctx.fill();
        ctx.stroke();
        
        // Top obstacle
        const topHeight = 360 - obs.height - obs.gap;
        if (topHeight > 0) {
          ctx.beginPath();
          ctx.roundRect(obs.x, 0, obs.width, topHeight, 5);
          ctx.fill();
          ctx.stroke();
        }

        // Collision detection
        if (currentState.isPlaying && !currentState.isPaused) {
          const playerLeft = playerX - 20;
          const playerRight = playerX + 20;
          const playerTop = playerY - 15;
          const playerBottom = playerY + 15;

          const obsLeft = obs.x;
          const obsRight = obs.x + obs.width;
          const bottomObsTop = 360 - obs.height;

          if (playerRight > obsLeft && playerLeft < obsRight && playerBottom > bottomObsTop) {
            handleGameOver();
          }

          if (topHeight > 0 && playerRight > obsLeft && playerLeft < obsRight && playerTop < topHeight) {
            handleGameOver();
          }
        }
      });

      animationRef.current = requestAnimationFrame(gameLoop);
    };

    animationRef.current = requestAnimationFrame(gameLoop);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationRef.current);
    };
  }, [handleGameOver]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        const current = gameStateRef.current;
        if (!current.isPlaying && !current.gameOver) {
          startGame();
        } else if (current.gameOver) {
          restartGame();
        } else {
          jump();
        }
      }
      if (e.code === "KeyP" && gameStateRef.current.isPlaying) {
        togglePause();
      }
      if (e.code === "KeyR" && (gameStateRef.current.gameOver || gameStateRef.current.isPlaying)) {
        restartGame();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [jump, startGame, restartGame, togglePause]);

  return (
    <div className="glass-card rounded-xl p-4 lg:p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-6">
          <div>
            <span className="text-xs font-['Orbitron'] uppercase tracking-wider text-[#E6C7F2]/70">SCORE</span>
            <div className="text-2xl font-bold text-[#F06AD8] font-['Space_Grotesk']">{gameState.score}</div>
          </div>
          <div>
            <span className="text-xs font-['Orbitron'] uppercase tracking-wider text-[#E6C7F2]/70">HIGH SCORE</span>
            <div className="text-2xl font-bold text-[#E6C7F2] font-['Space_Grotesk']">{gameState.highScore}</div>
          </div>
        </div>
        <div className="flex gap-2">
          {gameState.isPlaying && (
            <button onClick={togglePause} className="p-2 rounded-lg bg-[#2B0F3A] text-[#E6C7F2] hover:bg-[#4A1E5F] transition-all">
              {gameState.isPaused ? <Play size={20} /> : <Pause size={20} />}
            </button>
          )}
          <button onClick={restartGame} className="p-2 rounded-lg bg-[#2B0F3A] text-[#E6C7F2] hover:bg-[#4A1E5F] transition-all">
            <RotateCcw size={20} />
          </button>
        </div>
      </div>

      <div className="relative rounded-lg overflow-hidden border border-[#C44BC1]/30" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <canvas
          ref={canvasRef}
          width={800}
          height={400}
          style={{ width: '100%', height: 'auto', display: 'block' }}
          onClick={() => {
            if (!gameState.isPlaying && !gameState.gameOver) startGame();
            else if (gameState.gameOver) restartGame();
            else jump();
          }}
        />

        {!gameState.isPlaying && !gameState.gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#15001E]/80">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-[#F3EDF7] mb-4 font-['Space_Grotesk']">Ready to Launch?</h3>
              <p className="text-[#E6C7F2] mb-6">Press SPACE or tap to start</p>
              <button onClick={startGame} className="px-6 py-3 rounded-lg btn-glow text-[#15001E] font-semibold">Start Game</button>
            </div>
          </div>
        )}

        {gameState.gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#15001E]/80">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-[#F06AD8] mb-2 font-['Space_Grotesk']">Game Over</h3>
              <p className="text-[#E6C7F2] mb-2">Score: {gameState.score}</p>
              {gameState.score >= gameState.highScore && gameState.score > 0 && (
                <p className="text-[#F06AD8] mb-4 font-semibold">New High Score!</p>
              )}
              <button onClick={restartGame} className="px-6 py-3 rounded-lg btn-glow text-[#15001E] font-semibold">Play Again</button>
            </div>
          </div>
        )}

        {gameState.isPaused && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#15001E]/80">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-[#E6C7F2] mb-4 font-['Space_Grotesk']">Paused</h3>
              <button onClick={togglePause} className="px-6 py-3 rounded-lg btn-glow text-[#15001E] font-semibold">Resume</button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-sm text-[#E6C7F2]/70">
        <div className="flex items-center gap-2">
          <kbd className="px-2 py-1 rounded bg-[#2B0F3A] text-[#E6C7F2] font-mono text-xs">SPACE</kbd>
          <span>Jump</span>
        </div>
        <div className="flex items-center gap-2">
          <kbd className="px-2 py-1 rounded bg-[#2B0F3A] text-[#E6C7F2] font-mono text-xs">P</kbd>
          <span>Pause</span>
        </div>
        <div className="flex items-center gap-2">
          <kbd className="px-2 py-1 rounded bg-[#2B0F3A] text-[#E6C7F2] font-mono text-xs">R</kbd>
          <span>Restart</span>
        </div>
      </div>
    </div>
  );
}
