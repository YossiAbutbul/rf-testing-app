import React, { useState } from 'react';

const EquipmentSetup = ({ onNext }) => {
  const [spectrumAnalyzer, setSpectrumAnalyzer] = useState({
    model: 'CXA Signal Analyzer',
    serialNumber: 'MY51261627',
    ipAddress: '192.168.3.2',
    port: '5342',
    externalAttenuation: '35 dB',
    connected: true
  });

  // In a real app this would connect to actual hardware
  const handleAddEquipment = () => {
    // Logic to add additional test equipment
    console.log('Adding new equipment...');
  };
  
  // Toggle connection status
  const toggleConnection = () => {
    setSpectrumAnalyzer({
      ...spectrumAnalyzer,
      connected: !spectrumAnalyzer.connected
    });
  };
  
  // Handle input changes
  const handleInputChange = (field, value) => {
    setSpectrumAnalyzer({
      ...spectrumAnalyzer,
      [field]: value
    });
  };

  return (
    <div className="card">
      <h2>Test Equipment</h2>
      <p className="card-description">Connect and configure test equipment</p>
      
      <div className="equipment-section">
        <div className="equipment-card-container">
          <div className="equipment-card">
            <div className="equipment-header">
              <h3>Spectrum Analyzer</h3>
              <div className="connection-container">
                <button className="refresh-connection-button" onClick={toggleConnection}>
                  <i className="bx bx-refresh"></i>
                </button>
                <div className={`connection-status ${spectrumAnalyzer.connected ? 'connected' : 'disconnected'}`}>
                  {spectrumAnalyzer.connected ? 'Connected' : 'Disconnected'}
                </div>
              </div>
            </div>
            
            <div className="equipment-details">
              <div className="detail-row">
                <div className="detail-label">Model:</div>
                <input 
                  type="text" 
                  className="detail-input" 
                  value={spectrumAnalyzer.model} 
                  onChange={(e) => handleInputChange('model', e.target.value)}
                />
              </div>
              <div className="detail-row">
                <div className="detail-label">Serial Number:</div>
                <input 
                  type="text" 
                  className="detail-input" 
                  value={spectrumAnalyzer.serialNumber} 
                  onChange={(e) => handleInputChange('serialNumber', e.target.value)}
                />
              </div>
              <div className="detail-row">
                <div className="detail-label">IP Address:</div>
                <input 
                  type="text" 
                  className="detail-input" 
                  value={spectrumAnalyzer.ipAddress} 
                  onChange={(e) => handleInputChange('ipAddress', e.target.value)}
                />
              </div>
              <div className="detail-row">
                <div className="detail-label">Port:</div>
                <input 
                  type="text" 
                  className="detail-input" 
                  value={spectrumAnalyzer.port} 
                  onChange={(e) => handleInputChange('port', e.target.value)}
                />
              </div>
              <div className="detail-row">
                <div className="detail-label">External Attenuation:</div>
                <input 
                  type="text" 
                  className="detail-input" 
                  value={spectrumAnalyzer.externalAttenuation} 
                  onChange={(e) => handleInputChange('externalAttenuation', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        
        <button className="add-equipment-button" onClick={handleAddEquipment}>
          <i className="bx bx-plus"></i>
        </button>
      </div>
      
      <div className="equipment-status alert alert-success">
        <i className="bx bx-check-circle"></i>
        <div>
          <strong>Equipment Ready</strong>
          <p>All required test equipment is connected and configured.</p>
        </div>
      </div>
      
      <div className="card-actions">
        <button className="btn btn-primary" onClick={onNext}>
          Next Step
          <i className="bx bx-right-arrow-alt btn-icon"></i>
        </button>
      </div>
    </div>
  );
};

export default EquipmentSetup;