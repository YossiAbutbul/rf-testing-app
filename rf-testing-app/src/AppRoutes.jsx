import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Temporary simple component for testing
const SimplePage = ({ title }) => (
  <div style={{ padding: '20px' }}>
    <h1>{title}</h1>
    <p>This is a placeholder for the {title} page</p>
  </div>
);

const SimpleLayout = ({ children }) => (
  <div style={{ display: 'flex' }}>
    <div style={{ 
      width: '240px', 
      background: 'black', 
      color: 'white',
      height: '100vh',
      padding: '20px' 
    }}>
      <h2>RF Test App</h2>
      <ul style={{ listStyle: 'none', padding: 0, marginTop: '40px' }}>
        <li style={{ marginBottom: '15px' }}><a href="/devices" style={{ color: 'white', textDecoration: 'none' }}>Devices</a></li>
        <li style={{ marginBottom: '15px' }}><a href="/configurations" style={{ color: 'white', textDecoration: 'none' }}>Configurations</a></li>
        <li style={{ marginBottom: '15px' }}><a href="/test-matrix" style={{ color: 'white', textDecoration: 'none' }}>Test Matrix</a></li>
        <li style={{ marginBottom: '15px' }}><a href="/test-sequences" style={{ color: 'white', textDecoration: 'none' }}>Test Sequences</a></li>
        <li style={{ marginBottom: '15px' }}><a href="/spectrum-view" style={{ color: 'white', textDecoration: 'none' }}>Spectrum View</a></li>
        <li style={{ marginBottom: '15px' }}><a href="/reports" style={{ color: 'white', textDecoration: 'none' }}>Reports</a></li>
      </ul>
    </div>
    <div style={{ flex: 1 }}>
      {children}
    </div>
  </div>
);

const AppRoutes = () => {
  return (
    <SimpleLayout>
      <Routes>
        <Route path="/" element={<SimplePage title="Home" />} />
        <Route path="/devices" element={<SimplePage title="Devices" />} />
        <Route path="/configurations" element={<SimplePage title="Configurations" />} />
        <Route path="/test-matrix" element={<SimplePage title="Test Matrix" />} />
        <Route path="/test-sequences" element={<SimplePage title="Test Sequences" />} />
        <Route path="/spectrum-view" element={<SimplePage title="Spectrum View" />} />
        <Route path="/reports" element={<SimplePage title="Reports" />} />
      </Routes>
    </SimpleLayout>
  );
};

export default AppRoutes;