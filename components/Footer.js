import React from 'react';
import Link from 'next/link';
import AffiliateNotice from './AffiliateNotice';

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--color-bg-surface)',
      borderTop: '1px solid var(--color-border)',
      padding: '3rem 0 2rem 0',
      marginTop: '4rem'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Col 1: Site Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '1.25rem' }}>⚡</span>
              <strong style={{ fontSize: '1.1rem', color: '#fff' }}>BudgetPhoneHub</strong>
            </div>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
              Curated high-value smartphone chargers, stands, cases, and travel accessories. Tested for maximum performance per dollar.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 style={{ color: '#fff', marginBottom: '0.75rem', fontSize: '0.95rem' }}>Legal & Compliance</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
              <li><Link href="/disclosure">FTC Affiliate Disclosure</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Col 3: Affiliate Notice */}
          <div>
            <h4 style={{ color: '#fff', marginBottom: '0.75rem', fontSize: '0.95rem' }}>Transparency Notice</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>
              Product prices and availability are accurate as of the date/time indicated and are subject to change. Any price and availability information displayed on Amazon at the time of purchase will apply.
            </p>
          </div>
        </div>

        {/* Affiliate Disclosure Box */}
        <AffiliateNotice compact={false} />

        <div style={{
          borderTop: '1px solid var(--color-border)',
          paddingTop: '1.5rem',
          textAlign: 'center',
          fontSize: '0.8rem',
          color: 'var(--color-text-muted)'
        }}>
          © {new Date().getFullYear()} BudgetPhoneHub (https://subhasish.me). All rights reserved. Amazon and the Amazon logo are trademarks of Amazon.com, Inc. or its affiliates.
        </div>
      </div>
    </footer>
  );
}
