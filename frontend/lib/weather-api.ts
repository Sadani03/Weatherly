import { WeatherResponse } from "@/types/weather";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export async function getWeather(): Promise<WeatherResponse> {
  const response = await fetch(`${API_URL}/api/weather`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  return response.json();
}