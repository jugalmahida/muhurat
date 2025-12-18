import { SunriseAndSunsetConfig } from "@/types";
import { useState, useEffect } from "react";

const LOCATION_STORAGE_KEY = "cached_location";
const LOCATION_TIMESTAMP_KEY = "location_timestamp";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const useGeoLocation = () => {
  const [location, setLocation] = useState<SunriseAndSunsetConfig>();
  const [locationError, setLocationError] = useState("");
  const [locationLoading, setLocationLoading] = useState(false);

  // Load cached location on mount
  useEffect(() => {
    const cachedLocation = localStorage.getItem(LOCATION_STORAGE_KEY);
    const cachedTimestamp = localStorage.getItem(LOCATION_TIMESTAMP_KEY);

    if (cachedLocation && cachedTimestamp) {
      const timestamp = parseInt(cachedTimestamp, 10);
      const now = Date.now();

      // Check if cache is still valid (less than 24 hours old)
      if (now - timestamp < CACHE_DURATION) {
        // console.log("✅ Using cached location");
        setLocation(JSON.parse(cachedLocation));
      } else {
        // console.log("⏰ Cache expired, clearing old location");
        localStorage.removeItem(LOCATION_STORAGE_KEY);
        localStorage.removeItem(LOCATION_TIMESTAMP_KEY);
      }
    }
  }, []);

  const getLocation = () => {
    // console.log("🔍 getLocation called");
    setLocationLoading(true);
    setLocationError("");

    // Check if geolocation is supported
    if (!navigator.geolocation) {
    //   console.error("❌ Geolocation not supported");
      setLocationError("Geolocation is not supported by your browser");
      setLocationLoading(false);
      return;
    }

    // console.log("✅ Geolocation supported, requesting position...");

    navigator.geolocation.getCurrentPosition(
      // Success callback
      (position) => {
        // console.log("✅ Position obtained:", position.coords);
        const locationData = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        // console.log("📍 Setting location state:", locationData);

        // Save to state
        setLocation(locationData);

        // Cache in localStorage with timestamp
        localStorage.setItem(
          LOCATION_STORAGE_KEY,
          JSON.stringify(locationData)
        );
        localStorage.setItem(LOCATION_TIMESTAMP_KEY, Date.now().toString());
        // console.log("💾 Location cached in localStorage");

        setLocationLoading(false);
        // console.log("✅ Location loading set to false");
      },

      // Error callback
      (err) => {
        // console.error("❌ Geolocation error:", err);
        let errorMessage = "";
        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorMessage =
              "Location permission denied. Please enable it in your browser settings.";
            console.error("❌ Permission denied");
            break;
          case err.POSITION_UNAVAILABLE:
            errorMessage =
              "Location information is unavailable. Maybe your device location is off.";
            console.error("❌ Position unavailable");
            break;
          case err.TIMEOUT:
            errorMessage = "Location request timed out.";
            console.error("❌ Timeout");
            break;
          default:
            errorMessage =
              "An unknown error occurred while asking about the location permission.";
            console.error("❌ Unknown error");
        }
        setLocationError(errorMessage);
        setLocationLoading(false);
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return {
    getLocation,
    locationLoading,
    locationError,
    location,
  };
};
