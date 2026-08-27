import axios from "axios";
import { getCities } from "./city.service";
import { calculateComfortIndex } from "../utils/comfort-index";

import {
  weatherCache,
  CACHE_KEYS,
  getRawWeatherCacheKey,
} from "./cache.service";

const OPENWEATHER_URL =
  "https://api.openweathermap.org/data/2.5/weather";

interface OpenWeatherResponse {
  name: string;

  sys: {
    country: string;
  };

  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };

  wind: {
    speed: number;
  };

  clouds: {
    all: number;
  };

  visibility?: number;

  weather: Array<{
    description: string;
    icon: string;
  }>;
}

export interface WeatherData {
  cityCode: string;
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  cloudiness: number;
  visibility: number;
  description: string;
  icon: string;
  comfortIndex: number;
  rank?: number;
}

const fetchRawWeather = async (
  cityCode: string
): Promise<OpenWeatherResponse> => {
  const cacheKey = getRawWeatherCacheKey(cityCode);

  const cachedResponse =
    weatherCache.get<OpenWeatherResponse>(cacheKey);

  if (cachedResponse) {
    console.log(`Raw weather cache HIT: ${cityCode}`);

    return cachedResponse;
  }

  console.log(`Raw weather cache MISS: ${cityCode}`);

  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    throw new Error("OPENWEATHER_API_KEY is not configured");
  }

  const response = await axios.get<OpenWeatherResponse>(
    OPENWEATHER_URL,
    {
      params: {
        id: cityCode,
        appid: apiKey,
        units: "metric",
      },
    }
  );

  weatherCache.set(cacheKey, response.data);

  return response.data;
};

const fetchWeatherByCityCode = async (
  cityCode: string
): Promise<WeatherData> => {
  const data = await fetchRawWeather(cityCode);

  const comfortIndex = calculateComfortIndex({
    temperature: data.main.temp,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    cloudiness: data.clouds.all,
  });

  return {
    cityCode,
    city: data.name,
    country: data.sys.country,
    temperature: data.main.temp,
    feelsLike: data.main.feels_like,
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    windSpeed: data.wind.speed,
    cloudiness: data.clouds.all,
    visibility: data.visibility ?? 0,
    description: data.weather[0]?.description ?? "Unknown",
    icon: data.weather[0]?.icon ?? "",
    comfortIndex,
  };
};

export const getWeatherForAllCities =
  async (): Promise<WeatherData[]> => {
    const cachedProcessed =
      weatherCache.get<WeatherData[]>(
        CACHE_KEYS.PROCESSED_WEATHER
      );

    if (cachedProcessed) {
      console.log("Processed weather cache: HIT");

      weatherCache.set(CACHE_KEYS.WEATHER_STATUS, {
        status: "HIT",
        timestamp: new Date().toISOString(),
      });

      return cachedProcessed;
    }

    console.log("Processed weather cache: MISS");

    const cities = getCities();

    const weatherPromises = cities.map((city) =>
      fetchWeatherByCityCode(city.CityCode)
    );

    const weatherData = await Promise.all(weatherPromises);

    const rankedCities = weatherData
      .sort((a, b) => b.comfortIndex - a.comfortIndex)
      .map((city, index) => ({
        ...city,
        rank: index + 1,
      }));

    weatherCache.set(
      CACHE_KEYS.PROCESSED_WEATHER,
      rankedCities
    );

    weatherCache.set(CACHE_KEYS.WEATHER_STATUS, {
      status: "MISS",
      timestamp: new Date().toISOString(),
    });

    return rankedCities;
  };