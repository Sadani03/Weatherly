import axios from "axios";
import { getCities } from "./city.service";
import { calculateComfortIndex } from "../utils/comfort-index";

const OPENWEATHER_URL =
  "https://api.openweathermap.org/data/2.5/weather";

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

const fetchWeatherByCityCode = async (
  cityCode: string
): Promise<WeatherData> => {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    throw new Error("OPENWEATHER_API_KEY is not configured");
  }

  const response = await axios.get(OPENWEATHER_URL, {
    params: {
      id: cityCode,
      appid: apiKey,
      units: "metric",
    },
  });

  const data = response.data;

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
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    comfortIndex,
  };
};

export const getWeatherForAllCities = async (): Promise<WeatherData[]> => {
  const cities = getCities();

  const weatherPromises = cities.map((city) =>
    fetchWeatherByCityCode(city.CityCode)
  );

  const weatherData = await Promise.all(weatherPromises);

  const rankedCities = weatherData.sort(
    (a, b) => b.comfortIndex - a.comfortIndex
  );

  return rankedCities.map((city, index) => ({
    ...city,
    rank: index + 1,
  }));
};