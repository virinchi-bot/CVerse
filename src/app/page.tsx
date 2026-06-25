'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // ── LENIS SMOOTH SCROLL ──
    let lenis: any;
    (async () => {
      const LenisModule = await import('@studio-freight/lenis');
      const Lenis = LenisModule.default;
      lenis = new Lenis({ duration: 1.4, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
      lenis.on('scroll', () => ScrollTrigger.update());
      gsap.ticker.lagSmoothing(0);
    })();

    // ── CURSOR ──
    const cursor = document.getElementById('cursor')!;
    const ring = document.getElementById('cursor-ring')!;
    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.35 });
    };
    window.addEventListener('mousemove', onMouseMove);

    // ── PROGRESS BAR ──
    const bar = document.getElementById('progress-bar')!;
    window.addEventListener('scroll', () => {
      const p = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      bar.style.width = `${p * 100}%`;
    });

    // ── NAV SCROLL BEHAVIOR ──
    const nav = document.querySelector('.main-nav') as HTMLElement | null;
    const navLinks = nav?.querySelector('.nav-links') as HTMLElement | null;
    const navCtaBtn = nav?.querySelector('.nav-cta-btn') as HTMLButtonElement | null;
    if (navLinks) navLinks.style.opacity = '1';
    if (navCtaBtn) navCtaBtn.style.opacity = '1';
    if (nav) {
      nav.style.background = 'transparent';
      nav.style.borderBottom = 'none';
    }
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        if (navLinks) navLinks.style.opacity = '0';
        if (navCtaBtn) navCtaBtn.style.opacity = '0';
        if (nav) {
          nav.style.background = 'transparent';
          nav.style.borderBottom = 'none';
        }
      } else {
        if (navLinks) navLinks.style.opacity = '1';
        if (navCtaBtn) navCtaBtn.style.opacity = '1';
        if (nav) {
          nav.style.background = 'rgba(15,17,21,0.92)';
          nav.style.backdropFilter = 'blur(12px)';
          nav.style.borderBottom = '1px solid rgba(255,255,255,0.06)';
        }
      }
    });

    // ── THREE.JS ──
    const canvas = canvasRef.current!;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    const isMobile = window.innerWidth < 768;
    camera.position.set(0, 0, isMobile ? 5.5 : 5);

    // Lights
    const ambient = new THREE.AmbientLight(0x1a1f2e, 2);
    scene.add(ambient);
    const spotlight = new THREE.SpotLight(0xffffff, 8);
    spotlight.position.set(2, 4, 3);
    spotlight.castShadow = true;
    spotlight.angle = 0.4;
    spotlight.penumbra = 0.8;
    scene.add(spotlight);
    const accentLight = new THREE.PointLight(0x7C8CFF, 3, 10);
    accentLight.position.set(-3, 1, 2);
    scene.add(accentLight);
    const warmLight = new THREE.PointLight(0xC8A27A, 2, 8);
    warmLight.position.set(3, -1, 1);
    scene.add(warmLight);

    // Resume paper group
    const resumeGroup = new THREE.Group();
    scene.add(resumeGroup);

    // Paper
    const paperGeo = new THREE.BoxGeometry(2.4, 3.2, 0.02, 20, 20);
    const paperMat = new THREE.MeshStandardMaterial({
      color: 0xF5F1EA,
      roughness: 0.85,
      metalness: 0.05,
    });
    const paper = new THREE.Mesh(paperGeo, paperMat);
    paper.castShadow = true;
    paper.receiveShadow = true;
    resumeGroup.add(paper);

    // Resume lines (text simulation)
    const lineMat = new THREE.MeshBasicMaterial({ color: 0x2B2B2B, opacity: 0.15, transparent: true });
    const headerMat = new THREE.MeshBasicMaterial({ color: 0x2B2B2B, opacity: 0.5, transparent: true });
    const accentMat = new THREE.MeshBasicMaterial({ color: 0x7C8CFF, opacity: 0.6, transparent: true });

    // Header block
    const headerGeo = new THREE.PlaneGeometry(1.8, 0.08);
    const header = new THREE.Mesh(headerGeo, headerMat);
    header.position.set(0, 1.3, 0.02);
    resumeGroup.add(header);

    // Accent line
    const accentLineGeo = new THREE.PlaneGeometry(1.8, 0.005);
    const accentLine = new THREE.Mesh(accentLineGeo, accentMat);
    accentLine.position.set(0, 1.15, 0.02);
    resumeGroup.add(accentLine);

    // Text lines
    const linePositions = [
      [0, 1.0, 0.7], [0, 0.88, 0.5], [0, 0.76, 0.6],
      [-0.3, 0.55, 0.4], [0.1, 0.43, 0.55], [-0.1, 0.31, 0.35],
      [0, 0.1, 0.7], [0, -0.02, 0.5], [0, -0.14, 0.6], [0, -0.26, 0.45],
      [0, -0.48, 0.7], [0, -0.6, 0.5], [0, -0.72, 0.55], [0, -0.84, 0.4],
    ];
    linePositions.forEach(([x, y, w]) => {
      const geo = new THREE.PlaneGeometry(w as number, 0.018);
      const mesh = new THREE.Mesh(geo, lineMat);
      mesh.position.set(x as number, y as number, 0.02);
      resumeGroup.add(mesh);
    });

    // Section labels
    const sectionLabelPositions = [0.55, -0.45];
    sectionLabelPositions.forEach((y) => {
      const geo = new THREE.PlaneGeometry(0.4, 0.025);
      const mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0x7C8CFF, opacity: 0.7, transparent: true }));
      mesh.position.set(-0.7, y, 0.02);
      resumeGroup.add(mesh);
    });

    // Shadow plane
    const shadowGeo = new THREE.PlaneGeometry(4, 5);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.4 });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.receiveShadow = true;
    shadowPlane.position.set(0, 0, -0.5);
    scene.add(shadowPlane);

    // Particles
    const particleCount = window.innerWidth < 768 ? 40 : 120;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({ color: 0x7C8CFF, size: 0.015, transparent: true, opacity: 0.4 });
    scene.add(new THREE.Points(particleGeo, particleMat));

    // Mouse parallax
    let mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    });

    // Scroll animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#scroll-container',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
      }
    });

    // Hero → Section 2
    tl.to(resumeGroup.rotation, { y: Math.PI * 0.3, x: 0.15, duration: 1 }, 0)
      .to(resumeGroup.position, { x: 1.5, duration: 1 }, 0)
      .to(camera.position, { z: 4, duration: 1 }, 0)

      // Section 2 → Section 3
      .to(resumeGroup.rotation, { y: -Math.PI * 0.2, x: -0.1, duration: 1 }, 1)
      .to(resumeGroup.position, { x: -1, y: 0.3, duration: 1 }, 1)
      .to(camera.position, { z: 3.5, duration: 1 }, 1)

      // Section 3 → Section 4
      .to(resumeGroup.position, { x: 0, y: 0, z: 0.5, duration: 1 }, 2)
      .to(resumeGroup.rotation, { y: 0, x: 0, duration: 1 }, 2)
      .to(camera.position, { z: 3, duration: 1 }, 2)

      // Section 4 → Section 5
      .to(resumeGroup.position, { y: -0.5, duration: 1 }, 3)
      .to(resumeGroup.rotation, { x: 0.3, duration: 1 }, 3)
      .to(accentLight, { intensity: 8, duration: 1 }, 3)

      // Section 5 → Final
      .to(resumeGroup.position, { y: 1, z: 0, duration: 1 }, 4)
      .to(resumeGroup.rotation, { x: 0, y: 0, z: 0, duration: 1 }, 4)
      .to(spotlight, { intensity: 20, duration: 1 }, 4)
      .to(camera.position, { z: 4.5, duration: 1 }, 4);

    // Section text animations
    gsap.utils.toArray('.reveal-text').forEach((el: any) => {
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            once: true,
          }
        }
      );
    });

    // Score animation
    ScrollTrigger.create({
      trigger: '#score-section',
      start: 'top 80%',
      once: true,
      onEnter: () => {
        const obj = { val: 62 };
        const el = document.getElementById('score-number');
        if (el) {
          gsap.to(obj, {
            val: 91, duration: 2.5, ease: 'power2.out',
            onUpdate: () => { el.textContent = Math.round(obj.val).toString(); }
          });
        }
      }
    });

    // Render loop
    let frameId: number;
    const clock = new THREE.Clock();
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      resumeGroup.position.y += Math.sin(t * 0.6) * 0.0008;
      resumeGroup.rotation.z = Math.sin(t * 0.4) * 0.015;
      resumeGroup.rotation.x += (mouseY * 0.08 - resumeGroup.rotation.x) * 0.05;
      resumeGroup.rotation.y += (mouseX * 0.08 - resumeGroup.rotation.y) * 0.05;
      spotlight.position.x = mouseX * 2 + 2;
      spotlight.position.y = mouseY * 2 + 4;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', onResize);
    onResize(); // call immediately on mount

    // Scroll indicator hide
    const scrollEl = document.querySelector('.scroll-indicator') as HTMLElement;
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100 && scrollEl) scrollEl.style.opacity = '0';
      else if (scrollEl) scrollEl.style.opacity = '1';
    });

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      lenis?.destroy();
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <>
      {/* Fixed elements */}
      <div id="progress-bar" />
      <div id="cursor" />
      <div id="cursor-ring" />
      <div className="noise" />
      <canvas ref={canvasRef} id="three-canvas" />

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <span className="label-text" style={{ fontSize: '9px' }}>scroll</span>
        <div className="scroll-line" />
      </div>

      {/* NAV */}
      <nav className="main-nav">
        <span className="nav-logo">CV<span style={{ color: 'var(--accent)' }}>erse</span></span>
        <ul className="nav-links">
          <li><a href="\login">Analyze</a></li>
          <li><a href="\login">Builder</a></li>
          <li><a href="#pricing">Pricing</a></li>
        </ul>
        <a href="/login" className="cta-btn nav-cta-btn" style={{ padding: '10px 24px', fontSize: '11px' }}>

          Get Started
        </a>
      </nav>

      {/* SCROLL CONTAINER */}
      <div id="scroll-container">

        {/* S1 — HERO */}
        <section className="section" style={{ minHeight: '100vh' }}>
          <div style={{ textAlign: 'center', maxWidth: '800px', padding: '0 24px' }}>
            <p className="label-text reveal-text" style={{ marginBottom: '32px' }}>
              AI Resume Intelligence
            </p>
            <h1 className="display-text reveal-text" style={{ marginBottom: '28px' }}>
              Your resume speaks<br /><em>before you do.</em>
            </h1>
            <p className="body-text reveal-text" style={{ maxWidth: '440px', margin: '0 auto 48px' }}>
              Upload once. Get a complete CV analysis, ATS score, skill gap report, and an optimized resume — in minutes.
            </p>
            <a href="/login" className="cta-btn reveal-text">
              Analyze My Resume
              <span style={{ fontSize: '16px' }}>→</span>
            </a>
          </div>
        </section>

        {/* S2 — RECRUITER SCAN */}
        <section className="section" style={{ minHeight: '100vh' }}>
          <div style={{ maxWidth: '600px', padding: '0 24px 0 64px' }}>
            <p className="label-text reveal-text" style={{ marginBottom: '24px' }}>
              Recruiter Scan
            </p>
            <h2 className="display-text reveal-text" style={{ fontSize: 'clamp(36px, 5vw, 72px)', marginBottom: '24px' }}>
              What they see<br />in <em>6 seconds.</em>
            </h2>
            <p className="body-text reveal-text" style={{ marginBottom: '48px' }}>
              Our AI simulates how recruiters scan resumes. Weak action verbs, missing metrics, ATS mismatches — flagged instantly.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {['Weak action verbs detected', 'Missing impact metrics', 'ATS keyword mismatch', 'Poor visual hierarchy'].map((item, i) => (
                <div key={i} className="annotation reveal-text" style={{ position: 'relative', opacity: 1, transform: 'none' }}>
                  <div className="annotation-dot" />
                  <div className="annotation-line" />
                  <span className="annotation-text">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* S3 — DEEP ANALYSIS */}
        <section className="section" style={{ minHeight: '100vh' }}>
          <div style={{ maxWidth: '600px', padding: '0 24px', marginLeft: 'auto', marginRight: '10%' }}>
            <p className="label-text reveal-text" style={{ marginBottom: '24px' }}>Deep Analysis</p>
            <h2 className="display-text reveal-text" style={{ fontSize: 'clamp(36px, 5vw, 72px)', marginBottom: '24px' }}>
              Every layer.<br /><em>Understood.</em>
            </h2>
            <p className="body-text reveal-text">
              Experience, skills, projects, education — each section analyzed independently for recruiter attention, keyword density, and impact strength.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '48px' }}>
              {[
                { label: 'Experience', score: '74%' },
                { label: 'Skills', score: '61%' },
                { label: 'Projects', score: '48%' },
                { label: 'Education', score: '88%' },
              ].map((item) => (
                <div key={item.label} className="reveal-text" style={{
                  border: '1px solid rgba(124,140,255,0.2)',
                  borderRadius: '4px',
                  padding: '20px',
                  background: 'rgba(124,140,255,0.04)'
                }}>
                  <p className="label-text" style={{ marginBottom: '8px' }}>{item.label}</p>
                  <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: '32px', color: 'var(--accent)' }}>
                    {item.score}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* S4 — TRANSFORMATION */}
        <section className="section" id="score-section" style={{ minHeight: '100vh' }}>
          <div style={{ textAlign: 'center', padding: '0 24px' }}>
            <p className="label-text reveal-text" style={{ marginBottom: '24px' }}>Resume Score</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '40px', marginBottom: '32px' }}>
              <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(60px, 8vw, 100px)', color: 'var(--text-muted)', textDecoration: 'line-through' }}>62</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '24px' }}>→</span>
              <span id="score-number" className="score-display" style={{ color: 'var(--accent)' }}>62</span>
            </div>
            <h2 className="display-text reveal-text" style={{ fontSize: 'clamp(36px, 5vw, 72px)', marginBottom: '24px' }}>
              <em>Transformed.</em><br />Not just edited.
            </h2>
            <p className="body-text reveal-text" style={{ maxWidth: '440px', margin: '0 auto' }}>
              CVerse rewrites your resume from the ground up. Stronger verbs, measurable impact, clean hierarchy — optimized for both humans and ATS systems.
            </p>
          </div>
        </section>

        {/* S5 — BUILDER */}
        <section className="section" style={{ minHeight: '100vh' }}>
          <div style={{ maxWidth: '600px', padding: '0 24px 0 10%' }}>
            <p className="label-text reveal-text" style={{ marginBottom: '24px' }}>Resume Builder</p>
            <h2 className="display-text reveal-text" style={{ fontSize: 'clamp(36px, 5vw, 72px)', marginBottom: '24px' }}>
              Built with<br /><em>precision.</em>
            </h2>
            <p className="body-text reveal-text" style={{ marginBottom: '48px' }}>
              An architectural editor built for serious candidates. Template systems, spacing controls, recruiter preview — all in one calm workspace.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['ATS Optimization Engine', 'Real-time Recruiter Preview', 'Skill Gap Detection', 'AI Content Rewriter', 'LinkedIn Sync'].map((f) => (
                <div key={f} className="reveal-text" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent-warm)' }} />
                  <span style={{ fontSize: '14px', color: 'rgba(234,234,234,0.7)', letterSpacing: '0.05em' }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* S6 — RECRUITER POV */}
        <section className="section" style={{ minHeight: '100vh' }}>
          <div style={{ textAlign: 'center', padding: '0 24px' }}>
            <p className="label-text reveal-text" style={{ marginBottom: '24px' }}>Recruiter Reality</p>
            <div className="reveal-text" style={{
              fontFamily: 'DM Serif Display, serif',
              fontSize: 'clamp(80px, 15vw, 200px)',
              lineHeight: 1,
              color: 'var(--accent-warm)',
              marginBottom: '16px'
            }}>6</div>
            <h2 className="display-text reveal-text" style={{ fontSize: 'clamp(28px, 4vw, 56px)', marginBottom: '24px' }}>
              seconds to make<br />an impression.
            </h2>
            <p className="body-text reveal-text" style={{ maxWidth: '400px', margin: '0 auto' }}>
              The average recruiter spends 6 seconds on a resume. CVerse ensures every second counts.
            </p>
          </div>
        </section>

{/* PRICING */}
<section id="pricing" className="section" style={{ minHeight: 'auto', padding: '100px 24px' }}>
  <div style={{ maxWidth: '480px', textAlign: 'center', margin: '0 auto' }}>
    <p className="label-text reveal-text" style={{ marginBottom: '24px', color: 'var(--accent)' }}>Pricing</p>
    <h2 className="display-text reveal-text" style={{ fontSize: 'clamp(36px,5vw,64px)', marginBottom: '32px', color: '#EAEAEA' }}>
      Free. <em>Forever.</em>
    </h2>
    <div className="reveal-text" style={{
      border: '1px solid rgba(124,140,255,0.25)',
      borderRadius: '12px',
      padding: '36px',
      background: 'rgba(124,140,255,0.04)',
    }}>
      <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: '48px', color: '#7C8CFF', margin: '0 0 8px' }}>$0</p>
      <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '28px' }}>No card. No catch.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left', marginBottom: '28px' }}>
        {['Resume Analyzer', 'Skill Gap Detection', 'Mock Interview AI', 'Career Direction', 'LinkedIn Branding', 'Portfolio Generator'].map(f => (
          <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: '#4ade80', fontSize: '13px' }}>✓</span>
            <span style={{ fontSize: '13px', color: '#9CA3AF' }}>{f}</span>
          </div>
        ))}
      </div>
      <a href="/register" className="cta-btn" style={{ width: '100%', textDecoration: 'none', justifyContent: 'center' }}>
        Get Started Free →
      </a>
    </div>
  </div>
</section>

        {/* S7 — FINAL CTA */}
        <section className="section" style={{ minHeight: '100vh' }}>
          <div style={{ textAlign: 'center', padding: '0 24px' }}>
            <p className="label-text reveal-text" style={{ marginBottom: '32px' }}>
              CVerse — 2025
            </p>
            <h2 className="display-text reveal-text" style={{ marginBottom: '40px' }}>
              Built to get<br /><em>noticed.</em>
            </h2>
            <p className="body-text reveal-text" style={{ maxWidth: '380px', margin: '0 auto 48px' }}>
              Your CV, analyzed like a product. Optimized like an engineering problem. Presented like a story.
            </p>
            <a href="/register" className="cta-btn reveal-text">
              Start for Free
              <span style={{ fontSize: '16px' }}>→</span>
            </a>
            <p style={{ marginTop: '24px', fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
              No credit card. No templates. Just results.
            </p>
          </div>
        </section>

      </div>

      {/* FOOTER */}
      <footer style={{
        position: 'relative', zIndex: 1,
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '32px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span className="nav-logo">CV<span style={{ color: 'var(--accent)' }}>OS</span></span>
        <p style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
          © 2025 CVerse. ALL RIGHTS RESERVED.
        </p>
        <div style={{ display: 'flex', gap: '24px' }}>
          {['Privacy', 'Terms', 'Contact'].map((l) => (
            <a key={l} href="#" style={{ fontSize: '11px', color: 'var(--text-muted)', textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{l}</a>
          ))}
        </div>
      </footer>
    </>
  );
}
