import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout'; 
import DevicesPage from './pages/DevicesPage';
import ConfigurationsPage from './pages/ConfigurationsPage';
import TestMatrixPage from './pages/TestMatrixPage';
import TestSequencesPage from './pages/TestSequencesPage';
import SpectrumViewPage from './pages/SpectrumViewPage';
import ReportsPage from './pages/ReportsPage';
// import ComplianceReferencePage from './pages/ComplianceReferencePage';


// Placeholder pages
const SimplePage = ({ title }) => (
  <div style={{ padding: '20px' }}>
    <h1>{title}</h1>
    <p>This is a placeholder for the {title} page</p>
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<SimplePage title="Home" />} />
        <Route path="/devices" element={<DevicesPage />} />
        <Route path="/configurations" element={<ConfigurationsPage />} />
        <Route path="/test-matrix" element={<TestMatrixPage />} />
        <Route path="/test-sequences" element={<TestSequencesPage />} />
        <Route path="/spectrum-view" element={<SpectrumViewPage/>} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/compliance" element={<SimplePage title="Compliance Reference" />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;