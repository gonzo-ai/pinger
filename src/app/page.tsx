'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { pingProjectsAction } from './actions';
import type { PingResult } from '@/lib/ping';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [lastPing, setLastPing] = useState<string | null>(null);
  const [results, setResults] = useState<PingResult[]>([]);
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  }

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

  useEffect(() => { fetchStatus(); }, []);

  const onlineCount = results.filter(r => r.success).length;

  return (
    <div className="page">
      <header className="site-header">
        <div className="header-inner">
          <div className="logo">
            <div className="logo-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
              </svg>
            </div>
            <span className="logo-text">Supabase Pinger</span>
          </div>
          <button onClick={handleLogout} className="logout-btn" title="Log out">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            </button>
            <button className={`ping-btn ${loading ? 'loading' : ''}`} onClick={fetchStatus} disabled={loading}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.5 2v6h-6M2.13 15.57a9 9 0 1 0 3.84-10.36L2 8"/>
            </svg>
            {loading ? 'Pinging…' : 'Ping Now'}
          </button>
        </div>
      </header>

      <main className="main">
        <div className="hero">
          <div className="hero-left">
            <h1 className="hero-title">Project Status</h1>
            <p className="hero-sub">Keeping free-tier Supabase projects alive automatically.</p>
          </div>
          {results.length > 0 && (
            <div className="stats">
              <div className="stat">
                <span className="stat-value">{onlineCount}</span>
                <span className="stat-label">Online</span>
              </div>
              <div className="stat-divider"/>
              <div className="stat">
                <span className="stat-value">{results.length}</span>
                <span className="stat-label">Total</span>
              </div>
              {lastPing && (
                <>
                  <div className="stat-divider"/>
                  <div className="stat">
                    <span className="stat-value">{new Date(lastPing).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    <span className="stat-label">Last ping</span>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {loading && results.length === 0 ? (
          <div className="skeleton-grid">
            {[1,2,3,4].map(i => <div key={i} className="skeleton-card"><div className="sk-line short"/><div className="sk-line"/><div className="sk-line medium"/></div>)}
          </div>
        ) : results.length === 0 ? (
          <div className="empty">
            <div className="empty-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <p className="empty-title">No projects configured</p>
            <p className="empty-sub">Add SUPABASE_1_URL and SUPABASE_1_KEY to your environment variables.</p>
          </div>
        ) : (
          <div className="grid">
            {results.map((project, index) => (
              <div key={index} className={`card ${!loading && (project.success ? 'card-online' : 'card-error')}`}>
                <div className="card-top">
                  <div className="card-name">{project.name}</div>
                  <div className={`badge ${loading ? 'badge-pinging' : project.success ? 'badge-online' : 'badge-error'}`}>
                    <span className="badge-dot"/>
                    {loading ? 'Checking' : project.success ? 'Online' : 'Failed'}
                  </div>
                </div>
                <div className="card-url">{project.url.replace('https://', '')}</div>
                {project.success && (
                  <div className="card-checks">
                    <span className="check">✓ REST API</span>
                    <span className="check">✓ Auth</span>
                  </div>
                )}
                {project.error && (
                  <div className="card-error-msg">⚠ {project.error}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
