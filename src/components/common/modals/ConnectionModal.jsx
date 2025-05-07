import React, { useState } from 'react';
import Modal from './Modal';

const ConnectionModal = ({
  isOpen,
  onClose,
  title = 'Equipment Connection',
  equipmentType,
  initialValues = {
    model: '',
    serialNumber: '',
    ipAddress: '192.168.1.1',
    port: '5555'
  },
  onConnect
}) => {
  const [connecting, setConnecting] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [connectionStatus, setConnectionStatus] = useState(null);
  
  const handleInputChange = (field, value) => {
    setValues({
      ...values,
      [field]: value
    });
  };
  
  const handleConnect = () => {
    setConnecting(true);
    setConnectionStatus('pending');
    
    // Simulate connection attempt
    setTimeout(() => {
      setConnecting(false);
      
      // Simulate success (this would be replaced with actual connection logic)
      const success = Math.random() > 0.3; // 70% success rate for demo
      
      if (success) {
        setConnectionStatus('success');
        // Call the onConnect callback with the values
        onConnect(values);
        
        // Close modal after success with slight delay
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setConnectionStatus('error');
      }
    }, 2000);
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="connection-modal">
        <div className="modal-form">
          <div className="form-group">
            <label className="form-label">Equipment Type</label>
            <input 
              type="text" 
              className="form-input" 
              value={equipmentType}
              disabled
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Model</label>
            <input 
              type="text" 
              className="form-input" 
              value={values.model}
              onChange={(e) => handleInputChange('model', e.target.value)}
              placeholder="Enter model name"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Serial Number</label>
            <input 
              type="text" 
              className="form-input" 
              value={values.serialNumber}
              onChange={(e) => handleInputChange('serialNumber', e.target.value)}
              placeholder="Enter serial number"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">IP Address</label>
              <input 
                type="text" 
                className="form-input" 
                value={values.ipAddress}
                onChange={(e) => handleInputChange('ipAddress', e.target.value)}
                placeholder="192.168.1.1"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Port</label>
              <input 
                type="text" 
                className="form-input" 
                value={values.port}
                onChange={(e) => handleInputChange('port', e.target.value)}
                placeholder="5555"
              />
            </div>
          </div>
          
          {connectionStatus === 'error' && (
            <div className="connection-error">
              <i className="bx bx-error-circle"></i>
              <span>Failed to connect. Please check your settings and try again.</span>
            </div>
          )}
          
          {connectionStatus === 'success' && (
            <div className="connection-success">
              <i className="bx bx-check-circle"></i>
              <span>Connected successfully!</span>
            </div>
          )}
        </div>
        
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose} disabled={connecting}>
            Cancel
          </button>
          <button 
            className="btn btn-primary" 
            onClick={handleConnect} 
            disabled={connecting || connectionStatus === 'success'}
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

export default ConnectionModal;