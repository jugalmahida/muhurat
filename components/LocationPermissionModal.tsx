// components/LocationPermissionModal.tsx
import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, AlertCircle, X } from "lucide-react";

interface LocationPermissionModalProps {
  isOpen: boolean;
  onRequestLocation: () => void;
  onClose: () => void;
}

export const LocationPermissionModal: React.FC<
  LocationPermissionModalProps
> = ({ isOpen, onRequestLocation, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md px-4"
          >
            <div className="bg-gradient-to-br from-saffron-50 to-orange-50 rounded-3xl shadow-2xl border-3 border-gold-500 p-8 relative">
              {/* Decorative Corners */}
              <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-gold-500 rounded-tl-lg"></div>
              <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-gold-500 rounded-tr-lg"></div>
              <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-gold-500 rounded-bl-lg"></div>
              <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-gold-500 rounded-br-lg"></div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-maroon-600 hover:text-maroon-800 transition-colors"
                aria-label="Close"
              >
                <X size={24} />
              </button>

              {/* Content */}
              <div className="flex flex-col items-center text-center pt-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-saffron-500 flex items-center justify-center mb-6 shadow-lg"
                >
                  <MapPin size={40} className="text-white" />
                </motion.div>

                <h2 className="text-2xl font-hindi font-bold text-maroon-800 mb-3 tracking-wide">
                  Enable Location Access
                </h2>

                <p className="text-maroon-700 font-body text-base leading-relaxed mb-2">
                  We need your location to calculate accurate sunrise and sunset
                  times for your area.
                </p>

                <p className="text-maroon-600 text-sm italic mb-6">
                  This helps us provide precise Muhurat timings based on your
                  geographic location.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <button
                    onClick={onRequestLocation}
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-3 px-6 rounded-full hover:from-green-700 hover:to-green-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Allow Location
                  </button>

                  <button
                    onClick={onClose}
                    className="flex-1 bg-white text-maroon-700 font-semibold py-3 px-6 rounded-full border-2 border-maroon-400 hover:bg-maroon-50 transition-all"
                  >
                    Maybe Later
                  </button>
                </div>

                <p className="text-xs text-maroon-500 mt-4">
                  Your location is only used for calculations and is never
                  stored or shared.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
