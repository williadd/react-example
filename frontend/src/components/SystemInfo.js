import React, { useState, useEffect } from 'react';
import './SystemInfo.css';

function SystemInfo() {
  const [systemInfo, setSystemInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSystemInfo = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/system-info');
      if (!response.ok) {
        throw new Error('Failed to fetch system info');
      }
      const data = await response.json();
      setSystemInfo(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSystemInfo();
  }, []);

  if (loading) {
    return (
      <div className="system-info-card">
        <div className="loading">Loading system information...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="system-info-card">
        <div className="error">
          <p>Error: {error}</p>
          <button onClick={fetchSystemInfo}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="system-info-card">
      <h2>System Information</h2>
      
      <div className="info-grid">
        <div className="info-item">
          <span className="label">Hostname</span>
          <span className="value">{systemInfo.hostname}</span>
        </div>
        
        <div className="info-item">
          <span className="label">Platform</span>
          <span className="value">{systemInfo.platform}</span>
        </div>
        
        <div className="info-item">
          <span className="label">Architecture</span>
          <span className="value">{systemInfo.architecture}</span>
        </div>
        
        <div className="info-item">
          <span className="label">Processor</span>
          <span className="value">{systemInfo.processor || 'N/A'}</span>
        </div>
        
        <div className="info-item">
          <span className="label">Python Version</span>
          <span className="value">{systemInfo.python_version}</span>
        </div>
        
        <div className="info-item">
          <span className="label">CPU Cores</span>
          <span className="value">{systemInfo.cpu_count}</span>
        </div>
        
        <div className="info-item">
          <span className="label">CPU Usage</span>
          <span className="value">{systemInfo.cpu_percent}%</span>
        </div>
        
        <div className="info-item">
          <span className="label">Total Memory</span>
          <span className="value">{systemInfo.memory_total_gb} GB</span>
        </div>
        
        <div className="info-item">
          <span className="label">Memory Usage</span>
          <span className="value">{systemInfo.memory_used_percent}%</span>
        </div>
        
        <div className="info-item full-width">
          <span className="label">Platform Version</span>
          <span className="value small">{systemInfo.platform_version}</span>
        </div>
      </div>
      
      <div className="timestamp">
        Last updated: {new Date(systemInfo.timestamp).toLocaleString()}
      </div>
      
      <button className="refresh-btn" onClick={fetchSystemInfo}>
        Refresh
      </button>
    </div>
  );
}

export default SystemInfo;
