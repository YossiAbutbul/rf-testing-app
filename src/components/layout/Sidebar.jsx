import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/components/sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  
  // Navigation items
  const navItems = [
    { path: '/devices', icon: 'bx bx-bluetooth', text: 'Devices' },
    { path: '/configurations', icon: 'bx bx-cog', text: 'Configurations' },
    { path: '/test-matrix', icon: 'bx bx-table', text: 'Test Matrix' },
    { path: '/test-sequences', icon: 'bx bx-list-ul', text: 'Test Sequences' },
    { path: '/spectrum-view', icon: 'bx bx-line-chart', text: 'Spectrum View' },
    { path: '/reports', icon: 'bx bx-file', text: 'Reports' }
  ];

  return (
    <div className="sidebar">
      <div className="app-title">RF Test App</div>
      
      <nav className="sidebar-nav">
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="nav-icon">
              <i className={item.icon}></i>
            </span>
            <span className="nav-text">{item.text}</span>
          </Link>
        ))}
      </nav>
      
      {/* Compliance Reference as a link */}
      <Link to="/compliance" className="sidebar-footer">
        <i className="bx bx-info-circle"></i>
        <span className="footer-text">Compliance Reference</span>
      </Link>
    </div>
  );
};

export default Sidebar;