import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  PawPrint,
  Camera,
  MapPin,
  LayoutDashboard,
  Moon,
  Sun,
  Search,
  Shield,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../context/auth-context';
import { useTheme } from '../../context/theme-context';
import { useData } from '../../context/data-context';

export function Navbar() {
  const { user, loginAsDemo } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { setCommandOpen } = useData();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { to: '/', label: 'Inicio', icon: PawPrint },
    { to: '/pets', label: 'Mis Mascotas', icon: PawPrint },
    { to: '/report', label: 'Reportar Foco', icon: Camera, isHighlight: true },
    { to: '/map', label: 'Mapa Comunitario', icon: MapPin },
    { to: '/dashboard', label: 'Panel Municipal', icon: LayoutDashboard }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-stone-200/90 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6">
        <div className="flex items-center justify-between h-18 py-2.5 gap-2 sm:gap-3">
          
          {/* Logo & Brand con Lima Norte debajo */}
          <div
            onClick={() => {
              navigate('/');
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2.5 cursor-pointer select-none group flex-shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-mint-600 text-white rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform flex-shrink-0">
              <PawPrint className="w-5 h-5 sm:w-5 sm:h-5" />
            </div>
            <div className="flex flex-col justify-center text-left">
              <span className="font-display font-black text-base sm:text-lg text-stone-900 dark:text-stone-100 tracking-tight leading-tight">
                EcoHuellitas
              </span>
              <span className="text-[10px] font-semibold tracking-wide text-stone-500 dark:text-stone-400 leading-none">
                Lima Norte · Salubridad
              </span>
            </div>
          </div>

          {/* Navigation Links Centrales (Visibles en pantallas medianas y de escritorio) */}
          <nav className="hidden md:flex items-center gap-1 bg-stone-100/90 dark:bg-slate-800/90 p-1 rounded-2xl border border-stone-200 dark:border-slate-700 text-xs font-semibold">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `
                    px-2.5 sm:px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap
                    ${item.isHighlight
                      ? 'text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-800 font-bold'
                      : isActive
                        ? 'bg-mint-600 text-white shadow-sm font-bold'
                        : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-white/70 dark:hover:bg-slate-700'}
                  `}
                >
                  <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action Tools & User Profile */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            
            {/* Global Search Shortcut */}
            <button
              type="button"
              onClick={() => setCommandOpen(true)}
              className="p-2 rounded-xl text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-slate-800 border border-stone-200 dark:border-slate-700 transition flex items-center gap-1 text-xs"
              title="Buscar (Ctrl+K)"
            >
              <Search className="w-4 h-4" />
              <kbd className="hidden lg:inline-block text-[10px] font-mono text-stone-400 bg-stone-50 dark:bg-slate-900 px-1 rounded border border-stone-200 dark:border-slate-700">
                ⌘K
              </kbd>
            </button>

            {/* Dark / Light Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-xl text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-slate-800 border border-stone-200 dark:border-slate-700 transition"
              title={isDark ? 'Modo claro' : 'Modo oscuro'}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Role Selector */}
            <div className="hidden lg:flex items-center gap-1 bg-stone-100 dark:bg-slate-800 px-2 py-1 rounded-xl border border-stone-200 dark:border-slate-700 text-xs">
              <Shield className="w-3.5 h-3.5 text-mint-600 dark:text-mint-400 flex-shrink-0" />
              <select
                value={user?.role || 'citizen'}
                onChange={(e) => loginAsDemo(e.target.value)}
                className="bg-transparent text-stone-800 dark:text-stone-200 font-semibold focus:outline-none cursor-pointer text-xs pr-1"
              >
                <option value="citizen" className="dark:bg-slate-800">Vecino</option>
                <option value="inspector" className="dark:bg-slate-800">Fiscalizador</option>
                <option value="admin" className="dark:bg-slate-800">Director</option>
              </select>
            </div>

            {/* User Profile Card */}
            <div className="flex items-center gap-1.5 sm:gap-2 bg-stone-50 dark:bg-slate-800/80 p-1 pr-2 sm:pr-2.5 rounded-xl border border-stone-200 dark:border-slate-700 shadow-sm">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80'}
                alt={user?.name || 'Usuario'}
                className="w-7 h-7 rounded-lg object-cover border border-mint-500 flex-shrink-0"
              />
              <div className="text-left hidden xl:block leading-tight max-w-[100px] truncate">
                <div className="font-bold text-stone-900 dark:text-stone-100 text-xs truncate">
                  {user?.name || 'Usuario'}
                </div>
                <div className="text-[9px] text-stone-500 dark:text-stone-400 truncate">
                  {user?.district}
                </div>
              </div>
            </div>

            {/* Mobile / Tablet Menu Button (Solo visible en dispositivos móviles < md) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-slate-800 border border-stone-200 dark:border-slate-700 transition"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>

        {/* Mobile Collapsible Menu (Solo visible en móvil < md) */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-stone-200 dark:border-slate-800 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) => `
                      p-3 rounded-xl transition-all flex items-center gap-2.5 text-xs font-semibold
                      ${item.isHighlight
                        ? 'text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 font-bold'
                        : isActive
                          ? 'bg-mint-600 text-white shadow-sm font-bold'
                          : 'text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-slate-800 border border-stone-200 dark:border-slate-700'}
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>

            {/* Mobile Role Switcher */}
            <div className="lg:hidden flex items-center justify-between p-3 rounded-xl bg-stone-50 dark:bg-slate-800/90 border border-stone-200 dark:border-slate-700 text-xs">
              <span className="font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-2">
                <Shield className="w-4 h-4 text-mint-600 dark:text-mint-400" /> Cambiar Rol:
              </span>
              <select
                value={user?.role || 'citizen'}
                onChange={(e) => {
                  loginAsDemo(e.target.value);
                  setMobileMenuOpen(false);
                }}
                className="bg-white dark:bg-slate-900 text-stone-800 dark:text-stone-200 font-semibold px-2.5 py-1.5 rounded-lg border border-stone-200 dark:border-slate-700 focus:outline-none cursor-pointer text-xs"
              >
                <option value="citizen">Vecino</option>
                <option value="inspector">Fiscalizador</option>
                <option value="admin">Director</option>
              </select>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
