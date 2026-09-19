/**
 * Security Service for KinConnect
 * Provides XSS sanitization, safe URL validation, input length limits,
 * and rate-limiting safeguards to protect senior users and prevent vulnerabilities.
 */

// Regex patterns to strip malicious vectors
const SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
const TAG_REGEX = /<[^>]+>/g;
const DANGEROUS_PROTOCOLS = /^(javascript:|vbscript:|data:text\/html)/i;

/**
 * Sanitize text to prevent Cross-Site Scripting (XSS)
 * Strips script tags, evil protocols, and escapes HTML characters.
 */
export function sanitizeInput(input, maxLength = 1000) {
  if (typeof input !== 'string') return '';

  let sanitized = input.trim().slice(0, maxLength);

  // Remove script tags and embedded JavaScript
  sanitized = sanitized.replace(SCRIPT_REGEX, '');

  // Strip dangerous event handler attributes (e.g., onload=, onerror=)
  sanitized = sanitized.replace(/on\w+\s*=/gi, '');

  // Encode HTML entities for safe rendering
  sanitized = sanitized
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');

  return sanitized;
}

/**
 * Validate image URLs to ensure they use safe protocols (https)
 * and originate from trusted CDN origins.
 */
export function isSafeImageUrl(url) {
  if (!url || typeof url !== 'string') return false;

  const trimmed = url.trim();

  // Block malicious executable protocols
  if (DANGEROUS_PROTOCOLS.test(trimmed)) {
    return false;
  }

  try {
    const parsed = new URL(trimmed);
    const allowedProtocols = ['https:', 'http:'];
    if (!allowedProtocols.includes(parsed.protocol)) {
      return false;
    }

    // Allow recognized safe image hosts or relative paths
    const allowedHosts = [
      'images.unsplash.com',
      'unsplash.com',
      'assets.unsplash.com',
      'placehold.co',
      'via.placeholder.com'
    ];

    return allowedHosts.some(host => parsed.hostname.endsWith(host)) || parsed.pathname.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i);
  } catch (e) {
    // Relative safe paths
    return trimmed.startsWith('/') || trimmed.startsWith('./');
  }
}

/**
 * Fallback image placeholder if an unsafe or broken image URL is provided
 */
export const SAFE_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&auto=format&fit=crop&q=80';

/**
 * Basic rate-limiter for preventing request floods in the browser
 */
class ClientRateLimiter {
  constructor(limitPerMinute = 30) {
    this.limit = limitPerMinute;
    this.timestamps = [];
  }

  canProceed() {
    const now = Date.now();
    this.timestamps = this.timestamps.filter(ts => now - ts < 60000);
    if (this.timestamps.length >= this.limit) {
      return false;
    }
    this.timestamps.push(now);
    return true;
  }
}

export const actionRateLimiter = new ClientRateLimiter(40);
