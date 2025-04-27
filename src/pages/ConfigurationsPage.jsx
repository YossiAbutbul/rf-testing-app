import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/configurations.css';

// Configuration steps components
import EquipmentSetup from '../components/configurations/EquipmentSetup';
import ProtocolSettings from '../components/configurations/ProtocolSettings';
import TestParameters from '../components/configurations/TestParameters';

const ConfigurationsPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  
  // Handlers for step navigation
  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Navigate to test matrix after configuration is complete
      navigate('/test-matrix');
    }
  };
  
  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSaveConfiguration = () => {
    // Implementation for saving configuration
    console.log('Saving configuration...');
    // This would typically involve API calls
  };
  
  const handleLoadConfiguration = () => {
    // Implementation for loading configuration
    console.log('Loading configuration...');
    // This would typically involve API calls
  };
  
  // Render active step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <EquipmentSetup onNext={handleNextStep} />;
      case 2:
        return <ProtocolSettings onNext={handleNextStep} onPrevious={handlePreviousStep} />;
      case 3:
        return <TestParameters onComplete={handleNextStep} onPrevious={handlePreviousStep} />;
      default:
        return <EquipmentSetup onNext={handleNextStep} />;
    }
  };

  return (
    <div className="page-container">
      <div className="section-header">
        <h1>Configurations</h1>
        <div className="header-actions">
          <button className="btn btn-secondary config-btn" onClick={handleLoadConfiguration}>
            <i className="bx bx-folder-open btn-icon"></i>
            Load Configuration
          </button>
          <button className="btn btn-primary config-btn" onClick={handleSaveConfiguration}>
            <i className="bx bx-save btn-icon"></i>
            Save Configuration
          </button>
        </div>
      </div>
      
      <div className="step-indicator">
        <div className={`step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
          <div className="step-number">1</div>
          <div className="step-title">Equipment Setup</div>
          <div className="step-description">Connect and verify test equipment</div>
          {currentStep > 1 && <div className="step-connector"></div>}
        </div>
        <div className={`step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
          <div className="step-number">2</div>
          <div className="step-title">Protocol Settings</div>
          <div className="step-description">Configure Frequencies and Power Parameters</div>
          {currentStep > 2 && <div className="step-connector"></div>}
        </div>
        <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
          <div className="step-number">3</div>
          <div className="step-title">Test Parameters</div>
          <div className="step-description">Configure Test Parameters like FW version</div>
        </div>
      </div>
      
      <div className="configuration-content">
        {renderStepContent()}
      </div>
    </div>
  );
};

export default ConfigurationsPage;