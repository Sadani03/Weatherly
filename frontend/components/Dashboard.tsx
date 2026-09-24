"use client";

import { useMemo, useState } from "react";
import {
  Thermometer,
  Trophy,
  ChartNoAxesCombined,
  RefreshCw,
  Menu,
} from "lucide-react";

import Sidebar from "@/components/Sidebar";
import StatCard from "@/components/StatCard";
import WeatherTable from "@/components/WeatherTable";
import WeatherLogo from "@/components/WeatherLogo";
import ThemeToggle from "@/components/ThemeToggle";
import { Weather } from "@/types/weather";

interface DashboardProps {
  initialWeather: Weather[];
}

type SortOption = "rank" | "comfort" | "temperature";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

const formatTime = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};

export default function Dashboard({
  initialWeather,
}: DashboardProps) {
  const [weather, setWeather] = useState<Weather[]>(initialWeather);
  const [sortBy, setSortBy] = useState<SortOption>("rank");
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] =
    useState<Date | null>(null);
  const [refreshError, setRefreshError] =
    useState<string | null>(null);

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const sortedWeather = useMemo(() => {
    const data = [...weather];

    if (sortBy === "comfort") {
      return data.sort(
        (a, b) => b.comfortIndex - a.comfortIndex
      );
    }

    if (sortBy === "temperature") {
      return data.sort(
        (a, b) => b.temperature - a.temperature
      );
    }

    return data.sort(
      (a, b) => a.rank - b.rank
    );
  }, [weather, sortBy]);

  const mostComfortable = useMemo(() => {
    if (weather.length === 0) {
      return undefined;
    }

    return [...weather].sort(
      (a, b) =>
        b.comfortIndex - a.comfortIndex
    )[0];
  }, [weather]);

  const averageComfort = useMemo(() => {
    if (weather.length === 0) {
      return 0;
    }

    const total = weather.reduce(
      (sum, item) =>
        sum + item.comfortIndex,
      0
    );

    return Math.round(
      total / weather.length
    );
  }, [weather]);

  const refreshWeather = async () => {
    if (loading) {
      return;
    }

    try {
      setLoading(true);
      setRefreshError(null);

      const response = await fetch(
        `${API_URL}/api/weather?t=${Date.now()}`,
        {
          method: "GET",
          cache: "no-store",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Request failed with status ${response.status}`
        );
      }

      const result = await response.json();

      if (
        !result.success ||
        !Array.isArray(result.data)
      ) {
        throw new Error(
          "Invalid weather response"
        );
      }

      setWeather(result.data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error(
        "Weather refresh failed:",
        error
      );

      setRefreshError(
        "Unable to refresh weather data."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <Sidebar />

      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={() =>
              setMobileMenuOpen(false)
            }
          />

          <div className="fixed inset-y-0 left-0 z-50 w-72 lg:hidden">
            <Sidebar
              mobile
              onClose={() =>
                setMobileMenuOpen(false)
              }
            />
          </div>
        </>
      )}

      <section className="min-w-0 flex-1">
        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-3 transition-colors dark:border-slate-800 dark:bg-slate-900 lg:hidden">
          <button
            type="button"
            aria-label="Open navigation"
            onClick={() =>
              setMobileMenuOpen(true)
            }
            className="rounded-xl p-2 text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <Menu size={21} />
          </button>

          <WeatherLogo size={50} />

          <ThemeToggle />
        </div>

        <div className="p-5 md:p-8">
          <div className="mx-auto max-w-7xl">
            <header className="mb-7 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <WeatherLogo size={62} />

                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white md:text-3xl">
                    Weather Analytics
                  </h1>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Real-time weather insights with Comfort Index
                  </p>
                </div>
              </div>

              <div className="hidden lg:block">
                <ThemeToggle />
              </div>
            </header>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                title="Total Cities"
                value={weather.length}
                subtitle="Monitored"
                icon={<Thermometer size={22} />}
              />

              <StatCard
                title="Most Comfortable"
                value={
                  mostComfortable?.city ??
                  "N/A"
                }
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
                icon={
                  <ChartNoAxesCombined
                    size={22}
                  />
                }
              />

              <StatCard
                title="Last Updated"
                value={
                  lastUpdated
                    ? formatTime(lastUpdated)
                    : "--:--:--"
                }
                subtitle="Current session"
                icon={<RefreshCw size={22} />}
              />
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
              <div className="flex flex-col gap-4 border-b border-slate-200 px-5 py-5 transition-colors dark:border-slate-800 md:flex-row md:items-center md:justify-between md:px-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    City Comfort Ranking
                  </h2>

                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Most comfortable to least comfortable
                  </p>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <select
                    value={sortBy}
                    onChange={(event) =>
                      setSortBy(
                        event.target
                          .value as SortOption
                      )
                    }
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  >
                    <option value="rank">
                      Sort: Rank
                    </option>

                    <option value="comfort">
                      Sort: Comfort Score
                    </option>

                    <option value="temperature">
                      Sort: Temperature
                    </option>
                  </select>

                  <button
                    type="button"
                    onClick={refreshWeather}
                    disabled={loading}
                    className="flex min-w-28 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                  >
                    <RefreshCw
                      size={16}
                      className={
                        loading
                          ? "animate-spin"
                          : ""
                      }
                    />

                    {loading
                      ? "Refreshing..."
                      : "Refresh"}
                  </button>
                </div>
              </div>

              {refreshError && (
                <div className="border-b border-red-100 bg-red-50 px-6 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
                  {refreshError}
                </div>
              )}

              <WeatherTable
                weather={sortedWeather}
                showHeader={false}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}