import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/components/sidebar.css';

const Sidebar = ({ collapsed, toggleSidebar }) => {
  const location = useLocation();
  const [tooltipText, setTooltipText] = useState('');
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0 });
  const tooltipRef = useRef(null);
  
  // Navigation items based on the screenshots
  const navItems = [
    { path: '/devices', icon: 'bx bx-bluetooth', text: 'Devices' },
    { path: '/configurations', icon: 'bx bx-cog', text: 'Configurations' },
    { path: '/test-matrix', icon: 'bx bx-table', text: 'Test Matrix' },
    { path: '/test-sequences', icon: 'bx bx-list-ul', text: 'Test Sequences' },
    { path: '/spectrum-view', icon: 'bx bx-line-chart', text: 'Spectrum View' },
    { path: '/reports', icon: 'bx bx-file', text: 'Reports' }
  ];

  // Handle showing tooltip on mouse enter
  const handleMouseEnter = (e, text) => {
    if (!collapsed) return;
    
    setTooltipText(text);
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      top: rect.top + rect.height / 2
    });
    
    // Small delay before showing tooltip
    setTimeout(() => setTooltipVisible(true), 200);
  };

  // Handle hiding tooltip on mouse leave
  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="app-title">RF Test App</div>
      
      <nav className="sidebar-nav">
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            onMouseEnter={(e) => handleMouseEnter(e, item.text)}
            onMouseLeave={handleMouseLeave}
          >
            <span className="nav-icon">
              <i className={item.icon}></i>
            </span>
            <span className="nav-text">{item.text}</span>
          </Link>
        ))}
      </nav>
      
      <div className="sidebar-footer">
        <span className="footer-text">Compliance Reference</span>
      </div>
      
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        <i className="bx bx-chevron-left"></i>
      </div>
      
      {collapsed && tooltipVisible && (
        <div 
          ref={tooltipRef}
          className={`tooltip ${tooltipVisible ? 'visible' : ''}`}
          style={{ top: tooltipPosition.top + 'px' }}
        >
          {tooltipText}
        </div>
      )}
    </div>
  );
};

export default Sidebar;