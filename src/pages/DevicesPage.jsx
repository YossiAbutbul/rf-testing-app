import React, { useState, useEffect, useRef } from 'react';
import '../styles/pages/devices.css';

const DevicesPage = () => {
  const [activeTab, setActiveTab] = useState('available');
  const [devices, setDevices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedProjects, setExpandedProjects] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  
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

  // Auto-expand projects when searching
  useEffect(() => {
    if (searchTerm && activeTab === 'projects') {
      // If we're searching and in projects tab, expand all projects
      const expandedState = {};
      
      // For each project, check if it or any of its devices match the search
      projects.forEach(project => {
        const normalizedSearchTerm = searchTerm.toLowerCase();
        
        // Check if project name matches
        if (project.name.toLowerCase().includes(normalizedSearchTerm)) {
          expandedState[project.id] = true;
          return;
        }
        
        // Check if any device matches
        const deviceMatches = project.devices.some(device => 
          device.name.toLowerCase().includes(normalizedSearchTerm) || 
          device.id.toLowerCase().includes(normalizedSearchTerm)
        );
        
        if (deviceMatches) {
          expandedState[project.id] = true;
        }
      });
      
      // Update expanded state
      setExpandedProjects(prev => ({
        ...prev,
        ...expandedState
      }));
    }
  }, [searchTerm, activeTab, projects]);

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
  
  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Filter devices based on search term
  const getFilteredDevices = () => {
    if (!searchTerm) return devices;
    
    const normalizedSearchTerm = searchTerm.toLowerCase();
    
    return devices.filter(device => 
      device.name.toLowerCase().includes(normalizedSearchTerm) || 
      device.id.toLowerCase().includes(normalizedSearchTerm)
    );
  };
  
  // Filter projects based on search term
  const getFilteredProjects = () => {
    if (!searchTerm) return projects;
    
    const normalizedSearchTerm = searchTerm.toLowerCase();
    
    return projects.filter(project => {
      // Check if project name matches
      if (project.name.toLowerCase().includes(normalizedSearchTerm)) {
        return true;
      }
      
      // Check if any device in the project matches
      const hasMatchingDevice = project.devices.some(device => 
        device.name.toLowerCase().includes(normalizedSearchTerm) || 
        device.id.toLowerCase().includes(normalizedSearchTerm)
      );
      
      return hasMatchingDevice;
    });
  };
  
  // Get filtered versions of devices and projects based on search
  const filteredDevices = getFilteredDevices();
  const filteredProjects = getFilteredProjects();
  
  // Clear search input and close all projects
  const clearSearch = () => {
    setSearchTerm('');
    // Close all projects when search is cleared
    setExpandedProjects({});
  };
  
  // Helper function to highlight matching text in search results
  const highlightMatch = (text, term) => {
    if (!term) return text;
    
    const normalizedText = text.toString();
    const normalizedTerm = term.toLowerCase();
    const index = normalizedText.toLowerCase().indexOf(normalizedTerm);
    
    if (index === -1) return text;
    
    const before = normalizedText.slice(0, index);
    const match = normalizedText.slice(index, index + normalizedTerm.length);
    const after = normalizedText.slice(index + normalizedTerm.length);
    
    return (
      <>
        {before}
        <span className="highlight">{match}</span>
        {after}
      </>
    );
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
            placeholder="Search by device name or MAC address..." 
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm ? (
            <i className="bx bx-x search-clear" onClick={clearSearch}></i>
          ) : (
            <i className="bx bx-search search-icon"></i>
          )}
        </div>
        {/* <button className="btn btn-secondary filter-button">
          <i className="bx bx-filter"></i>
        </button> */}
      </div>
      
      {activeTab === 'available' && (
        <div className="devices-list">
          {filteredDevices.length === 0 ? (
            <div className="no-results">
              <i className="bx bx-search-alt no-results-icon"></i>
              <p>No devices found matching "{searchTerm}"</p>
              <button className="btn btn-secondary" onClick={clearSearch}>
                Clear Search
              </button>
            </div>
          ) : (
            filteredDevices.map((device, index) => (
              <div key={index} className="device-card">
                <div className="device-icon">
                  <i className="bx bx-bluetooth"></i>
                </div>
                <div className="device-info">
                  <div className="device-name">
                    {searchTerm ? highlightMatch(device.name, searchTerm) : device.name}
                  </div>
                  <div className="device-id">
                    {searchTerm ? highlightMatch(device.id, searchTerm) : device.id}
                  </div>
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
            ))
          )}
        </div>
      )}

      {activeTab === 'projects' && (
        <div className="devices-list">
          {filteredProjects.length === 0 ? (
            <div className="no-results">
              <i className="bx bx-search-alt no-results-icon"></i>
              <p>No projects found matching "{searchTerm}"</p>
              <button className="btn btn-secondary" onClick={clearSearch}>
                Clear Search
              </button>
            </div>
          ) : (
            filteredProjects.map((project) => {
              // Determine if any devices in this project match the search
              const matchingDevices = searchTerm 
                ? project.devices.filter(device => 
                    device.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    device.id.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                : project.devices;
              
              return (
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
                      <div className="device-name">
                        {searchTerm ? highlightMatch(project.name, searchTerm) : project.name}
                      </div>
                      <div className="device-id">
                        {project.devices.length} Devices
                        {searchTerm && matchingDevices.length > 0 && matchingDevices.length < project.devices.length && 
                          ` (${matchingDevices.length} match${matchingDevices.length === 1 ? '' : 'es'})`
                        }
                      </div>
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
                  
                  {expandedProjects[project.id] && project.devices.map((device, index) => {
                    // Skip devices that don't match search criteria
                    if (searchTerm) {
                      const normalizedSearchTerm = searchTerm.toLowerCase();
                      const deviceMatches = 
                        device.name.toLowerCase().includes(normalizedSearchTerm) || 
                        device.id.toLowerCase().includes(normalizedSearchTerm);
                      
                      if (!deviceMatches && !project.name.toLowerCase().includes(normalizedSearchTerm)) {
                        return null;
                      }
                    }
                    
                    return (
                      <div 
                        key={index} 
                        className="device-card expanded-device" 
                        style={{marginLeft: '40px', width: 'calc(100% - 40px)'}}
                      >
                        <div className="device-icon">
                          <i className="bx bx-bluetooth"></i>
                        </div>
                        <div className="device-info">
                          <div className="device-name">
                            {searchTerm ? highlightMatch(device.name, searchTerm) : device.name}
                          </div>
                          <div className="device-id">
                            {searchTerm ? highlightMatch(device.id, searchTerm) : device.id}
                          </div>
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
                    );
                  })}
                </React.Fragment>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default DevicesPage;