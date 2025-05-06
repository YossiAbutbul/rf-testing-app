import React from 'react';
import Modal from './Modal';

const ConfirmationModal = ({
  isOpen,
  onClose,
  title = 'Confirm Action',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  confirmButtonType = 'primary', // 'primary', 'danger', 'success'
  icon = 'bx-question-mark'
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="small">
      <div className="confirmation-modal">
        <div className={`confirmation-icon ${confirmButtonType}`}>
          <i className={`bx ${icon}`}></i>
        </div>
        <p className="confirmation-message">{message}</p>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            {cancelText}
          </button>
          <button 
            className={`btn btn-${confirmButtonType}`} 
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;