"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  CircleHelp,
  LogOut,
  ShieldCheck,
  X,
} from "lucide-react";

import WeatherLogo from "./WeatherLogo";

interface SidebarProps {
  mobile?: boolean;
  onClose?: () => void;
}

export default function Sidebar({
  mobile = false,
  onClose,
}: SidebarProps) {
  return (
    <aside
      className={`min-h-screen w-64 flex-col border-r border-slate-200 bg-white p-5 transition-colors dark:border-slate-800 dark:bg-slate-900 ${
        mobile ? "flex w-72" : "hidden lg:flex"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <WeatherLogo size={62} />

          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white">
              Weatherly
            </h1>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Weather Analytics
            </p>
          </div>
        </div>

        {mobile && (
          <button
            type="button"
            aria-label="Close navigation"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <nav className="mt-10 space-y-2">
        <Link
          href="/"
          onClick={onClose}
          className="flex w-full items-center gap-3 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        <Link
          href="/about"
          onClick={onClose}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <CircleHelp size={18} />
          About
        </Link>

        <a
          href="/auth/logout"
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <LogOut size={18} />
          Logout
        </a>
      </nav>

      <div className="mt-auto rounded-2xl border border-slate-200 p-4 transition-colors dark:border-slate-700">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-indigo-50 p-2 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
            <ShieldCheck size={19} />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              Secure Access
            </p>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Authenticated with Auth0
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}