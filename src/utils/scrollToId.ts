// Scroll to an element that may still be mounting after a view change
// (page sections are lazy-loaded, so the target can be absent for a moment).
// Retries for ~5s: coming from a country page the whole homepage has to
// load its lazy chunks first, which can take ~2s in a cold browser — the
// old ~1s window gave up before the target even existed. Gives up silently
// after the window instead of doing nothing.
//
// Sections above the target can still be mounting when the scroll starts,
// which moves the target down after the smooth scroll ends (the scroll
// lands short, e.g. ~1000px above the form). So after a successful scroll,
// verify once: if the target is clearly still below the viewport, scroll
// to it again instantly. Bounded to one extra scroll.
export function scrollToId(id: string, attempts = 20, gapMs = 250): void {
  let tried = 0;
  const tick = () => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.setTimeout(() => {
        const top = el.getBoundingClientRect().top;
        if (top > window.innerHeight * 0.5) {
          el.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
      }, 800);
      return;
    }
    tried += 1;
    if (tried < attempts) window.setTimeout(tick, gapMs);
  };
  window.setTimeout(tick, 120);
}
