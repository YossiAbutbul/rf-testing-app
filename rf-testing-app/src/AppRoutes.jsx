import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layout
import Layout from './components/layout/Layout';

// Pages
import DevicesPage from './pages/DevicesPage';
import ConfigurationsPage from './pages/ConfigurationsPage';
import TestMatrixPage from './pages/TestMatrixPage';
import TestSequencesPage from './pages/TestSequencesPage';
import SpectrumViewPage from './pages/SpectrumViewPage';
import ReportsPage from './pages/ReportsPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/devices" replace />} />
        <Route path="devices" element={<DevicesPage />} />
        <Route path="configurations" element={<ConfigurationsPage />} />
        <Route path="test-matrix" element={<TestMatrixPage />} />
        <Route path="test-sequences" element={<TestSequencesPage />} />
        <Route path="spectrum-view" element={<SpectrumViewPage />} />
        <Route path="reports" element={<ReportsPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;