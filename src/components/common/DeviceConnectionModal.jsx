import React, { useState, useEffect } from 'react';
import Modal from './Modal';

const DeviceConnectionModal = ({
  isOpen,
  onClose,
  onConnect,
  deviceInfo = null
}) => {
  const [scanning, setScanning] = useState(false);
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(null);
  
  // Simulate scanning for devices
  const handleScan = () => {
    setScanning(true);
    setDevices([]);
    
    // Simulate finding devices over time
    const mockDevices = [
      { id: '00:11:22:33:44:55', name: 'Sonata LoRa 2 IL', rssi: -65 },
      { id: '66:77:88:99:AA:BB', name: 'Sonata LoRa 2 IL', rssi: -72 },
      { id: 'CC:DD:EE:FF:00:11', name: 'Sonata LoRa 2 US', rssi: -58 },
      { id: '22:33:44:55:66:77', name: 'CAT-M Gen. 2', rssi: -80 }
    ];
    
    // Add devices with delays to simulate scanning
    let count = 0;
    const interval = setInterval(() => {
      if (count < mockDevices.length) {
        setDevices(prev => [...prev, mockDevices[count]]);
        count++;
      } else {
        clearInterval(interval);
        setScanning(false);
      }
    }, 700);
  };
  
  // Start scanning when modal opens
  useEffect(() => {
    if (isOpen && devices.length === 0 && !scanning) {
      handleScan();
    }
  }, [isOpen, devices.length, scanning]);
  
  // Handle device selection
  const handleDeviceSelect = (device) => {
    setSelectedDevice(device);
  };
  
  // Handle connection attempt
  const handleConnect = () => {
    if (!selectedDevice) return;
    
    setConnecting(true);
    setConnectionStatus('pending');
    
    // Simulate connection attempt
    setTimeout(() => {
      setConnecting(false);
      
      // Simulate success (this would be replaced with actual connection logic)
      const success = Math.random() > 0.2; // 80% success rate for demo
      
      if (success) {
        setConnectionStatus('success');
        // Call the onConnect callback with the selected device
        onConnect(selectedDevice);
        
        // Close modal after success with slight delay
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setConnectionStatus('error');
      }
    }, 2000);
  };
  
  // Calculate signal strength class
  const getSignalStrengthClass = (rssi) => {
    if (rssi >= -60) return 'excellent';
    if (rssi >= -70) return 'good';
    if (rssi >= -80) return 'fair';
    return 'poor';
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Connect to Device">
      <div className="device-connection-modal">
        <div className="scan-section">
          <button 
            className="btn btn-secondary"
            onClick={handleScan} 
            disabled={scanning}
          >
            {scanning ? (
              <>
                <i className="bx bx-loader-alt bx-spin"></i>
                Scanning...
              </>
            ) : (
              <>
                <i className="bx bx-refresh"></i>
                Scan for Devices
              </>
            )}
          </button>
        </div>
        
        <div className="devices-list">
          <h3 className="devices-title">Available Devices</h3>
          
          {devices.length === 0 ? (
            <div className="no-devices">
              {scanning ? 'Scanning for devices...' : 'No devices found. Click "Scan for Devices" to search.'}
            </div>
          ) : (
            <div className="device-items">
              {devices.map((device) => (
                <div 
                  key={device.id}
                  className={`device-item ${selectedDevice?.id === device.id ? 'selected' : ''}`}
                  onClick={() => handleDeviceSelect(device)}
                >
                  <div className="device-icon">
                    <i className="bx bx-bluetooth"></i>
                  </div>
                  <div className="device-details">
                    <div className="device-name">{device.name}</div>
                    <div className="device-id">{device.id}</div>
                  </div>
                  <div className="device-signal">
                    <div className={`signal-strength ${getSignalStrengthClass(device.rssi)}`}>
                      <i className="bx bx-signal-4"></i>
                      <span className="signal-value">{device.rssi} dBm</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {connectionStatus === 'error' && (
          <div className="connection-error">
            <i className="bx bx-error-circle"></i>
            <span>Failed to connect. Please try again.</span>
          </div>
        )}
        
        {connectionStatus === 'success' && (
          <div className="connection-success">
            <i className="bx bx-check-circle"></i>
            <span>Connected successfully!</span>
          </div>
        )}
        
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button 
            className="btn btn-primary" 
            onClick={handleConnect}
            disabled={!selectedDevice || connecting || connectionStatus === 'success'}
          >
            {connecting ? (
              <>
                <i className="bx bx-loader-alt bx-spin"></i>
                Connecting...
              </>
            ) : (
              'Connect'
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeviceConnectionModal;