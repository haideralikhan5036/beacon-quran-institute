// Visible breadcrumb trail (Batch 12, SEO research §3). It matches the
// BreadcrumbList JSON-LD baked into each prerendered page, and gives
// Google real <a href> links to follow. Clicks are routed client-side by
// the delegated link handler in App.tsx (no full reload); without JS the
// links still work as plain navigation to the prerendered pages.
import { ChevronRight } from 'lucide-react';

export interface Crumb {
  name: string;
  /** Omitted on the last (current) crumb. */
  href?: string;
}

export default function Breadcrumbs({
  items,
  tone = 'light',
}: {
  items: Crumb[];
  tone?: 'light' | 'dark';
}) {
  const linkClass =
    tone === 'dark'
      ? 'font-medium text-amber-100/85 hover:text-white hover:underline transition-colors'
      : 'font-medium text-[#3D5563] hover:text-[#004050] hover:underline transition-colors';
  const currentClass = tone === 'dark' ? 'font-semibold text-white' : 'font-semibold text-[#0B2E3A]';
  const sepClass = tone === 'dark' ? 'text-amber-100/60' : 'text-[#7A9BB0]';
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.name} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className={`w-4 h-4 ${sepClass}`} aria-hidden="true" />}
              {last || !item.href ? (
                <span aria-current={last ? 'page' : undefined} className={currentClass}>
                  {item.name}
                </span>
              ) : (
                <a href={item.href} className={linkClass}>
                  {item.name}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
