import React, { useState, useEffect, useRef } from 'react';
import '../styles/pages/testsequences.css';

const TestSequencesPage = () => {
  const [activeTab, setActiveTab] = useState('lora');
  const [selectedTest, setSelectedTest] = useState('tx-power-0dbm');
  
  // Refs for tab indicator positioning
  const tabsRef = useRef(null);
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
    updateTabIndicator(activeTab);
  }, [activeTab]);
  
  // Update tab indicator position and width based on active tab
  const updateTabIndicator = (tab) => {
    let currentTabRef;
    
    switch(tab) {
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
  
  // Test steps based on the screenshot
  const testSteps = [
    {
      id: 'tx-power-0dbm',
      name: 'Tx Power 0 dBm',
      type: 'power',
      runCondition: 'always',
      badge: 'Power'
    },
    {
      id: 'tx-power-14dbm',
      name: 'Tx Power 14 dBm',
      type: 'power',
      runCondition: 'ifPreviousPasses',
      badge: 'Power'
    },
    {
      id: 'tx-power-30dbm',
      name: 'Tx Power 30 dBm',
      type: 'power',
      runCondition: 'ifPreviousPasses',
      badge: 'Power'
    },
    {
      id: 'freq-accuracy',
      name: 'Frequency Accuracy',
      type: 'frequency',
      runCondition: 'always',
      badge: 'Frequency Accuracy'
    },
    {
      id: 'tx-current-0dbm',
      name: 'Tx Current Consuption 0dBm',
      type: 'current',
      runCondition: 'stopWhenFinished',
      badge: 'Current Consumption'
    }
  ];
  
  // Form values for editing test steps
  const [editForm, setEditForm] = useState({
    testName: 'Tx Power 0 dBm',
    testType: 'Power',
    runCondition: 'Always Run',
    testFrequency: 'LoRa 9xx MHz (IL)',
    testPower: '0 dBm',
    minValue: '-0.5 dBm',
    maxValue: '0.5 dBm',
    captureSpectrum: true
  });
  
  // Handlers for test sequence management
  const handleAddStep = () => {
    console.log('Adding new test step...');
  };
  
  const handleSaveChanges = () => {
    console.log('Saving test step changes...');
  };
  
  const handleSaveConfiguration = () => {
    console.log('Saving sequence configuration...');
  };
  
  const handleLoadConfiguration = () => {
    console.log('Loading sequence configuration...');
  };
  
  // Helper function to get badge class
  const getBadgeClass = (type) => {
    switch (type) {
      case 'power':
        return 'power-badge';
      case 'frequency':
        return 'frequency-badge';
      case 'current':
        return 'current-badge';
      default:
        return '';
    }
  };

  return (
    <div className="page-container">
      <div className="section-header">
        <h1>Test Sequences Builder</h1>
        <div className="header-actions">
          <button className="btn btn-secondary" id='load-config' onClick={handleLoadConfiguration}>
            <i className="bx bx-upload btn-icon"></i>
            Load Configuration
          </button>
          <button className="btn btn-secondary" id='save-config' onClick={handleSaveConfiguration}>
            <i className="bx bx-save btn-icon"></i>
            Save Configuration
          </button>
          <button className="btn btn-primary" id='add-test' onClick={handleAddStep}>
            <i className="bx bx-plus btn-icon"></i>
            Add Step
          </button>
        </div>
      </div>
      
      <div className="protocol-tabs" ref={tabsRef}>
        <div 
          className={`protocol-tab ${activeTab === 'lora' ? 'active' : ''}`}
          onClick={() => setActiveTab('lora')}
          ref={loraTabRef}
        >
          LoRa
        </div>
        <div 
          className={`protocol-tab ${activeTab === 'cellular' ? 'active' : ''}`}
          onClick={() => setActiveTab('cellular')}
          ref={cellularTabRef}
        >
          Cellular
        </div>
        <div 
          className={`protocol-tab ${activeTab === 'ble' ? 'active' : ''}`}
          onClick={() => setActiveTab('ble')}
          ref={bleTabRef}
        >
          BLE
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
      
      <div className="sequence-builder">
        <div className="test-steps-panel">
          <h2>Test Steps</h2>
          <div className="panel-description">Drag and drop to reorder test steps</div>
          
          <div className="test-steps-list">
            {testSteps.map(step => (
              <div 
                key={step.id}
                className={`test-step ${selectedTest === step.id ? 'selected' : ''}`}
                onClick={() => setSelectedTest(step.id)}
              >
                <div className="test-step-header">
                  <div className="test-step-name">{step.name}</div>
                  <div className="test-step-actions">
                    <button className="step-action-button move-up">
                      <i className="bx bx-up-arrow-alt"></i>
                    </button>
                    <button className="step-action-button move-down">
                      <i className="bx bx-down-arrow-alt"></i>
                    </button>
                    <button className="step-action-button remove">
                      <i className="bx bx-trash"></i>
                    </button>
                  </div>
                </div>
                
                <div className="test-step-footer">
                  <span className={`test-badge ${getBadgeClass(step.type)}`}>
                    {step.badge}
                  </span>
                  <span className="run-condition">
                    {step.runCondition === 'always' && 'Always Run'}
                    {step.runCondition === 'ifPreviousPasses' && 'If Previous Passes'}
                    {step.runCondition === 'stopWhenFinished' && 'Stop When Finished'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="edit-step-panel">
          <h2>Edit Test Steps</h2>
          <div className="panel-description">Configure the selected test step</div>
          
          <div className="edit-form">
            <div className="form-group">
              <label className="form-label">Test Name</label>
              <input 
                type="text" 
                className="form-input" 
                value={editForm.testName}
                onChange={(e) => setEditForm({...editForm, testName: e.target.value})}
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Test Type</label>
                <select 
                  className="form-select"
                  value={editForm.testType}
                  onChange={(e) => setEditForm({...editForm, testType: e.target.value})}
                >
                  <option value="Power">Power</option>
                  <option value="Current Consumption">Current Consumption</option>
                  <option value="Frequency Accuracy">Frequency Accuracy</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Run Condition</label>
                <select 
                  className="form-select"
                  value={editForm.runCondition}
                  onChange={(e) => setEditForm({...editForm, runCondition: e.target.value})}
                >
                  <option value="Always Run">Always Run</option>
                  <option value="If Previous Passes">If Previous Passes</option>
                  <option value="Stop When Finished">Stop When Finished</option>
                </select>
              </div>
            </div>
            
            <h3 className="form-section-title">Test Parameters</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Test Frequencies</label>
                <select 
                  className="form-select"
                  value={editForm.testFrequency}
                  onChange={(e) => setEditForm({...editForm, testFrequency: e.target.value})}
                >
                  <option value="LoRa 8xx MHz (EU)">LoRa 8xx MHz (EU)</option>
                  <option value="LoRa 9xx MHz (IL)">LoRa 9xx MHz (IL)</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Test Power</label>
                <select 
                  className="form-select"
                  value={editForm.testPower}
                  onChange={(e) => setEditForm({...editForm, testPower: e.target.value})}
                >
                  <option value="0 dBm">0 dBm</option>
                  <option value="14 dBm">14 dBm</option>
                  <option value="30 dBm">30 dBm</option>
                </select>
              </div>
            </div>
            
            <h3 className="form-section-title">Pass/Fail Criteria</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Minimum Value</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={editForm.minValue}
                  onChange={(e) => setEditForm({...editForm, minValue: e.target.value})}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Maximum Value</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={editForm.maxValue}
                  onChange={(e) => setEditForm({...editForm, maxValue: e.target.value})}
                />
              </div>
            </div>
            
            <div className="form-group checkbox-group">
              <label className="checkbox">
                <input 
                  type="checkbox" 
                  checked={editForm.captureSpectrum}
                  onChange={(e) => setEditForm({...editForm, captureSpectrum: e.target.checked})}
                />
                <span>Capture Spectrum Photo</span>
              </label>
            </div>
            
            <div className="form-actions">
              <button className="btn btn-primary" onClick={handleSaveChanges}>
                Apply Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestSequencesPage;