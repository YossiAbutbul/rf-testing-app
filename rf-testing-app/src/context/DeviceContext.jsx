import React, { createContext, useState, useContext } from 'react';

// Create context
export const DeviceContext = createContext(null);

// Custom hook for using DeviceContext
export const useDevice = () => useContext(DeviceContext);

export const DeviceProvider = ({ children }) => {
  // Connected device state
  const [device, setDevice] = useState({
    connected: false,
    name: 'No Device',
    id: '',
    status: 'offline' // 'online', 'offline', 'connecting'
  });

  // Value to be provided by context
  const value = {
    device,
    setDevice
  };

  return (
    <DeviceContext.Provider value={value}>
      {children}
    </DeviceContext.Provider>
  );
};