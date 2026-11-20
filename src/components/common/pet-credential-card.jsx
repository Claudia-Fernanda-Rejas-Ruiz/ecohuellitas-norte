import React from 'react';
import { PawPrint, ShieldCheck, QrCode, Download, Share2, Sparkles, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { useData } from '../../context/data-context';

export function PetCredentialCard({ pet, onShowQR, onEdit, onDelete, showActions = true }) {
  const { addToast } = useData();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Carné Oficial de ${pet.name}`,
        text: `Padrón Canino de Lima Norte: ${pet.registrationCode}`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(pet.registrationCode);
      addToast({
        type: 'info',
        title: 'Código copiado',
        message: `El código ${pet.registrationCode} está en tu portapapeles.`
      });
    }
  };

  return (
    <div className="credential-gradient text-white p-6 rounded-3xl shadow-card-elevated space-y-5 text-left border border-mint-400/30 relative">
      
      {/* Header Band */}
      <div className="flex items-center justify-between border-b border-white/20 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-mint-200">
            <PawPrint className="w-5 h-5" />
          </div>
          <div>
            <span className="font-display font-extrabold text-sm tracking-tight text-white block leading-none">
              Padrón Municipal Oficial
            </span>
            <span className="text-[10px] text-mint-200 font-medium">{pet.district}</span>
          </div>
        </div>

        <span className="text-[10px] font-mono font-bold bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/30 text-white">
          {pet.registrationCode}
        </span>
      </div>

      {/* Main Body */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <img
            src={pet.photoUrl || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&q=80'}
            alt={pet.name}
            className="w-20 h-20 rounded-2xl object-cover border-2 border-white/60 shadow-md bg-stone-800"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white" title="Vacunado y Verificado">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
        </div>

        <div className="space-y-1 flex-1 min-w-0">
          <h4 className="font-display font-black text-xl text-white truncate">{pet.name}</h4>
          <p className="text-xs text-mint-100 font-medium truncate">
            {pet.breed} · {pet.gender} · {pet.ageYears} años
          </p>
          <p className="text-[11px] text-mint-200/90 truncate">
            Titular: <span className="font-semibold text-white">{pet.ownerName}</span>
          </p>
        </div>

        {/* QR Code Icon Trigger */}
        <div
          onClick={() => onShowQR && onShowQR(pet)}
          className="cursor-pointer bg-white p-2 rounded-2xl shadow-md hover:scale-105 active:scale-95 transition-transform flex-shrink-0"
          title="Ver QR para collar"
        >
          <img
            src={pet.qrCodeUrl}
            alt="QR"
            className="w-14 h-14 object-contain rounded-lg"
          />
        </div>
      </div>

      {/* Feature Badges */}
      <div className="bg-black/20 backdrop-blur-sm p-3 rounded-2xl border border-white/10 grid grid-cols-2 gap-2 text-[11px]">
        <div className="flex items-center gap-1.5 text-mint-100">
          <Check className="w-3.5 h-3.5 text-mint-300" />
          <span>Antirrábica: <strong className="text-white">Al día</strong></span>
        </div>
        <div className="flex items-center gap-1.5 text-mint-100">
          <Check className="w-3.5 h-3.5 text-mint-300" />
          <span>Esterilizado: <strong className="text-white">{pet.sterilized ? 'Sí' : 'No'}</strong></span>
        </div>
      </div>

      {/* Action Footer */}
      {showActions && (
        <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/15">
          <button
            type="button"
            onClick={() => onShowQR && onShowQR(pet)}
            className="text-xs font-bold text-mint-100 hover:text-white flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-xl transition"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Ver Carné QR</span>
          </button>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleShare}
              className="p-1.5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-xl transition"
              title="Compartir o Copiar Registro"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
            {onDelete && (
              <button
                type="button"
                onClick={() => onDelete(pet.id)}
                className="text-xs text-rose-200 hover:text-white hover:bg-rose-500/40 px-2.5 py-1.5 rounded-xl transition"
              >
                Eliminar
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
