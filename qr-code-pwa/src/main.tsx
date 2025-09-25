import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { registerSW } from 'virtual:pwa-register';

// Enregistre le service worker. Le paramètre `immediate: true`
// force le service worker à s'activer dès qu'il est prêt.
registerSW({ immediate: true });

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}