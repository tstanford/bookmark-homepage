import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/spinner.css';
import './css/slider.css';
import './css/base.css';
import './css/grey.css';
import './css/dialog.css';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

