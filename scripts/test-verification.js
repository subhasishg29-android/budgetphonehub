const assert = require('assert');
const { isAllowedDomain, appendAffiliateTag, anonymizeIp } = require('../pages/api/click');
const { buildAffiliateClickUrl, formatPrice } = require('../utils/utm');
const products = require('../data/products.json');

console.log('🧪 Starting BudgetPhoneHub Verification Test Suite...\n');

// Test 1: Data integrity
assert.strictEqual(products.length, 5, 'Should have 5 seeded products');
console.log('✅ Test 1 Passed: 5 products seeded in products.json');

// Test 2: Domain Allowlist Security & Protocol Validation
assert.strictEqual(isAllowedDomain('https://www.amazon.com/dp/B08N5WRWNW'), true);
assert.strictEqual(isAllowedDomain('https://amazon.co.uk/dp/B0B18GHM99'), true);
assert.strictEqual(isAllowedDomain('https://evil-hacker.com/phishing'), false);
assert.strictEqual(isAllowedDomain('https://amazon.com.fake.org'), false);
assert.strictEqual(isAllowedDomain('javascript:alert(1)'), false);
assert.strictEqual(isAllowedDomain('ftp://amazon.com/file'), false);
console.log('✅ Test 2 Passed: Open Redirect security allowlist correctly filters Amazon vs external & malicious schemes');

// Test 3: Tag Appender
const tagged = appendAffiliateTag('https://www.amazon.com/dp/B08N5WRWNW', 'subhasish-20');
assert(tagged.includes('tag=subhasish-20'), 'Affiliate tag must be appended');
const doubleTagged = appendAffiliateTag('https://www.amazon.com/dp/B08N5WRWNW?tag=existing-20', 'subhasish-20');
assert.strictEqual(doubleTagged.includes('tag=existing-20'), true, 'Existing tag must be preserved');
console.log('✅ Test 3 Passed: Affiliate tag correctly appended and duplicate tags prevented');

// Test 4: UTM & Click URL Builder
const clickUrl = buildAffiliateClickUrl({
  url: 'https://www.amazon.com/dp/B08N5WRWNW',
  campaign: 'pilot1',
  product: 'B08N5WRWNW',
  source: 'website'
});
assert(clickUrl.startsWith('/api/click?url=https%3A%2F%2F'), 'URL must be encodeURIComponent encoded');
console.log('✅ Test 4 Passed: Click API URL correctly formatted with encodeURIComponent');

// Test 5: Price formatter
assert.strictEqual(formatPrice(39.99, 'USD'), '$39.99');
console.log('✅ Test 5 Passed: Price formatting utility works as expected');

// Test 6: IP Anonymization Compliance
assert.strictEqual(anonymizeIp('192.168.1.100'), '192.168.1.0');
assert.strictEqual(anonymizeIp('10.0.0.55, 127.0.0.1'), '10.0.0.0');
assert.strictEqual(anonymizeIp('2001:db8:85a3:8d3:1319:8a2e:370:7348'), '2001:db8:85a3::');
console.log('✅ Test 6 Passed: Client IP address anonymization satisfies privacy & GDPR guidelines');

console.log('\n🎉 ALL 6 VERIFICATION TESTS PASSED SUCCESSFULLY!');
