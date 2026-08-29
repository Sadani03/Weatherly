import Image from "next/image";
import { Weather } from "@/types/weather";

interface WeatherTableProps {
  weather: Weather[];
  showHeader?: boolean;
}

export default function WeatherTable({
  weather,
  showHeader = true,
}: WeatherTableProps) {
  return (
    <div className="overflow-hidden bg-white transition-colors dark:bg-slate-900">
      {showHeader && (
        <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            City Comfort Ranking
          </h2>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Most comfortable to least comfortable
          </p>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500 transition-colors dark:bg-slate-800/70 dark:text-slate-400">
            <tr>
              <th className="px-6 py-4">
                Rank
              </th>

              <th className="px-6 py-4">
                City
              </th>

              <th className="px-6 py-4">
                Weather
              </th>

              <th className="px-6 py-4">
                Temperature
              </th>

              <th className="px-6 py-4">
                Comfort Index
              </th>
            </tr>
          </thead>

          <tbody>
            {weather.map((item) => (
              <tr
                key={item.cityCode}
                className="border-t border-slate-100 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50"
              >
                <td className="px-6 py-4">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold ${
                      item.rank === 1
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300"
                        : item.rank === 2
                          ? "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200"
                          : item.rank === 3
                            ? "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300"
                            : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                    }`}
                  >
                    {item.rank}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <p className="font-semibold text-slate-900 dark:text-slate-100">
                    {item.city}
                  </p>

                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {item.country}
                  </p>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {item.icon && (
                      <Image
                        src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
                        alt={item.description}
                        width={36}
                        height={36}
                      />
                    )}

                    <span className="capitalize text-slate-700 dark:text-slate-300">
                      {item.description}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">
                  {item.temperature.toFixed(1)}°C
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="w-8 font-bold text-slate-900 dark:text-slate-100">
                      {item.comfortIndex}
                    </span>

                    <div className="h-2 w-28 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                      <div
                        className={`h-full rounded-full ${
                          item.comfortIndex >= 75
                            ? "bg-emerald-500"
                            : item.comfortIndex >= 50
                              ? "bg-yellow-400"
                              : "bg-red-400"
                        }`}
                        style={{
                          width: `${item.comfortIndex}%`,
                        }}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}

            {weather.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-10 text-center text-sm text-slate-500 dark:text-slate-400"
                >
                  No weather data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}