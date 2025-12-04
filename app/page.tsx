"use client";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { UpcomingList } from "@/components/UpcomingList";
import {
  Choghadiya,
  getCurrentMuhurat,
  getTodaysChoghadiya,
} from "@/utils/vedicTime";
import { motion } from "motion/react";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [choghadiyas, setChoghadiyas] = useState<Choghadiya[]>([]);
  const [currentMuhurat, setCurrentMuhurat] = useState<Choghadiya | undefined>(
    undefined
  );

  useEffect(() => {
    // Initial calculation
    const todayList = getTodaysChoghadiya(new Date());
    setChoghadiyas(todayList);

    // Timer to update current time every second for hh:mm:ss display
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);

      // Recalculate if day changes
      const freshList = getTodaysChoghadiya(now);
      setChoghadiyas(freshList);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const current = getCurrentMuhurat(choghadiyas, currentTime);
    setCurrentMuhurat(current);
  }, [currentTime, choghadiyas]);
  return (
    <div className="min-h-screen text-gray-900 pb-12 overflow-x-hidden">
      {/* Background Mandala overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] z-0"></div>

      <Header />

      <motion.main
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <HeroSection
          choghadiyas={choghadiyas}
          currentMuhurat={currentMuhurat}
          currentTime={currentTime}
        />

        <div className="w-full max-w-4xl px-4 my-6">
          <div className="h-px from-transparent via-maroon-600/30 to-transparent"></div>
        </div>

        <UpcomingList choghadiyas={choghadiyas} currentTime={currentTime} />
      </motion.main>

      <footer className="w-full text-center text-maroon-600/60 font-serif text-sm relative z-10">
        <p>Values are approximate based on 6:00 AM - 6:00 PM cycle.</p>
        <p>
          © {new Date().getFullYear()} Vedic Moments. Built with devotion by{" "}
        </p>
        <a href="https://x.com/Jugalmahida07" target="_blank">
          Jugal Mahida
        </a>
      </footer>
    </div>
  );
}
