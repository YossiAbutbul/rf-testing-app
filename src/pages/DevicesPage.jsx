import React, { useState, useEffect } from 'react';
import '../styles/pages/devices.css';

const DevicesPage = () => {
  const [activeTab, setActiveTab] = useState('available');
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);

  // Simulated device data based on your screenshot
  useEffect(() => {
    // This would be replaced with actual API calls in production
    const mockDevices = [
      {
        id: '00:B0:D0:63:C2:26',
        name: 'Sonata LoRa IL',
        status: 'connected'
      },
      {
        id: '00:B0:D0:63:C2:26',
        name: 'Sonata LoRa IL',
        status: 'disconnected'
      },
      {
        id: '00:B0:D0:63:C2:26',
        name: 'Sonata LoRa IL',
        status: 'disconnected'
      },
      {
        id: '00:B0:D0:63:C2:26',
        name: 'Sonata LoRa IL',
        status: 'disconnected'
      },
      {
        id: '00:B0:D0:63:C2:26',
        name: 'Sonata LoRa IL',
        status: 'disconnected'
      }
    ];
    
    setDevices(mockDevices);
  }, []);

  const scanForDevices = () => {
    setLoading(true);
    
    // Simulate scanning delay
    setTimeout(() => {
      setLoading(false);
      // In a real app, this would update with newly discovered devices
    }, 2000);
  };

  const connectToDevice = (deviceId) => {
    // Update the status of the selected device to 'connected'
    const updatedDevices = devices.map(device => ({
      ...device,
      status: device.id === deviceId ? 'connected' : device.status
    }));
    
    setDevices(updatedDevices);
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
      
      <div className="tabs">
        <div 
          className={`tab ${activeTab === 'available' ? 'active' : ''}`}
          onClick={() => setActiveTab('available')}
        >
          Available Devices
        </div>
        <div 
          className={`tab ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          Projects
        </div>
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
                <div className="connection-status connected">Connected</div>
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
    </div>
  );
};

export default DevicesPage;