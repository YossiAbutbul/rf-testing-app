import React, { createContext, useState, useContext } from 'react';

// Create context
export const AppContext = createContext(null);

// Custom hook for using AppContext
export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  // Sidebar state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Toggle sidebar collapsed state
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Value to be provided by context
  const value = {
    sidebarCollapsed,
    toggleSidebar,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};