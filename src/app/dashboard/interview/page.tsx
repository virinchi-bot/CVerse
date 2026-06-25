'use client';

import { useState } from 'react';

const roles = ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'AI Engineer', 'React Developer', 'Node.js Developer'];

export default function MockInterview() {
  const [role, setRole] = useState('');
  const [resume, setResume] = useState('');
  const [questions, setQuestions] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState('');
  const [evaluation, setEvaluation] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState<'setup' | 'interview' | 'done'>('setup');

  const generateQuestions = async () => {
    if (!role) return alert('Select a role');
    setLoading(true);
    try {
      const res = await fetch('/api/interview/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'generate', role, resume }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setQuestions(data.questions);
      setStage('interview');
      setCurrent(0);
      setEvaluation(null);
    } catch (err: any) {
      alert('Failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const evaluateAnswer = async () => {
    if (!answer.trim()) return alert('Type your answer first');
    setLoading(true);
    try {
      const res = await fetch('/api/interview/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'evaluate',
          question: questions[current].question,
          answer,
          role,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setEvaluation(data);
    } catch (err: any) {
      alert('Failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const next = () => {
    if (current + 1 >= questions.length) { setStage('done'); return; }
    setCurrent(c => c + 1);
    setAnswer('');
    setEvaluation(null);
  };

  const scoreColor = (s: number) => s >= 7 ? '#4ade80' : s >= 4 ? '#C8A27A' : '#f87171';

  const typeColor: any = { technical: '#7C8CFF', behavioral: '#C8A27A', project: '#4ade80' };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#4B5563', marginBottom: '8px' }}>AI Tool</p>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '36px', fontWeight: 400, letterSpacing: '-0.02em', color: '#EAEAEA', margin: 0 }}>
          Mock <em style={{ color: '#7C8CFF' }}>Interview.</em>
        </h1>
        <p style={{ fontSize: '14px', color: '#6B7280', marginTop: '8px' }}>
          AI-generated interview questions based on your role. Get evaluated instantly.
        </p>
      </div>

      {/* SETUP */}
      {stage === 'setup' && (
        <div style={{ maxWidth: '640px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

          <div style={{ background: '#151821', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '24px' }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#4B5563', marginBottom: '16px' }}>Target Role</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {roles.map(r => (
                <button key={r} onClick={() => setRole(r)} style={{
                  padding: '10px 14px',
                  background: role === r ? 'rgba(124,140,255,0.15)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${role === r ? 'rgba(124,140,255,0.4)' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: '6px', color: role === r ? '#7C8CFF' : '#9CA3AF',
                  fontSize: '12px', cursor: 'pointer', textAlign: 'left',
                  transition: 'all 0.2s ease',
                }}>{r}</button>
              ))}
            </div>
          </div>

          <div style={{ background: '#151821', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '24px' }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#4B5563', marginBottom: '12px' }}>
              Resume Summary <span style={{ color: '#4B5563', fontWeight: 400 }}>(optional)</span>
            </p>
            <textarea
              value={resume}
              onChange={e => setResume(e.target.value)}
              placeholder="Paste a brief summary of your experience and projects..."
              rows={4}
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

          <button onClick={generateQuestions} disabled={loading} style={{
            width: '100%', padding: '14px',
            background: loading ? 'rgba(124,140,255,0.4)' : '#7C8CFF',
            border: 'none', borderRadius: '8px',
            color: '#0F1115', fontSize: '13px',
            fontWeight: 600, letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}>
            {loading ? 'Generating Questions...' : 'Start Interview →'}
          </button>
        </div>
      )}

      {/* INTERVIEW */}
      {stage === 'interview' && (
        <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '32px' }}>

          {/* Left — Question */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Progress */}
            <div style={{ background: '#151821', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#4B5563', margin: 0 }}>Progress</p>
                <p style={{ fontSize: '11px', color: '#7C8CFF', margin: 0 }}>{current + 1} / {questions.length}</p>
              </div>
              <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px' }}>
                <div style={{ width: `${((current + 1) / questions.length) * 100}%`, height: '100%', background: '#7C8CFF', borderRadius: '2px', transition: 'width 0.4s ease' }} />
              </div>
            </div>

            {/* Question */}
            <div style={{ background: '#151821', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <span style={{
                  fontSize: '10px', padding: '3px 10px', borderRadius: '4px',
                  background: `${typeColor[questions[current]?.type]}18`,
                  color: typeColor[questions[current]?.type],
                  textTransform: 'uppercase', letterSpacing: '0.1em',
                }}>{questions[current]?.type}</span>
              </div>
              <p style={{ fontSize: '16px', color: '#EAEAEA', lineHeight: 1.6, margin: 0 }}>
                {questions[current]?.question}
              </p>
            </div>

            {/* Question list */}
            <div style={{ background: '#151821', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '20px' }}>
              <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#4B5563', marginBottom: '12px' }}>All Questions</p>
              {questions.map((q, i) => (
                <div key={q.id} style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '8px 0',
                  borderBottom: i < questions.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  opacity: i === current ? 1 : 0.4,
                }}>
                  <div style={{
                    width: '20px', height: '20px', borderRadius: '50%',
                    background: i === current ? 'rgba(124,140,255,0.2)' : 'rgba(255,255,255,0.05)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '10px', color: i === current ? '#7C8CFF' : '#4B5563', flexShrink: 0,
                  }}>{i + 1}</div>
                  <p style={{ fontSize: '12px', color: '#9CA3AF', margin: 0, lineHeight: 1.4 }}>
                    {q.question.slice(0, 50)}...
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Answer + Evaluation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            <div style={{ background: '#151821', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '24px' }}>
              <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#4B5563', marginBottom: '12px' }}>Your Answer</p>
              <textarea
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                placeholder="Type your answer here..."
                rows={7}
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
              <button onClick={evaluateAnswer} disabled={loading} style={{
                width: '100%', padding: '12px', marginTop: '12px',
                background: loading ? 'rgba(124,140,255,0.4)' : '#7C8CFF',
                border: 'none', borderRadius: '6px',
                color: '#0F1115', fontSize: '12px',
                fontWeight: 600, letterSpacing: '0.1em',
                textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer',
              }}>
                {loading ? 'Evaluating...' : 'Submit Answer →'}
              </button>
            </div>

            {/* Evaluation */}
            {evaluation && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

                {/* Score */}
                <div style={{
                  background: '#151821', border: `1px solid ${scoreColor(evaluation.score)}30`,
                  borderRadius: '10px', padding: '20px',
                  display: 'flex', alignItems: 'center', gap: '20px',
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: '48px', color: scoreColor(evaluation.score), lineHeight: 1, margin: 0 }}>
                      {evaluation.score}
                    </p>
                    <p style={{ fontSize: '10px', color: '#4B5563', marginTop: '4px' }}>/ 10</p>
                  </div>
                  <p style={{ fontSize: '13px', color: '#9CA3AF', lineHeight: 1.6 }}>{evaluation.feedback}</p>
                </div>

                {/* Strong points */}
                <div style={{ background: '#151821', border: '1px solid rgba(74,222,128,0.15)', borderRadius: '10px', padding: '20px' }}>
                  <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#4ade80', marginBottom: '10px' }}>Strong Points</p>
                  {evaluation.strongPoints.map((p: string, i: number) => (
                    <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                      <span style={{ color: '#4ade80' }}>✓</span>
                      <span style={{ fontSize: '12px', color: '#9CA3AF' }}>{p}</span>
                    </div>
                  ))}
                </div>

                {/* Improvements */}
                <div style={{ background: '#151821', border: '1px solid rgba(248,113,113,0.15)', borderRadius: '10px', padding: '20px' }}>
                  <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#f87171', marginBottom: '10px' }}>Improvements</p>
                  {evaluation.improvements.map((p: string, i: number) => (
                    <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                      <span style={{ color: '#f87171' }}>✗</span>
                      <span style={{ fontSize: '12px', color: '#9CA3AF' }}>{p}</span>
                    </div>
                  ))}
                </div>

                {/* Better answer */}
                <div style={{ background: '#151821', border: '1px solid rgba(124,140,255,0.15)', borderRadius: '10px', padding: '20px' }}>
                  <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#7C8CFF', marginBottom: '10px' }}>Stronger Answer</p>
                  <p style={{ fontSize: '13px', color: '#9CA3AF', lineHeight: 1.6, margin: 0 }}>{evaluation.betterAnswer}</p>
                </div>

                {/* Next button */}
                <button onClick={next} style={{
                  width: '100%', padding: '13px',
                  background: 'transparent',
                  border: '1px solid rgba(124,140,255,0.3)',
                  borderRadius: '8px', color: '#7C8CFF',
                  fontSize: '13px', fontWeight: 600,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  cursor: 'pointer',
                }}>
                  {current + 1 >= questions.length ? 'Finish Interview' : 'Next Question →'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* DONE */}
      {stage === 'done' && (
        <div style={{ maxWidth: '500px', textAlign: 'center', margin: '0 auto', paddingTop: '60px' }}>
          <p style={{ fontSize: '48px', marginBottom: '24px' }}>🎯</p>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '32px', color: '#EAEAEA', marginBottom: '12px' }}>
            Interview Complete.
          </h2>
          <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '32px', lineHeight: 1.6 }}>
            You've answered all {questions.length} questions. Review your answers and practice again to improve your score.
          </p>
          <button onClick={() => { setStage('setup'); setQuestions([]); setAnswer(''); setEvaluation(null); }} style={{
            padding: '13px 36px',
            background: '#7C8CFF', border: 'none',
            borderRadius: '8px', color: '#0F1115',
            fontSize: '13px', fontWeight: 600,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            cursor: 'pointer',
          }}>
            Start Again →
          </button>
        </div>
      )}
    </div>
  );
}