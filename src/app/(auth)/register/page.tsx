'use client';

import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { useState } from 'react';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) alert(error.message);
        else alert('created account, please login.');
        setLoading(false);
    };

    const handleGitHub = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: { redirectTo: `${window.location.origin}/dashboard` },
        });
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#0F1115', fontFamily: "'DM Sans', sans-serif" }}>

            <div id="auth-left" style={{
                flex: '0 0 480px', display: 'flex', flexDirection: 'column',
                justifyContent: 'center', padding: '64px 56px',
                borderRight: '1px solid rgba(255,255,255,0.06)', position: 'relative', zIndex: 1,
            }}>

                <Link href="/" style={{ textDecoration: 'none', marginBottom: '56px', display: 'block' }}>
                    <span style={{ fontSize: '17px', fontWeight: 500, letterSpacing: '0.08em', color: '#EAEAEA' }}>
                        CV<span style={{ color: '#7C8CFF' }}>erse</span>
                    </span>
                </Link>

                <div style={{ marginBottom: '40px' }}>
                    <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6B7280', marginBottom: '12px' }}>Get started</p>
                    <h1 style={{
                        fontFamily: "'DM Serif Display', serif", fontSize: '36px', fontWeight: 400,
                        letterSpacing: '-0.02em', lineHeight: 1.1, color: '#EAEAEA', margin: 0,
                    }}>
                        Create your<br /><em style={{ color: '#C8A27A' }}>CVerse account.</em>
                    </h1>
                </div>

                {/* GitHub Auth */}
                <button
                    onClick={handleGitHub}
                    style={{
                        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        gap: '12px', padding: '13px 20px', background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#EAEAEA',
                        fontSize: '13px', letterSpacing: '0.05em', cursor: 'pointer',
                        marginBottom: '28px', transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#EAEAEA">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.725-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.755-1.333-1.755-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.775.42-1.305.762-1.605-2.665-.303-5.467-1.332-5.467-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.5 11.5 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.807 5.624-5.479 5.921.43.37.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 21.795 24 17.295 24 12c0-6.63-5.373-12-12-12z"/>
                    </svg>
                    Continue with GitHub
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
                    <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
                    <span style={{ fontSize: '11px', color: '#6B7280', letterSpacing: '0.1em' }}>OR</span>
                    <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6B7280', marginBottom: '8px' }}>Email</label>
                        <input
                            type="email" value={email} onChange={e => setEmail(e.target.value)}
                            placeholder="you@example.com" required
                            style={{
                                width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#EAEAEA',
                                fontSize: '14px', outline: 'none', boxSizing: 'border-box', transition: 'border 0.2s ease',
                            }}
                            onFocus={e => (e.target.style.borderColor = '#7C8CFF')}
                            onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6B7280', marginBottom: '8px' }}>Password</label>
                        <input
                            type="password" value={password} onChange={e => setPassword(e.target.value)}
                            placeholder="••••••••" required minLength={6}
                            style={{
                                width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#EAEAEA',
                                fontSize: '14px', outline: 'none', boxSizing: 'border-box', transition: 'border 0.2s ease',
                            }}
                            onFocus={e => (e.target.style.borderColor = '#7C8CFF')}
                            onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                        />
                    </div>

                    <button
                        type="submit" disabled={loading}
                        style={{
                            width: '100%', padding: '13px',
                            background: loading ? 'rgba(124,140,255,0.5)' : '#7C8CFF',
                            border: 'none', borderRadius: '6px', color: '#0f1115', fontSize: '13px',
                            fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
                            cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s ease', marginTop: '4px',
                        }}
                    >
                        {loading ? 'Creating account...' : 'Create Account →'}
                    </button>
                </form>

                <p style={{ marginTop: '32px', fontSize: '12px', color: '#6B7280', textAlign: 'center' }}>
                    Already have an account?{' '}
                    <Link href="/login" style={{ color: '#7C8CFF', textDecoration: 'none' }}>Sign in</Link>
                </p>
            </div>

            <div id="auth-right" style={{ flex: 1, position: 'relative', overflow: 'hidden', background: '#0F1115' }}>
                <img src="/auth-img.png" alt="CVerse illustration" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 0.92 }} />
                <div style={{ position: 'absolute', top: 0, left: 0, width: '120px', height: '100%', background: 'linear-gradient(90deg, #0F1115, transparent)' }} />
                <div style={{ position: 'absolute', bottom: '48px', left: '48px', right: '48px' }}>
                    <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: '22px', color: '#EAEAEA', lineHeight: 1.4, margin: 0, textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}>
                        "Your career story,<br />intelligently told."
                    </p>
                    <p style={{ fontSize: '11px', color: '#C8A27A', letterSpacing: '0.15em', marginTop: '12px', textTransform: 'uppercase' }}>CVerse Intelligence</p>
                </div>
            </div>
        </div>
    );
}
