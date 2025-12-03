import React from "react";
import { motion } from "motion/react";

export const Header: React.FC = () => {
  return (
    <header className="w-full py-6 text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-5xl font-hindi font-bold text-maroon-600 drop-shadow-sm">
          जय श्री राधे
        </h1>
        <div className="w-24 h-1 bg-saffron-400 mx-auto mt-3 rounded-full"></div>
      </motion.div>
    </header>
  );
};
