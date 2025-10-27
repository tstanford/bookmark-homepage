import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/spinner.css';
import './css/slider.css';
import './css/dialog.css';
import './css/base.css';
import './css/blue.css';
import App from './App.jsx'
import Login from "./components/dialogs/Login"

createRoot(document.getElementById('root')).render(
  <StrictMode>

    {window.env.enableLogin ? 

      <Login />

    :
      <App />
    }

  </StrictMode>,
)

