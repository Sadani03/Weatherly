import Dashboard from "@/components/Dashboard";
import { getWeather } from "@/lib/weather-api";

export default async function Home() {
  const response = await getWeather();

  return (
    <Dashboard initialWeather={response.data} />
  );
}