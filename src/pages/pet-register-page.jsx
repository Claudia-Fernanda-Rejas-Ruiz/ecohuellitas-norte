import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PawPrint, ShieldCheck, Upload, ArrowLeft, ArrowRight, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/auth-context';
import { useData } from '../context/data-context';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select } from '../components/ui/select';
import { Card, CardHeader, CardBody } from '../components/ui/card';

export function PetRegisterPage() {
  const { user } = useAuth();
  const { createPet } = useData();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: 'Rocky',
    species: 'canino',
    breed: 'Golden Retriever',
    gender: 'Macho',
    ageYears: 2,
    color: 'Dorado',
    district: user?.district || 'Los Olivos',
    address: 'Av. Antúnez de Mayolo 1240',
    ownerName: user?.name || 'Claudia Rejas',
    ownerDni: user?.dni || '74839201',
    ownerPhone: user?.phone || '987654321',
    rabiesVaccine: true,
    vaccineDate: '2026-01-20',
    sterilized: true,
    microchip: '',
    dangerousBreed: false,
    photoUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&q=80'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const samplePhotos = [
    { label: 'Golden Retriever', url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&q=80' },
    { label: 'Siberian Husky', url: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=600&q=80' },
    { label: 'Pastor Alemán', url: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=600&q=80' },
    { label: 'Poodle Toy', url: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=600&q=80' },
    { label: 'Mestizo Caramelo', url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&q=80' },
    { label: 'Gatito Europeo', url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Por favor indica el nombre de la mascota.');
      return;
    }
    if (!formData.ownerDni || formData.ownerDni.length !== 8) {
      setError('El DNI del propietario debe tener 8 dígitos válidos.');
      return;
    }

    setIsSubmitting(true);
    try {
      await createPet(formData);
      navigate('/pets');
    } catch (err) {
      setError(err.message || 'Error al empadronar mascota.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 text-left">
      
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate('/pets')}
          className="text-xs font-bold text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200 flex items-center gap-1.5 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Volver al Padrón
        </button>

        <span className="text-[10px] font-mono font-bold bg-mint-50 dark:bg-mint-950/60 text-mint-700 dark:text-mint-400 px-3 py-1 rounded-full border border-mint-200 dark:border-mint-800">
          Registro Oficial Lima Norte 2026
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form Column */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-stone-200/80 dark:border-slate-800 shadow-card space-y-6">
          <div>
            <h2 className="font-display font-black text-2xl text-stone-900 dark:text-stone-100">
              Empadronamiento Canino y Felino
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              Ingresa los datos de tu engreído para generar su carné digital oficial con código QR.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-2xl bg-coral-50 dark:bg-coral-950/50 border border-coral-200 text-coral-700 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Nombre de la Mascota"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Ej. Rocky"
              />

              <Select
                label="Especie"
                name="species"
                value={formData.species}
                onChange={handleChange}
                options={[
                  { value: 'canino', label: 'Perro (Canino)' },
                  { value: 'felino', label: 'Gato (Felino)' }
                ]}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Raza"
                name="breed"
                value={formData.breed}
                onChange={handleChange}
                required
                placeholder="Ej. Mestizo"
              />

              <Select
                label="Sexo"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                options={[
                  { value: 'Macho', label: 'Macho' },
                  { value: 'Hembra', label: 'Hembra' }
                ]}
              />

              <Input
                label="Edad (Años)"
                type="number"
                min="0"
                max="25"
                name="ageYears"
                value={formData.ageYears}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Distrito de Residencia"
                name="district"
                value={formData.district}
                onChange={handleChange}
                options={[
                  { value: 'Los Olivos', label: 'Los Olivos' },
                  { value: 'Comas', label: 'Comas' },
                  { value: 'San Martín de Porres', label: 'San Martín de Porres' },
                  { value: 'Independencia', label: 'Independencia' }
                ]}
              />

              <Input
                label="Dirección / Urbanización"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="Ej. Av. Antúnez de Mayolo 1240"
              />
            </div>

            {/* Fotografía de la Mascota */}
            <div className="space-y-2">
              <Input
                label="URL de la Fotografía"
                name="photoUrl"
                value={formData.photoUrl}
                onChange={handleChange}
                placeholder="https://..."
              />

              <div className="space-y-1">
                <span className="text-[11px] font-bold text-stone-400">O elige una foto de muestra:</span>
                <div className="flex flex-wrap gap-1.5">
                  {samplePhotos.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, photoUrl: item.url }))}
                      className="text-[10px] font-medium bg-stone-100 dark:bg-slate-800 hover:bg-mint-50 text-stone-700 dark:text-stone-300 px-2 py-1 rounded-lg border border-stone-200 dark:border-slate-700 transition"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Datos del Propietario */}
            <div className="pt-2 border-t border-stone-100 dark:border-slate-800 space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
                Datos del Propietario / Titular
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Input
                  label="Nombre Completo"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="DNI (8 dígitos)"
                  name="ownerDni"
                  maxLength={8}
                  value={formData.ownerDni}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Teléfono Móvil"
                  name="ownerPhone"
                  value={formData.ownerPhone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Estado Sanitario */}
            <div className="pt-2 border-t border-stone-100 dark:border-slate-800 space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
                Control Veterinario y Sanitario
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <label className="flex items-center gap-2 p-3 rounded-2xl bg-stone-50 dark:bg-slate-800/80 border border-stone-200 dark:border-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    name="rabiesVaccine"
                    checked={formData.rabiesVaccine}
                    onChange={handleChange}
                    className="w-4 h-4 text-mint-600 rounded focus:ring-mint-500"
                  />
                  <span className="font-bold text-stone-800 dark:text-stone-200">
                    Vacuna Antirrábica al Día
                  </span>
                </label>

                <label className="flex items-center gap-2 p-3 rounded-2xl bg-stone-50 dark:bg-slate-800/80 border border-stone-200 dark:border-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    name="sterilized"
                    checked={formData.sterilized}
                    onChange={handleChange}
                    className="w-4 h-4 text-mint-600 rounded focus:ring-mint-500"
                  />
                  <span className="font-bold text-stone-800 dark:text-stone-200">
                    Esterilizado / Castrado
                  </span>
                </label>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end gap-3">
              <Button
                variant="outline"
                type="button"
                onClick={() => navigate('/pets')}
              >
                Cancelar
              </Button>
              <Button
                variant="primary"
                type="submit"
                isLoading={isSubmitting}
                leftIcon={<Sparkles className="w-4 h-4" />}
              >
                Generar Carné Oficial
              </Button>
            </div>

          </form>
        </div>

        {/* Right Live Preview Column */}
        <div className="lg:col-span-5 space-y-4 sticky top-28">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
              Vista Previa en Vivo
            </span>
            <span className="text-[10px] text-mint-700 dark:text-mint-400 font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Se actualizará al instante
            </span>
          </div>

          <div className="credential-gradient text-white p-6 rounded-3xl shadow-card-elevated space-y-5 text-left border border-mint-400/30">
            <div className="flex items-center justify-between border-b border-white/20 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-mint-200">
                  <PawPrint className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-display font-extrabold text-sm text-white block leading-none">
                    Padrón Municipal Oficial
                  </span>
                  <span className="text-[10px] text-mint-200">{formData.district}</span>
                </div>
              </div>
              <span className="text-[10px] font-mono bg-white/20 px-2.5 py-1 rounded-full border border-white/30">
                EHN-{formData.district.slice(0, 3).toUpperCase()}-2026-PREVIEW
              </span>
            </div>

            <div className="flex items-center gap-4">
              <img
                src={formData.photoUrl || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&q=80'}
                alt="Preview"
                className="w-20 h-20 rounded-2xl object-cover border-2 border-white/60 shadow-md bg-stone-800"
              />
              <div className="space-y-1 flex-1 min-w-0">
                <h4 className="font-display font-black text-xl text-white truncate">
                  {formData.name || 'Nombre'}
                </h4>
                <p className="text-xs text-mint-100 font-medium">
                  {formData.breed || 'Raza'} · {formData.gender} · {formData.ageYears} años
                </p>
                <p className="text-[11px] text-mint-200/90 truncate">
                  Titular: <span className="font-semibold text-white">{formData.ownerName || 'Propietario'}</span>
                </p>
              </div>

              <div className="bg-white p-2 rounded-2xl shadow-md flex-shrink-0">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=PREVIEW"
                  alt="QR"
                  className="w-12 h-12 object-contain"
                />
              </div>
            </div>

            <div className="bg-black/20 p-3 rounded-2xl border border-white/10 grid grid-cols-2 gap-2 text-[11px]">
              <div>
                Antirrábica: <strong className="text-white">{formData.rabiesVaccine ? 'Al día' : 'Pendiente'}</strong>
              </div>
              <div>
                Esterilizado: <strong className="text-white">{formData.sterilized ? 'Sí' : 'No'}</strong>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-snug">
            Al registrar a tu mascota, se genera un código identificador único registrado en la base de datos de salubridad de Lima Norte.
          </p>
        </div>

      </div>

    </div>
  );
}
