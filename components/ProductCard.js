import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { buildAffiliateClickUrl, formatPrice } from '../utils/utm';

export default function ProductCard({ product, campaign = 'pilot1' }) {
  const {
    asin,
    title,
    category,
    price,
    currency,
    rating,
    review_count,
    short_description,
    image,
    affiliate_url_template
  } = product;

  // Build the tracking URL with encodeURIComponent
  const clickUrl = buildAffiliateClickUrl({
    url: affiliate_url_template,
    campaign: campaign,
    product: asin,
    source: 'homepage_grid'
  });

  return (
    <div className="glass-card" style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      padding: '1.25rem',
      position: 'relative'
    }}>
      {/* Category & Rating Badges */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <span style={{
          fontSize: '0.75rem',
          fontWeight: '600',
          color: 'var(--color-brand-primary)',
          background: 'rgba(99, 102, 241, 0.12)',
          padding: '0.2rem 0.6rem',
          borderRadius: 'var(--radius-full)'
        }}>
          {category}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', color: 'var(--color-brand-amber)' }}>
          ★ <strong style={{ color: 'var(--color-text-primary)' }}>{rating}</strong>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>({review_count.toLocaleString()})</span>
        </div>
      </div>

      {/* Image Container */}
      <Link href={`/product/${asin}`} style={{ display: 'block', position: 'relative', width: '100%', height: '180px', marginBottom: '1rem' }}>
        <Image
          src={image}
          alt={title}
          fill
          style={{ objectFit: 'contain', borderRadius: 'var(--radius-sm)' }}
          priority={false}
        />
      </Link>

      {/* Title */}
      <h3 style={{
        fontSize: '1.05rem',
        fontWeight: '700',
        lineHeight: '1.4',
        marginBottom: '0.5rem',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
      }}>
        <Link href={`/product/${asin}`} style={{ color: 'var(--color-text-primary)', transition: 'color 0.2s' }}>
          {title}
        </Link>
      </h3>

      {/* Short Description */}
      <p style={{
        fontSize: '0.85rem',
        color: 'var(--color-text-secondary)',
        marginBottom: '1.25rem',
        flexGrow: 1,
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
      }}>
        {short_description}
      </p>

      {/* Footer / CTA Area */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '0.75rem',
        borderTop: '1px solid var(--color-border)'
      }}>
        <div>
          <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', display: 'block' }}>Best Price</span>
          <span style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--color-brand-accent)' }}>
            {formatPrice(price, currency)}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Link href={`/product/${asin}`} className="btn-secondary" style={{ padding: '0.5rem 0.9rem', fontSize: '0.85rem' }}>
            Details
          </Link>
          <a
            href={clickUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
          >
            Buy on Amazon ↗
          </a>
        </div>
      </div>
    </div>
  );
}
