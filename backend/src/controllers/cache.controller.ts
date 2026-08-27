import { Request, Response } from "express";

import {
  weatherCache,
  CACHE_KEYS,
  getRawWeatherCacheKey,
} from "../services/cache.service";

import { getCities } from "../services/city.service";

export const getCacheStatus = (
  _req: Request,
  res: Response
): void => {
  const processedExists = weatherCache.has(
    CACHE_KEYS.PROCESSED_WEATHER
  );

  const processedTTL = weatherCache.getTtl(
    CACHE_KEYS.PROCESSED_WEATHER
  );

  const lastRequest = weatherCache.get(
    CACHE_KEYS.WEATHER_STATUS
  );

  const cities = getCities();

  const rawCacheStatus = cities.map((city) => {
    const key = getRawWeatherCacheKey(city.CityCode);

    return {
      cityCode: city.CityCode,
      city: city.CityName,
      cached: weatherCache.has(key),
    };
  });

  let expiresInSeconds = 0;

  if (processedTTL) {
    expiresInSeconds = Math.max(
      0,
      Math.round((processedTTL - Date.now()) / 1000)
    );
  }

  res.status(200).json({
    success: true,
    cache: {
      processed: {
        status: processedExists ? "HIT" : "MISS",
        cached: processedExists,
        expiresInSeconds,
        ttlSeconds: 300,
      },
      rawWeather: rawCacheStatus,
      lastRequest,
    },
  });
};