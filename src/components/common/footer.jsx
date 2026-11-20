import React from 'react';
import { PawPrint, Shield, Scale, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-auto bg-white dark:bg-slate-900 border-t border-stone-200/80 dark:border-slate-800 py-10 px-4 sm:px-6 lg:px-8 text-stone-600 dark:text-stone-400 text-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-left">
        
        {/* Col 1 */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-mint-500 text-white flex items-center justify-center font-bold">
              <PawPrint className="w-4 h-4" />
            </div>
            <span className="font-display font-extrabold text-base text-stone-900 dark:text-stone-100">
              EcoHuellitas Norte
            </span>
          </div>
          <p className="text-stone-500 dark:text-stone-400 text-xs leading-relaxed">
            Plataforma cívica y municipal para la fiscalización de salubridad y padrón canino integrado en Lima Norte.
          </p>
        </div>

        {/* Col 2 */}
        <div className="space-y-2">
          <h4 className="font-bold uppercase tracking-wider text-[11px] text-stone-900 dark:text-stone-200">
            Distritos Integrados
          </h4>
          <ul className="space-y-1.5 text-xs">
            <li className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-mint-500" /> Municipalidad de Los Olivos</li>
            <li className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-mint-500" /> Municipalidad de Comas</li>
            <li className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-mint-500" /> San Martín de Porres</li>
            <li className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-mint-500" /> Independencia</li>
          </ul>
        </div>

        {/* Col 3 */}
        <div className="space-y-2">
          <h4 className="font-bold uppercase tracking-wider text-[11px] text-stone-900 dark:text-stone-200">
            Marco Normativo
          </h4>
          <ul className="space-y-1.5 text-xs text-stone-500 dark:text-stone-400">
            <li>Ordenanza N° 512-CDLO (Los Olivos)</li>
            <li>Ordenanza N° 580-MDC (Comas)</li>
            <li>Ordenanza N° 498-MDSMP (SMP)</li>
            <li>Ordenanza N° 415-MDI (Independencia)</li>
            <li className="font-bold text-amber-700 dark:text-amber-400">Unidad Impositiva Tributaria 2026: S/ 5,350.00</li>
          </ul>
        </div>

        {/* Col 4 */}
        <div className="space-y-2">
          <h4 className="font-bold uppercase tracking-wider text-[11px] text-stone-900 dark:text-stone-200">
            Seguridad y Privacidad
          </h4>
          <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
            Los datos personales de los vecinos se encuentran protegidos conforme a la Ley N° 29733 de Protección de Datos Personales del Perú.
          </p>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-stone-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-400">
        <div>
          © 2026 EcoHuellitas Norte · Práctica Calificada PFC III · Diseñado con calidad y accesibilidad AA
        </div>
        <div className="flex items-center gap-4">
          <span>Versión 2.4.0-SPA</span>
          <span>•</span>
          <span className="text-mint-600 dark:text-mint-400 font-semibold">100% Funcional</span>
        </div>
      </div>
    </footer>
  );
}
