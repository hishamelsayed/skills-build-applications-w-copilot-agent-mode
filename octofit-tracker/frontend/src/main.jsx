import 'bootstrap/dist/css/bootstrap.min.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

if (!codespaceName) {
  console.warn('Define VITE_CODESPACE_NAME in .env.local to use the public Codespaces API URL format.')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
