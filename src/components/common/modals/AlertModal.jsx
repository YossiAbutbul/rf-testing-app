import React from 'react';
import Modal from './Modal';

const AlertModal = ({
  isOpen,
  onClose,
  title = 'Alert',
  message,
  buttonText = 'OK',
  type = 'info', // 'info', 'success', 'warning', 'error'
  icon
}) => {
  // Select icon based on type if not provided
  const getIcon = () => {
    if (icon) return icon;
    
    switch (type) {
      case 'success':
        return 'bx-check-circle';
      case 'warning':
        return 'bx-error';
      case 'error':
        return 'bx-x-circle';
      case 'info':
      default:
        return 'bx-info-circle';
    }
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="small">
      <div className="alert-modal">
        <div className={`alert-icon ${type}`}>
          <i className={`bx ${getIcon()}`}></i>
        </div>
        <p className="alert-message">{message}</p>
        <div className="modal-actions">
          <button className="btn btn-primary" onClick={onClose}>
            {buttonText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AlertModal;