
import React, { useEffect, useState } from 'react';

interface BMIGaugeProps {
  value: number;
  isCalculating?: boolean;
}

const BMIGauge: React.FC<BMIGaugeProps> = ({ value, isCalculating }) => {
  const minBmi = 15;
  const maxBmi = 40;
  
  // State to handle the "swing" animation start
  const [displayValue, setDisplayValue] = useState(minBmi);

  useEffect(() => {
    if (!isCalculating) {
      // Small delay to ensure the component is painted before starting the swing
      const timer = setTimeout(() => {
        setDisplayValue(value);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      // While calculating, swing back to start or jitter slightly for effect
      setDisplayValue(minBmi);
    }
  }, [value, isCalculating]);

  const clampedValue = Math.min(Math.max(displayValue, minBmi), maxBmi);
  // Map BMI 15-40 to -90 to 90 degrees (180 degree span)
  const rotation = ((clampedValue - minBmi) / (maxBmi - minBmi)) * 180 - 90;

  return (
    <div className="relative w-full max-w-[420px] mx-auto pt-6">
      <svg viewBox="0 0 200 120" className="w-full h-auto drop-shadow-xl">
        <defs>
          <clipPath id="gaugeClip">
            <path d="M 20 100 A 80 80 0 0 1 180 100 L 155 100 A 55 55 0 0 0 45 100 Z" />
          </clipPath>
          <linearGradient id="needleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
        </defs>

        <g clipPath="url(#gaugeClip)">
          {/* Segment 1: Red (Very Underweight) */}
          <path d="M 100 100 L 100 0 A 100 100 0 0 1 145 15 Z" fill="#dc2626" transform="rotate(-90, 100, 100)" />
          {/* Segment 2: Orange (Underweight) */}
          <path d="M 100 100 L 100 0 A 100 100 0 0 1 145 15 Z" fill="#fbbf24" transform="rotate(-65, 100, 100)" />
          {/* Segment 3: Yellow (Borderline) */}
          <path d="M 100 100 L 100 0 A 100 100 0 0 1 145 15 Z" fill="#fef08a" transform="rotate(-45, 100, 100)" />
          {/* Segment 4: Green (Normal 18.5 - 25) */}
          <path d="M 100 100 L 100 0 A 100 100 0 0 1 195 80 Z" fill="#16a34a" transform="rotate(-25, 100, 100)" />
          {/* Segment 5: Yellow/Orange (Overweight 25 - 30) */}
          <path d="M 100 100 L 100 0 A 100 100 0 0 1 145 15 Z" fill="#fbbf24" transform="rotate(25, 100, 100)" />
          {/* Segment 6: Red (Obese 30-35) */}
          <path d="M 100 100 L 100 0 A 100 100 0 0 1 145 15 Z" fill="#ef4444" transform="rotate(50, 100, 100)" />
          {/* Segment 7: Dark Red (Severely Obese 35+) */}
          <path d="M 100 100 L 100 0 A 100 100 0 0 1 145 15 Z" fill="#991b1b" transform="rotate(75, 100, 100)" />
        </g>

        {/* Dynamic Scale Labels */}
        <g className="fill-slate-400 font-bold" style={{ fontSize: '5px' }}>
          <text x="18" y="105">16</text>
          <text x="25" y="75">17</text>
          <text x="45" y="50">18.5</text>
          <text x="105" y="25">25</text>
          <text x="155" y="55">30</text>
          <text x="175" y="85">35</text>
          <text x="182" y="105">40</text>
        </g>

        {/* Needle with "Arrow" swing effect */}
        <g 
          transform={`rotate(${rotation}, 100, 100)`} 
          className="transition-transform duration-[2000ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        >
          {/* Needle Base Circle */}
          <circle cx="100" cy="100" r="6" fill="#1e293b" />
          <circle cx="100" cy="100" r="2.5" fill="#94a3b8" />
          {/* The Actual Arrow Needle */}
          <path 
            d="M 97 100 L 100 15 L 103 100 Z" 
            fill="url(#needleGradient)" 
            className="drop-shadow-sm"
          />
        </g>

        {/* Text inside Gauge */}
        <text x="100" y="85" textAnchor="middle" fontSize="16" className="fill-slate-800 dark:fill-white font-black">
          {isCalculating ? '...' : displayValue}
        </text>
        <text x="100" y="95" textAnchor="middle" fontSize="6" className="fill-slate-400 font-bold uppercase tracking-tighter">
          BMI SCORE
        </text>
      </svg>
    </div>
  );
};

export default BMIGauge;
