import React from 'react';

/**
 * FTC & Amazon Associates Affiliate Compliance Notice component.
 * Displays a transparent, compliant disclosure box per Amazon Associates Operating Agreement.
 */
export default function AffiliateNotice({ compact = false }) {
  if (compact) {
    return (
      <div style={{
        fontSize: '0.75rem',
        color: 'var(--color-text-muted)',
        background: 'rgba(255, 255, 255, 0.03)',
        padding: '0.5rem 0.75rem',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--color-border)',
        margin: '0.75rem 0'
      }}>
        <strong>Affiliate Disclosure:</strong> As an Amazon Associate, we earn from qualifying purchases at no extra cost to you.
      </div>
    );
  }

  return (
    <div style={{
      background: 'rgba(99, 102, 241, 0.08)',
      borderLeft: '4px solid var(--color-brand-primary)',
      padding: '1rem 1.25rem',
      borderRadius: '0 var(--radius-md) var(--radius-md) 0',
      margin: '1.5rem 0',
      color: 'var(--color-text-secondary)',
      fontSize: '0.85rem',
      lineHeight: '1.5'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
        <span className="badge-ftc">FTC Compliant</span>
        <strong style={{ color: 'var(--color-text-primary)' }}>Amazon Associates Disclosure</strong>
      </div>
      <p>
        BudgetPhoneHub participates in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. When you click buy buttons on this site, we may earn an affiliate commission at zero additional cost to you.
      </p>
    </div>
  );
}
