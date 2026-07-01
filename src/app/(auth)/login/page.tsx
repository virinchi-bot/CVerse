'use client';

import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;

        script.onload = () => {
            const g = (window as any).google;
            const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
            if (!g?.accounts?.id) {
                console.warn('Google Identity Services not available');
                return;
            }
            if (!clientId) {
                console.warn('NEXT_PUBLIC_GOOGLE_CLIENT_ID is not set');
                return;
            }

            g.accounts.id.initialize({
                client_id: clientId,
                callback: async (response: any) => {
                    const { error } = await supabase.auth.signInWithIdToken({
                        provider: 'google',
                        token: response.credential,
                    });
                    if (error) alert(error.message);
                    else window.location.href = '/dashboard';
                },
            });

            const btn = document.getElementById('googleBtn');
            if (btn) {
                g.accounts.id.renderButton(btn, { theme: 'outline', size: 'large', width: 380 });
            }
        };

        document.body.appendChild(script);

        return () => {
            // Cleanup: remove script and any global init if applicable
            if (script.parentNode) script.parentNode.removeChild(script);
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) alert(error.message);
        else window.location.href = '/dashboard';
        setLoading(false);
    };

    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            background: '#0F1115',
            fontFamily: "'DM Sans', sans-serif",
        }}>

            {/* LEFT — FORM */}
            <div id="auth-left" style={{
                flex: '0 0 480px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '64px 56px',
                borderRight: '1px solid rgba(255,255,255,0.06)',
                position: 'relative',
                zIndex: 1,
            }}>

                {/* Logo */}
                <Link href="/" style={{ textDecoration: 'none', marginBottom: '56px', display: 'block' }}>
                    <span style={{
                        fontSize: '17px',
                        fontWeight: 500,
                        letterSpacing: '0.08em',
                        color: '#EAEAEA',
                    }}>
                        CV<span style={{ color: '#7C8CFF' }}>erse</span>
                    </span>
                </Link>

                {/* Heading */}
                <div style={{ marginBottom: '40px' }}>
                    <p style={{
                        fontSize: '11px',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: '#6B7280',
                        marginBottom: '12px',
                    }}>Welcome back</p>
                    <h1 style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontSize: '36px',
                        fontWeight: 400,
                        letterSpacing: '-0.02em',
                        lineHeight: 1.1,
                        color: '#EAEAEA',
                        margin: 0,
                    }}>
                        Sign in to your<br /><em style={{ color: '#C8A27A' }}>CV dashboard.</em>
                    </h1>
                </div>

                {/* Google Auth */}
                <div id="googleBtn" style={{ marginBottom: '28px', display: 'flex', justifyContent: 'center' }} />

                {/* Divider */}
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px'
                }}>
                    <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
                    <span style={{ fontSize: '11px', color: '#6B7280', letterSpacing: '0.1em' }}>OR</span>
                    <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                    {/* Email */}
                    <div>
                        <label style={{
                            display: 'block', fontSize: '11px', letterSpacing: '0.15em',
                            textTransform: 'uppercase', color: '#6B7280', marginBottom: '8px'
                        }}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                            style={{
                                width: '100%', padding: '12px 16px',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '6px', color: '#EAEAEA',
                                fontSize: '14px', outline: 'none',
                                boxSizing: 'border-box',
                                transition: 'border 0.2s ease',
                            }}
                            onFocus={e => (e.currentTarget.style.borderColor = '#7C8CFF')}
                            onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <label style={{
                                fontSize: '11px', letterSpacing: '0.15em',
                                textTransform: 'uppercase', color: '#6B7280'
                            }}>Password</label>
                            <Link href="/forgot-password" style={{
                                fontSize: '11px', color: '#7C8CFF', textDecoration: 'none', letterSpacing: '0.05em'
                            }}>Forgot?</Link>
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            style={{
                                width: '100%', padding: '12px 16px',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '6px', color: '#EAEAEA',
                                fontSize: '14px', outline: 'none',
                                boxSizing: 'border-box',
                                transition: 'border 0.2s ease',
                            }}
                            onFocus={e => (e.currentTarget.style.borderColor = '#7C8CFF')}
                            onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%', padding: '13px',
                            background: loading ? 'rgba(124,140,255,0.5)' : '#7C8CFF',
                            border: 'none', borderRadius: '6px',
                            color: '#0f1115', fontSize: '13px',
                            fontWeight: 600, letterSpacing: '0.1em',
                            textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s ease',
                            marginTop: '4px',
                        }}
                    >
                        {loading ? 'Signing in...' : 'Sign In →'}
                    </button>

                </form>

                {/* Footer */}
                <p style={{
                    marginTop: '32px', fontSize: '12px',
                    color: '#6B7280', textAlign: 'center'
                }}>
                    Don't have an account?{' '}
                    <Link href="/register" style={{ color: '#7C8CFF', textDecoration: 'none' }}>
                        Create one
                    </Link>
                </p>

            </div>

            {/* RIGHT — IMAGE */}
            <div id="auth-right" style={{
                flex: 1,
                position: 'relative',
                overflow: 'hidden',
                background: '#0F1115',
            }}>
                <img
                    src="/auth-img.png"
                    alt="CVerse illustration"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        opacity: 0.92,
                    }}
                />
                {/* Overlay gradient left edge blend */}
                <div style={{
                    position: 'absolute', top: 0, left: 0,
                    width: '120px', height: '100%',
                    background: 'linear-gradient(90deg, #0F1115, transparent)',
                }} />
                {/* Bottom quote */}
                <div style={{
                    position: 'absolute', bottom: '48px', left: '48px', right: '48px',
                }}>
                    <p style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontSize: '22px', color: '#EAEAEA',
                        lineHeight: 1.4, margin: 0,
                        textShadow: '0 2px 20px rgba(0,0,0,0.8)',
                    }}>
                        "The best time to optimize<br />your CV was yesterday."
                    </p>
                    <p style={{
                        fontSize: '11px', color: '#C8A27A',
                        letterSpacing: '0.15em', marginTop: '12px',
                        textTransform: 'uppercase',
                    }}>CVerse Intelligence</p>
                </div>
            </div>

        </div>
    );
}
