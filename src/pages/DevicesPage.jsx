import React, { useState, useEffect, useRef } from 'react';
import '../styles/pages/devices.css';

const DevicesPage = () => {
  const [activeTab, setActiveTab] = useState('available');
  const [devices, setDevices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedProjects, setExpandedProjects] = useState({});
  
  // Refs for tab indicator positioning
  const tabsRef = useRef(null);
  const availableTabRef = useRef(null);
  const projectsTabRef = useRef(null);
  
  // State for tab indicator position and width
  const [tabIndicator, setTabIndicator] = useState({
    left: 0,
    width: 0
  });

  // Position the tab indicator whenever the active tab changes
  useEffect(() => {
    updateTabIndicator(activeTab);
  }, [activeTab]);
  
  // Update tab indicator position and width based on active tab
  const updateTabIndicator = (tab) => {
    const currentTabRef = tab === 'available' ? availableTabRef.current : projectsTabRef.current;
    
    if (currentTabRef && tabsRef.current) {
      const tabRect = currentTabRef.getBoundingClientRect();
      const tabsRect = tabsRef.current.getBoundingClientRect();
      
      setTabIndicator({
        left: tabRect.left - tabsRect.left,
        width: tabRect.width
      });
    }
  };
  
  // Also update the tab indicator on window resize
  useEffect(() => {
    const handleResize = () => {
      updateTabIndicator(activeTab);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeTab]);
  
  // Initially position the tab indicator after component mounts
  useEffect(() => {
    // Short delay to ensure refs are properly set
    const timer = setTimeout(() => {
      updateTabIndicator(activeTab);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Simulated device data with unique MAC addresses
  useEffect(() => {
    // This would be replaced with actual API calls in production
    const mockDevices = [
      {
        id: '00:11:22:33:44:55',
        name: 'Sonata LoRa 2 IL',
        status: 'connected'
      },
      {
        id: '66:77:88:99:AA:BB',
        name: 'Sonata LoRa 2 IL',
        status: 'disconnected'
      },
      {
        id: 'CC:DD:EE:FF:00:11',
        name: 'Sonata LoRa 2 US',
        status: 'disconnected'
      },
      {
        id: '22:33:44:55:66:77',
        name: 'CAT-M Gen. 2',
        status: 'disconnected'
      },
      {
        id: '88:99:AA:BB:CC:DD',
        name: 'CAT-M Gen. 2',
        status: 'disconnected'
      }
    ];
    
    const mockProjects = [
      {
        id: 1,
        name: 'Sonata LoRa Project',
        devices: [
          { id: '00:11:22:33:44:55', name: 'Sonata LoRa 2 IL', status: 'connected' },
          { id: 'B5:6F:71:C3:D4:E5', name: 'Sonata LoRa 2 IL', status: 'disconnected' }
        ]
      },
      {
        id: 2,
        name: 'CAT-M Project',
        devices: [
          { id: 'C6:7G:82:D4:E5:F6', name: 'CAT-M Gen. 2', status: 'disconnected' },
          { id: 'D7:8H:93:E5:F6:G7', name: 'CAT-M Gen. 2', status: 'disconnected' }
        ]
      }
    ];
    
    setDevices(mockDevices);
    setProjects(mockProjects);
  }, []);

  const scanForDevices = () => {
    setLoading(true);
    
    // Simulate scanning delay
    setTimeout(() => {
      setLoading(false);
      // In a real app, this would update with newly discovered devices
    }, 2000);
  };

  const connectToDevice = (deviceId, type = 'available') => {
    if (type === 'available') {
      // Update the status of the selected device to 'connected'
      const updatedDevices = devices.map(device => ({
        ...device,
        status: device.id === deviceId 
          ? (device.status === 'connected' ? 'disconnected' : 'connected')
          : device.status
      }));
      
      setDevices(updatedDevices);
    } else {
      // Update projects devices
      const updatedProjects = projects.map(project => ({
        ...project,
        devices: project.devices.map(device => ({
          ...device,
          status: device.id === deviceId 
            ? (device.status === 'connected' ? 'disconnected' : 'connected')
            : device.status
        }))
      }));
      
      setProjects(updatedProjects);
    }
  };

  const toggleProjectExpand = (projectId) => {
    setExpandedProjects(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  return (
    <div className="page-container">
      <div className="section-header">
        <h1>Device Management</h1>
        <button className="btn btn-primary" id='deivce-scan' onClick={scanForDevices} disabled={loading}>
          <i className="bx bx-bluetooth btn-icon"></i>
          {loading ? 'Scanning...' : 'Scan for Devices'}
        </button>
      </div>
      
      <div className="tabs" ref={tabsRef}>
        <div 
          className={`tab ${activeTab === 'available' ? 'active' : ''}`}
          onClick={() => setActiveTab('available')}
          ref={availableTabRef}
        >
          Available Devices
        </div>
        <div 
          className={`tab ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
          ref={projectsTabRef}
        >
          Projects
        </div>
        {/* Tab indicator element */}
        <div 
          className="tab-indicator" 
          style={{ 
            left: `${tabIndicator.left}px`, 
            width: `${tabIndicator.width}px` 
          }}
        />
      </div>
      
      <div className="device-search">
        <div className="search-input-container">
          <input 
            type="text" 
            className="form-input" 
            placeholder="Enter device name or MAC to search..." 
          />
          <i className="bx bx-search search-icon"></i>
        </div>
        <button className="btn btn-secondary filter-button">
          <i className="bx bx-filter"></i>
        </button>
      </div>
      
      {activeTab === 'available' && (
        <div className="devices-list">
          {devices.map((device, index) => (
            <div key={index} className="device-card">
              <div className="device-icon">
                <i className="bx bx-bluetooth"></i>
              </div>
              <div className="device-info">
                <div className="device-name">{device.name}</div>
                <div className="device-id">{device.id}</div>
              </div>
              <div className="device-actions">
                {device.status === 'connected' ? (
                  <div 
                    className="connection-status connected"
                    onClick={() => connectToDevice(device.id)}
                  >
                    Connected
                  </div>
                ) : (
                  <button 
                    className="btn btn-secondary connect-button"
                    onClick={() => connectToDevice(device.id)}
                  >
                    Connect
                  </button>
                )}
                <button className="btn btn-icon-only">
                  <i className="bx bx-plus"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'projects' && (
        <div className="devices-list">
          {projects.map((project) => (
            <React.Fragment key={project.id}>
              <div 
                className="device-card"
                data-expanded={!!expandedProjects[project.id]}
                onClick={() => toggleProjectExpand(project.id)}
              >
                <div className="device-icon">
                  <i className="bx bx-folder"></i>
                </div>
                <div className="device-info">
                  <div className="device-name">{project.name}</div>
                  <div className="device-id">{project.devices.length} Devices</div>
                </div>
                <div className="device-actions">
                  <button 
                    className="btn btn-icon-only"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleProjectExpand(project.id);
                    }}
                  >
                    <i className={`bx ${expandedProjects[project.id] ? 'bx-chevron-up' : 'bx-chevron-down'}`}></i>
                  </button>
                </div>
              </div>
              
              {expandedProjects[project.id] && project.devices.map((device, index) => (
                <div 
                  key={index} 
                  className="device-card expanded-device" 
                  style={{marginLeft: '40px', width: 'calc(100% - 40px)'}}
                >
                  <div className="device-icon">
                    <i className="bx bx-bluetooth"></i>
                  </div>
                  <div className="device-info">
                    <div className="device-name">{device.name}</div>
                    <div className="device-id">{device.id}</div>
                  </div>
                  <div className="device-actions">
                    {device.status === 'connected' ? (
                      <div 
                        className="connection-status connected"
                        onClick={(e) => {
                          e.stopPropagation();
                          connectToDevice(device.id, 'projects');
                        }}
                      >
                        Connected
                      </div>
                    ) : (
                      <button 
                        className="btn btn-secondary connect-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          connectToDevice(device.id, 'projects');
                        }}
                      >
                        Connect
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default DevicesPage;