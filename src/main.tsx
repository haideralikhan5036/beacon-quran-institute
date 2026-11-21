import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import { LanguageProvider } from './context/LanguageContext';
import './index.css';

const rootEl = document.getElementById('root')!;
const app = (
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>
);

// Prerendered pages (Batch 12) ship real HTML in #root: hydrate it so the
// page stays interactive without re-rendering from scratch. A plain SPA
// load (no prerendered HTML, e.g. a route added after the last build)
// falls back to a normal client render.
if (rootEl.hasChildNodes()) {
  hydrateRoot(rootEl, app);
} else {
  createRoot(rootEl).render(app);
}
