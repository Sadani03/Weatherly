import NodeCache from "node-cache";

export const weatherCache = new NodeCache({
  stdTTL: 300,
  checkperiod: 60,
  useClones: true,
});

export const CACHE_KEYS = {
  WEATHER: "weather-data",
  WEATHER_STATUS: "weather-cache-status",
};