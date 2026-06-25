'use client';

import { useState } from 'react';

const roles = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'AI Engineer',
  'UI/UX Designer',
  'DevOps Engineer',
  'Indie Hacker',
  'Startup Founder',
];

export default function SkillGaps() {
  const [selectedRole, setSelectedRole] = useState('');
  const [userSkills, setUserSkills] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!selectedRole || !userSkills) return alert('Select a role and enter your skills');
    setAnalyzing(true);
    try {
      const res = await fetch('/api/skills/gap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: selectedRole, skills: userSkills }),
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
          Skill Gap <em style={{ color: '#7C8CFF' }}>Detection.</em>
        </h1>
        <p style={{ fontSize: '14px', color: '#6B7280', marginTop: '8px' }}>
          Compare your skills to industry requirements and get a personalized learning roadmap.
        </p>
      </div>

      <div className="two-col" style={{ display: 'grid', gridTemplateColumns: result ? '1fr 1.5fr' : '600px 1fr', gap: '32px' }}>

        {/* Input Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Role Selection */}
          <div style={{
            background: '#151821',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '10px', padding: '24px',
          }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#4B5563', marginBottom: '16px' }}>
              Target Role
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {roles.map(role => (
                <button key={role} onClick={() => setSelectedRole(role)} style={{
                  padding: '10px 14px',
                  background: selectedRole === role ? 'rgba(124,140,255,0.15)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${selectedRole === role ? 'rgba(124,140,255,0.4)' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: '6px',
                  color: selectedRole === role ? '#7C8CFF' : '#9CA3AF',
                  fontSize: '12px', cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'left',
                }}>
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Skills Input */}
          <div style={{
            background: '#151821',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '10px', padding: '24px',
          }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#4B5563', marginBottom: '12px' }}>
              Your Current Skills
            </p>
            <textarea
              value={userSkills}
              onChange={e => setUserSkills(e.target.value)}
              placeholder="e.g. React, JavaScript, Tailwind CSS, Node.js, Git..."
              rows={5}
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
            <p style={{ fontSize: '11px', color: '#4B5563', marginTop: '8px' }}>
              Separate skills with commas
            </p>
          </div>

          <button onClick={handleAnalyze} disabled={analyzing} style={{
            width: '100%', padding: '14px',
            background: analyzing ? 'rgba(124,140,255,0.4)' : '#7C8CFF',
            border: 'none', borderRadius: '8px',
            color: '#0F1115', fontSize: '13px',
            fontWeight: 600, letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: analyzing ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
          }}>
            {analyzing ? 'Detecting Gaps...' : 'Detect Skill Gaps →'}
          </button>
        </div>

        {/* Results */}
        {result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Match Score */}
            <div style={{
              background: '#151821',
              border: '1px solid rgba(124,140,255,0.15)',
              borderRadius: '10px', padding: '24px',
              display: 'flex', alignItems: 'center', gap: '24px',
            }}>
              <div>
                <p style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#4B5563', marginBottom: '8px' }}>
                  Role Match
                </p>
                <p style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: '56px', color: '#7C8CFF',
                  lineHeight: 1, margin: 0,
                }}>{result.matchScore}%</p>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '13px', color: '#9CA3AF', lineHeight: 1.6 }}>{result.summary}</p>
              </div>
            </div>

            {/* Missing Skills */}
            <div style={{
              background: '#151821',
              border: '1px solid rgba(248,113,113,0.15)',
              borderRadius: '10px', padding: '24px',
            }}>
              <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#f87171', marginBottom: '16px' }}>
                Missing Skills
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {result.missingSkills.map((s: string) => (
                  <span key={s} style={{
                    padding: '5px 12px', borderRadius: '4px',
                    background: 'rgba(248,113,113,0.08)',
                    border: '1px solid rgba(248,113,113,0.2)',
                    fontSize: '12px', color: '#f87171',
                  }}>{s}</span>
                ))}
              </div>
            </div>

            {/* Roadmap */}
            <div style={{
              background: '#151821',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '10px', padding: '24px',
            }}>
              <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#4B5563', marginBottom: '16px' }}>
                Learning Roadmap
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {result.roadmap.map((step: any, i: number) => (
                  <div key={i} style={{
                    display: 'flex', gap: '16px', alignItems: 'flex-start',
                    paddingBottom: '12px',
                    borderBottom: i < result.roadmap.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  }}>
                    <div style={{
                      minWidth: '28px', height: '28px', borderRadius: '50%',
                      background: 'rgba(124,140,255,0.1)',
                      border: '1px solid rgba(124,140,255,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '11px', color: '#7C8CFF', flexShrink: 0,
                    }}>{i + 1}</div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <p style={{ fontSize: '13px', fontWeight: 500, color: '#EAEAEA', margin: 0 }}>{step.skill}</p>
                        <span style={{
                          fontSize: '10px', padding: '2px 8px', borderRadius: '4px',
                          background: step.priority === 'high' ? 'rgba(248,113,113,0.1)' : step.priority === 'medium' ? 'rgba(200,162,122,0.1)' : 'rgba(74,222,128,0.1)',
                          color: step.priority === 'high' ? '#f87171' : step.priority === 'medium' ? '#C8A27A' : '#4ade80',
                          textTransform: 'uppercase', letterSpacing: '0.1em',
                        }}>{step.priority}</span>
                      </div>
                      <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>{step.projectIdea}</p>
                      <p style={{ fontSize: '11px', color: '#4B5563', marginTop: '4px' }}>~{step.weeks} weeks</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div style={{
              background: 'rgba(124,140,255,0.06)',
              border: '1px solid rgba(124,140,255,0.15)',
              borderRadius: '10px', padding: '20px',
              display: 'flex', alignItems: 'center', gap: '16px',
            }}>
              <span style={{ fontSize: '24px' }}>⏱</span>
              <div>
                <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>Estimated time to job-ready</p>
                <p style={{ fontSize: '16px', fontWeight: 500, color: '#EAEAEA', marginTop: '4px' }}>{result.timeline}</p>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}