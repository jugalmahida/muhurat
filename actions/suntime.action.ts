"use server";

import { ApiService } from "@/services/ApiService";
import { SunriseAndSunsetConfig, SunriseAndSunsetResponse } from "@/types";

export async function getSunriseAndSunsetAction(
  config: SunriseAndSunsetConfig
) {
  try {
    const apiService = new ApiService();
    const response = await apiService.getSunriseAndSunset(config);
    const data: SunriseAndSunsetResponse = response.data;
    return {
      success: true,
      data,
    };
  } catch (e: unknown) {
    console.log("Error while fetching the sunrise & sunset: ", e);
    return {
      success: false,
      error:
        e instanceof Error
          ? e.message
          : "Failed to fetch sunrise and sunset data",
    };
  }
}
