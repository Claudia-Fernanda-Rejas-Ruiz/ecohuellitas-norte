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
  Sparkles
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

  // Calculadora Modal State
  const [calcDistrict, setCalcDistrict] = useState('Los Olivos');
  const [calcRepeat, setCalcRepeat] = useState(false);
  const [calcType, setCalcType] = useState('heces_sin_recoger');
  const [isCalcModalOpen, setIsCalcModalOpen] = useState(false);

  // Filtrado de reportes para la tabla y métricas
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

  // Datos para gráficos Recharts
  const pieData = [
    { name: 'Heces sin recoger', value: stats?.byType?.heces_sin_recoger || 18, color: '#F43F5E' },
    { name: 'Orina en fachada', value: stats?.byType?.orina_fachada || 12, color: '#F59E0B' },
    { name: 'Mascota suelta', value: stats?.byType?.mascota_suelta || 8, color: '#3B82F6' },
    { name: 'Riesgo / Maltrato', value: stats?.byType?.maltrato || 3, color: '#8B5CF6' }
  ];

  const districtBarData = [
    { name: 'Los Olivos', reportes: stats?.byDistrict?.['Los Olivos'] || 14, resueltos: 11 },
    { name: 'Comas', reportes: stats?.byDistrict?.['Comas'] || 12, resueltos: 8 },
    { name: 'SMP', reportes: stats?.byDistrict?.['San Martín de Porres'] || 10, resueltos: 7 },
    { name: 'Independencia', reportes: stats?.byDistrict?.['Independencia'] || 5, resueltos: 4 }
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
      
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-display font-black text-2xl text-stone-900 dark:text-stone-100">
              Panel de Fiscalización y Salubridad Municipal
            </h2>
            <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-300">
              UIT 2026: S/ 5,350.00
            </span>
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Control de cuadrillas, emisión de sanciones, mapa de focos e indicadores de salubridad en Lima Norte.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Calculator className="w-4 h-4 text-amber-600" />}
            onClick={() => setIsCalcModalOpen(true)}
          >
            Calculadora de Multas
          </Button>

          <Button
            variant="primary"
            size="sm"
            leftIcon={<Download className="w-4 h-4" />}
            onClick={() => exportCSV(districtFilter)}
          >
            Exportar CSV
          </Button>
        </div>
      </div>

      {/* KPI Bento Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Focos Totales"
          value={stats?.kpis?.totalReports || 41}
          subvalue="En Lima Norte"
          trend={{ value: '+14%', isPositive: true }}
          icon={AlertTriangle}
          color="coral"
        />
        <StatCard
          title="Pendientes de Atención"
          value={stats?.kpis?.pending || 9}
          subvalue="Requieren Cuadrilla"
          icon={Clock}
          color="amber"
        />
        <StatCard
          title="Focos Resueltos"
          value={stats?.kpis?.resolved || 30}
          subvalue={`${stats?.kpis?.resolutionRate || 75}% Eficiencia`}
          trend={{ value: '+18%', isPositive: true }}
          icon={CheckCircle2}
          color="mint"
        />
        <StatCard
          title="Padrón Canino"
          value={stats?.kpis?.totalPets || 15}
          subvalue="Con Carné QR Oficial"
          icon={UserCheck}
          color="sky"
        />
      </div>

      {/* Charts Bento Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Trend Area Chart */}
        <Card className="lg:col-span-7 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-stone-900 dark:text-stone-100 text-sm">
              Evolución Mensual: Reportes vs. Resoluciones
            </h3>
            <span className="text-[10px] font-bold text-mint-700 bg-mint-50 px-2.5 py-1 rounded-full border border-mint-200">
              Semestral
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrendData}>
                <defs>
                  <linearGradient id="colorRep" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#F43F5E" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorRes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="reports" name="Reportes" stroke="#F43F5E" strokeWidth={2} fillOpacity={1} fill="url(#colorRep)" />
                <Area type="monotone" dataKey="resolved" name="Resueltos" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorRes)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Type Pie Chart */}
        <Card className="lg:col-span-5 p-6 space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-stone-900 dark:text-stone-100 text-sm">
              Distribución por Tipo de Foco
            </h3>
            <span className="text-[10px] font-bold text-coral-700 bg-coral-50 px-2.5 py-1 rounded-full border border-coral-200">
              Categoría
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

      {/* Advanced Reports Management Table */}
      <Card className="p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-display font-bold text-stone-900 dark:text-stone-100 text-base">
              Bandeja Central de Fiscalización y Cuadrillas ({filteredReports.length})
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              Administra asignaciones, actualización de estados en lote e inspección de campo.
            </p>
          </div>

          {/* Bulk Actions Menu if rows are selected */}
          {selectedReportIds.length > 0 && (
            <div className="flex items-center gap-2 bg-stone-100 dark:bg-slate-800 p-1.5 px-3 rounded-2xl border border-stone-200 dark:border-slate-700">
              <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                {selectedReportIds.length} seleccionados:
              </span>
              <button
                type="button"
                onClick={() => handleBulkStatusChange('in_progress')}
                className="text-[11px] font-bold bg-purple-100 hover:bg-purple-200 text-purple-800 px-2.5 py-1 rounded-lg"
              >
                A En Atención
              </button>
              <button
                type="button"
                onClick={() => handleBulkStatusChange('resolved')}
                className="text-[11px] font-bold bg-mint-100 hover:bg-mint-200 text-mint-800 px-2.5 py-1 rounded-lg"
              >
                Marcar Resuelto
              </button>
            </div>
          )}
        </div>

        {/* Filters and Search Bar */}
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
              label="SMP"
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

        {/* The Table */}
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
              <TableHead>ID</TableHead>
              <TableHead>Tipo / Incidente</TableHead>
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
                <TableCell className="font-mono text-stone-400">#{report.id}</TableCell>
                <TableCell>
                  <div className="space-y-0.5">
                    <span className="font-bold text-stone-900 dark:text-stone-100 block">
                      {report.title}
                    </span>
                    <IncidentBadge type={report.incidentType} size="xs" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-0.5">
                    <DistrictBadge district={report.district} />
                    <span className="text-[11px] text-stone-500 block truncate max-w-[200px]">
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
                <TableCell className="text-stone-400 font-mono text-[11px]">
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

        {/* Pagination Bar */}
        <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-100 dark:border-slate-800">
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

      {/* Ordinance Calculator Modal */}
      <Modal
        isOpen={isCalcModalOpen}
        onClose={() => setIsCalcModalOpen(false)}
        title="Calculadora Oficial de Multas por Ordenanza"
        subtitle="Cálculo normativo basado en la UIT 2026 (S/ 5,350.00)"
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
                className="w-full text-xs p-2.5 rounded-2xl bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700"
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
                className="w-full text-xs p-2.5 rounded-2xl bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700"
              >
                <option value="heces_sin_recoger">Heces sin recoger</option>
                <option value="orina_fachada">Orina en fachada</option>
                <option value="mascota_suelta">Paseo sin correa/bozal</option>
              </select>
            </div>
          </div>

          <label className="flex items-center gap-2 p-3 rounded-2xl bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 cursor-pointer text-xs font-bold">
            <input
              type="checkbox"
              checked={calcRepeat}
              onChange={(e) => setCalcRepeat(e.target.checked)}
              className="w-4 h-4 text-amber-600 rounded"
            />
            <span>¿Es infractor reincidente? (Aplica porcentaje agravado)</span>
          </label>

          {/* Result Highlight */}
          <div className="p-5 rounded-2xl bg-stone-900 text-white space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-amber-400 font-bold uppercase">Sanción Económica:</span>
              <span className="font-mono text-xl font-black text-amber-300">
                {currentFine.formattedAmount}
              </span>
            </div>
            <div className="text-[11px] text-stone-400">
              {currentFine.finePercentage}% de la UIT ({currentFine.description})
            </div>
            <div className="pt-2 border-t border-stone-800 text-[10px] text-stone-400 font-mono">
              Base Legal: {currentFine.ordinanceNumber}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button variant="primary" size="sm" onClick={() => setIsCalcModalOpen(false)}>
              Cerrar Calculadora
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
