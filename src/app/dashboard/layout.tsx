'use client';

import Sidebar from '@/app/components/dashboard/sidebar';
import { generateMetadata } from '@/lib/seo/metadata';
import { PAGES } from '@/lib/seo/constants';
import type { ReactNode } from 'react';

// Note: Client component can't export metadata, but metadata is inherited from root
// For dashboard routes, use route-specific layout if detailed SEO is needed

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: 'flex', background: '#0F1115', minHeight: '100vh' }}>
      <Sidebar />
      <main id="dashboard-main" style={{
        marginLeft: '220px',
        flex: 1,
        padding: '40px 48px',
        fontFamily: "'DM Sans', sans-serif",
        color: '#EAEAEA',
      }}>
        {children}
      </main>

      <button
        onClick={() => {
        const s = document.getElementById('dashboard-sidebar');
        if (!s) return;
        const isHidden = window.getComputedStyle(s).display === 'none';
        s.style.display = isHidden ? 'flex' : 'none';
        }}
        style={{
          display: 'none',
          position: 'fixed',
          top: '16px', left: '16px',
          zIndex: 200,
          background: '#151821',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '6px',
          padding: '8px 12px',
          color: '#EAEAEA',
          fontSize: '18px',
          cursor: 'pointer',
        }}
        id="mobile-menu-btn"
      >☰</button>
    </div>
  );
}