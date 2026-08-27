import { Weather } from "@/types/weather";

interface WeatherTableProps {
  weather: Weather[];
}

export default function WeatherTable({
  weather,
}: WeatherTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-lg font-bold text-slate-900">
          City Comfort Ranking
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          Most comfortable to least comfortable
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-6 py-4">Rank</th>
              <th className="px-6 py-4">City</th>
              <th className="px-6 py-4">Weather</th>
              <th className="px-6 py-4">Temperature</th>
              <th className="px-6 py-4">Comfort Index</th>
            </tr>
          </thead>

          <tbody>
            {weather.map((item) => (
              <tr
                key={item.cityCode}
                className="border-t border-slate-100 transition hover:bg-slate-50"
              >
                <td className="px-6 py-4">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold ${
                      item.rank === 1
                        ? "bg-yellow-100 text-yellow-700"
                        : item.rank === 2
                          ? "bg-slate-200 text-slate-700"
                          : item.rank === 3
                            ? "bg-orange-100 text-orange-700"
                            : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {item.rank}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <p className="font-semibold text-slate-900">
                    {item.city}
                  </p>

                  <p className="text-xs text-slate-500">
                    {item.country}
                  </p>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {item.icon && (
                      <img
                        src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
                        alt={item.description}
                        className="h-9 w-9"
                      />
                    )}

                    <span className="capitalize text-slate-700">
                      {item.description}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4 font-medium text-slate-700">
                  {item.temperature.toFixed(1)}°C
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="w-8 font-bold text-slate-900">
                      {item.comfortIndex}
                    </span>

                    <div className="h-2 w-28 overflow-hidden rounded-full bg-slate-100">
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
                  className="px-6 py-10 text-center text-sm text-slate-500"
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