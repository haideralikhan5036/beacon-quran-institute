// Scroll to an element that may still be mounting after a view change
// (page sections are lazy-loaded, so the target can be absent for a moment).
// Retries a few times, then gives up silently instead of doing nothing.
export function scrollToId(id: string, attempts = 6, gapMs = 150): void {
  let tried = 0;
  const tick = () => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    tried += 1;
    if (tried < attempts) window.setTimeout(tick, gapMs);
  };
  window.setTimeout(tick, 120);
}
