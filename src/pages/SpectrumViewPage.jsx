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

  // Markers state
  const [markers, setMarkers] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const [hoveredPoint, setHoveredPoint] = useState(null);
  
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

  // Add marker at specific x,y coordinates
  const addMarker = (x, y, frequency, power) => {
    const newMarker = {
      id: Date.now(), // Unique ID
      x,
      y,
      frequency,
      power
    };
    setMarkers([...markers, newMarker]);
    setActiveMarker(newMarker.id);
  };

  // Remove marker by ID
  const removeMarker = (id) => {
    setMarkers(markers.filter(marker => marker.id !== id));
    if (activeMarker === id) {
      setActiveMarker(null);
    }
  };

  // Convert canvas x position to frequency
  const xToFrequency = (x, canvas) => {
    const startFreq = parseFloat(settings.startFrequency);
    const stopFreq = parseFloat(settings.stopFrequency);
    const freqRange = stopFreq - startFreq;
    
    // Adjust for canvas padding
    const effectiveX = x - 50;
    const effectiveWidth = canvas.width - 50;
    
    const freq = startFreq + (effectiveX / effectiveWidth) * freqRange;
    return parseFloat(freq.toFixed(2));
  };

  // Convert canvas y position to power
  const yToPower = (y, canvas) => {
    const power = 20 - (y / canvas.height) * 120;
    return parseFloat(power.toFixed(2));
  };

  // Get a point on the spectrum line at the given x coordinate
  const getSpectrumPointAtX = (mouseX, canvas) => {
    // Use the exact x-coordinate from the mouse
    const x = mouseX;
    
    const baselineHeight = canvas.height * 0.85;
    const centerX = canvas.width / 2;
    const peakWidth = canvas.width * 0.02;
    const peakHeight = canvas.height * 0.7;
    const distFromCenter = Math.abs(x - centerX);
    
    let y;
    if (distFromCenter < peakWidth) {
      // Sharp central peak
      const peakFactor = (1 - distFromCenter / peakWidth);
      y = baselineHeight - (peakHeight * peakFactor * peakFactor);
    } else {
      // Regular noise pattern - use baseline with deterministic noise
      // Use x coordinate to seed the noise
      const noise = (Math.sin(x * 0.5) * 5) + (Math.cos(x * 0.2) * 3);
      y = baselineHeight + noise;
    }
    
    const frequency = xToFrequency(x, canvas);
    const power = yToPower(y, canvas);
    
    return { x, y, frequency, power };
  };
  
  // Find peak in the spectrum
  const findPeak = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Generate points for the entire spectrum
    let points = [];
    for (let x = 50; x < canvas.width; x++) {
      const { y, frequency, power } = getSpectrumPointAtX(x, canvas);
      points.push({ x, y, frequency, power });
    }
    
    // Sort by power (lowest y value = highest power)
    points.sort((a, b) => a.y - b.y);
    
    // Get the highest peak (first item in sorted array)
    const peak = points[0];
    
    // Get the canvas display dimensions for proper scaling
    const rect = canvas.getBoundingClientRect();
    const screenX = peak.x * (rect.width / canvas.width);
    const screenY = peak.y * (rect.height / canvas.height);
    
    // Add marker at the peak
    addMarker(screenX, screenY, peak.frequency, peak.power);
  };

  // Handle canvas click to add a marker - USING DOUBLE CLICK INSTEAD
  const handleCanvasClick = (e) => {
    // We're using double click instead, so this is empty
    // Keeping this method for compatibility
  };

  // Handle canvas double click to add a marker
  const handleCanvasDoubleClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Get the mouse position relative to the viewport
    const rect = canvas.getBoundingClientRect();
    
    // Calculate the exact position where user clicked in screen coordinates
    const clickX = e.clientX - rect.left;
    
    // Only add markers within the plotting area
    if (clickX >= 50 && clickX <= rect.width) {
      // Convert screen position to spectrum data
      const canvasX = clickX * (canvas.width / rect.width);
      
      // Calculate the Y position on the spectrum line for this X position
      const { y, frequency, power } = getSpectrumPointAtX(canvasX, canvas);
      
      // Add marker using screen coordinates for X (what user sees)
      // but calculated Y to ensure marker stays on the line
      addMarker(clickX, y * (rect.height / canvas.height), frequency, power);
    }
  };

  // Handle canvas mouse move for hover marker
  const handleCanvasMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Get the mouse position relative to the viewport
    const rect = canvas.getBoundingClientRect();
    
    // Get screen coordinates
    const mouseX = e.clientX - rect.left;
    
    // Only show hover marker within the plotting area
    if (mouseX >= 50 && mouseX <= rect.width) {
      // Convert screen X to canvas X for data calculations
      const canvasX = mouseX * (canvas.width / rect.width);
      
      // Get Y coordinate on the line
      const { y, frequency, power } = getSpectrumPointAtX(canvasX, canvas);
      
      // Convert canvas Y back to screen Y for display
      const screenY = y * (rect.height / canvas.height);
      
      // Use screen coordinates for display
      setHoveredPoint({ 
        x: mouseX, 
        y: screenY, 
        frequency, 
        power 
      });
    } else {
      setHoveredPoint(null);
    }
  };

  // Handle canvas mouse leave
  const handleCanvasMouseLeave = () => {
    setHoveredPoint(null);
  };
  
  // Draw mock spectrum data on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    
    // Get the canvas display dimensions
    const rect = canvas.getBoundingClientRect();
    const screenWidth = rect.width;
    const screenHeight = rect.height;
    const scaleX = screenWidth / width;
    const scaleY = screenHeight / height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Background - white
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);
    
    // Grid lines
    ctx.strokeStyle = '#E0E0E0';
    ctx.lineWidth = 1;
    
    // Draw dotted grid lines
    ctx.setLineDash([2, 2]);
    
    // Horizontal grid lines
    for (let i = 0; i <= 10; i++) {
      const y = i * (height / 10);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    // Vertical grid lines
    for (let i = 0; i <= 10; i++) {
      const x = i * (width / 10);
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    // Reset line dash
    ctx.setLineDash([]);
    
    // Generate points for the spectrum using the same algorithm our hover/click uses
    let points = [];
    for (let x = 0; x < width; x++) {
      const { y } = getSpectrumPointAtX(x, canvas);
      points.push({ x, y });
    }
    
    // Draw the spectrum line
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    
    // Style and draw the spectrum line
    ctx.strokeStyle = '#4267B2'; // Blueish color
    ctx.lineWidth = 1.5;
    ctx.stroke();
    
    // Draw markers - convert from screen coordinates to canvas coordinates
    markers.forEach(marker => {
      const isActive = marker.id === activeMarker;
      
      // Convert screen coordinates to canvas coordinates
      const canvasX = marker.x / scaleX;
      const canvasY = marker.y / scaleY;
      
      // Draw marker circle
      ctx.beginPath();
      ctx.arc(canvasX, canvasY, isActive ? 6 : 4, 0, 2 * Math.PI);
      ctx.fillStyle = '#e74c3c'; // Green marker
      ctx.fill();
      
      // Draw vertical line from marker to x-axis
      ctx.beginPath();
      ctx.setLineDash([3, 2]);
      ctx.moveTo(canvasX, canvasY);
      ctx.lineTo(canvasX, height);
      ctx.strokeStyle = '#e74c3c';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Draw marker label
      ctx.fillStyle = '#000000';
      ctx.font = '12px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(`M${markers.indexOf(marker) + 1}`, canvasX + 8, canvasY - 8);
    });
    
    // Draw hover marker - convert from screen coordinates to canvas coordinates
    if (hoveredPoint) {
      const canvasX = hoveredPoint.x / scaleX;
      const canvasY = hoveredPoint.y / scaleY;
      
      // Draw vertical line first (behind the marker)
      ctx.beginPath();
      ctx.setLineDash([2, 2]);
      ctx.moveTo(canvasX, 0);
      ctx.lineTo(canvasX, height);
      ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Draw marker circle
      ctx.beginPath();
      ctx.arc(canvasX, canvasY, 4, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(255, 0, 0, 0.7)'; // Semi-transparent red
      ctx.fill();
      
      // Draw hover info box
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(canvasX + 10, canvasY - 40, 150, 35);
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(`Freq: ${hoveredPoint.frequency} MHz`, canvasX + 15, canvasY - 25);
      ctx.fillText(`Power: ${hoveredPoint.power} dBm`, canvasX + 15, canvasY - 10);
    }
    
  }, [settings, viewMode, markers, activeMarker, hoveredPoint]); // Redraw when these change

  return (
    <div className="page-container">
      <div className="section-header">
        <h1>Spectrum View</h1>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={findPeak}>
             Peak Search
          </button>
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
              onMouseMove={handleCanvasMouseMove}
              onMouseLeave={handleCanvasMouseLeave}
              onDoubleClick={handleCanvasDoubleClick}
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
                <div className="marker-controls">
                  <p className="marker-instructions">
                    Double-click on the spectrum to add a new marker
                  </p>
                </div>
                
                {markers.length === 0 ? (
                  <p className="placeholder-text">No markers added yet. Double-click on the spectrum to add markers.</p>
                ) : (
                  <div className="marker-table">
                    <table className="markers-table">
                      <thead>
                        <tr>
                          <th>No.</th>
                          <th>Frequency (MHz)</th>
                          <th>Power (dBm)</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {markers.map((marker, index) => (
                          <tr 
                            key={marker.id} 
                            className={marker.id === activeMarker ? 'active-marker' : ''}
                            onClick={() => setActiveMarker(marker.id)}
                          >
                            <td>
                              <span className="marker-color" style={{ backgroundColor: '#00ff00' }}></span>
                              <span>M{index + 1}</span>
                            </td>
                            <td>{marker.frequency}</td>
                            <td>{marker.power}</td>
                            <td className="delete-cell">
                              <button 
                                className="delete-marker" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeMarker(marker.id);
                                }}
                              >
                                <i className="bx bx-x"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpectrumViewPage;