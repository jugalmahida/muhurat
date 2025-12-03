import React from "react";
import { motion } from "motion/react";
import { Choghadiya, formatTime } from "../utils/vedicTime";
import { Sun, Moon } from "lucide-react";

interface UpcomingListProps {
  choghadiyas: Choghadiya[];
  currentTime: Date;
}

export const UpcomingList: React.FC<UpcomingListProps> = ({
  choghadiyas,
  currentTime,
}) => {
  // Filter only future muhurats or current one
  const upcoming = choghadiyas.filter((c) => c.endTime > currentTime);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 mb-16">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-serif text-maroon-800 border-b-2 border-gold-400 inline-block px-8 pb-1">
          Upcoming Muhurats Today
        </h3>
      </div>

      <div className="space-y-4">
        {upcoming.map((muhurat, index) => {
          const isGood = muhurat.status === "Good";
          const isCurrent =
            currentTime >= muhurat.startTime && currentTime < muhurat.endTime;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                scale: 1.01,
                backgroundColor: isGood ? "#f0fdf4" : "#fef2f2",
              }}
              className={`flex items-center justify-between p-5 rounded-r-xl border-l-8 shadow-sm bg-white/90 backdrop-blur-md cursor-default group transition-all duration-300
                ${isGood ? "border-l-green-600" : "border-l-maroon-600"}
                ${isCurrent ? "ring-2 ring-gold-400 bg-saffron-50" : ""}
              `}
            >
              <div className="flex items-center space-x-6">
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-full border-2 
                    ${
                      isGood
                        ? "bg-green-100 border-green-200 text-green-700"
                        : "bg-red-50 border-red-200 text-maroon-700"
                    }`}
                >
                  {muhurat.isNight ? <Moon size={20} /> : <Sun size={20} />}
                </div>

                <div>
                  <div className="flex items-center space-x-3">
                    <h4 className="text-xl font-serif font-bold text-gray-800">
                      {muhurat.name}
                    </h4>
                    {isCurrent && (
                      <span className="text-[10px] font-bold tracking-wider bg-gold-500  px-2 py-0.5 rounded shadow-sm animate-pulse">
                        NOW
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 font-medium">
                    {muhurat.isNight ? "Night Phase" : "Day Phase"}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-body font-bold text-gray-700 text-lg">
                  {formatTime(muhurat.startTime)} -{" "}
                  {formatTime(muhurat.endTime)}
                </p>
                <p
                  className={`text-xs font-bold uppercase tracking-widest ${
                    isGood ? "text-green-600" : "text-maroon-600"
                  }`}
                >
                  {muhurat.status === "Good" ? "Shubh" : "Ashubh"}
                </p>
              </div>
            </motion.div>
          );
        })}

        {upcoming.length === 0 && (
          <p className="text-center text-maroon-800/60 font-serif italic mt-8">
            Cycle complete for today. Awaiting next sunrise.
          </p>
        )}
      </div>
    </div>
  );
};
