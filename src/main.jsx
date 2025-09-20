import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { StrictMode } from 'react';
import ContextProvider from './components/Context.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
      <App/>
    </ContextProvider>
  </StrictMode>,
)
