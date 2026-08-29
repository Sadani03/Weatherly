import Link from "next/link";
import { redirect } from "next/navigation";
import {
  CloudSun,
  Gauge,
  Database,
  ShieldCheck,
  Code2,
  ArrowLeft,
} from "lucide-react";

import { auth0 } from "@/lib/auth0";
import WeatherLogo from "@/components/WeatherLogo";
import ThemeToggle from "@/components/ThemeToggle";

export default async function AboutPage() {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100 md:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <WeatherLogo size={58} />

            <div>
              <h1 className="text-2xl font-bold md:text-3xl">
                About Weather Analytics
              </h1>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                How the application evaluates weather comfort
              </p>
            </div>
          </div>

          <ThemeToggle />
        </header>

        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-indigo-600 transition hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          <ArrowLeft size={17} />
          Back to Dashboard
        </Link>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-8">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
              <CloudSun size={24} />
            </div>

            <div>
              <h2 className="text-xl font-bold">Project Overview</h2>

              <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
                Fidenz Weather Analytics is a full-stack weather dashboard
                that retrieves live weather information from OpenWeatherMap
                and ranks cities using a custom Comfort Index.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-8">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
              <Gauge size={24} />
            </div>

            <div className="w-full">
              <h2 className="text-xl font-bold">Comfort Index</h2>

              <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
                The Comfort Index produces a score from 0 to 100. A higher
                score represents weather conditions closer to the selected
                ideal comfort conditions.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Parameter
                  name="Temperature"
                  weight="40%"
                  ideal="22°C"
                />

                <Parameter
                  name="Humidity"
                  weight="25%"
                  ideal="50%"
                />

                <Parameter
                  name="Wind Speed"
                  weight="20%"
                  ideal="3 m/s"
                />

                <Parameter
                  name="Cloudiness"
                  weight="15%"
                  ideal="30%"
                />
              </div>

              <div className="mt-6 rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
                <p className="text-sm font-semibold">
                  Comfort Index Formula
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Score = Temperature × 0.40 + Humidity × 0.25 +
                  Wind × 0.20 + Cloudiness × 0.15
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-5 grid gap-5 md:grid-cols-3">
          <InfoCard
            icon={<Database size={22} />}
            title="Caching"
            description="Weather responses are cached for five minutes to reduce unnecessary OpenWeatherMap API requests."
          />

          <InfoCard
            icon={<ShieldCheck size={22} />}
            title="Authentication"
            description="Auth0 protects the dashboard with restricted user access and multi-factor authentication."
          />

          <InfoCard
            icon={<Code2 size={22} />}
            title="Technology"
            description="Built with Next.js, TypeScript, Tailwind CSS, Node.js, Express, Auth0 and OpenWeatherMap."
          />
        </section>
      </div>
    </main>
  );
}

function Parameter({
  name,
  weight,
  ideal,
}: {
  name: string;
  weight: string;
  ideal: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
      <div className="flex items-center justify-between">
        <p className="font-semibold">{name}</p>

        <span className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
          {weight}
        </span>
      </div>

      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Ideal: {ideal}
      </p>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 inline-flex rounded-xl bg-indigo-50 p-3 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
        {icon}
      </div>

      <h3 className="font-bold">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
        {description}
      </p>
    </div>
  );
}