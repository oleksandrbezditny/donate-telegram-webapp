import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { LanguageProvider } from './i18n';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TonConnectUIProvider manifestUrl="https://oleksandrbezditny.github.io/donate-telegram-webapp/tonconnect-manifest.json">
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </TonConnectUIProvider>
  </React.StrictMode>
);
