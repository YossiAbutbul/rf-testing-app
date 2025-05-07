import React, { useState } from 'react';
import Modal from './Modal';

const ReportPreviewModal = ({
  isOpen,
  onClose,
  reportName,
  reportData,
  onExport
}) => {
  const [exportFormat, setExportFormat] = useState('pdf');
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={reportName || 'Test Report'} size="large">
      <div className="report-preview-modal">
        <div className="report-header">
          <div className="report-info">
            <div className="report-meta">
              <div className="meta-item">
                <span className="meta-label">Date:</span>
                <span className="meta-value">{reportData?.date || 'Not available'}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Device:</span>
                <span className="meta-value">{reportData?.device || 'Not available'}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Test Suite:</span>
                <span className="meta-value">{reportData?.testSuite || 'Not available'}</span>
              </div>
            </div>
            <div className="report-status">
              <div className={`status-badge ${reportData?.status || 'pending'}`}>
                {reportData?.status === 'success' ? 'Passed' : 
                 reportData?.status === 'error' ? 'Failed' : 
                 'Pending'}
              </div>
            </div>
          </div>
        </div>
        
        <div className="report-body">
          <h3>Test Results</h3>
          <div className="table-container">
            <table className="report-table">
              <thead>
                <tr>
                  <th>Test Name</th>
                  <th>Measured</th>
                  <th>Low Limit</th>
                  <th>High Limit</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                {reportData?.tests?.map((test, index) => (
                  <tr key={index} className={test.result}>
                    <td>{test.name}</td>
                    <td>{test.measured}</td>
                    <td>{test.lowLimit}</td>
                    <td>{test.highLimit}</td>
                    <td>
                      <span className={`result-badge ${test.result}`}>
                        {test.result}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {reportData?.spectrumImages?.length > 0 && (
            <div className="spectrum-images">
              <h3>Spectrum Images</h3>
              <div className="image-grid">
                {reportData.spectrumImages.map((image, index) => (
                  <div key={index} className="spectrum-image-card">
                    <div className="image-container">
                      <img src={image.url} alt={image.title} />
                    </div>
                    <div className="image-title">{image.title}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="modal-actions report-actions">
          <div className="export-options">
            <select 
              className="form-select" 
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value)}
            >
              <option value="pdf">PDF</option>
              <option value="csv">CSV</option>
              <option value="html">HTML</option>
            </select>
            <button 
              className="btn btn-secondary"
              onClick={() => onExport(exportFormat)}
            >
              <i className="bx bx-export"></i>
              Export
            </button>
          </div>
          <button className="btn btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ReportPreviewModal;