// Geo auto-detect: show a first-time visitor their own country's version
// (fee currency + country page) based on their IP address, with a manual
// header switcher that always wins and is remembered in localStorage.
//
// Endpoint: ipwho.is — free, no API key, CORS-enabled, returns the visitor's
// ISO country code as `country_code`. The lookup NEVER blocks rendering:
// the page loads with the USA/USD default and only switches once the lookup
// returns. Any failure (timeout, network error, unknown country) silently
// keeps the USA/USD default. Nothing is logged to the console on failure.
import type { CurrencyCode } from '../data/feeTable';

export type RegionKey =
  | 'usa'
  | 'uk'
  | 'canada'
  | 'australia'
  | 'uae'
  | 'saudi'
  | 'qatar'
  | 'europe';

export const REGION_CURRENCY: Record<RegionKey, CurrencyCode> = {
  usa: 'USD',
  uk: 'GBP',
  canada: 'CAD',
  australia: 'AUD',
  uae: 'AED',
  saudi: 'SAR',
  qatar: 'QAR',
  europe: 'EUR',
};

export const REGION_LABELS: Record<RegionKey, string> = {
  usa: 'USA',
  uk: 'UK',
  canada: 'Canada',
  australia: 'Australia',
  uae: 'UAE',
  saudi: 'Saudi Arabia',
  qatar: 'Qatar',
  europe: 'Europe',
};

/** Regions with their own country landing page (/usa, /uk, /canada). */
export const PAGE_REGIONS: RegionKey[] = ['usa', 'uk', 'canada'];

export function isPageRegion(region: RegionKey): region is 'usa' | 'uk' | 'canada' {
  return region === 'usa' || region === 'uk' || region === 'canada';
}

/** ISO 3166-1 alpha-2 codes of the eurozone (EUR). */
const EUROZONE_CODES = new Set([
  'AT', 'BE', 'DE', 'EE', 'FI', 'FR', 'GR', 'IE', 'IT',
  'LV', 'LT', 'LU', 'MT', 'NL', 'PT', 'SK', 'SI', 'ES', 'HR',
]);

/** Map an ISO country code to the region the fee sheet covers, or null. */
export function countryCodeToRegion(code: string): RegionKey | null {
  switch (code.toUpperCase()) {
    case 'US': return 'usa';
    case 'GB': return 'uk';
    case 'CA': return 'canada';
    case 'AU': return 'australia';
    case 'AE': return 'uae';
    case 'SA': return 'saudi';
    case 'QA': return 'qatar';
    default:
      return EUROZONE_CODES.has(code.toUpperCase()) ? 'europe' : null;
  }
}

const GEO_ENDPOINT = 'https://ipwho.is/';
const GEO_TIMEOUT_MS = 4000;

/**
 * Detect the visitor's region from their IP. Resolves null on any failure
 * (timeout, network error, bad response, unmapped country) — never rejects,
 * never logs. Callers treat null as "keep the USA/USD default".
 */
export async function detectRegion(): Promise<RegionKey | null> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), GEO_TIMEOUT_MS);
  try {
    const res = await fetch(GEO_ENDPOINT, { signal: controller.signal });
    if (!res.ok) return null;
    const data: unknown = await res.json();
    if (typeof data !== 'object' || data === null) return null;
    const record = data as { success?: unknown; country_code?: unknown };
    if (record.success !== true) return null;
    if (typeof record.country_code !== 'string') return null;
    return countryCodeToRegion(record.country_code);
  } catch {
    return null;
  } finally {
    window.clearTimeout(timer);
  }
}

const STORAGE_KEY = 'beacon-region';

export function loadStoredRegion(): RegionKey | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw && raw in REGION_CURRENCY) return raw as RegionKey;
  } catch {
    // Private mode / storage blocked — fall back to auto-detect.
  }
  return null;
}

export function saveRegion(region: RegionKey): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, region);
  } catch {
    // Storage blocked — the choice just won't stick; nothing else breaks.
  }
}
