import { useEffect, useState } from "react";

interface StressGaugeProps {
  score: number;
  animate?: boolean;
}

export const StressGauge = ({ score, animate = false }: StressGaugeProps) => {
  const [displayScore, setDisplayScore] = useState(animate ? 10 : score);

  useEffect(() => {
    if (animate) {
      const duration = 1500;
      const steps = 60;
      const increment = (score - 10) / steps;
      let current = 10;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        current += increment;
        if (step >= steps) {
          setDisplayScore(score);
          clearInterval(timer);
        } else {
          setDisplayScore(Math.round(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [score, animate]);

  // Calculate rotation angle (-90 to 90 degrees for 180-degree arc)
  // Score ranges from 10 to 50
  const normalizedScore = (displayScore - 10) / 40;
  const rotation = -90 + normalizedScore * 180;

  const getStressLevel = (s: number) => {
    if (s <= 18)
      return { level: "Low Stress", color: "hsl(var(--stress-low))" };
    if (s <= 30)
      return { level: "Mild Stress", color: "hsl(var(--stress-mild))" };
    if (s <= 40)
      return { level: "Moderate Stress", color: "hsl(var(--stress-moderate))" };
    return { level: "High Stress", color: "hsl(var(--stress-high))" };
  };

  const { level, color } = getStressLevel(displayScore);

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative w-64 h-32">
        <svg
          viewBox="0 0 200 100"
          className="w-full h-full"
          style={{ overflow: "visible" }}
        >
          {/* Background arc segments */}
          <path
            d="M 20 90 A 80 80 0 0 1 65 20"
            fill="none"
            stroke="hsl(var(--stress-low))"
            strokeWidth="20"
            strokeLinecap="round"
          />
          <path
            d="M 65 20 A 80 80 0 0 1 100 10"
            fill="none"
            stroke="hsl(var(--stress-mild))"
            strokeWidth="20"
            strokeLinecap="round"
          />
          <path
            d="M 100 10 A 80 80 0 0 1 135 20"
            fill="none"
            stroke="hsl(var(--stress-moderate))"
            strokeWidth="20"
            strokeLinecap="round"
          />
          <path
            d="M 135 20 A 80 80 0 0 1 180 90"
            fill="none"
            stroke="hsl(var(--stress-high))"
            strokeWidth="20"
            strokeLinecap="round"
          />

          {/* Center circle */}
          <circle cx="100" cy="90" r="8" fill="hsl(var(--foreground))" />

          {/* Needle */}
          <g
            style={{
              transform: `rotate(${rotation}deg)`,
              transformOrigin: "100px 90px",
              transition: animate
                ? "transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)"
                : "none",
            }}
          >
            <line
              x1="100"
              y1="90"
              x2="100"
              y2="30"
              stroke={color}
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="100" cy="90" r="5" fill={color} />
          </g>
        </svg>

        {/* Score labels */}
        <div className="absolute bottom-0 left-[-8px] text-xs text-muted-foreground font-medium">
          10
        </div>
        <div className="absolute bottom-0 right-[-8px] text-xs text-muted-foreground font-medium">
          50
        </div>
      </div>

      {/* Score display */}
      <div className="mt-6 text-center">
        <div className="text-5xl font-bold mb-2" style={{ color }}>
          {displayScore}
        </div>
        <div className="text-lg font-semibold text-foreground">{level}</div>
      </div>
    </div>
  );
};
