'use client';

import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { useState } from 'react';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { full_name: name } },
        });
        if (error) alert(error.message);
        else alert('Check your email to confirm your account!');
        setLoading(false);
    };
    const inputStyle = {
        width: '100%', padding: '12px 16px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '6px', color: '#EAEAEA',
        fontSize: '14px', outline: 'none',
        boxSizing: 'border-box' as const,
        transition: 'border 0.2s ease',
    };

    const labelStyle = {
        display: 'block' as const, fontSize: '11px',
        letterSpacing: '0.15em', textTransform: 'uppercase' as const,
        color: '#6B7280', marginBottom: '8px'
    };

    return (
        <div style={{
            display: 'flex', minHeight: '100vh',
            background: '#0F1115',
            fontFamily: "'DM Sans', sans-serif",
        }}>

            {/* LEFT — FORM */}
            <div id="auth-left" style={{
                flex: '0 0 480px',
                display: 'flex', flexDirection: 'column',
                justifyContent: 'center',
                padding: '64px 56px',
                borderRight: '1px solid rgba(255,255,255,0.06)',
            }}>

                <Link href="/" style={{ textDecoration: 'none', marginBottom: '48px', display: 'block' }}>
                    <span style={{ fontSize: '17px', fontWeight: 500, letterSpacing: '0.08em', color: '#EAEAEA' }}>
                        CV<span style={{ color: '#7C8CFF' }}>erse</span>
                    </span>
                </Link>

                <div style={{ marginBottom: '36px' }}>
                    <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6B7280', marginBottom: '12px' }}>
                        Get started
                    </p>
                    <h1 style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontSize: '36px', fontWeight: 400,
                        letterSpacing: '-0.02em', lineHeight: 1.1,
                        color: '#EAEAEA', margin: 0,
                    }}>
                        Build your<br /><em style={{ color: '#C8A27A' }}>CV story.</em>
                    </h1>
                </div>

                {/* Google */}
                <button
                    onClick={async () => {
                        await supabase.auth.signInWithOAuth({
                            provider: 'google',
                            options: {
                                redirectTo: `${window.location.origin}/dashboard`,
                            },
                        });
                    }}
                    style={{
                        width: '100%', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', gap: '12px',
                        padding: '13px 20px',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '6px', color: '#EAEAEA',
                        fontSize: '13px', letterSpacing: '0.05em',
                        cursor: 'pointer', marginBottom: '24px',
                        transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
                >
                    <svg width="18" height="18" viewBox="0 0 48 48">
                        <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.6 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-8 20-20 0-1.3-.1-2.7-.4-4z" />
                        <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.1 18.9 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4c-7.7 0-14.4 4.4-17.7 10.7z" />
                        <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.4 35.6 26.8 36 24 36c-5.2 0-9.6-2.9-11.3-7.1l-6.5 5C9.5 39.5 16.2 44 24 44z" />
                        <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.9 2.4-2.5 4.4-4.6 5.8l6.2 5.2C40.8 35.5 44 30.2 44 24c0-1.3-.1-2.7-.4-4z" />
                    </svg>
                    Continue with Google
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                    <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
                    <span style={{ fontSize: '11px', color: '#6B7280', letterSpacing: '0.1em' }}>OR</span>
                    <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    <div>
                        <label style={labelStyle}>Full Name</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)}
                            placeholder="Your Name" required style={inputStyle}
                            onFocus={e => (e.target.style.borderColor = '#7C8CFF')}
                            onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>Email</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                            placeholder="you@example.com" required style={inputStyle}
                            onFocus={e => (e.target.style.borderColor = '#7C8CFF')}
                            onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>Password</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                            placeholder="••••••••" required style={inputStyle}
                            onFocus={e => (e.target.style.borderColor = '#7C8CFF')}
                            onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                        />
                    </div>

                    <button type="submit" disabled={loading} style={{
                        width: '100%', padding: '13px',
                        background: loading ? 'rgba(124,140,255,0.5)' : '#7C8CFF',
                        border: 'none', borderRadius: '6px',
                        color: '#0F1115', fontSize: '13px',
                        fontWeight: 600, letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s ease', marginTop: '4px',
                    }}>
                        {loading ? 'Creating account...' : 'Create Account →'}
                    </button>
                </form>

                <p style={{ marginTop: '28px', fontSize: '12px', color: '#6B7280', textAlign: 'center' }}>
                    Already have an account?{' '}
                    <Link href="/login" style={{ color: '#7C8CFF', textDecoration: 'none' }}>Sign in</Link>
                </p>

            </div>

            {/* RIGHT — IMAGE */}
            <div id="auth-right" style={{ flex: 1, position: 'relative', overflow: 'hidden', background: '#0F1115' }}>
                <img src="/auth-img.png" alt="CVerse"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 0.92 }}
                />
                <div style={{
                    position: 'absolute', top: 0, left: 0, width: '120px', height: '100%',
                    background: 'linear-gradient(90deg, #0F1115, transparent)',
                }} />
                <div style={{ position: 'absolute', bottom: '48px', left: '48px', right: '48px' }}>
                    <p style={{
                        fontFamily: "'DM Serif Display', serif", fontSize: '22px',
                        color: '#EAEAEA', lineHeight: 1.4, margin: 0,
                        textShadow: '0 2px 20px rgba(0,0,0,0.8)',
                    }}>
                        "Your next opportunity starts<br />with a better resume."
                    </p>
                    <p style={{ fontSize: '11px', color: '#C8A27A', letterSpacing: '0.15em', marginTop: '12px', textTransform: 'uppercase' }}>
                        CVerse Intelligence
                    </p>
                </div>
            </div>

        </div>
    );
}