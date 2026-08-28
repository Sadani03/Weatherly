"use client";

import {
  LayoutDashboard,
  CircleHelp,
  LogOut,
  ShieldCheck,
} from "lucide-react";

import WeatherLogo from "./WeatherLogo";

export default function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-64 flex-col border-r border-slate-200 bg-white p-5 lg:flex">
      <div className="flex items-center gap-3">
        <WeatherLogo size={58} />

        <div>
          <h1 className="text-lg font-bold text-slate-900">
            Fidenz
          </h1>

          <p className="text-xs text-slate-500">
            Weather Analytics
          </p>
        </div>
      </div>

      <nav className="mt-10 space-y-2">
        <button className="flex w-full items-center gap-3 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-medium text-white">
          <LayoutDashboard size={18} />
          Dashboard
        </button>

        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100">
          <CircleHelp size={18} />
          About
        </button>

        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100">
          <LogOut size={18} />
          Logout
        </button>
      </nav>

      <div className="mt-auto rounded-2xl border border-slate-200 p-4">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-indigo-50 p-2 text-indigo-600">
            <ShieldCheck size={19} />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-800">
              Secure Access
            </p>

            <p className="mt-1 text-xs text-slate-500">
              You are logged in
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}