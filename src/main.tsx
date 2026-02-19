import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './i18n';
import './index.css';
import App from './App';

document.documentElement.dir = 'rtl';
document.documentElement.lang = 'he';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
