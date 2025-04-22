import React, { useState } from 'react';
import '../styles/pages/reports.css';

const ReportsPage = () => {
  const [selectedProject, setSelectedProject] = useState('Sonata 2 IL');
  
  // Mock reports data based on screenshot
  const reportsData = [
    {
      id: 1,
      name: 'Sonata LoRa FDR Ver. 1.2',
      deviceType: 'Sonata 2 IL',
      date: '01.04.2025, 17:35',
      testsCount: 10,
      passedTests: 10,
      status: 'success'
    },
    {
      id: 2,
      name: 'Sonata LoRa CDR Ver. 1.0',
      deviceType: 'Sonata 2 IL',
      date: '20.04.2025, 16:47',
      testsCount: 10,
      passedTests: 7,
      status: 'pending'
    },
    {
      id: 3,
      name: 'Sonata LoRa PDR Ver 1.5',
      deviceType: 'Sonata 2 IL',
      date: '14.03.2025, 10:22',
      testsCount: 10,
      passedTests: 0,
      status: 'error'
    }
  ];
  
  // Function to get status icon based on report status
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
  
  // Handle viewing report
  const handleViewReport = (reportId) => {
    console.log(`Viewing report ${reportId}`);
    // In a real app, this would open the report
  };
  
  // Handle exporting report
  const handleExportReport = (reportId, format) => {
    console.log(`Exporting report ${reportId} as ${format}`);
    // In a real app, this would export the report in the specified format
  };
  
  // Handle downloading report
  const handleDownloadReport = (reportId) => {
    console.log(`Downloading report ${reportId}`);
    // In a real app, this would download the report
  };

  return (
    <div className="page-container">
      <div className="section-header">
        <h1>Test Reports</h1>
      </div>
      
      <div className="project-selector">
        <label className="select-label">Select Project</label>
        <select 
          className="form-select project-select" 
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
        >
          <option value="Sonata 2 IL">Sonata 2 IL</option>
          <option value="Sonata 2 US">Sonata 2 US</option>
          <option value="CAT-M 2">CAT-M 2</option>
        </select>
      </div>
      
      <div className="reports-card">
        <h2 className="reports-card-title">Recent Test Report</h2>
        
        <div className="table-container">
          <table className="reports-table">
            <thead>
              <tr>
                <th className="status-column">Status</th>
                <th className="report-name-column">Report Name</th>
                <th className="device-type-column">Device Type</th>
                <th className="date-column">Date</th>
                <th className="tests-column">Tests Passes</th>
                <th className="actions-column">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reportsData.map(report => (
                <tr key={report.id} className={`report-row ${report.status}`}>
                  <td className="status-cell">
                    {getStatusIcon(report.status)}
                  </td>
                  <td className="report-name-cell">{report.name}</td>
                  <td className="device-type-cell">{report.deviceType}</td>
                  <td className="date-cell">{report.date}</td>
                  <td className="tests-cell">
                    {report.passedTests} out of {report.testsCount}
                  </td>
                  <td className="actions-cell">
                    <div className="report-actions">
                      <button 
                        className="action-button" 
                        title="View Report" 
                        onClick={() => handleViewReport(report.id)}
                      >
                        <i className="bx bx-refresh"></i>
                      </button>
                      <button 
                        className="action-button" 
                        title="Export Report" 
                        onClick={() => handleExportReport(report.id, 'pdf')}
                      >
                        <i className="bx bx-file"></i>
                      </button>
                      <button 
                        className="action-button" 
                        title="Download Report" 
                        onClick={() => handleDownloadReport(report.id)}
                      >
                        <i className="bx bx-download"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {reportsData.length === 0 && (
          <div className="no-reports-message">
            <i className="bx bx-file-blank empty-icon"></i>
            <p>No reports found for the selected project.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;