import { Request, Response } from "express";
import {
  weatherCache,
  CACHE_KEYS,
} from "../services/cache.service";

export const getCacheStatus = (
  _req: Request,
  res: Response
): void => {
  const weatherExists = weatherCache.has(
    CACHE_KEYS.WEATHER
  );

  const ttl = weatherCache.getTtl(
    CACHE_KEYS.WEATHER
  );

  const lastRequest = weatherCache.get(
    CACHE_KEYS.WEATHER_STATUS
  );

  let expiresInSeconds = 0;

  if (ttl) {
    expiresInSeconds = Math.max(
      0,
      Math.round((ttl - Date.now()) / 1000)
    );
  }

  res.status(200).json({
    success: true,
    cache: {
      status: weatherExists ? "HIT" : "MISS",
      hasWeatherData: weatherExists,
      expiresInSeconds,
      ttlSeconds: 300,
      lastRequest,
    },
  });
};