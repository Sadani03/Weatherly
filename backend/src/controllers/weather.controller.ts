import { Request, Response } from "express";
import { getWeatherForAllCities } from "../services/weather.service";

export const getWeather = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const weatherData = await getWeatherForAllCities();

    res.status(200).json({
      success: true,
      count: weatherData.length,
      data: weatherData,
    });
  } catch (error) {
    console.error("Weather API error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve weather data",
    });
  }
};