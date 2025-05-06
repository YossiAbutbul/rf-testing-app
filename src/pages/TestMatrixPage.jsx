import React, { useState, useEffect, useRef } from 'react';
import '../styles/pages/testmatrix.css';

const TestMatrixPage = () => {
  const [activeTab, setActiveTab] = useState('lora');
  const [selectedProject, setSelectedProject] = useState('Sonata 2 IL');
  const [selectedDevice, setSelectedDevice] = useState('00:1A:2B:3C:4D:5E');
  
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
  
  // This will be replaced with actual test results from the backend
  // Sample test results data
  const testResults = [
    {
      id: 1,
      name: 'Tx Power 0 dBm',
      measured: '0.15 dBm',
      lowLimit: '-0.5 dBm',
      highLimit: '0.5 dBm',
      result: 'pass',
      status: 'success'
    },
    {
      id: 2,
      name: 'Tx Power 14 dBm',
      measured: '14.18 dBm',
      lowLimit: '13.5 dBm',
      highLimit: '14.5 dBm',
      result: 'pass',
      status: 'success'
    },
    {
      id: 3,
      name: 'Tx Power 30 dBm',
      measured: '29.87 dBm',
      lowLimit: '29.5 dBm',
      highLimit: '30.5 dBm',
      result: 'pass',
      status: 'success'
    },
    {
      id: 4,
      name: 'Tx Current Consumption 0 dBm',
      measured: '35 mA',
      lowLimit: '15 mA',
      highLimit: '30 mA',
      result: 'fail',
      status: 'error'
    },
    {
      id: 5,
      name: 'Tx Current Consumption 14 dBm',
      measured: '72 mA',
      lowLimit: '65 mA',
      highLimit: '80 mA',
      result: 'pending',
      status: 'pending'
    },
    {
      id: 6,
      name: 'Tx Current Consumption 30 dBm',
      measured: '568 mA',
      lowLimit: '550 mA',
      highLimit: '600 mA',
      result: 'pending',
      status: 'pending'
    },
    {
      id: 7,
      name: 'OBW',
      measured: '1.127 KHz',
      lowLimit: '1.100 KHz',
      highLimit: '1.200 KHz',
      result: 'pending',
      status: 'pending'
    },
    {
      id: 8,
      name: 'Spurious Emmision',
      measured: 'N/A',
      lowLimit: '≤-42 dBc',
      highLimit: '≤-42 dBc',
      result: 'pending',
      status: 'pending'
    }
  ];
  
  // Function to get status icon based on test status
  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <i className="bx bx-check-circle status-icon success"></i>;
      case 'error':
        return <i className="bx bx-x-circle status-icon error"></i>;
      case 'pending':
        return <i className="bx bx-time-five status-icon pending"></i>;
      default:
        return null;
    }
  };
  
  // Count passed tests
  const passedTests = testResults.filter(test => test.result === 'pass').length;
  const totalTests = testResults.length;
  
  // Handlers for actions
  const handleRunTests = () => {
    console.log('Running tests...');
  };
  
  const handleSaveResults = () => {
    console.log('Saving results...');
  };
  
  const handleLoadTests = () => {
    console.log('Loading tests...');
  };

  return (
    <div className="page-container">
      <div className="section-header">
        <h1>Test Matrix</h1>
        <div className="header-actions">
          <button className="btn btn-secondary" id='load-tests' onClick={handleLoadTests}>
            <i className="bx bx-upload btn-icon"></i>
            Load Tests
          </button>
          <button className="btn btn-secondary" id='save-results' onClick={handleSaveResults}>
            <i className="bx bx-save btn-icon"></i>
            Save Results
          </button>
          <button className="btn btn-primary" id='run-test' onClick={handleRunTests}>
            <i className="bx bx-play btn-icon"></i>
            Run Tests
          </button>
        </div>
      </div>
      
      <div className="test-matrix-controls">
        <div className="control-row">
          <div className="select-container">
            <label className="select-label">Select Project</label>
            <select 
              className="form-select" 
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
            >
              <option value="Sonata 2 IL">Sonata 2 IL</option>
              <option value="Sonata 2 US">Sonata 2 US</option>
              <option value="CAT-M 2">CAT-M 2</option>
            </select>
          </div>
          
          <div className="select-container">
            <label className="select-label">Select Unit MAC Address</label>
            <select 
              className="form-select" 
              value={selectedDevice}
              onChange={(e) => setSelectedDevice(e.target.value)}
            >
              <option value="00:1A:2B:3C:4D:5E">00:1A:2B:3C:4D:5E</option>
              <option value="00:2B:3C:4D:5E:6F">00:2B:3C:4D:5E:6F</option>
            </select>
          </div>
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
      
      <div className="test-results-container">
        <div className="test-results-header">
          <h2>LoRa Test Results</h2>
          <div className="test-summary">
            {passedTests} of {totalTests} tests passed
          </div>
        </div>
        
        <div className="table-container">
          <table className="test-results-table">
            <thead>
              <tr>
                <th className="status-column">Status</th>
                <th className="test-name-column">Test Name</th>
                <th className="measurement-column">Measured</th>
                <th className="limit-column">Low Limit</th>
                <th className="limit-column">High Limit</th>
                <th className="result-column">Result</th>
              </tr>
            </thead>
            <tbody>
              {testResults.map(test => (
                <tr key={test.id} className={`test-row ${test.status}`}>
                  <td className="status-cell">
                    {getStatusIcon(test.status)}
                  </td>
                  <td className="test-name-cell">{test.name}</td>
                  <td className="measurement-cell">{test.measured}</td>
                  <td className="limit-cell">{test.lowLimit}</td>
                  <td className="limit-cell">{test.highLimit}</td>
                  <td className="result-cell">
                    <span className={`result-badge ${test.result}`}>
                      {test.result.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TestMatrixPage;