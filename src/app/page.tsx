'use client';

import { useState, useEffect } from 'react';
import { pingProjectsAction } from './actions';
import type { PingResult } from '@/lib/ping';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [lastPing, setLastPing] = useState<string | null>(null);
  const [results, setResults] = useState<PingResult[]>([]);

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const response = await pingProjectsAction();
      setResults(response.results);
      setLastPing(response.timestamp);
    } catch (error) {
      console.error('Error fetching ping status:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <main className="container">
      <div className="header">
        <h1>Supabase Pinger</h1>
        <p>Keeping your free-tier projects alive automatically.</p>
        {lastPing && (
          <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#6366f1' }}>
            Last pinged: {new Date(lastPing).toLocaleString()}
          </p>
        )}
      </div>

      {loading && results.length === 0 ? (
        <div className="empty-state">
          Loading your active projects...
        </div>
      ) : results.length === 0 ? (
        <div className="empty-state">
          <h3>No projects configured</h3>
          <p>Please add SUPABASE_1_URL and SUPABASE_1_KEY to your environment variables.</p>
        </div>
      ) : (
        <div className="dashboard">
          {results.map((project, index) => (
            <div key={index} className="card">
              <div className="card-header">
                <span className="card-title">{project.name}</span>
                <div className="status">
                  <div
                    className={`status-dot ${loading ? 'pinging' : project.success ? 'success' : 'error'}`}
                  ></div>
                  {loading ? 'Pinging...' : project.success ? 'Online' : 'Failed'}
                </div>
              </div>
              <div className="card-body">
                <div className="card-meta">{project.url.replace('https://', '')}</div>
                {project.success && <span className="tag">REST API</span>}
                {project.success && <span className="tag">Auth Check</span>}
                {project.error && (
                  <div className="error-msg">
                    Error: {project.error}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="action-bar">
        <button 
          className={`btn ${loading ? 'loading' : ''}`} 
          onClick={fetchStatus} 
          disabled={loading}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.5 2v6h-6M2.13 15.57a9 9 0 1 0 3.84-10.36L2 8" />
          </svg>
          {loading ? 'Pinging...' : 'Ping Now'}
        </button>
      </div>
    </main>
  );
}
