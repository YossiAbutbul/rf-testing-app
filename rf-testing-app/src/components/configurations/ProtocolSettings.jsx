import React, { useState } from 'react';

const ProtocolSettings = ({ onNext, onPrevious }) => {
  const [activeTab, setActiveTab] = useState('lora');
  
  // Form state for LoRa settings
  const [loraFrequency, setLoraFrequency] = useState('LoRa 8xx MHz (EU)');
  const [loraPower, setLoraPower] = useState('0, 14, 30 dBm');
  const [loraDr, setLoraDr] = useState('DR7, DR12');
  
  // Handle editing settings
  const handleEditSetting = (settingType) => {
    console.log(`Editing setting: ${settingType}`);
    // In a real app, this would open a modal or expand a form for editing
  };

  return (
    <div className="card">
      <h2>Protocol Settings</h2>
      <p className="card-description">Configure test parameters for the selected protocols</p>
      
      <div className="protocol-tabs">
        <div 
          className={`protocol-tab ${activeTab === 'lora' ? 'active' : ''}`}
          onClick={() => setActiveTab('lora')}
        >
          LoRa
        </div>
        <div 
          className={`protocol-tab ${activeTab === 'cellular' ? 'active' : ''}`}
          onClick={() => setActiveTab('cellular')}
        >
          Cellular
        </div>
        <div 
          className={`protocol-tab ${activeTab === 'ble' ? 'active' : ''}`}
          onClick={() => setActiveTab('ble')}
        >
          BLE
        </div>
      </div>
      
      <div className="protocol-settings">
        {/* LoRa Settings */}
        {activeTab === 'lora' && (
          <div className="protocol-settings-content">
            <div className="setting-row">
              <div className="setting-label">Test Frequencies</div>
              <div className="setting-value">{loraFrequency}</div>
              <button 
                className="edit-setting-button" 
                onClick={() => handleEditSetting('frequencies')}
              >
                <i className="bx bx-pencil"></i>
              </button>
            </div>
            
            <div className="setting-row">
              <div className="setting-label">Test Power Selection</div>
              <div className="setting-value">{loraPower}</div>
              <button 
                className="edit-setting-button" 
                onClick={() => handleEditSetting('power')}
              >
                <i className="bx bx-pencil"></i>
              </button>
            </div>
            
            <div className="setting-row">
              <div className="setting-label">Test DR Selection</div>
              <div className="setting-value">{loraDr}</div>
              <button 
                className="edit-setting-button" 
                onClick={() => handleEditSetting('dr')}
              >
                <i className="bx bx-pencil"></i>
              </button>
            </div>
          </div>
        )}
        
        {/* Cellular Settings - Simple placeholders, would be expanded similar to LoRa */}
        {activeTab === 'cellular' && (
          <div className="protocol-settings-content">
            <p>Configure Cellular protocol settings here</p>
            <p className="placeholder-message">Select Cellular bands, power levels, and other parameters</p>
          </div>
        )}
        
        {/* BLE Settings - Simple placeholders, would be expanded similar to LoRa */}
        {activeTab === 'ble' && (
          <div className="protocol-settings-content">
            <p>Configure BLE protocol settings here</p>
            <p className="placeholder-message">Select BLE channels, power levels, and data rates</p>
          </div>
        )}
      </div>
      
      <div className="protocol-status alert alert-success">
        <i className="bx bx-check-circle"></i>
        <div>
          <strong>Protocol Settings Ready</strong>
          <p>All required protocols parameters are configured.</p>
        </div>
      </div>
      
      <div className="card-actions">
        <button className="btn btn-secondary" onClick={onPrevious}>
          <i className="bx bx-left-arrow-alt btn-icon"></i>
          Previous Step
        </button>
        <button className="btn btn-primary" onClick={onNext}>
          Next Step
          <i className="bx bx-right-arrow-alt btn-icon"></i>
        </button>
      </div>
    </div>
  );
};

export default ProtocolSettings;