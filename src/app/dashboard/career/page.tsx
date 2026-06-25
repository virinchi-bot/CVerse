'use client';

import { useState } from 'react';

const workStyles = [
  'Solo builder — I like working alone',
  'Team player — I prefer collaboration',
  'Freelancer — I want client work',
  'Startup minded — I want to build products',
  'Corporate — I want stable job',
  'Content creator — I want to teach/share',
];

export default function CVDirection() {
  const [skills, setSkills] = useState('');
  const [projects, setProjects] = useState('');
  const [interests, setInterests] = useState('');
  const [workStyle, setWorkStyle] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const analyze = async () => {
    if (!skills || !workStyle) return alert('Fill in skills and work style at minimum');
    setLoading(true);
    try {
      const res = await fetch('/api/CV/direction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skills, projects, interests, workStyle }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (err: any) {
      alert('Failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#4B5563', marginBottom: '8px' }}>AI Tool</p>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '36px', fontWeight: 400, letterSpacing: '-0.02em', color: '#EAEAEA', margin: 0 }}>
          CV <em style={{ color: '#7C8CFF' }}>Direction.</em>
        </h1>
        <p style={{ fontSize: '14px', color: '#6B7280', marginTop: '8px' }}>
          AI analyzes your profile and suggests the best CV paths. Honest, specific, personalized.
        </p>
      </div>

      <div className="two-col" style={{ display: 'grid', gridTemplateColumns: result ? '1fr 1.6fr' : '600px 1fr', gap: '32px' }}>

        {/* Input */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          <div style={{ background: '#151821', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '24px' }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#4B5563', marginBottom: '12px' }}>Your Skills</p>
            <textarea
              value={skills}
              onChange={e => setSkills(e.target.value)}
              placeholder="React, Next.js, TypeScript, Python, UI design..."
              rows={3}
              style={{
                width: '100%', padding: '12px 16px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '6px', color: '#EAEAEA',
                fontSize: '13px', outline: 'none',
                resize: 'vertical', fontFamily: "'DM Sans', sans-serif",
                lineHeight: 1.6, boxSizing: 'border-box',
              }}
              onFocus={e => (e.target.style.borderColor = '#7C8CFF')}
              onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
            />
          </div>

          <div style={{ background: '#151821', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '24px' }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#4B5563', marginBottom: '12px' }}>Your Projects</p>
            <textarea
              value={projects}
              onChange={e => setProjects(e.target.value)}
              placeholder="CVerse — AI resume platform, Portfolio site, College portal..."
              rows={3}
              style={{
                width: '100%', padding: '12px 16px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '6px', color: '#EAEAEA',
                fontSize: '13px', outline: 'none',
                resize: 'vertical', fontFamily: "'DM Sans', sans-serif",
                lineHeight: 1.6, boxSizing: 'border-box',
              }}
              onFocus={e => (e.target.style.borderColor = '#7C8CFF')}
              onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
            />
          </div>

          <div style={{ background: '#151821', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '24px' }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#4B5563', marginBottom: '12px' }}>Interests</p>
            <textarea
              value={interests}
              onChange={e => setInterests(e.target.value)}
              placeholder="AI, content creation, startups, design, teaching..."
              rows={2}
              style={{
                width: '100%', padding: '12px 16px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '6px', color: '#EAEAEA',
                fontSize: '13px', outline: 'none',
                resize: 'vertical', fontFamily: "'DM Sans', sans-serif",
                lineHeight: 1.6, boxSizing: 'border-box',
              }}
              onFocus={e => (e.target.style.borderColor = '#7C8CFF')}
              onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
            />
          </div>

          <div style={{ background: '#151821', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '24px' }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#4B5563', marginBottom: '16px' }}>Work Style</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {workStyles.map(w => (
                <button key={w} onClick={() => setWorkStyle(w)} style={{
                  padding: '10px 14px', textAlign: 'left',
                  background: workStyle === w ? 'rgba(124,140,255,0.12)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${workStyle === w ? 'rgba(124,140,255,0.35)' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: '6px',
                  color: workStyle === w ? '#7C8CFF' : '#9CA3AF',
                  fontSize: '12px', cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}>{w}</button>
              ))}
            </div>
          </div>

          <button onClick={analyze} disabled={loading} style={{
            width: '100%', padding: '14px',
            background: loading ? 'rgba(124,140,255,0.4)' : '#7C8CFF',
            border: 'none', borderRadius: '8px',
            color: '#0F1115', fontSize: '13px',
            fontWeight: 600, letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}>
            {loading ? 'Analyzing...' : 'Find My Direction →'}
          </button>
        </div>

        {/* Results */}
        {result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Top path */}
            <div style={{
              background: 'rgba(124,140,255,0.08)',
              border: '1px solid rgba(124,140,255,0.25)',
              borderRadius: '10px', padding: '24px',
            }}>
              <p style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#7C8CFF', marginBottom: '8px' }}>Best Match</p>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '28px', color: '#EAEAEA', margin: '0 0 12px' }}>
                {result.topPath}
              </h2>
              <p style={{ fontSize: '13px', color: '#9CA3AF', lineHeight: 1.6, margin: 0 }}>{result.topPathReason}</p>
            </div>

            {/* All paths */}
            <div style={{ background: '#151821', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '24px' }}>
              <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#4B5563', marginBottom: '16px' }}>All Paths</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {result.paths.map((p: any, i: number) => (
                  <div key={i} style={{
                    padding: '16px',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '8px',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <p style={{ fontSize: '14px', fontWeight: 500, color: '#EAEAEA', margin: 0 }}>{p.title}</p>
                      <span style={{ fontSize: '13px', color: '#7C8CFF', fontFamily: "'DM Serif Display', serif" }}>{p.match}%</span>
                    </div>
                    <div style={{ height: '2px', background: 'rgba(255,255,255,0.06)', borderRadius: '1px', marginBottom: '10px' }}>
                      <div style={{ width: `${p.match}%`, height: '100%', background: '#7C8CFF', borderRadius: '1px' }} />
                    </div>
                    <p style={{ fontSize: '12px', color: '#6B7280', lineHeight: 1.5, margin: '0 0 8px' }}>{p.description}</p>
                    <div style={{ display: 'flex', gap: '16px' }}>
                      <span style={{ fontSize: '11px', color: '#4B5563' }}>⏱ {p.timeToReady}</span>
                      <span style={{ fontSize: '11px', color: '#4B5563' }}>💰 {p.incomeRange}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Personality */}
            <div style={{ background: '#151821', border: '1px solid rgba(200,162,122,0.15)', borderRadius: '10px', padding: '24px' }}>
              <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C8A27A', marginBottom: '12px' }}>Personality Insights</p>
              <p style={{ fontSize: '13px', color: '#9CA3AF', lineHeight: 1.7, margin: 0 }}>{result.personalityInsights}</p>
            </div>

            {/* Reality check */}
            <div style={{ background: '#151821', border: '1px solid rgba(248,113,113,0.15)', borderRadius: '10px', padding: '24px' }}>
              <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#f87171', marginBottom: '12px' }}>Reality Check</p>
              <p style={{ fontSize: '13px', color: '#9CA3AF', lineHeight: 1.7, margin: 0 }}>{result.realityCheck}</p>
            </div>

            {/* Next actions */}
            <div style={{ background: '#151821', border: '1px solid rgba(74,222,128,0.15)', borderRadius: '10px', padding: '24px' }}>
              <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#4ade80', marginBottom: '16px' }}>Next Actions</p>
              {result.nextActions.map((a: string, i: number) => (
                <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '10px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '10px', color: '#4ade80', marginTop: '3px', flexShrink: 0 }}>0{i + 1}</span>
                  <span style={{ fontSize: '13px', color: '#9CA3AF', lineHeight: 1.5 }}>{a}</span>
                </div>
              ))}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}