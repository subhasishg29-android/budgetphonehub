import React from 'react';
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductDetail from '../../components/ProductDetail';
import productsData from '../../data/products.json';

export async function getStaticPaths() {
  const paths = productsData.map(product => ({
    params: { asin: product.asin }
  }));

  return {
    paths,
    fallback: false // 404 for unknown ASINs
  };
}

export async function getStaticProps({ params }) {
  const product = productsData.find(p => p.asin === params.asin);

  if (!product) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      product
    },
    revalidate: 3600
  };
}

export default function ProductPage({ product }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://subhasish.me';
  const canonicalUrl = `${siteUrl}/product/${product.asin}`;
  const imageUrl = `${siteUrl}${product.hero_image || product.image}`;

  return (
    <div>
      <Head>
        <title>{`${product.title} - Best Deal & Review | BudgetPhoneHub`}</title>
        <meta name="description" content={product.short_description || product.description} />
        <link rel="canonical" href={canonicalUrl} />

        {/* OpenGraph Meta Tags */}
        <meta property="og:type" content="product" />
        <meta property="og:title" content={`${product.title} | BudgetPhoneHub`} />
        <meta property="og:description" content={product.short_description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={imageUrl} />
        <meta property="product:price:amount" content={product.price.toString()} />
        <meta property="product:price:currency" content={product.currency} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${product.title} Deal`} />
        <meta name="twitter:description" content={product.short_description} />
        <meta name="twitter:image" content={imageUrl} />
      </Head>

      <Header />

      <main className="container" style={{ padding: '2rem 1.5rem' }}>
        <ProductDetail product={product} siteUrl={siteUrl} />
      </main>

      <Footer />
    </div>
  );
}
