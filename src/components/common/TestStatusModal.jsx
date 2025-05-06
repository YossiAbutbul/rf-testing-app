import React from 'react';
import Modal from './Modal';

const TestStatusModal = ({
  isOpen,
  onClose,
  testName,
  status = 'running', // 'running', 'success', 'error', 'stopped'
  progress = 0,
  currentStep = '',
  results = null,
  onViewReport
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'success':
        return <i className="bx bx-check-circle status-icon success"></i>;
      case 'error':
        return <i className="bx bx-x-circle status-icon error"></i>;
      case 'stopped':
        return <i className="bx bx-stop-circle status-icon stopped"></i>;
      case 'running':
      default:
        return <i className="bx bx-loader-alt bx-spin status-icon running"></i>;
    }
  };
  
  const getStatusText = () => {
    switch (status) {
      case 'success':
        return 'Test completed successfully';
      case 'error':
        return 'Test failed';
      case 'stopped':
        return 'Test stopped';
      case 'running':
      default:
        return 'Test in progress...';
    }
  };
  
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={status !== 'running' ? onClose : null} 
      title={testName || 'Test Status'}
    >
      <div className="test-status-modal">
        <div className={`status-indicator ${status}`}>
          {getStatusIcon()}
          <h3 className="status-text">{getStatusText()}</h3>
        </div>
        
        {status === 'running' && (
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-value" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="progress-text">{progress}% Complete</div>
            <div className="current-step">{currentStep}</div>
          </div>
        )}
        
        {(status === 'success' || status === 'error') && results && (
          <div className="test-results-summary">
            <h4>Test Results</h4>
            <div className="results-grid">
              <div className="result-item">
                <div className="result-label">Passed Tests</div>
                <div className="result-value success">{results.passed}</div>
              </div>
              <div className="result-item">
                <div className="result-label">Failed Tests</div>
                <div className="result-value error">{results.failed}</div>
              </div>
              <div className="result-item">
                <div className="result-label">Total Tests</div>
                <div className="result-value">{results.total}</div>
              </div>
              <div className="result-item">
                <div className="result-label">Duration</div>
                <div className="result-value">{results.duration}s</div>
              </div>
            </div>
          </div>
        )}
        
        <div className="modal-actions">
          {status === 'running' ? (
            <button className="btn btn-danger" onClick={onClose}>
              Stop Test
            </button>
          ) : (
            <>
              <button className="btn btn-secondary" onClick={onClose}>
                Close
              </button>
              {(status === 'success' || status === 'error') && (
                <button className="btn btn-primary" onClick={onViewReport}>
                  View Full Report
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default TestStatusModal;