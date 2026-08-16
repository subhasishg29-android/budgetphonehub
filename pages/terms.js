import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Terms() {
  return (
    <div>
      <Head>
        <title>Terms of Service | BudgetPhoneHub</title>
        <meta name="description" content="Terms of Service for BudgetPhoneHub." />
      </Head>

      <Header />

      <main className="container" style={{ padding: '3rem 1.5rem', maxWidth: '800px' }}>
        <div className="glass-card" style={{ padding: '2.5rem' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '1.5rem', color: '#fff' }}>
            Terms of Service
          </h1>

          <div style={{ color: 'var(--color-text-secondary)', lineHeight: '1.8', fontSize: '1rem' }}>
            <p style={{ marginBottom: '1.25rem' }}>
              By accessing BudgetPhoneHub (https://subhasish.me), you agree to be bound by these Terms of Service.
            </p>

            <h2 style={{ fontSize: '1.35rem', color: '#fff', margin: '1.75rem 0 0.75rem 0' }}>
              1. Disclaimer of Warranty
            </h2>
            <p style={{ marginBottom: '1.25rem' }}>
              All product specifications, pricing, stock availability, and rating details are provided for informational purposes only. Actual prices and availability on Amazon at the time of purchase apply.
            </p>

            <h2 style={{ fontSize: '1.35rem', color: '#fff', margin: '1.75rem 0 0.75rem 0' }}>
              2. Intellectual Property
            </h2>
            <p style={{ marginBottom: '1.25rem' }}>
              Amazon and the Amazon logo are trademarks of Amazon.com, Inc. or its affiliates. All product brand names and trademarks belong to their respective owners.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
