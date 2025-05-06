import React, { useState, useEffect, useRef } from 'react';
import '../styles/pages/testsequences.css';

const TestSequencesPage = () => {
  const [activeTab, setActiveTab] = useState('lora');
  const [selectedTest, setSelectedTest] = useState('tx-power-0dbm');
  const [draggedItem, setDraggedItem] = useState(null);
  const [dropIndex, setDropIndex] = useState(null);
  
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
  
  // Test steps with state management
  const [testSteps, setTestSteps] = useState([
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
  ]);
  
  // Function to move a step up in the order
  const moveStepUp = (index) => {
    if (index > 0) {
      const updatedSteps = [...testSteps];
      const temp = updatedSteps[index];
      updatedSteps[index] = updatedSteps[index - 1];
      updatedSteps[index - 1] = temp;
      setTestSteps(updatedSteps);
    }
  };
  
  // Function to move a step down in the order
  const moveStepDown = (index) => {
    if (index < testSteps.length - 1) {
      const updatedSteps = [...testSteps];
      const temp = updatedSteps[index];
      updatedSteps[index] = updatedSteps[index + 1];
      updatedSteps[index + 1] = temp;
      setTestSteps(updatedSteps);
    }
  };
  
  // Find the test step that matches the selected ID
  const getSelectedTestStep = () => {
    return testSteps.find(step => step.id === selectedTest) || testSteps[0];
  };
  
  // Form values for editing test steps - updates when selected test changes
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
  
  // Update edit form when selected test changes
  useEffect(() => {
    const selectedTestStep = getSelectedTestStep();
    if (selectedTestStep) {
      setEditForm({
        testName: selectedTestStep.name,
        testType: selectedTestStep.type === 'power' ? 'Power' : 
                 selectedTestStep.type === 'frequency' ? 'Frequency Accuracy' : 'Current Consumption',
        runCondition: selectedTestStep.runCondition === 'always' ? 'Always Run' : 
                     selectedTestStep.runCondition === 'ifPreviousPasses' ? 'If Previous Passes' : 'Stop When Finished',
        testFrequency: 'LoRa 9xx MHz (IL)',
        testPower: selectedTestStep.name.includes('0 dBm') ? '0 dBm' : 
                  selectedTestStep.name.includes('14 dBm') ? '14 dBm' : '30 dBm',
        minValue: '-0.5 dBm',
        maxValue: '0.5 dBm',
        captureSpectrum: true
      });
    }
  }, [selectedTest]);
  
  // Handlers for test sequence management
  const handleAddStep = () => {
    const newStep = {
      id: `new-test-${Date.now()}`,
      name: 'New Test Step',
      type: 'power',
      runCondition: 'always',
      badge: 'Power'
    };
    
    setTestSteps([...testSteps, newStep]);
    setSelectedTest(newStep.id);
  };
  
  const handleSaveChanges = () => {
    const updatedSteps = testSteps.map(step => {
      if (step.id === selectedTest) {
        // Map form values back to step object format
        const runCondition = editForm.runCondition === 'Always Run' ? 'always' : 
                            editForm.runCondition === 'If Previous Passes' ? 'ifPreviousPasses' : 'stopWhenFinished';
        
        const type = editForm.testType === 'Power' ? 'power' : 
                    editForm.testType === 'Frequency Accuracy' ? 'frequency' : 'current';
        
        const badge = editForm.testType === 'Power' ? 'Power' : 
                     editForm.testType === 'Frequency Accuracy' ? 'Frequency Accuracy' : 'Current Consumption';
        
        return {
          ...step,
          name: editForm.testName,
          type,
          runCondition,
          badge
        };
      }
      return step;
    });
    
    setTestSteps(updatedSteps);
    console.log('Saving test step changes...', editForm);
  };
  
  const handleRemoveStep = (id) => {
    // Filter out the step to remove
    const updatedSteps = testSteps.filter(step => step.id !== id);
    setTestSteps(updatedSteps);
    
    // If removed step is selected, select the first step
    if (id === selectedTest && updatedSteps.length > 0) {
      setSelectedTest(updatedSteps[0].id);
    }
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
  
  // Simplified Drag and Drop handlers
  const handleDragStart = (e, index) => {
    // Set which item is being dragged
    setDraggedItem(index);
    document.body.classList.add('dragging');
  };
  
  const handleDragOver = (e, index) => {
    e.preventDefault();
    
    // Don't do anything if hovering over the dragged item
    if (index === draggedItem) {
      return;
    }
    
    // Get mouse position relative to the target
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    const isTop = mouseY < rect.height / 2;
    
    // Set the drop target index and position
    // If dropping at the top of the item, put it before
    // If dropping at the bottom of the item, put it after
    setDropIndex(isTop ? index : index + 1);
  };
  
  const handleDragEnd = () => {
    document.body.classList.remove('dragging');
    
    // Only reorder if we have both a dragged item and a drop target
    if (draggedItem !== null && dropIndex !== null) {
      // Create a copy of the test steps
      const items = [...testSteps];
      
      // Remove the dragged item
      const [reorderedItem] = items.splice(draggedItem, 1);
      
      // Adjust the drop index if needed
      let adjustedDropIndex = dropIndex;
      if (draggedItem < dropIndex) {
        adjustedDropIndex--;
      }
      
      // Insert the item at the new position
      items.splice(adjustedDropIndex, 0, reorderedItem);
      
      // Update the state
      setTestSteps(items);
    }
    
    // Reset the state
    setDraggedItem(null);
    setDropIndex(null);
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
            {testSteps.map((step, index) => (
              <React.Fragment key={step.id}>
                {/* Show drop indicator before this item if needed */}
                {dropIndex === index && draggedItem !== null && draggedItem !== index && (
                  <div className="drop-indicator"></div>
                )}
                
                <div 
                  className={`test-step ${selectedTest === step.id ? 'selected' : ''} ${draggedItem === index ? 'dragging' : ''}`}
                  onClick={() => setSelectedTest(step.id)}
                  draggable={true}
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                >
                  <div className="test-step-header">
                    <div className="test-step-name">
                      <div className="drag-handle" title="Drag to reorder">
                        <i className="bx bx-dots-vertical-rounded"></i>
                        <i className="bx bx-dots-vertical-rounded"></i>
                      </div>
                      {step.name}
                    </div>
                    <div className="test-step-actions">
                      <button 
                        className="step-action-button move-up" 
                        onClick={(e) => {
                          e.stopPropagation();
                          moveStepUp(index);
                        }}
                        title="Move up"
                        disabled={index === 0}
                      >
                        <i className="bx bx-up-arrow-alt"></i>
                      </button>
                      <button 
                        className="step-action-button move-down"
                        onClick={(e) => {
                          e.stopPropagation();
                          moveStepDown(index);
                        }}
                        title="Move down"
                        disabled={index === testSteps.length - 1}
                      >
                        <i className="bx bx-down-arrow-alt"></i>
                      </button>
                      <button 
                        className="step-action-button remove"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveStep(step.id);
                        }}
                        title="Remove"
                      >
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
              </React.Fragment>
            ))}
            
            {/* Show drop indicator at the end if needed */}
            {dropIndex === testSteps.length && draggedItem !== null && (
              <div className="drop-indicator"></div>
            )}
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