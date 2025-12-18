// hooks/useSunriseAndSunset.ts
import { getSunriseAndSunsetAction } from "@/actions/suntime.action";
import { SunriseAndSunsetConfig, SunriseAndSunsetResponse } from "@/types";
import { useState, useCallback } from "react";

export const useSunriseAndSunset = () => {
  const [sunsetSunriseData, setSunsetSunriseData] =
    useState<SunriseAndSunsetResponse | null>(null);
  const [sunsetSunriseError, setSunsetSunriseError] = useState<string | null>(
    null
  );
  const [sunsetSunriseLoading, setSunsetSunriseLoading] =
    useState<boolean>(false);

  // Wrap in useCallback to prevent recreating on every render
  const getSunriseAndSunset = useCallback(
    async (payload: SunriseAndSunsetConfig) => {
      setSunsetSunriseError(null);
      setSunsetSunriseLoading(true);

      const response = await getSunriseAndSunsetAction(payload);

      if (response.success && response.data) {
        setSunsetSunriseData(response.data);
        setSunsetSunriseError(null);
      } else {
        setSunsetSunriseError(response.error || "An unknown error occurred");
        setSunsetSunriseData(null);
      }

      setSunsetSunriseLoading(false);
      return response.data;
    },
    []
  ); // Empty deps - function logic doesn't depend on external values

  const reset = useCallback(() => {
    setSunsetSunriseData(null);
    setSunsetSunriseError(null);
    setSunsetSunriseLoading(false);
  }, []);

  return {
    sunsetSunriseData,
    sunsetSunriseError,
    sunsetSunriseLoading,
    getSunriseAndSunset,
    reset,
  };
};
