'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function DashboardPage() {
    useEffect(() => {
        // Supabase reads the token from the URL hash automatically on load.
        // This clears it from the visible URL right after, so it's never
        // sitting there to be screenshotted, copied, or saved in history.
        if (window.location.hash.includes('access_token')) {
            window.history.replaceState(null, '', window.location.pathname);
        }
    }, []);

    return <DashboardOverview />;
}

function DashboardOverview() {
    const getGreeting = () => {
        const h = new Date().getHours();
        if (h < 12) return 'Good morning';
        if (h < 17) return 'Good afternoon';
        return 'Good evening';
    };

    const scores = [
        { label: 'ATS Score', value: '—', sub: 'Upload resume first', color: '#7C8CFF' },
        { label: 'Clarity', value: '—', sub: 'Not analyzed yet', color: '#C8A27A' },
        { label: 'Impact', value: '—', sub: 'Not analyzed yet', color: '#7C8CFF' },
        { label: 'Skill Level', value: '—', sub: 'Not detected yet', color: '#C8A27A' },
    ];

    const features = [
        { label: 'Resume Analyzer', desc: 'Upload your resume and get ATS score, clarity rating, and improvement suggestions.', href: '/dashboard/resume', tag: 'Start here' },
        { label: 'Skill Gap Detection', desc: 'Find what skills you are missing for your target role.', href: '/dashboard/skills', tag: 'Popular' },
        { label: 'Mock Interview', desc: 'AI generates interview questions based on your resume and target role.', href: '/dashboard/interview', tag: 'New' },
        { label: 'CV Direction', desc: 'AI analyzes your profile and suggests the best CV paths for you.', href: '/dashboard/CV', tag: '' },
        { label: 'LinkedIn Branding', desc: 'Generate authentic LinkedIn posts, GitHub bio, and portfolio about section.', href: '/dashboard/branding', tag: '' },
        { label: 'Portfolio Generator', desc: 'Auto-generate portfolio content from your resume and project data.', href: '/dashboard/portfolio', tag: '' },
    ];

    return (
        <div>

            {/* Header */}
            <div style={{ marginBottom: '40px' }}>
                <p style={{
                    fontSize: '11px', letterSpacing: '0.2em',
                    textTransform: 'uppercase', color: '#4B5563', marginBottom: '8px'
                }}>Dashboard</p>
                <h1 style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: '36px', fontWeight: 400,
                    letterSpacing: '-0.02em', color: '#EAEAEA', margin: 0,
                }}>
                    {getGreeting()}, <em style={{ color: '#C8A27A' }}>Buddy.</em>
                </h1>
                <p style={{ fontSize: '14px', color: '#6B7280', marginTop: '8px' }}>
                    Your CV intelligence dashboard. Upload your resume to get started.
                </p>
            </div>

            {/* Score Cards */}
            <div className="score-grid" style={{
                display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '16px', marginBottom: '48px'
            }}>
                {scores.map((s) => (
                    <div key={s.label} className="score-card" style={{
                        background: '#151821',
                        border: '1px solid rgba(255,255,255,0.06)',
                        borderRadius: '10px', padding: '24px',
                    }}>
                        <p style={{
                            fontSize: '10px', letterSpacing: '0.15em',
                            textTransform: 'uppercase', color: '#4B5563', marginBottom: '12px'
                        }}>{s.label}</p>
                        <p style={{
                            fontFamily: "'DM Serif Display', serif",
                            fontSize: '36px', color: s.color,
                            lineHeight: 1, margin: 0,
                        }}>{s.value}</p>
                        <p style={{ fontSize: '11px', color: '#4B5563', marginTop: '8px' }}>{s.sub}</p>
                    </div>
                ))}
            </div>

            {/* Upload CTA */}
            <div style={{
                background: 'rgba(124,140,255,0.06)',
                border: '1px solid rgba(124,140,255,0.15)',
                borderRadius: '10px', padding: '28px 32px',
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', marginBottom: '48px',
            }}>
                <div>
                    <p style={{ fontSize: '15px', fontWeight: 500, color: '#EAEAEA', margin: 0 }}>
                        Start with your resume
                    </p>
                    <p style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>
                        Upload a PDF and get your full CV intelligence report in seconds.
                    </p>
                </div>
                <a href="/dashboard/resume" style={{
                    display: 'inline-block',
                    background: '#7C8CFF', color: '#0F1115',
                    padding: '11px 28px', borderRadius: '6px',
                    fontSize: '13px', fontWeight: 600,
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    textDecoration: 'none', whiteSpace: 'nowrap',
                }}>
                    Upload Resume →
                </a>
            </div>

            {/* Features Grid */}
            <div style={{ marginBottom: '16px' }}>
                <p style={{
                    fontSize: '11px', letterSpacing: '0.2em',
                    textTransform: 'uppercase', color: '#4B5563', marginBottom: '20px'
                }}>All Tools</p>
                <div className="tools-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                    {features.map((f) => (
                        <a key={f.label} href={f.href} style={{ textDecoration: 'none' }}>
                            <div style={{
                                background: '#151821',
                                border: '1px solid rgba(255,255,255,0.06)',
                                borderRadius: '10px', padding: '24px',
                                transition: 'border-color 0.2s ease',
                                cursor: 'pointer',
                                height: '100%',
                            }}
                                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(124,140,255,0.3)')}
                                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                                    <p style={{ fontSize: '14px', fontWeight: 500, color: '#EAEAEA', margin: 0 }}>{f.label}</p>
                                    {f.tag && (
                                        <span style={{
                                            fontSize: '10px', letterSpacing: '0.1em',
                                            color: '#7C8CFF', background: 'rgba(124,140,255,0.1)',
                                            padding: '2px 8px', borderRadius: '4px',
                                            textTransform: 'uppercase',
                                        }}>{f.tag}</span>
                                    )}
                                </div>
                                <p style={{ fontSize: '12px', color: '#6B7280', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

        </div>
    );
}