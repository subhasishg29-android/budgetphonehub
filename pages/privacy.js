import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Privacy() {
  return (
    <div>
      <Head>
        <title>Privacy Policy | BudgetPhoneHub</title>
        <meta name="description" content="Privacy Policy for BudgetPhoneHub." />
      </Head>

      <Header />

      <main className="container" style={{ padding: '3rem 1.5rem', maxWidth: '800px' }}>
        <div className="glass-card" style={{ padding: '2.5rem' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '1.5rem', color: '#fff' }}>
            Privacy Policy
          </h1>

          <div style={{ color: 'var(--color-text-secondary)', lineHeight: '1.8', fontSize: '1rem' }}>
            <p style={{ marginBottom: '1.25rem' }}>
              Your privacy is important to us. BudgetPhoneHub (https://subhasish.me) operates as a static content and affiliate link directory.
            </p>

            <h2 style={{ fontSize: '1.35rem', color: '#fff', margin: '1.75rem 0 0.75rem 0' }}>
              1. Information We Collect & Logging
            </h2>
            <p style={{ marginBottom: '1.25rem' }}>
              When you click on outward affiliate links, our click-logging endpoint records metadata including click timestamps, campaign tags, product ASINs, HTTP referrer headers, user-agent details, and anonymized IP addresses (truncated IPv4/IPv6 subnets). We do not collect or store personally identifiable information (PII), real names, or financial payment details.
            </p>

            <h2 style={{ fontSize: '1.35rem', color: '#fff', margin: '1.75rem 0 0.75rem 0' }}>
              2. Cookies & Third-Party Tracking
            </h2>
            <p style={{ marginBottom: '1.25rem' }}>
              Third-party vendors, including Amazon Services LLC, may place cookies on your browser to trace referral commissions when you navigate from BudgetPhoneHub to Amazon. You can manage or disable cookies at any time via your browser settings.
            </p>

            <h2 style={{ fontSize: '1.35rem', color: '#fff', margin: '1.75rem 0 0.75rem 0' }}>
              3. Data Retention & GDPR Compliance
            </h2>
            <p style={{ marginBottom: '1.25rem' }}>
              Anonymized click logs are retained for a maximum of 90 days for aggregate performance analytics, bot detection, and affiliate attribution reporting, after which raw entries are automatically purged.
            </p>

            <h2 style={{ fontSize: '1.35rem', color: '#fff', margin: '1.75rem 0 0.75rem 0' }}>
              4. Contact Us
            </h2>
            <p style={{ marginBottom: '1.25rem' }}>
              For privacy inquiries regarding BudgetPhoneHub, contact us at privacy@subhasish.me.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
