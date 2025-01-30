import type React from "react";
import { useEffect, useRef, useState } from "react";
import "./ShootAlien.css";
import targetImage from "../../../public/assets/alien.png";

interface TargetProps {
  x: number;
  y: number;
  onClick: (e: React.MouseEvent | React.KeyboardEvent) => void;
}

const Target: React.FC<TargetProps> = ({ x, y, onClick }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      onClick(e);
    }
  };

  return (
    <img
      src={targetImage}
      alt="Target"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className="target"
      style={{
        position: "absolute",
        top: `${y - 25}px`,
        left: `${x - 25}px`,
        width: "50px",
        height: "50px",
        cursor: "pointer",
      }}
    />
  );
};

const ShootAlien: React.FC = () => {
  const [score, setScore] = useState<number>(0);
  const [targetPos, setTargetPos] = useState<{ x: number; y: number }>({
    x: Math.random() * (800 - 50),
    y: Math.random() * (600 - 50),
  });
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [showPlusOne, setShowPlusOne] = useState<boolean>(false);
  const [plusOnePos, setPlusOnePos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const gameContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
    setGameOver(true);
  }, [timeLeft]);

  const handleTargetClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    if (!gameOver) {
      setScore(score + 1);
      setTargetPos({
        x: Math.random() * (800 - 50),
        y: Math.random() * (600 - 50),
      });

      if (gameContainerRef.current) {
        const gameContainerRect =
          gameContainerRef.current.getBoundingClientRect();

        const clickX = (e as React.MouseEvent).clientX - gameContainerRect.left;
        const clickY = (e as React.MouseEvent).clientY - gameContainerRect.top;

        setPlusOnePos({ x: clickX, y: clickY });
        setShowPlusOne(true);

        setTimeout(() => setShowPlusOne(false), 1000);
      }
    }
  };

  const handleRestart = () => {
    setScore(0);
    setTargetPos({
      x: Math.random() * (800 - 50),
      y: Math.random() * (600 - 50),
    });
    setTimeLeft(30);
    setGameOver(false);
  };

  return (
    <div
      className="game-container"
      ref={gameContainerRef}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <div className="timer">Time Left: {timeLeft}s</div>
      {gameOver && (
        <button
          onClick={handleRestart}
          className="restart-button"
          type="button"
        >
          Restart
        </button>
      )}
      {!gameOver && (
        <Target x={targetPos.x} y={targetPos.y} onClick={handleTargetClick} />
      )}

      {showPlusOne && (
        <div
          className="plus-one"
          style={{
            top: `${plusOnePos.y - 25}px`,
            left: `${plusOnePos.x - 25}px`,
          }}
        >
          +1
        </div>
      )}

      <div className="score">Score: {score}</div>
    </div>
  );
};

export default ShootAlien;
