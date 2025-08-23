import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';      // Tailwind ya custom CSS
import App from './App.jsx';  // Main app component

// React 18+ style root create karke render karna
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
