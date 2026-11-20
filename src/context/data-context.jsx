import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import confetti from 'canvas-confetti';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [pets, setPets] = useState([]);
  const [reports, setReports] = useState([]);
  const [cleanPoints, setCleanPoints] = useState([]);
  const [stats, setStats] = useState(null);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState([]);
  const [commandOpen, setCommandOpen] = useState(false);

  // Carga reactiva de datos
  const refreshData = useCallback(async () => {
    try {
      const [allPets, allReports, allCleanPoints, allStats, logs] = await Promise.all([
        api.getPets(),
        api.getReports(),
        api.getCleanPoints(),
        api.getDashboardStats(),
        api.getAuditLogs()
      ]);
      setPets(allPets);
      setReports(allReports);
      setCleanPoints(allCleanPoints);
      setStats(allStats);
      setAuditLogs(logs);
    } catch (err) {
      console.error('Error al cargar datos globales:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Sistema de Notificaciones Toasts con Soporte para Deshacer
  const addToast = useCallback((toast) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    const newToast = {
      id,
      type: toast.type || 'info', // 'success', 'error', 'warning', 'info'
      title: toast.title || 'Notificación',
      message: toast.message || '',
      duration: toast.duration || 4500,
      undoAction: toast.undoAction || null,
      undoLabel: toast.undoLabel || 'Deshacer'
    };

    setToasts(prev => [...prev, newToast]);

    if (newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Microinteracción de confeti para acciones de éxito
  const triggerConfetti = useCallback(() => {
    try {
      confetti({
        particleCount: 50,
        spread: 65,
        origin: { y: 0.8 },
        colors: ['#10B981', '#F43F5E', '#F59E0B', '#3B82F6']
      });
    } catch (e) {
      // Ignorar si canvas no está disponible
    }
  }, []);

  // CRUD Mascotas
  const createPet = async (petData) => {
    const newPet = await api.createPet(petData);
    setPets(prev => [newPet, ...prev]);
    triggerConfetti();
    addToast({
      type: 'success',
      title: '¡Mascota empadronada!',
      message: `${newPet.name} ahora cuenta con carné digital oficial (${newPet.registrationCode}).`
    });
    refreshData();
    return newPet;
  };

  const updatePet = async (id, patchData) => {
    const updated = await api.updatePet(id, patchData);
    setPets(prev => prev.map(p => (p.id === id ? updated : p)));
    addToast({
      type: 'success',
      title: 'Carné actualizado',
      message: `Los datos de ${updated.name} han sido guardados.`
    });
    refreshData();
    return updated;
  };

  const deletePet = async (id) => {
    const petToDelete = pets.find(p => p.id === id);
    await api.deletePet(id);
    setPets(prev => prev.filter(p => p.id !== id));
    
    addToast({
      type: 'warning',
      title: 'Mascota eliminada del padrón',
      message: `Se dio de baja a ${petToDelete?.name || 'la mascota'}.`,
      undoAction: async () => {
        if (petToDelete) {
          await api.createPet(petToDelete);
          refreshData();
          addToast({ type: 'info', title: 'Restaurado', message: `${petToDelete.name} fue reintegrado.` });
        }
      }
    });
    refreshData();
  };

  // CRUD Reportes
  const createReport = async (reportData) => {
    const newReport = await api.createReport(reportData);
    setReports(prev => [newReport, ...prev]);
    triggerConfetti();
    addToast({
      type: 'success',
      title: '¡Reporte ciudadano enviado!',
      message: `Se generó la alerta #${newReport.id} para fiscalización en ${newReport.district}.`
    });
    refreshData();
    return newReport;
  };

  const updateReportStatus = async (reportId, status, user, comment) => {
    const previous = reports.find(r => r.id === reportId);
    const updated = await api.updateReportStatus(reportId, status, user, comment);
    setReports(prev => prev.map(r => (r.id === reportId ? updated : r)));

    if (status === 'resolved') {
      triggerConfetti();
    }

    addToast({
      type: 'success',
      title: 'Estado actualizado',
      message: `Reporte #${reportId} actualizado a "${status}".`,
      undoAction: previous ? async () => {
        await api.updateReportStatus(reportId, previous.status, user, 'Acción deshecha por usuario.');
        refreshData();
      } : null
    });
    refreshData();
    return updated;
  };

  const assignReportInspector = async (reportId, inspectorId, inspectorName, user) => {
    const updated = await api.assignReportInspector(reportId, inspectorId, inspectorName, user);
    setReports(prev => prev.map(r => (r.id === reportId ? updated : r)));
    addToast({
      type: 'info',
      title: 'Inspector asignado',
      message: `El reporte #${reportId} fue asignado a ${inspectorName}.`
    });
    refreshData();
    return updated;
  };

  const addReportComment = async (reportId, user, comment) => {
    const updated = await api.addReportComment(reportId, user, comment);
    setReports(prev => prev.map(r => (r.id === reportId ? updated : r)));
    addToast({
      type: 'info',
      title: 'Comentario añadido',
      message: 'Se agregó una nota al historial de fiscalización.'
    });
    refreshData();
    return updated;
  };

  const deleteReport = async (reportId, user) => {
    const prev = reports.find(r => r.id === reportId);
    await api.deleteReport(reportId, user);
    setReports(prev => prev.filter(r => r.id !== reportId));
    addToast({
      type: 'warning',
      title: 'Reporte eliminado',
      message: `El reporte #${reportId} ha sido removido.`,
      undoAction: prev ? async () => {
        await api.createReport(prev);
        refreshData();
      } : null
    });
    refreshData();
  };

  const bulkUpdateReports = async (reportIds, patchData, user) => {
    const result = await api.bulkUpdateReports(reportIds, patchData, user);
    refreshData();
    addToast({
      type: 'success',
      title: 'Acción masiva completada',
      message: `Se actualizaron ${result.updatedCount} reportes exitosamente.`
    });
    return result;
  };

  const exportCSV = async (district = 'all') => {
    const res = await api.exportReportsCSV(district);
    addToast({
      type: 'success',
      title: 'Descarga iniciada',
      message: `Se exportaron ${res.count} registros a formato CSV.`
    });
  };

  const value = {
    pets,
    reports,
    cleanPoints,
    stats,
    auditLogs,
    loading,
    toasts,
    commandOpen,
    setCommandOpen,
    addToast,
    removeToast,
    triggerConfetti,
    refreshData,
    createPet,
    updatePet,
    deletePet,
    createReport,
    updateReportStatus,
    assignReportInspector,
    addReportComment,
    deleteReport,
    bulkUpdateReports,
    exportCSV,
    calculateFine: api.calculateFine
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData debe usarse dentro de DataProvider');
  return context;
}
