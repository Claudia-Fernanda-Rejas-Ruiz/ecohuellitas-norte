import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from '../pages/landing-page';
import { OnboardingPage } from '../pages/onboarding-page';
import { CitizenHomePage } from '../pages/citizen-home-page';
import { PetRegisterPage } from '../pages/pet-register-page';
import { ReportWizardPage } from '../pages/report-wizard-page';
import { MapPage } from '../pages/map-page';
import { DashboardPage } from '../pages/dashboard-page';
import { ReportDetailPage } from '../pages/report-detail-page';
import { NotFoundPage } from '../pages/not-found-page';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/pets" element={<CitizenHomePage />} />
      <Route path="/pets/new" element={<PetRegisterPage />} />
      <Route path="/report" element={<ReportWizardPage />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/reports/:id" element={<ReportDetailPage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
