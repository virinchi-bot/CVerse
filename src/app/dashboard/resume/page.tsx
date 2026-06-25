'use client';

import { useState } from 'react';

export default function ResumeAnalyzer() {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleFile = (f: File) => {
    if (f.type !== 'application/pdf') return alert('Please upload a PDF file');
    setFile(f);
    setResult(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setAnalyzing(true);
    try {
      const formData = new FormData();
      formData.append('resume', file);
  
      const res = await fetch('/api/resume/analyze', {
        method: 'POST',
        body: formData,
      });
  
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (err: any) {
      alert('Analysis failed: ' + err.message);
    } finally {
      setAnalyzing(false);
    }
  };

  const scoreColor = (s: number) => s >= 75 ? '#4ade80' : s >= 50 ? '#C8A27A' : '#f87171';

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#4B5563', marginBottom: '8px' }}>
          AI Tool
        </p>
        <h1 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: '36px', fontWeight: 400,
          letterSpacing: '-0.02em', color: '#EAEAEA', margin: 0,
        }}>
          Resume <em style={{ color: '#7C8CFF' }}>Analyzer.</em>
        </h1>
        <p style={{ fontSize: '14px', color: '#6B7280', marginTop: '8px' }}>
          Upload your resume PDF and get a complete AI-powered CV intelligence report.
        </p>
      </div>

      <div className="two-col" style={{ display: 'grid', gridTemplateColumns: result ? '1fr 1.5fr' : '1fr', gap: '32px' }}>

        {/* Upload Zone */}
        <div>
          <div
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            style={{
              border: `2px dashed ${dragging ? '#7C8CFF' : file ? '#4ade80' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: '12px',
              padding: '48px 32px',
              textAlign: 'center',
              background: dragging ? 'rgba(124,140,255,0.05)' : 'rgba(255,255,255,0.02)',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
              marginBottom: '20px',
            }}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <input
              id="file-input"
              type="file"
              accept=".pdf"
              style={{ display: 'none' }}
              onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
            <div style={{ fontSize: '32px', marginBottom: '16px' }}>
              {file ? '✅' : '📄'}
            </div>
            {file ? (
              <>
                <p style={{ fontSize: '14px', color: '#4ade80', marginBottom: '4px' }}>{file.name}</p>
                <p style={{ fontSize: '12px', color: '#6B7280' }}>Click to change file</p>
              </>
            ) : (
              <>
                <p style={{ fontSize: '15px', color: '#EAEAEA', marginBottom: '8px' }}>
                  Drop your resume here
                </p>
                <p style={{ fontSize: '12px', color: '#6B7280' }}>
                  PDF only · Max 5MB
                </p>
              </>
            )}
          </div>

          {file && (
            <button
              onClick={handleAnalyze}
              disabled={analyzing}
              style={{
                width: '100%', padding: '14px',
                background: analyzing ? 'rgba(124,140,255,0.4)' : '#7C8CFF',
                border: 'none', borderRadius: '8px',
                color: '#0F1115', fontSize: '13px',
                fontWeight: 600, letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: analyzing ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {analyzing ? 'Analyzing...' : 'Analyze Resume →'}
            </button>
          )}

          {/* Tips */}
          <div style={{
            marginTop: '24px',
            background: '#151821',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '10px', padding: '20px',
          }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#4B5563', marginBottom: '12px' }}>
              What we analyze
            </p>
            {['ATS compatibility score', 'Recruiter readability', 'Impact & metrics', 'Weak wording detection', 'Buzzword identification', 'Improvement suggestions'].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#7C8CFF', flexShrink: 0 }} />
                <span style={{ fontSize: '13px', color: '#9CA3AF' }}>{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Results */}
        {result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Scores */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px'
            }}>
              {[
                { label: 'ATS Score', value: result.atsScore },
                { label: 'Clarity', value: result.clarityScore },
                { label: 'Impact', value: result.impactScore },
                { label: 'Recruiter', value: result.recruiterScore },
              ].map(s => (
                <div key={s.label} style={{
                  background: '#151821',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '10px', padding: '20px',
                }}>
                  <p style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#4B5563', marginBottom: '8px' }}>
                    {s.label}
                  </p>
                  <p style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: '40px', color: scoreColor(s.value),
                    lineHeight: 1, margin: 0,
                  }}>{s.value}</p>
                  <div style={{
                    marginTop: '10px', height: '3px',
                    background: 'rgba(255,255,255,0.06)', borderRadius: '2px'
                  }}>
                    <div style={{
                      width: `${s.value}%`, height: '100%',
                      background: scoreColor(s.value), borderRadius: '2px',
                      transition: 'width 1s ease',
                    }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Strengths */}
            <div style={{
              background: '#151821',
              border: '1px solid rgba(74,222,128,0.15)',
              borderRadius: '10px', padding: '20px',
            }}>
              <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#4ade80', marginBottom: '12px' }}>
                Strengths
              </p>
              {result.strengths.map((s: string) => (
                <div key={s} style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'flex-start' }}>
                  <span style={{ color: '#4ade80', fontSize: '12px', marginTop: '1px' }}>✓</span>
                  <span style={{ fontSize: '13px', color: '#9CA3AF', lineHeight: 1.5 }}>{s}</span>
                </div>
              ))}
            </div>

            {/* Weaknesses */}
            <div style={{
              background: '#151821',
              border: '1px solid rgba(248,113,113,0.15)',
              borderRadius: '10px', padding: '20px',
            }}>
              <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#f87171', marginBottom: '12px' }}>
                Weaknesses
              </p>
              {result.weaknesses.map((w: string) => (
                <div key={w} style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'flex-start' }}>
                  <span style={{ color: '#f87171', fontSize: '12px', marginTop: '1px' }}>✗</span>
                  <span style={{ fontSize: '13px', color: '#9CA3AF', lineHeight: 1.5 }}>{w}</span>
                </div>
              ))}
            </div>

            {/* Suggestions */}
            <div style={{
              background: '#151821',
              border: '1px solid rgba(124,140,255,0.15)',
              borderRadius: '10px', padding: '20px',
            }}>
              <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#7C8CFF', marginBottom: '12px' }}>
                Suggestions
              </p>
              {result.suggestions.map((s: string, i: number) => (
                <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '10px', color: '#7C8CFF', marginTop: '3px', flexShrink: 0 }}>0{i + 1}</span>
                  <span style={{ fontSize: '13px', color: '#9CA3AF', lineHeight: 1.6 }}>{s}</span>
                </div>
              ))}
            </div>

            {/* Buzzwords */}
            <div style={{
              background: '#151821',
              border: '1px solid rgba(200,162,122,0.15)',
              borderRadius: '10px', padding: '20px',
            }}>
              <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C8A27A', marginBottom: '12px' }}>
                Overused Buzzwords
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {result.buzzwords.map((b: string) => (
                  <span key={b} style={{
                    padding: '4px 12px', borderRadius: '4px',
                    background: 'rgba(200,162,122,0.1)',
                    border: '1px solid rgba(200,162,122,0.2)',
                    fontSize: '12px', color: '#C8A27A',
                  }}>{b}</span>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}