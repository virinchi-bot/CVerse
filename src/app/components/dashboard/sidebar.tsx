'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const navItems = [
    { label: 'Overview', href: '/dashboard', icon: '⊞' },
    { label: 'Resume Analyzer', href: '/dashboard/resume', icon: '◈' },
    { label: 'Project Analyzer', href: '/dashboard/projects', icon: '◎' },
    { label: 'Skill Gaps', href: '/dashboard/skills', icon: '◬' },
    { label: 'CV Direction', href: '/dashboard/CV', icon: '◯' },
    { label: 'Branding', href: '/dashboard/branding', icon: '◇' },
    { label: 'Mock Interview', href: '/dashboard/interview', icon: '◻' },
    { label: 'Portfolio Gen', href: '/dashboard/portfolio', icon: '◈' },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [user, setUser] = useState<{ name: string; avatar: string } | null>(null);

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            if (data.user) {
                const meta = data.user.user_metadata as Record<string, any>;
                setUser({
                    name: meta.full_name || meta.user_name || meta.name || 'User',
                    avatar: meta.avatar_url || meta.picture || '',
                });
            }
        });
    }, []);

    return (
        <aside id="dashboard-sidebar" style={{
            width: '220px',
            minHeight: '100vh',
            background: '#0D0F13',
            borderRight: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            flexDirection: 'column',
            padding: '24px 0',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 50,
        }}>

            {/* Logo */}
            <div style={{ padding: '0 20px 28px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <Link href="/" style={{ textDecoration: 'none' }}>
                    <span style={{ fontSize: '16px', fontWeight: 500, letterSpacing: '0.08em', color: '#EAEAEA' }}>
                        CV<span style={{ color: '#7C8CFF' }}>erse</span>
                    </span>
                </Link>
            </div>

            {/* Nav */}
            <nav style={{ padding: '16px 12px', flex: 1 }}>
                <p style={{
                    fontSize: '10px', letterSpacing: '0.15em',
                    textTransform: 'uppercase', color: '#4B5563',
                    padding: '0 8px', marginBottom: '8px',
                }}>Workspace</p>

                {navItems.map((item) => {
                    const active = pathname === item.href;
                    return (
                        <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: '10px',
                                padding: '8px 10px', borderRadius: '6px',
                                marginBottom: '2px',
                                background: active ? 'rgba(124,140,255,0.12)' : 'transparent',
                                border: active ? '1px solid rgba(124,140,255,0.2)' : '1px solid transparent',
                                transition: 'all 0.15s ease',
                                cursor: 'pointer',
                            }}
                                onMouseEnter={e => {
                                    if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                                }}
                                onMouseLeave={e => {
                                    if (!active) e.currentTarget.style.background = 'transparent';
                                }}
                            >
                                <span style={{ fontSize: '13px', color: active ? '#7C8CFF' : '#4B5563' }}>{item.icon}</span>
                                <span style={{
                                    fontSize: '13px',
                                    color: active ? '#EAEAEA' : '#9CA3AF',
                                    fontFamily: "'DM Sans', sans-serif",
                                    letterSpacing: '0.02em',
                                }}>{item.label}</span>
                            </div>
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom */}
            <div style={{
                padding: '16px 20px',
                borderTop: '1px solid rgba(255,255,255,0.06)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px' }}>
                    {user?.avatar ? (
                        <img
                            src={user.avatar}
                            alt={user.name}
                            style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                        />
                    ) : (
                        <div style={{
                            width: '32px', height: '32px', borderRadius: '50%',
                            background: '#7C8CFF', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', color: '#0F1115', fontWeight: 600,
                        }}>
                            {user?.name?.[0]?.toUpperCase() || 'U'}
                        </div>
                    )}
                    <div>
                        <p style={{ fontSize: '13px', color: '#EAEAEA', margin: 0 }}>{user?.name || 'Loading...'}</p>
                        <p style={{ fontSize: '11px', color: '#6B7280', margin: 0 }}>Free plan</p>
                    </div>
                </div>
            </div>

        </aside>
    );
}