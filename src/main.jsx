import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/spinner.css';
import './css/slider.css';
import './css/dialog.css';
import './css/base.css';
import './css/table.css';
import './css/folder.css';
import './css/blue.css';
import App from './App.jsx'
import { DependencyProvider } from './DependencyContext';
import { apiClient } from './controllers/ApiClient';


const dependencies = { apiClient };

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <DependencyProvider dependencies={dependencies}>
      <App/>
    </DependencyProvider>

  </StrictMode>
)

