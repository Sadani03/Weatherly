import {
  Thermometer,
  Trophy,
  ChartNoAxesCombined,
  RefreshCw,
} from "lucide-react";

import Sidebar from "@/components/Sidebar";
import StatCard from "@/components/StatCard";
import WeatherTable from "@/components/WeatherTable";

import { getWeather } from "@/lib/weather-api";

export default async function Home() {
  const weatherResponse = await getWeather();

  const weather = weatherResponse.data;

  const mostComfortable = weather[0];

  const averageComfort =
    weather.length > 0
      ? Math.round(
          weather.reduce(
            (total, item) => total + item.comfortIndex,
            0
          ) / weather.length
        )
      : 0;

  return (
    <main className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <section className="flex-1 p-5 md:p-8">
        <div className="mx-auto max-w-7xl">
          <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Fidenz Weather Analytics
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Real-time weather insights with Comfort Index
            </p>
          </header>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total Cities"
              value={weather.length}
              subtitle="Monitored"
              icon={<Thermometer size={22} />}
            />

            <StatCard
              title="Most Comfortable"
              value={mostComfortable?.city ?? "N/A"}
              subtitle={
                mostComfortable
                  ? `Score ${mostComfortable.comfortIndex}`
                  : ""
              }
              icon={<Trophy size={22} />}
            />

            <StatCard
              title="Average Comfort"
              value={averageComfort}
              subtitle="/100"
              icon={<ChartNoAxesCombined size={22} />}
            />

            <StatCard
              title="Weather Data"
              value="Live"
              subtitle="5-minute cache"
              icon={<RefreshCw size={22} />}
            />
          </div>

          <div className="mt-6">
            <WeatherTable weather={weather} />
          </div>
        </div>
      </section>
    </main>
  );
}