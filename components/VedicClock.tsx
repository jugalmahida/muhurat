import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Choghadiya, formatTime } from "../utils/vedicTime";

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
  const [hoveredSegment, setHoveredSegment] = useState<Choghadiya | null>(null);

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
  const tipX = arrowLength * 0.9;
  const baseX = arrowLength * 0.7;
  const headSize = 8;

  // Align hand (+45 degrees offset based on logic)
  const handAngle = rotationDegrees + 45;

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Tooltip Overlay */}
      <AnimatePresence>
        {hoveredSegment && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          >
            <div className="bg-white/95 backdrop-blur-sm shadow-xl border border-gold-200 rounded-lg p-3 text-center min-w-[140px]">
              <p className="text-sm font-bold text-maroon-800 font-serif">
                {hoveredSegment.name}
              </p>
              <div className="h-px w-full bg-gold-200 my-1" />
              <p className="text-xs font-mono font-bold text-gray-600">
                {formatTime(hoveredSegment.startTime)} -{" "}
                {formatTime(hoveredSegment.endTime)}
              </p>
              <p
                className={`text-[10px] uppercase tracking-wider font-bold mt-1 ${
                  hoveredSegment.status === "Good"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {hoveredSegment.status}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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

            // Name Label Position (Inner)
            const labelX =
              center + radius * 0.6 * Math.cos((midAngle * Math.PI) / 180);
            const labelY =
              center + radius * 0.6 * Math.sin((midAngle * Math.PI) / 180);

            // Number Label Position (Outer Edge)
            const numX =
              center + radius * 0.9 * Math.cos((midAngle * Math.PI) / 180);
            const numY =
              center + radius * 0.9 * Math.sin((midAngle * Math.PI) / 180);

            return (
              <motion.g
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                onMouseEnter={() => setHoveredSegment(segment)}
                onMouseLeave={() => setHoveredSegment(null)}
                className="cursor-pointer"
              >
                <path
                  d={`M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`}
                  fill={fillColor}
                  fillOpacity={
                    isCurrent || hoveredSegment === segment ? 0.9 : 0.2
                  }
                  stroke="#FFFDD0"
                  strokeWidth="2"
                  className="transition-all duration-300 hover:brightness-110"
                />

                {/* Segment Name */}
                <text
                  x={labelX}
                  y={labelY}
                  fill={
                    isCurrent || hoveredSegment === segment ? "#FFF" : "#5a3a1a"
                  }
                  fontSize={isCurrent ? "16" : "12"}
                  fontWeight="bold"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  className="font-hindi select-none pointer-events-none"
                  transform={`rotate(90, ${labelX}, ${labelY})`}
                >
                  {segment.name}
                </text>

                {/* Segment Number (1-8) */}
                <text
                  x={numX}
                  y={numY}
                  fill={
                    isCurrent || hoveredSegment === segment ? "#FFF" : "#5a3a1a"
                  }
                  fillOpacity="0.7"
                  fontSize="10"
                  fontWeight="bold"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  className="font-mono select-none pointer-events-none"
                  transform={`rotate(90, ${numX}, ${numY})`}
                >
                  {index + 1}
                </text>
              </motion.g>
            );
          })}

          {/* Center Knob (Static on top) */}
          <circle
            cx={center}
            cy={center}
            r="10"
            fill="#800000"
            stroke="#DAA520"
            strokeWidth="3"
            className="pointer-events-none"
          />
        </svg>
      </div>

      <div className="mt-4 font-hindi font-bold text-maroon-700 text-lg">
        {isNightTime ? "रात्रि चौघड़िया" : "दिन का चौघड़िया"}
      </div>
    </div>
  );
};
