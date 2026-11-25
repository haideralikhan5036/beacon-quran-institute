// Build-time prerendering (Batch 12, SEO research §1.3 option A).
//
// A pure client-rendered SPA ships crawlers an empty `<div id="root">`.
// This script renders every public route to real HTML (via the SSR bundle
// built by `vite build --ssr src/entry-server.tsx`) and writes
// dist/<route>/index.html with per-route title / meta / canonical /
// hreflang / OG / JSON-LD baked in. It also regenerates dist/sitemap.xml
// from the same route list, so the sitemap can never drift from the
// routes that actually exist.
//
// Run after `vite build` + the SSR build (see package.json "build").
// Pure Node — no browser needed, so it runs in Cloudflare Pages builds.
//
// Design notes:
// - The client app hydrates the prerendered HTML (main.tsx: hydrateRoot
//   when #root already has children), so no re-render flash.
// - No SPA fallback anymore: every known route has its own file, so
//   public/_redirects carries no `/* /index.html 200` rule. Unknown
//   paths get a real 404 instead of a soft-404 SPA shell.
// - Canonical / hreflang / sitemap all point at the live domain
//   (pages.dev — the Vercel domain is deleted and 404s).
// - No fake local schema anywhere: EducationalOrganization carries
//   areaServed (countries served), never an invented address/geo.
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const SITE = 'https://beacon-quran-institute.pages.dev';
const TODAY = new Date().toISOString().slice(0, 10);

const { render, PRERENDER_ROUTES, ROUTE_SEO, COURSE_SEO, BLOG_SEO, NEAR_ME_FAQ, FAQ_ITEMS } = await import(
  join(ROOT, 'dist-server', 'entry-server.js')
);

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const ORG_ID = `${SITE}/#organization`;

function orgNode() {
  return {
    '@type': 'EducationalOrganization',
    '@id': ORG_ID,
    name: 'Beacon Quran Institute',
    url: `${SITE}/`,
    // NOTE: no `logo` here — the og-image.jpg file could not be pushed
    // (the GitHub connector carries text files only), so a logo URL
    // would 404. Re-add it once the image is in the repo.
    description:
      'Beacon Quran Institute is an online Quran academy offering 1-on-1 online Quran classes for kids and adults in the USA, UK and Canada. Learn Quran online with Tajweed, Hifz and Noorani Qaida.',
    sameAs: ['https://www.instagram.com/beacon_quran_institute'],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+92-346-1573771',
      email: 'beaconquraninstitute@gmail.com',
      contactType: 'customer service',
      availableLanguage: ['English', 'Arabic'],
    },
    areaServed: [
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'Canada' },
      { '@type': 'Country', name: 'Australia' },
      { '@type': 'Country', name: 'United Arab Emirates' },
      { '@type': 'Country', name: 'Saudi Arabia' },
      { '@type': 'Country', name: 'Qatar' },
      { '@type': 'Place', name: 'Europe' },
    ],
    availableLanguage: ['English', 'Arabic'],
  };
}

function itemListNode() {
  return {
    '@type': 'ItemList',
    itemListElement: COURSE_SEO.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Course',
        '@id': `${SITE}${c.url}`,
        name: c.title,
        description: c.short60,
        url: `${SITE}${c.url}`,
        provider: { '@id': ORG_ID },
      },
    })),
  };
}

function courseNode(course) {
  return {
    '@type': 'Course',
    '@id': `${SITE}${course.url}`,
    name: course.title,
    description: course.tagline,
    url: `${SITE}${course.url}`,
    provider: { '@id': ORG_ID },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      offers: {
        '@type': 'AggregateOffer',
        lowPrice: course.lowPrice,
        highPrice: course.highPrice,
        priceCurrency: 'USD',
      },
    },
  };
}

function breadcrumbNode(trail) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => {
      const item = { '@type': 'ListItem', position: i + 1, name: t.name };
      if (t.url) item.item = t.url;
      return item;
    }),
  };
}

function faqNode() {
  return {
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: NEAR_ME_FAQ.q,
        acceptedAnswer: { '@type': 'Answer', text: NEAR_ME_FAQ.a },
      },
    ],
  };
}

// FAQPage node for /faq — built from the same FAQ_ITEMS the page prints
// in its "Quick answers" section, so the schema matches visible content.
function faqPageNode() {
  return {
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

const BREADCRUMBS = {
  '/courses': [{ name: 'Home', url: `${SITE}/` }, { name: 'Courses' }],
  '/usa': [{ name: 'Home', url: `${SITE}/` }, { name: 'Online Quran Classes in the USA' }],
  '/uk': [{ name: 'Home', url: `${SITE}/` }, { name: 'Online Quran Classes UK' }],
  '/canada': [{ name: 'Home', url: `${SITE}/` }, { name: 'Online Quran Classes in Canada' }],
  '/about': [{ name: 'Home', url: `${SITE}/` }, { name: 'About' }],
  '/services': [{ name: 'Home', url: `${SITE}/` }, { name: 'Services' }],
  '/blog': [{ name: 'Home', url: `${SITE}/` }, { name: 'Blog' }],
  '/testimonials': [{ name: 'Home', url: `${SITE}/` }, { name: 'Testimonials' }],
  '/contact': [{ name: 'Home', url: `${SITE}/` }, { name: 'Contact' }],
  '/terms': [{ name: 'Home', url: `${SITE}/` }, { name: 'Terms of Service' }],
  '/certificate': [{ name: 'Home', url: `${SITE}/` }, { name: 'Certificate Verification' }],
  '/how-it-works': [{ name: 'Home', url: `${SITE}/` }, { name: 'How It Works' }],
  '/enrol': [{ name: 'Home', url: `${SITE}/` }, { name: 'Enrol' }],
  '/quality-assurance': [{ name: 'Home', url: `${SITE}/` }, { name: 'Quality Assurance' }],
  '/parents': [{ name: 'Home', url: `${SITE}/` }, { name: 'For Parents' }],
  '/female-teachers': [{ name: 'Home', url: `${SITE}/` }, { name: 'Female Teachers' }],
  '/rules': [{ name: 'Home', url: `${SITE}/` }, { name: 'Class Rules' }],
  '/faq': [{ name: 'Home', url: `${SITE}/` }, { name: 'Ask Beacon' }],
  '/quran-classes-in-houston': [{ name: 'Home', url: `${SITE}/` }, { name: 'Quran Classes in Houston' }],
  '/quran-classes-in-new-york': [{ name: 'Home', url: `${SITE}/` }, { name: 'Quran Classes in New York' }],
  '/quran-classes-in-los-angeles': [{ name: 'Home', url: `${SITE}/` }, { name: 'Quran Classes in Los Angeles' }],
  '/quran-classes-in-dallas': [{ name: 'Home', url: `${SITE}/` }, { name: 'Quran Classes in Dallas' }],
  '/quran-classes-in-texas': [{ name: 'Home', url: `${SITE}/` }, { name: 'Quran Classes in Texas' }],
  '/quran-classes-in-california': [{ name: 'Home', url: `${SITE}/` }, { name: 'Quran Classes in California' }],
  '/quran-classes-in-illinois': [{ name: 'Home', url: `${SITE}/` }, { name: 'Quran Classes in Illinois' }],
  '/quran-classes-in-michigan': [{ name: 'Home', url: `${SITE}/` }, { name: 'Quran Classes in Michigan' }],
  '/quran-classes-for-kids': [{ name: 'Home', url: `${SITE}/` }, { name: 'Quran Classes for Kids' }],
  '/quran-classes-for-beginners': [{ name: 'Home', url: `${SITE}/` }, { name: 'Quran Classes for Beginners' }],
  '/quran-classes-for-adults': [{ name: 'Home', url: `${SITE}/` }, { name: 'Quran Classes for Adults' }],
  '/quran-classes-for-female': [{ name: 'Home', url: `${SITE}/` }, { name: 'Quran Classes for Females' }],
  '/quran-classes-for-male': [{ name: 'Home', url: `${SITE}/` }, { name: 'Quran Classes for Males' }],
};

function jsonLdFor(route) {
  const graph = [];
  if (route === '/') {
    graph.push(orgNode(), itemListNode(), faqNode());
    return { '@context': 'https://schema.org', '@graph': graph };
  }
  if (route === '/courses') {
    graph.push(itemListNode(), breadcrumbNode(BREADCRUMBS['/courses']));
    return { '@context': 'https://schema.org', '@graph': graph };
  }
  const course = COURSE_SEO.find((c) => c.url === route);
  if (course) {
    graph.push(
      courseNode(course),
      breadcrumbNode([
        { name: 'Home', url: `${SITE}/` },
        { name: 'Courses', url: `${SITE}/courses` },
        { name: course.title },
      ]),
    );
    return { '@context': 'https://schema.org', '@graph': graph };
  }
  // Blog posts get a Home / Blog / <title> breadcrumb (same trail the
  // post page shows on screen).
  const blogPost = BLOG_SEO.find((b) => b.url === route);
  if (blogPost) {
    graph.push(
      breadcrumbNode([
        { name: 'Home', url: `${SITE}/` },
        { name: 'Blog', url: `${SITE}/blog` },
        { name: blogPost.title },
      ]),
    );
    return { '@context': 'https://schema.org', '@graph': graph };
  }
  if (route === '/about') {
    graph.push(orgNode(), breadcrumbNode(BREADCRUMBS['/about']));
    return { '@context': 'https://schema.org', '@graph': graph };
  }
  if (route === '/faq') {
    graph.push(faqPageNode(), breadcrumbNode(BREADCRUMBS['/faq']));
    return { '@context': 'https://schema.org', '@graph': graph };
  }
  if (BREADCRUMBS[route]) {
    graph.push(breadcrumbNode(BREADCRUMBS[route]));
    return { '@context': 'https://schema.org', '@graph': graph };
  }
  return null;
}

/** Country pages are genuine regional variants (currency, time zones,
 * cities, fees) — they get the full bidirectional hreflang cluster.
 * Every other page is not a regional variant: no hreflang. */
function hreflangFor(route) {
  if (route === '/' || route === '/usa' || route === '/uk' || route === '/canada') {
    return [
      `<link rel="alternate" hreflang="en-us" href="${SITE}/usa" />`,
      `<link rel="alternate" hreflang="en-gb" href="${SITE}/uk" />`,
      `<link rel="alternate" hreflang="en-ca" href="${SITE}/canada" />`,
      `<link rel="alternate" hreflang="x-default" href="${SITE}/" />`,
    ].join('\n    ');
  }
  return '';
}

function replaceOrThrow(html, pattern, replacement, label, route) {
  if (!pattern.test(html)) throw new Error(`prerender ${route}: template missing ${label}`);
  return html.replace(pattern, replacement);
}

const template = readFileSync(join(DIST, 'index.html'), 'utf8');
if (!template.includes('<div id="root"></div>')) {
  throw new Error('prerender: dist/index.html has no empty #root div to inject into');
}

// Hero LCP image (Batch 16): preload it on the home route so the browser
// starts the 328KB open-Mushaf PNG with the CSS instead of discovering
// it in the body. The file name is hashed per build — resolve it from
// dist/assets here (the <img> itself cannot carry the preload;
// index.html is written before the hash exists).
const heroFile = readdirSync(join(DIST, 'assets')).find(
  (f) => f.startsWith('pic2-open-mushaf-') && f.endsWith('.png'),
);
if (!heroFile) throw new Error('prerender: hero image not found in dist/assets');

let rendered = 0;
for (const route of PRERENDER_ROUTES) {
  const meta = ROUTE_SEO[route];
  if (!meta) throw new Error(`prerender: no ROUTE_SEO for ${route}`);
  const body = await render(route);
  // Guard: a route that prerendered empty must fail the build loudly.
  if (body.length < 5000 || !body.includes('Beacon Quran Institute')) {
    throw new Error(`prerender ${route}: rendered body too short/empty (${body.length} chars)`);
  }
  const canonical = route === '/' ? `${SITE}/` : `${SITE}${route}`;
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);
  const jsonLd = jsonLdFor(route);

  let html = template;
  html = replaceOrThrow(html, /<div id="root"><\/div>/, `<div id="root">${body}</div>`, '#root div', route);
  html = replaceOrThrow(html, /<title>[\s\S]*?<\/title>/, `<title>${title}</title>`, 'title', route);
  html = replaceOrThrow(
    html,
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${description}" />`,
    'meta description',
    route,
  );
  html = replaceOrThrow(
    html,
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${canonical}" />`,
    'canonical',
    route,
  );
  html = replaceOrThrow(
    html,
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${title}" />`,
    'og:title',
    route,
  );
  html = replaceOrThrow(
    html,
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${description}" />`,
    'og:description',
    route,
  );
  html = replaceOrThrow(
    html,
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${canonical}" />`,
    'og:url',
    route,
  );
  html = replaceOrThrow(
    html,
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${title}" />`,
    'twitter:title',
    route,
  );
  html = replaceOrThrow(
    html,
    /<meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${description}" />`,
    'twitter:description',
    route,
  );
  // Hreflang: replace the whole alternate-link block with the per-route set.
  html = html.replace(/(?:<link rel="alternate" hreflang="[^"]*" href="[^"]*" \/>\n?\s*)+/, hreflangFor(route) ? `${hreflangFor(route)}\n    ` : '');
  if (jsonLd) {
    html = replaceOrThrow(
      html,
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
      `<script type="application/ld+json">\n    ${JSON.stringify(jsonLd, null, 2)}\n    </script>`,
      'JSON-LD',
      route,
    );
  }

  // Hero preload (home only — the only route that renders the hero image).
  if (route === '/') {
    html = replaceOrThrow(
      html,
      /<\/head>/,
      `    <link rel="preload" as="image" href="/assets/${heroFile}" fetchpriority="high" />\n  </head>`,
      'hero preload',
      route,
    );
  }

  const outPath = route === '/' ? join(DIST, 'index.html') : join(DIST, route.slice(1), 'index.html');
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html);
  rendered++;
  console.log(`prerender ${route} -> ${outPath.slice(DIST.length + 1)} (${(html.length / 1024).toFixed(1)} kB)`);
}

// Sitemap from the same route list — only canonical, indexable, HTTP-200
// URLs. No priority/changefreq (Google ignores them); lastmod is the build
// date, which is genuinely when every page's served HTML changed.
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...PRERENDER_ROUTES.map(
    (route) =>
      `  <url>\n    <loc>${route === '/' ? `${SITE}/` : `${SITE}${route}`}</loc>\n    <lastmod>${TODAY}</lastmod>\n  </url>`,
  ),
  '</urlset>',
  '',
].join('\n');
writeFileSync(join(DIST, 'sitemap.xml'), sitemap);
console.log(`prerender: ${rendered} routes + sitemap.xml (${PRERENDER_ROUTES.length} urls)`);
