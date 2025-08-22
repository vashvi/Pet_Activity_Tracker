import { useEffect, useState } from "react";

export default function ProgressRing({ value, max, label }) {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;

  const [progress, setProgress] = useState(0);

  // Animate progress whenever value changes
  useEffect(() => {
    const nextProgress = Math.min(value / max, 1);
    setProgress(nextProgress);
  }, [value, max]);

  const dash = circumference * progress;

  return (
    <div className="flex flex-col items-center">
      <svg width="60" height="60">
        <circle
          cx="30"
          cy="30"
          r={radius}
          stroke="#eee"
          strokeWidth="6"
          fill="none"
        />
        <circle
          cx="30"
          cy="30"
          r={radius}
          stroke="#4CAF50"
          strokeWidth="6"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - dash}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
      </svg>
      <span className="text-sm">{label}</span>
    </div>
  );
}
