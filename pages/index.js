import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StitchHero from '../components/StitchHero';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';

export async function getStaticProps() {
  return {
    props: {
      products: productsData || []
    }
  };
}

export default function Home({ products }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://subhasish.me';

  return (
    <div>
      <Head>
        <title>BudgetPhoneHub - Best Budget Phone Accessories & Charger Deals</title>
        <meta name="description" content="Curated reviews and top deals on budget phone magnetic chargers, aluminum desk stands, waterproof pouches, and car vent mounts under $40." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Canonical Link */}
        <link rel="canonical" href={siteUrl} />

        {/* OpenGraph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="BudgetPhoneHub - Best Budget Phone Accessories" />
        <meta property="og:description" content="Tested and verified high-value smartphone accessories, power banks, and desk stands." />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={`${siteUrl}/images/stitch-hero-graphic.svg`} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BudgetPhoneHub - Top Budget Phone Accessories" />
        <meta name="twitter:description" content="Save money with tested magnetic wireless chargers, aluminum stands, and waterproof pouches under $40." />
        <meta name="twitter:image" content={`${siteUrl}/images/stitch-hero-graphic.svg`} />
      </Head>

      <Header />

      <main className="container">
        {/* Hero Banner with Stitch UI Integration */}
        <StitchHero />

        {/* Product Grid Section */}
        <section id="product-grid" style={{ margin: '3rem 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ color: 'var(--color-brand-primary)', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Handpicked Deals
              </span>
              <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#fff' }}>
                Featured Budget Phone Accessories
              </h2>
            </div>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', maxWidth: '400px' }}>
              All products are selected based on real customer ratings, build quality, and value for price.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.75rem'
          }}>
            {products.map(product => (
              <ProductCard key={product.asin} product={product} campaign="pilot1" />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
