import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PawPrint, Shield, User, ArrowRight, ArrowLeft, CheckCircle2, Sparkles, MapPin } from 'lucide-react';
import { useAuth } from '../context/auth-context';
import { useData } from '../context/data-context';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select } from '../components/ui/select';
import { Card } from '../components/ui/card';

export function OnboardingPage() {
  const { user, updateUser } = useAuth();
  const { createPet } = useData();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [role, setRole] = useState(user?.role || 'citizen');
  const [district, setDistrict] = useState(user?.district || 'Los Olivos');
  const [dni, setDni] = useState(user?.dni || '74839201');
  const [phone, setPhone] = useState(user?.phone || '987654321');
  const [petName, setPetName] = useState('Rocky');
  const [petBreed, setPetBreed] = useState('Golden Retriever');

  const handleFinish = async () => {
    await updateUser({
      role,
      district,
      dni,
      phone,
      onboardingCompleted: true
    });

    if (role === 'citizen' && petName) {
      await createPet({
        name: petName,
        breed: petBreed,
        species: 'canino',
        gender: 'Macho',
        ageYears: 2,
        district,
        address: 'Av. Principal',
        ownerName: user?.name || 'Vecino',
        ownerDni: dni,
        ownerPhone: phone,
        rabiesVaccine: true,
        sterilized: true
      });
    }

    if (role === 'inspector' || role === 'admin') {
      navigate('/dashboard');
    } else {
      navigate('/pets');
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 text-left">
      <Card className="p-8 sm:p-10 space-y-6">
        
        {/* Step Header */}
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-mint-700 dark:text-mint-400">
            Paso {step} de 3 · Configuración de Perfil
          </span>
          <h2 className="font-display font-black text-2xl text-stone-900 dark:text-stone-100">
            {step === 1 && '¿Cuál es tu rol en la plataforma?'}
            {step === 2 && 'Indica tu distrito y datos de contacto'}
            {step === 3 && '¿Tienes una mascota para empadronar?'}
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            {step === 1 && 'Adaptaremos las vistas y herramientas a tus necesidades.'}
            {step === 2 && 'Válido para la emisión de carnés y seguimiento de reportes.'}
            {step === 3 && 'Generaremos su primer carné digital oficial con QR.'}
          </p>
        </div>

        {/* Step 1: Role Selection */}
        {step === 1 && (
          <div className="space-y-3">
            {[
              { id: 'citizen', title: 'Vecino / Ciudadano', desc: 'Registra tus mascotas y reporta suciedad en tu barrio.', icon: User },
              { id: 'inspector', title: 'Fiscalizador de Campo', desc: 'Atiende reportes, patrulla parques y escanea códigos QR.', icon: Shield },
              { id: 'admin', title: 'Director de Salubridad', desc: 'Gestiona cuadrillas, analiza indicadores y exporta reportes.', icon: Sparkles }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => setRole(item.id)}
                  className={`
                    p-4 rounded-2xl border-2 cursor-pointer flex items-center gap-4 transition
                    ${role === item.id
                      ? 'border-mint-600 bg-mint-50/70 dark:bg-mint-950/40 shadow-sm'
                      : 'border-stone-200 dark:border-slate-700 hover:border-mint-300'}
                  `}
                >
                  <div className="w-10 h-10 rounded-xl bg-mint-100 dark:bg-mint-900 text-mint-700 dark:text-mint-300 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 dark:text-stone-100 text-sm">{item.title}</h4>
                    <p className="text-xs text-stone-500 dark:text-stone-400">{item.desc}</p>
                  </div>
                </div>
              );
            })}

            <div className="pt-4 flex justify-end">
              <Button variant="primary" onClick={() => setStep(2)} rightIcon={<ArrowRight className="w-4 h-4" />}>
                Continuar
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: District & DNI */}
        {step === 2 && (
          <div className="space-y-4">
            <Select
              label="Distrito Principal"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              options={[
                { value: 'Los Olivos', label: 'Los Olivos' },
                { value: 'Comas', label: 'Comas' },
                { value: 'San Martín de Porres', label: 'San Martín de Porres' },
                { value: 'Independencia', label: 'Independencia' }
              ]}
            />

            <Input
              label="DNI Oficial (8 dígitos)"
              maxLength={8}
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              placeholder="74839201"
              required
            />

            <Input
              label="Teléfono Móvil"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="987654321"
              required
            />

            <div className="pt-4 flex items-center justify-between">
              <Button variant="outline" onClick={() => setStep(1)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Anterior
              </Button>
              <Button variant="primary" onClick={() => setStep(3)} rightIcon={<ArrowRight className="w-4 h-4" />}>
                Continuar
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: First Pet or Finish */}
        {step === 3 && (
          <div className="space-y-4">
            {role === 'citizen' ? (
              <>
                <Input
                  label="Nombre de tu Mascota"
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  placeholder="Ej. Rocky"
                />

                <Input
                  label="Raza"
                  value={petBreed}
                  onChange={(e) => setPetBreed(e.target.value)}
                  placeholder="Ej. Golden Retriever"
                />
              </>
            ) : (
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-800/80 border border-stone-200 dark:border-slate-700 text-xs text-stone-600 dark:text-stone-300">
                Tu perfil de fiscalizador o director municipal ha sido configurado para operar en el distrito de <strong>{district}</strong>.
              </div>
            )}

            <div className="pt-4 flex items-center justify-between">
              <Button variant="outline" onClick={() => setStep(2)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Anterior
              </Button>
              <Button variant="coral" onClick={handleFinish} leftIcon={<Sparkles className="w-4 h-4" />}>
                Comenzar a usar EcoHuellitas
              </Button>
            </div>
          </div>
        )}

      </Card>
    </div>
  );
}
