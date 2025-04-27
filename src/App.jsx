import React from 'react';
import { AppProvider } from './context/AppContext';
import { DeviceProvider } from './context/DeviceContext';
import AppRoutes from './AppRoutes';
import './styles/global.css';

function App() {
  return (
    <AppProvider>
      <DeviceProvider>
        <AppRoutes />
      </DeviceProvider>
    </AppProvider>
  );
}

export default App;