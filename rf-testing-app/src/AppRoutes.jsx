import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout'; // Make sure this path is correct

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
        <Route path="/devices" element={<SimplePage title="Devices" />} />
        <Route path="/configurations" element={<SimplePage title="Configurations" />} />
        <Route path="/test-matrix" element={<SimplePage title="Test Matrix" />} />
        <Route path="/test-sequences" element={<SimplePage title="Test Sequences" />} />
        <Route path="/spectrum-view" element={<SimplePage title="Spectrum View" />} />
        <Route path="/reports" element={<SimplePage title="Reports" />} />
        <Route path="/compliance" element={<SimplePage title="Compliance Reference" />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;