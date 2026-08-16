# BudgetPhoneHub ⚡ — Next.js Affiliate Landing Engine & Stitch UI

Production-ready, static-optimized Next.js affiliate landing site for **BudgetPhoneHub** (deployed at [https://subhasish.me](https://subhasish.me)). Engineered for high conversion rates, FTC compliance, serverless click tracking, and Stitch UI design system integration.

---

## 🚀 Key Features & Highlights

- **Static Product Pages (SSG)**: Fast build-time generation via `getStaticPaths` and `getStaticProps` from `data/products.json`.
- **Serverless Click Tracking API (`/api/click`)**: Decodes referral URLs, validates domain allowlist (`amazon.*`), appends Amazon Associates tag, logs metadata, and returns a `302 Found` HTTP redirect.
- **Backend Toggle (`CLICK_LOGGER_BACKEND`)**:
  - `csv` mode: Safe atomic append to root `clicks.csv`.
  - `supabase` mode: Real-time DB logging to a Supabase table.
- **Open Redirect Defense**: Enforces domain allowlisting to prevent security exploit attempts.
- **FTC & Amazon Compliance**: Prominent affiliate disclosure banners on product pages, sticky header badge, and dedicated `/disclosure`, `/privacy`, and `/terms` pages.
- **SEO & Schema.org JSON-LD**: Embedded `schema.org/Product` structured data, canonical tags, OpenGraph tags, and Twitter Cards.
- **Stitch Design System Integration**: Converted CSS design tokens (`styles/tokens.css`) and Stitch exported Hero/Icon SVGs.

---

## 🛠️ Project Structure

```text
├── data/
│   └── products.json           # Seed data for 5 sample budget phone accessories
├── pages/
│   ├── _app.js                 # Global CSS & Stitch tokens provider
│   ├── index.js                # SSG Homepage with Stitch Hero & Product Grid
│   ├── product/[asin].js       # SSG Product detail page with JSON-LD & Buy CTA
│   ├── api/
│   │   └── click.js            # Serverless click logger & 302 redirect API
│   ├── disclosure.js           # FTC & Amazon Affiliate disclosure page
│   ├── privacy.js              # Privacy policy template page
│   └── terms.js                # Terms of service page
├── components/
│   ├── Header.js               # Top nav with Stitch styling & FTC partner badge
│   ├── Footer.js               # Dark footer with explicit disclosure text
│   ├── ProductCard.js          # Interactive glassmorphic card for homepage
│   ├── ProductDetail.js        # Full product view component with Schema markup
│   ├── AffiliateNotice.js      # FTC compliance notice component
│   └── StitchHero.js           # Hero component using Stitch design tokens
├── utils/
│   └── utm.js                  # Click URL builder & UTM query parameter helpers
├── public/
│   └── images/                 # Stitch SVG assets & product thumbnails
├── styles/
│   └── tokens.css              # Stitch converted CSS custom properties
├── marketing/
│   └── shorts_and_x_posts.md   # 5 YouTube Shorts scripts & 5 X posts for ASINs
├── __tests__/
│   ├── product.test.js         # Jest tests for product page static data fetching
│   └── click.test.js           # Jest tests for click API domain security
├── scripts/
│   └── export-clicks.js        # CLI script to backup clicks.csv
├── vercel.json                 # Vercel security headers configuration
├── .env.example                # Example environment variables template
├── .env.local                  # Local development environment file
└── package.json
```

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env.local` before starting:

```bash
NEXT_PUBLIC_SITE_URL=https://subhasish.me
AFFILIATE_TAG=your-amazon-tag-20
CLICK_LOGGER_BACKEND=csv
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-key
ALLOWED_REDIRECT_DOMAINS=amazon.com,amazon.co.uk,amazon.ca,amazon.de,amazon.in
```

---

## 💻 Local Development & Commands

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Test static site build
npm run build

# 4. Run automated test suite
npm test

# 5. Export clicks CSV backup
npm run export-clicks
```

Open [http://localhost:3000](http://localhost:3000) in your browser to test product pages and click tracking redirects.

---

## 🎨 Stitch UI Asset Integration Guide

1. **Export PNG/SVG Assets**: Export high-resolution PNG or SVG assets for product heroes and icons from Stitch.
2. **Place in Public Directory**: Copy assets into `public/images/` and reference them with `/images/filename.svg`.
3. **Design Tokens**: Exported Stitch design tokens are defined in `styles/tokens.css`:
   - `--color-brand-gradient`
   - `--color-bg-glass`
   - `--shadow-glow`

---

## ⚖️ Security & FTC Compliance Checklist

- [x] Public domain configuration set to `https://subhasish.me`.
- [x] Visible FTC Affiliate Disclosure banner on all product pages (`AffiliateNotice.js`) and in the site footer.
- [x] Dedicated `/disclosure`, `/privacy`, and `/terms` pages accessible via header and footer.
- [x] Strict allowlist regex verification on `/api/click` destination hostnames (preventing Open Redirect vulnerabilities).
- [x] Canonical tags and Schema.org `Product` JSON-LD payload injected in `<head>` for indexing compliance.

---

## ☁️ Vercel Deployment Guide

1. Push code to your GitHub repository.
2. Import project into Vercel Dashboard.
3. Configure Project Settings:
   - Framework Preset: **Next.js**
   - Node.js Version: **18.x / 20.x**
4. Add Environment Variables:
   - `NEXT_PUBLIC_SITE_URL` = `https://subhasish.me`
   - `AFFILIATE_TAG` = `your-amazon-tag-20`
   - `CLICK_LOGGER_BACKEND` = `csv` (or `supabase`)
5. Deploy!
