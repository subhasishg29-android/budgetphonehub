import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header style={{
      background: 'var(--color-bg-glass)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--color-border)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '70px'
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Image
            src="/favicon.png"
            alt="BudgetPhoneHub Logo"
            width={36}
            height={36}
            style={{ borderRadius: '10px', boxShadow: 'var(--shadow-glow)' }}
            priority
          />
          <span style={{
            fontSize: '1.25rem',
            fontWeight: '800',
            background: 'linear-gradient(90deg, #ffffff 0%, #cbd5e1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            BudgetPhoneHub
          </span>
        </Link>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link href="/" style={{ color: 'var(--color-text-secondary)', fontWeight: '500', transition: 'color 0.2s' }}>
            Top Accessories
          </Link>
          <Link href="/disclosure" style={{ color: 'var(--color-text-secondary)', fontWeight: '500', transition: 'color 0.2s' }}>
            Disclosure
          </Link>
          <Link href="/privacy" style={{ color: 'var(--color-text-secondary)', fontWeight: '500', transition: 'color 0.2s' }}>
            Privacy
          </Link>
          <span className="badge-ftc">Amazon Partner</span>
        </nav>
      </div>
    </header>
  );
}
