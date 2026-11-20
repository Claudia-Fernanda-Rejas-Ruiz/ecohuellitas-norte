import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { PawPrint, Camera, MapPin, LayoutDashboard, Moon, Sun, Search, User, Shield, LogOut } from 'lucide-react';
import { useAuth } from '../../context/auth-context';
import { useTheme } from '../../context/theme-context';
import { useData } from '../../context/data-context';

export function Navbar() {
  const { user, loginAsDemo, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { setCommandOpen } = useData();
  const navigate = useNavigate();

  const navItems = [
    { to: '/', label: 'Inicio', icon: PawPrint },
    { to: '/pets', label: 'Mis Mascotas', icon: PawPrint },
    { to: '/report', label: 'Reportar Foco', icon: Camera, isHighlight: true },
    { to: '/map', label: 'Mapa Comunitario', icon: MapPin },
    { to: '/dashboard', label: 'Panel Municipal', icon: LayoutDashboard }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-stone-200/80 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div
            onClick={() => navigate('/')}
            className="flex items-center space-x-3 cursor-pointer select-none group"
          >
            <div className="w-12 h-12 bg-gradient-to-tr from-mint-500 to-emerald-600 text-white rounded-2xl flex items-center justify-center text-2xl shadow-md shadow-mint-500/25 group-hover:scale-105 transition-transform">
              <PawPrint className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold text-xl text-stone-900 dark:text-stone-100 tracking-tight">
                  EcoHuellitas
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-mint-100 text-mint-800 dark:bg-mint-950 dark:text-mint-300 px-2 py-0.5 rounded-full border border-mint-200 dark:border-mint-800 font-mono">
                  Lima Norte
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                Salubridad y Cuidado Comunitario
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1.5 bg-stone-100 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-stone-200/80 dark:border-slate-700/80 text-xs font-bold">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `
                    px-4 py-2 rounded-xl transition-all flex items-center gap-2
                    ${item.isHighlight
                      ? 'text-coral-700 dark:text-coral-300 bg-coral-50 dark:bg-coral-950/50 hover:bg-coral-100 dark:hover:bg-coral-900/60 border border-coral-200 dark:border-coral-800'
                      : isActive
                        ? 'bg-mint-600 text-white shadow-md shadow-mint-600/30 font-black'
                        : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-white/80 dark:hover:bg-slate-700'}
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Action Tools & User Profile */}
          <div className="flex items-center space-x-3">
            
            {/* Global Search Button Ctrl+K */}
            <button
              type="button"
              onClick={() => setCommandOpen(true)}
              className="p-2.5 rounded-xl text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-slate-800 transition flex items-center gap-2 text-xs border border-transparent hover:border-stone-200 dark:hover:border-slate-700"
              title="Buscar en la plataforma (Ctrl+K)"
            >
              <Search className="w-4 h-4" />
              <kbd className="hidden sm:inline-block text-[10px] font-mono bg-stone-100 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-stone-300 dark:border-slate-600">
                ⌘K
              </kbd>
            </button>

            {/* Dark / Light Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-slate-800 transition"
              title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Role Demo Switcher */}
            <div className="hidden sm:flex items-center gap-1.5 bg-stone-100 dark:bg-slate-800 px-3 py-1.5 rounded-2xl border border-stone-200 dark:border-slate-700 text-xs">
              <Shield className="w-3.5 h-3.5 text-mint-600" />
              <select
                value={user?.role || 'citizen'}
                onChange={(e) => loginAsDemo(e.target.value)}
                className="bg-transparent text-stone-800 dark:text-stone-100 font-bold focus:outline-none cursor-pointer text-xs"
              >
                <option value="citizen" className="dark:bg-slate-800">Rol: Ciudadano</option>
                <option value="inspector" className="dark:bg-slate-800">Rol: Fiscalizador</option>
                <option value="admin" className="dark:bg-slate-800">Rol: Administrador</option>
              </select>
            </div>

            {/* User Profile Badge */}
            <div className="flex items-center space-x-2 bg-stone-50 dark:bg-slate-800/90 p-1.5 pr-3 rounded-2xl border border-stone-200/80 dark:border-slate-700 shadow-sm">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80'}
                alt={user?.name || 'Usuario'}
                className="w-8 h-8 rounded-xl object-cover border border-mint-500"
              />
              <div className="text-left hidden md:block">
                <div className="font-bold text-stone-900 dark:text-stone-100 text-xs leading-none">
                  {user?.name || 'Claudia Rejas'}
                </div>
                <div className="text-[10px] text-stone-500 dark:text-stone-400 font-medium mt-0.5">
                  {user?.role === 'citizen' ? 'Vecino' : user?.role === 'inspector' ? 'Fiscalizador' : 'Director'} · {user?.district}
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
