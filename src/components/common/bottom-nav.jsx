import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, PawPrint, Camera, MapPin, LayoutDashboard } from 'lucide-react';

export function BottomNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-stone-200 dark:border-slate-800 z-40 px-3 py-2 flex items-center justify-around text-[10px] font-bold text-stone-600 dark:text-stone-400 shadow-card-elevated">
      <NavLink
        to="/"
        className={({ isActive }) => `
          flex flex-col items-center gap-1 p-1 transition
          ${isActive ? 'text-mint-600 dark:text-mint-400 font-black' : 'hover:text-stone-900 dark:hover:text-stone-200'}
        `}
      >
        <Home className="w-5 h-5" />
        <span>Inicio</span>
      </NavLink>

      <NavLink
        to="/pets"
        className={({ isActive }) => `
          flex flex-col items-center gap-1 p-1 transition
          ${isActive ? 'text-mint-600 dark:text-mint-400 font-black' : 'hover:text-stone-900 dark:hover:text-stone-200'}
        `}
      >
        <PawPrint className="w-5 h-5" />
        <span>Mascotas</span>
      </NavLink>

      {/* Floating Center Action Button */}
      <NavLink
        to="/report"
        className="flex flex-col items-center gap-0.5 text-coral-600 dark:text-coral-400 -mt-6 group"
      >
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-coral-500 to-rose-600 text-white flex items-center justify-center shadow-lg shadow-coral-500/40 group-hover:scale-105 transition-transform">
          <Camera className="w-6 h-6" />
        </div>
        <span className="font-extrabold text-[10px]">Reportar</span>
      </NavLink>

      <NavLink
        to="/map"
        className={({ isActive }) => `
          flex flex-col items-center gap-1 p-1 transition
          ${isActive ? 'text-mint-600 dark:text-mint-400 font-black' : 'hover:text-stone-900 dark:hover:text-stone-200'}
        `}
      >
        <MapPin className="w-5 h-5" />
        <span>Mapa</span>
      </NavLink>

      <NavLink
        to="/dashboard"
        className={({ isActive }) => `
          flex flex-col items-center gap-1 p-1 transition
          ${isActive ? 'text-mint-600 dark:text-mint-400 font-black' : 'hover:text-stone-900 dark:hover:text-stone-200'}
        `}
      >
        <LayoutDashboard className="w-5 h-5" />
        <span>Panel</span>
      </NavLink>
    </nav>
  );
}
