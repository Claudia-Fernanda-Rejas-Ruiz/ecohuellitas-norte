import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PawPrint, Camera, MapPin, ShieldCheck, ArrowRight, CheckCircle2, QrCode, Sparkles, User, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/auth-context';
import { useData } from '../context/data-context';
import { Button } from '../components/ui/button';
import { Card, CardBody } from '../components/ui/card';
import { StatCard } from '../components/ui/stat';
import { PetCredentialCard } from '../components/common/pet-credential-card';
import { Modal } from '../components/ui/modal';

export function LandingPage() {
  const { loginAsDemo, login } = useAuth();
  const { pets, stats, calculateFine } = useData();
  const navigate = useNavigate();

  const [selectedPetQR, setSelectedPetQR] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleCustomLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    try {
      await login(email, password);
      navigate('/pets');
    } catch (err) {
      setLoginError(err.message || 'Error al iniciar sesión');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleDemoAccess = async (role) => {
    await loginAsDemo(role);
    if (role === 'inspector' || role === 'admin') {
      navigate('/dashboard');
    } else {
      navigate('/pets');
    }
  };

  const samplePets = pets.slice(0, 3);

  return (
    <div className="space-y-12 text-left">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-stone-200/80 dark:border-slate-800 p-8 sm:p-12 shadow-card-elevated">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-mint-200/50 via-coral-100/30 to-amber-100/40 dark:from-mint-950/40 dark:via-rose-950/20 dark:to-amber-950/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-mint-50 dark:bg-mint-950/50 border border-mint-200 dark:border-mint-800/60 text-mint-800 dark:text-mint-300 px-3.5 py-1.5 rounded-full text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-mint-600 dark:text-mint-400" />
              <span>Plataforma Oficial de Salubridad y Padrón Canino</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl font-black text-stone-900 dark:text-stone-100 leading-tight tracking-tight">
              Calles limpias, parques seguros y mascotas felices en Lima Norte.
            </h1>

            <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
              Reporta focos de suciedad con foto y GPS en 3 pasos. Empadrona a tu mascota, obtén su carné digital con QR y ayúdanos a fiscalizar Los Olivos, Comas, San Martín de Porres e Independencia.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                variant="coral"
                size="lg"
                leftIcon={<Camera className="w-5 h-5" />}
                onClick={() => navigate('/report')}
              >
                Reportar Punto Crítico
              </Button>
              <Button
                variant="primary"
                size="lg"
                leftIcon={<PawPrint className="w-5 h-5" />}
                onClick={() => navigate('/pets/new')}
              >
                Empadronar Mascota
              </Button>
              <Button
                variant="secondary"
                size="lg"
                leftIcon={<MapPin className="w-5 h-5" />}
                onClick={() => navigate('/map')}
              >
                Ver Mapa en Vivo
              </Button>
            </div>
          </div>

          {/* Login Card & Demo Quick Access */}
          <div className="lg:col-span-5">
            <Card className="p-6 sm:p-8 bg-stone-50/90 dark:bg-slate-800/80 border-stone-200 dark:border-slate-700 shadow-sm space-y-5">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-mint-700 dark:text-mint-400">
                  Acceso a la Plataforma
                </span>
                <h3 className="font-display font-extrabold text-xl text-stone-900 dark:text-stone-100 mt-0.5">
                  Ingreso Inmediato
                </h3>
              </div>

              {loginError && (
                <div className="p-3 rounded-2xl bg-coral-50 dark:bg-coral-950/50 border border-coral-200 text-coral-700 text-xs font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              {/* Demo Buttons */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-stone-500 dark:text-stone-400 block">
                  Probar con usuario Demo:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handleDemoAccess('citizen')}
                    className="p-2.5 rounded-xl bg-white dark:bg-slate-700 border border-stone-200 dark:border-slate-600 hover:border-mint-500 hover:bg-mint-50 text-stone-800 dark:text-stone-100 text-xs font-bold transition flex flex-col items-center gap-1 shadow-sm"
                  >
                    <User className="w-4 h-4 text-mint-600" />
                    <span>Ciudadano</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDemoAccess('inspector')}
                    className="p-2.5 rounded-xl bg-white dark:bg-slate-700 border border-stone-200 dark:border-slate-600 hover:border-amber-500 hover:bg-amber-50 text-stone-800 dark:text-stone-100 text-xs font-bold transition flex flex-col items-center gap-1 shadow-sm"
                  >
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    <span>Fiscalizador</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDemoAccess('admin')}
                    className="p-2.5 rounded-xl bg-white dark:bg-slate-700 border border-stone-200 dark:border-slate-600 hover:border-purple-500 hover:bg-purple-50 text-stone-800 dark:text-stone-100 text-xs font-bold transition flex flex-col items-center gap-1 shadow-sm"
                  >
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    <span>Director</span>
                  </button>
                </div>
              </div>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-stone-200 dark:border-slate-700"></div>
                <span className="flex-shrink mx-3 text-stone-400 text-[10px] uppercase font-bold">o con correo</span>
                <div className="flex-grow border-t border-stone-200 dark:border-slate-700"></div>
              </div>

              {/* Standard Login Form */}
              <form onSubmit={handleCustomLogin} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu.correo@ejemplo.com"
                  className="w-full text-xs p-3 rounded-2xl bg-white dark:bg-slate-700 border border-stone-200 dark:border-slate-600 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-mint-500"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  className="w-full text-xs p-3 rounded-2xl bg-white dark:bg-slate-700 border border-stone-200 dark:border-slate-600 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-mint-500"
                />
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  isLoading={isLoggingIn}
                >
                  Entrar a mi Cuenta
                </Button>
              </form>

            </Card>
          </div>

        </div>
      </div>

      {/* Public KPIs Ribbon */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Mascotas Empadronadas"
          value={stats?.kpis?.totalPets || 15}
          subvalue="Con Carné QR Oficial"
          icon={PawPrint}
          color="mint"
        />
        <StatCard
          title="Focos Reportados"
          value={stats?.kpis?.totalReports || 41}
          subvalue="Georreferenciados"
          icon={Camera}
          color="coral"
        />
        <StatCard
          title="Tasa de Atención"
          value={`${stats?.kpis?.resolutionRate || 75}%`}
          subvalue="Resueltos por Cuadrilla"
          icon={CheckCircle2}
          color="amber"
        />
        <StatCard
          title="Puntos Limpios"
          value={stats?.kpis?.totalCleanPoints || 12}
          subvalue="Tachos y Bolsas Caninas"
          icon={MapPin}
          color="sky"
        />
      </div>

      {/* How it works in 3 Steps */}
      <div className="bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl border border-stone-200/80 dark:border-slate-800 shadow-card space-y-6">
        <div>
          <h3 className="font-display font-extrabold text-2xl text-stone-900 dark:text-stone-100">
            ¿Cómo funciona EcoHuellitas Norte?
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Un circuito participativo de convivencia vecinal y fiscalización municipal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-stone-50 dark:bg-slate-800/80 border border-stone-200 dark:border-slate-700 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-coral-100 text-coral-700 dark:bg-coral-950 dark:text-coral-300 flex items-center justify-center font-bold text-lg">
              1
            </div>
            <h4 className="font-bold text-stone-900 dark:text-stone-100 text-base">Reporte con Foto y GPS</h4>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Tomas una fotografía al foco de suciedad (heces no recogidas u orina en fachada) y envías la coordenada en solo 3 clics.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-stone-50 dark:bg-slate-800/80 border border-stone-200 dark:border-slate-700 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-mint-100 text-mint-700 dark:bg-mint-950 dark:text-mint-300 flex items-center justify-center font-bold text-lg">
              2
            </div>
            <h4 className="font-bold text-stone-900 dark:text-stone-100 text-base">Atención y Cuadrillas</h4>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              El serenazgo ambiental y las cuadrillas de limpieza reciben la alerta en tiempo real en su mapa de patrullaje para intervenir.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-stone-50 dark:bg-slate-800/80 border border-stone-200 dark:border-slate-700 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 flex items-center justify-center font-bold text-lg">
              3
            </div>
            <h4 className="font-bold text-stone-900 dark:text-stone-100 text-base">Padrón Canino y QR</h4>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Los inspectores verifican la vacuna antirrábica y tenencia responsable escaneando el código QR del collar.
            </p>
          </div>
        </div>
      </div>

      {/* Showcase of Registered Pets */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-extrabold text-2xl text-stone-900 dark:text-stone-100">
              Mascotas Ejemplares en el Padrón
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              Carnés digitales oficiales emitidos en Lima Norte.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('/pets')}>
            Ver Todo el Padrón <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {samplePets.map((pet) => (
            <PetCredentialCard
              key={pet.id}
              pet={pet}
              onShowQR={(p) => setSelectedPetQR(p)}
              showActions={false}
            />
          ))}
        </div>
      </div>

      {/* QR Modal Preview */}
      <Modal
        isOpen={!!selectedPetQR}
        onClose={() => setSelectedPetQR(null)}
        title={`Carné Oficial: ${selectedPetQR?.name}`}
        maxWidth="max-w-sm"
      >
        {selectedPetQR && (
          <div className="text-center space-y-4">
            <div className="p-4 bg-white rounded-3xl border-4 border-mint-500 inline-block shadow-md">
              <img
                src={selectedPetQR.qrCodeUrl}
                alt="QR Code"
                className="w-48 h-48 mx-auto object-contain rounded-xl"
              />
            </div>
            <div className="font-mono text-xs font-bold text-stone-800 dark:text-stone-200">
              {selectedPetQR.registrationCode}
            </div>
            <p className="text-xs text-stone-500">
              Código QR oficial para placa de collar o lectura por inspectores de serenazgo.
            </p>
            <Button
              variant="primary"
              className="w-full"
              onClick={() => {
                alert(`Imprimiendo carné digital de ${selectedPetQR.name}...`);
                setSelectedPetQR(null);
              }}
            >
              Descargar / Imprimir Carné
            </Button>
          </div>
        )}
      </Modal>

    </div>
  );
}
