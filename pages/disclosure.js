import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Disclosure() {
  return (
    <div>
      <Head>
        <title>Affiliate & FTC Disclosure | BudgetPhoneHub</title>
        <meta name="description" content="BudgetPhoneHub Amazon Associates and FTC affiliate disclosure compliance page." />
      </Head>

      <Header />

      <main className="container" style={{ padding: '3rem 1.5rem', maxWidth: '800px' }}>
        <div className="glass-card" style={{ padding: '2.5rem' }}>
          <span className="badge-ftc" style={{ marginBottom: '1rem' }}>Legal Compliance</span>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '1.5rem', color: '#fff' }}>
            Affiliate & FTC Disclosure Statement
          </h1>

          <div style={{ color: 'var(--color-text-secondary)', lineHeight: '1.8', fontSize: '1rem' }}>
            <p style={{ marginBottom: '1.25rem' }}>
              <strong>Last Updated: August 2026</strong>
            </p>
            <p style={{ marginBottom: '1.25rem' }}>
              In compliance with the Federal Trade Commission (FTC) guidelines and Amazon Associates program rules, please assume that all links on <strong>BudgetPhoneHub</strong> (https://subhasish.me) pointing to products on Amazon.com are affiliate links.
            </p>

            <h2 style={{ fontSize: '1.35rem', color: '#fff', margin: '1.75rem 0 0.75rem 0' }}>
              What is an Affiliate Link?
            </h2>
            <p style={{ marginBottom: '1.25rem' }}>
              When you click on an affiliate link on BudgetPhoneHub and complete a purchase on Amazon, we may receive a small referral commission directly from Amazon. <strong>This occurs at zero extra cost to you.</strong> The price you pay for any item is identical whether you use our link or search for the product independently.
            </p>

            <h2 style={{ fontSize: '1.35rem', color: '#fff', margin: '1.75rem 0 0.75rem 0' }}>
              Amazon Associates Program Notice
            </h2>
            <p style={{ marginBottom: '1.25rem' }}>
              BudgetPhoneHub is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for website owners to earn advertising fees by advertising and linking to Amazon.com, Amazon.co.uk, Amazon.ca, and affiliated Amazon marketplace sites.
            </p>

            <h2 style={{ fontSize: '1.35rem', color: '#fff', margin: '1.75rem 0 0.75rem 0' }}>
              Editorial Integrity & Product Testing
            </h2>
            <p style={{ marginBottom: '1.25rem' }}>
              Our product selections, reviews, and feature comparisons are made independently. Commission rates do not influence our ratings or recommendations. We highlight budget phone accessories based on build quality, real customer feedback, and practical value for money.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
