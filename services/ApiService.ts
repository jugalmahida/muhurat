import { SunriseAndSunsetConfig, SunriseAndSunsetResponse } from "@/types";
import { apiClient } from "./ApiClient";

export class ApiService {
  async getSunriseAndSunset(payload: SunriseAndSunsetConfig) {
    const response = await apiClient.get<SunriseAndSunsetResponse>("", {
      params: {
        lat: payload.lat,
        lng: payload.lng,
        ...(payload.date && { date: payload.date }),
      },
    });
    return response;
  }
}
