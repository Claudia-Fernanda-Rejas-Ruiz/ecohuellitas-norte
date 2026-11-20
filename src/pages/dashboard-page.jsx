import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  Download,
  Filter,
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  UserCheck,
  Calculator,
  RefreshCw,
  FileSpreadsheet,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Shield,
  FileText
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';
import { useAuth } from '../context/auth-context';
import { useData } from '../context/data-context';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardBody } from '../components/ui/card';
import { StatCard } from '../components/ui/stat';
import { StatusBadge, IncidentBadge, DistrictBadge } from '../components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/table';
import { FilterChip } from '../components/ui/chip';
import { Modal } from '../components/ui/modal';

export function DashboardPage() {
  const { user } = useAuth();
  const {
    reports,
    pets,
    cleanPoints,
    stats,
    updateReportStatus,
    bulkUpdateReports,
    exportCSV,
    calculateFine
  } = useData();
  const navigate = useNavigate();

  const [districtFilter, setDistrictFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReportIds, setSelectedReportIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Modal Calculadora de Sanciones
  const [calcDistrict, setCalcDistrict] = useState('Los Olivos');
  const [calcRepeat, setCalcRepeat] = useState(false);
  const [calcType, setCalcType] = useState('heces_sin_recoger');
  const [isCalcModalOpen, setIsCalcModalOpen] = useState(false);

  // Filtrado reactivo de reportes
  const filteredReports = reports.filter((r) => {
    if (districtFilter !== 'all' && r.district !== districtFilter) return false;
    if (statusFilter !== 'all' && r.status !== statusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        r.title.toLowerCase().includes(q) ||
        r.address.toLowerCase().includes(q) ||
        r.citizenName.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Paginación
  const totalPages = Math.ceil(filteredReports.length / pageSize) || 1;
  const paginatedReports = filteredReports.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Manejo de Selección Múltiple
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedReportIds(paginatedReports.map((r) => r.id));
    } else {
      setSelectedReportIds([]);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedReportIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleBulkStatusChange = async (newStatus) => {
    if (selectedReportIds.length === 0) return;
    await bulkUpdateReports(selectedReportIds, { status: newStatus }, user);
    setSelectedReportIds([]);
  };

  // Datos para gráficos Recharts con paleta institucional sobria
  const pieData = [
    { name: 'Heces sin recoger', value: stats?.byType?.heces_sin_recoger || 18, color: '#E11D48' },
    { name: 'Orina en fachada', value: stats?.byType?.orina_fachada || 12, color: '#D97706' },
    { name: 'Mascota suelta', value: stats?.byType?.mascota_suelta || 8, color: '#2563EB' },
    { name: 'Riesgo o maltrato', value: stats?.byType?.maltrato || 3, color: '#7C3AED' }
  ];

  const monthlyTrendData = stats?.monthlyTrend || [
    { month: 'Sep', reports: 18, resolved: 14 },
    { month: 'Oct', reports: 24, resolved: 19 },
    { month: 'Nov', reports: 31, resolved: 25 },
    { month: 'Dic', reports: 28, resolved: 24 },
    { month: 'Ene', reports: 36, resolved: 30 },
    { month: 'Feb', reports: 41, resolved: 32 }
  ];

  const currentFine = calculateFine(calcDistrict, calcRepeat, calcType);

  return (
    <div className="space-y-8 text-left">
      
      {/* Encabezado Principal Sobrio y Profesional */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-stone-200 dark:border-slate-800">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-stone-900 dark:text-stone-100 tracking-tight">
            Panel de Fiscalización y Salubridad Municipal
          </h1>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
            Control de cuadrillas, seguimiento de reportes ciudadanos e indicadores de salubridad en Lima Norte.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Calculator className="w-4 h-4 text-stone-600 dark:text-stone-300" />}
            onClick={() => setIsCalcModalOpen(true)}
          >
            Calculadora de Sanciones
          </Button>

          <Button
            variant="primary"
            size="sm"
            leftIcon={<Download className="w-4 h-4" />}
            onClick={() => exportCSV(districtFilter)}
          >
            Exportar Reportes (CSV)
          </Button>
        </div>
      </div>

      {/* Tarjetas KPI Sobrias */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Focos Totales"
          value={stats?.kpis?.totalReports || 41}
          subvalue="En los 4 distritos"
          trend={{ value: '+14%', isPositive: true }}
          icon={AlertTriangle}
          color="coral"
        />
        <StatCard
          title="Pendientes"
          value={stats?.kpis?.pending || 9}
          subvalue="Por atender en campo"
          icon={Clock}
          color="amber"
        />
        <StatCard
          title="Focos Atendidos"
          value={stats?.kpis?.resolved || 30}
          subvalue={`${stats?.kpis?.resolutionRate || 75}% de efectividad`}
          trend={{ value: '+18%', isPositive: true }}
          icon={CheckCircle2}
          color="mint"
        />
        <StatCard
          title="Padrón de Mascotas"
          value={stats?.kpis?.totalPets || 15}
          subvalue="Con Carné QR Oficial"
          icon={UserCheck}
          color="sky"
        />
      </div>

      {/* Gráficos de Analítica */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Tendencia Mensual */}
        <Card className="lg:col-span-7 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-stone-900 dark:text-stone-100 text-sm">
              Evolución Mensual: Reportes vs. Resoluciones
            </h3>
            <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
              Semestre 2025 - 2026
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrendData}>
                <defs>
                  <linearGradient id="colorRep" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E11D48" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#E11D48" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorRes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Area type="monotone" dataKey="reports" name="Focos Reportados" stroke="#E11D48" strokeWidth={2} fillOpacity={1} fill="url(#colorRep)" />
                <Area type="monotone" dataKey="resolved" name="Focos Resueltos" stroke="#059669" strokeWidth={2} fillOpacity={1} fill="url(#colorRes)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Distribución por Categoría */}
        <Card className="lg:col-span-5 p-6 space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-stone-900 dark:text-stone-100 text-sm">
              Distribución por Tipo de Foco
            </h3>
            <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
              Categorías
            </span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconSize={8} wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

      </div>

      {/* Ranking Comparativo Interdistrital de Salubridad (EHN-34 / US23) */}
      <Card className="p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 dark:border-slate-800 pb-3">
          <div>
            <h3 className="font-display font-bold text-stone-900 dark:text-stone-100 text-sm sm:text-base flex items-center gap-2">
              <Shield className="w-4 h-4 text-mint-600" /> Ranking de Salubridad y Eficiencia Municipal (Lima Norte)
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Desempeño acumulado de atención de focos de insalubridad y fiscalización por distrito.
            </p>
          </div>
          <span className="text-[11px] font-mono text-stone-500 bg-stone-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
            Actualizado en tiempo real
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { district: 'Los Olivos', rank: '#1', rate: '82%', resolved: '18/22 focos', score: '9.4/10', color: 'border-mint-500 bg-mint-50/50 dark:bg-mint-950/20' },
            { district: 'Comas', rank: '#2', rate: '78%', resolved: '14/18 focos', score: '8.8/10', color: 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20' },
            { district: 'San Martín de Porres', rank: '#3', rate: '75%', resolved: '12/16 focos', score: '8.2/10', color: 'border-sky-500 bg-sky-50/50 dark:bg-sky-950/20' },
            { district: 'Independencia', rank: '#4', rate: '71%', resolved: '8/11 focos', score: '7.9/10', color: 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20' }
          ].map((item) => (
            <div key={item.district} className={`p-4 rounded-2xl border ${item.color} text-left space-y-2`}>
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-stone-900 dark:text-stone-100">{item.district}</span>
                <span className="font-mono text-xs font-bold text-mint-700 dark:text-mint-400 bg-white dark:bg-slate-800 px-2 py-0.5 rounded-full border border-stone-200 dark:border-slate-700">
                  {item.rank}
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xl font-display font-black text-stone-900 dark:text-stone-100">{item.rate}</span>
                <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">{item.resolved}</span>
              </div>
              <div className="text-[11px] text-stone-500 dark:text-stone-400 border-t border-stone-200/60 dark:border-slate-800 pt-1.5 flex justify-between">
                <span>Índice Salubridad:</span>
                <strong className="text-stone-800 dark:text-stone-200">{item.score}</strong>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Tabla Central de Gestión */}
      <Card className="p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-display font-bold text-stone-900 dark:text-stone-100 text-base">
              Bandeja Central de Fiscalización ({filteredReports.length})
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              Administración de cuadrillas, asignaciones y actualización de estados.
            </p>
          </div>

          {/* Acciones Masivas */}
          {selectedReportIds.length > 0 && (
            <div className="flex items-center gap-2 bg-stone-100 dark:bg-slate-800 p-1.5 px-3 rounded-2xl border border-stone-200 dark:border-slate-700">
              <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                {selectedReportIds.length} seleccionados:
              </span>
              <button
                type="button"
                onClick={() => handleBulkStatusChange('in_progress')}
                className="text-xs font-semibold bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 px-2.5 py-1 rounded-lg border border-purple-200 dark:border-purple-800"
              >
                A En Atención
              </button>
              <button
                type="button"
                onClick={() => handleBulkStatusChange('resolved')}
                className="text-xs font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800"
              >
                Marcar Resuelto
              </button>
            </div>
          )}
        </div>

        {/* Filtros de la Tabla */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-100 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            <FilterChip
              label="Todos"
              active={districtFilter === 'all'}
              onClick={() => { setDistrictFilter('all'); setCurrentPage(1); }}
            />
            <FilterChip
              label="Los Olivos"
              active={districtFilter === 'Los Olivos'}
              onClick={() => { setDistrictFilter('Los Olivos'); setCurrentPage(1); }}
            />
            <FilterChip
              label="Comas"
              active={districtFilter === 'Comas'}
              onClick={() => { setDistrictFilter('Comas'); setCurrentPage(1); }}
            />
            <FilterChip
              label="San Martín de Porres"
              active={districtFilter === 'San Martín de Porres'}
              onClick={() => { setDistrictFilter('San Martín de Porres'); setCurrentPage(1); }}
            />
            <FilterChip
              label="Independencia"
              active={districtFilter === 'Independencia'}
              onClick={() => { setDistrictFilter('Independencia'); setCurrentPage(1); }}
            />
          </div>

          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              placeholder="Buscar reporte, dirección..."
              className="w-full pl-9 pr-3 py-2 rounded-2xl bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-mint-500"
            />
          </div>
        </div>

        {/* Tabla */}
        <Table>
          <TableHeader>
            <tr>
              <TableHead className="w-10">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={paginatedReports.length > 0 && selectedReportIds.length === paginatedReports.length}
                  className="rounded text-mint-600"
                />
              </TableHead>
              <TableHead>Código</TableHead>
              <TableHead>Incidente</TableHead>
              <TableHead>Distrito y Dirección</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Inspector Asignado</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead className="text-right">Acción</TableHead>
            </tr>
          </TableHeader>
          <TableBody>
            {paginatedReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedReportIds.includes(report.id)}
                    onChange={() => handleSelectOne(report.id)}
                    className="rounded text-mint-600"
                  />
                </TableCell>
                <TableCell className="font-mono text-stone-500 dark:text-stone-400 font-semibold">
                  #{report.id}
                </TableCell>
                <TableCell>
                  <div className="space-y-0.5">
                    <span className="font-semibold text-stone-900 dark:text-stone-100 block">
                      {report.title}
                    </span>
                    <IncidentBadge type={report.incidentType} size="xs" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-0.5">
                    <DistrictBadge district={report.district} />
                    <span className="text-xs text-stone-500 dark:text-stone-400 block truncate max-w-[200px]">
                      {report.address}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <StatusBadge status={report.status} />
                </TableCell>
                <TableCell>
                  <span className="text-xs text-stone-700 dark:text-stone-300 font-medium">
                    {report.assignedInspectorName || 'Sin asignar'}
                  </span>
                </TableCell>
                <TableCell className="text-stone-500 dark:text-stone-400 font-mono text-xs">
                  {new Date(report.createdAt).toLocaleDateString('es-PE')}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/reports/${report.id}`)}
                  >
                    Ver Ficha
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Paginación */}
        <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 pt-2 border-t border-stone-100 dark:border-slate-800">
          <span>
            Mostrando página <strong>{currentPage}</strong> de <strong>{totalPages}</strong> ({filteredReports.length} reportes)
          </span>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              leftIcon={<ChevronLeft className="w-4 h-4" />}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              rightIcon={<ChevronRight className="w-4 h-4" />}
            >
              Siguiente
            </Button>
          </div>
        </div>

      </Card>

      {/* Modal Calculadora de Sanciones Administrativas */}
      <Modal
        isOpen={isCalcModalOpen}
        onClose={() => setIsCalcModalOpen(false)}
        title="Calculadora de Sanciones Administrativas"
        subtitle="Determinación de multas según ordenanza distrital (UIT 2026: S/ 5,350.00)"
        maxWidth="max-w-lg"
      >
        <div className="space-y-4 text-left">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                Distrito
              </label>
              <select
                value={calcDistrict}
                onChange={(e) => setCalcDistrict(e.target.value)}
                className="w-full text-xs p-2.5 rounded-2xl bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-stone-900 dark:text-stone-100"
              >
                <option value="Los Olivos">Los Olivos</option>
                <option value="Comas">Comas</option>
                <option value="San Martín de Porres">San Martín de Porres</option>
                <option value="Independencia">Independencia</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                Tipo de Infracción
              </label>
              <select
                value={calcType}
                onChange={(e) => setCalcType(e.target.value)}
                className="w-full text-xs p-2.5 rounded-2xl bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-stone-900 dark:text-stone-100"
              >
                <option value="heces_sin_recoger">Heces sin recoger</option>
                <option value="orina_fachada">Orina en fachada</option>
                <option value="mascota_suelta">Paseo sin correa/bozal</option>
              </select>
            </div>
          </div>

          <label className="flex items-center gap-2 p-3 rounded-2xl bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 cursor-pointer text-xs font-semibold">
            <input
              type="checkbox"
              checked={calcRepeat}
              onChange={(e) => setCalcRepeat(e.target.checked)}
              className="w-4 h-4 text-mint-600 rounded"
            />
            <span>¿Es infractor reincidente? (Aplica porcentaje agravado)</span>
          </label>

          {/* Resultado de la Sanción */}
          <div className="p-5 rounded-2xl bg-stone-900 text-white space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-stone-300 font-bold uppercase tracking-wider">Monto de la Sanción:</span>
              <span className="font-mono text-xl font-bold text-emerald-400">
                {currentFine.formattedAmount}
              </span>
            </div>
            <div className="text-xs text-stone-300">
              {currentFine.finePercentage}% de la UIT ({currentFine.description})
            </div>
            <div className="pt-2 border-t border-stone-800 text-xs text-stone-400 font-mono">
              Base Legal: {currentFine.ordinanceNumber}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button variant="primary" size="sm" onClick={() => setIsCalcModalOpen(false)}>
              Cerrar
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
