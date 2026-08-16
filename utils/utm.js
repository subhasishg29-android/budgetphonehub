/**
 * Utility functions for UTM tracking and affiliate API URL formatting.
 */

/**
 * Encodes parameters and builds the internal click tracking endpoint URL.
 * Example return: "/api/click?url=https%3A%2F%2Fwww.amazon.com%2Fdp%2FB08N5WRWNW&campaign=pilot1&product=B08N5WRWNW&source=website"
 *
 * @param {Object} options
 * @param {string} options.url - Raw destination Amazon URL
 * @param {string} [options.campaign='pilot1'] - Marketing campaign identifier
 * @param {string} options.product - ASIN or product ID
 * @param {string} [options.source='website'] - Traffic source tag
 * @returns {string} Encoded click API endpoint URL
 */
export function buildAffiliateClickUrl({ url, campaign = 'pilot1', product, source = 'website' }) {
  if (!url) return '#';
  
  const encodedUrl = encodeURIComponent(url);
  const encodedCampaign = encodeURIComponent(campaign);
  const encodedProduct = encodeURIComponent(product || '');
  const encodedSource = encodeURIComponent(source);

  return `/api/click?url=${encodedUrl}&campaign=${encodedCampaign}&product=${encodedProduct}&source=${encodedSource}`;
}

/**
 * Appends UTM tracking parameters to any URL string safely.
 *
 * @param {string} url - Target URL
 * @param {Object} params - UTM key-value pairs
 * @returns {string} URL with appended query parameters
 */
export function addUtmParams(url, { utm_source = 'budgetphonehub', utm_medium = 'affiliate', utm_campaign = 'pilot1' } = {}) {
  if (!url) return '';
  try {
    const parsedUrl = new URL(url);
    if (utm_source) parsedUrl.searchParams.set('utm_source', utm_source);
    if (utm_medium) parsedUrl.searchParams.set('utm_medium', utm_medium);
    if (utm_campaign) parsedUrl.searchParams.set('utm_campaign', utm_campaign);
    return parsedUrl.toString();
  } catch {
    // Fallback string concatenation if URL parsing fails
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}utm_source=${encodeURIComponent(utm_source)}&utm_medium=${encodeURIComponent(utm_medium)}&utm_campaign=${encodeURIComponent(utm_campaign)}`;
  }
}

/**
 * Formats numeric price into localized currency string.
 *
 * @param {number} price 
 * @param {string} currency 
 * @returns {string} Formatted price string (e.g. "$39.99")
 */
export function formatPrice(price, currency = 'USD') {
  if (typeof price !== 'number') return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(price);
}
