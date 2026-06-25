'use client';

import { useState } from 'react';

const tones = ['Professional', 'Casual & Friendly', 'Bold & Confident', 'Minimal & Technical'];

export default function PortfolioGenerator() {
  const [form, setForm] = useState({ name: '', role: '', skills: '', projects: '', experience: '' });
  const [tone, setTone] = useState('Professional');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState('');

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const generate = async () => {
    if (!form.name || !form.role || !form.skills) return alert('Fill in name, role and skills');
    setLoading(true);
    try {
      const res = await fetch('/api/portfolio/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, tone }),
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

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  const inputStyle = {
    width: '100%', padding: '12px 16px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '6px', color: '#EAEAEA',
    fontSize: '13px', outline: 'none',
    fontFamily: "'DM Sans', sans-serif",
    lineHeight: 1.6, boxSizing: 'border-box' as const,
    transition: 'border 0.2s ease',
  };

  const labelStyle = {
    fontSize: '11px', letterSpacing: '0.15em',
    textTransform: 'uppercase' as const,
    color: '#4B5563', marginBottom: '8px', display: 'block' as const,
  };

  const CopyBtn = ({ text, id }: { text: string; id: string }) => (
    <button onClick={() => copy(text, id)} style={{
      padding: '4px 12px',
      background: copied === id ? 'rgba(74,222,128,0.1)' : 'rgba(124,140,255,0.1)',
      border: `1px solid ${copied === id ? 'rgba(74,222,128,0.3)' : 'rgba(124,140,255,0.2)'}`,
      borderRadius: '4px',
      color: copied === id ? '#4ade80' : '#7C8CFF',
      fontSize: '10px', cursor: 'pointer',
      letterSpacing: '0.1em', textTransform: 'uppercase' as const,
    }}>
      {copied === id ? 'Copied ✓' : 'Copy'}
    </button>
  );

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#4B5563', marginBottom: '8px' }}>AI Tool</p>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '36px', fontWeight: 400, letterSpacing: '-0.02em', color: '#EAEAEA', margin: 0 }}>
          Portfolio <em style={{ color: '#7C8CFF' }}>Generator.</em>
        </h1>
        <p style={{ fontSize: '14px', color: '#6B7280', marginTop: '8px' }}>
          Auto-generate your complete portfolio content from your data.
        </p>
      </div>

      <div className="two-col" style={{ display: 'grid', gridTemplateColumns: result ? '1fr 1.6fr' : '600px 1fr', gap: '32px' }}>

        {/* Input */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          <div style={{ background: '#151821', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

            <div>
              <label style={labelStyle}>Full Name</label>
              <input type="text" value={form.name} onChange={e => update('name', e.target.value)}
                placeholder=" Buddy" style={inputStyle}
                onFocus={e => (e.target.style.borderColor = '#7C8CFF')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
              />
            </div>

            <div>
              <label style={labelStyle}>Role / Title</label>
              <input type="text" value={form.role} onChange={e => update('role', e.target.value)}
                placeholder="Full Stack Developer & AI Builder" style={inputStyle}
                onFocus={e => (e.target.style.borderColor = '#7C8CFF')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
              />
            </div>

            <div>
              <label style={labelStyle}>Skills</label>
              <input type="text" value={form.skills} onChange={e => update('skills', e.target.value)}
                placeholder="React, Next.js, TypeScript, Supabase, AI APIs..." style={inputStyle}
                onFocus={e => (e.target.style.borderColor = '#7C8CFF')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
              />
            </div>

            <div>
              <label style={labelStyle}>Projects</label>
              <textarea value={form.projects} onChange={e => update('projects', e.target.value)}
                placeholder="CVerse — AI resume platform&#10;KNRCER Portal — College portal&#10;NH Collections — Saree business site"
                rows={4} style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={e => (e.target.style.borderColor = '#7C8CFF')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
              />
            </div>

            <div>
              <label style={labelStyle}>Experience</label>
              <textarea value={form.experience} onChange={e => update('experience', e.target.value)}
                placeholder="1st year B.Tech EEE student, self-taught developer, freelancer..."
                rows={3} style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={e => (e.target.style.borderColor = '#7C8CFF')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
              />
            </div>
          </div>

          {/* Tone */}
          <div style={{ background: '#151821', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '24px' }}>
            <p style={labelStyle}>Tone</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {tones.map(t => (
                <button key={t} onClick={() => setTone(t)} style={{
                  padding: '10px', textAlign: 'center',
                  background: tone === t ? 'rgba(124,140,255,0.12)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${tone === t ? 'rgba(124,140,255,0.35)' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: '6px', color: tone === t ? '#7C8CFF' : '#9CA3AF',
                  fontSize: '12px', cursor: 'pointer', transition: 'all 0.2s ease',
                }}>{t}</button>
              ))}
            </div>
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
            {loading ? 'Generating...' : 'Generate Portfolio →'}
          </button>
        </div>

        {/* Results */}
        {result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Tagline */}
            <div style={{ background: '#151821', border: '1px solid rgba(124,140,255,0.2)', borderRadius: '10px', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <p style={labelStyle}>Tagline</p>
                <CopyBtn text={result.tagline} id="tagline" />
              </div>
              <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: '22px', color: '#EAEAEA', margin: 0 }}>{result.tagline}</p>
            </div>

            {/* About */}
            <div style={{ background: '#151821', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <p style={labelStyle}>About</p>
                <CopyBtn text={typeof result.about === 'string' ? result.about : Object.values(result.about).join('\n\n')} id="about" />
              </div>
              <p style={{ fontSize: '13px', color: '#9CA3AF', lineHeight: 1.8, margin: 0, whiteSpace: 'pre-wrap' }}>
  {typeof result.about === 'string' 
    ? result.about 
    : Object.values(result.about).join('\n\n')}
</p>
            </div>

            {/* Skills */}
            <div style={{ background: '#151821', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '20px' }}>
              <p style={labelStyle}>Skills</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {result.skills.map((s: string) => (
                  <span key={s} style={{
                    padding: '5px 12px', borderRadius: '4px',
                    background: 'rgba(124,140,255,0.08)',
                    border: '1px solid rgba(124,140,255,0.2)',
                    fontSize: '12px', color: '#7C8CFF',
                  }}>{s}</span>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div style={{ background: '#151821', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '20px' }}>
              <p style={labelStyle}>Projects</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {result.projects.map((p: any, i: number) => (
                  <div key={i} style={{ paddingBottom: '16px', borderBottom: i < result.projects.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <p style={{ fontSize: '14px', fontWeight: 500, color: '#EAEAEA', margin: 0 }}>{p.name}</p>
                      <CopyBtn text={`${p.name}\n${p.description}\n${p.bullets.join('\n')}`} id={`project-${i}`} />
                    </div>
                    <p style={{ fontSize: '12px', color: '#9CA3AF', lineHeight: 1.6, margin: '0 0 8px' }}>{p.description}</p>
                    {p.bullets.map((b: string, j: number) => (
                      <div key={j} style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ color: '#7C8CFF', fontSize: '12px' }}>•</span>
                        <span style={{ fontSize: '12px', color: '#6B7280' }}>{b}</span>
                      </div>
                    ))}
                    <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
                      {p.tags.map((t: string) => (
                        <span key={t} style={{
                          fontSize: '10px', padding: '2px 8px', borderRadius: '3px',
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          color: '#6B7280',
                        }}>{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div style={{ background: '#151821', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <p style={labelStyle}>Experience</p>
                <CopyBtn text={typeof result.experience === 'string' ? result.experience : Object.values(result.experience).join('\n\n')} id="experience" />
              </div>
              <p style={{ fontSize: '13px', color: '#9CA3AF', lineHeight: 1.8, margin: 0, whiteSpace: 'pre-wrap' }}>
  {typeof result.experience === 'string'
    ? result.experience
    : Object.values(result.experience).join('\n\n')}
</p>
            </div>

            {/* CTA */}
            <div style={{ background: 'rgba(200,162,122,0.06)', border: '1px solid rgba(200,162,122,0.2)', borderRadius: '10px', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <p style={{ ...labelStyle, color: '#C8A27A' }}>Call to Action</p>
                <CopyBtn text={result.cta} id="cta" />
              </div>
              <p style={{ fontSize: '15px', color: '#EAEAEA', margin: 0, fontStyle: 'italic' }}>"{result.cta}"</p>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}