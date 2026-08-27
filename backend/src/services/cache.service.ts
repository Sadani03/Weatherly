import NodeCache from "node-cache";

export const weatherCache = new NodeCache({
  stdTTL: 300,
  checkperiod: 60,
  useClones: true,
});

export const CACHE_KEYS = {
  PROCESSED_WEATHER: "processed-weather-data",
  WEATHER_STATUS: "weather-cache-status",
};

export const getRawWeatherCacheKey = (cityCode: string): string => {
  return `raw-weather:${cityCode}`;
};