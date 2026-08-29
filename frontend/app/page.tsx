import { redirect } from "next/navigation";

import Dashboard from "@/components/Dashboard";
import { getWeather } from "@/lib/weather-api";
import { auth0 } from "@/lib/auth0";

export default async function Home() {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  const response = await getWeather();

  return <Dashboard initialWeather={response.data} />;
}