import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

/**
 * Default allowed Amazon domains to prevent open redirect vulnerabilities.
 * Can be overridden or extended via process.env.ALLOWED_REDIRECT_DOMAINS.
 */
const DEFAULT_ALLOWED_DOMAINS = [
  'amazon.com',
  'amazon.co.uk',
  'amazon.ca',
  'amazon.de',
  'amazon.fr',
  'amazon.es',
  'amazon.it',
  'amazon.co.jp',
  'amazon.in',
  'amzn.to'
];

/**
 * Simple in-memory rate limiting map for API endpoint abuse protection.
 * Key: IP address -> { count: number, resetTime: number }
 */
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute window
const RATE_LIMIT_MAX_REQUESTS = 60;     // Max 60 clicks per minute per IP

/**
 * Checks and updates rate limit status for a given IP.
 */
function isRateLimited(ip) {
  const now = Date.now();
  
  // Periodic cleanup of expired rate limit entries (keep map size under control)
  if (rateLimitMap.size > 5000) {
    for (const [k, v] of rateLimitMap.entries()) {
      if (now > v.resetTime) rateLimitMap.delete(k);
    }
  }

  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  record.count += 1;
  return false;
}

/**
 * Anonymizes client IP address to ensure GDPR and privacy compliance.
 * Truncates IPv4 host portion or hashes unknown formats.
 */
export function anonymizeIp(ip) {
  if (!ip || ip === 'unknown') return '0.0.0.0';
  const cleanIp = String(ip).split(',')[0].trim();
  
  // IPv4 truncation (e.g. 192.168.1.100 -> 192.168.1.0)
  if (cleanIp.includes('.')) {
    const parts = cleanIp.split('.');
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.${parts[2]}.0`;
    }
  }
  
  // IPv6 truncation (e.g. 2001:db8:85a3:8d3:1319:8a2e:370:7348 -> 2001:db8:85a3::)
  if (cleanIp.includes(':')) {
    const parts = cleanIp.split(':');
    if (parts.length >= 3) {
      return `${parts.slice(0, 3).join(':')}::`;
    }
  }

  return crypto.createHash('sha256').update(cleanIp).digest('hex').substring(0, 16);
}

/**
 * Helper to escape CSV cell contents safely against injection, newlines, and delimiter breakage.
 */
function escapeCsv(field) {
  if (field === null || field === undefined) return '""';
  const str = String(field).replace(/[\r\n]+/g, ' ').replace(/"/g, '""');
  return `"${str}"`;
}

/**
 * Validates whether the target URL domain belongs strictly to an allowed Amazon domain.
 */
export function isAllowedDomain(targetUrl) {
  try {
    const parsed = new URL(targetUrl);
    
    // Only allow http and https protocols
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return false;
    }

    const hostname = parsed.hostname.toLowerCase();
    
    // Custom configured domains from env var
    const envDomains = process.env.ALLOWED_REDIRECT_DOMAINS
      ? process.env.ALLOWED_REDIRECT_DOMAINS.split(',').map(d => d.trim().toLowerCase()).filter(Boolean)
      : [];
    
    const allowed = [...DEFAULT_ALLOWED_DOMAINS, ...envDomains];
    
    return allowed.some(domain => hostname === domain || hostname.endsWith('.' + domain));
  } catch {
    return false;
  }
}

/**
 * Appends affiliate tag to Amazon URL if not present.
 */
export function appendAffiliateTag(targetUrl, tag) {
  if (!tag) return targetUrl;
  try {
    const parsed = new URL(targetUrl);
    if (!parsed.searchParams.has('tag')) {
      parsed.searchParams.set('tag', tag);
    }
    return parsed.toString();
  } catch {
    return targetUrl;
  }
}

/**
 * Writes click metadata to CSV file (`clicks.csv`) safely.
 */
async function logToCsv(clickData) {
  const filePath = path.join(process.cwd(), 'clicks.csv');
  const fileExists = fs.existsSync(filePath);

  const header = 'timestamp,campaign,product,source,referrer,user_agent,ip,affiliate_url\n';
  const row = [
    escapeCsv(clickData.timestamp),
    escapeCsv(clickData.campaign),
    escapeCsv(clickData.product),
    escapeCsv(clickData.source),
    escapeCsv(clickData.referrer),
    escapeCsv(clickData.user_agent),
    escapeCsv(clickData.ip),
    escapeCsv(clickData.affiliate_url)
  ].join(',') + '\n';

  if (!fileExists) {
    await fs.promises.writeFile(filePath, header + row, 'utf8');
  } else {
    await fs.promises.appendFile(filePath, row, 'utf8');
  }
}

/**
 * Writes click metadata to Supabase DB table if configured.
 */
async function logToSupabase(clickData) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.warn('[ClickLogger] Supabase backend selected but SUPABASE_URL or SUPABASE_KEY missing. Falling back to console log.');
    console.log('[ClickLog]', clickData);
    return;
  }

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/clicks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(clickData)
    });

    if (!response.ok) {
      console.error('[ClickLogger] Supabase log failed with status:', response.status);
    }
  } catch (err) {
    console.error('[ClickLogger] Error writing to Supabase:', err.message);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { url, campaign = 'pilot1', product = '', source = 'website' } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing required parameter: url' });
  }

  // 1. Decode raw URL parameter
  let decodedUrl = '';
  try {
    decodedUrl = decodeURIComponent(url);
  } catch {
    return res.status(400).json({ error: 'Invalid URL encoding' });
  }

  // 2. Rate limiting check
  const rawIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
  const clientIp = Array.isArray(rawIp) ? rawIp[0] : rawIp.split(',')[0].trim();
  
  if (isRateLimited(clientIp)) {
    return res.status(429).json({ error: 'Too Many Requests. Please slow down.' });
  }

  // 3. Enforce domain allowlist to prevent open redirect vulnerabilities
  if (!isAllowedDomain(decodedUrl)) {
    return res.status(400).json({
      error: 'Security Exception: Redirect destination is not on the allowed Amazon domain list.',
      allowed_domains: DEFAULT_ALLOWED_DOMAINS
    });
  }

  // 4. Attach Amazon Associates Tag
  const affiliateTag = process.env.AFFILIATE_TAG || 'your-amazon-tag-20';
  const finalRedirectUrl = appendAffiliateTag(decodedUrl, affiliateTag);

  // 5. Gather anonymized click metadata
  const anonymizedClientIp = anonymizeIp(clientIp);
  const clickMetadata = {
    timestamp: new Date().toISOString(),
    campaign: String(campaign),
    product: String(product),
    source: String(source),
    referrer: req.headers['referer'] || req.headers['referrer'] || 'direct',
    user_agent: req.headers['user-agent'] || 'unknown',
    ip: anonymizedClientIp,
    affiliate_url: finalRedirectUrl
  };

  // 6. Log click according to CLICK_LOGGER_BACKEND toggle
  const backend = (process.env.CLICK_LOGGER_BACKEND || 'csv').toLowerCase();
  try {
    if (backend === 'supabase') {
      await logToSupabase(clickMetadata);
    } else {
      await logToCsv(clickMetadata);
    }
  } catch (logErr) {
    console.error('[ClickLogger] Logging failed:', logErr.message);
    // Continue redirecting even if logging encounters non-fatal IO error
  }

  // 7. Perform 302 Found HTTP Redirect
  res.writeHead(302, { Location: finalRedirectUrl });
  res.end();
}

