import React from 'react';
import Image from 'next/image';
import AffiliateNotice from './AffiliateNotice';
import { buildAffiliateClickUrl, formatPrice } from '../utils/utm';

export default function ProductDetail({ product, siteUrl = 'https://subhasish.me' }) {
  const {
    asin,
    title,
    price,
    currency,
    rating,
    review_count,
    availability,
    brand,
    short_description,
    description,
    bullets,
    image,
    hero_image,
    affiliate_url_template
  } = product;

  // Build encoded click URL
  const clickUrl = buildAffiliateClickUrl({
    url: affiliate_url_template,
    campaign: 'product_detail_hero',
    product: asin,
    source: 'website'
  });

  const fullImageUrl = `${siteUrl}${hero_image || image}`;

  // Schema.org Product JSON-LD structured data payload
  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    'name': title,
    'image': [fullImageUrl],
    'description': description || short_description,
    'sku': asin,
    'mpn': asin,
    'brand': {
      '@type': 'Brand',
      'name': brand
    },
    'offers': {
      '@type': 'Offer',
      'url': `${siteUrl}/product/${asin}`,
      'priceCurrency': currency,
      'price': price,
      'availability': availability === 'InStock' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      'seller': {
        '@type': 'Organization',
        'name': 'Amazon'
      }
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': rating.toString(),
      'reviewCount': review_count.toString()
    }
  };

  return (
    <div>
      {/* Inject Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2.5rem',
        alignItems: 'start',
        marginTop: '1.5rem'
      }}>
        {/* Left Column: Product Gallery / Image */}
        <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ position: 'relative', width: '100%', height: '360px', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            <Image
              src={hero_image || image}
              alt={title}
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          <div style={{ marginTop: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--color-brand-accent)', padding: '0.4rem 1rem', borderRadius: 'var(--radius-full)', fontSize: '0.85rem' }}>
            <span>✓ Verified Stock</span> • <strong>{availability}</strong>
          </div>
        </div>

        {/* Right Column: Details & Primary CTA */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <span className="badge-ftc">{brand}</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>ASIN: {asin}</span>
          </div>

          <h1 style={{ fontSize: '1.85rem', fontWeight: '800', lineHeight: '1.3', marginBottom: '1rem' }}>
            {title}
          </h1>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <div style={{ color: 'var(--color-brand-amber)', fontSize: '1.1rem' }}>
              {'★'.repeat(Math.floor(rating)) + (rating % 1 !== 0 ? '½' : '')}
            </div>
            <strong style={{ fontSize: '1rem' }}>{rating} out of 5</strong>
            <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>({review_count.toLocaleString()} customer ratings)</span>
          </div>

          {/* Price Card */}
          <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'block' }}>Current Price on Amazon</span>
              <span style={{ fontSize: '2.2rem', fontWeight: '900', color: 'var(--color-brand-accent)' }}>
                {formatPrice(price, currency)}
              </span>
            </div>
            <a
              href={clickUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ padding: '0.85rem 1.75rem', fontSize: '1rem' }}
            >
              Check Price on Amazon ↗
            </a>
          </div>

          {/* FTC Disclosure Notice */}
          <AffiliateNotice compact={true} />

          {/* Feature Highlights */}
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.75rem', color: '#fff' }}>
            Key Features & Benefits
          </h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
            {bullets && bullets.map((bullet, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.925rem', color: 'var(--color-text-secondary)' }}>
                <span style={{ color: 'var(--color-brand-accent)', fontWeight: 'bold' }}>✓</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          {/* Detailed Description */}
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem', color: '#fff' }}>
            Product Overview
          </h3>
          <p style={{ fontSize: '0.925rem', color: 'var(--color-text-secondary)', lineHeight: '1.7', marginBottom: '2rem' }}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
