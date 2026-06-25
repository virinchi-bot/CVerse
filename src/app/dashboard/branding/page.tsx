'use client';

import { useState } from 'react';

const contentTypes = [
  { id: 'linkedin_post', label: 'LinkedIn Post', desc: 'Share your work authentically' },
  { id: 'github_bio', label: 'GitHub Bio', desc: '160 char punchy bio' },
  { id: 'about_me', label: 'About Me', desc: 'Portfolio about section' },
  { id: 'elevator_pitch', label: 'Elevator Pitch', desc: '30 second intro' },
  { id: 'launch_post', label: 'Launch Post', desc: 'Build in public update' },
];

export default function Branding() {
  const [selected, setSelected] = useState('linkedin_post');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    if (!input.trim()) return alert('Describe yourself or your project first');
    setLoading(true);
    try {
      const res = await fetch('/api/branding/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: selected, input }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data.content);
    } catch (err: any) {
      alert('Failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#4B5563', marginBottom: '8px' }}>AI Tool</p>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '36px', fontWeight: 400, letterSpacing: '-0.02em', color: '#EAEAEA', margin: 0 }}>
          LinkedIn <em style={{ color: '#7C8CFF' }}>Branding.</em>
        </h1>
        <p style={{ fontSize: '14px', color: '#6B7280', marginTop: '8px' }}>
          Generate authentic personal branding content. No corporate cringe.
        </p>
      </div>

      <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>

        {/* Left — Input */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Content Type */}
          <div style={{ background: '#151821', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '24px' }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#4B5563', marginBottom: '16px' }}>Content Type</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {contentTypes.map(t => (
                <button key={t.id} onClick={() => setSelected(t.id)} style={{
                  padding: '12px 16px',
                  background: selected === t.id ? 'rgba(124,140,255,0.12)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${selected === t.id ? 'rgba(124,140,255,0.35)' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: '6px', cursor: 'pointer',
                  textAlign: 'left', transition: 'all 0.2s ease',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <span style={{ fontSize: '13px', color: selected === t.id ? '#7C8CFF' : '#EAEAEA' }}>{t.label}</span>
                  <span style={{ fontSize: '11px', color: '#4B5563' }}>{t.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div style={{ background: '#151821', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '24px' }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#4B5563', marginBottom: '12px' }}>
              Your Info
            </p>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Describe yourself, your skills, projects, experience, or what you want to post about..."
              rows={6}
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

          <button onClick={generate} disabled={loading} style={{
            width: '100%', padding: '14px',
            background: loading ? 'rgba(124,140,255,0.4)' : '#7C8CFF',
            border: 'none', borderRadius: '8px',
            color: '#0F1115', fontSize: '13px',
            fontWeight: 600, letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}>
            {loading ? 'Generating...' : 'Generate Content →'}
          </button>
        </div>

        {/* Right — Result */}
        <div>
          {result ? (
            <div style={{ background: '#151821', border: '1px solid rgba(124,140,255,0.15)', borderRadius: '10px', padding: '24px', height: '100%', boxSizing: 'border-box' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#7C8CFF', margin: 0 }}>
                  Generated Content
                </p>
                <button onClick={copy} style={{
                  padding: '6px 16px',
                  background: copied ? 'rgba(74,222,128,0.1)' : 'rgba(124,140,255,0.1)',
                  border: `1px solid ${copied ? 'rgba(74,222,128,0.3)' : 'rgba(124,140,255,0.3)'}`,
                  borderRadius: '4px',
                  color: copied ? '#4ade80' : '#7C8CFF',
                  fontSize: '11px', cursor: 'pointer',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                }}>
                  {copied ? 'Copied ✓' : 'Copy'}
                </button>
              </div>
              <div style={{
                fontSize: '14px', color: '#EAEAEA',
                lineHeight: 1.8, whiteSpace: 'pre-wrap',
              }}>
                {result}
              </div>
              <button onClick={generate} disabled={loading} style={{
                marginTop: '20px', width: '100%', padding: '11px',
                background: 'transparent',
                border: '1px solid rgba(124,140,255,0.2)',
                borderRadius: '6px', color: '#7C8CFF',
                fontSize: '12px', cursor: 'pointer',
                letterSpacing: '0.1em', textTransform: 'uppercase',
              }}>
                Regenerate →
              </button>
            </div>
          ) : (
            <div style={{
              background: '#151821', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '10px', padding: '48px 32px',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              height: '100%', boxSizing: 'border-box', textAlign: 'center',
            }}>
              <p style={{ fontSize: '32px', marginBottom: '16px' }}>✍️</p>
              <p style={{ fontSize: '14px', color: '#4B5563', lineHeight: 1.6 }}>
                Select a content type, describe yourself,<br />and generate authentic branding content.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}