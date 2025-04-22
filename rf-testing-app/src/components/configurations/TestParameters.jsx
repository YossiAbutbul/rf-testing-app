import React, { useState } from 'react';

const TestParameters = ({ onComplete, onPrevious }) => {
  // Protocol selection state - based on the screenshot
  const [selectedProtocols, setSelectedProtocols] = useState({
    lora: true,
    cellular: true,
    ble: true
  });
  
  // Report path state
  const [reportPath, setReportPath] = useState('C:/Users/Admin/Sonata2');
  
  // Test notes state
  const [testNotes, setTestNotes] = useState('');
  
  // Handle protocol checkbox changes
  const handleProtocolChange = (protocol) => {
    setSelectedProtocols({
      ...selectedProtocols,
      [protocol]: !selectedProtocols[protocol]
    });
  };
  
  // Handle browsing for report path
  const handleBrowse = () => {
    // In a real app, this would open a directory picker
    console.log('Opening directory browser...');
    // For demo purposes, we'll just update with a mock path
    setReportPath('C:/Users/Admin/Sonata2/TestReports');
  };

  return (
    <div className="card">
      <h2>Test Parameters</h2>
      <p className="card-description">Configure test parameters</p>
      
      <div className="parameter-section">
        <div className="form-group">
          <label className="form-label">Select test protocols</label>
          <div className="checkbox-group">
            <label className="checkbox">
              <input 
                type="checkbox" 
                checked={selectedProtocols.lora}
                onChange={() => handleProtocolChange('lora')}
              />
              <span>LoRa</span>
            </label>
            <label className="checkbox">
              <input 
                type="checkbox" 
                checked={selectedProtocols.cellular}
                onChange={() => handleProtocolChange('cellular')}
              />
              <span>Cellular</span>
            </label>
            <label className="checkbox">
              <input 
                type="checkbox" 
                checked={selectedProtocols.ble}
                onChange={() => handleProtocolChange('ble')}
              />
              <span>BLE</span>
            </label>
          </div>
        </div>
        
        <div className="form-group">
          <label className="form-label">Report and photos save path</label>
          <div className="path-input-container">
            <input 
              type="text" 
              className="form-input" 
              value={reportPath}
              onChange={(e) => setReportPath(e.target.value)}
            />
            <button className="btn btn-secondary browse-button" onClick={handleBrowse}>
              Browse
            </button>
          </div>
        </div>
        
        <div className="form-group">
          <label className="form-label">Write notes or description about the test</label>
          <textarea 
            className="form-textarea"
            placeholder="Add Details about the test..."
            value={testNotes}
            onChange={(e) => setTestNotes(e.target.value)}
            rows={6}
          />
        </div>
      </div>
      
      <div className="protocol-status alert alert-success">
        <i className="bx bx-check-circle"></i>
        <div>
          <strong>Test Parameters Settings Ready</strong>
          <p>All required test parameters are configured.</p>
        </div>
      </div>
      
      <div className="card-actions">
        <button className="btn btn-secondary" onClick={onPrevious}>
          <i className="bx bx-left-arrow-alt btn-icon"></i>
          Previous Step
        </button>
        <button className="btn btn-primary done-button" onClick={onComplete}>
          Done
          <i className="bx bx-check btn-icon"></i>
        </button>
      </div>
    </div>
  );
};

export default TestParameters;