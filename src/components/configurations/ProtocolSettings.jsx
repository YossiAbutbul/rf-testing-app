import React, { useState, useEffect, useRef } from 'react';

const ProtocolSettings = ({ onNext, onPrevious }) => {
  const [activeProtocol, setActiveProtocol] = useState('lora');
  
  // Refs for tab indicator positioning
  const protocolTabsRef = useRef(null);
  const loraTabRef = useRef(null);
  const cellularTabRef = useRef(null);
  const bleTabRef = useRef(null);
  
  // State for tab indicator position and width
  const [tabIndicator, setTabIndicator] = useState({
    left: 0,
    width: 0
  });

  // Position the tab indicator whenever the active tab changes
  useEffect(() => {
    updateTabIndicator(activeProtocol);
  }, [activeProtocol]);
  
  // Update tab indicator position and width based on active tab
  const updateTabIndicator = (protocol) => {
    let currentTabRef;
    
    switch(protocol) {
      case 'lora':
        currentTabRef = loraTabRef.current;
        break;
      case 'cellular':
        currentTabRef = cellularTabRef.current;
        break;
      case 'ble':
        currentTabRef = bleTabRef.current;
        break;
      default:
        currentTabRef = loraTabRef.current;
    }
    
    if (currentTabRef && protocolTabsRef.current) {
      const tabRect = currentTabRef.getBoundingClientRect();
      const tabsRect = protocolTabsRef.current.getBoundingClientRect();
      
      setTabIndicator({
        left: tabRect.left - tabsRect.left,
        width: tabRect.width
      });
    }
  };
  
  // Also update the tab indicator on window resize
  useEffect(() => {
    const handleResize = () => {
      updateTabIndicator(activeProtocol);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeProtocol]);
  
  // Initially position the tab indicator after component mounts
  useEffect(() => {
    // Short delay to ensure refs are properly set
    const timer = setTimeout(() => {
      updateTabIndicator(activeProtocol);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Mocked protocol settings
  const loraSettings = [
    { label: 'Tx Power', value: '14 dBm, 30 dBm' },
    { label: 'Frequency Band', value: 'LoRa 915 MHz (IL)' },
    { label: 'Spreading Factor', value: 'SF10' },
    { label: 'Data Rate', value: 'DR 0' },
  ];
  
  const cellularSettings = [
    { label: 'Tx Power', value: '23 dBm' },
    { label: 'Network Type', value: 'CAT-M' },
    { label: 'Bands', value: 'B2, B4, B12' },
  ];
  
  const bleSettings = [
    { label: 'Tx Power', value: '0 dBm' },
    { label: 'BLE Channels', value: 'CH0, CH22, CH39' },
    { label: 'Connection Interval', value: '30ms' }
  ];
  
  // Get active settings based on protocol
  const getActiveSettings = () => {
    switch (activeProtocol) {
      case 'lora':
        return loraSettings;
      case 'cellular':
        return cellularSettings;
      case 'ble':
        return bleSettings;
      default:
        return loraSettings;
    }
  };

  return (
    <div className="card">
      <h2>Protocol Settings</h2>
      <div className="card-description">
        Configure the protocol parameters for your test
      </div>
      
      <div className="protocol-tabs" ref={protocolTabsRef}>
        <div 
          className={`protocol-tab ${activeProtocol === 'lora' ? 'active' : ''}`}
          onClick={() => setActiveProtocol('lora')}
          ref={loraTabRef}
        >
          LoRa
        </div>
        <div 
          className={`protocol-tab ${activeProtocol === 'cellular' ? 'active' : ''}`}
          onClick={() => setActiveProtocol('cellular')}
          ref={cellularTabRef}
        >
          Cellular
        </div>
        <div 
          className={`protocol-tab ${activeProtocol === 'ble' ? 'active' : ''}`}
          onClick={() => setActiveProtocol('ble')}
          ref={bleTabRef}
        >
          BLE
        </div>
        {/* Tab indicator element */}
        <div 
          className="protocol-tab-indicator" 
          style={{ 
            left: `${tabIndicator.left}px`, 
            width: `${tabIndicator.width}px` 
          }}
        />
      </div>
      
      <div className="protocol-settings-content">
        {getActiveSettings().map((setting, index) => (
          <div key={index} className="setting-row">
            <div className="setting-label">{setting.label}</div>
            <div className="setting-value">{setting.value}</div>
            <button className="edit-setting-button">
              <i className="bx bx-edit"></i>
            </button>
          </div>
        ))}
      </div>
      
      <div className="card-actions">
        <button className="btn btn-secondary" onClick={onPrevious}>
          <i className="bx bx-chevron-left btn-icon"></i>
          Previous
        </button>
        <button className="btn btn-primary" onClick={onNext}>
          Next
          <i className="bx bx-chevron-right btn-icon"></i>
        </button>
      </div>
    </div>
  );
};

export default ProtocolSettings;