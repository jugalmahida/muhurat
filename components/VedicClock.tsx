import React from "react";
import { motion } from "motion/react";
import { Choghadiya } from "../utils/vedicTime";

interface VedicClockProps {
  choghadiyas: Choghadiya[];
  currentMuhurat?: Choghadiya;
  currentTime: Date;
}

export const VedicClock: React.FC<VedicClockProps> = ({
  choghadiyas,
  currentMuhurat,
  currentTime,
}) => {
  // Filter for only day or night based on current time
  const isNightTime = currentMuhurat?.isNight ?? false;
  const visibleSegments = choghadiyas.filter((c) => c.isNight === isNightTime);

  // Size Config
  const size = 320;
  const center = size / 2;
  const radius = size / 2 - 20;

  // Time Logic
  const h = currentTime.getHours();
  const m = currentTime.getMinutes();
  const s = currentTime.getSeconds();

  let minutesPassed = 0;
  if (isNightTime) {
    const startHour = 18;
    let currentHourAdjusted = h;
    if (h < startHour) currentHourAdjusted = h + 24;
    minutesPassed = (currentHourAdjusted - startHour) * 60 + m + s / 60;
  } else {
    const startHour = 6;
    minutesPassed = (h - startHour) * 60 + m + s / 60;
  }

  const rotationDegrees = (minutesPassed / 720) * 360;

  // Arrow Configuration
  const arrowLength = radius * 0.6;
  // Calculate specific points for the arrow head relative to 0 (start)
  const tipX = arrowLength * 0.9;
  const baseX = arrowLength * 0.7;
  const headSize = 8;

  // Align hand (+45 degrees offset based on your original logic)
  const handAngle = rotationDegrees + 45;

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="relative w-[340px] h-[340px] flex items-center justify-center">
        {/* Decorative Outer Rings */}
        <div className="absolute inset-0 border-maroon-600 rounded-full opacity-10" />
        <div className="absolute inset-2 border border-dashed border-gold-500 rounded-full opacity-40 animate-spin-slow" />

        <svg
          width={size}
          height={size}
          className="transform -rotate-90 z-10 drop-shadow-xl"
        >
          {/* Segments */}
          {visibleSegments.map((segment, index) => {
            const startAngle = (index * 360) / 8;
            const endAngle = ((index + 1) * 360) / 8;

            const x1 = center + radius * Math.cos((startAngle * Math.PI) / 180);
            const y1 = center + radius * Math.sin((startAngle * Math.PI) / 180);
            const x2 = center + radius * Math.cos((endAngle * Math.PI) / 180);
            const y2 = center + radius * Math.sin((endAngle * Math.PI) / 180);

            const isCurrent =
              currentMuhurat?.startTime.getTime() ===
              segment.startTime.getTime();

            const fillColor = segment.status === "Good" ? "#047857" : "#991b1b";

            const midAngle = (startAngle + endAngle) / 2;
            const labelX =
              center + radius * 0.65 * Math.cos((midAngle * Math.PI) / 180);
            const labelY =
              center + radius * 0.65 * Math.sin((midAngle * Math.PI) / 180);

            return (
              <motion.g
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <path
                  d={`M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`}
                  fill={fillColor}
                  fillOpacity={isCurrent ? 0.85 : 0.15}
                  stroke="#FFFDD0"
                  strokeWidth="2"
                  className="transition-all duration-300"
                />
                <text
                  x={labelX}
                  y={labelY}
                  fill={isCurrent ? "#FFF" : "#5a3a1a"}
                  fontSize={isCurrent ? "18" : "14"}
                  fontWeight="bold"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  className="font-hindi select-none pointer-events-none"
                  transform={`rotate(90, ${labelX}, ${labelY})`}
                >
                  {segment.name}
                </text>
              </motion.g>
            );
          })}

          {/* --- FIX START --- */}

          {/* 1. Yellow Base Cap (Now Static and outside the rotating group) */}
          
          {/* <circle cx={center} cy={center} r={6} fill="#DAA520" />
          <motion.g
         
            animate={{ rotate: handAngle, x: center, y: center }}
            transition={{ type: "spring", stiffness: 50, damping: 15 }}
          >
            <line
              x1={0}
              y1={0}
              x2={baseX}
              y2={0}
              stroke="#DAA520"
              strokeWidth={4}
              strokeLinecap="round"
            />
            <path
              d={`M ${tipX} 0 L ${baseX} ${-headSize} L ${baseX} ${headSize} Z`}
              fill="#DAA520"
            />
          </motion.g> */}

          {/* 3. Center Knob (Static on top) */}
          <circle
            cx={center}
            cy={center}
            r="10"
            fill="#800000"
            stroke="#DAA520"
            strokeWidth="3"
          />
          {/* --- FIX END --- */}
        </svg>
      </div>

      <div className="mt-4 font-hindi font-bold text-maroon-700 text-lg">
        {isNightTime ? "रात्रि चौघड़िया" : "दिन का चौघड़िया"}
      </div>
    </div>
  );
};
