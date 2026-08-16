import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * Stitch Design System Showcase Hero Component
 * Uses Stitch converted tokens (--color-brand-gradient, --color-bg-glass) and exported SVG asset.
 */
export default function StitchHero() {
  return (
    <section className="glass-card" style={{
      padding: '3rem 2rem',
      margin: '2rem 0 3rem 0',
      background: 'radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.15) 0%, rgba(15, 23, 42, 0.6) 100%)',
      overflow: 'hidden',
      position: 'relative'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        alignItems: 'center'
      }}>
        <div>
          <div className="badge-ftc" style={{ marginBottom: '1rem' }}>
            ⚡ Stitch UI Integrated • Tested Accessories
          </div>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '900',
            lineHeight: '1.2',
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 50%, #818cf8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Top Budget Phone Accessories That Are Actually Worth Buying
          </h1>
          <p style={{
            fontSize: '1.05rem',
            color: 'var(--color-text-secondary)',
            marginBottom: '1.75rem',
            lineHeight: '1.6'
          }}>
            Stop wasting money on cheap knockoffs. We test and review top-rated magnetic chargers, sturdy desk stands, waterproof pouches, and car mounts under $40.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#product-grid" className="btn-primary">
              Explore Deals Below ↓
            </a>
            <Link href="/disclosure" className="btn-secondary">
              FTC Disclosure
            </Link>
          </div>
        </div>

        {/* Hero Stock Photography Asset */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '320px',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), var(--shadow-glow)',
          border: '1px solid var(--color-border)'
        }}>
          <Image
            src="/images/hero-stock.png"
            alt="Top Rated Budget Smartphone Accessories Showcase"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
      </div>
    </section>
  );
}
