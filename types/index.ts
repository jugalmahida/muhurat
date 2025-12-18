export type SunriseAndSunsetConfig = {
  lat: number;
  lng: number;
  date?: string;
};

export interface SunriseAndSunsetResults {
  date: string;
  sunrise: string;
  sunset: string;
  first_light: string;
  last_light: string;
  dawn: string;
  dusk: string;
  solar_noon: string;
  golden_hour: string;
  day_length: string;
  timezone: string;
  utc_offset: number;
}

export interface SunriseAndSunsetResponse {
  results: SunriseAndSunsetResults;
  status: string;
}
