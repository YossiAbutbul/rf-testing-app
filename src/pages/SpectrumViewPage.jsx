import React, { useState, useEffect, useRef } from 'react';
import '../styles/pages/spectrumview.css';

const SpectrumViewPage = () => {
  const canvasRef = useRef(null);
  const [viewMode, setViewMode] = useState('real-time');
  const [configTab, setConfigTab] = useState('configurations');
  
  // Spectrum analyzer settings
  const [settings, setSettings] = useState({
    startFrequency: '880',
    stopFrequency: '930',
    resolutionBW: '1',
    resolutionVBW: '3',
    referenceLevel: '20',
    detectorType: 'Peak Detector'
  });
  
  // Update settings handler
  const handleSettingChange = (setting, value) => {
    setSettings({
      ...settings,
      [setting]: value
    });
  };
  
  // Capture spectrum image
  const handleCaptureImage = () => {
    console.log('Capturing spectrum image...');
    // In a real app, this would save the current spectrum view
  };
  
  // Draw mock spectrum data on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);
    
    // Grid lines
    ctx.strokeStyle = '#E0E0E0';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = i * (height / 5);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
      
      // Y-axis labels (dBm)
      ctx.fillStyle = '#666';
      ctx.font = '12px Arial';
      ctx.textAlign = 'right';
      ctx.fillText(`${-20 * i}`, 30, y + 15);
    }
    
    // Vertical grid lines
    for (let i = 0; i <= 5; i++) {
      const x = 50 + (i * (width - 50) / 5);
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
      
      // X-axis labels (MHz)
      const freqValue = Math.round(880 + (i * 10));
      ctx.fillStyle = '#666';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`${freqValue}.0`, x, height - 5);
    }
    
    // Draw a simulated spectrum peak
    ctx.beginPath();
    ctx.moveTo(50, height - 20);
    
    // Create random noise pattern
    for (let x = 50; x < width; x += 1) {
      // Base noise level
      let y = height - 20 - (Math.random() * 5);
      
      // Add the central peak around x = 475 (middle of the canvas)
      const peakX = (width + 50) / 2;
      const distance = Math.abs(x - peakX);
      if (distance < 50) {
        // Create a sharp peak that reaches to about -20 dBm
        y = height - 80 - (50 - distance) * 3.2 - (Math.random() * 3);
      }
      
      ctx.lineTo(x, y);
    }
    
    // Finish the path at the right edge
    ctx.lineTo(width, height - 20);
    
    // Style and draw the spectrum line
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 2;
    ctx.stroke();
    
  }, [settings, viewMode]); // Redraw when settings or view mode changes

  return (
    <div className="page-container">
      <div className="section-header">
        <h1>Spectrum View</h1>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={handleCaptureImage}>
            <i className="bx bx-camera btn-icon"></i>
          </button>
        </div>
      </div>
      
      <div className="spectrum-container">
        <div className="spectrum-view-panel">
          <div className="view-mode-tabs">
            <div 
              className={`view-mode-tab ${viewMode === 'real-time' ? 'active' : ''}`}
              onClick={() => setViewMode('real-time')}
            >
              Real-Time
            </div>
            <div 
              className={`view-mode-tab ${viewMode === 'max-hold' ? 'active' : ''}`}
              onClick={() => setViewMode('max-hold')}
            >
              Max Hold
            </div>
          </div>
          
          <div className="spectrum-canvas-container">
            <canvas 
              ref={canvasRef} 
              width={800} 
              height={400}
              className="spectrum-canvas"
            />
            
            {/* Y-axis labels */}
            <div className="y-axis-labels">
              <div className="y-label">20</div>
              <div className="y-label">0</div>
              <div className="y-label">-20</div>
              <div className="y-label">-40</div>
              <div className="y-label">-60</div>
              <div className="y-label">-80</div>
              <div className="y-label">-100</div>
            </div>
            
            {/* X-axis labels */}
            <div className="x-axis-labels">
              <div className="x-label">880.0</div>
              <div className="x-label">885.0</div>
              <div className="x-label">890.0</div>
              <div className="x-label">895.0</div>
              <div className="x-label">900.0</div>
              <div className="x-label">905.0</div>
              <div className="x-label">910.0</div>
              <div className="x-label">915.0</div>
              <div className="x-label">920.0</div>
              <div className="x-label">925.0</div>
              <div className="x-label">930.0</div>
            </div>
          </div>
        </div>
        
        <div className="spectrum-settings-panel">
          <div className="settings-tabs">
            <div 
              className={`settings-tab ${configTab === 'configurations' ? 'active' : ''}`}
              onClick={() => setConfigTab('configurations')}
            >
              Configurations
            </div>
            <div 
              className={`settings-tab ${configTab === 'markers' ? 'active' : ''}`}
              onClick={() => setConfigTab('markers')}
            >
              Markers
            </div>
          </div>
          
          <div className="settings-content">
            {configTab === 'configurations' && (
              <div className="configurations-form">
                <div className="form-group">
                  <label className="form-label">Start Frequency</label>
                  <div className="input-with-unit">
                    <input 
                      type="text" 
                      className="form-input" 
                      value={settings.startFrequency}
                      onChange={(e) => handleSettingChange('startFrequency', e.target.value)}
                    />
                    <div className="unit-selector">
                      <select className="form-select">
                        <option value="MHz">MHz</option>
                        <option value="GHz">GHz</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Stop Frequency</label>
                  <div className="input-with-unit">
                    <input 
                      type="text" 
                      className="form-input" 
                      value={settings.stopFrequency}
                      onChange={(e) => handleSettingChange('stopFrequency', e.target.value)}
                    />
                    <div className="unit-selector">
                      <select className="form-select">
                        <option value="MHz">MHz</option>
                        <option value="GHz">GHz</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Resolution BW</label>
                  <div className="input-with-unit">
                    <input 
                      type="text" 
                      className="form-input" 
                      value={settings.resolutionBW}
                      onChange={(e) => handleSettingChange('resolutionBW', e.target.value)}
                    />
                    <div className="unit-selector">
                      <select className="form-select">
                        <option value="MHz">MHz</option>
                        <option value="kHz">kHz</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Resolution VBW</label>
                  <div className="input-with-unit">
                    <input 
                      type="text" 
                      className="form-input" 
                      value={settings.resolutionVBW}
                      onChange={(e) => handleSettingChange('resolutionVBW', e.target.value)}
                    />
                    <div className="unit-selector">
                      <select className="form-select">
                        <option value="MHz">MHz</option>
                        <option value="kHz">kHz</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Reference Level</label>
                  <div className="input-with-unit">
                    <input 
                      type="text" 
                      className="form-input" 
                      value={settings.referenceLevel}
                      onChange={(e) => handleSettingChange('referenceLevel', e.target.value)}
                    />
                    <div className="unit-selector">
                      <select className="form-select">
                        <option value="dBm">dBm</option>
                        <option value="dBW">dBW</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Detector Type</label>
                  <select 
                    className="form-select" 
                    value={settings.detectorType}
                    onChange={(e) => handleSettingChange('detectorType', e.target.value)}
                  >
                    <option value="Peak Detector">Peak Detector</option>
                    <option value="RMS Detector">RMS Detector</option>
                    <option value="Average Detector">Average Detector</option>
                  </select>
                </div>
              </div>
            )}
            
            {configTab === 'markers' && (
              <div className="markers-form">
                <p className="placeholder-text">Marker configuration options will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpectrumViewPage;