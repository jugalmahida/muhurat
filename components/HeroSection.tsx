"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Choghadiya,
  formatTimeWithSeconds,
  getMuhuratDescription,
} from "../utils/vedicTime";
import { VedicClock } from "./VedicClock";
import {
  Sun,
  Moon,
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Sunrise,
  Sunset,
  Loader2,
  MapPin,
} from "lucide-react";
import { useSunriseAndSunset } from "@/hooks/useSunriseAndSunset";
import { useGeoLocation } from "@/hooks/useGeoLocation";
import { LocationPermissionModal } from "./LocationPermissionModal";

interface HeroSectionProps {
  choghadiyas: Choghadiya[];
  currentMuhurat?: Choghadiya;
  currentTime: Date;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  choghadiyas,
  currentMuhurat,
  currentTime,
}) => {
  if (!currentMuhurat) return null;

  const [showLocationModal, setShowLocationModal] = useState(false);
  const [hasAskedPermission, setHasAskedPermission] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);

  const isGood = currentMuhurat.status === "Good";

  // Format Date: Monday, 24 Oct
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "short",
  };
  const formattedDate = currentTime.toLocaleDateString("en-IN", dateOptions);

  // Format muhurat duration: 3:00 - 4:30
  const formatMuhuratDuration = (muhurat: Choghadiya) => {
    const startTime = muhurat.startTime.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const endTime = muhurat.endTime.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return `${startTime} - ${endTime}`;
  };

  const muhuratDuration = formatMuhuratDuration(currentMuhurat);

  const {
    getSunriseAndSunset,
    sunsetSunriseData,
    sunsetSunriseError,
    sunsetSunriseLoading,
  } = useSunriseAndSunset();

  const { getLocation, location, locationError, locationLoading } =
    useGeoLocation();

  // Don't show modal on mount - let user trigger it manually
  useEffect(() => {
    const hasAskedBefore = localStorage.getItem("locationPermissionAsked");
    const cachedLocation = localStorage.getItem("cached_location");

    // If we have cached location, use it
    if (cachedLocation) {
      setHasAskedPermission(true);
      return;
    }

    // Mark that we've checked, but don't show modal automatically
    setHasAskedPermission(true);

    // Check if permission was previously denied
    if (hasAskedBefore) {
      const denied = localStorage.getItem("locationPermissionDenied");
      if (denied === "true") {
        setPermissionDenied(true);
      }
    }
  }, []);

  // When location is obtained, fetch sunrise/sunset data
  useEffect(() => {
    if (location && location.lat && location.lng) {
      console.log("Location obtained:", location);
      getSunriseAndSunset(location);
      // Clear permission denied flag on success
      setPermissionDenied(false);
      localStorage.removeItem("locationPermissionDenied");
    }
  }, [location, getSunriseAndSunset]);

  // Monitor location error to detect permission denial
  useEffect(() => {
    if (locationError && locationError.includes("denied")) {
      setPermissionDenied(true);
      localStorage.setItem("locationPermissionDenied", "true");
    }
  }, [locationError]);

  const handleGetSunriseSunset = () => {
    setShowLocationModal(false);
    setHasAskedPermission(true);
    localStorage.setItem("locationPermissionAsked", "true");
    getLocation();
  };

  const handleModalClose = () => {
    setShowLocationModal(false);
    setHasAskedPermission(true);
    setPermissionDenied(true);
    localStorage.setItem("locationPermissionAsked", "true");
    localStorage.setItem("locationPermissionDenied", "true");
  };

  const handleRetryLocation = () => {
    setShowLocationModal(true);
  };

  const isLoadingSunData = locationLoading || sunsetSunriseLoading;
  const hasError = locationError || sunsetSunriseError;
  // Show button if we don't have sun data AND we're not loading AND (permission was denied OR we haven't asked yet)
  const showEnableLocationButton = !sunsetSunriseData && !isLoadingSunData;

  return (
    <section className="w-full max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-3">
      {/* Left: Current Status Card */}
      <motion.div
        className={`relative overflow-hidden rounded-3xl p-8 border-[3px] shadow-2xl transition-colors duration-500
          ${
            isGood
              ? "border-green-600 bg-gradient-to-br from-green-50 to-saffron-50"
              : "border-red-700 bg-gradient-to-br from-red-50 to-orange-50"
          }
        `}
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Background Decorative Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/mandala.png')]"></div>

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Top Date & Time Row */}
          <div className="w-full flex justify-between items-center text-sm font-semibold text-maroon-700/70 mb-6 border-b border-maroon-700/10 pb-2">
            <div className="flex items-center space-x-1">
              <Calendar size={14} />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock size={14} />
              <span className="tabular-nums font-mono tracking-wider">
                {formatTimeWithSeconds(currentTime)}
              </span>
            </div>
          </div>

          {/* Status Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 shadow-inner 
              ${
                isGood
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }
            `}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              {isGood ? <CheckCircle2 size={48} /> : <AlertCircle size={48} />}
            </motion.div>
          </motion.div>

          <h2 className="text-xl font-hindi text-maroon-800 mb-2 tracking-wide uppercase">
            Current Muhurat
          </h2>

          <AnimatePresence mode="wait">
            <motion.h3
              key={currentMuhurat.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`text-6xl font-serif font-bold mb-4 drop-shadow-sm ${
                isGood ? "text-green-800" : "text-red-800"
              }`}
            >
              {currentMuhurat.name}
            </motion.h3>
          </AnimatePresence>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
            className={`px-3 py-1 rounded-2xl font-mono font-bold text-2xl mb-4 tracking-wider shadow-lg backdrop-blur-sm
              ${
                isGood
                  ? "bg-green-500/20 border-2 border-green-400 text-green-900"
                  : "bg-red-500/20 border-2 border-red-400 text-red-900"
              }
            `}
          >
            {muhuratDuration}
          </motion.div>

          {/* Description */}
          <div className="mb-4 mx-auto">
            <p className="text-maroon-700 font-body text-md italic leading-relaxed">
              "{getMuhuratDescription(currentMuhurat.name)}"
            </p>
          </div>

          <div
            className={`px-8 py-2 rounded-full font-bold text-white shadow-lg tracking-widest text-sm uppercase transition-colors 
            ${
              isGood
                ? "bg-gradient-to-r from-green-600 to-green-700"
                : "bg-gradient-to-r from-red-600 to-red-700"
            }
          `}
          >
            {isGood ? "Shubh (Good)" : "Ashubh (Bad)"}
          </div>

          <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-500 bg-white/50 px-4 py-1 rounded-full border border-gold-400/30">
            {currentMuhurat.isNight ? (
              <Moon size={14} className="text-blue-600" />
            ) : (
              <Sun size={14} className="text-orange-500" />
            )}
            <span className="font-semibold">
              {currentMuhurat.isNight ? "Ratri" : "Din"} (Night/Day) Cycle
            </span>
          </div>

          {/* Sun Timings Section - Integrated */}
          <div className="w-full">
            {isLoadingSunData && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-3 mt-6"
              >
                <Loader2 size={32} className="text-orange-500 animate-spin" />
                <p className="text-sm text-maroon-600 font-semibold">
                  Fetching sun timings...
                </p>
              </motion.div>
            )}

            {!isLoadingSunData && sunsetSunriseData && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-3"
              >
                <div className="mt-6 border-t border-maroon-700/10" />
                <h4 className="text-sm font-hindi font-bold text-maroon-800 uppercase tracking-wide">
                  Sun Timings
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col items-center bg-white/60 rounded-xl p-3 border border-orange-200 shadow-sm">
                    <Sunrise size={20} className="text-orange-500 mb-1" />
                    <span className="text-xs text-maroon-600 font-semibold mb-1">
                      Sunrise
                    </span>
                    <span className="text-base font-mono font-bold text-maroon-800">
                      {sunsetSunriseData.results.sunrise}
                    </span>
                  </div>
                  <div className="flex flex-col items-center bg-white/60 rounded-xl p-3 border border-orange-200 shadow-sm">
                    <Sunset size={20} className="text-red-500 mb-1" />
                    <span className="text-xs text-maroon-600 font-semibold mb-1">
                      Sunset
                    </span>
                    <span className="text-base font-mono font-bold text-maroon-800">
                      {sunsetSunriseData.results.sunset}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Enable Location Button - Shows when no sun data and not loading */}
            {showEnableLocationButton && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 space-y-3"
              >
                <div className="border-t border-maroon-700/10" />
                <p className="text-xs text-maroon-600 mb-2">
                  Enable location to see sunrise and sunset times
                </p>
                <button
                  onClick={handleRetryLocation}
                  className="w-full bg-gradient-to-r from-orange-500 to-saffron-500 text-white font-bold py-2 px-4 rounded-full hover:from-orange-600 hover:to-saffron-600 transition-all shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <MapPin size={16} />
                  Enable Location
                </button>
              </motion.div>
            )}

            {hasError && (
              <div className="mt-3 flex items-center justify-center gap-2">
                <AlertCircle size={20} className="text-red-600 shrink-0" />
                <span className="text-red-800 text-sm">
                  {locationError || sunsetSunriseError}
                </span>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Right: Vedic Clock */}
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col items-center justify-center"
      >
        <VedicClock
          choghadiyas={choghadiyas}
          currentMuhurat={currentMuhurat}
          currentTime={currentTime}
        />
      </motion.div>

      <LocationPermissionModal
        isOpen={showLocationModal}
        onRequestLocation={handleGetSunriseSunset}
        onClose={handleModalClose}
      />
    </section>
  );
};
