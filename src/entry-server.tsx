/**
 * Prerender entry (Batch 12, SEO research §1.3 option A).
 *
 * A pure client-rendered SPA ships crawlers an empty `<div id="root">`.
 * Google renders it eventually, but Bing / AI crawlers / link previews
 * often never do. This entry renders every public route to real HTML at
 * build time (Vite SSR build), so each route ships with its content,
 * title, meta, canonical and JSON-LD already in the served HTML.
 *
 * Usage (see package.json "build"):
 *   vite build --ssr src/entry-server.tsx --outDir dist-server
 *   node scripts/prerender.mjs   (imports this bundle, writes dist/<route>/index.html)
 *
 * The server render uses the SAME App with an initialPath, so the
 * prerendered markup is exactly what the client renders for that route —
 * hydration then matches. Lazy chunks are resolved before the stream
 * completes (onAllReady), so no route prerenders an empty body.
 */
import React from 'react';
import { Writable } from 'node:stream';
import { renderToPipeableStream } from 'react-dom/server';
import { LanguageProvider } from './context/LanguageContext';
import App, { VIEW_META, VIEW_PATHS } from './App';
import { COURSES } from './data/courses';
import { NEAR_ME_FAQ } from './components/NearYou';

export { VIEW_META, NEAR_ME_FAQ };

/** Every public, indexable route — the same list feeds the sitemap. */
export const PRERENDER_ROUTES: string[] = [
  '/',
  ...Object.values(VIEW_PATHS).filter((p) => p !== '' && p !== 'courses').map((p) => `/${p}`),
  '/courses',
  ...COURSES.map((c) => `/courses/${c.slug}`),
  '/usa',
  '/uk',
  '/canada',
];

// Monthly USD fee range per fee-sheet group (owner's fee sheet, Batch 3).
// Used for the per-course AggregateOffer in JSON-LD — must match the
// visible fee table exactly.
const FEE_RANGE_USD: Record<string, { low: string; high: string }> = {
  qaida: { low: '35', high: '45' },
  hifz: { low: '65', high: '80' },
  tafseer: { low: '50', high: '50' },
};

/** Google truncates Course descriptions at ~60 chars in the carousel. */
function truncate60(text: string): string {
  if (text.length <= 60) return text;
  const cut = text.slice(0, 57);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 20 ? lastSpace : 57).trim()}…`;
}

export interface CourseSeo {
  slug: string;
  title: string;
  /** ≤60-char display description for the Course List carousel. */
  short60: string;
  tagline: string;
  url: string;
  lowPrice: string;
  highPrice: string;
}

export const COURSE_SEO: CourseSeo[] = COURSES.map((c) => ({
  slug: c.slug,
  title: c.title,
  short60: truncate60(c.short),
  tagline: c.tagline,
  url: `/courses/${c.slug}`,
  lowPrice: FEE_RANGE_USD[c.feeGroup].low,
  highPrice: FEE_RANGE_USD[c.feeGroup].high,
}));

/** Per-route title + meta description for the served HTML. */
export const ROUTE_SEO: Record<string, { title: string; description: string }> = {
  ...Object.fromEntries(
    Object.entries(VIEW_META).map(([view, meta]) => {
      if (view === 'home') return ['/', meta];
      // Country views live at real paths but are not in VIEW_PATHS.
      if (view === 'usa' || view === 'uk' || view === 'canada') return [`/${view}`, meta];
      return [`/${VIEW_PATHS[view as keyof typeof VIEW_PATHS]}`, meta];
    }),
  ),
  ...Object.fromEntries(
    COURSE_SEO.map((c) => [
      c.url,
      {
        title: `${c.title} | Beacon Quran Institute`,
        description: c.tagline,
      },
    ]),
  ),
};

/** Render one route to its full app HTML (inner content of #root). */
export function render(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let html = '';
    const writable = new Writable({
      write(chunk, _encoding, callback) {
        html += chunk.toString();
        callback();
      },
    });
    writable.on('finish', () => resolve(html));
    writable.on('error', reject);
    const { pipe } = renderToPipeableStream(
      <React.StrictMode>
        <LanguageProvider>
          <App initialPath={url} />
        </LanguageProvider>
      </React.StrictMode>,
      {
        // Wait until every lazy chunk has loaded — no empty bodies.
        onAllReady() {
          pipe(writable);
        },
        onShellError(err) {
          reject(err);
        },
        onError(err) {
          // A single component error is logged, not fatal to the page.
          console.error(`prerender error for ${url}:`, err);
        },
      },
    );
  });
}
